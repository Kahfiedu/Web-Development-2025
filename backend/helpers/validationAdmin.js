/**
 * Validates if user is admin and has valid userId
 * @param {string} role - User's role name
 * @param {string} userId - User's ID
 * @returns {Object} { isValid: boolean, error?: { status: number, message: string } }
 */
const isAdmin = (role, userId) => {
    const lowerCaseRole = role.toLowerCase();

    if (lowerCaseRole !== "admin") {
        return {
            isValid: false,
            error: {
                status: 403,
                message: "Access denied"
            }
        };
    }

    if (!userId) {
        return {
            isValid: false,
            error: {
                status: 400,
                message: "Token User tidak ditemukan"
            }
        };
    }

    return { isValid: true, userId };
};
const isAdminOrTeacher = (role, userId) => {
    const lowerCaseRole = role.toLowerCase();

    if (lowerCaseRole !== "admin" && lowerCaseRole !== "teacher") {
        return {
            isValid: false,
            error: {
                status: 403,
                message: "Access denied"
            }
        };
    }

    if (!userId) {
        return {
            isValid: false,
            error: {
                status: 400,
                message: "Token User tidak ditemukan"
            }
        };
    }

    return { isValid: true, userId };
};

module.exports = {
    isAdmin,
    isAdminOrTeacher
};