
const { createErrorResponse } = require('../helpers/helperFunction');
const { getVillages, getDistricts, getRegencies, getProvinces } = require('../helpers/regionDataHelper');
const { getPagination } = require('../utils/paginationUtil');

const getRegions = async (req, res) => {
    const { provinceId, regencyId, districtId, group = false } = req.query;
    const isAdmin = req.userRole === 'admin';

    try {
        const { limit, offset, meta } = getPagination(req.query);
        const paginationOptions = { limit, offset, meta, isAdmin };

        // Village level query
        if (districtId) {
            const result = await getVillages(districtId, group, paginationOptions);
            return res.status(result.status).json(result.data);
        }

        // District level query
        if (regencyId) {
            const result = await getDistricts(regencyId, group, paginationOptions);
            return res.status(result.status).json(result.data);
        }

        // Regency level query
        if (provinceId) {
            const result = await getRegencies(provinceId, group, paginationOptions);
            return res.status(result.status).json(result.data);
        }

        // Province level query (base case)
        const result = await getProvinces(paginationOptions);
        return res.status(result.status).json(result.data);

    } catch (error) {
        console.error("Error getting regions:", error);
        return res.status(500).json(createErrorResponse(
            "Terjadi kesalahan internal",
            process.env.NODE_ENV === 'development' ? error.message : undefined
        ));
    }
};

module.exports = {
    getRegions
}