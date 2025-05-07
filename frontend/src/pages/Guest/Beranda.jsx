import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';

const Beranda = () => {
  return (
    <div>
      {/* Hero Section */}
      <Box className="bg-green-700 text-white min-h-screen py-16">
        <Container maxWidth="lg">
          <Box className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Text Section */}
            <Box className="flex-1 text-center md:text-left">
              <p
                className="font-bold text-[28px] md:text-[42px] mb-4"
              >
                Belajar Membaca, Menulis & Mengaji Jadi Lebih Mudah!
              </p>
              <span
                className="text-[16px] md:text-[18px] font-normal mb-6"
              >
                Kahfi Education adalah solusi les privat online terbaik untuk
                anak usia dini. Dengan pendekatan interaktif, kami bantu si
                kecil belajar membaca, menulis, dan mengaji dari rumah.
              </span>

              <Box className="flex flex-col md:flex-row gap-4 mt-6 justify-center md:justify-start">
                <Button
                  variant="contained"
                  className="!bg-white !text-green-700 !font-semibold px-6 py-3 rounded-md hover:!bg-gray-100"
                >
                  Pilih Program
                </Button>
                <Button
                  variant="contained"
                  className="!bg-white !text-green-700 !font-semibold px-6 py-3 rounded-md hover:!bg-gray-100"
                >
                  Daftar Sekarang
                </Button>
              </Box>
            </Box>

            {/* Image Section */}
            <Box className="flex-1 flex justify-center">
              <img
                src="img/beranda/mosquee.png"
                alt="Anak belajar"
                className="max-w-full h-auto"
              />
            </Box>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default Beranda;
