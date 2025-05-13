const { getPagination } = require("../utils/paginationUtil");
const { Role } = require("../models");
const { Op } = require("sequelize");
const { isAdmin } = require("../helpers/validationAdmin");

// Fungsi untuk mendapatkan daftar pengguna
// dengan parameter pencarian, halaman, dan status
const getRoles = async (req, res) => {
    const search = req.query.search || "";

    const validation = isAdmin(req.userRole, req.userId);

    if (!validation.isValid) {
        return res.status(validation.error.status)
            .json({ message: validation.error.message });
    }

    try {
        // Ambil parameter pagination dan status filter
        const {
            limit,
            offset,
            statusCondition,
            paranoid,
            meta
        } = getPagination(req.query);

        // Build where clause
        const whereClause = {
            name: { [Op.like]: `%${search}%` },
            ...(statusCondition || {})
        };

        // Hitung total sesuai kondisi
        const totalCount = await Role.count({
            where: whereClause,
            paranoid
        });

        // Update meta berdasarkan totalCount
        meta.total = totalCount;
        meta.totalPages = Math.ceil(totalCount / limit);

        // Ambil data roles
        const { rows: roles } = await Role.findAndCountAll({
            where: whereClause,
            order: [["createdAt", "DESC"]],
            limit,
            offset,
            paranoid,
        });

        if (roles.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Data roles tidak ditemukan",
                roles: [],
                meta
            });
        }

        res.status(200).json({
            success: true,
            message: "Data roles berhasil diambil",
            roles,
            meta
        });
    } catch (error) {
        console.error("Error fetching roles:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const createRole = async (req, res) => {
    const { name } = req.body;

    const validation = isAdmin(req.userRole, req.userId);

    if (!validation.isValid) {
        return res.status(validation.error.status)
            .json({ message: validation.error.message });
    }

    if (!name) {
        return res.status(400).json({ message: "Nama role wajib diisi" });
    }

    if (name.toLowerCase() === "admin") {
        return res.status(400).json({ message: "Nama role 'admin' tidak diperbolehkan" });
    }
    if (name.length < 3) {
        return res.status(400).json({ message: "Nama role minimal 3 karakter" });
    }

    const lowerCaseName = name.toLowerCase();

    try {

        // Check for duplicates within transaction
        const existingRole = await Role.findOne({
            where: { name: lowerCaseName },
            paranoid: false,
        });

        if (existingRole) {
            throw { status: 400, message: "Nama role sudah digunakan" };
        }

        // Create new role with correct data
        const newRole = await Role.create({
            name: lowerCaseName,
            revision: 0,
        }, {
            userId: validation.userId  // <-- tambahkan di sini
        });
        return res.status(201).json({
            success: true,
            message: "Role berhasil ditambahkan",
            role: newRole
        });
    } catch (error) {
        console.error("Error creating role:", error);
        const status = error.status || 500;
        const message = error.status ? error.message : "Internal server error";
        res.status(status).json({ message });
    }
};

const updateRole = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const validation = isAdmin(req.userRole, req.userId);

    if (!validation.isValid) {
        return res.status(validation.error.status)
            .json({ message: validation.error.message });
    }


    if (!id || !name) {
        return res.status(400).json({ message: "ID dan nama role wajib diisi" });
    }

    const lowerCaseName = name.toLowerCase();

    try {

        const role = await Role.findByPk(id);
        if (!role) {
            throw { status: 404, message: "Role tidak ditemukan" };
        }

        if (role.name === "admin") {
            throw { status: 400, message: "Role tidak dapat diubah" };
        }

        // Cek apakah role sedang digunakan oleh user
        const isUsed = await role.countUsers();
        if (isUsed > 0) {
            throw { status: 400, message: "Role sedang digunakan" };
        }

        // Cek nama role sudah digunakan oleh role lain
        const existing = await Role.findOne({
            where: {
                name: lowerCaseName,
                id: { [Op.ne]: id }
            },
            paranoid: false,
        });

        if (existing) {
            throw { status: 400, message: "Nama role sudah digunakan oleh role lain" };
        }

        // Update role
        role.name = lowerCaseName;
        await role.save({
            userId: validation.userId  // <-- tambahkan di sini
        });

        return res.status(200).json({
            success: true,
            message: "Role berhasil diperbarui",
            role: role
        });

    } catch (error) {
        console.error("Error updating role:", error);
        const status = error.status || 500;
        const message = error.status ? error.message : "Internal server error";
        res.status(status).json({ message });
    }
};

const deleteRole = async (req, res) => {
    const { id } = req.params;

    const validation = isAdmin(req.userRole, req.userId);

    if (!validation.isValid) {
        return res.status(validation.error.status)
            .json({ message: validation.error.message });
    }

    try {

        // Find role with transaction
        const role = await Role.findByPk(id, {
            paranoid: false
        });

        if (!role) {
            throw { status: 404, message: "Role tidak ditemukan" };
        }

        if (role.name === "admin") {
            throw { status: 400, message: "Role admin tidak dapat dihapus" };
        }

        // Check if role is in use with transaction
        const isUsed = await role.countUsers();
        if (isUsed > 0) {
            throw { status: 400, message: "Role ini sedang digunakan oleh user lain" };
        }

        // Handle soft delete or permanent delete
        if (role.deletedAt) {
            await role.destroy({
                force: true,
                userId: validation.userId // <-- tambahkan di sini
            });
            return res.status(200).json({
                success: true,
                message: "Role berhasil dihapus permanen"
            });
        }

        // Perform soft delete
        await role.destroy({
            userId: validation.userId  // <-- tambahkan di sini
        });
        return res.status(200).json({
            success: true,
            message: "Role berhasil dihapus"
        });

    } catch (error) {
        console.error("Error deleting role:", error);
        const status = error.status || 500;
        const message = error.status ? error.message : "Internal server error";
        res.status(status).json({
            success: false,
            message
        });
    }
};

const restoreRole = async (req, res) => {
    const { id } = req.params;

    const validation = isAdmin(req.userRole, req.userId);

    if (!validation.isValid) {
        return res.status(validation.error.status)
            .json({ message: validation.error.message });
    }

    if (!id) {
        return res.status(400).json({ message: "ID role tidak ditemukan" });
    }

    try {
        const role = await Role.findByPk(id, {
            paranoid: false
        });

        if (!role) {
            throw { status: 404, message: "Role tidak ditemukan" };
        }

        // Restore the role
        await role.restore({
            userId: validation.userId // <-- tambahkan di sini
        });


        return res.status(200).json({
            success: true,
            message: "Role berhasil dipulihkan",
            role
        });
    } catch (error) {
        console.error("Error restoring role:", error);
        const status = error.status || 500;
        const message = error.status ? error.message : "Internal server error";
        res.status(status).json({ message });
    }
};


module.exports = {
    getRoles,
    deleteRole,
    createRole,
    updateRole,
    restoreRole
};