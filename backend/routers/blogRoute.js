const express = require('express');
const router = express.Router();
const { createUpload } = require('../config/multerConfig');

const { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog, restoreBlog } = require('../controllers/blogController')

const uploadImage = createUpload("uploads/blog/", [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/webp"
]);

router.post('/blog', uploadImage.single('thumbnail'), createBlog)
router.get('/blogs', getBlogs)
router.get('/blog/:id', getBlogById)
router.put('/blog/:id', uploadImage.single('thumbnail'), updateBlog)
router.delete('/blog/:id', deleteBlog)
router.post('/blog/restore/:id', restoreBlog)

module.exports = router