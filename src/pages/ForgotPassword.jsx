import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import KahfLogo from '../components/Kahflogo';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Check your email for reset instructions');
    navigate('/reset-password');
  };

  return (
    <Box
      display="flex"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
      bgcolor="#f3f4f6" // bg-gray-100
    >
      <Paper
        elevation={3}
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 6,
          width: '100%',
          maxWidth: 400,
        }}
      >
        <Box display="flex" justifyContent="center" mb={2}>
          <KahfLogo style={{ height: 32 }} />
        </Box>
        <Typography variant="h6" align="center" fontWeight="bold" gutterBottom>
          Forgot Password
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Typography variant="body2" mb={1}>
            Email
          </Typography>
          <TextField
            fullWidth
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            size="small"
          />
          <Box display="flex" justifyContent="center" mt={4}>
            <Button
              type="submit"
              variant="contained"
              color="success"
              sx={{
                borderRadius: '999px',
                px: 5,
                py: 1.5,
                textTransform: 'none',
                ':hover': { bgcolor: 'green.dark' },
              }}
            >
              Send Reset Link
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ForgotPassword;
