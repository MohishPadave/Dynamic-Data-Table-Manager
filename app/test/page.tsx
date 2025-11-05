'use client';

import { Box, Typography, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

export default function TestPage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Test Page - Basic MUI Components
        </Typography>
        <Typography variant="body1" gutterBottom>
          If you can see this, the basic setup is working.
        </Typography>
        <Button variant="contained" sx={{ mt: 2 }}>
          Test Button
        </Button>
      </Box>
    </ThemeProvider>
  );
}