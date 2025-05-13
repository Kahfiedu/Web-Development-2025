const express = require('express');
const router = express.Router();
const { namespace } = require('../config/sequelizeContext.js');
const { validateToken } = require('../middlewares/authMiddleware.js');
const validateDataUser = require('../helpers/validationDataUser.js');

// Route imports
const {
    authRoute,
    importRoute,
    userRoute,
    roleRoute,
    paymentMethodRoute,
    bankRoute,
    categoryRoute,
    childrenRoute,
    revisionRoute,
    courseRoute,
    classRoute,
    classEnrollmentRoute,
    lessonRoute,
    attendanceRoute,
    regionRoute,
    blogRoute,
    assignmentRoute,
    submissionRoute
} = require('./routeImports.js');

// Public routes
router.use('/auth', authRoute);

// Token validation middleware
router.use((req, res, next) => {
    namespace.run(() => {
        validateToken(req, res, next);
    });
});

// User validation route
router.use('/validate/user', validateDataUser);

// Protected routes - Core features
router.use([
    userRoute,
    roleRoute,
    revisionRoute
]);

// Protected routes - Payment related
router.use([
    paymentMethodRoute,
    bankRoute
]);

// Protected routes - Educational features
router.use([
    childrenRoute,
    categoryRoute,
    courseRoute,
    classRoute,
    classEnrollmentRoute,
    lessonRoute,
    attendanceRoute,
    assignmentRoute,
    submissionRoute
]);

// Protected routes - Additional features
router.use([
    regionRoute,
    blogRoute
]);

// Import functionality
router.use('/excel/import', importRoute);

// Development only routes
if (process.env.NODE_ENV === 'development') {
    router.get('/debug/context', (req, res) => {
        const userId = namespace.get('userId');
        res.status(200).json({
            success: true,
            userId,
            message: userId
                ? 'User context is set correctly'
                : 'User context is not set!'
        });
    });
}

module.exports = router;