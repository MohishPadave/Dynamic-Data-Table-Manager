'use client';

import { useState } from 'react';
import { Container, Typography, Box, useTheme, alpha } from '@mui/material';
import { DataTable } from '@/components/DataTable';
import { TableControls } from '@/components/TableControls';
import { FloatingActions } from '@/components/FloatingActions';
import { ManageColumnsModal } from '@/components/ManageColumnsModal';
import { ImportModal } from '@/components/ImportModal';
import { TableChart, Speed, Security } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { exportToCSV } from '@/utils/csvUtils';

export default function Home() {
  const theme = useTheme();
  const { data, columns } = useSelector((state: RootState) => state.table);
  const [showColumnsModal, setShowColumnsModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  const handleExport = () => {
    const visibleColumns = columns.filter(col => col.visible);
    exportToCSV(data, visibleColumns);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.02)} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
    }}>
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            gap: 2, 
            mb: 3 
          }}>
            <Box sx={{
              p: 2,
              borderRadius: '50%',
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <TableChart sx={{ fontSize: 32 }} />
            </Box>
            <Typography 
              variant="h2" 
              component="h1" 
              sx={{ 
                fontWeight: 800,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em',
              }}
            >
              Dynamic Data Table Manager
            </Typography>
          </Box>
          
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ 
              mb: 4, 
              maxWidth: 600, 
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            Powerful data management with sorting, filtering, import/export, and inline editing capabilities
          </Typography>

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 4, 
            flexWrap: 'wrap',
            mb: 4,
          }}>
            {[
              { icon: Speed, label: 'Fast Performance', color: theme.palette.success.main },
              { icon: Security, label: 'Type Safe', color: theme.palette.info.main },
              { icon: TableChart, label: 'Rich Features', color: theme.palette.warning.main },
            ].map((feature, index) => (
              <Box key={index} sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                px: 2,
                py: 1,
                borderRadius: 2,
                backgroundColor: alpha(feature.color, 0.1),
                border: `1px solid ${alpha(feature.color, 0.2)}`,
              }}>
                <feature.icon sx={{ color: feature.color, fontSize: 20 }} />
                <Typography variant="body2" sx={{ fontWeight: 600, color: feature.color }}>
                  {feature.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
        
        <TableControls />
        <DataTable />
        
        <FloatingActions
          onImport={() => setShowImportModal(true)}
          onExport={handleExport}
          onManageColumns={() => setShowColumnsModal(true)}
        />

        <ManageColumnsModal
          open={showColumnsModal}
          onClose={() => setShowColumnsModal(false)}
        />
        
        <ImportModal
          open={showImportModal}
          onClose={() => setShowImportModal(false)}
        />
      </Container>
    </Box>
  );
}