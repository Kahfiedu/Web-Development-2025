const { Submission, Assignment, User, Child } = require('../models');
const { createErrorResponse, createSuccessResponse } = require('../helpers/helperFunction');
const { getPagination } = require('../utils/paginationUtil');
const { isAdminOrTeacher } = require('../helpers/validationAdmin');
const getFileUrl = require('../utils/getFileUrl');
const { Op } = require('sequelize');

/**
 * Create a new submission
 */
const createSubmission = async (req, res) => {
    const { assignmentId, childId } = req.body;
    const studentId = req.userId;

    try {
        // Role-based validation
        switch (req.userRole) {
            case 'parent':
                if (!childId) {
                    return res.status(400).json(createErrorResponse(
                        "ChildId diperlukan untuk parent"
                    ));
                }
                // Verify child belongs to parent (you need to implement this check)
                break;

            case 'student':
                if (childId) {
                    return res.status(400).json(createErrorResponse(
                        "Student tidak dapat mengirim tugas untuk child"
                    ));
                }
                break;

            case 'admin':
            case 'teacher':
                return res.status(403).json(createErrorResponse(
                    "Admin/Teacher tidak dapat membuat submission"
                ));

            default:
                return res.status(403).json(createErrorResponse(
                    "Role tidak valid untuk membuat submission"
                ));
        }

        // Validate assignmentId
        if (!assignmentId) {
            return res.status(400).json(createErrorResponse(
                "AssignmentId diperlukan"
            ));
        }

        // Check if assignment exists and is still active
        const assignment = await Assignment.findOne({
            where: {
                id: assignmentId,
                dueDate: { [Op.gt]: new Date() } // Check if not past due
            }
        });

        if (!assignment) {
            return res.status(404).json(createErrorResponse(
                "Assignment tidak ditemukan atau sudah melewati batas waktu"
            ));
        }

        // Check for existing submission
        const existingSubmission = await Submission.findOne({
            where: {
                assignmentId,
                [Op.or]: [
                    { studentId: studentId || null },
                    { childId: childId || null }
                ]
            }
        });

        if (existingSubmission) {
            return res.status(400).json(createErrorResponse(
                "Submission untuk assignment ini sudah ada"
            ));
        }

        // Validate file upload
        if (!req.file) {
            return res.status(400).json(createErrorResponse(
                "File submission diperlukan"
            ));
        }

        // Create submission
        const fileUrl = getFileUrl(req, `submissions/${req.file.filename}`);
        const submissionData = {
            assignmentId,
            studentId: req.userRole === 'student' ? studentId : null,
            childId: req.userRole === 'parent' ? childId : null,
            fileUrl,
            submittedAt: new Date()
        };

        const submission = await Submission.create(submissionData, {
            userId: req.userId
        });

        // Return success response with created submission
        return res.status(201).json(createSuccessResponse(
            "Submission berhasil dibuat",
            { submission }
        ));

    } catch (error) {
        console.error("Error creating submission:", error);
        return res.status(500).json(createErrorResponse(
            "Internal server error",
            process.env.NODE_ENV === 'development' ? error.message : undefined
        ));
    }
};

/**
 * Get all submissions with pagination and filtering
 */
