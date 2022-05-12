import { render, screen, waitFor } from '@testing-library/react';
import { makeServer } from '../services/miragejs';
import { Server } from 'miragejs';
import CategoryListPage from '../pages/categories/List';

let server: Server;

beforeEach(() => {
  server = makeServer();
})

afterEach(() => {
  server.shutdown();
})


test('should render 2 elements on the screen', async () => {
  server.create('category', { id: '1', name: 'Electronics' })
  server.create('category', { id: '2', name: 'Furniture' })

  render(<CategoryListPage />);

  await waitFor(() => screen.findByText("Electronics"));
  await waitFor(() => screen.findByText("Furniture"));
  
  const eletronicsCategory = screen.getByText("Electronics");
  const furnitureCategory = screen.getByText("Furniture");

  expect(eletronicsCategory).toBeInTheDocument();
  expect(furnitureCategory).toBeInTheDocument();
});

