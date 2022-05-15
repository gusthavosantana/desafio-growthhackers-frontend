import { useEffect } from 'react';
import {  Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/commons/BackButton';
import CategoryForm from '../../components/categories/Form';
import { useRootState } from '../../providers';

function CategoryRegister() {
  const params = useParams();
  const {
    category = { currentItem: { name: '' } },
    actions
  } = useRootState();

  useEffect(() => {
    if (params.id) {
      actions?.category.fetchById(params.id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  return (
    <Grid direction="column" container spacing={3}>
      <Grid item>
        <BackButton to={`/categories`} />
        <Typography variant="h6">{params.id ? 'Edit' : 'Add'} Category</Typography>
      </Grid>      
      <CategoryForm category={params.id ? category.currentItem : undefined} />
    </Grid>
  );
}
  
export default CategoryRegister;