// Helper untuk membuat JWT
const jwt = require('jsonwebtoken');

const generateToken = (payload, expiresIn = process.env.JWT_EXPIRES_IN) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

module.exports = { generateToken };