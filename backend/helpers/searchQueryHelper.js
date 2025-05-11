const { Op } = require("sequelize");

/**
 * Creates a search where clause for database queries
 * @param {string} search - Search term
 * @param {string[]} fields - Array of field names to search in
 * @param {Object} additionalFilters - Additional filters to apply
 * @returns {Object} Sequelize where clause object
 */
const createSearchWhereClause = (search = "", fields = [], additionalFilters = {}) => {
    const whereClause = {
        [Op.or]: fields.map(field => ({
            [field]: {
                [Op.like]: `%${search}%`
            }
        }))
    };

    // Merge additional filters
    return { ...whereClause, ...additionalFilters };
};

module.exports = {
    createSearchWhereClause
};