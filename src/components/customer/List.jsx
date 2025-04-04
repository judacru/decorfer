import React, { useEffect, useState } from 'react';
import { Box, Button, Checkbox, Grid2, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { AddOutlined } from '@mui/icons-material';
import {
  getCustomers,
  inactivateCustomer
} from '../../services/customerService';

document.title = 'Decorfer | Listado de Clientes';

export const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error('Error loading customers');
    }
  };

  const formatToUSD = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  const handleToggleActive = async (id) => {
    try {
      await inactivateCustomer(id);

      setCustomers((customers) =>
        customers.map((customer) =>
          customer.id === id
            ? { ...customer, active: !customer.active }
            : customer
        )
      );
    } catch (error) {
      console.error('Error loading customers');
    }
  };

  const columns = [
    {
      field: 'name',
      headerName: 'Nombre',
      description: 'Click to edit the customer',
      flex: 2,
      minWidth: 140,
      renderCell: (params) => (
        <a
          href={`/admin/customer/edit/${params.row.id}`}
          style={{ textDecoration: 'none', color: 'blue' }}
        >
          {params.row.name}
        </a>
      )
    },
    {
      field: 'identification',
      headerName: 'Identificación',
      flex: 2,
      minWidth: 140
    },
    { field: 'email', headerName: 'Correo', flex: 2, minWidth: 200 },
    { field: 'phone', headerName: 'Teléfono', flex: 1, minWidth: 120 },
    { field: 'cellphone', headerName: 'Celular', flex: 1, minWidth: 120 },
    { field: 'address', headerName: 'Dirección', flex: 2, minWidth: 120 },
    {
      field: 'special',
      headerName: 'Especial',
      description: 'Field special of the product',
      flex: 1,
      minWidth: 100,
      align: 'left',
      renderCell: (params) => {
        const isActive = params.row.special;
        return (
          <div style={{ cursor: 'pointer' }}>
            <span>{isActive ? 'Si' : 'No'}</span>
          </div>
        );
      }
    },
    {
      field: 'active',
      headerName: 'Activo',
      description: 'Active status of the product',
      flex: 1,
      minWidth: 130,
      align: 'left',
      renderCell: (params) => {
        const isActive = params.row.active;
        return (
          <div
            onClick={() => handleToggleActive(params.row.id)}
            style={{ cursor: 'pointer', color: 'blue' }}
          >
            <Checkbox checked={isActive} color='primary' disabled />
            <span>{isActive ? 'Inactivar' : 'Activar'}</span>
          </div>
        );
      }
    }
  ];

  const rows = customers?.map((customer) => ({
    id: customer.id,
    name: customer.name,
    identification: customer.identification,
    email: customer.email,
    phone: customer.phone,
    cellphone: customer.cellphone,
    address: customer.address,
    active: customer.active,
    special: customer.special
  }));

  return (
    <>
      <section className='list__content'>
        <Box display='flex' justifyContent='start' sx={{ mt: 8 }}>
          <Typography variant='h3' component='h3' mb={1}>
            Mis Clientes
          </Typography>
        </Box>
        <Box display='flex' justifyContent='end' sx={{ mb: 3 }}>
          <Button
            aria-label='Create a new customer'
            startIcon={<AddOutlined />}
            color='secondary'
            href='/admin/customer/new'
            sx={{
              textTransform: 'uppercase',
              '&:hover': {
                border: '1px solid #3A64D8',
                color: '#3A64D8'
              }
            }}
          >
            Crear cliente
          </Button>
        </Box>
        <Grid2 container className='fadeIn'>
          <Grid2 sx={{ height: '530px', width: '100%' }}>
            <DataGrid rows={rows} columns={columns} pageSize={6} />
          </Grid2>
        </Grid2>
      </section>
    </>
  );
};
