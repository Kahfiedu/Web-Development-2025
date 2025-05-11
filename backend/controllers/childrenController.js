const { createSearchWhereClause } = require("../helpers/searchQueryHelper");
const { Child, User } = require("../models");
const { Op } = require('sequelize');
const { validateChildData } = require("../utils/validateChildData");


const createChild = async (req, res) => {
    const validation = validateChildData(req.body, 'create');
    if (!validation.isValid) {
        return res.status(validation.error.status).json({
            success: false,
            message: validation.error.message
        });
    }

    const userId = req.userId;
    const userRole = req.userRole;

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

    if (userRole !== "parent") {
        return res.status(403).json({
            success: false,
            message: "Anda bukan orang tua"
        });
    }

    try {

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User tidak ditemukan atau sudah dihapus"
            });
        }

        const newChild = await Child.create({
            ...validation.data,
            parentId: userId
        }, {
            userId: userId
        });

        return res.status(201).json({
            success: true,
            message: "Berhasil menamabhkan data anak",
            newChild,
        }, {
            userId: userId
        });


    } catch (error) {
        console.error("Error creating Child:", error);
        const status = error.status || 500;
        const message = error.status ? error.message : "Internal server error";
        return res.status(status).json({
            success: false,
            message
        });
    }


}

const getChildrens = async (req, res) => {
    const { page = 1, limit = 10, search = "", isActive } = req.query;
    const { name, age, relationship, gender } = req.query;

    const userId = req.userId;
    const userRole = req.userRole;

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

    if (userRole !== "parent" && userRole !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Anda bukan orang tua atau admin"
        });
    }

    const offset = (parseInt(page) - 1) * parseInt(limit);
    const searchFields = ['name', 'relationship', 'gender'];

    try {
        // Base where clause for search
        let whereClause = createSearchWhereClause(search, searchFields);

        // Add additional filters if provided
        if (name) whereClause.name = { [Op.like]: `%${name}%` };
        if (age) whereClause.age = age;
        if (relationship) whereClause.relationship = relationship;
        if (gender) whereClause.gender = gender;
        if (isActive !== undefined) whereClause.isActive = isActive === 'true';

        // Different queries for parent and admin
        if (userRole === "parent") {
            whereClause.parentId = userId;
        }

        const { count, rows: childrens } = await Child.findAndCountAll({
            where: whereClause,
            limit: parseInt(limit),
            offset: offset,
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: User,
                    as: 'parent',
                    attributes: ['id', 'name', 'email', 'phone'],
                }
            ],
            distinct: true
        });

        const totalPages = Math.ceil(count / parseInt(limit));

        const meta = {
            page: parseInt(page),
            limit: parseInt(limit),
            totalItems: count,
            totalPages,
        };

        if (childrens.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Data anak tidak ditemukan",
                childrens: [],
                meta
            });
        }

        return res.status(200).json({
            success: true,
            message: "Berhasil mendapatkan data anak",
            childrens,
            meta
        });

    } catch (error) {
        console.error("Error getting children:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

const getChildById = async (req, res) => {
    const { id } = req.params;

    const userId = req.userId;
    const userRole = req.userRole;

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

    if (userRole !== "parent" && userRole !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Anda bukan orang tua atau admin"
        });
    }

    try {
        const children = await Child.findOne({
            where: { id },
            include: [
                {
                    model: User,
                    as: 'parent',
                    attributes: ['id', 'name', 'email', 'phone'],
                }
            ]
        });

        if (!children) {
            return res.status(404).json({
                success: false,
                message: "Data anak tidak ditemukan",
                children: null
            });
        }

        return res.status(200).json({
            success: true,
            message: "Berhasil mendapatkan data anak",
            children
        });

    } catch (error) {
        console.error("Error getting child by ID:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

const updateChild = async (req, res) => {
    const { id } = req.params;
    const validation = validateChildData(req.body, 'update');
    if (!validation.isValid) {
        return res.status(validation.error.status).json({
            success: false,
            message: validation.error.message
        });
    }

    const userId = req.userId;
    const userRole = req.userRole;

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

    if (userRole !== "parent" && userRole !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Anda bukan orang tua atau admin"
        });
    }

    try {
        const child = await Child.findByPk(id);

        if (!child) {
            return res.status(404).json({
                success: false,
                message: "Data anak tidak ditemukan",
                child: null
            });
        }

        await child.update(validation.data);

        return res.status(200).json({
            success: true,
            message: "Berhasil memperbarui data anak",
            child
        });

    } catch (error) {
        console.error("Error updating child:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

const deleteChild = async (req, res) => {
    const { id } = req.params;

    const userId = req.userId;
    const userRole = req.userRole;

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

    if (userRole !== "parent" && userRole !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Anda bukan orang tua atau admin"
        });
    }

    try {
        const children = await Child.findByPk(id,
            {
                paranoid: false
            }
        );

        if (!children) {
            return res.status(404).json({
                success: false,
                message: "Data anak tidak ditemukan",
                children: null
            });
        }

        if (children.deletedAt) {
            await children.destroy({
                force: true,
                userId: userId
            });
            return res.status(200).json({
                success: true,
                message: "Data anak dihapus permanen",
            });
        }

        await children.destroy(
            {
                userId: userId
            }
        );

        return res.status(200).json({
            success: true,
            message: "Berhasil menghapus data anak",
        });

    } catch (error) {
        console.error("Error deleting child:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

const restoreChild = async (req, res) => {
    const { id } = req.params;

    const userId = req.userId;
    const userRole = req.userRole;

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

    if (userRole !== "parent" && userRole !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Anda bukan orang tua atau admin"
        });
    }

    try {
        const child = await Child.findByPk(id, {
            paranoid: false
        });

        if (!child) {
            return res.status(404).json({
                success: false,
                message: "Data anak tidak ditemukan",
                child: null
            });
        }

        await child.restore({
            userId: userId
        });

        return res.status(200).json({
            success: true,
            message: "Berhasil memulihkan data anak",
            child
        });

    } catch (error) {
        console.error("Error restoring child:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

module.exports = {
    createChild,
    getChildrens,
    getChildById,
    updateChild,
    deleteChild,
    restoreChild,
}