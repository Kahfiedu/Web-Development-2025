const { Op } = require("sequelize");
const { isAdmin } = require("../helpers/validationAdmin");
const { PaymentMethod, Bank } = require("../models");

const createPaymentMethod = async (req, res) => {
    const { name, description } = req.body;

    const validation = isAdmin(req.userRole, req.userId);
    if (!validation.isValid) {
        return res.status(validation.error.status)
            .json({ message: validation.error.message });
    }

    if (!name || !description) {
        return res.status(400).json({
            success: false,
            message: "Name dan description metode pembayaran harus diisi"
        });
    }

    const toLowerCaseName = name.toLowerCase();

    try {
        // Use await here to properly check for existing payment method
        const existingPayment = await PaymentMethod.findOne({
            where: { name: toLowerCaseName },
            paranoid: false
        });

        if (existingPayment) {
            return res.status(400).json({
                success: false,
                message: "Nama methode telah tersedia"
            });
        }

        // Create payment method with transaction and context
        const paymentMethod = await PaymentMethod.create({
            name: toLowerCaseName,
            description
        }, {
            userId: validation.userId
        });

        // Return sanitized payment method data
        const safePaymentMethod = {
            id: paymentMethod.id,
            name: paymentMethod.name,
            description: paymentMethod.description,
            createdAt: paymentMethod.createdAt,
            updatedAt: paymentMethod.updatedAt
        };

        return res.status(201).json({
            success: true,
            message: "Metode pembayaran berhasil dibuat",
            paymentMethod: safePaymentMethod
        });

    } catch (error) {
        console.error("Error creating payment method:", error);
        const status = error.status || 500;
        const message = error.status ? error.message : "Internal server error";
        return res.status(status).json({
            success: false,
            message
        });
    }
};

const getPaymentMethods = async (req, res) => {

    const validation = isAdmin(req.userRole, req.userId);
    if (!validation.isValid) {
        return res.status(validation.error.status)
            .json({ message: validation.error.message });
    }

    try {
        const paymentMethods = await PaymentMethod.findAll({
            include: [
                {
                    model: Bank,
                    as: 'banks',
                    attributes: ['id', 'name', 'noRek', 'an', 'isActive'],
                    order: [['createdAt', 'DESC']],
                    paranoid: false,
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        return res.status(200).json({
            success: true,
            message: "Data metode pembayaran berhasil diambil",
            paymentMethods
        });
    } catch (error) {
        console.error("Error fetching payment methods:", error);
        const status = error.status || 500;
        const message = error.status ? error.message : "Internal server error";
        res.status(status).json({ message });
    }
}

const updatePaymentMethod = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    const validation = isAdmin(req.userRole, req.userId);
    if (!validation.isValid) {
        return res.status(validation.error.status)
            .json({ message: validation.error.message });
    }

    if (!name || !description) {
        return res.status(400).json({ message: "Name dan description metode pembayaran harus diisi" });
    }

    const toLowerCaseName = name.toLowerCase();

    try {
        const paymentMethod = await PaymentMethod.findByPk(id);

        if (!paymentMethod) {
            return res.status(404).json({
                success: false,
                message: "Metode pembayaran tidak ditemukan"
            });
        }

        const existingPayment = await PaymentMethod.findOne({
            where: {
                name: toLowerCaseName,
                id: { [Op.ne]: id } // Exclude the current payment method
            },
            paranoid: false
        });

        if (existingPayment) {
            return res.status(400).json({
                success: false,
                message: "Nama metode pembayaran telah tersedia"
            });
        }

        await paymentMethod.update({
            name: toLowerCaseName,
            description
        }, {
            userId: validation.userId // <-- tambahkan di sini
        });

        return res.status(200).json({
            success: true,
            message: "Metode pembayaran berhasil diperbarui",
            paymentMethod
        });
    } catch (error) {
        console.error("Error updating payment method:", error);
        const status = error.status || 500;
        const message = error.status ? error.message : "Internal server error";
        res.status(status).json({ message });
    }
}

const deletePaymentMethod = async (req, res) => {
    const { id } = req.params;

    const validation = isAdmin(req.userRole, req.userId);
    if (!validation.isValid) {
        return res.status(validation.error.status)
            .json({ message: validation.error.message });
    }

    try {
        const paymentMethod = await PaymentMethod.findOne({
            id,
            paranoid: false,
        });

        if (!paymentMethod) {
            return res.status(404).json({
                success: false,
                message: "Metode pembayaran tidak ditemukan"
            });
        }

        if (paymentMethod.deletedAt) {
            // Jika metode pembayaran sudah dihapus, maka kita akan menghapusnya secara permanen
            await paymentMethod.destroy({
                force: true,
                userId: validation.userId // <-- tambahkan di sini
            });
            return res.status(200).json({
                success: true,
                message: "Metode pembayaran dihapus permanen"
            });
        }

        await paymentMethod.destroy({
            userId: validation.userId // <-- tambahkan di sini
        });

        return res.status(200).json({
            success: true,
            message: "Metode pembayaran berhasil dihapus"
        });
    } catch (error) {
        console.error("Error deleting payment method:", error);
        const status = error.status || 500;
        const message = error.status ? error.message : "Internal server error";
        res.status(status).json({ message });
    }
}

const restorePaymentMethod = async (req, res) => {
    const { id } = req.params;

    const validation = isAdmin(req.userRole, req.userId);
    if (!validation.isValid) {
        return res.status(validation.error.status)
            .json({ message: validation.error.message });
    }

    try {
        const paymentMethod = await PaymentMethod.findByPk(id, {
            paranoid: false
        });

        if (!paymentMethod) {
            return res.status(404).json({
                success: false,
                message: "Metode pembayaran tidak ditemukan"
            });
        }

        // Restore the payment method
        await paymentMethod.restore({
            userId: validation.userId // <-- tambahkan di sini
        });

        return res.status(200).json({
            success: true,
            message: "Metode pembayaran berhasil dipulihkan",
            paymentMethod
        });
    } catch (error) {
        console.error("Error restoring payment method:", error);
        const status = error.status || 500;
        const message = error.status ? error.message : "Internal server error";
        res.status(status).json({ message });
    }
}

module.exports = {
    createPaymentMethod,
    getPaymentMethods,
    updatePaymentMethod,
    deletePaymentMethod,
    restorePaymentMethod
}