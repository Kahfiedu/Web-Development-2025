const { User } = require('../../models'); // Pastikan path ini sesuai dengan struktur folder Anda
const jwt = require('jsonwebtoken');

// Fungsi untuk registrasi pengguna baru
const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Semua field wajib diisi!' });
    }

    try {
        // Periksa apakah email sudah digunakan
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email sudah terdaftar!' });
        }

        // Buat pengguna baru
        const newUser = await User.create({ name, email, password });
        return res.status(201).json({ message: 'Registrasi berhasil!', user: newUser });
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


module.exports = { register, login };