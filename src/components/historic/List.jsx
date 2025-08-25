import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, Grid2, InputLabel, Select, TextField, Typography, MenuItem, Container } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { AddOutlined, FilterList, Print, SaveOutlined } from '@mui/icons-material';
import { getInvoices, reprint, getHistoric } from '../../services/invoiceService';
import { useForm } from 'react-hook-form';
import { getCustomers } from '../../services/customerService';
import { Add as AddIcon } from '@mui/icons-material';
import { MonthSelect } from '../../helpers/MonthSelect';
import { YearSelect } from '../../helpers/YearSelect';

document.title = 'Decorfer | Historico de facturas';

export const HistoricList = () => {
  const [invoices, setInvoices] = useState([]);
  const [customer, setCustomer] = useState({});
  const [customers, setCustomers] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isSearching, setIsSearching] = useState(false);

  const { register, handleSubmit, setValue, reset, watch } = useForm();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleReprint = async (id) => {
    try {
      reprint(id);
    } catch (error) {
      console.error('Error al reimprimir:', error);
    }
  };

  const onCustomer = ({ target }) => {
    const customerSelected = customers.find((p) => p.id === target.value);
    setCustomer(customerSelected);
  };

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

  const onSubmit = async (form) => {
    try {
      setIsSearching(true);

      const filters = {
        customer: customer?.id || null,
        consecutive: form.consecutive || '',
        month: selectedMonth,
        year: selectedYear
      };

      const data = await getHistoric(filters);
      setInvoices(data);
      setIsSearching(false);

    } catch (error) {
      console.error('Error al buscar historial:', error);
    }
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
    <Container maxWidth="xl" sx={{ mt: 5 }}>
      <Box display="flex" justifyContent="start" sx={{ mt: 8, mb:2 }}>
        <Typography variant="h3" component="h3" mb={1}>
          Histórico de Facturas
        </Typography>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid2 container spacing={2} sx={{ mb: 2 }} justifyContent="center">
          <Grid2 xs={12} sm={6} sx={{ width: '300px' }}>
            <FormControl fullWidth>
              <InputLabel>Cliente</InputLabel>
              <Select
                value={customer?.id || ''}
                onChange={onCustomer}
                label="Cliente"
                displayEmpty
                renderValue={(selected) => {
                  const selectedCustomer = customers.find((c) => c.id === selected);
                  return selectedCustomer?.name;
                }}
              >
                <MenuItem value="">Limpiar selección</MenuItem>
                {customers.map((customerMap) => (
                  <MenuItem key={customerMap.id} value={customerMap.id}>
                    {customerMap.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid2>

          <Grid2 xs={12} sm={6}>
            <TextField
              label="Consecutivo"
              fullWidth
              {...register('consecutive')}
              sx={{ width: '228px' }}
            />
          </Grid2>

          <Grid2 xs={12} sm={6}>
            <MonthSelect value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} />
          </Grid2>

          <Grid2 xs={12} sm={6}>
            <YearSelect value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} />
          </Grid2>
        </Grid2>

        <Box display="flex" justifyContent="end" sx={{ mt: 2, mb: 2 }}>
          <Button
            color="secondary"
            startIcon={<FilterList />}
            type="submit"
            disabled={isSearching}
            size="large"
          >
            Filtrar
          </Button>
        </Box>
      </form>

      <Grid2 container className="fadeIn">
        <Grid2 sx={{ width: '100%', overflowX: 'auto' }}>
          <Box sx={{ minWidth: '1000px' }}>
            <DataGrid rows={rows} columns={columns} pageSize={6} autoHeight />
          </Box>
        </Grid2>
      </Grid2>
    </Container>
  );
};
