import { createServer, Model } from 'miragejs';
import { modelNames, routes } from '../../constants';

export function makeServer({ environment = 'test' } = {}) {
  let server = createServer({
    environment,

    models: {
      [modelNames.CATEGORY]: Model,
      [modelNames.PRODUCT]: Model,
    },

    seeds(server) {
      server.create(modelNames.CATEGORY, { id: '1', name: 'Clothes' });
      server.create(modelNames.CATEGORY, { id: '2', name: 'Food' });
      server.create(modelNames.CATEGORY, { id: '3', name: 'Construction' });
      server.create(modelNames.CATEGORY, { id: '4', name: 'Cleaning' });
      server.create(modelNames.CATEGORY, { id: '5', name: 'Electronics' });
      server.create(modelNames.CATEGORY, { id: '6', name: 'Furniture' });

      
      server.create(modelNames.PRODUCT, { id: '1', name: 'Shirt', price: 35, category: 'Clothes' });
      server.create(modelNames.PRODUCT, { id: '2', name: 'Rice', price: 42, category: 'Food' });
      server.create(modelNames.PRODUCT, { id: '3', name: 'Pizza', price: 45, category: 'Food' });
      server.create(modelNames.PRODUCT, { id: '4', name: 'Hammer', price: 16, category: 'Construction' });
      server.create(modelNames.PRODUCT, { id: '5', name: 'Soap', price: 10.50, category: 'Cleaning' });
      server.create(modelNames.PRODUCT, { id: '6', name: 'Detergent', price: 150, category: 'Cleaning' });
      server.create(modelNames.PRODUCT, { id: '7', name: 'Mouse', price: 44, category: 'Electronics' });
      server.create(modelNames.PRODUCT, { id: '8', name: 'Headphone', price: 36, category: 'Electronics' });
      server.create(modelNames.PRODUCT, { id: '9', name: 'Couch', price: 155.20, category: 'Furniture' });
    },

    routes() {
      this.namespace = 'api'
      this.urlPrefix = process.env.REACT_APP_API_BASE_URL;

      this.get(routes.CATEGORIES, (schema) => {
        const data = schema.categories.all();
        
        return data.models.map(c => c.attrs);
      });
      
      this.get(routes.PRODUCTS, (schema) => {
        const data = schema.products.all();
        
        return data.models.map(c => c.attrs);
      });
      
      this.get(`${routes.CATEGORIES}/:id`, (schema, req) => {
        const id = req.params.id;
        const data = schema.categories.find(id);
        
        return data.attrs;
      });

      this.post(routes.CATEGORIES, (schema, req) => {
        const categories = JSON.parse(req.requestBody);
        
        return categories.map((category) => {
          return schema.categories.create(category);
        });
      });

      this.patch(routes.CATEGORIES, (schema, req) => {
        const category = JSON.parse(req.requestBody);
        
        const data = schema.categories.find(category.id);

        return data?.update({ name: category.name });
      });

    },
  })

  return server;
}