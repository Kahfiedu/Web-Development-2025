import React, { useState, useRef, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Link as MuiLink,
} from '@mui/material';
import AuthLayout from '../components/AuthLayout';

const OTP = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const [timer, setTimer] = useState(60);

  const navigate = useNavigate();

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== '' && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text/plain').trim();
    if (/^\d{4}$/.test(pasted)) {
      const digits = pasted.split('');
      const newOtp = [...otp];
      digits.forEach((digit, index) => {
        if (index < 4) newOtp[index] = digit;
      });
      setOtp(newOtp);
      inputRefs[3].current.focus();
    }
  };

  const resendOTP = () => {
    setTimer(60);
    // Logic to resend
  };

  const verifyOTP = (e) => {
    e.preventDefault();
    console.log('Verifying OTP:', otp.join(''));
    navigate('/blog');
  };

  return (
    <AuthLayout
      greeting="Verifikasi OTP"
      sidebarText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    >
      <Box textAlign="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          Enter OTP
        </Typography>
      </Box>

      <Box textAlign="center" mb={3}>
        <Typography variant="body1" color="textSecondary">
          Kami telah mengirim code OTP verifikasi ke <br />
          <Typography component="span" fontWeight="500">
            example@email.com
          </Typography>
        </Typography>
      </Box>

      <Box component="form" onSubmit={verifyOTP} width="100%">
        <Box display="flex" justifyContent="center" gap={2} mb={3}>
          {otp.map((digit, index) => (
            <TextField
              key={index}
              inputRef={inputRefs[index]}
              inputProps={{
                maxLength: 1,
                style: {
                  textAlign: 'center',
                  fontSize: '24px',
                  width: '56px',
                  height: '56px',
                },
              }}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : null}
              variant="outlined"
            />
          ))}
        </Box>

        <Box textAlign="center" mb={2}>
          {timer > 0 ? (
            <Typography color="textSecondary">
              Resend code in{' '}
              <Typography component="span" fontWeight="500">
                {timer}s
              </Typography>
            </Typography>
          ) : (
            <Button variant="text" onClick={resendOTP} sx={{ color: 'green' }}>
              Resend OTP
            </Button>
          )}
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="success"
          fullWidth
          size="large"
          sx={{ py: 1.5, mb: 2 }}
        >
          Verify
        </Button>
      </Box>

      <Box mt={2} textAlign="center">
        <MuiLink component={RouterLink} to="/login" color="textSecondary">
          Back to Login
        </MuiLink>
      </Box>
    </AuthLayout>
  );
};

export default OTP;
