import { actionTypes } from "../actions/Product";
import { DispatchAction, ProductState } from "../types";

export const initialState: ProductState = {
  items: [],
  currentItem: undefined,
  categoryName: undefined,
  categories: []
};

export function productReducer(state = initialState, action: DispatchAction) {
  const reducers = {
    [actionTypes.FETCH_PRODUCTS]: () => {
      return {
        ...state,
        items: action.payload.products,
        categoryName: action.payload.name
      };
    },
    [actionTypes.FETCH_PRODUCT_BY_ID]: () => {
      return { ...state, currentItem: action.payload };
    },
    [actionTypes.SAVE_PRODUCT]: () => {
      const items = state.items.slice();
      const indexOfItem = items.findIndex(i => i.id === action.payload.id);
      const isExists = indexOfItem !== -1;

      if (isExists) {
        items[indexOfItem] = action.payload;
      } else {
        items.push(action.payload);
      }
      return {...state, items };
    },
    [actionTypes.REMOVE_PRODUCT]: () => {
      return {...state, items: state.items.filter(i => i.id !== action.payload)}
    },
    [actionTypes.FETCH_PRODUCT_CATEGORIES]: () => {
      return { ...state, categories: action.payload };
    }
  };

  return reducers[action.type] && reducers[action.type]();
}