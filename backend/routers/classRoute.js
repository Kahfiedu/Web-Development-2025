const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer();

const { createClass, getClasses, getClassById, updateClass, deleteClass, restoreClass } = require('../controllers/classController')

router.post('/class', upload.none(), createClass)
router.get('/classes', upload.none(), getClasses)
router.get('/class/:id', upload.none(), getClassById)
router.put('/class/:id', upload.none(), updateClass)
router.delete('/class/:id', upload.none(), deleteClass)
router.put('/class/restore/:id', upload.none(), restoreClass)

module.exports = router