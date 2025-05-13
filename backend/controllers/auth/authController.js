const { User, Otp, Role } = require('../../models');
const { v4: uuidv4 } = require("uuid");
const sendEmail = require('../../helpers/sendEmailHelper');
const { generateOtp } = require('../../utils/generateOtp');
const { generateToken } = require('../../helpers/jwtHelper');
const url = process.env.FRONTEND_URL || 'http://localhost:5173';
const jwt = require('jsonwebtoken');

// Fungsi Registrasi
const register = async (req, res) => {
    const { name, email, password, roleId } = req.body;

    if (!name || !email || !password || password.length < 8) {
        return res.status(400).json({ message: 'Nama, email, dan password (minimal 8 karakter) wajib diisi!' });
    }

    if (!roleId) {
        return res.status(400).json({ message: 'Role ID wajib diisi!' });
    }

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return res.status(400).json({ message: 'Email sudah terdaftar!' });

        const existingRole = await Role.findOne({ where: { id: roleId } });

        if (!existingRole) {
            return res.status(500).json({ message: 'Id role tidak ada' });
        }

        if (existingRole.name !== 'student' && existingRole.name !== 'parent') {
            return res.status(400).json({ message: 'Role tidak sesuai' });
        }

        if (existingRole.name === 'admin') {
            return res.status(400).json({ message: 'Role tidak sesuai' });
        }

        const newUser = await User.create({
            name,
            email,
            password,
            roleId: roleId,
            emailVerified: null,
        });

        const otp = generateOtp();
        await Otp.create({ id: uuidv4(), userId: newUser.id, code: otp, isVerified: false });

        await sendEmail(email, 'Verifikasi Email', `<h2>Kode OTP Anda</h2><p>${otp}</p>`);

        return res.status(201).json({ message: 'Kode OTP telah dikirim ke email Anda.', userId: newUser.id });
    } catch (error) {
        console.error('Error saat registrasi:', error);
        return res.status(500).json({ message: 'Terjadi kesalahan server.' });
    }
};

// Fungsi Login
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email dan password wajib diisi!' });
    }

    try {
        const user = await User.findOne({
            where: { email },
            include: [
                {
                    model: Role,
                    as: 'role',
                    attributes: ['id', 'name']
                }
            ]
        });
        if (!user || user.deletedAt !== null) {
            return res.status(401).json({ message: 'Email atau password salah, atau akun dinonaktifkan!' });
        }

        const isMatch = await User.verifyPassword(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Email atau password salah!' });

        if (!user.emailVerified) {
            const otp = generateOtp();
            await Otp.upsert({ userId: user.id, code: otp, isVerified: false });
            await sendEmail(email, 'Verifikasi Email', `<h2>Kode OTP Anda</h2><p>${otp}</p>`);

            return res.status(401).json({ message: 'Email belum diverifikasi! Kode OTP telah dikirim ulang.', userId: user.id });
        }

        const token = generateToken({
            userId: user.id,
            email: user.email,
            role: user.role.name
        });

        if (!token) {
            return res.status(500).json({ message: 'Gagal membuat token!' });
        }
        return res.status(200).json({
            message: 'Login berhasil!',
            token,
            role: user.role.name
        });
    } catch (error) {
        console.error('Error saat login:', error);
        return res.status(500).json({ message: 'Terjadi kesalahan server.' });
    }
};

// Fungsi Konfirmasi OTP
const confirmOtp = async (req, res) => {
    const { otp, userId } = req.body;

    if (!otp || otp.length !== 6) {
        return res.status(400).json({ message: 'Kode OTP tidak valid!' });
    }

    try {
        const otpRecord = await Otp.findOne({
            where: {
                code: otp,
                userId,
                isVerified: false
            },
        });
        if (!otpRecord || otpRecord.isVerified) {
            return res.status(400).json({ message: 'Kode OTP tidak valid atau sudah digunakan!' });
        }



        const user = await User.findOne({
            where: { id: userId },
            include: [{
                model: Role,
                as: 'role',
                attributes: ['id', 'name']
            }],
        });

        if (!user) return res.status(404).json({
            success: false,
            message: 'Pengguna tidak ditemukan!'
        });

        if (user.emailVerified) {
            return res.status(400).json({
                success: false,
                message: 'Email sudah diverifikasi!'
            });
        }

        await otpRecord.update({ isVerified: true });

        user.emailVerified = new Date();
        await user.save();

        const token = generateToken({ userId: user.id, email: user.email, role: user.role.name });
        return res.status(200).json({ message: 'Email berhasil diverifikasi!', token, role: user.role.name });
    } catch (error) {
        console.error('Error saat konfirmasi OTP:', error);
        return res.status(500).json({ message: 'Terjadi kesalahan server.' });
    }
};

// Fungsi Reset Password Request
const resetPasswordRequest = async (req, res) => {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: 'Email wajib diisi!' });

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: 'Pengguna tidak ditemukan!' });

        const token = generateToken({ userId: user.id });
        const resetLink = `${url}/reset-password?token=${token}&userId=${user.id}`;

        await sendEmail(email, 'Reset Password', `<h2>Reset Password</h2><p>Klik link berikut untuk mereset password Anda:</p><a href="${resetLink}">Reset Password</a>`);

        return res.status(200).json({ message: 'Link password reset telah dikirim ke email Anda.' });
    } catch (error) {
        console.error('Error saat reset password request:', error);
        return res.status(500).json({ message: 'Terjadi kesalahan server.' });
    }
};

// Fungsi Ubah Password
const changePassword = async (req, res) => {
    const { newPassword, token, userId } = req.body;

    if (!newPassword || newPassword.length < 8 || !token || !userId) {
        return res.status(400).json({ message: 'Password wajib diisi (minimal 8 karakter)' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.userId !== userId) {
            return res.status(401).json({ message: 'Token tidak valid!' });
        }

        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ message: 'Pengguna tidak ditemukan!' });

        user.password = newPassword;
        await user.save();

        return res.status(200).json({ message: 'Password berhasil diubah.' });
    } catch (error) {
        console.error('Error saat mengubah password:', error);
        return res.status(500).json({ message: 'Terjadi kesalahan server.' });
    }
};

const logout = async (req, res) => {
    try {
        // Clear cookie if you're using cookie-based tokens
        res.clearCookie('token');

        return res.status(200).json({
            success: true,
            message: "Berhasil logout"
        });
    } catch (error) {
        console.error('Error during logout:', error);
        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan saat logout"
        });
    }
};

const loginWithGoogle = async (req, res) => {
    const { googleToken } = req.body;

    try {
        // Verify token with Google
        const ticket = await client.verifyIdToken({
            idToken: googleToken,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const { email, name, sub: googleId } = ticket.getPayload();

        // Find or create user
        const [user, created] = await User.findOrCreate({
            where: { email },
            defaults: {
                name,
                googleId,
                emailVerified: new Date(),
                roleId: await Role.findOne({ where: { name: 'student' } }).then(role => role.id)
            },
            include: [{
                model: Role,
                as: 'role',
                attributes: ['id', 'name']
            }]
        });

        const token = generateToken({
            userId: user.id,
            email: user.email,
            role: user.role.name
        });

        return res.status(200).json({
            message: 'Login berhasil!',
            token,
            role: user.role.name
        });

    } catch (error) {
        console.error('Error during Google login:', error);
        return res.status(500).json({ message: 'Terjadi kesalahan server.' });
    }
};


module.exports = {
    register,
    login,
    confirmOtp,
    resetPasswordRequest,
    changePassword,
    logout,
    loginWithGoogle
};