const getSubmissions = async (req, res) => {
    const { assignmentId, childId, studentId } = req.query;
    const isTeacherOrAdmin = ['admin', 'teacher'].includes(req.userRole);

    try {
        const {
            limit,
            offset,
            statusCondition,
            paranoid,
            meta
        } = getPagination(req.query);

        let whereClause = {};

        // Add status condition if provided
        if (statusCondition) {
            whereClause = { ...whereClause, ...statusCondition };
        }

        // Filter by assignment if provided
        if (assignmentId) {
            whereClause.assignmentId = assignmentId;
        }

        // Handle role-based filtering
        switch (req.userRole) {
            case 'parent':
                // Parents must provide childId
                if (!childId) {
                    return res.status(400).json(createErrorResponse(
                        "ChildId diperlukan untuk melihat submission anak"
                    ));
                }
                whereClause.childId = childId;
                break;

            case 'student':
                // Students can only see their own submissions
                whereClause.studentId = req.userId;
                break;

            case 'admin':
            case 'teacher':
                // Can see all submissions
                // Add optional filters if provided
                if (childId) whereClause.childId = childId;
                if (studentId) whereClause.studentId = studentId;
                break;

            default:
                return res.status(403).json(createErrorResponse(
                    "Role tidak valid untuk mengakses submission"
                ));
        }

        // Get submissions with related data
        const { rows: submissions, count } = await Submission.findAndCountAll({
            where: whereClause,
            include: [
                {
                    model: Assignment,
                    as: 'assignment',
                    attributes: ['title', 'description', 'dueDate']
                },
                {
                    model: User,
                    as: "student",
                    attributes: ['name', 'email']
                },
                {
                    model: Child,
                    as: "child",
                    attributes: ['name']
                }
            ],
            limit,
            offset,
            order: [['submittedAt', 'DESC']],
            paranoid: !isTeacherOrAdmin && paranoid,
            distinct: true
        });

        // Update meta information
        meta.total = count;
        meta.totalPages = Math.ceil(count / limit);

        // Handle no results
        if (submissions.length === 0) {
            meta.total = 0;
            meta.totalPages = 0;

            return res.status(404).json({
                success: false,
                message: "Tidak ada submission yang ditemukan",
                submissions: [],
                meta
            });
        }

        // Return successful response
        return res.status(200).json({
            success: true,
            message: "Berhasil mendapatkan data submissions",
            submissions,
            meta
        });

    } catch (error) {
        console.error("Error getting submissions:", error);
        return res.status(500).json(createErrorResponse(
            "Internal server error",
            process.env.NODE_ENV === 'development' ? error.message : undefined
        ));
    }
};

/**
 * Get submission by ID
 */
const getSubmissionById = async (req, res) => {
    const { id } = req.params;
    const { childId } = req.query; // Changed from req.body to req.query
    const isTeacherOrAdmin = ['admin', 'teacher'].includes(req.userRole);

    try {
        const submission = await Submission.findOne({
            where: { id },
            include: [
                {
                    model: Assignment,
                    as: 'assignment',
                    attributes: ['title', 'description', 'dueDate']
                },
                {
                    model: User,
                    as: "student",
                    attributes: ['name', 'email']
                },
                {
                    model: Child,
                    as: "child",
                    attributes: ['name']
                }
            ],
            paranoid: !isTeacherOrAdmin
        });

        if (!submission) {
            return res.status(404).json(createErrorResponse(
                "Submission tidak ditemukan"
            ));
        }

        // Role-based access control
        switch (req.userRole) {
            case 'parent':
                if (!childId) {
                    return res.status(400).json(createErrorResponse(
                        "ChildId diperlukan untuk melihat submission anak"
                    ));
                }
                if (submission.childId !== childId) {
                    return res.status(403).json(createErrorResponse(
                        "Anda tidak memiliki akses ke submission ini"
                    ));
                }
                break;

            case 'student':
                if (submission.studentId !== req.userId) {
                    return res.status(403).json(createErrorResponse(
                        "Anda tidak memiliki akses ke submission ini"
                    ));
                }
                break;

            case 'admin':
            case 'teacher':
                // Admin and teachers can access all submissions
                break;

            default:
                return res.status(403).json(createErrorResponse(
                    "Role tidak valid untuk mengakses submission"
                ));
        }

        return res.status(200).json(createSuccessResponse(
            "Submission ditemukan",
            { submission }
        ));

    } catch (error) {
        console.error("Error getting submission:", error);
        return res.status(500).json(createErrorResponse(
            "Internal server error",
            process.env.NODE_ENV === 'development' ? error.message : undefined
        ));
    }
};

/**
 * Grade a submission (teacher/admin only)
 */
