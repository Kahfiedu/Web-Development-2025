import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import AuthLayout from '../components/AuthLayout';
import SocialButton from '../components/SocialButton';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <AuthLayout
      greeting="Selamat Datang"
      sidebarText='Mari bersama "Mengaji Dari Hati"'
    >
      <Typography variant="h5" fontWeight="bold" align="center" mb={3}>
        Log In
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
        <Box mb={2}>
          <Typography variant="body2" mb={0.5}>
            Email<span style={{ color: 'red' }}>*</span>
          </Typography>
          <TextField
            fullWidth
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            size="small"
          />
        </Box>

        <Box mb={2}>
          <Typography variant="body2" mb={0.5}>
            Password<span style={{ color: 'red' }}>*</span>
          </Typography>
          <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Enter your password"
            required
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box mt={1} display="flex" justifyContent="flex-end">
            <Link
              to="/forgot-password"
              style={{
                fontSize: '0.875rem',
                color: '#4b5563',
                textDecoration: 'none',
              }}
            >
              Forgot password?
            </Link>
          </Box>
        </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="success"
          sx={{ py: 1.5, borderRadius: 2, textTransform: 'none', mt: 2 }}
        >
          Masuk
        </Button>
      </Box>

      <Box mt={4} width="100%">
        <SocialButton
          provider="Google"
          icon={
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
          }
        />
      </Box>

      <Box mt={2} textAlign="center" fontSize="0.875rem">
        Belum memiliki akun?{' '}
        <Link to="/register" style={{ color: '#16a34a', fontWeight: 500 }}>
          Daftar
        </Link>
      </Box>
    </AuthLayout>
  );
};

export default Login;
