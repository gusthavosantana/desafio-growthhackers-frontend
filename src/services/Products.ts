import { Product } from "../types";
import HttpService from "./HttpService";

export default class ProductsService extends HttpService<string, Product> {
  constructor() {
    super(`${process.env.REACT_APP_API_BASE_URL}/api/products`);
  }

  import(id: string, data: FormData) {
    try {
      return fetch(`${this.basePath}/${id}/import`, {
        method: 'POST',
        body: data,
      });
    } catch (error) {
      console.error(error);
    }
  }
}
