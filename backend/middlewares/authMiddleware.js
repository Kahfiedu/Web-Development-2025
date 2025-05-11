const { verifyToken } = require('../helpers/jwtHelper');
const { namespace } = require("../config/sequelizeContext");
const { User } = require("../models");

const validateToken = async (req, res, next) => {
    try {
        let token = req.headers["authorization"];

        if (!token) {
            return res.status(403).json({ message: "No token provided" });
        }

        // Remove Bearer prefix if present
        if (token.startsWith("Bearer ")) {
            token = token.slice(7);
        }

        // Verify token using helper
        const decoded = verifyToken(token);

        const user = await User.findOne({
            where: {
                id: decoded.userId
            },
            attributes: ['id', 'email', 'roleId'] // Only fetch needed fields
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Token tidak valid"
            });
        }

        // Set request properties
        req.user = decoded;
        req.userId = decoded.userId;
        req.userRole = decoded.role;

        // Set userId in namespace within CLS context
        namespace.set('userId', decoded.userId);
        console.log('Set userId in namespace:', decoded.userId);

        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

module.exports = { validateToken };