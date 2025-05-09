const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;

exports.verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = decoded;
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    });
};
