require("dotenv").config(); // Menggunakan dotenv untuk mengakses variabel dari .env
const cors = require('cors');

const corsOptions = {
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
    credentials: true,
};

const corsHelper = () => cors(corsOptions);

module.exports = corsHelper;
