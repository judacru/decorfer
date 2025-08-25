import React, { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { Global } from '../../helpers/Global';
import useAuth from '../../hooks/useAuth';
import {
  Box,
  Typography,
  Chip,
  TextField,
  Button,
  Stack,
  IconButton,
  InputAdornment,
  Collapse,
  Alert
} from '@mui/material';
import { ErrorOutline, Visibility, VisibilityOff } from '@mui/icons-material';
import AuthLayout from '../layout/public/AuthLayout';

export const Login = () => {
  const { form, changed } = useForm({});
  const [saved, setSaved] = useState('not_sended');
  const [showPassword, setShowPassword] = useState(false);
  const { setAuth } = useAuth();
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowAlert(false);

    const { user, password } = form;

    if (!user || !password) {
      setAlertMessage('Todos los campos son obligatorios');
      setAlertSeverity('error');
      setShowAlert(true);
      return;
    }

    try {
      const request = await fetch(Global.url + 'auth/login', {
        method: 'POST',
        body: JSON.stringify({ user, password }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });

      const data = await request.json();

      if (data.body) {
        localStorage.setItem('token', data.body.token);
        localStorage.setItem('user', JSON.stringify(data.body.user));

        setSaved('login');
        setAlertMessage('Inicio de sesión exitoso');
        setAlertSeverity('success');
        setShowAlert(true);

        setAuth(data.user);

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        setSaved('error');
        setAlertMessage(data.message || 'Credenciales incorrectas');
        setAlertSeverity('error');
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Login error:', error);
      setAlertMessage('Ocurrió un error en el servidor');
      setAlertSeverity('error');
      setShowAlert(true);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <AuthLayout title='Decorfer | Login'>
      <form onSubmit={handleSubmit} noValidate>
        <Box sx={{ width: 500, padding: '10px 20px' }}>
          <Stack spacing={3}>
            <Box>
              <Typography variant='h1' component='h1' my={3}>
                Iniciar sesión
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
            </Box>

            <Box>
              <TextField
                type='user'
                label='Usuario'
                variant='outlined'
                fullWidth
                name='user'
                value={form.user}
                onChange={changed}
              />
            </Box>

            <Box>
              <TextField
                label='Contraseña'
                type={showPassword ? 'text' : 'password'}
                variant='outlined'
                fullWidth
                name='password'
                value={form.password}
                onChange={changed}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton onClick={togglePasswordVisibility} edge='end'>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}

              />
            </Box>

            <Box my={3}>
              <Button
                type='submit'
                color='secondary'
                className='circular-btn'
                size='large'
                fullWidth
                aria-label='login'
                sx={{
                  textTransform: 'uppercase',
                  py: '12px',
                  letterSpacing: '1px'
                }}
              >
                Iniciar sesión
              </Button>
            </Box>
          </Stack>
        </Box>
      </form>
    </AuthLayout>
  );
};
