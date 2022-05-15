import { actionTypes } from "../actions/Category";
import { CategoryState, DispatchAction } from "../types";

export const initialState: CategoryState = {
  items: [],
  currentItem: undefined
};

export function categoryReducer(state = initialState, action: DispatchAction) {
  const reducers = {
    [actionTypes.FETCH_CATEGORIES]: () => {
      return { ...state, items: action.payload };
    },
    [actionTypes.FETCH_CATEGORY_BY_ID]: () => {
      return { ...state, currentItem: action.payload };
    },
    [actionTypes.SAVE_CATEGORY]: () => {
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
    [actionTypes.REMOVE_CATEGORY]: () => {
      return {...state, items: state.items.filter(i => i.id !== action.payload)}
    }
  };

  return reducers[action.type] && reducers[action.type]();
}