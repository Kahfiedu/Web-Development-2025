const { isAdmin } = require('../helpers/validationAdmin');
const { Class, Course, User, Category, Role } = require('../models')
const validateClassData = require('../utils/validateClassData')
const { getPagination } = require('../utils/paginationUtil');
const { createSearchWhereClause } = require('../helpers/searchQueryHelper');


const createClass = async (req, res) => {
    const validationResult = await validateClassData(req.body, 'create');

    if (!validationResult.isValid) {
        const { status, message } = validationResult.error;
        return res.status(status).json({
            success: false,
            message
        });
    }

    const validation = isAdmin(req.userRole, req.userId);
    if (!validation.isValid) {
        return res.status(validation.error.status)
            .json({ message: validation.error.message });
    }

    try {
        const classData = {
            ...validationResult.data
        }
        const newClass = await Class.create(classData, {
            userId: validation.userId
        })

        const resultClass = await Class.findByPk(newClass.id, {
            include: [
                {
                    model: Course,
                    as: "course",
                    attributes: ["id", "title"]
                },
                {
                    model: User,
                    as: "teacher",
                    attributes: ["id", "name"]
                }
            ]
        })

        return res.status(201).json({
            success: true,
            message: "Class berhasil dibuat",
            class: resultClass
        });


    } catch (error) {
        console.error("Error getting class:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

const getClasses = async (req, res) => {
    const { search = "" } = req.query;
    const searchFields = ['name']; // Sesuaikan dengan field class

    try {
        const {
            limit,
            offset,
            statusCondition,
            paranoid,
            meta
        } = getPagination(req.query);

        let whereClause = createSearchWhereClause(search, searchFields);
        if (statusCondition) {
            whereClause = { ...whereClause, ...statusCondition };
        }

        const totalCount = await Class.count({ where: whereClause });
        meta.total = totalCount;
        meta.totalPages = Math.ceil(totalCount / limit);

        const classes = await Class.findAll({
            where: whereClause,
            limit,
            offset,
            order: [['createdAt', 'DESC']],
            include: [
                { model: Course, as: 'course', attributes: ['id', 'title'] },
                { model: User, as: 'teacher', attributes: ['id', 'name'] }
            ],
            paranoid
        });

        return res.status(200).json({
            success: true,
            message: "Berhasil mendapatkan data kelas",
            classes,
            meta
        });
    } catch (error) {
        console.error("Error getting classes:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const getClassById = async (req, res) => {
    const { id } = req.params;
    try {
        const cls = await Class.findByPk(id, {
            include: [
                {
                    model: Course,
                    as: 'course',
                    attributes: ['id', 'title', 'level'],
                    include: [{ model: Category, as: 'category', attributes: ['id', 'name'] }]
                },
                {
                    model: User,
                    as: 'teacher',
                    attributes: ['id', 'name'],
                    include: [{ model: Role, as: 'role', attributes: ['id', 'name'] }]
                }
            ],
            paranoid: false
        });

        if (!cls) {
            return res.status(404).json({ success: false, message: "Class tidak ditemukan" });
        }

        return res.status(200).json({
            success: true,
            message: "Berhasil mendapatkan data class",
            class: cls
        });
    } catch (error) {
        console.error("Error getting class by ID:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const updateClass = async (req, res) => {
    const { id } = req.params;
    const validationResult = await validateClassData(req.body, 'update');
    if (!validationResult.isValid) {
        const { status, message } = validationResult.error;
        return res.status(status).json({ success: false, message });
    }

    const validation = isAdmin(req.userRole, req.userId);
    if (!validation.isValid) {
        return res.status(validation.error.status).json({ message: validation.error.message });
    }

    try {
        const cls = await Class.findByPk(id);
        if (!cls) {
            return res.status(404).json({ success: false, message: "Class tidak ditemukan" });
        }

        await cls.update(validationResult.data, { userId: validation.userId });

        const updatedClass = await Class.findByPk(id, {
            include: [
                { model: Course, as: 'course', attributes: ['id', 'title'] },
                { model: User, as: 'teacher', attributes: ['id', 'name'] }
            ]
        });

        return res.status(200).json({
            success: true,
            message: "Class berhasil diperbarui",
            class: updatedClass
        });
    } catch (error) {
        console.error("Error updating class:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const deleteClass = async (req, res) => {
    const { id } = req.params;

    const validation = isAdmin(req.userRole, req.userId);
    if (!validation.isValid) {
        return res.status(validation.error.status).json({ message: validation.error.message });
    }

    try {
        const cls = await Class.findByPk(id, { paranoid: false });
        if (!cls) {
            return res.status(404).json({ success: false, message: "Class tidak ditemukan" });
        }

        if (cls.deletedAt) {
            await cls.destroy({ force: true, userId: validation.userId });
            return res.status(200).json({ success: true, message: "Class berhasil dihapus permanent" });
        }

        await cls.destroy({ userId: validation.userId });
        return res.status(200).json({ success: true, message: "Class berhasil dihapus" });
    } catch (error) {
        console.error("Error deleting class:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const restoreClass = async (req, res) => {
    const { id } = req.params;

    const validation = isAdmin(req.userRole, req.userId);
    if (!validation.isValid) {
        return res.status(validation.error.status).json({ message: validation.error.message });
    }

    try {
        const cls = await Class.findByPk(id, { paranoid: false });
        if (!cls) {
            return res.status(404).json({ success: false, message: "Class tidak ditemukan" });
        }

        if (!cls.deletedAt) {
            return res.status(400).json({ success: false, message: "Class belum dihapus" });
        }

        await cls.restore({ userId: validation.userId });

        const restoredClass = await Class.findByPk(id, {
            include: [
                { model: Course, as: 'course', attributes: ['id', 'title'] },
                { model: User, as: 'teacher', attributes: ['id', 'name'] }
            ]
        });

        return res.status(200).json({
            success: true,
            message: "Class berhasil dipulihkan",
            class: restoredClass
        });
    } catch (error) {
        console.error("Error restoring class:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = {
    createClass,
    getClasses,
    getClassById,
    updateClass,
    deleteClass,
    restoreClass
};