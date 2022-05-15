import { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import BackButton from "../../components/commons/BackButton";
import ProductForm from "../../components/products/Form";
import { useRootState } from "../../providers";

function ProductRegister() {
  const params = useParams();
  const {
    product = { currentItem: { name: '', price: 0 }, categories: [] },
    actions
  } = useRootState();

  useEffect(() => {
    actions?.product.fetchCategories();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() => {
    if (params.id) {
      actions?.product.fetchById(params.id);
      actions?.product.fetchCategories();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  return (
    <div>
      <Grid mb={3}>
        <BackButton to={`/categories/${params.category}/products`} />
        <Typography variant="h6">{params.id ? 'Edit' : 'Add'} Product</Typography>
      </Grid>
      <ProductForm
        product={params.id ? product.currentItem : undefined}
        defaultCategory={params.category}
        categories={product.categories} />
    </div>
  );
}

  
export default ProductRegister;