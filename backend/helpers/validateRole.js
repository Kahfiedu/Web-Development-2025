const validateRole = (req, res, next) => {
    const { role } = req.query;
    if (!role || !['student', 'parent'].includes(role)) {
        return res.status(400).json({
            success: false,
            message: 'Role harus student atau parent'
        });
    }
    next();
};

module.exports = {
    validateRole
}