import {
  Box,
  Typography,
  ToggleButton,
  TextField,
  MenuItem,
  Container,
  Paper,
  Button,
} from "@mui/material";
import { useState } from "react";

function DaftarProgram() {
  const [step, setStep] = useState(0);

  const steps = [
    { value: "umum", label: "Umum" },
    { value: "anak", label: "Anak" },
    { value: "ortu", label: "Orang Tua" },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = () => {
    // Di sini letakkan logika submit (misal validasi, kirim API, dll.)
    console.log("Form submitted");
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 7 }}>
      <Box sx={{ py: 6, px: 4, borderRadius: 2 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom
        sx={{
            mb:4
        }}>
          Pendaftaran Program Visit Home
        </Typography>

        {/* Toggle progress (disabled, hanya untuk tampilan) */}
        <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 4 }}>
          {steps.map((item, index) => (
            <ToggleButton
              key={item.value}
              value={item.value}
              selected={step >= index}
              disabled
              sx={{
                border: "none",
                borderRadius: "9999px",
                px: 4,
                mr: 2,
                color: step >= index ? "#fff" : "#000",
                "&:hover": { backgroundColor: step >= index ? "#00723A" : "#9CD9AD" },
              }}
              style={{
                                backgroundColor: step >= index ? "#008B47" : "#AEE6BC",
                                color: step >= index ? "#fff" : "#000",
              }}
            >
              {item.label}
            </ToggleButton>
          ))}
        </Box>

        {/* Form */}
        <Paper elevation={3} sx={{ p: 4, mt: 3 }}>
          {/* Step 0: Umum */}
          {step === 0 && (
            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 3,
              }}
            >
              <TextField label="Email" fullWidth />
              <TextField select label="Jumlah Anak" fullWidth defaultValue="">
                {[1, 2, 3, 4, 5].map((val) => (
                  <MenuItem key={val} value={val}>
                    {val}
                  </MenuItem>
                ))}
              </TextField>
              <TextField select label="Pilih Guru" fullWidth defaultValue="">
                <MenuItem value="laki">Laki-Laki</MenuItem>
                <MenuItem value="perempuan">Perempuan</MenuItem>
              </TextField>
              <TextField select label="Jumlah Pertemuan" fullWidth defaultValue="">
                {[...Array(10)].map((_, i) => (
                  <MenuItem key={i + 1} value={i + 1}>
                    {i + 1}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          )}

          {/* Step 1: Anak */}
          {step === 1 && (
            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 3,
              }}
            >
              <TextField label="Nama Lengkap Anak" fullWidth />
              <TextField select label="Jenis Kelamin" fullWidth defaultValue="">
                <MenuItem value="Laki-laki">Laki-laki</MenuItem>
                <MenuItem value="Perempuan">Perempuan</MenuItem>
              </TextField>
              <TextField label="Umur" fullWidth />
              <TextField label="Tempat, Tanggal Lahir" fullWidth />
              <TextField select label="Pilihan Program" fullWidth defaultValue="">
                <MenuItem value="Tahsin">Tahsin</MenuItem>
                <MenuItem value="Tahfidz">Tahfidz</MenuItem>
                <MenuItem value="Mengaji Visit Home">Mengaji Visit Home</MenuItem>
              </TextField>
              <TextField select label="Sistem Pembelajaran" fullWidth defaultValue="">
                <MenuItem value="Online">Online</MenuItem>
                <MenuItem value="Offline">Offline</MenuItem>
              </TextField>
              <TextField
                label="Deskripsi Anak"
                fullWidth
                multiline
                rows={3}
                sx={{ gridColumn: { md: "span 2" } }}
              />
            </Box>
          )}

          {/* Step 2: Orang Tua */}
          {step === 2 && (
            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 3,
              }}
            >
              <TextField label="Nama Orang Tua" fullWidth />
              <TextField label="No Telepon" fullWidth />
              <TextField label="Alamat Lengkap" fullWidth />
              <TextField label="Kabupaten" fullWidth />
              <TextField
                select
                label="Izin Video untuk Konten Sosial Media?"
                fullWidth
                defaultValue=""
              >
                <MenuItem value="Ya">Ya</MenuItem>
                <MenuItem value="Tidak">Tidak</MenuItem>
              </TextField>
            </Box>
          )}

          {/* Tombol Navigasi: Kembali & Lanjut/Submit */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 4,
            }}
          >
            <Button
              variant="contained"
              onClick={handleBack}
              disabled={step === 0}
              sx={{ backgroundColor: "#008B47", "&:hover": { backgroundColor: "#00723A" } }}
            >
              Kembali
            </Button>

            {step < steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ backgroundColor: "#008B47", "&:hover": { backgroundColor: "#00723A" } }}
              >
                Lanjut
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{ backgroundColor: "#008B47", "&:hover": { backgroundColor: "#00723A" } }}
              >
                Submit
              </Button>
            )}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default DaftarProgram;
