import React from 'react';
import { Button } from '@mui/material';

const SocialButton = ({ icon, provider, onClick }) => {
  return (
    <Button
      onClick={onClick}
      fullWidth
      variant="outlined"
      startIcon={icon}
      sx={{
        py: 1.5,
        borderRadius: 2,
        textTransform: 'none',
        borderColor: '#ccc',
        color: '#000',
        '&:hover': {
          backgroundColor: '#f5f5f5',
          borderColor: '#bbb',
        },
      }}
    >
      {provider}
    </Button>
  );
};

export default SocialButton;
