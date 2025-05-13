const { Op } = require('sequelize');
const { createSearchWhereClause } = require('../helpers/searchQueryHelper');
const { Lesson, Class } = require('../models');
const { getPagination } = require('../utils/paginationUtil');
const { validateLessonData } = require('../utils/validateLessonData');

const createLesson = async (req, res) => {
    const validationResult = await validateLessonData(req.body, 'create');
    if (!validationResult.isValid) {
        return res.status(validationResult.error.status).json({
            success: false,
            message: validationResult.error.message
        });
    }

    try {
        const newLesson = await Lesson.create(validationResult.data, {
            userId: req.userId
        });

        const result = await Lesson.findByPk(newLesson.id, {
            include: [
                {
                    model: Class,
                    as: "class",
                    attributes: ["id", "name"]
                },
            ]
        })

        return res.status(201).json({
            success: true,
            message: "Data lesson berhasil dibuat",
            lesson: result
        })
    } catch (error) {
        console.error("Error deleting course:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

const getLessons = async (req, res) => {
    const {
        search = "",
        classId
    } = req.query;

    const searchFields = ['title']; // misalnya, search hanya untuk status teks
    const exactMatchFields = { classId };

    try {

        const {
            limit,
            offset,
            statusCondition,
            paranoid,
            meta
        } = getPagination(req.query);

        const additionalFilters = {};
        for (const [key, value] of Object.entries(exactMatchFields)) {
            if (value) {
                additionalFilters[key] = { [Op.eq]: value };
            }
        }

        let whereClause = createSearchWhereClause(search, searchFields, additionalFilters);

        if (statusCondition) {
            whereClause = { ...whereClause, ...statusCondition };
        }

        const totalCount = await Lesson.count({
            where: whereClause,
            include: [
                { model: Class, as: 'class', attributes: ["id", "name"] },
            ]
        });

        meta.total = totalCount;
        meta.totalPages = Math.ceil(totalCount / limit)

        const lessons = await Lesson.findAll({
            where: whereClause,
            limit,
            offset,
            order: [['order', 'ASC']],
            include: [
                { model: Class, as: 'class', attributes: ["id", "name"] },
            ],
            paranoid,
            distinct: true
        });

        if (lessons.length === 0) {
            meta.total = 0;
            meta.totalPages = 0;
            return res.status(404).json({
                success: false,
                message: "Tidak ada data lesson yang ditemukan",
                lessons: [],
                meta
            });
        }

        return res.status(200).json({
            success: true,
            message: "Berhasil mendapatkan data lesson",
            lessons: lessons,
            meta
        });

    } catch (error) {
        console.error("Error getting class enrollments:", err);
        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan internal",
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }

}

const getLessonById = async (req, res) => {
    const { id } = req.params;

    try {
        const lesson = await Lesson.findByPk(id, {
            include: [
                {
                    model: Class,
                    as: 'class',
                    include: [{
                        model: Course,
                        as: 'course',
                        attributes: ["id", "title"]
                    }]
                }
            ],
            paranoid: false
        })

        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: 'Lesson tidak ditemukan'
            });
        }

        return res.status(200).json({
            success: true,
            message: "Data Pendaftaran di dapatkan",
            lesson: lesson
        });
    } catch (error) {
        console.error("Error getting lesson:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

const updateLesson = async (req, res) => {
    const { id } = req.params;

    const validationResult = await validateLessonData(req.body, 'update');
    if (!validationResult.isValid) {
        return res.status(validationResult.error.status).json({
            success: false,
            message: validationResult.error.message
        });
    }

    try {
        const lesson = await Lesson.findByPk(id);
        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: 'Data Lesson tidak ditemukan'
            });
        }

        await lesson.update(validationResult.data, {
            userId: req.userId
        });

        return res.status(200).json({
            success: true,
            message: 'Pendaftaran berhasil diperbarui',
            lesson: lesson
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

const deleteLesson = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId
    try {
        const lesson = await Lesson.findByPk(id, {
            paranoid: false
        });

        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: 'Lesson tidak ditemukan'
            });
        }

        if (lesson.deletedAt) {
            await lesson.destroy({
                force: true,
                userId: userId
            })

            return res.status(200).json({
                success: true,
                message: "Lesson berhasil di hapus permanent"
            })
        }

        await lesson.destroy({
            userId: userId
        })

        return res.status(200).json({
            success: true,
            message: 'Lesson berhasil dihapus (soft delete)'
        });
    } catch (error) {
        console.error("Error getting lesson:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

const restoreLesson = async (req, res) => {
    const { id } = req.params
    const userId = req.userId

    try {
        const lesson = await Lesson.findByPk(id, {
            paranoid: false
        });

        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: 'Lesson tidak ditemukan'
            });
        }

        if (!lesson.deletedAt) {
            return res.status(400).json({
                success: false,
                message: 'Lesson belum dihapus'
            });
        }

        await lesson.restore({
            userId: userId
        });

        const result = await Lesson.findByPk(lesson.id, {
            include: [
                {
                    model: Class,
                    as: 'class',
                    include: [{
                        model: Course,
                        as: 'course',
                        attributes: ["id", "title"]
                    }]
                }
            ],
            paranoid: false
        })

        return res.status(200).json({
            success: true,
            message: 'Lesson berhasil dipulihkan kembali',
            lesson: result
        });
    } catch (error) {
        console.error("Error getting lesson:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

module.exports = {
    createLesson,
    getLessons,
    getLessonById,
    updateLesson,
    deleteLesson,
    restoreLesson
}