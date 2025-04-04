import React from 'react';
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import { PublicLayout } from '../components/layout/public/PublicLayout';
import { Login } from '../components/user/Login';
import { AuthProvider } from '../context/AuthProvider';
import { ProductList } from '../components/product/List';
import { ProductForm } from '../components/product/Form';
import { CustomerList } from '../components/customer/List';
import { PrivateLayout } from '../components/layout/private/PrivateLayout';
import { CustomerForm } from '../components/customer/Form';
import { UiProvider } from '../context/ui/UiProvider';
import { InvoiceList } from '../components/invoice/List';
import { InvoiceForm } from '../components/invoice/Form';

export const Routing = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UiProvider>
          <Routes>
            <Route path='/' element={<PublicLayout />}>
              <Route index element={<Login />} />
              <Route path='login' index element={<Login />} />
            </Route>

            <Route path='/admin' element={<PrivateLayout />}>
              <Route index element={<ProductList />} />
              <Route path='product' index element={<ProductList />} />
              <Route path='product/new' index element={<ProductForm />} />
              <Route path='product/edit/:id' element={<ProductForm />} />
              <Route path='customer' index element={<CustomerList />} />
              <Route path='customer/new' index element={<CustomerForm />} />
              <Route
                path='customer/edit/:id'
                index
                element={<CustomerForm />}
              />
              <Route path='invoice' index element={<InvoiceList />} />
              <Route path='invoice/new' index element={<InvoiceForm />} />
              <Route path='invoice/edit/:id' index element={<InvoiceForm />} />
            </Route>

            <Route
              path='*'
              element={
                <>
                  <p>
                    <h1>Error 404</h1>
                    <Link to='/'>Volver al inicio</Link>
                  </p>
                </>
              }
            />
          </Routes>
        </UiProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};
