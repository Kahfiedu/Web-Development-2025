const { Assignment, Class } = require('../models');
const { createErrorResponse, createSuccessResponse } = require('../helpers/helperFunction');
const { createSearchWhereClause } = require('../helpers/searchQueryHelper');
const { getPagination } = require('../utils/paginationUtil');
const validateAssignmentData = require('../utils/validateAssignmentData');
const { isAdminOrTeacher } = require('../helpers/validationAdmin');

const createAssignment = async (req, res) => {
    const validationResult = await validateAssignmentData(req.body, 'create');
    if (!validationResult.isValid) {
        const { status, message } = validationResult.error;
        return res.status(status).json({
            success: false,
            message
        });
    }

    const validation = isAdminOrTeacher(req.userRole, req.userId);
    if (!validation.isValid) {
        return res.status(validation.error.status)
            .json({ message: validation.error.message });
    }

    try {
        const newAssignment = await Assignment.create(validationResult.data, {
            userId: validation.userId
        });

        const resultAssignment = await Assignment.findByPk(newAssignment.id);
        if (!resultAssignment) {
            return res.status(404).json(createErrorResponse(
                "Data tugas tidak ditemukan"
            ));
        }

        return res.status(201).json(createSuccessResponse(
            "Tugas berhasil dibuat",
            { assignment: resultAssignment }
        ));

    } catch (error) {
        console.error("Error creating assignment:", error);
        return res.status(500).json(createErrorResponse(
            "Internal server error",
            process.env.NODE_ENV === 'development' ? error.message : undefined
        ));
    }
};

const getAssignments = async (req, res) => {
    const { search = "", classId } = req.query;
    const searchFields = ['title', 'description'];
    const isAdmin = req.userRole === 'admin';

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

        if (classId) {
            whereClause.classId = classId;
        }

        const totalCount = await Assignment.count({
            where: whereClause,
            paranoid: !isAdmin && paranoid
        });

        meta.total = totalCount;
        meta.totalPages = Math.ceil(totalCount / limit);

        const { rows: assignments } = await Assignment.findAndCountAll({
            where: whereClause,
            limit,
            offset,
            include: [{ model: Class, as: "class", attributes: ["id", "name"] }],
            order: [['dueDate', 'ASC']],
            paranoid: !isAdmin && paranoid,
            distinct: true
        });

        if (assignments.length === 0) {
            meta.total = 0;
            meta.totalPages = 0;

            return res.status(404).json({
                success: false,
                message: "Tidak ada tugas yang ditemukan",
                assignments: [],
                meta
            });
        }

        return res.status(200).json({
            success: true,
            message: "Berhasil mendapatkan data tugas",
            assignments,
            meta
        });

    } catch (error) {
        console.error("Error getting assignments:", error);
        return res.status(500).json(createErrorResponse(
            "Internal server error",
            process.env.NODE_ENV === 'development' ? error.message : undefined
        ));
    }
};

const getAssignmentById = async (req, res) => {
    const { id } = req.params;
    const isAdmin = req.userRole === 'admin';

    try {
        const assignment = await Assignment.findByPk(id, {
            paranoid: !isAdmin,
            include: [{ model: Class, as: "class", attributes: ["id", "name"] }],
        });

        if (!assignment) {
            return res.status(404).json(createErrorResponse(
                "Data tugas tidak ditemukan"
            ));
        }

        return res.status(200).json(createSuccessResponse(
            "Data tugas ditemukan",
            { assignment }
        ));

    } catch (error) {
        console.error("Error getting assignment:", error);
        return res.status(500).json(createErrorResponse(
            "Internal server error",
            process.env.NODE_ENV === 'development' ? error.message : undefined
        ));
    }
};

const updateAssignment = async (req, res) => {
    const { id } = req.params;
    const validationResult = await validateAssignmentData(req.body, 'update');

    if (!validationResult.isValid) {
        const { status, message } = validationResult.error;
        return res.status(status).json({
            success: false,
            message
        });
    }

    const validation = isAdminOrTeacher(req.userRole, req.userId);
    if (!validation.isValid) {
        return res.status(validation.error.status)
            .json({ message: validation.error.message });
    }

    try {
        const assignment = await Assignment.findByPk(id);
        if (!assignment) {
            return res.status(404).json(createErrorResponse(
                "Data tugas tidak ditemukan"
            ));
        }

        await assignment.update(validationResult.data, {
            userId: validation.userId
        });

        const updatedAssignment = await Assignment.findByPk(id);

        return res.status(200).json(createSuccessResponse(
            "Tugas berhasil diperbarui",
            { assignment: updatedAssignment }
        ));

    } catch (error) {
        console.error("Error updating assignment:", error);
        return res.status(500).json(createErrorResponse(
            "Internal server error",
            process.env.NODE_ENV === 'development' ? error.message : undefined
        ));
    }
};

const deleteAssignment = async (req, res) => {
    const { id } = req.params;

    const validation = isAdminOrTeacher(req.userRole, req.userId);
    if (!validation.isValid) {
        return res.status(validation.error.status)
            .json({ message: validation.error.message });
    }

    try {
        const assignment = await Assignment.findByPk(id, {
            paranoid: false
        });
        if (!assignment) {
            return res.status(404).json(createErrorResponse(
                "Data tugas tidak ditemukan"
            ));
        }

        if (assignment.deletedAt) {
            await assignment.destroy({
                force: true,
                userId: validation.userId
            })
            return res.status(200).json(createSuccessResponse(
                "Tugas berhasil dihapus permanen"
            ));
        }
        await assignment.destroy({
            userId: validation.userId
        });

        return res.status(200).json(createSuccessResponse(
            "Tugas berhasil dihapus"
        ));

    } catch (error) {
        console.error("Error deleting assignment:", error);
        return res.status(500).json(createErrorResponse(
            "Internal server error",
            process.env.NODE_ENV === 'development' ? error.message : undefined
        ));
    }
};

const restoreAssignment = async (req, res) => {
    const { id } = req.params;

    const validation = isAdminOrTeacher(req.userRole, req.userId);
    if (!validation.isValid) {
        return res.status(validation.error.status)
            .json({ message: validation.error.message });
    }

    try {
        const restored = await Assignment.restore({
            where: { id },
            userId: validation.userId
        });

        if (!restored) {
            return res.status(404).json(createErrorResponse(
                "Data tugas tidak ditemukan atau sudah aktif"
            ));
        }

        const assignment = await Assignment.findByPk(id);

        return res.status(200).json(createSuccessResponse(
            "Tugas berhasil dipulihkan",
            { assignment }
        ));

    } catch (error) {
        console.error("Error restoring assignment:", error);
        return res.status(500).json(createErrorResponse(
            "Internal server error",
            process.env.NODE_ENV === 'development' ? error.message : undefined
        ));
    }
};

module.exports = {
    createAssignment,
    getAssignments,
    getAssignmentById,
    updateAssignment,
    deleteAssignment,
    restoreAssignment
};