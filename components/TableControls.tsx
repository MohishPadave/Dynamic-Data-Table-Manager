'use client';

import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  IconButton,
  Tooltip,
  Stack,
  Paper,
  Typography,
  Chip,
  Fade,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Search,
  ViewColumn,
  Upload,
  Download,
  Brightness4,
  Brightness7,
  TableChart,
  FilterList,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setSearchTerm, toggleTheme } from '@/store/tableSlice';
import { ManageColumnsModal } from './ManageColumnsModal';
import { ImportModal } from './ImportModal';
import { exportToCSV } from '@/utils/csvUtils';
import { AnimatedCounter } from './AnimatedCounter';

export function TableControls() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { searchTerm, data, columns, theme: currentTheme } = useSelector((state: RootState) => state.table);
  const [showColumnsModal, setShowColumnsModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  const visibleColumns = columns.filter(col => col.visible);
  const totalRows = data.length;
  const filteredRows = searchTerm 
    ? data.filter(row =>
        Object.values(row).some(value =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      ).length
    : totalRows;

  const handleExport = () => {
    exportToCSV(data, visibleColumns);
  };

  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 3, 
        mb: 3, 
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
      }}
    >
      {/* Header Section */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={2}>
          <Box>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <TableChart color="primary" />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Data Controls
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Chip 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <AnimatedCounter value={totalRows} variant="caption" />
                    <span>total rows</span>
                  </Box>
                } 
                size="small" 
                variant="outlined"
                color="primary"
              />
              {searchTerm && (
                <Fade in={true}>
                  <Chip 
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <AnimatedCounter value={filteredRows} variant="caption" />
                        <span>filtered</span>
                      </Box>
                    } 
                    size="small" 
                    color="secondary"
                    icon={<FilterList />}
                  />
                </Fade>
              )}
              <Chip 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <AnimatedCounter value={visibleColumns.length} variant="caption" />
                    <span>columns visible</span>
                  </Box>
                } 
                size="small" 
                variant="outlined"
              />
            </Stack>
          </Box>
          
          {/* Enhanced Theme Toggle */}
          <Tooltip title={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}>
            <IconButton 
              onClick={() => dispatch(toggleTheme())}
              sx={{
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                color: 'white',
                '&:hover': {
                  background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                  transform: 'rotate(180deg)',
                },
                transition: 'all 0.3s ease-in-out',
              }}
            >
              {currentTheme === 'light' ? <Brightness4 /> : <Brightness7 />}
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>

      {/* Controls Section */}
      <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" gap={2}>
        <TextField
          placeholder="Search across all fields..."
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          InputProps={{
            startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
          sx={{ 
            minWidth: 320,
            '& .MuiOutlinedInput-root': {
              backgroundColor: alpha(theme.palette.background.paper, 0.8),
            }
          }}
          variant="outlined"
          size="medium"
        />
        
        <Button
          variant="contained"
          startIcon={<ViewColumn />}
          onClick={() => setShowColumnsModal(true)}
          sx={{
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            minWidth: 160,
          }}
        >
          Manage Columns
        </Button>
        
        <Button
          variant="outlined"
          startIcon={<Upload />}
          onClick={() => setShowImportModal(true)}
          sx={{ minWidth: 140 }}
        >
          Import CSV
        </Button>
        
        <Button
          variant="outlined"
          startIcon={<Download />}
          onClick={handleExport}
          sx={{ minWidth: 140 }}
        >
          Export CSV
        </Button>
      </Stack>

      <ManageColumnsModal
        open={showColumnsModal}
        onClose={() => setShowColumnsModal(false)}
      />
      
      <ImportModal
        open={showImportModal}
        onClose={() => setShowImportModal(false)}
      />
    </Paper>
  );
}