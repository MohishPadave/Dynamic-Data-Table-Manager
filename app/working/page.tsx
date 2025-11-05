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
} from '@mui/material';
import {
  Search,
  Edit,
  Delete,
  Brightness4,
  Brightness7,
  TableChart,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { SimpleRootState, setSearchTerm, setSorting, setCurrentPage, deleteRow, toggleTheme } from '@/store/simpleStore';

export default function WorkingPage() {
  const dispatch = useDispatch();
  const { data, searchTerm, sortBy, sortOrder, currentPage, theme } = useSelector((state: SimpleRootState) => state.table);
  const rowsPerPage = 10;

  const isDarkMode = theme === 'dark';

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
    <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            gap: 2, 
            mb: 3 
          }}>
            <TableChart sx={{ fontSize: 40, color: 'primary.main' }} />
            <Typography variant="h3" component="h1" sx={{ fontWeight: 700 }}>
              Working Data Table
            </Typography>
          </Box>
          
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            This version works without Redux Persist - all features functional
          </Typography>
        </Box>

        {/* Controls */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" flexWrap="wrap">
            <TextField
              placeholder="Search all fields..."
              value={searchTerm}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
              sx={{ minWidth: 300 }}
            />
            
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="body2" color="text.secondary">
                {filteredAndSortedData.length} rows
              </Typography>
              
              <Tooltip title="Toggle theme">
                <IconButton onClick={() => dispatch(toggleTheme())}>
                  {isDarkMode ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        </Paper>

        {/* Table */}
        <Paper>
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
                  <TableRow key={row.id} hover>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.age}</TableCell>
                    <TableCell>{row.role}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Tooltip title="Edit">
                          <IconButton size="small" color="primary">
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton 
                            size="small" 
                            color="error"
                            onClick={() => handleDelete(row.id)}
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
          />
        </Paper>
      </Container>
    );
}