'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Alert,
  Box,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Stack,
} from '@mui/material';
import { CloudUpload, Upload } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { setData } from '@/store/tableSlice';
import { parseCSV } from '@/utils/csvUtils';
import { ImportError } from '@/types';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function ImportModal({ open, onClose }: Props) {
  const dispatch = useDispatch();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ImportError[]>([]);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      setErrors([]);
      setSuccess(false);
    }
  };

  const handleImport = async () => {
    if (!file) return;

    setLoading(true);
    setErrors([]);

    try {
      const result = await parseCSV(file);
      
      if (result.errors.length > 0) {
        setErrors(result.errors);
      } else {
        dispatch(setData(result.data));
        setSuccess(true);
        setTimeout(() => {
          onClose();
          handleReset();
        }, 2000);
      }
    } catch (error) {
      setErrors([{
        row: 0,
        field: 'file',
        message: 'Failed to parse CSV file. Please check the format.',
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setErrors([]);
    setSuccess(false);
    setLoading(false);
  };

  const handleClose = () => {
    onClose();
    handleReset();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="md" 
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
        background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(33, 150, 243, 0.1) 100%)',
      }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Upload color="primary" />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Import CSV Data
          </Typography>
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="body1" color="text.secondary" gutterBottom sx={{ mb: 2 }}>
            Upload a CSV file with required columns: <strong>name</strong>, <strong>email</strong>, <strong>age</strong>, <strong>role</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Additional columns will be added automatically to your table.
          </Typography>
          
          <Box
            sx={{
              border: file ? '2px solid' : '2px dashed',
              borderColor: file ? 'success.main' : 'divider',
              borderRadius: 3,
              p: 4,
              textAlign: 'center',
              mt: 3,
              cursor: 'pointer',
              background: file 
                ? 'linear-gradient(135deg, rgba(76, 175, 80, 0.05) 0%, rgba(139, 195, 74, 0.05) 100%)'
                : 'linear-gradient(135deg, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0.01) 100%)',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                borderColor: file ? 'success.dark' : 'primary.main',
                backgroundColor: file 
                  ? 'rgba(76, 175, 80, 0.08)'
                  : 'action.hover',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
              },
            }}
            component="label"
          >
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <CloudUpload 
              sx={{ 
                fontSize: 64, 
                color: file ? 'success.main' : 'text.secondary', 
                mb: 2,
                transition: 'color 0.3s ease-in-out',
              }} 
            />
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              {file ? `✓ ${file.name}` : 'Choose CSV file'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {file ? 'File selected successfully' : 'Click to browse or drag and drop your CSV file here'}
            </Typography>
            {file && (
              <Typography variant="caption" color="success.main" sx={{ mt: 1, display: 'block' }}>
                Size: {(file.size / 1024).toFixed(1)} KB
              </Typography>
            )}
          </Box>
        </Box>

        {loading && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" gutterBottom>
              Processing CSV file...
            </Typography>
            <LinearProgress />
          </Box>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            CSV imported successfully! The dialog will close automatically.
          </Alert>
        )}

        {errors.length > 0 && (
          <Alert severity="error" sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Import errors found:
            </Typography>
            <List dense>
              {errors.slice(0, 10).map((error, index) => (
                <ListItem key={index} sx={{ py: 0 }}>
                  <ListItemText
                    primary={`Row ${error.row}, Field "${error.field}": ${error.message}`}
                  />
                </ListItem>
              ))}
              {errors.length > 10 && (
                <ListItem sx={{ py: 0 }}>
                  <ListItemText
                    primary={`... and ${errors.length - 10} more errors`}
                  />
                </ListItem>
              )}
            </List>
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleImport}
          disabled={!file || loading || success}
        >
          Import
        </Button>
      </DialogActions>
    </Dialog>
  );
}