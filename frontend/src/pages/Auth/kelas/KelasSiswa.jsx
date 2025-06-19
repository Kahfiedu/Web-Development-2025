import { Box, Typography, Paper, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const classList = [
  { id: 1, name: "Kelas A" },
  { id: 2, name: "Kelas B" },
  { id: 3, name: "Kelas C" },
  { id: 4, name: "Kelas D" },
];

function KelasSiswa() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="xl" sx={{ mt: 7 }}>
      <Box
        sx={{
          bgcolor: "#AEE6BC",
          borderRadius: 3,
          py: 6,
          px: { xs: 2, sm: 4, md: 6 },
        }}
      >
        <Box
          sx={{
            maxWidth: "960px",
            mx: "auto",
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
            Pilih Kelas
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
            {classList.map((kelas) => (
              <Paper
                key={kelas.id}
                elevation={3}
                onClick={() => navigate("/siswa/kelas/detail")}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "#fff",
                  cursor: "pointer",
                  "&:hover": {
                    boxShadow: 6,
                  },
                }}
              >
                {/* Placeholder gambar */}
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    backgroundColor: "#e0e0e0",
                    borderRadius: 2,
                    mr: 2,
                  }}
                />

                <Typography variant="h6" fontWeight="medium">
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

export default KelasSiswa;