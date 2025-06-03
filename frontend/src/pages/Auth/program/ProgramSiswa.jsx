import { Box, Typography, Paper, Container } from "@mui/material";

const programData = [
  {
    id: 1,
    name: "Kelas Private Mengaji Visit Home Offline",
    img: "/img/class/quran-study-offline.png",
    link: "/siswa/program/daftar",
  },
  {
    id: 2,
    name: "Kelas Private Mengaji Visit Home Online",
    img: "/img/class/quran-study-online.png",
  },
  {
    id: 3,
    name: "Kelas Tahsin Full Online",
    img: "/img/class/tansin-online.png",
  },
  {
    id: 4,
    name: "Kelas Tahfidz Full Online",
    img: "/img/class/tahfidz-online.png",
  },
];

function ProgramSiswa() {
  return (
    <Container maxWidth="xl" sx={{ mt: 7 }}>
      <Box sx={{ bgcolor: "#AEE6BC", py: 6 }}>
        <Box
          sx={{
            maxWidth: "960px",
            mx: "auto",
            px: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            color="#000"
            textAlign="center"
            mb={4}
          >
            Pilih Program
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 3,
              width: "100%",
            }}
          >
            {programData.map((kelas) => (
              <Paper
                key={kelas.id}
                component={kelas.link ? "a" : "div"}
                href={kelas.link ? kelas.link : undefined}
                elevation={4}
                sx={{
                  width: { xs: "100%", sm: "45%" },
                  maxWidth: "420px",
                  p: 2,
                  bgcolor: "#fff",
                  borderRadius: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textDecoration: "none",
                  color: "inherit",
                  cursor: kelas.link ? "pointer" : "default",
                  "&:hover": {
                    boxShadow: kelas.link
                      ? "0 4px 20px rgba(0,0,0,0.2)"
                      : undefined,
                  },
                }}
              >
                <Box
                  component="img"
                  src={kelas.img}
                  alt={kelas.name}
                  sx={{
                    width: "100%",
                    height: 200,
                    objectFit: "contain",
                    backgroundColor: "#f0f0f0",
                    borderRadius: 2,
                    mb: 2,
                  }}
                />

                <Typography
                  variant="subtitle1"
                  fontWeight="medium"
                  textAlign="center"
                >
                  {kelas.name}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default ProgramSiswa;
