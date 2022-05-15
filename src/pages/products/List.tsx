import { Add } from '@mui/icons-material';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import BackButton from '../../components/commons/BackButton';
import ProductList from '../../components/products/List';
import { useRootState } from '../../providers';

export default function Products() {
  const { category } = useParams();
  const {
    product = { items: [], categoryName: '' },
    actions
  } = useRootState();

  useEffect(() => {
    if (category) {
      actions?.product.fetchItems(category);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <Stack spacing={5}>
      <Grid mb={3}>
        <BackButton to={`/categories`} />
      </Grid>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6">Products: {product.categoryName}</Typography>
        <Link to={`/categories/${category}/products/register`} style={{ textDecoration: 'none' }}>
          <Button startIcon={<Add />} variant="contained">Add Product</Button>
        </Link>
      </Stack>
      <ProductList 
        data={product.items}
        category={category}
      />
    </Stack>
  );
}
