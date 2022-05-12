import { createServer, Model, Server } from 'miragejs';
import { modelNames, routes } from '../../constants';
import { Category } from '../../types/domain/Category';
import { Product } from '../../types/domain/Product';

export function makeServer({ environment = 'test' } = {}): Server {
  let server = createServer({
    environment,

    models: {
      [modelNames.CATEGORY]: Model.extend<Partial<Category>>({}),
      [modelNames.PRODUCT]: Model.extend<Partial<Product>>({}),
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

      this.get(routes.CATEGORIES, (schema) => {
        return schema.all(modelNames.CATEGORY);
      });
      
      this.get(routes.PRODUCTS, (schema) => {
        return schema.all(modelNames.PRODUCT);
      });
    },
  })

  return server;
}