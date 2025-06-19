import React from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Stack,
} from '@mui/material';

function KelasSiswa() {
  return (
    <Box sx={{ bgcolor: '#AEE6BC', py: 5 }}>
      <Container maxWidth="md" sx={{ width: '80%' }}>
        {/* Judul Besar */}
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Kelas A
        </Typography>

        {/* Subjudul */}
        <Typography variant="body1" mb={4}>
          Kelas ini dirancang untuk pemula yang ingin memperbaiki bacaan Al-Qur’an dengan metode Yanbu’a
        </Typography>

        {/* Box Putih */}
        <Box
          sx={{
            bgcolor: 'white',
            borderRadius: 2,
            width: '100%',
            p: 4,
            mb: 4,
            mx: 'auto',
          }}
        >
          <Stack spacing={2}>
            {[
              'Pengajar : Ustadzah Ulul Azmi',
              'Jadwal Kelas : Senin & Rabu, 19.00 – 20.30 WIB',
              'Lokasi (offline) : Kahfi Education, Denpasar',
              'Tanggal Mulai : 15 Juni 2025',
              'Kuota : 20 siswa, sudah terdaftar : 15 siswa',
            ].map((text, index) => (
              <Box
                key={index}
                sx={{
                  border: '1px solid black',
                  borderRadius: 2,
                  px: 2,
                  py: 1.5,
                }}
              >
                <Typography variant="body2">{text}</Typography>
              </Box>
            ))}
          </Stack>
        </Box>

        {/* Tombol Next */}
        <Box textAlign="center">
          <Button
            variant="contained"
            sx={{
              bgcolor: '#008B47',
              color: 'white',
              borderRadius: '20px',
              px: 4,
              textTransform: 'none',
              fontSize: 14,
            }}
          >
            Daftar
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default KelasSiswa;
