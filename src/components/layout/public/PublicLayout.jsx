import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { Header } from './Header';

export const PublicLayout = () => {
  const { auth } = useAuth();
  return (
    <>
      <Header />

      <section className='layout__content'>
        {!auth?.id ? <Outlet /> : <Navigate to='/admin' />}
      </section>
    </>
  );
};
