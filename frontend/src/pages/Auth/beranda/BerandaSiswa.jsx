import { Container, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

function BerandaSiswa() {
  const today = new Date();
  const tanggalHariIni = today.getDate();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const namaBulan = today.toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
  });

  const tanggalLengkap = today.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Container maxWidth="xl" sx={{ mt: 7 }} >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          fontSize: { xs: "1.5rem", md: "2.125rem" },
        }}
      >
        Selamat Pagi,
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "1.2rem", md: "1.5rem" },
          }}
        >
          Siswa Kahfi
        </Typography>
      </Typography>

      {/* Box Kalender */}
      <Box
        sx={{
          mt: { xs: 4, md: 6 },
          p: 3,
          border: "2px solid grey",
          borderRadius: 2,
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            fontSize: { xs: "1.25rem", md: "1.5rem" },
          }}
        >
          Kalender Per Minggu
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "gray",
            mb: 2,
            textAlign: "center",
            fontSize: { xs: "1rem", md: "1.25rem" },
          }}
        >
          {namaBulan}
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            mt: 5,
            overflowX: { xs: "auto", md: "visible" },
            WebkitOverflowScrolling: "touch",
            px: { xs: 1, md: 0 },
          }}
        >
          {Array.from({ length: 7 }).map((_, i) => {
            const date = new Date();
            date.setDate(tanggalHariIni + i);

            const namaHari = date.toLocaleDateString("id-ID", { weekday: "short" });
            const tanggal = date.getDate();

            const isSelected = selectedIndex === i;

            return (
              <Box
                key={i}
                onClick={() => setSelectedIndex(i)}
                sx={{
                  flex: { xs: "0 0 100px", md: 1 },
                  aspectRatio: "1 / 1",
                  borderRadius: 1,
                  bgcolor: isSelected ? "#008B47" : "#AEE6BC",
                  color: isSelected ? "#fff" : "#000",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "0.3s",
                  fontWeight: "bold",
                  fontSize: 18,
                  minWidth: 100,
                  "& > div:first-of-type": {
                    fontSize: { xs: "12px", md: "16px" },
                  },
                  "& > div:last-of-type": {
                    fontSize: { xs: "32px", md: "48px" },
                  },
                }}
              >
                <div>{namaHari}</div>
                <div>{tanggal}</div>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Box Jadwal Hari Ini */}
      <Box
        sx={{
          mt: 6,
          p: 3,
          border: "2px solid grey",
          borderRadius: 2,
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          width: { xs: "100%", md: "75%" },
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          textAlign: "center", // <-- CENTER semua teks di sini
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "1.25rem", md: "1.5rem" },
          }}
        >
          Jadwal Hari Ini
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "0.9rem", md: "1.1rem" },
            color: "gray",
          }}
        >
          {tanggalLengkap}
        </Typography>
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "1.1rem", md: "1.3rem" },
          }}
        >
          Nama Matapelajaran
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#008B47",
            color: "#fff",
            fontWeight: "bold",
            width: "auto", // tombol sesuai isi teks
            mx: "auto", // tombol di tengah
            px: 4,
            "&:hover": {
              backgroundColor: "#006633",
            },
          }}
        >
          Attend
        </Button>
      </Box>
    </Container>
  );
}

export default BerandaSiswa;
