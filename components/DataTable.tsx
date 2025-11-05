'use client';

import React, { useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  IconButton,
  Tooltip,
  TableSortLabel,
  TextField,
  Button,
  Stack,
  Box,
  Fade,
  Typography,
  useTheme,
  alpha,
} from '@mui/material';
import { Edit, Delete, Save, Cancel } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import {
  setSorting,
  setCurrentPage,
  updateRow,
  deleteRow,
  toggleEditingRow,
  clearEditingRows,
} from '@/store/tableSlice';
import { TableRow as TableRowType } from '@/types';
import { ConfirmDialog } from './ConfirmDialog';
import { useState } from 'react';

export function DataTable() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const {
    data,
    columns,
    searchTerm,
    sortBy,
    sortOrder,
    currentPage,
    rowsPerPage,
    editingRows,
  } = useSelector((state: RootState) => state.table);

  const [deleteRowId, setDeleteRowId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, any>>({});

  const visibleColumns = columns.filter(col => col.visible);

  const filteredAndSortedData = useMemo(() => {
    let filtered = data;

    // Apply search filter
    if (searchTerm) {
      filtered = data.filter(row =>
        Object.values(row).some(value =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply sorting
    if (sortBy) {
      filtered = [...filtered].sort((a, b) => {
        const aVal = a[sortBy];
        const bVal = b[sortBy];
        
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
        }
        
        const aStr = String(aVal).toLowerCase();
        const bStr = String(bVal).toLowerCase();
        
        if (sortOrder === 'asc') {
          return aStr.localeCompare(bStr);
        } else {
          return bStr.localeCompare(aStr);
        }
      });
    }

    return filtered;
  }, [data, searchTerm, sortBy, sortOrder]);

  const paginatedData = useMemo(() => {
    const startIndex = currentPage * rowsPerPage;
    return filteredAndSortedData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredAndSortedData, currentPage, rowsPerPage]);

  const handleSort = (columnId: string) => {
    const isCurrentColumn = sortBy === columnId;
    const newOrder = isCurrentColumn && sortOrder === 'asc' ? 'desc' : 'asc';
    dispatch(setSorting({ column: columnId, order: newOrder }));
  };

  const handleEditToggle = (rowId: string) => {
    const row = data.find(r => r.id === rowId);
    if (row && !editingRows.includes(rowId)) {
      setEditValues(prev => ({ ...prev, [rowId]: { ...row } }));
    }
    dispatch(toggleEditingRow(rowId));
  };

  const handleSaveRow = (rowId: string) => {
    const values = editValues[rowId];
    if (values) {
      dispatch(updateRow({ id: rowId, data: values }));
      dispatch(toggleEditingRow(rowId));
      setEditValues(prev => {
        const newValues = { ...prev };
        delete newValues[rowId];
        return newValues;
      });
    }
  };

  const handleCancelEdit = (rowId: string) => {
    dispatch(toggleEditingRow(rowId));
    setEditValues(prev => {
      const newValues = { ...prev };
      delete newValues[rowId];
      return newValues;
    });
  };

  const handleSaveAll = () => {
    Object.entries(editValues).forEach(([rowId, values]) => {
      dispatch(updateRow({ id: rowId, data: values }));
    });
    dispatch(clearEditingRows());
    setEditValues({});
  };

  const handleCancelAll = () => {
    dispatch(clearEditingRows());
    setEditValues({});
  };

  const handleFieldChange = (rowId: string, field: string, value: any) => {
    setEditValues(prev => ({
      ...prev,
      [rowId]: {
        ...prev[rowId],
        [field]: value,
      },
    }));
  };

  const handleDeleteConfirm = () => {
    if (deleteRowId) {
      dispatch(deleteRow(deleteRowId));
      setDeleteRowId(null);
    }
  };

  return (
    <Paper 
      elevation={0}
      sx={{ 
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      {editingRows.length > 0 && (
        <Fade in={true}>
          <Box sx={{ 
            p: 2, 
            borderBottom: 1, 
            borderColor: 'divider',
            background: `linear-gradient(90deg, ${alpha(theme.palette.warning.main, 0.1)} 0%, ${alpha(theme.palette.info.main, 0.1)} 100%)`,
          }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="body2" color="text.secondary">
                {editingRows.length} row{editingRows.length > 1 ? 's' : ''} being edited
              </Typography>
              <Button 
                variant="contained" 
                onClick={handleSaveAll} 
                startIcon={<Save />}
                size="small"
                sx={{
                  background: `linear-gradient(45deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`,
                }}
              >
                Save All
              </Button>
              <Button 
                variant="outlined" 
                onClick={handleCancelAll} 
                startIcon={<Cancel />}
                size="small"
              >
                Cancel All
              </Button>
            </Stack>
          </Box>
        </Fade>
      )}
      
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {visibleColumns.map((column) => (
                <TableCell key={column.id}>
                  {column.sortable ? (
                    <TableSortLabel
                      active={sortBy === column.id}
                      direction={sortBy === column.id ? sortOrder : 'asc'}
                      onClick={() => handleSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => {
              const isEditing = editingRows.includes(row.id);
              const currentValues = editValues[row.id] || row;
              
              return (
                <TableRow 
                  key={row.id}
                  sx={{
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.04),
                      transform: 'scale(1.001)',
                      transition: 'all 0.2s ease-in-out',
                    },
                    ...(isEditing && {
                      backgroundColor: alpha(theme.palette.warning.main, 0.08),
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.warning.main, 0.12),
                      },
                    }),
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  {visibleColumns.map((column) => (
                    <TableCell 
                      key={column.id}
                      sx={{
                        cursor: isEditing ? 'default' : 'pointer',
                        position: 'relative',
                        '&:hover': !isEditing ? {
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: '2px',
                            backgroundColor: theme.palette.primary.main,
                            opacity: 0.6,
                          }
                        } : {},
                      }}
                      onDoubleClick={() => !isEditing && handleEditToggle(row.id)}
                    >
                      {isEditing ? (
                        <Fade in={true}>
                          <TextField
                            size="small"
                            type={column.type === 'number' ? 'number' : 'text'}
                            value={currentValues[column.id] || ''}
                            onChange={(e) => {
                              const value = column.type === 'number' 
                                ? Number(e.target.value) 
                                : e.target.value;
                              handleFieldChange(row.id, column.id, value);
                            }}
                            fullWidth
                            variant="outlined"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                backgroundColor: alpha(theme.palette.background.paper, 0.9),
                              }
                            }}
                          />
                        </Fade>
                      ) : (
                        <Typography variant="body2" sx={{ fontWeight: column.id === 'name' ? 600 : 400 }}>
                          {String(row[column.id] || '')}
                        </Typography>
                      )}
                    </TableCell>
                  ))}
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      {isEditing ? (
                        <Fade in={true}>
                          <Stack direction="row" spacing={1}>
                            <Tooltip title="Save changes">
                              <IconButton
                                size="small"
                                onClick={() => handleSaveRow(row.id)}
                                sx={{
                                  color: theme.palette.success.main,
                                  '&:hover': {
                                    backgroundColor: alpha(theme.palette.success.main, 0.1),
                                  }
                                }}
                              >
                                <Save />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Cancel editing">
                              <IconButton
                                size="small"
                                onClick={() => handleCancelEdit(row.id)}
                                sx={{
                                  '&:hover': {
                                    backgroundColor: alpha(theme.palette.grey[500], 0.1),
                                  }
                                }}
                              >
                                <Cancel />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </Fade>
                      ) : (
                        <Tooltip title="Double-click cell to edit, or click here">
                          <IconButton
                            size="small"
                            onClick={() => handleEditToggle(row.id)}
                            sx={{
                              color: theme.palette.primary.main,
                              '&:hover': {
                                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                              }
                            }}
                          >
                            <Edit />
                          </IconButton>
                        </Tooltip>
                      )}
                      <Tooltip title="Delete row">
                        <IconButton
                          size="small"
                          onClick={() => setDeleteRowId(row.id)}
                          sx={{
                            color: theme.palette.error.main,
                            '&:hover': {
                              backgroundColor: alpha(theme.palette.error.main, 0.1),
                            }
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      
      <TablePagination
        component="div"
        count={filteredAndSortedData.length}
        page={currentPage}
        onPageChange={(_, newPage) => dispatch(setCurrentPage(newPage))}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={() => {}} 
        rowsPerPageOptions={[10]}
        sx={{
          borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          backgroundColor: alpha(theme.palette.background.paper, 0.8),
          '& .MuiTablePagination-toolbar': {
            paddingLeft: 3,
            paddingRight: 3,
          },
          '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
            fontWeight: 500,
          },
          '& .MuiIconButton-root': {
            borderRadius: 2,
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
            },
          },
        }}
      />

      <ConfirmDialog
        open={!!deleteRowId}
        title="Delete Row"
        message="Are you sure you want to delete this row? This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteRowId(null)}
      />
    </Paper>
  );
}