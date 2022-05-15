import CategoryActions from "../actions/Category";
import ProductActions from "../actions/Product";

export type Product = {
  id?: string;
  name: string;
  price: number;
  category?: string;
};

export type Category = {
  id?: string;
  name: string;
};

export type ProductState = {
  items: Product[],
  currentItem?: Product,
  categoryName?: string,
  categories?: Category[],
}

export type CategoryState = {
  items: Category[],
  currentItem?: Category,
}

export type DispatchAction = {
  type: string,
  payload?: any,
};

export type Actions = {
  category: CategoryActions,
  product: ProductActions,
};

export type InitialStateType = {
  category: CategoryState,
  product: ProductState,
  actions?: Actions
};
