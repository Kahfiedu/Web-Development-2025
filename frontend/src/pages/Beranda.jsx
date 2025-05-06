import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';

const Beranda = () => {
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
    <div style={{ marginTop: "50px" }}>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: "#008B47",
          minHeight: "100vh",
          color: "#fff",
          textAlign: isMobile ? "center" : "left",
          py: 6,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 4,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{ fontWeight: 700, fontSize: isMobile ? 28 : 42 }}
              >
                Belajar Membaca, Menulis & Mengaji Jadi Lebih Mudah!
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: 400, fontSize: isMobile ? 16 : 18, mb: 3 }}
              >
                Kahfi Education adalah solusi les privat online terbaik untuk
                anak usia dini. Dengan pendekatan interaktif, kami bantu si
                kecil belajar membaca, menulis, dan mengaji dari rumah.
              </Typography>

              <Box
  sx={{
    display: "flex",
    gap: 2,
    mt: 6,
    flexWrap: "wrap",
    justifyContent: { xs: "center", md: "flex-start" }, // Menjaga tombol di tengah di mobile dan ke kiri di desktop
    flexDirection: { xs: "column", md: "row" }, // Menampilkan tombol secara vertikal di mobile, horizontal di desktop
  }}
>
  <Button
    variant="contained"
    sx={{
      backgroundColor: "#fff",
      color: "#008B47",
      fontWeight: 600,
      px: 4,
      py: 1.5,
      borderRadius: 2,
      "&:hover": {
        backgroundColor: "#f0f0f0",
      },
    }}
  >
    Pilih Program
  </Button>

  <Button
    variant="contained"
    sx={{
      backgroundColor: "#fff",
      color: "#008B47",
      fontWeight: 600,
      px: 4,
      py: 1.5,
      borderRadius: 2,
      "&:hover": {
        backgroundColor: "#f0f0f0",
      },
    }}
  >
    Daftar Sekarang
  </Button>
</Box>

            </Box>

            <Box sx={{ flex: 1, textAlign: "center" }}>
              <img
                src="src/assets/mosquee.png"
                alt="Anak belajar"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default Beranda;
