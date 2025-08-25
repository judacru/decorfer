import { Global } from '../helpers/Global';

export const getInvoices = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(Global.url + 'invoices', {
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
    console.error('Error fetching invoices:', error);
    throw error;
  }
};

export const getHistoric = async (form) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(Global.url + 'invoices/historic', {
      method: 'POST',
      body: JSON.stringify(form),
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
    console.error('Error fetching invoices:', error);
    throw error;
  }
};

export const getInvoiceById = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(Global.url + 'invoices/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener la factura');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en getInvoiceById:', error);
    throw error;
  }
};

export const saveInvoice = async (form) => {
  try {
    const token = localStorage.getItem('token');
    const request = await fetch(Global.url + 'invoices', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    if (!request.ok) {
      throw new Error('Error al crear la factura');
    }

    const blob = await request.blob();
    const url = window.URL.createObjectURL(blob);
    window.open(url);
    return { success: true };
  } catch (error) {
    console.error('Error creating invoices:', error);
    throw error;
  }
};

export const editInvoice = async (form, id) => {
  try {
    const token = localStorage.getItem('token');
    const request = await fetch(Global.url + 'invoices/' + id, {
      method: 'PUT',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    if (!request.ok) {
      throw new Error('Error al crear la factura');
    }

    await request.json();
    return { success: true };
  } catch (error) {
    console.error('Error updating invoices:', error);
    throw error;
  }
};

export const newConsecutive = async () => {
  try {
    const token = localStorage.getItem('token');
    const request = await fetch(Global.url + 'invoices/consecutive', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    const data = await request.json();
    return data.message;
  } catch (error) {
    console.error('Error creating invoices:', error);
    throw error;
  }
};

export const inactivateInvoice = async (id) => {
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

export const reprint = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const request = await fetch(Global.url + 'invoices/reprint/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    const blob = await request.blob();
    const url = window.URL.createObjectURL(blob);
    window.open(url);
    return { success: true };
  } catch (error) {
    console.error('Error getting report:', error);
    throw error;
  }
};
