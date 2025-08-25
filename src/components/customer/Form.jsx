import React, { useState, useEffect } from 'react';
import {
  Alert,
  Box,
  Button,
  Collapse,
  Container,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { SaveOutlined } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import {
  editCustomer,
  getCustomerById,
  saveCustomer
} from '../../services/customerService';
import { FormList } from './FormList';

export const CustomerForm = ({ customer }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [list, setList] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [showAlert, setShowAlert] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    reset,
    watch
  } = useForm({ defaultValues: customer });

  const navigate = useNavigate();

  useEffect(() => {
    if (isEditMode) {
      const loadCustomer = async () => {
        setIsLoading(true);
        try {
          const data = await getCustomerById(id);
          reset(data.body);
          console.log(data.body.products);
          setList(data.body.products);
        } catch (error) {
          console.error('Error al cargar el cliente:', error);
        } finally {
          setIsLoading(false);
        }
      };

      loadCustomer();
    }
  }, [id, isEditMode, reset]);

  const onSubmit = async (form) => {
  setIsSaving(true);
  setShowAlert(false); // Oculta alertas anteriores

  try {
    if (list.length < 1) {
      setAlertMessage('Debe agregar al menos un producto');
      setAlertSeverity('error');
      setShowAlert(true);
      setIsSaving(false);
      return;
    }

    form = {
      ...form,
      products: list
    };

    const response = isEditMode
      ? await editCustomer(form, id)
      : await saveCustomer(form);

    setIsSaving(false);

    if (response.body || response.message) {
      setAlertMessage('Cliente guardado exitosamente');
      setAlertSeverity('success');
      setShowAlert(true);

      setTimeout(() => navigate('/admin/customer'), 1500);
    }
  } catch (error) {
    console.error(error);
    setIsSaving(false);

    setAlertMessage(error.message || 'Error al guardar el cliente');
    setAlertSeverity('error');
    setShowAlert(true);
  }
};

  return (
    <Container maxWidth='md' sx={{ display: 'flex', justifyContent: 'center' }}>
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant='h2' component='h1' sx={{ mb: 2 }}>
          {isEditMode ? 'Editar Cliente' : 'Nuevo Cliente'}
        </Typography>
        <Collapse in={showAlert}>
          <Alert
            severity={alertSeverity}
            onClose={() => setShowAlert(false)}
            sx={{ mb: 2 }}
          >
            {alertMessage}
          </Alert>
        </Collapse>

        {isLoading ? (
          <Typography>Cargando datos del cliente...</Typography>
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

            <Grid2 container spacing={2} sx={{ justifyContent: 'center' }}>
              <Grid2
                container
                spacing={2}
                sx={{ justifyContent: 'center' }}
                size={{ xs: 12, sm: 6 }}
              >
                <TextField
                  label='Nombre'
                  fullWidth
                  {...register('name', { required: true, minLength: 2 })}
                  sx={{ width: '350px', mb: 2 }}
                />
                <TextField
                  label='Correo electrónico'
                  fullWidth
                  {...register('email', { required: true, minLength: 2 })}
                  sx={{ width: '350px', mb: 2 }}
                />
                <TextField
                  label='Celular'
                  fullWidth
                  {...register('cellphone', { required: true, minLength: 2 })}
                  sx={{ width: '350px', mb: 2 }}
                />
              </Grid2>

              <Grid2
                container
                spacing={2}
                sx={{ justifyContent: 'center' }}
                size={{ xs: 12, sm: 6 }}
              >
                <TextField
                  label='Identificación'
                  fullWidth
                  {...register('identification', {
                    required: true,
                    minLength: 2
                  })}
                  sx={{ width: '350px', mb: 2 }}
                />
                <TextField
                  label='Teléfono'
                  fullWidth
                  {...register('phone', { required: true, minLength: 2 })}
                  sx={{ width: '350px', mb: 2 }}
                />
                <TextField
                  label='Dirección'
                  fullWidth
                  {...register('address', { required: true, minLength: 2 })}
                  sx={{ width: '350px', mb: 2 }}
                />
              </Grid2>

              <Grid2
                container
                spacing={2}
                sx={{ justifyContent: 'center' }}
                size={{ xs: 12, sm: 6 }}
              >
                <FormControl sx={{ width: '350px' }}>
                  <InputLabel>Especial?</InputLabel>
                  <Select
                    value={watch('special') ?? 'false'}
                    onChange={(event) =>
                      setValue('special', event.target.value === 'true')
                    }
                    style={{ textAlign: 'left' }}
                  >
                    <MenuItem value='true'>Sí</MenuItem>
                    <MenuItem value='false'>No</MenuItem>
                  </Select>
                </FormControl>
              </Grid2>
            </Grid2>
          </form>
        )}
        <FormList list={list} setList={setList} />
      </Paper>
    </Container>
  );
};
