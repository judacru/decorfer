import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Paper,
  Typography
} from '@mui/material';
import { Add as AddIcon, Delete } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { getProductsByCustomer } from '../../services/productService';
import { DataGrid } from '@mui/x-data-grid';

export const FormList = ({ list, setList, customer }) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState('');

  const { register, handleSubmit, setValue, reset, watch } = useForm();

  useEffect(() => {
    setProduct([]);
    fetchProducts();
  }, [customer]);

  const fetchProducts = async () => {
    try {
      if (customer) {
        const id = customer.id;
        const data = await getProductsByCustomer(id);
        setProducts(data);
      }
    } catch (error) {
      console.error('Error loading products');
    }
  };

  const clearForm = () => {
    reset({
      reference: '',
      quantity: '',
      packages: '',
      colors: 1,
      minimum: true,
      return: ''
    });
    setProduct(null);
  };

  const onProduct = ({ target }) => {
    const productSelected = products.find((p) => p.id === target.value);
    setProduct(productSelected);
  };

  const removeItem = (id) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
  };

  const onSubmit = async (form) => {
    if (!product || form.quantity <= 0) return;

    let isMinimun = form.minimum ?? true;
    let price = product.price * form.colors;
    let total = price * form.quantity;
    if (form.quantity < 1000 && isMinimun) {
      const minimumValue = product?.price * 1000;
      total = minimumValue * form.colors;
      price = total / form.quantity;
    }

    const item = {
      id: Date.now(),
      product: product,
      price,
      total,
      minimum: isMinimun,
      ...form
    };

    setList([item, ...list]);
    clearForm();
  };

  const columns = [
    {
      field: 'product',
      headerName: 'Producto',
      minWidth: 200,
      renderCell: (params) => {
        return <span>{`${params.row.product.name}`}</span>;
      }
    },
    {
      field: 'reference',
      headerName: 'Referencia',
      description: 'Reference of product',
      minWidth: 200
    },
    {
      field: 'colors',
      headerName: 'N° de colores',
      description: 'Amount of colors',
      minWidth: 120
    },
    {
      field: 'price',
      headerName: 'Precio',
      description: "Product's price",
      minWidth: 130,
      renderCell: (params) => {
        return (
          <span>
            {`$ ${Number(params.row.price).toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          </span>
        );
      }
    },
    {
      field: 'quantity',
      headerName: 'Cantidad',
      description: 'Amount of products',
      minWidth: 100
    },
    {
      field: 'packages',
      headerName: 'N° de paquetes',
      description: 'Amount of packages',
      minWidth: 130
    },
    {
      field: 'return',
      headerName: 'Devolución',
      description: 'Return',
      minWidth: 100
    },
    {
      field: 'total',
      headerName: 'Total',
      description: "Order's total",
      minWidth: 150,
      renderCell: (params) => {
        return (
          <span>
            {`$ ${Number(params.row.total).toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          </span>
        );
      }
    },
    {
      field: 'delete',
      headerName: 'Eliminar',
      description: 'Eliminar detalle',
      flex: 1,
      minWidth: 110,
      align: 'center',
      renderCell: (params) => (
        <Button
          startIcon={<Delete />}
          variant='outlined'
          color='primary'
          size='small'
          onClick={() => removeItem(params.row.id)}
        >
          Eliminar
        </Button>
      )
    }
  ];

  return (
    <Paper elevation={1} sx={{ p: 2 }}>
      <>
        <Box sx={{ mt: 0 }}>
          <Typography variant='h6'>Detalles de Productos</Typography>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid2 container spacing={2} sx={{ mb: 2 }} justifyContent='center'>
            <Grid2 columns={{ xs: 12, sm: 6 }}>
              <FormControl sx={{ width: '228px' }}>
                <InputLabel id='demo-simple-select-label'>Producto</InputLabel>
                <Select
                  value={product?.id || ''}
                  onChange={onProduct}
                  label='Producto'
                  style={{ textAlign: 'left' }}
                >
                  {(products || []).map((product) => (
                    <MenuItem key={product.id} value={product.id}>
                      {product?.name || ''}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2>

            <Grid2 columns={{ xs: 12, md: 6 }}>
              <TextField
                label='Referencia'
                fullWidth
                {...register('reference', { required: false })}
                sx={{ width: '228px' }}
              />
            </Grid2>

            <Grid2
              container
              spacing={2}
              sx={{ justifyContent: 'center' }}
              columns={{ xs: 12, sm: 6 }}
            >
              <FormControl sx={{ width: '228px' }}>
                <InputLabel>Aplica mínima?</InputLabel>
                <Select
                  value={watch('minimum') ?? 'true'}
                  onChange={(event) =>
                    setValue('minimum', event.target.value === 'true')
                  }
                  style={{ textAlign: 'left' }}
                >
                  <MenuItem value='true'>Sí</MenuItem>
                  <MenuItem value='false'>No</MenuItem>
                </Select>
              </FormControl>
            </Grid2>
          </Grid2>

          <Grid2 container spacing={2} sx={{ mb: 2 }} justifyContent='center'>
            <Grid2 columns={{ xs: 12, sm: 3 }}>
              <TextField
                label='Cantidad'
                type='number'
                fullWidth
                sx={{ width: '168px' }}
                {...register('quantity', { required: true, min: 1 })}
              />
            </Grid2>

            <Grid2 columns={{ xs: 12, sm: 3 }}>
              <TextField
                label='N° de paquetes'
                type='number'
                fullWidth
                sx={{ width: '168px' }}
                {...register('packages', { required: true, min: 0 })}
              />
            </Grid2>
            <Grid2 columns={{ xs: 12, sm: 3 }}>
              <TextField
                label='N° de colores'
                type='number'
                fullWidth
                defaultValue={1}
                sx={{ width: '168px' }}
                {...register('colors', { required: true, min: 1 })}
              />
            </Grid2>
            <Grid2 columns={{ xs: 12, sm: 3 }}>
              <TextField
                label='Devolución'
                type='number'
                fullWidth
                sx={{ width: '168px' }}
                {...register('return', { min: 1 })}
              />
            </Grid2>
          </Grid2>
          <Box display='flex' justifyContent='end' sx={{ mt: 2 }}>
            <Button
              startIcon={<AddIcon />}
              variant='outlined'
              color='primary'
              type='submit'
            >
              Agregar Producto
            </Button>
          </Box>
        </form>
      </>
      <Grid2 container className='fadeIn' paddingTop='10px'>
        <Grid2 columns={{ xs: 12 }} sx={{ height: '300px', width: '100%' }}>
          <DataGrid rows={list} columns={columns} pageSize={6} />
        </Grid2>
      </Grid2>
    </Paper>
  );
};
