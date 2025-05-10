const express = require('express');
const router = express.Router();
const authRoute = require('./auth/authRoute.js');
const importRoute = require('./import/importRoute.js');
const userRoute = require('./userRouter.js');
const roleRoute = require('./roleRouter.js');
const revisionRoute = require('./revisionRoute.js');
const { namespace } = require('../config/sequelizeContext.js');
const { validateToken } = require('../middlewares/authMiddleware.js');

// Wrap all requests in namespace context


// Public routes
router.use('/auth', authRoute);

router.use((req, res, next) => {
    namespace.run(() => {
        // Jalankan validateToken DI DALAM context
        validateToken(req, res, next);
    });
});
// Protected routes
router.use(userRoute);
router.use(roleRoute);
router.use(revisionRoute);
router.use('/excel/import', importRoute);

// Debug endpoint
router.get('/debug/context', (req, res) => {
    const userId = namespace.get('userId');
    res.status(200).json({
        userId,
        message: userId ? 'User context is set correctly' : 'User context is not set!'
    });
});

module.exports = router;