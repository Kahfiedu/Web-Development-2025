import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import KahfLogo from './Kahflogo';
import quranImage from '../assets/download (6).jpeg';

const AuthLayout = ({ children, sidebarText, greeting }) => {
  return (
    <Box
      display="flex"
      flexDirection={{ xs: 'column', md: 'row' }}
      minHeight="100vh"
    >
      {/* Sidebar */}
      <Box
        width={{ xs: '100%', md: '55%' }}
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="white"
        textAlign="center"
      >
        {/* Background image */}
        <Box
          component="img"
          src={quranImage}
          alt="Islamic study materials"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.4)',
            zIndex: 1,
          }}
        />

        {/* Overlay gradient */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(10, 61, 46, 0.9), rgba(10, 61, 46, 0.7), transparent)',
            zIndex: 2,
          }}
        />

        {/* Sidebar content */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 3,
            px: { xs: 3, md: 6 },
          }}
        >
          <Typography variant="h3" fontWeight="bold" mb={2}>
            {greeting}
          </Typography>
          <Typography variant="h6">{sidebarText}</Typography>
        </Box>
      </Box>

      {/* Content: Login/Register */}
      <Box
        width={{ xs: '100%', md: '45%' }}
        bgcolor="white"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Container
          maxWidth="sm"
          sx={{
            py: { xs: 6, md: 12 },
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Box mb={5} display="flex" justifyContent="center">
            <KahfLogo />
          </Box>
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export default AuthLayout;
