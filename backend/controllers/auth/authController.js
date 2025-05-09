const { User, Otp, Role } = require('../../models');
const { v4: uuidv4 } = require("uuid");
const sendEmail = require('../../helpers/sendEmailHelper');
const { generateOtp } = require('../../utils/generateOtp');
const { generateToken } = require('../../utils/generateToken');
const url = process.env.APP_URL || 'http://localhost:5173';
const jwt = require('jsonwebtoken');

// Fungsi Registrasi
const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password || password.length < 8) {
        return res.status(400).json({ message: 'Nama, email, dan password (minimal 8 karakter) wajib diisi!' });
    }

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return res.status(400).json({ message: 'Email sudah terdaftar!' });

        const studentRole = await Role.findOne({ where: { name: 'student' } });
        if (!studentRole) {
            return res.status(500).json({ message: 'Role student tidak ditemukan di database.' });
        }

        const newUser = await User.create({
            id: uuidv4(),
            name,
            email,
            password,
            roleId: studentRole.id,
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

        const token = generateToken({ userId: user.id, email: user.email });
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
        const otpRecord = await Otp.findOne({ where: { code: otp, userId } });
        if (!otpRecord || otpRecord.isVerified) {
            return res.status(400).json({ message: 'Kode OTP tidak valid atau sudah digunakan!' });
        }

        otpRecord.isVerified = true;
        await otpRecord.save();

        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ message: 'Pengguna tidak ditemukan!' });

        if (user.emailVerified) {
            return res.status(400).json({ message: 'Email sudah diverifikasi!' });
        }

        user.emailVerified = new Date();
        await user.save();

        const token = generateToken({ userId: user.id });
        return res.status(200).json({ message: 'Email berhasil diverifikasi!', token });
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


module.exports = { register, login, confirmOtp, resetPasswordRequest, changePassword };