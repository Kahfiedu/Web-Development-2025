// config/socketConfig.js
const socketIO = require('socket.io');
const Redis = require('ioredis');

// Shared socket.io instance
let io;

/**
 * Initialize Socket.IO server
 * @param {Object} server - HTTP or HTTPS server instance
 * @returns {Object} - Socket.IO instance
 */
const initSocket = (server) => {
    // Configure Socket.IO with Redis adapter for multi-server support if needed
    const redisConfig = {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
        password: process.env.REDIS_PASSWORD
    };

    // Socket.IO with CORS configuration
    const socketConfig = {
        cors: {
            origin: process.env.CORS_ORIGIN || process.env.APP_URL || "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true
        },
        transports: ['websocket', 'polling']
    };

    // Optional: Redis adapter for horizontal scaling
    if (process.env.USE_REDIS_ADAPTER === 'true') {
        const { createAdapter } = require('@socket.io/redis-adapter');
        const pubClient = new Redis(redisConfig);
        const subClient = new Redis(redisConfig);

        socketConfig.adapter = createAdapter(pubClient, subClient);
    }

    // Create Socket.IO server
    io = socketIO(server, socketConfig);

    // Set up connection handler
    io.on('connection', (socket) => {
        console.log(`📡 New socket connection: ${socket.id}`);

        // Send initial connection event
        socket.emit('connecting', { id: socket.id });

        // Handle disconnection
        socket.on('disconnect', (reason) => {
            console.log(`📡 Socket disconnected: ${socket.id}, reason: ${reason}`);
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