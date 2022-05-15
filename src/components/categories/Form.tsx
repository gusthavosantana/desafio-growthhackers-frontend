import { useEffect, useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useRootState } from '../../providers';
import { Category } from '../../types';

interface Props { category?: Category; };

function CategoryForm({ category }: Props) {
  const navigate = useNavigate();
  const [value, setValue] = useState<string>('');
  const { actions } = useRootState();


  useEffect(() => {
    if (category?.name) {
      setValue(category.name);
    }
  }, [category])

  async function handleSave() {
    await actions?.category.save({ ...category, name: value });
    const message = category?.id ? 'category updated!' : 'category created!';

    toast.success(message);

    navigate('/categories');
  }

  return (
    <Grid item container direction="column" spacing={3}>
      <Grid item>
        <TextField 
          value={value}
          defaultValue={category?.name}
          onChange={e => setValue(e.target.value)}
          sx={{ width: 400 }}
          placeholder="Nome da(s) categoria(s)"
        />
      </Grid>
      <Grid item>
        <Button onClick={handleSave} variant="contained">Save</Button>
      </Grid>
    </Grid>
  );
}
  
export default CategoryForm;