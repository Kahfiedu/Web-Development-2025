
const { createErrorResponse, createSuccessResponse } = require('../helpers/helperFunction');
const { getVillages, getDistricts, getRegencies, getProvinces } = require('../helpers/regionDataHelper');
const { getPagination } = require('../utils/paginationUtil');
const { Province, Regency, District, Village } = require('../models');

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

const createRegion = async (req, res) => {
    const { type, name, provinceId, regencyId, districtId } = req.body;
    const isAdmin = req.userRole === 'admin';
    const userId = req.userId;

    if (!isAdmin) {
        return res.status(403).json(createErrorResponse("Tidak memiliki akses"));
    }

    if (type !== "province" && type !== "regency" && type !== "district" && type !== "village") {
        return res.status(401).json(createErrorResponse("Type harus province, regency, district atau village"));
    }

    if (!type || !name) {
        return res.status(401).json(createErrorResponse("Type dan name harus diisi"));
    }

    try {
        let newRegion;
        switch (type) {
            case 'province':
                newRegion = await Province.create({ name }, {
                    userId
                });
                break;
            case 'regency':
                if (!provinceId) {
                    return res.status(400).json(createErrorResponse("Province ID diperlukan"));
                }

                const existingProvince = await Province.findByPk(provinceId);
                if (!existingProvince) {
                    return res.status(404).json(createErrorResponse("Data province tidak ditemukan"));
                }

                // Find the highest regency ID for this province
                const lastRegency = await Regency.findOne({
                    where: {
                        province_id: provinceId
                    },
                    order: [['id', 'DESC']]
                });

                let newRegencyId;
                if (lastRegency) {
                    // If there are existing regencies, increment the last ID
                    const lastId = lastRegency.id.toString();
                    const sequence = parseInt(lastId.slice(-2)) + 1;
                    newRegencyId = parseInt(`${provinceId}${sequence.toString().padStart(2, '0')}`);
                } else {
                    // If this is the first regency, start with 01
                    newRegencyId = parseInt(`${provinceId}01`);
                }

                newRegion = await Regency.create({
                    id: newRegencyId,
                    name,
                    province_id: provinceId
                }, { userId: userId });
                break;
            case 'district':
                if (!regencyId) {
                    return res.status(400).json(createErrorResponse("Regency ID diperlukan"));
                }

                const existingRegency = await Regency.findByPk(regencyId);
                if (!existingRegency) {
                    return res.status(404).json(createErrorResponse("Data regency tidak ditemukan"));
                }

                // Find the highest district ID for this regency
                const lastDistrict = await District.findOne({
                    where: {
                        regency_id: regencyId
                    },
                    order: [['id', 'DESC']]
                });

                let newDistrictId;
                if (lastDistrict) {
                    // If there are existing districts, increment the last ID
                    const lastId = lastDistrict.id.toString();
                    const sequence = parseInt(lastId.slice(-3)) + 1;
                    newDistrictId = parseInt(`${regencyId}${sequence.toString().padStart(3, '0')}`);
                } else {
                    // If this is the first district, start with 001
                    newDistrictId = parseInt(`${regencyId}001`);
                }

                newRegion = await District.create({
                    id: newDistrictId,
                    name,
                    regency_id: regencyId
                }, { userId: userId });
                break;

            case 'village':
                if (!districtId) {
                    return res.status(400).json(createErrorResponse("District ID diperlukan"));
                }

                const existingDistrict = await District.findByPk(districtId);
                if (!existingDistrict) {
                    return res.status(404).json(createErrorResponse("Data district tidak ditemukan"));
                }

                // Find the highest village ID for this district
                const lastVillage = await Village.findOne({
                    where: {
                        district_id: districtId
                    },
                    order: [['id', 'DESC']]
                });

                let newVillageId;
                if (lastVillage) {
                    // If there are existing villages, increment the last ID
                    const lastId = lastVillage.id.toString();
                    const sequence = parseInt(lastId.slice(-3)) + 1;
                    newVillageId = parseInt(`${districtId}${sequence.toString().padStart(3, '0')}`);
                } else {
                    // If this is the first village, start with 001
                    newVillageId = parseInt(`${districtId}001`);
                }

                newRegion = await Village.create({
                    id: newVillageId,
                    name,
                    district_id: districtId
                }, { userId: userId });
                break;
            default:
                return res.status(400).json(createErrorResponse("Tipe wilayah tidak valid"));
        }

        return res.status(201).json(createSuccessResponse(
            "Data wilayah berhasil dibuat",
            { region: newRegion }
        ));

    } catch (error) {
        console.error("Error creating region:", error);
        return res.status(500).json(createErrorResponse(
            "Terjadi kesalahan internal",
            process.env.NODE_ENV === 'development' ? error.message : undefined
        ));
    }
};

