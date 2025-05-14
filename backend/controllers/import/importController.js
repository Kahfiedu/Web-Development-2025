// controllers/importController.js
const path = require('path');
const fs = require('fs');
const userImportQueue = require('../../queues/jobs/userImportQueue');
const { AppError, handleError } = require('../../helpers/helperFunction');

/**
 * Handle Excel file import for users
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const importUsers = async (req, res) => {
    try {
        // Check if file exists in request
        if (!req.file) {
            throw new AppError("tidak ada file yang diupload", 400)
        }

        const { socketId } = req.body;

        // Validate socketId is provided
        if (!socketId) {
            throw new AppError("Socket ID is required for real-time updates", 400)
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
        if (req.file && req.file.path) {
            try { fs.unlinkSync(req.file.path); } catch (e) { /* ignore deletion errors */ }
        }
        return handleError(error, res)
    }
};

module.exports = {
    importUsers
};