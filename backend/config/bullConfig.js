const Bull = require('bull');
const Redis = require('ioredis');
const path = require('path');

// Create Redis client instances
const redisConfig = {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    maxRetriesPerRequest: 3,
    enableReadyCheck: false
};

// Create separate Redis clients for different purposes
const redisClient = new Redis(redisConfig);
const redisSubscriber = new Redis(redisConfig);

// Handle Redis connection events
redisClient.on('connect', () => console.log('📌 Redis client connected'));
redisClient.on('error', (error) => console.error('❌ Redis client error:', error));

/**
 * Create a Bull queue with consistent configuration
 * @param {String} name - Queue name
 * @param {Object} options - Additional Bull options
 * @returns {Bull.Queue} - Configured Bull queue
 */
const createQueue = (name, options = {}) => {
    const defaultOptions = {
        redis: redisConfig,
        defaultJobOptions: {
            attempts: 3,
            backoff: {
                type: 'exponential',
                delay: 1000
            },
            removeOnComplete: true,
            removeOnFail: 10 // Keep last 10 failed jobs
        }
    };

    const queue = new Bull(name, { ...defaultOptions, ...options });

    // Set up standard event handlers for monitoring
    queue.on('error', (error) => {
        console.error(`❌ Queue '${name}' error:`, error);
    });

    queue.on('completed', (job, result) => {
        console.log(`✅ Job #${job.id} in queue '${name}' completed`);
    });

    queue.on('failed', (job, error) => {
        console.error(`❌ Job #${job.id} in queue '${name}' failed:`, error);
    });

    queue.on('stalled', (jobId) => {
        console.warn(`⚠️ Job #${jobId} in queue '${name}' stalled`);
    });

    return queue;
};

module.exports = {
    redisClient,
    redisSubscriber,
    createQueue
};
