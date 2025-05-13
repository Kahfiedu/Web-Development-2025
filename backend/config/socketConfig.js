const socketIO = require('socket.io');
const { createClient } = require('@redis/client');

// Shared socket.io instance
let io;

/**
 * Initialize Socket.IO server
 * @param {Object} server - HTTP or HTTPS server instance
 * @returns {Object} - Socket.IO instance
 */
const initSocket = async (server) => {
    // Configure Redis for multi-server support
    const redisConfig = {
        url: `redis://${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || '6379'}`,
        password: process.env.REDIS_PASSWORD,
        socket: {
            reconnectStrategy: (retries) => {
                return Math.min(retries * 50, 2000);
            }
        }
    };

    // Socket.IO with CORS configuration
    const socketConfig = {
        cors: {
            origin: process.env.CORS_ORIGIN || process.env.APP_URL || "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true
        },
        transports: ['websocket', 'polling'],
        pingTimeout: 60000,
        pingInterval: 25000
    };

    // Optional: Redis adapter for horizontal scaling
    if (process.env.USE_REDIS_ADAPTER === 'true') {
        try {
            const { createAdapter } = require('@socket.io/redis-adapter');
            const pubClient = createClient(redisConfig);
            const subClient = createClient(redisConfig);

            await Promise.all([
                pubClient.connect(),
                subClient.connect()
            ]);

            console.log('📡 Redis adapter clients connected');
            socketConfig.adapter = createAdapter(pubClient, subClient);

            // Handle Redis client errors
            pubClient.on('error', (error) => console.error('❌ Redis pub client error:', error));
            subClient.on('error', (error) => console.error('❌ Redis sub client error:', error));

            // Graceful shutdown
            process.on('SIGTERM', async () => {
                await Promise.all([
                    pubClient.quit(),
                    subClient.quit()
                ]);
                process.exit(0);
            });
        } catch (error) {
            console.error('❌ Failed to initialize Redis adapter:', error);
        }
    }

    // Create Socket.IO server
    io = socketIO(server, socketConfig);

    // Set up connection handler
    io.on('connection', (socket) => {
        console.log(`📡 New socket connection: ${socket.id}`);

        // Send initial connection event
        socket.emit('connected', {
            id: socket.id,
            timestamp: new Date().toISOString()
        });

        // Handle disconnection
        socket.on('disconnect', (reason) => {
            console.log(`📡 Socket disconnected: ${socket.id}, reason: ${reason}`);
        });

        // Handle errors
        socket.on('error', (error) => {
            console.error(`❌ Socket error for ${socket.id}:`, error);
        });

        // Additional event listeners can be added here
    });

    console.log('📡 Socket.IO server initialized');
    return io;
};

/**
 * Get the Socket.IO instance
 * @returns {Object} - Socket.IO instance
 * @throws {Error} - If Socket.IO has not been initialized
 */
const getIO = () => {
    if (!io) {
        throw new Error('Socket.IO has not been initialized!');
    }
    return io;
};

module.exports = {
    initSocket,
    getIO
};