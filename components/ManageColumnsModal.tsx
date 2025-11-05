'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControlLabel,
  Checkbox,
  TextField,
  Stack,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material';
import { ViewColumn } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { updateColumnVisibility, addColumn } from '@/store/tableSlice';
import { Column } from '@/types';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function ManageColumnsModal({ open, onClose }: Props) {
  const dispatch = useDispatch();
  const { columns } = useSelector((state: RootState) => state.table);
  
  const [newColumnName, setNewColumnName] = useState('');
  const [newColumnType, setNewColumnType] = useState<'text' | 'number' | 'email'>('text');

  const handleVisibilityChange = (columnId: string, visible: boolean) => {
    dispatch(updateColumnVisibility({ id: columnId, visible }));
  };

  const handleAddColumn = () => {
    if (newColumnName.trim()) {
      const newColumn: Column = {
        id: newColumnName.toLowerCase().replace(/\s+/g, '_'),
        label: newColumnName,
        visible: true,
        sortable: true,
        type: newColumnType,
      };
      dispatch(addColumn(newColumn));
      setNewColumnName('');
      setNewColumnType('text');
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.95) 100%)',
          backdropFilter: 'blur(10px)',
        }
      }}
    >
      <DialogTitle sx={{ 
        pb: 1,
        background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(220, 0, 78, 0.1) 100%)',
      }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <ViewColumn color="primary" />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Manage Columns
          </Typography>
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        <Stack spacing={4}>
          <Box>
            <Typography variant="h6" gutterBottom sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              color: 'primary.main',
              fontWeight: 600,
            }}>
              Column Visibility
            </Typography>
            <Stack spacing={1.5}>
              {columns.map((column) => (
                <FormControlLabel
                  key={column.id}
                  control={
                    <Checkbox
                      checked={column.visible}
                      onChange={(e) => handleVisibilityChange(column.id, e.target.checked)}
                      sx={{
                        '&.Mui-checked': {
                          color: 'primary.main',
                        }
                      }}
                    />
                  }
                  label={
                    <Typography variant="body1" sx={{ fontWeight: column.visible ? 500 : 400 }}>
                      {column.label}
                    </Typography>
                  }
                  sx={{
                    m: 0,
                    p: 1,
                    borderRadius: 1,
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                    transition: 'background-color 0.2s ease-in-out',
                  }}
                />
              ))}
            </Stack>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box>
            <Typography variant="h6" gutterBottom sx={{ 
              color: 'secondary.main',
              fontWeight: 600,
              mb: 2,
            }}>
              Add New Column
            </Typography>
            <Stack spacing={3}>
              <TextField
                label="Column Name"
                value={newColumnName}
                onChange={(e) => setNewColumnName(e.target.value)}
                fullWidth
                placeholder="e.g., Department, Location"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />
              <FormControl fullWidth>
                <InputLabel>Column Type</InputLabel>
                <Select
                  value={newColumnType}
                  label="Column Type"
                  onChange={(e) => setNewColumnType(e.target.value as any)}
                  sx={{
                    borderRadius: 2,
                  }}
                >
                  <MenuItem value="text">📝 Text</MenuItem>
                  <MenuItem value="number">🔢 Number</MenuItem>
                  <MenuItem value="email">📧 Email</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="contained"
                onClick={handleAddColumn}
                disabled={!newColumnName.trim()}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
                  },
                  '&:disabled': {
                    background: 'rgba(0, 0, 0, 0.12)',
                  }
                }}
              >
                Add Column
              </Button>
            </Stack>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 2 }}>
        <Button 
          onClick={onClose}
          variant="outlined"
          sx={{ borderRadius: 2, minWidth: 100 }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}