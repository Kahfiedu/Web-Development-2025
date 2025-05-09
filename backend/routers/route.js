const express = require('express');
const router = express.Router();
// Import authRoute.js
const authRoute = require('./auth/authRoute.js');
const importRoute = require('./import/importRoute.js');

// Gunakan authRoute
router.use('/auth', authRoute);
router.use('/excel/import', importRoute);

module.exports = router;