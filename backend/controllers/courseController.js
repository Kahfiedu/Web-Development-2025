const { createSearchWhereClause } = require('../helpers/searchQueryHelper');
const isAdmin = require('../helpers/validationAdmin');
const { Course, Category } = require('../models');
const getFileUrl = require('../utils/getFileUrl');
const { getPagination } = require('../utils/paginationUtil');
const validateCourseData = require('../utils/validateCourseData');

const createCourse = async (req, res) => {
    const validationResult = validateCourseData(req.body, 'create');
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

    const thumbnailPath = req.file ? getFileUrl(req, `course/${req.file.filename}`) : null;

    try {


        const courseData = {
            ...validationResult.data,
            thumbnail: thumbnailPath
        };

        const newCourse = await Course.create(courseData, {
            userId: validation.userId,
        });

        const resultCourse = await Course.findByPk(newCourse.id, {
            include: [{
                model: Category,
                as: "category",
                attributes: ["id", "name"]
            }]
        })

        return res.status(201).json({
            success: true,
            message: "Course berhasil dibuat",
            course: resultCourse
        });

    } catch (error) {
        console.error("Error getting courses:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }

}

const updateCourse = async (req, res) => {
    const { id } = req.params;
    const validationResult = validateCourseData(req.body, 'update');
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
        // Check if course exists
        const existingCourse = await Course.findByPk(id);
        if (!existingCourse) {
            return res.status(404).json({
                success: false,
                message: "Course tidak ditemukan"
            });
        }

        // Prepare update data
        const courseData = {
            ...validationResult.data
        };

        if (courseData.isPublish === false) {
            courseData.isFeatured = false;
        }

        // Only update thumbnail if new file is uploaded
        if (req.file) {
            const path = `course/${req.file.filename}`;
            courseData.thumbnail = getFileUrl(req, path);
        }


        // Update course
        await existingCourse.update(courseData, {
            userId: validation.userId
        });

        // Fetch updated course
        const updatedCourse = await Course.findByPk(id, {
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['id', 'name'],
                }
            ],
        });

        return res.status(200).json({
            success: true,
            message: "Course berhasil diperbarui",
            course: updatedCourse
        });

    } catch (error) {
        console.error("Error updating course:", error);
        const status = error.status || 500;
        const message = error.status ? error.message : "Internal server error";
        return res.status(status).json({
            success: false,
            message,
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

const getCourses = async (req, res) => {
    const { search = "", categoryId } = req.query;
    const searchFields = ['title'];

    try {
        // Get total count first for pagination


        // Get pagination settings
        const {
            limit,
            offset,
            statusCondition,
            paranoid,
            meta
        } = getPagination(req.query);

        // Base where clause for search
        let whereClause = createSearchWhereClause(search, searchFields);


        // Add category filter if provided
        if (categoryId) {
            whereClause.categoryId = categoryId;
        }

        // Add status condition if present
        if (statusCondition) {
            whereClause = { ...whereClause, ...statusCondition };
        }

        if (req.userRole !== "admin") {
            whereClause.isPublish = true
        }

        const totalCount = await Course.count({
            where: whereClause,
            include: [{
                model: Category,
                as: "category",
                attributes: ["id", "name"]
            }]
        })

        meta.total = totalCount;
        meta.totalPages = Math.ceil(totalCount / limit)

        // Get courses with pagination
        const { rows: courses } = await Course.findAndCountAll({
            where: whereClause,
            limit,
            offset,
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['id', 'name'],
                }
            ],
            paranoid,
            distinct: true
        });

        if (courses.length === 0) {
            // Reset meta total when no data found
            meta.total = 0;
            meta.totalPages = 0;

            return res.status(404).json({
                success: false,
                message: "Tidak ada course yang ditemukan",
                courses: [],
                meta
            });
        }

        return res.status(200).json({
            success: true,
            message: "Berhasil mendapatkan data course",
            courses,
            meta,
        });

    } catch (error) {
        console.error("Error getting courses:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

const getCourseById = async (req, res) => {
    const { id } = req.params;

    try {
        const course = await Course.findByPk(id, {
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['id', 'name'],
                }
            ],
            paranoid: false // Include soft deleted records
        });

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course tidak ditemukan"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Berhasil mendapatkan data course",
            course
        });

    } catch (error) {
        console.error("Error getting course:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

const deleteCourse = async (req, res) => {
    const { id } = req.params;

    const validation = isAdmin(req.userRole, req.userId);
    if (!validation.isValid) {
        return res.status(validation.error.status)
            .json({ message: validation.error.message });
    }

    try {
        const course = await Course.findByPk(id, {
            paranoid: false
        });

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course tidak ditemukan"
            });
        }

        if (course.deletedAt) {
            await course.destroy({
                force: true,
                userId: validation.userId
            })
            return res.status(200).json({
                success: true,
                message: "Course berhasil dihapus permanent",
            });
        }

        await course.destroy({
            userId: validation.userId
        });

        return res.status(200).json({
            success: true,
            message: "Course berhasil dihapus",
        });

    } catch (error) {
        console.error("Error deleting course:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

const restoreCourse = async (req, res) => {
    const { id } = req.params;

    const validation = isAdmin(req.userRole, req.userId);
    if (!validation.isValid) {
        return res.status(validation.error.status)
            .json({ message: validation.error.message });
    }

    try {
        const course = await Course.findByPk(id, { paranoid: false });

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course tidak ditemukan"
            });
        }

        if (!course.deletedAt) {
            return res.status(400).json({
                success: false,
                message: "Course belum dihapus"
            });
        }

        await course.restore({
            userId: validation.userId
        });

        // Fetch restored course with category
        const restoredCourse = await Course.findByPk(id, {
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['id', 'name'],
                }
            ]
        });

        return res.status(200).json({
            success: true,
            message: "Course berhasil dipulihkan",
            course: restoredCourse
        });

    } catch (error) {
        console.error("Error restoring course:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

module.exports = {
    createCourse,
    updateCourse,
    getCourses,
    getCourseById,
    deleteCourse,
    restoreCourse
};
