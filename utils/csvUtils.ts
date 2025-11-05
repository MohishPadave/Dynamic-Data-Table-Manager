import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import { TableRow, Column, ImportError } from '@/types';

export interface ParseResult {
  data: TableRow[];
  errors: ImportError[];
}

export function parseCSV(file: File): Promise<ParseResult> {
  return new Promise((resolve) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const errors: ImportError[] = [];
        const data: TableRow[] = [];

        results.data.forEach((row: any, index: number) => {
          const rowData: TableRow = {
            id: `imported_${Date.now()}_${index}`,
            name: '',
            email: '',
            age: 0,
            role: '',
          };

          Object.entries(row).forEach(([key, value]) => {
            const fieldName = key.toLowerCase().trim();
            const stringValue = String(value || '').trim();

            switch (fieldName) {
              case 'name':
                if (!stringValue) {
                  errors.push({
                    row: index + 2, 
                    field: 'name',
                    message: 'Name is required',
                  });
                } else {
                  rowData.name = stringValue;
                }
                break;

              case 'email':
                if (!stringValue) {
                  errors.push({
                    row: index + 2,
                    field: 'email',
                    message: 'Email is required',
                  });
                } else if (!isValidEmail(stringValue)) {
                  errors.push({
                    row: index + 2,
                    field: 'email',
                    message: 'Invalid email format',
                  });
                } else {
                  rowData.email = stringValue;
                }
                break;

              case 'age':
                const age = parseInt(stringValue);
                if (isNaN(age) || age < 0 || age > 150) {
                  errors.push({
                    row: index + 2,
                    field: 'age',
                    message: 'Age must be a valid number between 0 and 150',
                  });
                } else {
                  rowData.age = age;
                }
                break;

              case 'role':
                if (!stringValue) {
                  errors.push({
                    row: index + 2,
                    field: 'role',
                    message: 'Role is required',
                  });
                } else {
                  rowData.role = stringValue;
                }
                break;

              default:
                if (stringValue) {
                  rowData[fieldName] = stringValue;
                }
                break;
            }
          });

          if (rowData.name && rowData.email && rowData.role) {
            data.push(rowData);
          }
        });

        resolve({ data, errors });
      },
      error: () => {
        resolve({
          data: [],
          errors: [{
            row: 0,
            field: 'file',
            message: 'Failed to parse CSV file',
          }],
        });
      },
    });
  });
}

export function exportToCSV(data: TableRow[], columns: Column[]) {
  const headers = columns.map(col => col.label);
  const csvData = data.map(row => 
    columns.map(col => row[col.id] || '')
  );

  const csv = Papa.unparse({
    fields: headers,
    data: csvData,
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `table-export-${new Date().toISOString().split('T')[0]}.csv`);
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}