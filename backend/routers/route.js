const express = require('express');
const router = express.Router();
const authRoute = require('./auth/authRoute.js');
const importRoute = require('./import/importRoute.js');
const userRoute = require('./userRouter.js');
const roleRoute = require('./roleRouter.js');
const paymentMethodRoute = require('./paymentMethodRoute.js');
const bankRoute = require('./bankRoute.js');
const categoryRoute = require('./categoryRoute.js');
const childrenRoute = require('./childrenRoute.js');
const revisionRoute = require('./revisionRoute.js');
const courseRoute = require('./courseRoute.js');
const { namespace } = require('../config/sequelizeContext.js');
const { validateToken } = require('../middlewares/authMiddleware.js');
const validateDataUser = require('../helpers/validationDataUser.js');

// Wrap all requests in namespace context


// Public routes
router.use('/auth', authRoute);

router.use((req, res, next) => {
    namespace.run(() => {
        // Jalankan validateToken DI DALAM context
        validateToken(req, res, next);
    });
});

// Check Data User
router.get('/validate/user', validateDataUser);

// Protected routes
router.use(userRoute);
router.use(roleRoute);
router.use(revisionRoute);
router.use(paymentMethodRoute);
router.use(bankRoute);
router.use(childrenRoute);
router.use(categoryRoute);
router.use(courseRoute);

// Import route
router.use('/excel/import', importRoute);

// Debug endpoint
if (process.env.NODE_ENV === 'development') {
    router.get('/debug/context', (req, res) => {
        const userId = namespace.get('userId');
        res.status(200).json({
            success: true,
            userId,
            message: userId ? 'User context is set correctly' : 'User context is not set!'
        });
    });
}
module.exports = router;