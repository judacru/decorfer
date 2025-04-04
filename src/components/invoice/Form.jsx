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
  Typography,
  Container,
  CircularProgress
} from '@mui/material';
import { SaveOutlined } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { getCustomers } from '../../services/customerService';
import { FormList } from './FormList';
import {
  editInvoice,
  getInvoiceById,
  newConsecutive,
  saveInvoice
} from '../../services/invoiceService';

export const InvoiceForm = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [customer, setCustomer] = useState({});
  const [customers, setCustomers] = useState([]);
  const [list, setList] = useState([]);
  const [consecutive, setConsecutive] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const { handleSubmit, reset } = useForm();

  useEffect(() => {
    fetchCustomers();
    if (!isEditMode) getConsecutive();

    if (isEditMode) {
      const loadInvoice = async () => {
        setIsLoading(true);
        try {
          const data = await getInvoiceById(id);
          setList(data.body.details);
          setConsecutive(data.body.consecutive);
          setCustomer(data.body.customer);
        } catch (error) {
          console.error('Error al cargar la factura:', error);
        } finally {
          setIsLoading(false);
        }
      };

      loadInvoice();
    }
  }, [id, isEditMode, reset]);

  const navigate = useNavigate();

  const getConsecutive = async () => {
    try {
      setIsLoading(true);
      const data = await newConsecutive();
      setConsecutive(data);
    } catch (error) {
      console.error('Error loading consecutive', error);
      setError('Failed to load consecutive number');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCustomers = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error('Error loading customers');
    }
  };

  const onCustomer = ({ target }) => {
    const customerSelected = customers.find((p) => p.id === target.value);
    setCustomer(customerSelected);
  };

  const onSubmit = async (form) => {
    if (list.length < 1 || !customer) return;
    setIsSaving(true);
    try {
      form = {
        ...form,
        consecutive: consecutive,
        customer: customer.id,
        details: list.map((row) => {
          const isNew = !row.id || row.id.toString().length > 10;

          return {
            ...row,
            product: row.product.id,
            id: isNew ? undefined : row.id
          };
        })
      };

      const response = isEditMode
        ? await editInvoice(form, id)
        : await saveInvoice(form);
      setIsSaving(false);
      if (response && response.success) {
        navigate('/admin/invoice');
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
          {isEditMode ? 'Editar Factura' : 'Nueva Factura'}
        </Typography>
        {isLoading ? (
          <Typography>Cargando datos de la factura...</Typography>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box display='flex' justifyContent='end'>
              <Button
                color='secondary'
                startIcon={<SaveOutlined />}
                type='submit'
                disabled={isSaving}
              >
                Guardar factura
              </Button>
            </Box>
            <Grid2
              container
              spacing={2}
              sx={{ justifyContent: 'center', mr: 6 }}
            >
              <Grid2 columns={{ xs: 12, md: 6 }}>
                <TextField
                  label='Consecutivo'
                  fullWidth
                  value={consecutive}
                  InputProps={{
                    readOnly: true,
                    endAdornment: isLoading && <CircularProgress size={20} />
                  }}
                  sx={{ width: '350px' }}
                  /* error={!!error}
       helperText={error} */
                />
              </Grid2>

              <Grid2 columns={{ xs: 12, sm: 6 }} sx={{ width: '300px' }}>
                <FormControl sx={{ width: '350px' }}>
                  <InputLabel>Cliente</InputLabel>
                  <Select
                    value={customer?.id || ''}
                    onChange={onCustomer}
                    label='Cliente'
                    style={{ textAlign: 'left' }}
                    disabled={list.length > 0}
                    sx={{
                      '&.Mui-disabled': {
                        pointerEvents: 'none'
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.23) !important'
                      },
                      '&.Mui-disabled .MuiSelect-select': {
                        backgroundColor: 'white !important',
                        color: 'black !important',
                        WebkitTextFillColor: 'black !important'
                      }
                    }}
                  >
                    {customers.map((customerMap) => (
                      <MenuItem key={customerMap.id} value={customerMap.id}>
                        {customerMap.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid2>
            </Grid2>
          </form>
        )}
        ;
        <FormList list={list} setList={setList} customer={customer} />
      </Paper>
    </Container>
  );
};
