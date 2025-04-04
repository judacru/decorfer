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
import { getProducts } from '../../services/productService';
import { DataGrid } from '@mui/x-data-grid';

export const FormList = ({ list, setList }) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState('');

  const { register, handleSubmit, setValue, reset } = useForm();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts(true);
      setProducts(data);
    } catch (error) {
      console.error('Error loading products');
    }
  };

  const clearForm = () => {
    reset({
      price: 0
    });
    setProduct(null);
  };

  const onProduct = ({ target }) => {
    const productSelected = products.find((p) => p.id === target.value);
    const newPrice = productSelected?.price || 0;
    setProduct(productSelected);
    setValue('price', newPrice);
  };

  const removeItem = (id) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
  };

  const onSubmit = async (form) => {
    if (!product || form.price <= 0) return;

    if (list.some((item) => item.id === product.id)) {
      return;
    }

    const item = {
      ...product,
      ...form
    };

    setList([item, ...list]);
    clearForm();
  };

  const columns = [
    {
      field: 'product',
      headerName: 'Producto',
      minWidth: 350,
      renderCell: (params) => {
        return <span>{`${params.row.name}`}</span>;
      }
    },
    {
      field: 'price',
      headerName: 'Precio',
      description: "Product's price",
      minWidth: 250,
      renderCell: (params) => {
        return (
          <span>
            {`$ ${Number(params.row.price).toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          </span>
        );
      }
    },
    {
      field: 'delete',
      headerName: 'Eliminar',
      description: 'Eliminar detalle',
      flex: 1,
      minWidth: 150,
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
        <Box sx={{ mt: 2, mb: 2 }}>
          <Typography variant='h6'>Listado de Productos</Typography>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid2 container spacing={2} sx={{ mb: 2 }} justifyContent='center'>
            <Grid2 columns={{ xs: 12, sm: 6 }}>
              <FormControl sx={{ width: '350px' }}>
                <InputLabel id='demo-simple-select-label'>Producto</InputLabel>
                <Select
                  value={product?.id || ''}
                  onChange={onProduct}
                  label='Producto'
                  style={{ textAlign: 'left' }}
                >
                  {products.map((product) => (
                    <MenuItem key={product.id} value={product.id}>
                      {product?.name || ''}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2>

            <Grid2 columns={{ xs: 12, sm: 3 }}>
              <TextField
                label='Precio'
                defaultValue={0}
                type='number'
                fullWidth
                sx={{ width: '228px' }}
                {...register('price', { required: true, min: 1 })}
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
