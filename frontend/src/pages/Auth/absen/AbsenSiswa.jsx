import { Box, Typography, Paper, Button, TextField } from "@mui/material";
import { useState } from "react";

function AbsenSiswa() {
  const [activeButton, setActiveButton] = useState(null);
  const [keteranganIzin, setKeteranganIzin] = useState("");
  const [fileSakit, setFileSakit] = useState(null);

  const handleToggle = (label) => {
    if (activeButton === label) {
      setActiveButton(null);
    } else {
      setActiveButton(label);
    }
    // Reset input saat ganti tombol
    setKeteranganIzin("");
    setFileSakit(null);
  };

  const handleFileChange = (e) => {
    setFileSakit(e.target.files[0]);
  };

  return (
    <Box
      sx={{
        height: { xs: '110vh', md: '75vh' }, 
        px: { xs: 2, md: 8 },
        py: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxSizing: "border-box",
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* Konten Utama */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 3,
          flex: 1,
          alignItems: "center",
          mt: 2,
          mb: 2,
          flexWrap: { xs: "wrap", md: "nowrap" },
        }}
      >
        {/* Jadwal */}
        <Paper
          elevation={3}
          sx={{
            flexGrow: 1,
            px: 6,
            borderRadius: 3,
            minWidth: 300,
            textAlign: { xs: "center", md: "left" },
            height: 300,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" fontWeight="bold" mb={2}>
            Jadwal Hari Ini
          </Typography>
          <Typography variant="h6" mb={1}>
            Nama Kelas: <strong>Nama Kelas</strong>
          </Typography>
          <Typography variant="h6">
            Nama Guru: <strong>Nama Guru</strong>
          </Typography>
        </Paper>

        {/* Kotak QR / input keterangan / file upload */}
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 3,
            height: 300,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            minWidth: 260,
          }}
        >
          {activeButton === "Izin" && (
  <Box
    sx={{
      width: 220,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <Typography variant="h6" mb={1} textAlign="center">
      Keterangan Izin:
    </Typography>
    <TextField
      fullWidth
      multiline
      minRows={4}
      value={keteranganIzin}
      onChange={(e) => setKeteranganIzin(e.target.value)}
      placeholder="Masukkan keterangan izin..."
      variant="outlined"
      sx={{ mb: 2 }}
    />
    <Button
      variant="contained"
      color="success"
      sx={{ width: "100%" }}
      onClick={() => {
        if (keteranganIzin.trim() === "") {
          alert("Keterangan izin tidak boleh kosong!");
          return;
        }
        alert(`Keterangan izin disubmit: ${keteranganIzin}`);
        setKeteranganIzin("");
        setActiveButton(null);
      }}
    >
      Submit Keterangan
    </Button>
  </Box>
)}


          {activeButton === "Sakit" && (
            <Box sx={{ width: "100%", textAlign: "center" }}>
              <Typography variant="h6" mb={1}>Upload Bukti Sakit:</Typography>
              <Button
                variant="outlined"
                component="label"
                sx={{ mt: 1 }}
              >
                Pilih File
                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                  accept="image/*,application/pdf"
                />
              </Button>
              {fileSakit && (
                <Typography mt={1} variant="body2" color="textSecondary">
                  File: {fileSakit.name}
                </Typography>
              )}
            </Box>
          )}

          {!activeButton || activeButton === "Hadir" ? (
            <>
              <Box
                sx={{
                  width: 220,
                  height: 220,
                  bgcolor: "#ccc",
                  borderRadius: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: "1.25rem",
                  mb: 1,
                }}
              >
                QR CODE
              </Box>
              <Typography variant="body1" color="textSecondary">
                Scan untuk absen hadir
              </Typography>
            </>
          ) : null}
        </Paper>
      </Box>

      {/* Tombol */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 1.5,
          flexWrap: "wrap",
          mb: 1,
        }}
      >
        {["Izin", "Sakit", "Hadir"].map((label) => {
          const isActive = activeButton === label;

          return (
            <Button
              key={label}
              variant="contained"
              onClick={() => handleToggle(label)}
              sx={{
                backgroundColor: isActive ? "#008B47" : "#fff",
                color: isActive ? "#fff" : "#008B47",
                fontWeight: "bold",
                px: 3,
                py: 1,
                fontSize: "1rem",
                borderRadius: 2,
                minWidth: 90,
                border: "2px solid #008B47",
                "&:hover": {
                  backgroundColor: isActive ? "#006633" : "#AEE6BC",
                  color: "#000", // text hitam saat hover
                  borderColor: "#006633",
                },
              }}
            >
              {label}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
}

export default AbsenSiswa;
