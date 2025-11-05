'use client';

import { useMemo } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  IconButton,
  Stack,
  TableSortLabel,
  Tooltip,
  alpha,
  useTheme,
} from '@mui/material';
import {
  Search,
  Edit,
  Delete,
  Brightness4,
  Brightness7,
  TableChart,
  Speed,
  Security,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { SimpleRootState, setSearchTerm, setSorting, setCurrentPage, deleteRow, toggleTheme } from '@/store/simpleStore';

export default function Home() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { data, searchTerm, sortBy, sortOrder, currentPage, theme: currentTheme } = useSelector((state: SimpleRootState) => state.table);
  const rowsPerPage = 10;

  const isDarkMode = currentTheme === 'dark';

  // Filter and sort data
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
        const aVal = a[sortBy as keyof typeof a];
        const bVal = b[sortBy as keyof typeof b];
        
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
  }, [filteredAndSortedData, currentPage]);

  const handleSort = (columnId: string) => {
    const isCurrentColumn = sortBy === columnId;
    const newOrder = isCurrentColumn && sortOrder === 'asc' ? 'desc' : 'asc';
    dispatch(setSorting({ column: columnId, order: newOrder }));
  };

  const handleDelete = (id: string) => {
    dispatch(deleteRow(id));
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.02)} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
    }}>
      <Container maxWidth="xl" sx={{ py: 6 }}>
        {/* Header */}
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
            Powerful data management with sorting, filtering, and interactive features
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

        {/* Controls */}
        <Paper 
          elevation={0}
          sx={{ 
            p: 3, 
            mb: 3, 
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={2}>
              <Box>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                  <TableChart color="primary" />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Data Controls
                  </Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  {filteredAndSortedData.length} rows • Search, sort, and manage your data
                </Typography>
              </Box>
              
              <Tooltip title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}>
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
                  {isDarkMode ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
              </Tooltip>
            </Stack>
          </Box>

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
          </Stack>
        </Paper>

        {/* Table */}
        <Paper 
          elevation={0}
          sx={{ 
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {['name', 'email', 'age', 'role'].map((column) => (
                    <TableCell key={column}>
                      <TableSortLabel
                        active={sortBy === column}
                        direction={sortBy === column ? sortOrder : 'asc'}
                        onClick={() => handleSort(column)}
                      >
                        {column.charAt(0).toUpperCase() + column.slice(1)}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.map((row) => (
                  <TableRow 
                    key={row.id} 
                    sx={{
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.04),
                        transform: 'scale(1.001)',
                        transition: 'all 0.2s ease-in-out',
                      },
                      transition: 'all 0.2s ease-in-out',
                    }}
                  >
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {row.name}
                      </Typography>
                    </TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.age}</TableCell>
                    <TableCell>{row.role}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Tooltip title="Edit row">
                          <IconButton 
                            size="small" 
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
                        <Tooltip title="Delete row">
                          <IconButton 
                            size="small" 
                            onClick={() => handleDelete(row.id)}
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
                ))}
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
        </Paper>
      </Container>
    </Box>
  );
}