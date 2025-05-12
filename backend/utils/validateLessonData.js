const { Course } = require('../models')

/**
 * Validates child data for create and update operations
 * @param {Object} data Course data to validate
 * @param {string} data.courseId Course's title
 * @param {string} data.title Course's description
 * @param {string} data.content Course's categoryId
 * @param {string} data.videoUrl Course's level
 * @param {number} data.order Course's publish status
 * @param {string} mode Operation mode ('create' or 'update')
 * @returns {Object} Validation result
 */


const validateLessonData = (data, mode = 'create') => {
    const { courseId, title, content, videoUrl, order } = data;
    const validatedData = {};

    if (mode === 'create') {
        if (!title || !courseId || !content || !order) {
            return {
                isValid: false,
                error: {
                    status: 400,
                    message: "courseId, title, content, and order are required"
                }
            };
        }
    }

    if (title !== undefined) {
        if (typeof title !== 'string' || title.trim().length === 0) {
            return {
                isValid: false,
                error: {
                    status: 400,
                    message: "Title must be a string and cannot be empty"
                }
            };
        }
        validatedData.title = title.trim();
    }

    if (courseId !== undefined) {
        if (typeof courseId !== 'string' || courseId.trim().length === 0) {
            return {
                isValid: false,
                error: {
                    status: 400,
                    message: "CourseId must be a string and cannot be empty"
                }
            };
        }

        const course = Course.findOne({ where: { id: courseId } });
        if (!course) {
            return {
                isValid: false,
                error: {
                    status: 404,
                    message: "Course not found"
                }
            };
        }
        validatedData.courseId = courseId.trim();
    }

    if (content !== undefined) {
        if (typeof content !== 'string' || content.trim().length === 0) {
            return {
                isValid: false,
                error: {
                    status: 400,
                    message: "Content must be a string and cannot be empty"
                }
            };
        }
        validatedData.content = content.trim();
    }

    if (order !== undefined) {
        if (typeof order === 'number' && Number.isFinite(order)) {
            return {
                isValid: false,
                error: {
                    status: 400,
                    message: "Order must be a valid number"
                }
            };
        }
        validatedData.order = order.trim();
    }

    if (videoUrl !== undefined) {
        if (typeof videoUrl !== 'string' || videoUrl.trim().length === 0) {
            return {
                isValid: false,
                error: {
                    status: 400,
                    message: "Video URL must be a non-empty string"
                }
            };
        }

        // (Opsional) Validasi format URL secara dasar
        try {
            new URL(videoUrl); // akan throw jika bukan URL valid
        } catch {
            return {
                isValid: false,
                error: {
                    status: 400,
                    message: "Video URL is not a valid URL format"
                }
            };
        }

        validatedData.videoUrl = videoUrl.trim();
    } else if (mode === 'create') {
        validatedData.videoUrl = null;
    }

    if (mode === 'update' && Object.keys(validatedData).length === 0) {
        return {
            isValid: false,
            error: {
                status: 400,
                message: "Minimal satu field harus diisi untuk update"
            }
        };
    }

    return {
        isValid: true,
        data: validatedData
    };

}

module.exports = { validateLessonData }