const express = require('express')
const router = express.Router();
const multer = require('multer');
const upload = multer();

const { getRegions } = require('../controllers/regionController')

router.get('/regions', getRegions)

module.exports = router