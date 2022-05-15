export default class HttpService<ID, T> {

  basePath: string;

  constructor(basePath: string) {
    this.basePath = basePath;
  }

  async create(value: T) {
    try {
      if (!value) return;
      
      return fetch(this.basePath, {
        method: 'POST',
        body: JSON.stringify(value),
        headers: {
          'content-type': 'application/json'
        }
      })
      .then(this.handleErrors)
      .then(response => response.json());
    } catch (error) {
      console.error(error);
    }
  }

  async update(id: ID, value: T) {
    try {
      return fetch(`${this.basePath}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(value),
        headers: {
          'content-type': 'application/json'
        }
      })
      .then(this.handleErrors)
      .then(response => response.json());
    } catch (error) {
      console.error(error);
    }
  }
  
  async remove(id: ID) {
    return fetch(`${this.basePath}/${id}`, { method: 'DELETE' })
      .then(this.handleErrors);
  }
  
  async getById(id: ID) {
    try {
      return fetch(`${this.basePath}/${id}`)
        .then(this.handleErrors)
        .then(response => response.json());
    } catch (error) {
      console.error(error);
    }
  }
  
  async list() {
    try {
      return fetch(this.basePath)
        .then(this.handleErrors)
        .then(response => response.json());
    } catch (error) {
      console.error(error);
    }
  }

  handleErrors(response: Response) {
    if (!response.ok) throw new Error(response.status.toString());
    return response;
  }
}