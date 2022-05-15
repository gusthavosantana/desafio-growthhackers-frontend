import { Dispatch } from "react";
import CategoriesService from "../services/Categories";
import ProductsService from "../services/Products";
import { Product } from "../types";

const service = new ProductsService();
const categoriesService = new CategoriesService();

export const actionTypes = {
  SAVE_PRODUCT: 'PRODUCT/SAVE',
  REMOVE_PRODUCT: 'PRODUCT/REMOVE',
  FETCH_PRODUCTS: 'PRODUCT/LIST',
  FETCH_PRODUCT_BY_ID: 'PRODUCT/GET_BY_ID',
  FETCH_PRODUCT_CATEGORIES: 'PRODUCT/FETCH_CATEGORIES'
};

interface DispatchAction {
  type: string;
  payload?: any
};


export default class ProductActions {
  dispatch;
  
  constructor(dispatch: Dispatch<DispatchAction>) {
    this.dispatch = dispatch;
  }

  async fetchItems(category: string) {
    const data = await categoriesService.listProducts(category);
    this.dispatch({
      type: actionTypes.FETCH_PRODUCTS,
      payload: data,
    });
  }

  async fetchById(id: string) {
    const data = await service.getById(id);
    this.dispatch({
      type: actionTypes.FETCH_PRODUCT_BY_ID,
      payload: data,
    });
  }

  async fetchCategories() {
    const data = await categoriesService.list();
    this.dispatch({
      type: actionTypes.FETCH_PRODUCT_CATEGORIES,
      payload: data,
    });
  }

  async save(data: Product) {
    let category = { ...data };
    if (data.id) {
      await service.update(data.id, data);
    } else {
      category = await service.create({
        name: data.name,
        price: data.price,
        category: data.category,
      });
    }
    this.dispatch({
      type: actionTypes.SAVE_PRODUCT,
      payload: category,
    });
  }
  
  async remove(id: string) {
    await service.remove(id);
    this.dispatch({
      type: actionTypes.REMOVE_PRODUCT,
      payload: id,
    });
  }
}