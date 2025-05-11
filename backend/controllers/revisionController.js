const { Op } = require("sequelize");
const { Revision, RevisionChange, User } = require("../models");
const { getPagination } = require("../utils/paginationUtil");

const getAllRevisions = async (req, res) => {
    if (req.userRole !== "admin") {
        return res.status(403).json({ message: "Access denied" });
    }

    const { search = "" } = req.query;

    try {
        // Build where clause for search and status
        const whereClause = {};
        if (search) {
            whereClause[Op.or] = [
                { 'document': { [Op.like]: `%${search}%` } },
                { 'model': { [Op.like]: `%${search}%` } }
            ];
        }

        // Get total count first
        const totalCount = await Revision.count({
            where: whereClause
        });

        // Get pagination data with total count
        const { limit, offset, meta, statusCondition, paranoid } = getPagination(req.query, totalCount);

        // Add status condition to where clause if present
        if (statusCondition) {
            Object.assign(whereClause, statusCondition);
        }

        // Get revisions with pagination
        const { rows: revisions } = await Revision.findAndCountAll({
            where: whereClause,
            include: [
                {
                    model: RevisionChange,
                    as: 'changes',
                    required: false,
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'email', 'name'],
                    required: false,
                }
            ],
            order: [['createdAt', 'DESC']],
            limit,
            offset,
            paranoid
        });

        // Format revision data
        const formattedRevisions = revisions.map(rev => ({
            id: rev.id,
            model: rev.model,
            documentId: rev.documentId,
            operation: rev.operation,
            revision: rev.revision,
            document: typeof rev.document === 'string' ? JSON.parse(rev.document) : rev.document,
            user: rev.user ? {
                id: rev.user.id,
                email: rev.user.email,
                name: rev.user.name
            } : null,
            changes: rev.changes ? rev.changes.map(change => ({
                path: change.path,
                oldValue: change.diff ? JSON.parse(change.diff)[0]?.value : null,
                newValue: change.diff ? JSON.parse(change.diff)[1]?.value : null
            })) : [],
            createdAt: rev.createdAt,
            updatedAt: rev.updatedAt
        }));

        res.status(200).json({
            success: true,
            message: "Data revisi berhasil diambil",
            revisions: formattedRevisions,
            meta
        });

    } catch (error) {
        console.error("Error fetching revisions:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

module.exports = {
    getAllRevisions
};