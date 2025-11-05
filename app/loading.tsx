'use client';

import { Box, CircularProgress, Typography } from '@mui/material';
import { TableChart } from '@mui/icons-material';

export default function Loading() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        gap: 3,
        backgroundColor: 'background.default',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mb: 2,
        }}
      >
        <TableChart sx={{ fontSize: 40, color: 'primary.main' }} />
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Dynamic Data Table Manager
        </Typography>
      </Box>
      
      <CircularProgress size={40} thickness={4} />
      
      <Typography variant="body2" color="text.secondary">
        Loading your data table...
      </Typography>
    </Box>
  );
}