const { createErrorResponse, createSuccessResponse } = require('../helpers/helperFunction');
const { createSearchWhereClause } = require('../helpers/searchQueryHelper');
const isAdmin = require('../helpers/validationAdmin');
const { Blog } = require('../models');
const getFileUrl = require('../utils/getFileUrl');
const { getPagination } = require('../utils/paginationUtil');
const validateBlogData = require('../utils/validateBlogData');

const createBlog = async (req, res) => {
    console.log('Received request body:', JSON.stringify(req.body, null, 2));
    console.log('Received file:', req.file);
    const validationResult = await validateBlogData(req.body, 'create', req.file);
    console.log('Validation result:', {
        isValid: validationResult.isValid,
        error: validationResult.error,
        validatedData: validationResult.data
    });

    if (!validationResult.isValid) {
        const { status, message } = validationResult.error;
        console.log(validationResult.data)
        return res.status(status).json({
            success: false,
            message
        });
    }

    const validation = isAdmin(req.userRole, req.userId);
    if (!validation.isValid) {
        return res.status(validation.error.status)
            .json({ message: validation.error.message });
    }
    const thumbnailPath = req.file ? getFileUrl(req, `blog/${req.file.filename}`) : null;
    try {

        console.log("thumbnailPath", thumbnailPath)

        const blogData = {
            ...validationResult.data,
            thumbnail: thumbnailPath
        };

        const newBlog = await Blog.create(blogData, {
            userId: validation.userId
        });

        const resultBlog = await Blog.findByPk(newBlog.id);
        if (!resultBlog) {
            return res.status(404).json(createErrorResponse(
                "Data blog tidak ditemukan"
            ));
        }

        return res.status(201).json(createSuccessResponse(
            "Blog berhasil ditambahkan",
            { blog: resultBlog }
        ));

    } catch (error) {
        console.error("Error creating blog:", error);
        return res.status(500).json(createErrorResponse(
            "Internal server error",
            process.env.NODE_ENV === 'development' ? error.message : undefined
        ));
    }
};

const getBlogs = async (req, res) => {
    const { search = "", isPublish, isFeatured } = req.query;
    const searchFields = ['title', 'tags'];
    const isAdmin = req.userRole === 'admin';
    try {
        const {
            limit,
            offset,
            statusCondition,
            paranoid,
            meta
        } = getPagination(req.query);

        let whereClause = createSearchWhereClause(search, searchFields);

        if (statusCondition) {
            whereClause = { ...whereClause, ...statusCondition };
        }

        if (isPublish) {
            whereClause.isPublish = isPublish;
        }

        if (isFeatured) {
            whereClause.isPublish = isFeatured;
        }


        if (!isAdmin) {
            whereClause.isPublish = true
        }

        const totalCount = await Blog.count({
            where: whereClause,
        })

        meta.total = totalCount;
        meta.totalPages = Math.ceil(totalCount / limit)

        const { rows: blogs } = await Blog.findAndCountAll({
            where: whereClause,
            limit,
            offset,
            order: [['createdAt', 'DESC']],
            paranoid,
            distinct: true
        });

        if (blogs.length === 0) {
            meta.total = 0;
            meta.totalPages = 0;

            return res.status(404).json({
                success: false,
                message: "Tidak ada blog yang ditemukan",
                blogs: [],
                meta
            });
        }

        return res.status(200).json({
            success: true,
            message: "Berhasil mendapatkan data blogs",
            blogs,
            meta,
        });

    } catch (error) {
        console.error("Error getting blogs:", error);
        return res.status(500).json(createErrorResponse(
            "Internal server error",
            process.env.NODE_ENV === 'development' ? error.message : undefined
        ));
    }

}

const getBlogById = async (req, res) => {
    const { id } = req.params

    try {
        const blog = await Blog.findByPk(id, {
            paranoid: false
        })

        if (!blog) {
            return res.status(404).json(createErrorResponse(
                "Data blog tidak ditemukan",
            ))
        }

        return res.status(200).json(createSuccessResponse(
            "Data blog ditemukan",
            { blog: blog }
        ))

    } catch (error) {
        console.error("Error getting course by id:", error);
        return res.status(500).json(createErrorResponse(
            "Internal server error",
            process.env.NODE_ENV === 'development' ? error.message : undefined
        ))
    }
}

const updateBlog = async (req, res) => {
    const { id } = req.params;
    const validationResult = validateBlogData(req.body, 'update');

    if (!validationResult.isValid) {
        const { status, message } = validationResult.error;
        return res.status(status).json({
            success: false,
            message
        });
    }

    const validation = isAdmin(req.userRole, req.userId);
    if (!validation.isValid) {
        return res.status(validation.error.status)
            .json({ message: validation.error.message });
    }

    try {
        const blog = await Blog.findByPk(id);
        if (!blog) {
            return res.status(404).json(createErrorResponse(
                "Data blog tidak ditemukan"
            ));
        }

        const updateData = { ...validationResult.data };
        if (req.file) {
            updateData.thumbnail = getFileUrl(req, `blog/${req.file.filename}`);
        }

        await blog.update(updateData, {
            userId: validation.userId
        });

        const updatedBlog = await Blog.findByPk(id);

        return res.status(200).json(createSuccessResponse(
            "Blog berhasil diperbarui",
            { blog: updatedBlog }
        ));

    } catch (error) {
        console.error("Error updating blog:", error);
        return res.status(500).json(createErrorResponse(
            "Internal server error",
            process.env.NODE_ENV === 'development' ? error.message : undefined
        ));
    }
};

const deleteBlog = async (req, res) => {
    const { id } = req.params;

    const validation = isAdmin(req.userRole, req.userId);
    if (!validation.isValid) {
        return res.status(validation.error.status)
            .json({ message: validation.error.message });
    }

    try {
        const blog = await Blog.findByPk(id);
        if (!blog) {
            return res.status(404).json(createErrorResponse(
                "Data blog tidak ditemukan"
            ));
        }

        if (blog.deletedAt) {
            await blog.destroy({
                force: true,
                userId: validation.userId
            });

            return res.status(200).json(createSuccessResponse(
                "Blog berhasil dihapus permanen"
            ));
        }

        await blog.destroy({
            userId: validation.userId
        });

        return res.status(200).json(createSuccessResponse(
            "Blog berhasil dihapus"
        ));

    } catch (error) {
        console.error("Error deleting blog:", error);
        return res.status(500).json(createErrorResponse(
            "Internal server error",
            process.env.NODE_ENV === 'development' ? error.message : undefined
        ));
    }
};

const restoreBlog = async (req, res) => {
    const { id } = req.params;

    const validation = isAdmin(req.userRole, req.userId);
    if (!validation.isValid) {
        return res.status(validation.error.status)
            .json({ message: validation.error.message });
    }

    try {

        const blog = await Blog.findByPk(id, { paranoid: false });

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog tidak ditemukan"
            });
        }

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog tidak ditemukan"
            });
        }

        if (!blog.deletedAt) {
            return res.status(400).json({
                success: false,
                message: "Course belum dihapus"
            });
        }


        await blog.restore({
            where: { id },
            userId: validation.userId
        });


        return res.status(200).json(createSuccessResponse(
            "Blog berhasil dipulihkan",
            { blog }
        ));

    } catch (error) {
        console.error("Error restoring blog:", error);
        return res.status(500).json(createErrorResponse(
            "Internal server error",
            process.env.NODE_ENV === 'development' ? error.message : undefined
        ));
    }
};

module.exports = {
    createBlog,
    getBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
    restoreBlog
};