const { Category } = require('../models');

/**
 * Validates child data for create and update operations
 * @param {Object} data Course data to validate
 * @param {string} data.title Course's title
 * @param {number} data.description Course's description
 * @param {string} data.categoryId Course's categoryId
 * @param {string} data.level Course's level
 * @param {string} data.thumbnail Course's thumbnail
 * @param {string} mode Operation mode ('create' or 'update')
 * @returns {Object} Validation result
 */

const validateCourseData = (data, mode = 'create') => {
    const { title, description, categoryId, level } = data;
    const validatedData = {};

    // Validate based on mode
    if (mode === 'create') {
        // Check required fields for create
        if (!title || !description || !categoryId || !level) {
            return {
                isValid: false,
                error: {
                    status: 400,
                    message: "Title, description, categoryId, and level are required"
                }
            };
        }

        // Validate title if provided
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

        // Validate description if provided
        if (description !== undefined) {
            if (typeof description !== 'string' || description.trim().length === 0) {
                return {
                    isValid: false,
                    error: {
                        status: 400,
                        message: "Description must be a string and cannot be empty"
                    }
                };
            }
            validatedData.description = description.trim();
        }

        // Validate categoryId if provided
        if (categoryId !== undefined) {
            if (typeof categoryId !== 'string' || categoryId.trim().length === 0) {
                return {
                    isValid: false,
                    error: {
                        status: 400,
                        message: "CategoryId must be a string and cannot be empty"
                    }
                };
            }
            const category = Category.findOne({ where: { id: categoryId } });
            if (!category) {
                return {
                    isValid: false,
                    error: {
                        status: 404,
                        message: "Category not found"
                    }
                };
            }
            validatedData.categoryId = categoryId.trim();
        }

        // Validate level if provided
        if (level !== undefined) {
            if (typeof level !== 'string' || level.trim().length === 0) {
                return {
                    isValid: false,
                    error: {
                        status: 400,
                        message: "Level must be a string and cannot be empty"
                    }
                };
            }
            validatedData.level = level.trim();
        }

    }

    if (mode === 'update') {
        // Allow empty updates but validate any provided fields
        const updates = {};

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
            updates.title = title.trim();
        }

        if (description !== undefined) {
            if (typeof description !== 'string' || description.trim().length === 0) {
                return {
                    isValid: false,
                    error: {
                        status: 400,
                        message: "Description must be a string and cannot be empty"
                    }
                };
            }
            updates.description = description.trim();
        }

        if (categoryId !== undefined) {
            if (typeof categoryId !== 'string' || categoryId.trim().length === 0) {
                return {
                    isValid: false,
                    error: {
                        status: 400,
                        message: "CategoryId must be a string and cannot be empty"
                    }
                };
            }
            updates.categoryId = categoryId.trim();
        }

        if (level !== undefined) {
            if (typeof level !== 'string' || level.trim().length === 0) {
                return {
                    isValid: false,
                    error: {
                        status: 400,
                        message: "Level must be a string and cannot be empty"
                    }
                };
            }
            updates.level = level.trim();
        }

        // Return the updates object even if empty
        return {
            isValid: true,
            data: updates
        };
    }

    return {
        isValid: true,
        data: validatedData
    };
}

module.exports = validateCourseData;