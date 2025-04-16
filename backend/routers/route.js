const express = require('express');
const router = express.Router();
// Import authRoute.js
const authRoute = require('./auth/authRoute.js');

// Gunakan authRoute
router.use('/auth', authRoute);

module.exports = router;