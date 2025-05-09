// utils/validators.js
/**
 * Validate email format
 * @param {String} email - Email to validate
 * @returns {Boolean} - True if valid
 */
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validate and resolve role
 * @param {String} roleName - Role name from import
 * @param {Object} rolesMap - Map of available roles
 * @returns {Object} - Result of validation with roleId
 */
function validateRole(roleName, rolesMap) {
    if (roleName) {
        const normalizedRole = roleName.toLowerCase();
        const roleId = rolesMap[normalizedRole];

        // If role doesn't exist in the database
        if (!roleId) {
            // Try to use 'student' as default role if available
            const defaultRoleId = rolesMap['student'] || Object.values(rolesMap)[0];

            if (!defaultRoleId) {
                return {
                    success: false,
                    message: 'Invalid role and no default role found'
                };
            }

            return {
                success: true,
                roleId: defaultRoleId,
                message: `Role '${roleName}' not found, using default role`
            };
        }

        return {
            success: true,
            roleId
        };
    } else {
        // If role is not provided, use 'student' as default if available
        const defaultRoleId = rolesMap['student'] || Object.values(rolesMap)[0];

        if (!defaultRoleId) {
            return {
                success: false,
                message: 'No role provided and no default role found'
            };
        }

        return {
            success: true,
            roleId: defaultRoleId,
            message: 'No role provided, using default role'
        };
    }
}

module.exports = {
    validateEmail,
    validateRole
};