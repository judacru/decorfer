import React, { createContext, useEffect, useState } from 'react';
import { Global } from '../helpers/Global';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    authUser();
  }, []);

  const authUser = async () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!token || !user) {
      setLoading(false);
      return false;
    }

    const userObj = JSON.parse(user);
    const userId = userObj.id;

    try {
      const response = await fetch(Global.url + 'users/me', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Error en la autenticación');
      }
      const data = await response.json();

      if (data.body) {
        setAuth(data.body);
      } else {
        throw new Error('Datos inválidos');
      }
    } catch (error) {
      console.error('Error:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuth(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
