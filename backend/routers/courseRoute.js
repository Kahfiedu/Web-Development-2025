const express = require('express');
const router = express.Router();
const { createUpload } = require('../config/multerConfig');

const { createCourse, updateCourse, getCourses, getCourseById, deleteCourse, restoreCourse } = require('../controllers/courseController');

const uploadImage = createUpload("uploads/course/", [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/webp"
]);

router.post('/course', uploadImage.single('thumbnail'), createCourse);
router.get('/courses', getCourses);
router.get('/course/:id', getCourseById);
router.put('/course/:id', uploadImage.single('thumbnail'), updateCourse);
router.delete('/course/:id', deleteCourse);
router.post('/course/restore/:id', restoreCourse);

module.exports = router;
