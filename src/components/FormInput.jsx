import React, { useState } from 'react';
import {
  TextField,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const FormInput = ({
  icon,
  type,
  placeholder,
  name,
  required = false,
  value,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  return (
    <TextField
      fullWidth
      variant="outlined"
      name={name}
      required={required}
      placeholder={placeholder}
      type={isPassword ? (showPassword ? 'text' : 'password') : type}
      value={value}
      onChange={onChange}
      InputProps={{
        startAdornment: icon && (
          <InputAdornment position="start">
            {icon}
          </InputAdornment>
        ),
        endAdornment: isPassword && (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
              size="small"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{
        mb: 2,
        '& .MuiOutlinedInput-root': {
          borderRadius: '12px',
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#ccc',
        },
        '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#0A3D2E', // kahf-green (bisa di-theme juga)
        },
      }}
    />
  );
};

export default FormInput;
