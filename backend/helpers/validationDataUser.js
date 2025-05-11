const { User } = require("../models");

/**
 * Validates if required user data is complete
 * Checks if non-essential fields are filled
 */
const validateDataUser = async (req, res) => {
    const userId = req.userId;
    const userRole = req.userRole;

    try {
        // Skip validation for admin
        if (userRole === "admin") {
            return res.status(200).json({
                success: true,
                message: "Admin user - data validation skipped"
            });
        }

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User tidak ditemukan"
            });
        }

        // Check email verification first
        if (!user.emailVerified) {
            return res.status(403).json({
                success: false,
                message: "Email belum diverifikasi"
            });
        }

        // List of fields to check (excluding required fields)
        const fieldsToCheck = [
            'alamat',
            'country',
            'state',
            'city',
            'district',
            'village',
            'gender',
            'phone',
            'avatar'
        ];

        // Check for null values
        const incompleteFields = fieldsToCheck.filter(field =>
            user[field] === null || user[field] === undefined || user[field] === ''
        );

        if (incompleteFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Lengkapi data profil anda",
                incompleteFields: incompleteFields.map(field => ({
                    field,
                    message: `${field} belum diisi`
                }))
            });
        }

        // Return success response when all data is complete
        return res.status(200).json({
            success: true,
            message: "Data profil lengkap",
        });

    } catch (error) {
        console.error("Error validating user data:", error);
        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan saat validasi data"
        });
    }
};

module.exports = validateDataUser;