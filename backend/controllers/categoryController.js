const { Op } = require('sequelize');
const isAdmin = require('../helpers/validationAdmin');
const { Category } = require('../models');
const { createSearchWhereClause } = require('../helpers/searchQueryHelper');

const createCategory = async (req, res) => {
    const { name, isActive } = req.body;

    const validation = isAdmin(req.userRole, req.userId);
    if (!validation.isValid) {
        return res.status(validation.error.status)
            .json({ message: validation.error.message });
    }

    if (!name) {
        return res.status(400).json({
            success: false,
            message: "Name is required"
        });
    }

    // Convert isActive to boolean
    const isActiveBoolean = isActive === true || isActive === 'true';

    const lowerCaseName = name.toLowerCase();

    try {
        const existingCategory = await Category.findOne({
            where: { name: lowerCaseName },
            paranoid: false
        });

        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: "Category already exists"
            });
        }

        const newCategory = await Category.create({
            name: lowerCaseName,
            isActive: isActiveBoolean
        }, {
            userId: req.userId
        });

        return res.status(201).json({
            success: true,
            message: "Category created successfully",
            category: newCategory
        });

    } catch (error) {
        console.error("Error creating category:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

const getCategories = async (req, res) => {
    const { page = 1, limit = 10, search = "", isActive } = req.query;

    const offset = (page - 1) * limit;

    const searchFields = ['name'];

    const additionalFilters = {};
    if (isActive !== undefined) {
        additionalFilters.isActive = isActive === "true";
    }

    const whereClause = createSearchWhereClause(search, searchFields, additionalFilters);

    try {
        const { count, rows: categories } = await Category.findAndCountAll({
            where: whereClause,
            order: [["createdAt", "DESC"]],
            limit,
            offset,
            paranoid: false
        });

        // Calculate pagination metadata
        const totalPages = Math.ceil(count / limit);
        const meta = {
            total: count,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages
        };

        if (categories.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No categories found",
                categories: [],
                meta
            });
        }

        return res.status(200).json({
            success: true,
            message: "Categories retrieved successfully",
            categories,
            meta
        });

    } catch (error) {
        console.error("Error fetching category:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

const updateCategory = async (req, res) => {
    const { name, isActive } = req.body;
    const { id } = req.params;

    const validation = isAdmin(req.userRole, req.userId);
    if (!validation.isValid) {
        return res.status(validation.error.status)
            .json({ message: validation.error.message });
    }

    try {
        const existingCategory = await Category.findOne({
            where: { id },
            paranoid: false
        });

        if (!existingCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        // Prepare update data
        const updateData = {};

        // Handle name update if provided
        if (name !== undefined) {
            const lowerCaseName = name.toLowerCase();
            // Check if name already exists
            const nameExists = await Category.findOne({
                where: {
                    name: lowerCaseName,
                    id: { [Op.ne]: id }
                },
                paranoid: false
            });

            if (nameExists) {
                return res.status(400).json({
                    success: false,
                    message: "Category name already exists"
                });
            }
            updateData.name = lowerCaseName;
        }

        // Handle isActive update if provided
        if (isActive !== undefined) {
            const isActiveBoolean = isActive === true || isActive === 'true';
            updateData.isActive = isActiveBoolean;
        }

        // Update only if there are changes
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                success: false,
                message: "No changes provided for update"
            });
        }

        await existingCategory.update(updateData, {
            userId: validation.userId
        });

        const updatedCategory = await Category.findByPk(id);

        return res.status(200).json({
            success: true,
            message: "Category updated successfully",
            category: updatedCategory
        });

    } catch (error) {
        console.error("Error updating category:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

const deleteCategory = async (req, res) => {
    const { id } = req.params;

    const validation = isAdmin(req.userRole, req.userId);
    if (!validation.isValid) {
        return res.status(validation.error.status)
            .json({ message: validation.error.message });
    }

    try {
        const category = await Category.findOne({
            where: { id },
            paranoid: false
        });

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        if (category.isActive) {
            return res.status(400).json({
                success: false,
                message: "Category is active and cannot be deleted"
            });
        }

        if (category.isDeleted) {
            await category.destroy({
                force: true,
                userId: validation.userId
            });
            return res.status(200).json({
                success: true,
                message: "Category deleted permanently"
            });
        }

        await category.destroy({
            userId: validation.userId
        });

        return res.status(200).json({
            success: true,
            message: "Category deleted successfully"
        });

    } catch (error) {
        console.error("Error deleting category:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

const restoreCategory = async (req, res) => {
    const { id } = req.params;

    const validation = isAdmin(req.userRole, req.userId);
    if (!validation.isValid) {
        return res.status(validation.error.status)
            .json({ message: validation.error.message });
    }

    try {
        const category = await Category.findOne({
            where: { id },
            paranoid: false
        });

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        await category.restore({
            userId: validation.userId
        });

        return res.status(200).json({
            success: true,
            message: "Category restored successfully",
            category
        });

    } catch (error) {
        console.error("Error restoring category:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

module.exports = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory,
    restoreCategory,
};