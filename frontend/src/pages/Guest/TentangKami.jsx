import React from 'react';
import { Box, Typography } from '@mui/material';

const TentangKami = () => {
  return (
    <>
      {/* Section: Tentang Kami */}
      <Box className="flex flex-col-reverse md:flex-row items-center justify-between px-4 py-12 gap-8">
        <Box className="flex-1">
          <img
            src="img/img1.png"
            alt="Guru Mengajar"
            className="w-[85%] h-auto rounded-xl transition-transform duration-300 hover:scale-105 mx-auto"
          />
        </Box>
        <Box className="flex-1">
          <Typography
            variant="h5"
            component="h2"
            className="text-[22px] md:text-[32px] font-semibold text-green-700 mb-4"
          >
            Tentang Kami
          </Typography>
          <Typography
            variant="body1"
            className="text-[18px] md:text-[18px] font-medium"
          >
            Kahfi Education adalah lembaga pendidikan yang menyediakan solusi
            les privat online terbaik bagi anak-anak usia dini. Kami memahami
            bahwa setiap anak memiliki cara belajar yang unik, oleh karena itu
            kami menawarkan pendekatan yang personal dan interaktif agar proses
            belajar menjadi lebih menyenangkan dan efektif. Kami fokus pada
            pembelajaran membaca, menulis, dan mengaji Al-Qur'an dengan cara
            yang menyenangkan. Melalui pengajaran yang fleksibel, kami
            memberikan kesempatan bagi anak-anak untuk belajar dari rumah dengan
            guru profesional yang berpengalaman.
          </Typography>
        </Box>
      </Box>

      {/* Section: Mengapa Memilih Kami */}
      <Box className="px-4 py-12">
        <Typography
          variant="h5"
          component="h2"
          className="text-[22px] md:text-[32px] font-semibold text-green-700 text-center mb-8"
        >
          Mengapa Memilih Kami
        </Typography>
        <Box className="flex flex-col md:flex-row justify-between items-center gap-6">
          {[
            {
              icon: "📚",
              title: "Kurikulum Tepat",
              desc: "Materi disesuaikan dengan kemampuan anak dan dikembangkan secara menyenangkan.",
            },
            {
              icon: "👩‍🏫",
              title: "Guru Profesional",
              desc: "Pengajar berpengalaman dan sabar dalam mendampingi proses belajar anak.",
            },
            {
              icon: "🕒",
              title: "Jadwal Fleksibel",
              desc: "Belajar bisa diatur sesuai waktu luang anak dan orang tua.",
            },
            {
              icon: "💻",
              title: "Online Interaktif",
              desc: "Kelas dilakukan online secara dua arah, membuat anak aktif berpartisipasi.",
            },
          ].map((item, idx) => (
            <Box key={idx} className="text-center flex-1 px-2">
              <div className="text-5xl">{item.icon}</div>
              <Typography variant="h6" className="mt-4 mb-2 font-semibold">
                {item.title}
              </Typography>
              <Typography variant="body2">{item.desc}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Section: Statistik */}
      <Box className="bg-green-700 py-12 rounded-xl w-[90%] mx-auto">
        <Box className="flex flex-col md:flex-row items-center justify-between gap-6 px-4">
          {[
            {
              img: "src/assets/icon1.png",
              title: "20,000+",
              desc: "Soal Latihan Terupdate",
            },
            {
              img: "src/assets/icon2.png",
              title: "200+",
              desc: "Pengajar",
            },
            {
              img: "src/assets/icon3.png",
              title: "90%",
              desc: "Peserta Berhasil",
            },
            {
              img: "src/assets/icon4.png",
              title: "9.5/10",
              desc: "Peserta Puas",
            },
          ].map((item, idx) => (
            <Box
              key={idx}
              className="flex items-center gap-4 w-full md:w-auto justify-center"
            >
              <img src={item.img} alt={`Icon ${idx}`} className="w-12 h-12" />
              <Box>
                <Typography variant="h6" className="text-white font-bold">
                  {item.title}
                </Typography>
                <Typography className="text-white text-sm">
                  {item.desc}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default TentangKami;
