import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TableState, TableRow, Column } from '@/types';

const defaultColumns: Column[] = [
  { id: 'name', label: 'Name', visible: true, sortable: true, type: 'text' },
  { id: 'email', label: 'Email', visible: true, sortable: true, type: 'email' },
  { id: 'age', label: 'Age', visible: true, sortable: true, type: 'number' },
  { id: 'role', label: 'Role', visible: true, sortable: true, type: 'text' },
];

const sampleData: TableRow[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', age: 30, role: 'Developer' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', age: 28, role: 'Designer' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', age: 35, role: 'Manager' },
  { id: '4', name: 'Alice Brown', email: 'alice@example.com', age: 32, role: 'Developer' },
  { id: '5', name: 'Charlie Wilson', email: 'charlie@example.com', age: 29, role: 'Analyst' },
];

const initialState: TableState = {
  data: sampleData,
  columns: defaultColumns,
  searchTerm: '',
  sortBy: null,
  sortOrder: 'asc',
  currentPage: 0,
  rowsPerPage: 10,
  editingRows: [],
  theme: 'light',
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<TableRow[]>) => {
      state.data = action.payload;
    },
    addRow: (state, action: PayloadAction<TableRow>) => {
      state.data.push(action.payload);
    },
    updateRow: (state, action: PayloadAction<{ id: string; data: Partial<TableRow> }>) => {
      const index = state.data.findIndex(row => row.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = { ...state.data[index], ...action.payload.data };
      }
    },
    deleteRow: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter(row => row.id !== action.payload);
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.currentPage = 0;
    },
    setSorting: (state, action: PayloadAction<{ column: string; order: 'asc' | 'desc' }>) => {
      state.sortBy = action.payload.column;
      state.sortOrder = action.payload.order;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    addColumn: (state, action: PayloadAction<Column>) => {
      state.columns.push(action.payload);
    },
    updateColumnVisibility: (state, action: PayloadAction<{ id: string; visible: boolean }>) => {
      const column = state.columns.find(col => col.id === action.payload.id);
      if (column) {
        column.visible = action.payload.visible;
      }
    },
    reorderColumns: (state, action: PayloadAction<Column[]>) => {
      state.columns = action.payload;
    },
    toggleEditingRow: (state, action: PayloadAction<string>) => {
      const index = state.editingRows.indexOf(action.payload);
      if (index > -1) {
        state.editingRows.splice(index, 1);
      } else {
        state.editingRows.push(action.payload);
      }
    },
    clearEditingRows: (state) => {
      state.editingRows = [];
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

export const {
  setData,
  addRow,
  updateRow,
  deleteRow,
  setSearchTerm,
  setSorting,
  setCurrentPage,
  addColumn,
  updateColumnVisibility,
  reorderColumns,
  toggleEditingRow,
  clearEditingRows,
  toggleTheme,
} = tableSlice.actions;

export default tableSlice.reducer;