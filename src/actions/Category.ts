import { Dispatch } from "react";
import CategoriesService from "../services/Categories";
import { Category } from "../types";

const service = new CategoriesService();

export const actionTypes = {
  SAVE_CATEGORY: 'CATEGORY/SAVE',
  REMOVE_CATEGORY: 'CATEGORY/REMOVE',
  FETCH_CATEGORIES: 'CATEGORY/LIST',
  FETCH_CATEGORY_BY_ID: 'CATEGORY/GET_BY_ID',
};

interface DispatchAction {
  type: string;
  payload?: any
};


export default class CategoryActions {
  dispatch;
  
  constructor(dispatch: Dispatch<DispatchAction>) {
    this.dispatch = dispatch;
  }

  async fetchItems() {
    const data = await service.list();
    this.dispatch({
      type: actionTypes.FETCH_CATEGORIES,
      payload: data,
    });
  }

  async fetchById(id: string) {
    const data = await service.getById(id);
    this.dispatch({
      type: actionTypes.FETCH_CATEGORY_BY_ID,
      payload: data,
    });
  }

  async save(data: Category) {
    let category;    
    if (data.id) {
      category = await service.update(data.id, data);
    } else {
      category = await service.create({ name: data.name });
    }
    this.dispatch({
      type: actionTypes.SAVE_CATEGORY,
      payload: category,
    });
  }
  
  async remove(id: string) {
    await service.remove(id);
    this.dispatch({
      type: actionTypes.REMOVE_CATEGORY,
      payload: id,
    });
  }
}