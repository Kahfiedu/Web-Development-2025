import { Container, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Link } from 'react-router-dom';

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
      </Typography>
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          fontSize: { xs: "1.2rem", md: "1.5rem" },
        }}
      >
        Siswa Kahfi
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

    {/* Wrapper Flex untuk Tugas dan Jadwal Hari Ini */}
<Box
  sx={{
    mt: 6,
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    gap: 3,
    justifyContent: "center",
  }}
>
  {/* Box Tugas */}
 <Box
  sx={{
    flex: 1,
    p: 3,
    border: "2px solid grey",
    borderRadius: 2,
    bgcolor : '#AEE6BC',
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
  }}
>
  <Typography
    variant="h5"
    sx={{
      fontWeight: "bold",
      fontSize: { xs: "1.25rem", md: "1.5rem" },
      mb: 3,
    }}
  >
    Tugas
  </Typography>

  {/* Array Tugas */}
  {[
    { judul: "Tugas Menulis", update: "Senin, 10:00" },
    { judul: "Tugas Belajar", update: "Selasa, 14:30" },
    { judul: "Tugas Menghafal", update: "Rabu, 08:15" },
  ].map((tugas, idx) => (
    <Box
      key={idx}
      sx={{
        bgcolor : '#fff',
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: "1px solid #ccc",
        borderRadius: 2,
        p: 2,
        mb: 2,
        gap: 2,
        flexDirection: { xs: "column", sm: "row" },
        textAlign: { xs: "center", sm: "left" },
      }}
    >
      {/* Judul */}
      <Typography sx={{ fontWeight: "bold", minWidth: 120 }}>
        {tugas.judul}
      </Typography>

      {/* Progress Bar */}
      <Box
        sx={{
          flex: 1,
          height: 10,
          bgcolor: "#eee",
          borderRadius: 5,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: `${30 + idx * 30}%`, // dummy progress
            height: "100%",
            bgcolor: "#008B47",
          }}
        />
      </Box>

      {/* Terakhir Update */}
      <Typography sx={{ fontSize: "0.9rem", color: "gray", minWidth: 120 }}>
        {tugas.update}
      </Typography>
    </Box>
  ))}
</Box>

  {/* Box Jadwal Hari Ini */}
<Box
  sx={{
    flex: 1,
    p: 3,
    bgcolor : '#AEE6BC',
    border: "2px solid grey",
    borderRadius: 2,
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center", 
    alignItems: "center",     
    gap: 2,
    textAlign: "center",
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
      color: "#000",
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
    component={Link}
  to="absen-siswa"
  variant="contained"
    sx={{
      backgroundColor: "#008B47",
      color: "#fff",
      fontWeight: "bold",
      width: "auto",
      mx: "auto",
      px: 4,
      "&:hover": {
        backgroundColor: "#006633",
      },
    }}
  >
    Attend
  </Button>
</Box>

</Box>

    </Container>
  );
}

export default BerandaSiswa;
