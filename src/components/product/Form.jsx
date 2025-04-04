import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Grid2,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import { SaveOutlined } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import {
  saveProduct,
  getProductById,
  editProduct
} from '../../services/productService';
import { useNavigate, useParams } from 'react-router-dom';

export const ProductForm = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    if (isEditMode) {
      const loadProduct = async () => {
        setIsLoading(true);
        try {
          const data = await getProductById(id);
          reset(data.body);
        } catch (error) {
          console.error('Error al cargar el producto:', error);
        } finally {
          setIsLoading(false);
        }
      };

      loadProduct();
    }
  }, [id, isEditMode, reset]);

  const onSubmit = async (form) => {
    setIsSaving(true);

    try {
      const response = isEditMode
        ? await editProduct(form, id)
        : await saveProduct(form);

      setIsSaving(false);
      if (response.body || response.message) {
        navigate('/admin/product');
      }
    } catch (error) {
      console.error(error);
      setIsSaving(false);
    }
  };

  return (
    <Container maxWidth='md' sx={{ display: 'flex', justifyContent: 'center' }}>
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant='h2' component='h1' sx={{ mb: 2 }}>
          {isEditMode ? 'Editar Producto' : 'Nuevo Producto'}
        </Typography>

        {isLoading ? (
          <Typography>Cargando datos del producto...</Typography>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box display='flex' justifyContent='end' sx={{ mb: 2 }}>
              <Button
                color='secondary'
                startIcon={<SaveOutlined />}
                type='submit'
                disabled={isSaving}
              >
                GUARDAR
              </Button>
            </Box>

            <Grid2 container spacing={3} sx={{ justifyContent: 'center' }}>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <TextField
                  label='Nombre'
                  fullWidth
                  {...register('name', { required: true, minLength: 2 })}
                  sx={{ width: '350px' }}
                  error={!!errors.name}
                  helperText={
                    errors.name
                      ? 'El nombre es requerido (mínimo 2 caracteres)'
                      : ''
                  }
                />
              </Grid2>

              <Grid2 size={{ xs: 12, sm: 6 }}>
                <TextField
                  label='Precio'
                  type='number'
                  fullWidth
                  {...register('price', { required: true, min: 0 })}
                  sx={{ width: '350px' }}
                  error={!!errors.price}
                  helperText={
                    errors.price
                      ? 'El precio es requerido y debe ser mayor a 0'
                      : ''
                  }
                />
              </Grid2>

              <Grid2 size={{ xs: 12, sm: 6 }}>
                <TextField
                  label='Descripción'
                  fullWidth
                  multiline
                  {...register('description', {
                    required: false,
                    minLength: 3
                  })}
                  sx={{ width: '350px' }}
                  error={!!errors.description}
                  helperText={
                    errors.description
                      ? 'La descripción debe tener al menos 3 caracteres'
                      : ''
                  }
                />
              </Grid2>
            </Grid2>
          </form>
        )}
      </Paper>
    </Container>
  );
};
