'use client';

import { Container, Typography, Box, Alert, Button } from '@mui/material';
import { Warning, Build } from '@mui/icons-material';
import Link from 'next/link';

export default function MaintenancePage() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Warning sx={{ fontSize: 64, color: 'warning.main', mb: 2 }} />
        <Typography variant="h3" gutterBottom>
          App Under Maintenance
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          This was the old maintenance page. The main app is now working!
        </Typography>
      </Box>

      <Alert severity="success" sx={{ mb: 4 }}>
        <Typography variant="body1" gutterBottom>
          <strong>Good news! The main app is now working without Redux Persist issues.</strong>
        </Typography>
        <Typography variant="body2">
          Go back to the homepage to see the fully functional data table.
        </Typography>
      </Alert>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Button 
          component={Link} 
          href="/" 
          variant="contained" 
          size="large"
          startIcon={<Build />}
        >
          Go to Main App
        </Button>
        
        <Button 
          component={Link} 
          href="/minimal" 
          variant="outlined" 
          size="large"
        >
          Minimal Version
        </Button>
        
        <Button 
          component={Link} 
          href="/debug" 
          variant="outlined" 
          size="large"
        >
          Debug Info
        </Button>
      </Box>

      <Box sx={{ mt: 6, p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Available Test Pages:
        </Typography>
        <ul>
          <li><strong>/</strong> - Main data table application (now working!)</li>
          <li><strong>/working</strong> - Alternative working version</li>
          <li><strong>/minimal</strong> - Basic table with search and sort</li>
          <li><strong>/debug</strong> - Environment and debugging information</li>
          <li><strong>/simple</strong> - Simple MUI components test</li>
        </ul>
      </Box>
    </Container>
  );
}