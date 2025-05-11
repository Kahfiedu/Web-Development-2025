const { Op } = require("sequelize");
const isAdmin = require("../helpers/validationAdmin");
const { PaymentMethod, Bank } = require("../models");
const { createSearchWhereClause } = require("../helpers/searchQueryHelper");

const createBank = async (req, res) => {
    const { name, noRek, an, isActive, paymentMethodId } = req.body;

    const validation = isAdmin(req.userRole, req.userId);
    if (!validation.isValid) {
        return res.status(validation.error.status)
            .json({ message: validation.error.message });
    }

    if (!name || !noRek || !an || isActive === undefined || !paymentMethodId) {
        return res.status(400).json({
            success: false,
            message: "Name, noRek, an, isActive dan paymentMethodId harus diisi"
        });
    }

    const toLowerCaseName = name.toLowerCase();

    try {
        const existingBank = await Bank.findOne({
            where: { name: toLowerCaseName },
            paranoid: false
        });

        if (existingBank) {
            return res.status(400).json({
                success: false,
                message: "Nama bank telah tersedia"
            });
        }

        const existingPaymentMethod = await PaymentMethod.findOne({
            where: { id: paymentMethodId },
            paranoid: false
        });

        if (!existingPaymentMethod) {
            return res.status(404).json({
                success: false,
                message: "Payment method tidak ditemukan"
            });
        }

        const bank = await Bank.create({
            name: toLowerCaseName,
            noRek,
            an,
            isActive,
            paymentMethodId
        }, {
            userId: validation.userId
        });

        return res.status(201).json({
            success: true,
            message: "Bank berhasil dibuat",
            bank
        });
    } catch (error) {
        console.error("Error creating bank:", error);
        const status = error.status || 500;
        const message = error.status ? error.message : "Internal server error";
        return res.status(status).json({
            success: false,
            message
        });
    }
};

const getBanks = async (req, res) => {
    const { page = 1, limit = 10, search = "", isActive } = req.query;
    const validation = isAdmin(req.userRole, req.userId);
    if (!validation.isValid) {
        return res.status(validation.error.status)
            .json({ message: validation.error.message });
    }
    const offset = (page - 1) * limit;

    const searchFields = ['name', 'noRek', 'an'];

    // Create additional filters
    const additionalFilters = {};
    if (isActive !== undefined) {
        additionalFilters.isActive = isActive === "true";
    }

    // Create where clause using helper
    const whereClause = createSearchWhereClause(search, searchFields, additionalFilters);

    try {
        const { count, rows: banks } = await Bank.findAndCountAll({
            where: whereClause,
            order: [['createdAt', 'DESC']],
            limit,
            offset,
            paranoid: false
        });
        const totalPages = Math.ceil(count / limit);
        const meta = {
            total: count,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages
        };

        if (banks.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Data bank tidak ditemukan",
                banks: [],
                meta
            });
        }
        return res.status(200).json({
            success: true,
            message: "Data bank berhasil diambil",
            banks,
            meta
        });
    } catch (error) {
        console.error("Error fetching banks:", error);
        const status = error.status || 500;
        const message = error.status ? error.message : "Internal server error";
        return res.status(status).json({
            success: false,
            message
        });
    }
};

const updateBank = async (req, res) => {
    const { id } = req.params;
    const { name, noRek, an, isActive, paymentMethodId } = req.body;

    const validation = isAdmin(req.userRole, req.userId);
    if (!validation.isValid) {
        return res.status(validation.error.status)
            .json({ message: validation.error.message });
    }

    if (!id) {
        return res.status(400).json({
            success: false,
            message: "ID bank harus diisi"
        });
    }

    try {
        const bank = await Bank.findByPk(id);
        if (!bank) {
            return res.status(404).json({
                success: false,
                message: "Bank tidak ditemukan"
            });
        }

        // Build update data
        const updateData = {};
        if (name) {
            const toLowerCaseName = name.toLowerCase();
            const existingBank = await Bank.findOne({
                where: {
                    name: toLowerCaseName,
                    id: { [Op.ne]: id }
                },
                paranoid: false
            });

            if (existingBank) {
                return res.status(400).json({
                    success: false,
                    message: "Nama bank telah tersedia"
                });
            }
            updateData.name = toLowerCaseName;
        }

        if (paymentMethodId) {
            const existingPaymentMethod = await PaymentMethod.findByPk(paymentMethodId);
            if (!existingPaymentMethod) {
                return res.status(404).json({
                    success: false,
                    message: "Payment method tidak ditemukan"
                });
            }
            updateData.paymentMethodId = paymentMethodId;
        }

        if (noRek) updateData.noRek = noRek;
        if (an) updateData.an = an;
        if (isActive !== undefined) updateData.isActive = isActive;

        await bank.update(updateData, {
            userId: validation.userId
        });

        const updatedBank = await Bank.findByPk(id);

        return res.status(200).json({
            success: true,
            message: "Bank berhasil diperbarui",
            bank: updatedBank
        });
    } catch (error) {
        console.error("Error updating bank:", error);
        const status = error.status || 500;
        const message = error.status ? error.message : "Internal server error";
        return res.status(status).json({
            success: false,
            message
        });
    }
};

const deleteBank = async (req, res) => {
    const { id } = req.params;

    const validation = isAdmin(req.userRole, req.userId);
    if (!validation.isValid) {
        return res.status(validation.error.status)
            .json({ message: validation.error.message });
    }

    try {
        const bank = await Bank.findOne({
            where: { id },
            paranoid: false
        });

        if (!bank) {
            return res.status(404).json({
                success: false,
                message: "Bank tidak ditemukan"
            });
        }

        if (bank.isActive) {
            return res.status(400).json({
                success: false,
                message: "Bank tidak dapat dihapus karena masih aktif"
            });
        }

        if (bank.deletedAt) {
            await bank.destroy({
                force: true,
                userId: validation.userId
            });
            return res.status(200).json({
                success: true,
                message: "Bank dihapus permanen"
            });
        }

        await bank.destroy({
            userId: validation.userId
        });

        return res.status(200).json({
            success: true,
            message: "Bank berhasil dihapus"
        });
    } catch (error) {
        console.error("Error deleting bank:", error);
        const status = error.status || 500;
        const message = error.status ? error.message : "Internal server error";
        return res.status(status).json({
            success: false,
            message
        });
    }
};

const restoreBank = async (req, res) => {
    const { id } = req.params;

    const validation = isAdmin(req.userRole, req.userId);
    if (!validation.isValid) {
        return res.status(validation.error.status)
            .json({ message: validation.error.message });
    }

    try {
        const bank = await Bank.findByPk(id, {
            paranoid: false
        });

        if (!bank) {
            return res.status(404).json({
                success: false,
                message: "Bank tidak ditemukan"
            });
        }

        await bank.restore({
            userId: validation.userId
        });

        const restoredBank = await Bank.findByPk(id);

        return res.status(200).json({
            success: true,
            message: "Bank berhasil dipulihkan",
            bank: restoredBank
        });
    } catch (error) {
        console.error("Error restoring bank:", error);
        const status = error.status || 500;
        const message = error.status ? error.message : "Internal server error";
        return res.status(status).json({
            success: false,
            message
        });
    }
};

module.exports = {
    createBank,
    updateBank,
    deleteBank,
    restoreBank,
    getBanks
};