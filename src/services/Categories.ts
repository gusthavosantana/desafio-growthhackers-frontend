import { Category } from "../types";
import HttpService from "./HttpService";

export default class CategoriesService extends HttpService<string, Category> {
  constructor() {
    super(`${process.env.REACT_APP_API_BASE_URL}/api/categories`);
  }

  async listProducts(category: string) {
    try {
      return fetch(`${this.basePath}/${category}/products`)
        .then(response => response.json());
    } catch (error) {
      console.error(error);
    }
  }
}
