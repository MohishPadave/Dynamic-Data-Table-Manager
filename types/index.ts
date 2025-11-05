export interface TableRow {
  id: string;
  name: string;
  email: string;
  age: number;
  role: string;
  [key: string]: any; 
}

export interface Column {
  id: string;
  label: string;
  visible: boolean;
  sortable: boolean;
  type: 'text' | 'number' | 'email';
}

export interface TableState {
  data: TableRow[];
  columns: Column[];
  searchTerm: string;
  sortBy: string | null;
  sortOrder: 'asc' | 'desc';
  currentPage: number;
  rowsPerPage: number;
  editingRows: string[];
  theme: 'light' | 'dark';
}

export interface ImportError {
  row: number;
  field: string;
  message: string;
}