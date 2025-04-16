require("dotenv").config(); // Menggunakan dotenv untuk mengakses variabel dari .env
const cors = require('cors');


const corsOptions = {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
    credentials: true,
};

const corsHelper = () => cors(corsOptions);

module.exports = corsHelper;
