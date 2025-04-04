import React, { useEffect, useState } from 'react';
import { Box, Button, Checkbox, Grid2, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { AddOutlined } from '@mui/icons-material';
import { getProducts, inactivateProduct } from '../../services/productService';

document.title = 'Decorfer | Listado de Productos';

export const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products');
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
      await inactivateProduct(id);

      setProducts((products) =>
        products.map((product) =>
          product.id === id ? { ...product, active: !product.active } : product
        )
      );
    } catch (error) {
      console.error('Error loading products');
    }
  };

  const columns = [
    /* {
      field: 'img',
      headerName: 'Imagen',
      description: 'Photo of the product, click to see details',
      renderCell: (params) => (
        <a href={`/product/${params.row.slug}`} target="_blank" rel="noreferrer">
          <CardMedia
            component='img'
            alt={params.row.title}
            className='fadeIn'
            image={params.row.img}
          />
        </a>
      )
    }, */
    {
      field: 'title',
      headerName: 'Nombre',
      description: 'Click to edit the product',
      flex: 2,
      minWidth: 200,
      renderCell: (params) => (
        <a
          href={`/admin/product/edit/${params.row.id}`}
          style={{ textDecoration: 'none', color: 'blue' }}
        >
          {params.row.title}
        </a>
      )
    },
    {
      field: 'description',
      headerName: 'Descripción',
      description: 'Description of the product',
      flex: 2,
      minWidth: 250
    },
    {
      field: 'price',
      headerName: 'Precio unidad',
      description: "Product's price",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => <span>{`${formatToUSD(params.row.price)}`}</span>
    },
    {
      field: 'applyminimum',
      headerName: 'Aplica mínima',
      description: 'Field to apply the minimum price',
      flex: 1,
      minWidth: 100,
      align: 'left',
      renderCell: (params) => {
        const isActive = params.row.applyminimum;
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

  const rows = products?.map((product) => ({
    id: product.id,
    title: product.name,
    price: product.price,
    active: product.active,
    description: product.description,
    applyminimum: product.applyminimum
  }));

  return (
    <>
      <section className='list__content'>
        <Box display='flex' justifyContent='start' sx={{ mt: 8 }}>
          <Typography variant='h3' component='h3' mb={1}>
            Mis Productos
          </Typography>
        </Box>
        <Box display='flex' justifyContent='end' sx={{ mb: 3 }}>
          <Button
            aria-label='Create a new product'
            startIcon={<AddOutlined />}
            color='secondary'
            href='/admin/product/new'
            sx={{
              textTransform: 'uppercase',
              '&:hover': {
                border: '1px solid #3A64D8',
                color: '#3A64D8'
              }
            }}
          >
            Crear producto
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
