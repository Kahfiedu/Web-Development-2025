const express = require('express')
const router = express.Router();
const { createUpload } = require('../config/multerConfig');
const { getUsers, getUserById, addUser, deleteUser } = require('../controllers/userController');

const uploadImage = createUpload("uploads/", [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/webp"
]);

router.get('/users', getUsers);
router.get('/user/:id', getUserById);
router.delete('/user/:id', deleteUser);
router.post('/user', uploadImage.single("avatar"), addUser);

module.exports = router;