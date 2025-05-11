const { Op } = require("sequelize");
const { User, Role } = require("../models");
const { validateEmail } = require("../utils/validorUtil");
const getFileUrl = require("../utils/getFileUrl");
const { getPagination } = require("../utils/paginationUtil");

// Fungsi untuk mendapatkan daftar pengguna
// dengan parameter pencarian, halaman, dan status
const getUsers = async (req, res) => {
    const isAdmin = req.userRole === "admin";
    if (!isAdmin) {
        return res.status(403).json({ message: "Access denied" });
    }

    const search = req.query.search || "";

    try {
        // Hitung pagination dulu agar dapat statusCondition & paranoid
        const {
            limit,
            offset,
            statusCondition,
            paranoid,
            meta
        } = getPagination(req.query);

        const whereClause = {
            name: { [Op.like]: `%${search}%` },
            ...(statusCondition || {}) // merge deletedAt condition if any
        };

        // Hitung ulang totalCount sesuai kondisi status & search
        const totalCount = await User.count({
            where: whereClause,
            include: [{
                model: Role,
                as: "role",
                where: { name: { [Op.not]: "admin" } }
            }],
            paranoid
        });

        // Update meta setelah dapat totalCount baru
        meta.total = totalCount;
        meta.totalPages = Math.ceil(totalCount / limit);

        // Ambil data
        const { rows: users } = await User.findAndCountAll({
            where: whereClause,
            attributes: { exclude: ["password"] },
            order: [["createdAt", "DESC"]],
            limit,
            offset,
            paranoid,
            include: [
                {
                    model: Role,
                    as: "role",
                    attributes: ["id", "name"],
                    where: { name: { [Op.not]: "admin" } }
                }
            ]
        });

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Data users tidak ditemukan",
                users: [],
                meta
            });
        }

        res.status(200).json({
            success: true,
            message: "Data users berhasil diambil",
            users,
            meta
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// Fungsi untuk mendapatkan pengguna berdasarkan ID
// dengan pengecekan apakah pengguna adalah admin
const getUserById = async (req, res) => {
    const { id } = req.params;

    // Validate userId
    if (!id) {
        return res.status(400).json({ message: "ID User tidak ditemukan" });
    }

    // Check if the user is an admin
    const isAdmin = req.userRole === "admin";
    if (!isAdmin) {
        return res.status(403).json({ message: "Access denied" });
    }

    try {
        const user = await User.findByPk(id, {
            attributes: { exclude: ["password"] },
            include: [{
                model: Role,
                as: "role",
                attributes: ["id", "name"]
            }],
            paranoid: false
        });

        if (!user) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        res.status(200).json({
            success: true,
            message: "Detail user berhasil diambil",
            user
        });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// Fungsi untuk menambahkan pengguna baru
// dengan validasi email dan password
const addUser = async (req, res) => {
    const {
        name,
        email,
        password,
        alamat,
        country,
        state,
        city,
        district,
        roleId,
        village,
        phone
    } = req.body;

    // Validate required fields
    if (!name || !email || !password || !roleId) {
        return res.status(400).json({ message: "Name, email, roleId and password are required" });
    }

    // Validate email format
    if (!validateEmail(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    const avatarPath = req.file ? getFileUrl(req, req.file.filename) : null;

    // Validate password length
    if (password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }


    try {
        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const role = await Role.findOne({ where: { id: roleId } });

        // Check if role exists
        if (!role) {
            return res.status(404).json({ message: "Role not found" });
        }

        // Create user
        const newUser = await User.create({
            name,
            email,
            password,
            alamat,
            country,
            state,
            city,
            district,
            village,
            phone,
            roleId,
            avatar: avatarPath,
        }, {
            userId: req.userId, // <-- tambahkan di sini
        });

        // Exclude password from response
        const { password: _, ...userWithoutPassword } = newUser.toJSON();

        const userRole = await Role.findOne({ where: { id: newUser.roleId } });

        if (!userRole) {
            return res.status(404).json({ message: "Role not found" });
        }

        userWithoutPassword.role = userRole.name;

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: userWithoutPassword,
        });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const {
        name,
        email,
        alamat,
        country,
        state,
        city,
        district,
        roleId,
        village,
        phone,
        password
    } = req.body;

    // Validate userId
    if (!id) {
        return res.status(400).json({ message: "ID User tidak ditemukan" });
    }

    // Check if the user is an admin
    const isAdmin = req.userRole === "admin";
    if (!isAdmin) {
        return res.status(403).json({ message: "Access denied" });
    }

    try {
        // Find user
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        // If email is being changed, check if new email already exists
        if (email && email !== user.email) {
            if (!validateEmail(email)) {
                return res.status(400).json({ message: "Invalid email format" });
            }

            const existingUser = await User.findOne({
                where: {
                    email,
                    id: { [Op.ne]: id }
                }
            });

            if (existingUser) {
                return res.status(409).json({ message: "Email already in use" });
            }
        }

        // If roleId is being changed, check if new role exists
        if (roleId && roleId !== user.roleId) {
            const newRole = await Role.findByPk(roleId);
            if (!newRole) {
                return res.status(404).json({ message: "Role not found" });
            }
        }

        // Handle avatar update if file is uploaded
        const avatarPath = req.file ? getFileUrl(req, req.file.filename) : user.avatar;

        // Build update object
        const updateData = {
            name: name || user.name,
            email: email || user.email,
            alamat: alamat || user.alamat,
            country: country || user.country,
            state: state || user.state,
            city: city || user.city,
            district: district || user.district,
            village: village || user.village,
            phone: phone || user.phone,
            roleId: roleId || user.roleId,
            avatar: avatarPath
        };

        // Only update password if provided
        if (password) {
            if (password.length < 8) {
                return res.status(400).json({
                    message: "Password must be at least 8 characters long"
                });
            }
            updateData.password = password;
        }

        // Update user with context for revision tracking
        await user.update(updateData, {
            userId: req.userId
        });

        // Get updated user data with role
        const updatedUser = await User.findByPk(user.id, {
            attributes: { exclude: ['password'] },
            include: [{
                model: Role,
                as: 'role',
                attributes: ['id', 'name']
            }]
        });

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            user: updatedUser
        });

    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Fungsi untuk menghapus pengguna berdasarkan ID
// dengan pengecekan apakah pengguna adalah admin
const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (req.userRole !== "admin") {
        return res.status(403).json({ message: "Access denied" });
    }

    if (!id) {
        return res.status(400).json({ message: "ID user tidak ditemukan" });
    }

    try {
        // Cari termasuk data yang sudah soft deleted
        const user = await User.findByPk(id, { paranoid: false });

        if (!user) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        const userRole = await Role.findOne({ where: { id: user.roleId } });
        if (!userRole) {
            return res.status(404).json({ message: "Role tidak ditemukan" });
        }

        if (userRole.name === "admin") {
            return res.status(400).json({ message: "User tidak ditemukan" });
        }

        // Jika sudah soft deleted, maka hapus permanen
        if (user.deletedAt) {
            await user.destroy({ force: true });
            return res.status(200).json({
                success: true,
                message: "User berhasil dihapus permanen"
            });
        } else {
            await user.destroy(); // soft delete
            return res.status(200).json({
                success: true,
                message: "User berhasil dihapus"
            });
        }

    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const restoreUser = async (req, res) => {
    if (req.userRole !== "admin") {
        return res.status(403).json({ message: "Access denied" });
    }

    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "ID user tidak ditemukan" });
    }

    try {
        const user = await User.findByPk(id, { paranoid: false });

        if (!user) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        // Restore the user
        await user.restore({
            userId: req.userId // <-- tambahkan di sini
        });

        const safeUser = {
            ...user.toJSON(),
            password: undefined // Exclude password from response
        };

        res.status(200).json({
            success: true,
            message: "User berhasil dipulihkan",
            safeUser
        });
    } catch (error) {
        console.error("Error restoring user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


module.exports = {
    getUsers,
    getUserById,
    addUser,
    deleteUser,
    updateUser,
    restoreUser
};
