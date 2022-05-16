import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import Categories from './pages/categories/List';
import Products from './pages/products/List';
import CategoryRegister from './pages/categories/Register';
import ProductRegister from './pages/products/Register';
import { Toaster } from 'react-hot-toast';
import { RootProvider } from './providers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App>
        <RootProvider>
            <Routes>
              <Route path="/" element={<Categories />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/categories/:category/products/register" element={<ProductRegister />} />
              <Route path="/categories/:category/products/:id/edit" element={<ProductRegister />} />
              <Route path="/categories/register" element={<CategoryRegister />} />
              <Route path="/categories/:id/edit" element={<CategoryRegister />} />
              <Route path="/categories/:category/products" element={<Products />} />
            </Routes>
        </RootProvider>
        <Toaster />
      </App>
    </BrowserRouter>
  </React.StrictMode>
);

