'use client';

import { Container, Typography, Box, Paper, Button } from '@mui/material';
import { TableChart } from '@mui/icons-material';

export default function SimplePage() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: 2, 
          mb: 3 
        }}>
          <TableChart sx={{ fontSize: 40, color: 'primary.main' }} />
          <Typography variant="h3" component="h1">
            Simple Test Page
          </Typography>
        </Box>
        
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Testing basic functionality without Redux
        </Typography>
      </Box>
      
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Basic Components Test
        </Typography>
        <Typography variant="body1" gutterBottom>
          If you can see this page, the basic Next.js + MUI setup is working correctly.
        </Typography>
        <Button variant="contained" sx={{ mt: 2 }}>
          Test Button
        </Button>
      </Paper>
    </Container>
  );
}