const gradeSubmission = async (req, res) => {
    const { id } = req.params;
    const { grade, feedback } = req.body;

    const validation = isAdminOrTeacher(req.userRole, req.userId);
    if (!validation.isValid) {
        return res.status(validation.error.status)
            .json({ message: validation.error.message });
    }

    try {
        const submission = await Submission.findByPk(id);
        if (!submission) {
            return res.status(404).json(createErrorResponse(
                "Submission tidak ditemukan"
            ));
        }

        // Validate grade
        if (!grade) {
            if (typeof grade === 'number' && Number.isFinite(grade)) {
                return res.status(400).json(createErrorResponse(
                    "Grade harus berupa angka"
                ))
            }

            if (grade < 0 || grade > 100) {
                return res.status(400).json(createErrorResponse(
                    "Grade harus berupa angka antara 0 dan 100"
                ))
            }
        }

        if (!feedback) {
            return res.status(400).json(createErrorResponse(
                "Mohon memberikan feedback"
            ));
        }

        await submission.update({
            grade,
            feedback: feedback
        }, {
            userId: req.userId
        });

        return res.status(200).json(createSuccessResponse(
            "Submission berhasil dinilai",
            { submission }
        ));

    } catch (error) {
        console.error("Error grading submission:", error);
        return res.status(500).json(createErrorResponse(
            "Internal server error",
            process.env.NODE_ENV === 'development' ? error.message : undefined
        ));
    }
};

/**
 * Delete a submission (soft delete)
 */
const deleteSubmission = async (req, res) => {
    const { id } = req.params;
    const isTeacherOrAdmin = ['admin', 'teacher'].includes(req.userRole);

    try {
        const submission = await Submission.findByPk(id, {
            paranoid: false
        });
        if (!submission) {
            return res.status(404).json(createErrorResponse(
                "Submission tidak ditemukan"
            ));
        }

        // Only allow deletion by owner or teacher/admin
        if (!isTeacherOrAdmin && submission.studentId !== req.userId) {
            return res.status(403).json(createErrorResponse(
                "Anda tidak memiliki akses untuk menghapus submission ini"
            ));
        }

        if (submission.deletedAt) {
            await submission.destroy({
                force: true,
                userId: req.userId
            });

            return res.status(200).json(createSuccessResponse(
                "Submission berhasil dihapus permanen"
            ));
        }

        await submission.destroy({
            userId: req.userId
        });

        return res.status(200).json(createSuccessResponse(
            "Submission berhasil dihapus"
        ));

    } catch (error) {
        console.error("Error deleting submission:", error);
        return res.status(500).json(createErrorResponse(
            "Internal server error",
            process.env.NODE_ENV === 'development' ? error.message : undefined
        ));
    }
};

const restoreSubmission = async (req, res) => {
    const { id } = req.params;

    // Validate admin/teacher role
    const validation = isAdminOrTeacher(req.userRole, req.userId);
    if (!validation.isValid) {
        return res.status(validation.error.status)
            .json({ message: validation.error.message });
    }

    try {
        // Attempt to restore
        const restored = await Submission.restore({
            where: { id },
            userId: req.userId
        });

        if (!restored) {
            return res.status(404).json(createErrorResponse(
                "Submission tidak ditemukan atau sudah aktif"
            ));
        }

        // Get restored submission with relations
        const submission = await Submission.findOne({
            where: { id },
            include: [
                {
                    model: Assignment,
                    as: 'assignment',
                    attributes: ['title', 'description', 'dueDate']
                },
                {
                    model: User,
                    as: "student",
                    attributes: ['name', 'email']
                },
                {
                    model: Child,
                    as: "child",
                    attributes: ['name']
                }
            ]
        });

        return res.status(200).json(createSuccessResponse(
            "Submission berhasil dipulihkan",
            { submission }
        ));

    } catch (error) {
        console.error("Error restoring submission:", error);
        return res.status(500).json(createErrorResponse(
            "Internal server error",
            process.env.NODE_ENV === 'development' ? error.message : undefined
        ));
    }
};

module.exports = {
    createSubmission,
    getSubmissions,
    getSubmissionById,
    gradeSubmission,
    deleteSubmission,
    restoreSubmission
};