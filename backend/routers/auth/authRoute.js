const express = require('express')
const router = express.Router();
const multer = require('multer');
const upload = multer();

const { login, register, resetPasswordRequest, changePassword } = require('../../controllers/auth/authController');

router.post('/login', upload.none(), login);
router.post('/register', upload.none(), register);
router.post('/reset-password', upload.none(), resetPasswordRequest);
router.post('/change-password', upload.none(), changePassword);

module.exports = router;