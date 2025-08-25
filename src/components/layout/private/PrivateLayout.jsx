import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Header from './Header';
import useAuth from '../../../hooks/useAuth';
import { CircularProgress, Toolbar } from '@mui/material';

export const PrivateLayout = () => {
  const { auth, loading } = useAuth();
  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw'
        }}
      >
        <CircularProgress size={60} color='primary' />
      </div>
    );
  } else {
    return (
      <>
        <Header />
        <section className='layout__content'>
          {auth.id ? <Outlet /> : <Navigate to='/login' />}
        </section>
      </>
    );
  }
};
