import { DispatchAction, InitialStateType } from "../types";
import { categoryReducer } from "./Category";
import { productReducer } from "./Product";

const rootReducer = ({ category, product }: InitialStateType, action: DispatchAction) => ({
  category: categoryReducer(category, action),
  product: productReducer(product, action)
});

export default rootReducer;
