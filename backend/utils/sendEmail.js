const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, htmlContent) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,      // alamat Gmail kamu
                pass: process.env.GMAIL_PASS       // password aplikasi (bukan password biasa)
            }
        });

        await transporter.sendMail({
            from: `"MyApp 👨‍💻" <${process.env.GMAIL_USER}>`,
            to,
            subject,
            html: htmlContent,
        });

        console.log('📨 Email terkirim ke:', to);
    } catch (error) {
        console.error('❌ Gagal kirim email:', error);
        throw error;
    }
};

module.exports = sendEmail;
