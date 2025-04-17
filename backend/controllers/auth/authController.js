const { User } = require('../../models'); // Pastikan path ini sesuai dengan struktur folder Anda
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require("uuid");

require("dotenv").config(); // Menggunakan dotenv untuk mengakses variabel dari .env

const sendEmail = require('../../utils/sendEmail'); // Pastikan path ini sesuai dengan struktur folder Anda
const url = process.env.APP_URL || 'http://localhost:5173'; // URL aplikasi Anda, bisa diubah sesuai kebutuhan


// Fungsi untuk registrasi pengguna baru
const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Semua field wajib diisi!' });
    }

    if (password.length < 8) {
        return res.status(400).json({ message: 'Password harus memiliki minimal 8 karakter!' });
    }

    try {
        // Periksa apakah email sudah digunakan
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email sudah terdaftar!' });
        }

        // Buat pengguna baru
        const newUser = await User.create(
            {
                id: uuidv4(),
                name,
                email,
                password
            });

        // Ambil data tanpa password, createdAt, dan updatedAt
        const { id, password: _, createdAt, updatedAt, ...userData } = newUser.dataValues;

        const token = jwt.sign(
            { id: newUser.id, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        return res.status(201).json({ message: 'Registrasi berhasil!', token, user: userData });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Terjadi kesalahan server.' });
    }
};

// Fungsi untuk login pengguna
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email dan password wajib diisi!' });
    }

    try {
        // Cari pengguna berdasarkan email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Email atau password salah!' });
        }

        // Verifikasi password
        const isMatch = await User.verifyPassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Email atau password salah!' });
        }

        // Buat token JWT
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
        );

        return res.status(200).json({ message: 'Login berhasil!', token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Terjadi kesalahan server.' });
    }
};

const resetPasswordRequest = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email wajib diisi!' });
    }

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan!' });
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        const resetLink = `${url}/reset-password?token=${token}&id=${user.id}`;

        const htmlContent = `
                <h2>Permintaan Reset Password</h2>
                <p>Klik link berikut untuk mereset password Anda:</p>
                <a href="${resetLink}">${resetLink}</a>
            `;

        await sendEmail(user.email, 'Reset Password', htmlContent);

        return res.status(200).json({ message: 'Link reset password telah dikirim ke email Anda.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Terjadi kesalahan server.' });
    }
};


const changePassword = async (req, res) => {
    const { oldPassword, newPassword, token, userId: rawUserId } = req.body;

    let userId = req.user?.id || null;

    if (!newPassword || (!token && !oldPassword)) {
        return res.status(400).json({ message: 'Password baru dan lama (jika tidak menggunakan token) wajib diisi!' });
    }

    if (newPassword.length < 8) {
        return res.status(400).json({ message: 'Password baru harus memiliki minimal 8 karakter!' });
    }

    if (oldPassword && newPassword === oldPassword) {
        return res.status(400).json({ message: 'Password baru tidak boleh sama dengan password lama!' });
    }

    // Jika menggunakan token dari reset password
    if (token && rawUserId) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (decoded.userId !== rawUserId) {
                return res.status(401).json({ message: 'Token tidak cocok dengan pengguna!' });
            }
            userId = rawUserId;
        } catch (error) {
            return res.status(401).json({ message: 'Token tidak valid atau kadaluarsa!' });
        }
    }

    if (!userId) {
        return res.status(400).json({ message: 'User ID tidak ditemukan.' });
    }

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan!' });
        }

        // Jika tidak menggunakan token, pastikan oldPassword cocok
        if (!token) {
            const isMatch = await User.verifyPassword(oldPassword, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Password lama tidak sesuai!' });
            }
        }

        user.password = newPassword;
        await user.save();

        return res.status(200).json({ message: 'Password berhasil diubah.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Terjadi kesalahan server.' });
    }
};


module.exports = { register, login, resetPasswordRequest, changePassword };