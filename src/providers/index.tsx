import { createContext, useContext, useReducer } from "react";
import CategoryActions from "../actions/Category";
import ProductActions from "../actions/Product";
import rootReducer from "../reducers";
import { InitialStateType } from "../types";

const initialState: InitialStateType = {
  category: {
    items: [],
    currentItem: undefined
  },
  product: {
    items: [],
    currentItem: undefined
  },
  actions: undefined,
};

export const RootContext = createContext<InitialStateType>(initialState);
export const useRootState = () => useContext(RootContext);

export const RootProvider = ({children}: { children?: React.ReactNode }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  
  const actions = {
    category: new CategoryActions(dispatch),
    product: new ProductActions(dispatch),
  };

  return (
    <RootContext.Provider value={{ ...state, actions }}>
      {children}
    </RootContext.Provider>
  )
};
