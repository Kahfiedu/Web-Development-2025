const jwt = require('jsonwebtoken');

/**
 * Generate JWT token with standard payload structure
 * @param {Object} payload - Data to encode in token
 * @param {string} payload.userId - User's UUID
 * @param {string} payload.email - User's email
 * @param {string} payload.role - User's role name
 * @returns {string} JWT token
 */
const generateToken = (payload) => {
    // Validate required payload fields
    if (!payload.userId || !payload.email || !payload.role) {
        throw new Error('Missing required payload fields: userId, email, role');
    }

    // Set standard expiration from env or default to 24h
    const expiresIn = process.env.JWT_EXPIRES_IN || '24h';

    // Generate token with standardized payload
    return jwt.sign(
        {
            userId: payload.userId,
            email: payload.email,
            role: payload.role,
            iat: Math.floor(Date.now() / 1000)
        },
        process.env.JWT_SECRET,
        { expiresIn }
    );
};

/**
 * Verify and decode JWT token
 * @param {string} token - JWT token to verify
 * @returns {Object} Decoded token payload
 */
const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid token');
    }
};

module.exports = { generateToken, verifyToken };