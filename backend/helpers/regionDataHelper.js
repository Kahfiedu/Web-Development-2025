const { Province, Regency, District, Village } = require('../models');
const {
    handlePagination,
    createErrorResponse,
    createGroupedResponse,
    createSuccessResponse
} = require('./helperFunction');

// Level-specific query handlers
const getVillages = async (districtId, group, { limit, offset, meta, isAdmin }) => {
    const whereClause = { district_id: districtId, isActive: true };
    await handlePagination(Village, whereClause, { limit, meta, isAdmin });

    const villages = await Village.findAll({
        where: whereClause,
        include: [{
            model: District,
            as: 'district',
            attributes: ['id', 'name'],
            include: [{
                model: Regency,
                as: 'regency',
                attributes: ['id', 'name'],
                include: [{
                    model: Province,
                    as: 'province',
                    attributes: ['id', 'name']
                }]
            }]
        }],
        attributes: ['id', 'name'],
        ...(isAdmin && { limit, offset })
    });

    if (villages.length === 0) {
        return {
            status: 404,
            data: createErrorResponse("Data desa/kelurahan tidak ditemukan")
        };
    }

    const responseData = group
        ? { data: createGroupedResponse(villages, 'village') }
        : { villages };

    return {
        status: 200,
        data: createSuccessResponse(
            "Data desa/kelurahan berhasil didapat",
            responseData,
            isAdmin ? meta : null
        )
    };
};

const getDistricts = async (regencyId, group, { limit, offset, meta, isAdmin }) => {
    const whereClause = { regency_id: regencyId, isActive: true };
    await handlePagination(District, whereClause, { limit, meta, isAdmin });

    const districts = await District.findAll({
        where: whereClause,
        include: [{
            model: Regency,
            as: 'regency',
            attributes: ['id', 'name'],
            include: [{
                model: Province,
                as: 'province',
                attributes: ['id', 'name']
            }]
        }],
        attributes: ['id', 'name'],
        ...(isAdmin && { limit, offset })
    });

    if (districts.length === 0) {
        return {
            status: 404,
            data: createErrorResponse("Data kecamatan tidak ditemukan")
        };
    }

    const responseData = group
        ? { data: createGroupedResponse(districts, 'district') }
        : { districts };

    return {
        status: 200,
        data: createSuccessResponse(
            "Data kecamatan berhasil didapat",
            responseData,
            isAdmin ? meta : null
        )
    };
};

const getRegencies = async (provinceId, group, { limit, offset, meta, isAdmin }) => {
    const whereClause = { province_id: provinceId, isActive: true };
    await handlePagination(Regency, whereClause, { limit, meta, isAdmin });

    const regencies = await Regency.findAll({
        where: whereClause,
        include: [{
            model: Province,
            as: 'province',
            attributes: ['id', 'name']
        }],
        attributes: ['id', 'name'],
        ...(isAdmin && { limit, offset })
    });

    if (regencies.length === 0) {
        return {
            status: 404,
            data: createErrorResponse("Data kabupaten tidak ditemukan")
        };
    }

    const responseData = group
        ? { data: createGroupedResponse(regencies, 'regency') }
        : { regencies };

    return {
        status: 200,
        data: createSuccessResponse(
            "Data kabupaten berhasil didapat",
            responseData,
            isAdmin ? meta : null
        )
    };
};

const getProvinces = async ({ limit, offset, meta, isAdmin }) => {
    const whereClause = { isActive: true };
    await handlePagination(Province, whereClause, { limit, meta, isAdmin });

    const provinces = await Province.findAll({
        where: whereClause,
        attributes: ['id', 'name'],
        ...(isAdmin && { limit, offset })
    });

    if (provinces.length === 0) {
        return {
            status: 404,
            data: createErrorResponse("Data provinsi tidak ditemukan")
        };
    }

    return {
        status: 200,
        data: createSuccessResponse(
            "Data provinsi ditemukan",
            { provinces },
            isAdmin ? meta : null
        )
    };
};

module.exports = {
    getVillages,
    getDistricts,
    getRegencies,
    getProvinces
};