const express = require('express')
const router = express.Router();
const multer = require('multer');
const upload = multer();

const { createAttendance, updateAttendance, getAttendances } = require('../controllers/attendanceController')

router.post('/attendance', upload.none(), createAttendance)
router.get('/attendances', getAttendances)
router.put('/attendance/:id', upload.none(), updateAttendance)

module.exports = router