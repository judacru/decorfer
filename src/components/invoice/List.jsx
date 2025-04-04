import React, { useEffect, useState } from 'react';
import { Box, Button, Grid2, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { AddOutlined, Print } from '@mui/icons-material';
import { getInvoices, reprint } from '../../services/invoiceService';

document.title = 'Decorfer | Listado de facturas';

export const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleReprint = async (id) => {
    try {
      reprint(id);
    } catch (error) {
      console.error('Error al reimprimir:', error);
    }
  };

  const fetchInvoices = async () => {
    try {
      const data = await getInvoices();
      setInvoices(data);
    } catch (error) {
      console.error('Error loading invoices');
    }
  };

  const formatToUSD = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  const columns = [
    {
      field: 'consecutive',
      headerName: 'Consecutivo',
      description: 'Click to edit the invoice',
      flex: 2,
      minWidth: 200,
      renderCell: (params) => (
        <a
          href={`/admin/invoice/edit/${params.row.id}`}
          style={{ textDecoration: 'none', color: 'blue' }}
        >
          {params.row.consecutive}
        </a>
      )
    },
    {
      field: 'customer',
      headerName: 'Cliente',
      description: 'Customer of the invoice',
      flex: 2,
      minWidth: 250
    },
    {
      field: 'total',
      headerName: 'Total',
      description: "Invoice's total",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => <span>{`${formatToUSD(params.row.total)}`}</span>
    },
    {
      field: 'totalpackages',
      headerName: 'Número de paquetes',
      description: 'Invoice total packages',
      flex: 1,
      minWidth: 250
    },
    {
      field: 'createdAt',
      headerName: 'Fecha de creación',
      description: 'Invoice creation date',
      flex: 1,
      minWidth: 250
    },
    {
      field: 'reprint',
      headerName: 'Reimprimir',
      description: 'Reimprimir factura',
      flex: 1,
      minWidth: 150,
      align: 'center',
      renderCell: (params) => (
        <Button
          startIcon={<Print />}
          variant='outlined'
          color='primary'
          size='small'
          onClick={() => handleReprint(params.row.id)}
        >
          Reimprimir
        </Button>
      )
    }
  ];

  const rows = invoices?.map((invoice) => ({
    id: invoice.id,
    consecutive: invoice.consecutive,
    customer: invoice.customer.name,
    total: invoice.total,
    totalpackages: invoice.totalpackages,
    createdAt: invoice.createdAt
  }));

  return (
    <>
      <section className='list__content'>
        <Box display='flex' justifyContent='start' sx={{ mt: 8 }}>
          <Typography variant='h3' component='h3' mb={1}>
            Mis Facturas
          </Typography>
        </Box>
        <Box display='flex' justifyContent='end' sx={{ mb: 3 }}>
          <Button
            aria-label='Create a new invoice'
            startIcon={<AddOutlined />}
            color='secondary'
            href='/admin/invoice/new'
            sx={{
              textTransform: 'uppercase',
              '&:hover': {
                border: '1px solid #3A64D8',
                color: '#3A64D8'
              }
            }}
          >
            Crear factura
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
