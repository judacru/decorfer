import { Global } from '../helpers/Global';

export const getProducts = async (active = null) => {
  try {
    const param = active ? '?active=' + active : '';
    const token = localStorage.getItem('token');
    const response = await fetch(Global.url + 'products' + '?active=' + param, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    if (response.body) {
      const data = await response.json();
      return data.body;
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(Global.url + 'products/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener el producto');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en getProductById:', error);
    throw error;
  }
};

export const saveProduct = async (form) => {
  try {
    const token = localStorage.getItem('token');
    const request = await fetch(Global.url + 'products', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    if (!request.ok) {
      throw new Error('Error al crear el producto');
    }

    const data = await request.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const editProduct = async (form, id) => {
  try {
    const token = localStorage.getItem('token');
    const request = await fetch(Global.url + 'products/' + id, {
      method: 'PUT',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    if (!request.ok) {
      throw new Error('Error al editar el producto');
    }

    const data = await request.json();
    return data;
  } catch (error) {
    console.error('Error updating products:', error);
    throw error;
  }
};

export const getProductsByCustomer = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(Global.url + 'products/customer/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    if (response.body) {
      const data = await response.json();
      return data.body;
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const inactivateProduct = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(Global.url + 'products/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
