const jwt = require("jsonwebtoken");
const secretKey = "your_jwt_secret";

exports.verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = decoded; // Store user info in request for use in next middleware or routes
        next();
    });
};
