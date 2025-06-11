import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
  Paper,
} from '@mui/material';
import KahfLogo from '../components/Kahflogo';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    alert('Password reset successful!');
  };

  return (
    <Box
      minHeight="100vh"
      bgcolor="#f3f4f6"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Paper
        elevation={3}
        sx={{
          borderRadius: 6,
          p: { xs: 3, md: 4 },
          width: '100%',
          maxWidth: 400,
        }}
      >
        <Box display="flex" justifyContent="center" mb={2}>
          <KahfLogo style={{ height: 32 }} />
        </Box>

        <Typography variant="h6" fontWeight="bold" textAlign="center" mb={3}>
          Set New Password
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            type="password"
            label="New Password"
            placeholder="Enter new password"
            fullWidth
            required
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <TextField
            type="password"
            label="Confirm Password"
            placeholder="Confirm new password"
            fullWidth
            required
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Box display="flex" justifyContent="center" mt={3}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                px: 6,
                py: 1.5,
                borderRadius: 999,
                backgroundColor: '#2e7d32', // Warna hijau khas kahf
                '&:hover': {
                  backgroundColor: '#27642b',
                },
              }}
            >
              Reset Password
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ResetPassword;
