const { Province, Regency, District, Village } = require('../models')

const getRegions = async (req, res) => {
    const {
        provinceId,
        regencyId,
        districtId,
        group = false
    } = req.query;

    try {
        // Handle district level query
        if (districtId) {
            const villages = await Village.findAll({
                where: {
                    district_id: districtId,
                    isActive: true
                },
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
                attributes: ['id', 'name']
            });

            if (group) {
                const groupedData = {
                    districtId,
                    districtName: villages[0]?.district?.name,
                    regencyId: villages[0]?.district?.regency?.id,
                    regencyName: villages[0]?.district?.regency?.name,
                    provinceId: villages[0]?.district?.regency?.province?.id,
                    provinceName: villages[0]?.district?.regency?.province?.name,
                    villages: villages.map(v => ({ id: v.id, name: v.name }))
                };

                return res.status(200).json({
                    success: true,
                    message: "Data desa/kelurahan berhasil didapat",
                    data: groupedData
                });
            }

            return res.status(200).json({
                success: true,
                message: "Data desa/kelurahan berhasil didapat",
                villages
            });
        }

        // Handle regency level query
        if (regencyId) {
            const districts = await District.findAll({
                where: {
                    regency_id: regencyId,
                    isActive: true
                },
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
                attributes: ['id', 'name']
            });

            if (group) {
                const groupedData = {
                    regencyId,
                    regencyName: districts[0]?.regency?.name,
                    provinceId: districts[0]?.regency?.province?.id,
                    provinceName: districts[0]?.regency?.province?.name,
                    districts: districts.map(d => ({ id: d.id, name: d.name }))
                };

                return res.status(200).json({
                    success: true,
                    message: "Data kecamatan berhasil didapat",
                    data: groupedData
                });
            }

            return res.status(200).json({
                success: true,
                message: "Data kecamatan berhasil didapat",
                districts
            });
        }

        // Handle province level query
        if (provinceId) {
            const regencies = await Regency.findAll({
                where: {
                    province_id: provinceId,
                    isActive: true
                },
                include: [{
                    model: Province,
                    as: 'province',
                    attributes: ['id', 'name']
                }],
                attributes: ['id', 'name']
            });

            if (group) {
                const groupedData = {
                    provinceId,
                    provinceName: regencies[0]?.province?.name,
                    regencies: regencies.map(r => ({ id: r.id, name: r.name }))
                };

                return res.status(200).json({
                    success: true,
                    message: "Data kabupaten berhasil didapat",
                    data: groupedData
                });
            }

            return res.status(200).json({
                success: true,
                message: "Data kabupaten berhasil didapat",
                regencies
            });
        }

        // Get all provinces (base case)
        const provinces = await Province.findAll({
            where: { isActive: true },
            attributes: ['id', 'name']
        });

        return res.status(200).json({
            success: true,
            message: "Data provinsi ditemukan",
            provinces
        });

    } catch (error) {
        console.error("Error getting regions:", error);
        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan internal",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

module.exports = {
    getRegions
}