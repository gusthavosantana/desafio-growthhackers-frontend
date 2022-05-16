import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CategoryListPage from '../../pages/categories/List';

import { RootProvider } from '../../providers';
import { server } from '../../mocks/browser';
import { rest } from 'msw';

beforeAll(() => server.listen());
afterAll(() => server.close());

describe('Category List Page', () => {
  it('should render 2 elements on the screen', async () => {  
    render(
      <BrowserRouter>
        <RootProvider>
          <CategoryListPage />
        </RootProvider>
      </BrowserRouter>
    );
  
    expect(await screen.findByText(/Eletrônicos/i)).toBeInTheDocument();
    expect(await screen.findByText(/Alimentos/i)).toBeInTheDocument();
  });
  
  it('should be render 1 element', async () => {
    server.use(
      rest.get(`${process.env.REACT_APP_API_BASE_URL}/api/categories`, (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json([{ id: "1", name: "Alimentos" }]),
        )
      }),
    );

    render(
      <BrowserRouter>
        <RootProvider>
          <CategoryListPage />
        </RootProvider>
      </BrowserRouter>
    );

    expect(await screen.findByText(/Alimentos/i)).toBeInTheDocument();
  });
})
