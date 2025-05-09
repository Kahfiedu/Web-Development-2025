// controllers/importController.js
const path = require('path');
const fs = require('fs');
const userImportQueue = require('../../queues/jobs/userImportQueue');

/**
 * Handle Excel file import for users
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const importUsers = async (req, res) => {
    try {
        // Check if file exists in request
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const { socketId } = req.body;

        // Validate socketId is provided
        if (!socketId) {
            return res.status(400).json({ message: 'Socket ID is required for real-time updates' });
        }

        console.log(`📤 Adding import job to queue for socket ID: ${socketId}`);

        // Add job to queue
        const job = await userImportQueue.add({
            filePath: req.file.path,
            socketId
        }, {
            attempts: 3,
            backoff: {
                type: 'exponential',
                delay: 2000
            },
            removeOnComplete: true,
            removeOnFail: false
        });

        return res.status(200).json({
            message: 'Import job added to queue',
            jobId: job.id
        });
    } catch (error) {
        console.error('❌ Error in import controller:', error);

        // Clean up file if there was an error
        if (req.file && req.file.path) {
            try { fs.unlinkSync(req.file.path); } catch (e) { /* ignore deletion errors */ }
        }

        return res.status(500).json({
            message: 'Failed to process import request',
            error: error.message
        });
    }
};

module.exports = {
    importUsers
};