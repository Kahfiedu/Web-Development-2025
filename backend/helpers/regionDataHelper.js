const { Province, Regency, District, Village } = require('../models');
const { handlePagination, createSuccessResponse, AppError } = require('./helperFunction');

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
        throw new AppError("Data desa/kelurahan tidak ditemukan", 404);
    }

    const responseData = group
        ? { data: villages.map(village => ({ ...village.toJSON() })) }
        : { villages };

    return createSuccessResponse(
        "Data desa/kelurahan berhasil didapat",
        responseData,
        isAdmin ? meta : null
    );
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
        throw new AppError("Data kecamatan tidak ditemukan", 404);
    }

    const responseData = group
        ? { data: districts.map(district => ({ ...district.toJSON() })) }
        : { districts };

    return createSuccessResponse(
        "Data kecamatan berhasil didapat",
        responseData,
        isAdmin ? meta : null
    );
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
        throw new AppError("Data kabupaten tidak ditemukan", 404);
    }

    const responseData = group
        ? { data: regencies.map(regency => ({ ...regency.toJSON() })) }
        : { regencies };

    return createSuccessResponse(
        "Data kabupaten berhasil didapat",
        responseData,
        isAdmin ? meta : null
    );
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
        throw new AppError("Data provinsi tidak ditemukan", 404);
    }

    return createSuccessResponse(
        "Data provinsi ditemukan",
        { provinces },
        isAdmin ? meta : null
    );
};

module.exports = {
    getVillages,
    getDistricts,
    getRegencies,
    getProvinces
};