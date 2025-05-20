const { User, Course, Role } = require('../models');

/**
 * Validates class data for create and update operations
 * @param {Object} data Class data to validate
 * @param {string} data.courseId Class's courseId
 * @param {string} data.teacherId Class's teacherId
 * @param {string} data.name Class's name
 * @param {string} data.schedule Class's schedule
 * @param {Date} data.startDate Class's start date
 * @param {Date} data.endDate Class's end date
 * @param {string} mode Operation mode ('create' or 'update')
 * @returns {Object} Validation result
 */
const validateClassData = async (data, mode = 'create') => {
    const { name, teacherId, courseId, schedule, startDate, endDate, isActive } = data;
    const validatedData = {};

    if (mode === 'create') {
        // Check required fields for create
        if (!name || !courseId || !teacherId || !schedule || !startDate || !endDate || !isActive) {
            return {
                isValid: false,
                error: {
                    status: 400,
                    message: "Semua field harus diisi"
                }
            };
        }

        // Validate name
        if (typeof name !== 'string' || name.trim().length === 0) {
            return {
                isValid: false,
                error: {
                    status: 400,
                    message: "Nama kelas harus berupa text"
                }
            };
        }
        validatedData.name = name.trim();

        // Validate schedule
        if (typeof schedule !== 'string' || schedule.trim().length === 0) {
            return {
                isValid: false,
                error: {
                    status: 400,
                    message: "Jadwal harus berupa text"
                }
            };
        }
        validatedData.schedule = schedule.trim();

        // Validate teacherId
        const teacher = await User.findOne({
            where: {
                id: teacherId,
            },
            include: [{
                model: Role,
                as: "role",
                attribute: ["id", "name"]
            }]
        });
        if (!teacher) {
            return {
                isValid: false,
                error: {
                    status: 404,
                    message: "Pengajar tidak ditemukan"
                }
            };
        }

        if (teacher.role.name !== "teacher") {
            return {
                isValid: false,
                error: {
                    status: 400,
                    message: "teacherId bukan user dengan role teacher"
                }
            };
        }
        validatedData.teacherId = teacherId;

        if (isActive !== undefined) {
            if (typeof isActive !== 'boolean' && isActive !== 'true' && isActive !== 'false') {
                return {
                    isValid: false,
                    error: {
                        status: 400,
                        message: "isActive must be a boolean value"
                    }
                };
            }
        }
        validatedData.isActive = isActive.trim()
        // Validate courseId
        const course = await Course.findByPk(courseId);
        if (!course) {
            return {
                isValid: false,
                error: {
                    status: 404,
                    message: "Course tidak ditemukan"
                }
            };
        }
        validatedData.courseId = courseId;

        // Validate dates
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (isNaN(start.getTime())) {
            return {
                isValid: false,
                error: {
                    status: 400,
                    message: "Tanggal mulai tidak valid"
                }
            };
        }
        validatedData.startDate = start;

        if (isNaN(end.getTime())) {
            return {
                isValid: false,
                error: {
                    status: 400,
                    message: "Tanggal selesai tidak valid"
                }
            };
        }
        validatedData.endDate = end;

        if (start >= end) {
            return {
                isValid: false,
                error: {
                    status: 400,
                    message: "Tanggal selesai harus lebih besar dari tanggal mulai"
                }
            };
        }
    }

    if (mode === 'update') {
        const updates = {};

        if (name !== undefined) {
            if (typeof name !== 'string' || name.trim().length === 0) {
                return {
                    isValid: false,
                    error: {
                        status: 400,
                        message: "Nama kelas harus berupa text"
                    }
                };
            }
            updates.name = name.trim();
        }

        if (schedule !== undefined) {
            if (typeof schedule !== 'string' || schedule.trim().length === 0) {
                return {
                    isValid: false,
                    error: {
                        status: 400,
                        message: "Jadwal harus berupa text"
                    }
                };
            }
            updates.schedule = schedule.trim();
        }

        if (teacherId !== undefined) {
            const teacher = await User.findOne({
                where: {
                    id: teacherId,
                    roleId: 2
                }
            });
            if (!teacher) {
                return {
                    isValid: false,
                    error: {
                        status: 404,
                        message: "Pengajar tidak ditemukan"
                    }
                };
            }
            updates.teacherId = teacherId;
        }

        if (courseId !== undefined) {
            const course = await Course.findByPk(courseId);
            if (!course) {
                return {
                    isValid: false,
                    error: {
                        status: 404,
                        message: "Course tidak ditemukan"
                    }
                };
            }
            updates.courseId = courseId;
        }

        if (startDate !== undefined || endDate !== undefined) {
            const start = startDate ? new Date(startDate) : undefined;
            const end = endDate ? new Date(endDate) : undefined;

            if (start && isNaN(start.getTime())) {
                return {
                    isValid: false,
                    error: {
                        status: 400,
                        message: "Tanggal mulai tidak valid"
                    }
                };
            }

            if (end && isNaN(end.getTime())) {
                return {
                    isValid: false,
                    error: {
                        status: 400,
                        message: "Tanggal selesai tidak valid"
                    }
                };
            }

            if (start) updates.startDate = start;
            if (end) updates.endDate = end;

            if (start && end && start >= end) {
                return {
                    isValid: false,
                    error: {
                        status: 400,
                        message: "Tanggal selesai harus lebih besar dari tanggal mulai"
                    }
                };
            }
        }

        return {
            isValid: true,
            data: updates
        };
    }

    return {
        isValid: true,
        data: validatedData
    };
};

module.exports = validateClassData;