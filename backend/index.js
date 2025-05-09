require("dotenv").config(); // Load .env

const express = require("express");
const http = require("http");
const { sequelize } = require("./models");
const corsHelper = require("./helpers/corsHelper");
const apiKeyMiddleware = require("./middlewares/apiKeyMiddleware");
const route = require("./routers/route");
const { initSocket } = require("./config/socketConfig");
const { redisClient } = require("./config/bullConfig");

const app = express();
const server = http.createServer(app); // Dibutuhkan untuk Socket.IO

// ✅ Validasi variabel lingkungan
if (!process.env.JWT_SECRET) {
    console.error("❌ JWT_SECRET tidak ditemukan di file .env");
    process.exit(1);
}

// 📝 Logging setiap request
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// 🧩 Middleware umum
app.use(corsHelper());
app.use(express.json());
app.use(apiKeyMiddleware);

// 📂 (Optional) akses file upload
app.use("/uploads", express.static("uploads"));

// 📌 Versi API
const v = process.env.API_VERSION || "v1";
app.use(`/api/${v}/`, route);

// 🧨 Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// 🚀 Jalankan server
const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Database connected");

        // 🔌 Inisialisasi Socket.IO
        initSocket(server);
        console.log("📡 Socket.IO initialized");

        // 🧠 Cek koneksi Redis
        const redisStatus = await redisClient.ping();
        if (redisStatus === "PONG") {
            console.log("🟥 Redis connected");
        } else {
            console.warn("⚠️ Redis tidak merespons dengan benar:", redisStatus);
        }

        console.log(`🚀 Server running at http://localhost:${PORT}`);
    } catch (error) {
        console.error("❌ Startup error:", error);
        process.exit(1);
    }
});
