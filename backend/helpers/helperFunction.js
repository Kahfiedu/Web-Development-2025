const handlePagination = async (Model, whereClause, { limit, meta, isAdmin }) => {
    if (isAdmin) {
        const totalCount = await Model.count({ where: whereClause });
        meta.total = totalCount;
        meta.totalPages = Math.ceil(totalCount / limit);
    }
};

const createGroupedResponse = (data, type) => {
    if (!data || data.length === 0) return null;

    const baseData = {
        [`${type}Id`]: data[0][type]?.id,
        [`${type}Name`]: data[0][type]?.name,
    };

    if (data[0]?.province) {
        baseData.provinceId = data[0].province.id;
        baseData.provinceName = data[0].province.name;
    }

    if (data[0]?.regency) {
        baseData.regencyId = data[0].regency.id;
        baseData.regencyName = data[0].regency.name;
    }

    return {
        ...baseData,
        [`${type}s`]: data.map(item => ({
            id: item.id,
            name: item.name
        }))
    };
};

const createErrorResponse = (message, error = null) => ({
    success: false,
    message,
    ...(error && process.env.NODE_ENV === 'development' && { error })
});

const createSuccessResponse = (message, data, meta = null) => ({
    success: true,
    message,
    ...data,
    ...(meta && { meta })
});

module.exports = {
    handlePagination,
    createGroupedResponse,
    createErrorResponse,
    createSuccessResponse
};