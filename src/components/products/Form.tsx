import { useEffect, useState } from "react";
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { useRootState } from "../../providers";
import { Category, Product } from "../../types";

interface Props {
  product?: Product,
  defaultCategory?: string;
  categories?: Category[]
}
function ProductForm({ product, defaultCategory, categories = [] }: Props) {
  const navigate = useNavigate();
  const { 
    category: categoryState = { items: [] },
    actions
  } = useRootState();

  console.log('categories', categories);
  console.log('categoryState', categoryState.items);

  const [name, setName] = useState<string | undefined>('');
  const [price, setPrice] = useState<number | undefined>(0);
  const [category, setCategory] = useState<string | undefined>('');

  useEffect(() => {
    if (product?.id) {
      setName(product.name);
      setPrice(product.price);
      setCategory(product.category);
    }
    return () => {
      setName('');
      setPrice(0);
      setCategory('');
    }
  }, [product]);

  async function handleSave() {
    let itemToSave;

    if (product?.id) {
      itemToSave = {
        ...product,
        name: name!,
        price: price!,
        category: category || defaultCategory,
      };
    } else {
      itemToSave = {
        name: name!,
        price: price!,
        category: category || defaultCategory,
      };
    }

    await actions?.product.save(itemToSave);

    toast.success(product?.id ? 'product updated!' : 'product created!');

    navigate(`/categories/${category || defaultCategory}/products`);
  }

  return (
    <Grid direction="column" container spacing={3} width={450}>
      <Grid item>
        <TextField 
          value={name} 
          onChange={e => setName(e.target.value)}
          label="Name"
          variant="outlined"
          fullWidth />
      </Grid>
      <Grid item>
        <TextField
          value={price} 
          onChange={e => setPrice(parseFloat(e.target.value))}
          label="Price"
          type="number"
          variant="outlined"
          fullWidth />
      </Grid>
      <Grid item>
        <FormControl fullWidth>
          <InputLabel id="category-select">Category</InputLabel>
          <Select
            labelId="category-select"
            value={category || defaultCategory || ''}
            label="Category"
            onChange={e => setCategory(e.target.value)}
          >
            {
              categories.map(current => (
                <MenuItem key={current.id} value={current.id}>{current.name}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <Button onClick={handleSave} variant="contained">Save</Button>
      </Grid>
    </Grid>
  )
}

export default ProductForm;
