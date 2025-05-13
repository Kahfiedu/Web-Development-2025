const { Op } = require('sequelize')
const { Attendance, Lesson, User, Class, Child, ClassEnrollment } = require('../models')
const { getPagination } = require('../utils/paginationUtil')
const { createSearchWhereClause } = require('../helpers/searchQueryHelper')

const createAttendance = async (req, res) => {
    const { code, execuseLetter, description, status } = req.body
    const userId = req.userId
    const userRole = req.userRole

    if (!code || !status) {
        return res.status(401).json({
            success: false,
            message: "Code and status is required"
        })
    }

    if (status !== 'izin' && status !== 'sakit' && status !== 'hadir') {
        return res.status(401).json({
            success: false,
            message: "status harus (izin, sakit, hadir)"
        })
    }

    try {
        const attendanceData = {}
        const lesson = await Lesson.findOne({
            where: { code },
        });

        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: `Lesson dengan code (${code}) tidak ada`
            });
        }

        const existingUser = await User.findByPk(userId);

        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "Data user tidak ditemukan"
            });
        }

        // Handle student or parent
        if (userRole === 'student') {
            // Check if student is enrolled in the class
            const isEnrolled = await ClassEnrollment.findOne({
                where: {
                    childId: userId,
                    classId: lesson.classId
                }
            });

            if (!isEnrolled) {
                return res.status(403).json({
                    success: false,
                    message: "Siswa tidak terdaftar di kelas ini"
                });
            }

            attendanceData.studentId = userId;
        } else if (userRole === 'parent') {
            // Get child data for parent
            const existingChild = await Child.findOne({
                where: {
                    parentId: userId
                }
            });

            if (!existingChild) {
                return res.status(404).json({
                    success: false,
                    message: "Data anak tidak ditemukan"
                });
            }

            // Check if child is enrolled in the class
            const isEnrolled = await ClassEnrollment.findOne({
                where: {
                    childId: existingChild.id,
                    classId: lesson.classId
                }
            });

            if (!isEnrolled) {
                return res.status(403).json({
                    success: false,
                    message: "Anak tidak terdaftar di kelas ini"
                });
            }

            attendanceData.childId = existingChild.id;
        } else if (userRole === 'teacher') {
            const isTeacherClass = Class.findOne({
                where: {
                    id: lesson.classId,
                    teacherId: userId
                }
            })

            if (!isTeacherClass) {
                return res.status(403).json({
                    success: false,
                    message: "Anda bukan guru di kelas ini"
                });
            }

            attendanceData.teacherId = userId
        } else {
            return res.status(403).json({
                success: false,
                message: "Hanya siswa, guru atau orang tua yang dapat membuat absensi"
            });
        }

        // Add other attendance data
        attendanceData.execuseLetter = execuseLetter || null;
        attendanceData.description = description || null;
        attendanceData.status = status;
        attendanceData.code = code;
        attendanceData.classId = lesson.classId;
        attendanceData.lessonId = lesson.id;
        attendanceData.scanTime = new Date();

        const newAttendance = await Attendance.create(attendanceData, {
            userId: userId
        });

        return res.status(201).json({
            success: true,
            message: "Berhasil membuat absensi",
            attendance: newAttendance
        });

    } catch (error) {
        console.error("Error create attendance:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

const updateAttendance = async (req, res) => {
    const { id } = req.params
    const { isVerified } = req.body
    const userRole = req.userRole
    const userId = req.userId

    if (!isVerified) {
        return res.status(401).json({
            success: false,
            message: "isVerified is required"
        })
    }
    if (typeof isVerified !== 'boolean' && isVerified !== 'true' && isVerified !== 'false') {
        return {
            isValid: false,
            error: {
                status: 400,
                message: "isVerified must be a boolean value"
            }
        };
    }

    if (userRole !== 'admin' && userRole !== 'teacher') {
        return res.status(403).json({
            success: false,
            message: "Hanya admin atau teacher yang dapat akses"
        })
    }
    try {

        const existingAttendance = await Attendance.findByPk(id)

        if (!existingAttendance) {
            return res.status(404).json({
                success: false,
                message: "Attendance tidak di temukan"
            })
        }

        if (userRole === 'teacher') {
            const isTeacher = Class.findOne({
                where: {
                    id: existingAttendance.classId,
                    teacherId: userId
                }
            })

            if (!isTeacher) {
                return res.status(403).json({
                    success: false,
                    message: "Anda bukan guru dikelas sini"
                })
            }
        }

        if (existingAttendance.teacherId === userId) {
            return res.status(401).json({
                success: false,
                message: "Anda tidak dapat menyetujui attendance ini"
            })
        }

        existingAttendance.isVerified = isVerified
        await existingAttendance.save({
            userId: userId
        })
        return res.status(200).json({
            success: true,
            message: "Update berhasil",
            attendance: existingAttendance
        })

    } catch (error) {
        console.error("Error create attendance:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

const getAttendances = async (req, res) => {
    const {
        search = "",
        classId,
        childId,
        studentId,
        teacherId,
    } = req.query

    const searchFields = ['code']; // misalnya, search hanya untuk status teks
    const exactMatchFields = {
        classId, childId, studentId, teacherId,
    };

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


        const totalCount = await Attendance.count({
            where: whereClause,
        });

        meta.total = totalCount;
        meta.totalPages = Math.ceil(totalCount / limit)

        const attendances = await Attendance.findAll({
            where: whereClause,
            limit,
            offset,
            order: [['updatedAt', 'DESC']],
            include: [
                {
                    model: Class,
                    as: 'class',
                    attributes: ["id", "name"],
                    include: [{
                        model: User,
                        as: 'teacher',
                        attributes: ["id", "name", "phone"]
                    }]
                },
                { model: Lesson, as: 'lesson', attributes: ["id", "title"] },
            ],
            paranoid,
            distinct: true
        });

        if (attendances.length === 0) {
            meta.total = 0;
            meta.totalPages = 0;
            return res.status(404).json({
                success: false,
                message: "Tidak ada data attendance yang ditemukan",
                attendances: [],
                meta
            });
        }

        const groupedAttendances = attendances.reduce((acc, attendance) => {
            const classId = attendance.class.id;
            const className = attendance.class.name;
            const teacherId = attendance.class.teacher.id;
            const teacherName = attendance.class.teacher.name;
            const lessonId = attendance.lesson.id;
            const lessonTitle = attendance.lesson.title;

            // Create class group if it doesn't exist
            if (!acc[classId]) {
                acc[classId] = {
                    classId,
                    className,
                    teacherId,
                    teacherName,
                    lessons: {}
                };
            }

            // Create lesson group if it doesn't exist within class
            if (!acc[classId].lessons[lessonId]) {
                acc[classId].lessons[lessonId] = {
                    lessonId,
                    lessonTitle,
                    attendances: []
                };
            }

            // Remove nested objects since they're now in parent levels
            const { class: _, lesson: __, ...attendanceData } = attendance.toJSON();
            acc[classId].lessons[lessonId].attendances.push(attendanceData);

            return acc;
        }, {});

        // Transform the nested objects into arrays
        const formattedClasses = Object.values(groupedAttendances).map(classGroup => ({
            ...classGroup,
            lessons: Object.values(classGroup.lessons)
        }));

        return res.status(200).json({
            success: true,
            message: "Berhasil mendapatkan data attendances",
            classes: formattedClasses,
            meta
        });
    } catch (error) {
        console.error("Error getting attendance:", error);
        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan internal",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

const getAttendanceById = async (req, res) => {
    const { id } = req.params;

    try {
        const attendance = await Attendance.findOne({
            where: { id },
            include: [
                {
                    model: Class,
                    as: 'class',
                    attributes: ["id", "name"],
                    include: [{
                        model: User,
                        as: 'teacher',
                        attributes: ["id", "name", "phone"]
                    }]
                },
                {
                    model: Lesson,
                    as: 'lesson',
                    attributes: ["id", "title"]
                },
                {
                    model: User,
                    as: 'student',
                    attributes: ["id", "name"],
                    required: false
                },
                {
                    model: Child,
                    as: 'child',
                    attributes: ["id", "name"],
                    required: false
                }
            ]
        });

        if (!attendance) {
            return res.status(404).json({
                success: false,
                message: "Data attendance tidak ditemukan"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Berhasil mendapatkan data attendance",
            attendance
        });

    } catch (error) {
        console.error("Error getting attendance:", error);
        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan internal",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Don't forget to add it to module.exports
module.exports = {
    createAttendance,
    updateAttendance,
    getAttendances,
    getAttendanceById
};