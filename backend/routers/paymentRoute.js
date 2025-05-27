const express = require('express');
const router = express.Router();
const { createUpload } = require('../config/multerConfig');

const { getPayments, getPaymentById, createPayment, deletePayment, restorePayment, updatePayment } = require('../controllers/paymentController');
const { validateToken } = require('../middlewares/authMiddleware');

const uploadImage = createUpload("uploads/proof/", [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/webp",
    "application/pdf"
]);


router.get('/payments', getPayments);
router.get('/payment/:id', getPaymentById);
router.post('/payment', validateToken, uploadImage.single('proof'), createPayment);
router.put('/payment/:id', validateToken, uploadImage.single('proof'), updatePayment);
router.delete('/payment/:id', validateToken, deletePayment);
router.post('/payment/restore/:id', validateToken, restorePayment);

module.exports = router;
