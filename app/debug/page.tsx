'use client';

import { useEffect, useState } from 'react';
import { Container, Typography, Box, Paper, Alert } from '@mui/material';

export default function DebugPage() {
  const [debugInfo, setDebugInfo] = useState<string[]>([]);

  useEffect(() => {
    const info = [];
    info.push(`Window object: ${typeof window !== 'undefined' ? 'Available' : 'Not available'}`);
    info.push(`Local storage: ${typeof localStorage !== 'undefined' ? 'Available' : 'Not available'}`);
    info.push(`User agent: ${typeof navigator !== 'undefined' ? navigator.userAgent : 'Not available'}`);
    info.push(`Current URL: ${typeof window !== 'undefined' ? window.location.href : 'Not available'}`);
    
    setDebugInfo(info);
    
    console.log('Debug page mounted');
    console.log('Debug info:', info);
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Debug Information
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Environment Check
        </Typography>
        {debugInfo.map((info, index) => (
          <Alert key={index} severity="info" sx={{ mb: 1 }}>
            {info}
          </Alert>
        ))}
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Component Status
        </Typography>
        <Alert severity="success">
          This debug page is rendering successfully!
        </Alert>
      </Paper>
    </Container>
  );
}