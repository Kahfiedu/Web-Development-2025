const { Payment, User, Class } = require('../models');
const { isAdmin } = require('../helpers/validationRole');
const { AppError, handleError } = require('../helpers/helperFunction');
const validatePaymentData = require('../utils/validatePaymentData');
const getFileUrl = require('../utils/getFileUrl');
const { getPagination } = require('../utils/paginationUtil');

const createPayment = async (req, res) => {
    try {
        const validationResult = await validatePaymentData(req.body, 'create');
        if (!validationResult.isValid) {
            throw new AppError(validationResult.error.message, validationResult.error.status);
        }

        const paymentProofPath = req.file ? getFileUrl(req, `proof/${req.file.filename}`) : null;

        const paymentData = {
            ...validationResult.data,
            userId: req.userId,
            payment_proof: paymentProofPath,
        };

        const newPayment = await Payment.create(paymentData);

        const result = await Payment.findByPk(newPayment.id, {
            include: [
                { model: User, as: 'fromUser', attributes: { exclude: ['password'] } },
                { model: Class, as: 'forClass' }
            ]
        });

        return res.status(201).json({
            success: true,
            message: "Payment berhasil dibuat",
            payment: result
        });

    } catch (error) {
        return handleError(error, res);
    }
};

const getPayments = async (req, res) => {
    try {
        const {
            status,
            userId,
            classId,
            search = ''
        } = req.query;

        const {
            limit,
            offset,
            statusCondition,
            paranoid,
            meta
        } = getPagination(req.query);

        let whereClause = {};

        if (status) {
            whereClause.status = status;
        }

        if (userId) {
            whereClause.userId = userId;
        }

        if (classId) {
            whereClause.classId = classId;
        }

        if (statusCondition) {
            whereClause = { ...whereClause, ...statusCondition };
        }

        const totalCount = await Payment.count({ where: whereClause });
        meta.total = totalCount;
        meta.totalPages = Math.ceil(totalCount / limit);

        const { rows: payments } = await Payment.findAndCountAll({
            where: whereClause,
            limit,
            offset,
            order: [['createdAt', 'DESC']],
            include: [
                { model: User, as: 'fromUser', attributes: { exclude: ['password'] } },
                { model: Class, as: 'forClass' },
                { model: User, as: 'confirmedBy', attributes: { exclude: ['password'] } }
            ],
            paranoid,
        });

        return res.status(200).json({
            success: true,
            message: payments.length === 0 ? "Data pembayaran tidak ditemukan" : "Berhasil mendapatkan data pembayaran",
            payments,
            meta
        });

    } catch (error) {
        return handleError(error, res);
    }
};

const getPaymentById = async (req, res) => {
    try {
        const { id } = req.params;
        const payment = await Payment.findByPk(id, {
            include: [
                { model: User, as: 'fromUser', attributes: { exclude: ['password'] } },
                { model: Class, as: 'forClass' },
                { model: User, as: 'confirmedBy', attributes: { exclude: ['password'] } }
            ]
        });
        if (!payment) {
            throw new AppError("Payment tidak ditemukan", 404);
        }
        return res.status(200).json({
            success: true,
            message: "Payment ditemukan",
            payment
        });
    } catch (error) {
        return handleError(error, res);
    }
};

const updatePayment = async (req, res) => {
    try {
        const { id } = req.params;

        const validationResult = await validatePaymentData(req.body, 'update');
        if (!validationResult.isValid) {
            throw new AppError(validationResult.error.message, validationResult.error.status);
        }

        const existing = await Payment.findByPk(id);
        if (!existing) {
            throw new AppError("Payment tidak ditemukan", 404);
        }

        const updateData = {
            ...validationResult.data,
        };

        if (req.file) {
            updateData.payment_proof = getFileUrl(req, `payment/${req.file.filename}`);
        }

        if (req.userRole === 'admin') {
            updateData.confirmation_by = req.userId;
            if (updateData.status === 'completed') {
                updateData.confirmation_date = new Date();
            }
        }

        await existing.update(updateData);

        const updatedPayment = await Payment.findByPk(id, {
            include: [
                { model: User, as: 'fromUser', attributes: { exclude: ['password'] } },
                { model: Class, as: 'forClass' },
                { model: User, as: 'confirmedBy', attributes: { exclude: ['password'] } }
            ]
        });

        return res.status(200).json({
            success: true,
            message: "Payment berhasil diperbarui",
            payment: updatedPayment
        });

    } catch (error) {
        return handleError(error, res);
    }
};

const deletePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const validation = isAdmin(req.userRole, req.userId);
        if (!validation.isValid) {
            throw new AppError(validation.error.message, validation.error.status);
        }

        const payment = await Payment.findByPk(id, { paranoid: false });
        if (!payment) {
            throw new AppError("Payment tidak ditemukan", 404);
        }

        if (payment.deletedAt) {
            await payment.destroy({ force: true });
            return res.status(200).json({ success: true, message: "Payment dihapus permanen" });
        }

        await payment.destroy();
        return res.status(200).json({ success: true, message: "Payment berhasil dihapus" });

    } catch (error) {
        return handleError(error, res);
    }
};

const restorePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const validation = isAdmin(req.userRole, req.userId);
        if (!validation.isValid) {
            throw new AppError(validation.error.message, validation.error.status);
        }

        const payment = await Payment.findByPk(id, { paranoid: false });
        if (!payment) {
            throw new AppError("Payment tidak ditemukan", 404);
        }

        if (!payment.deletedAt) {
            throw new AppError("Payment belum dihapus", 400);
        }

        await payment.restore();

        const restored = await Payment.findByPk(id, {
            include: [
                { model: User, as: 'fromUser', attributes: { exclude: ['password'] } },
                { model: Class, as: 'forClass' },
                { model: User, as: 'confirmedBy', attributes: { exclude: ['password'] } }
            ]
        });

        return res.status(200).json({
            success: true,
            message: "Payment berhasil dipulihkan",
            payment: restored
        });

    } catch (error) {
        return handleError(error, res);
    }
};

module.exports = {
    createPayment,
    getPayments,
    getPaymentById,
    updatePayment,
    deletePayment,
    restorePayment
};
