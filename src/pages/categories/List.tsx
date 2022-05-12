import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Stack, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useEffect, useState } from 'react';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
];

export default function CategoryList() {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data.categories);
    }
    fetchData();
  }, []);

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h3">Categories</Typography>
        <Button startIcon={<Add />} variant="contained">Add Product</Button>
      </Stack>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={categories}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </Stack>
  );
}
