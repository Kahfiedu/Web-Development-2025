import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

const TentangKami = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Menentukan apakah layar kecil (mobile)
    };

    handleResize(); // Cek ukuran layar saat pertama kali render
    window.addEventListener('resize', handleResize); // Tambahkan event listener saat ukuran layar berubah

    return () => window.removeEventListener('resize', handleResize); // Bersihkan event listener saat komponen di-unmount
  }, []);

  return (
    <div style={{ marginTop: "75px" }}>
      {/* Mengapa Memilih Kami */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column-reverse" : "row",
          alignItems: "center",
          justifyContent: "space-between",
          px: isMobile ? 2 : 4,
          py: 6,
          gap: 4,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <img
            src="src/assets/img1.png"
            alt="Guru Mengajar"
            style={{
              width: "85%",
              height: "auto",
              borderRadius: "16px", // Membuat sudut gambar rounded
              transition: "transform 0.3s ease", // Animasi smooth saat zoom
            }}
            className="image-hover" // Memberi kelas agar bisa diberi efek hover
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 600,
              fontSize: isMobile ? 22 : 32,
              color: "#008B47",
            }}
          >
            Tentang Kami
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            sx={{ fontWeight: 500, fontSize: isMobile ? 22 : 18 }}
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

      {/* CSS untuk efek hover gambar */}
      <style jsx>
        {`
          .image-hover:hover {
            transform: scale(1.1); /* Efek zoom */
          }
        `}
      </style>

      {/* Mengapa Kami */}
      <Box sx={{ px: isMobile ? 2 : 4, py: 6 }}>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: 600,
            fontSize: isMobile ? 22 : 32,
            color: "#008B47",
            textAlign: "center",
            mb: 4,
          }}
        >
          Mengapa Memilih Kami
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 4,
          }}
        >
          {[{ icon: "📚", title: "Kurikulum Tepat", desc: "Materi disesuaikan dengan kemampuan anak dan dikembangkan secara menyenangkan." },
            { icon: "👩‍🏫", title: "Guru Profesional", desc: "Pengajar berpengalaman dan sabar dalam mendampingi proses belajar anak." },
            { icon: "🕒", title: "Jadwal Fleksibel", desc: "Belajar bisa diatur sesuai waktu luang anak dan orang tua." },
            { icon: "💻", title: "Online Interaktif", desc: "Kelas dilakukan online secara dua arah, membuat anak aktif berpartisipasi." },
          ].map((item, idx) => (
            <Box key={idx} sx={{ textAlign: "center", flex: 1 }}>
              <Box sx={{ fontSize: 48 }}>{item.icon}</Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mt: 2, mb: 1 }}>
                {item.title}
              </Typography>
              <Typography variant="body2" sx={{ px: 1 }}>
                {item.desc}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: "#008B47",
          py: 6,
          display: "flex",
          justifyContent: "center",
          borderRadius: 4,
          width : "90%",
          mx : "auto"
        }}
      >
        <Box
          sx={{
            width: "100%",
            px: 2,
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 4,
          }}
        >
          {/* Item 1 */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <img
              src="src/assets/icon1.png"
              alt="Icon 1"
              width={48}
              height={48}
            />
            <Box>
              <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700 }}>
                20,000+
              </Typography>
              <Typography sx={{ color: "#fff" }}>
                Soal Latihan Terupdate
              </Typography>
            </Box>
          </Box>

          {/* Item 2 */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <img
              src="src/assets/icon2.png"
              alt="Icon 2"
              width={48}
              height={48}
            />
            <Box>
              <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700 }}>
                200+
              </Typography>
              <Typography sx={{ color: "#fff" }}>Pengajar</Typography>
            </Box>
          </Box>

          {/* Item 3 */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <img
              src="src/assets/icon3.png"
              alt="Icon 3"
              width={48}
              height={48}
            />
            <Box>
              <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700 }}>
                90%
              </Typography>
              <Typography sx={{ color: "#fff" }}>Peserta Berhasil</Typography>
            </Box>
          </Box>

          {/* Item 4 */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <img
              src="src/assets/icon4.png"
              alt="Icon 4"
              width={48}
              height={48}
            />
            <Box>
              <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700 }}>
                9.5/10
              </Typography>
              <Typography sx={{ color: "#fff" }}>Peserta Puas</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default TentangKami;
