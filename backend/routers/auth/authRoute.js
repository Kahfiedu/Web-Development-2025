const express = require('express')
const router = express.Router();
const multer = require('multer');
const upload = multer();

const { login, register } = require('../../controllers/auth/login');

router.post('/login', upload.none(), login);
router.post('/register', upload.none(), register);

module.exports = router;