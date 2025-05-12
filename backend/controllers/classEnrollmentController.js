const { createSearchWhereClause } = require('../helpers/searchQueryHelper');
const { ClassEnrollment, User, Child, Class } = require('../models');
const { getPagination } = require('../utils/paginationUtil');
const { validateClassEnrollmentData } = require('../utils/validateClassEnrollmentData');
const { Op } = require('sequelize');

const createClassEnrollment = async (req, res) => {
    const validationResult = await validateClassEnrollmentData(req.body, 'create');
    if (!validationResult.isValid) {
        return res.status(validationResult.error.status).json({
            success: false,
            message: validationResult.error.message
        });
    }

    try {

        const newEnrollment = await ClassEnrollment.create(validationResult.data, {
            userId: req.userId
        });

        const result = await ClassEnrollment.findByPk(newEnrollment.id, {
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
            message: 'Pendaftaran kelas berhasil dibuat',
            class_enrollment: result
        });
    } catch (error) {
        console.error("Error getting class:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

const getClassEnrollments = async (req, res) => {
    const {
        search = "",
        classId,
        studentId,
        childId
    } = req.query;

    const searchFields = ['status']; // misalnya, search hanya untuk status teks
    const exactMatchFields = { classId, studentId, childId };

    try {
        const {
            limit,
            offset,
            statusCondition,
            paranoid,
            meta
        } = getPagination(req.query);

        // Build exact match filter
        const additionalFilters = {};
        for (const [key, value] of Object.entries(exactMatchFields)) {
            if (value) {
                additionalFilters[key] = { [Op.eq]: value };
            }
        }

        // Build full where clause
        let whereClause = createSearchWhereClause(search, searchFields, additionalFilters);

        // Tambahkan status jika ada
        if (statusCondition) {
            whereClause = { ...whereClause, ...statusCondition };
        }

        const totalCount = await ClassEnrollment.count({
            where: whereClause,
            include: [
                { model: Class, as: 'class' },
                { model: User, as: 'student' },
                { model: Child, as: 'child' },
            ]
        });

        meta.total = totalCount;
        meta.totalPages = Math.ceil(totalCount / limit);

        const enrollments = await ClassEnrollment.findAll({
            where: whereClause,
            limit,
            offset,
            order: [['createdAt', 'DESC']],
            include: [
                { model: Class, as: 'class' },
                { model: User, as: 'student' },
                { model: Child, as: 'child' },
            ],
            paranoid,
            distinct: true
        });

        if (enrollments.length === 0) {
            meta.total = 0;
            meta.totalPages = 0;
            return res.status(404).json({
                success: false,
                message: "Tidak ada data pendaftaran yang ditemukan",
                class_enrollments: [],
                meta
            });
        }

        return res.status(200).json({
            success: true,
            message: "Berhasil mendapatkan data pendaftaran kelas",
            class_enrollments: enrollments,
            meta
        });

    } catch (err) {
        console.error("Error getting class enrollments:", err);
        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan internal",
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};


const getClassEnrollmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const enrollment = await ClassEnrollment.findByPk(id, {
            include: [
                { model: Class, as: 'class' },
                { model: User, as: 'student' },
                { model: Child, as: 'child' },
            ],
            paranoid: false
        });

        if (!enrollment) {
            return res.status(404).json({
                success: false,
                message: 'Pendaftaran tidak ditemukan'
            });
        }

        return res.status(200).json({
            success: true,
            message: "Data Pendaftaran di dapatkan",
            class_enrollment: enrollment
        });
    } catch (error) {
        console.error("Error getting class:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

const updateClassEnrollment = async (req, res) => {
    try {
        const { id } = req.params;
        const validationResult = await validateClassEnrollmentData(req.body, 'update');
        if (!validationResult.isValid) {
            return res.status(validationResult.error.status).json({
                success: false,
                message: validationResult.error.message
            });
        }

        const enrollment = await ClassEnrollment.findByPk(id);
        if (!enrollment) {
            return res.status(404).json({
                success: false,
                message: 'Pendaftaran tidak ditemukan'
            });
        }

        await enrollment.update(validationResult.data, {
            userId: req.userId
        });

        return res.status(200).json({
            success: true,
            message: 'Pendaftaran berhasil diperbarui',
            class_enrollment: enrollment
        });

    } catch (error) {
        console.error("Error getting class:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

const deleteClassEnrollment = async (req, res) => {
    try {
        const { id } = req.params;
        const enrollment = await ClassEnrollment.findByPk(id, {
            paranoid: false
        });
        if (!enrollment) {
            return res.status(404).json({
                success: false,
                message: 'Pendaftaran tidak ditemukan'
            });
        }

        if (enrollment.deletedAt) {
            await enrollment.destroy({
                force: true,
                userId: req.userId
            })

            return res.status(200).json({
                success: true,
                message: "Pendaftaran berhasil di hapus permanent"
            })
        }

        await enrollment.destroy({
            userId: req.userId
        });
        // soft delete
        return res.status(200).json({
            success: true,
            message: 'Pendaftaran berhasil dihapus (soft delete)'
        });
    } catch (error) {
        console.error("Error getting class:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

const restoreClassEnrollment = async (req, res) => {
    try {
        const { id } = req.params;
        const enrollment = await ClassEnrollment.findOne({
            where: { id },
            paranoid: false
        });

        if (!enrollment) {
            return res.status(404).json({
                success: false,
                message: 'Pendaftaran tidak ditemukan'
            });
        }

        if (!enrollment.deletedAt) {
            return res.status(400).json({
                success: false,
                message: 'Pendaftaran belum dihapus'
            });
        }

        await enrollment.restore({
            userId: req.userId
        });
        return res.status(200).json({
            success: true,
            message: 'Pendaftaran berhasil dipulihkan kembali'
        });
    } catch (error) {
        console.error("Error getting class:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

module.exports = {
    createClassEnrollment,
    getClassEnrollments,
    getClassEnrollmentById,
    updateClassEnrollment,
    deleteClassEnrollment,
    restoreClassEnrollment
};
