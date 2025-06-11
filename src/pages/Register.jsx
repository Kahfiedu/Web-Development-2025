import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  InputAdornment,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Person,
  Email,
  Lock,
  Google,
} from '@mui/icons-material';

import AuthLayout from '../components/AuthLayout';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert('Semua field harus diisi!');
      return;
    }
    navigate('/otp');
  };

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <AuthLayout
      greeting="Halo"
      sidebarText='Mari bersama "Mengaji Dari Hati"'
    >
      <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
        Register
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          fullWidth
          margin="normal"
          label="Nama"
          placeholder="Masukkan nama anda"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Email"
          placeholder="Masukkan email anda"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Password"
          placeholder="Masukkan kata sandi"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2, mb: 2, bgcolor: 'success.main' }}
        >
          Daftar
        </Button>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<Google />}
          sx={{ textTransform: 'none' }}
          onClick={() => alert('Login dengan Google belum tersedia')}
        >
          Daftar dengan Google
        </Button>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Sudah punya akun?{' '}
          <Link to="/login" style={{ color: '#2e7d32', fontWeight: '500' }}>
            Masuk
          </Link>
        </Typography>
      </Box>
    </AuthLayout>
  );
};

export default Register;
