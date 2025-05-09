const { getIO } = require("../config/socketConfig");

/**
 * Send progress update to client
 * @param {String} socketId - Socket ID to send update to
 * @param {Object} data - Status data to send
 */
function sendProgressUpdate(socketId, data) {
    if (socketId) {
        const io = getIO();
        io.to(socketId).emit("importStatus", data);
    }
}

module.exports = {
    sendProgressUpdate
};