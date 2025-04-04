import { Global } from '../helpers/Global';

export const getCustomers = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(Global.url + 'customers', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    if (response.body) {
      const data = await response.json();
      return data.body;
    }
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

export const getCustomerById = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(Global.url + 'customers/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener el cliente');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en getCustomerById:', error);
    throw error;
  }
};

export const saveCustomer = async (form) => {
  try {
    const token = localStorage.getItem('token');
    const request = await fetch(Global.url + 'customers', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    if (!request.ok) {
      throw new Error('Error al crear el cliente');
    }

    const data = await request.json();
    return data;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
};

export const editCustomer = async (form, id) => {
  try {
    const token = localStorage.getItem('token');
    const request = await fetch(Global.url + 'customers/' + id, {
      method: 'PUT',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    if (!request.ok) {
      throw new Error('Error al editar el cliente');
    }

    const data = await request.json();
    return data;
  } catch (error) {
    console.error('Error updating customers:', error);
    throw error;
  }
};

export const inactivateCustomer = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(Global.url + 'customers/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error('Error inactivating customer:', error);
    throw error;
  }
};
