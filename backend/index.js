require("dotenv").config(); // Menggunakan dotenv untuk mengakses variabel dari .env

const express = require("express");
const { sequelize } = require("./models");
const corsHelper = require("./helpers/corsHelper"); // Menggunakan helper CORS
const apiKeyMiddleware = require("./middlewares/apiKeyMiddleware"); // Menggunakan middleware API Key
const route = require("./routers/route"); // Menggunakan router

const app = express();

// Validasi environment variables
if (!process.env.JWT_SECRET) {
    console.error("❌ JWT_SECRET tidak ditemukan di file .env");
    process.exit(1); // Hentikan aplikasi jika variabel penting tidak ada
}

// Middleware untuk logging permintaan
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Middleware CORS
app.use(corsHelper());

// Middleware untuk parsing JSON
app.use(express.json());

// Middleware API Key
app.use(apiKeyMiddleware);

// Router utama
const v = process.env.API_VERSION || "v1"; // Versi API dari .env atau default ke v1
app.use(`/api/${v}/`, route); // Menggunakan router untuk API

// Middleware untuk menangani error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000; // Menggunakan PORT dari .env atau default ke 5000
app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log(`✅ Database connected`);
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    } catch (error) {
        console.error("❌ Unable to connect to the database:", error);
    }
});