const updateRegion = async (req, res) => {
    const { id } = req.params;
    const { type, name, isActive } = req.body;
    const isAdmin = req.userRole === 'admin';
    const userId = req.userId

    if (!isAdmin) {
        return res.status(403).json(createErrorResponse("Tidak memiliki akses"));
    }

    if (type !== "province" && type !== "regency" && type !== "district" && type !== "village") {
        return res.status(401).json(createErrorResponse("Type harus province, regency, district atau village"));
    }

    try {
        let Model;
        switch (type) {
            case 'province': Model = Province; break;
            case 'regency': Model = Regency; break;
            case 'district': Model = District; break;
            case 'village': Model = Village; break;
            default:
                return res.status(400).json(createErrorResponse("Tipe wilayah tidak valid"));
        }

        const region = await Model.findByPk(id);
        if (!region) {
            return res.status(404).json(createErrorResponse("Data wilayah tidak ditemukan"));
        }

        const updateData = {};
        if (name !== undefined) updateData.name = name;
        if (isActive !== undefined) updateData.isActive = isActive;

        await region.update(updateData, {
            userId: userId
        });

        return res.status(200).json(createSuccessResponse(
            "Data wilayah berhasil diperbarui",
            { region }
        ));

    } catch (error) {
        console.error("Error updating region:", error);
        return res.status(500).json(createErrorResponse(
            "Terjadi kesalahan internal",
            process.env.NODE_ENV === 'development' ? error.message : undefined
        ));
    }
};

const deleteRegion = async (req, res) => {
    const { id } = req.params;
    const { type } = req.body;
    const isAdmin = req.userRole === 'admin';
    const userId = req.userId

    if (!isAdmin) {
        return res.status(403).json(createErrorResponse("Tidak memiliki akses"));
    }

    if (type !== "province" && type !== "regency" && type !== "district" && type !== "village") {
        return res.status(401).json(createErrorResponse("Type harus province, regency, district atau village"));
    }

    try {
        let Model;
        switch (type) {
            case 'province': Model = Province; break;
            case 'regency': Model = Regency; break;
            case 'district': Model = District; break;
            case 'village': Model = Village; break;
            default:
                return res.status(400).json(createErrorResponse("Tipe wilayah tidak valid"));
        }



        const region = await Model.findByPk(id, {
            paranoid: false,
        });

        if (!region) {
            return res.status(404).json(createErrorResponse("Data wilayah tidak ditemukan"));
        }

        if (region.deletedAt) {
            await region.destroy({
                force: true,
                userId
            })
            return res.status(200).json(createSuccessResponse("Data wilayah berhasil dihapus permanen"))
        }

        await region.destroy({
            userId: userId
        }); // Soft delete karena paranoid: true

        return res.status(200).json(createSuccessResponse(
            "Data wilayah berhasil dihapus"
        ));

    } catch (error) {
        console.error("Error deleting region:", error);
        return res.status(500).json(createErrorResponse(
            "Terjadi kesalahan internal",
            process.env.NODE_ENV === 'development' ? error.message : undefined
        ));
    }
};

const restoreRegion = async (req, res) => {
    const { id } = req.params;
    const { type } = req.body;
    const isAdmin = req.userRole === 'admin';
    const userId = req.userId

    if (!isAdmin) {
        return res.status(403).json(createErrorResponse("Tidak memiliki akses"));
    }

    if (type !== "province" && type !== "regency" && type !== "district" && type !== "village") {
        return res.status(401).json(createErrorResponse("Type harus province, regency, district atau village"));
    }

    try {
        let Model;
        switch (type) {
            case 'province': Model = Province; break;
            case 'regency': Model = Regency; break;
            case 'district': Model = District; break;
            case 'village': Model = Village; break;
            default:
                return res.status(400).json(createErrorResponse("Tipe wilayah tidak valid"));
        }

        const restored = await Model.restore({
            where: { id }
        }, {
            userId: userId
        });

        if (!restored) {
            return res.status(404).json(createErrorResponse("Data wilayah tidak ditemukan"));
        }

        const region = await Model.findByPk(id);

        return res.status(200).json(createSuccessResponse(
            "Data wilayah berhasil dipulihkan",
            { region }
        ));

    } catch (error) {
        console.error("Error restoring region:", error);
        return res.status(500).json(createErrorResponse(
            "Terjadi kesalahan internal",
            process.env.NODE_ENV === 'development' ? error.message : undefined
        ));
    }
};

module.exports = {
    getRegions,
    createRegion,
    updateRegion,
    deleteRegion,
    restoreRegion
};