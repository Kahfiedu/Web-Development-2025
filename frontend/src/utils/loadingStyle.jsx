import { Box, CircularProgress } from "@mui/material";
import { keyframes } from "@emotion/react";
import { styled } from "@mui/material/styles";

export const LoadingBox = styled(Box)({
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(8px)'
});

const pulse = keyframes`
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
`;

export const LoadingText = styled('p')({
    color: '#4B5563',
    fontSize: '1.125rem',
    fontWeight: 500,
    animation: `${pulse} 1.5s ease-in-out infinite`,
    textTransform: 'uppercase',
    letterSpacing: '0.1em'
});

export const StyledCircularProgress = styled(CircularProgress)({
    '& .MuiCircularProgress-svg': {
        filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))'
    }
});