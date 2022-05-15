import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import { Button, Stack, Typography } from '@mui/material';
import CategoryList from '../../components/categories/List';
import { useRootState } from '../../providers';

export default function Categories() {
  const {
    category = { items: [] },
    actions
  } = useRootState();

  useEffect(() => {
    actions?.category.fetchItems();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h3">Categories</Typography>
        <Link to="/categories/register" style={{ textDecoration: 'none' }}>
          <Button startIcon={<Add />} variant="contained">Add Categories</Button>
        </Link>
      </Stack>
      <CategoryList data={category.items} />
    </Stack>
  );
}
