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
  InputAdornment
} from '@mui/material';
import { ErrorOutline, Visibility, VisibilityOff } from '@mui/icons-material';
import AuthLayout from '../layout/public/AuthLayout';

export const Login = () => {
  const { form, changed } = useForm({});
  const [saved, setSaved] = useState('not_sended');
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const { setAuth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let userToLogin = form;

    const request = await fetch(Global.url + 'auth/login', {
      method: 'POST',
      body: JSON.stringify(userToLogin),
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

      setAuth(data.user);

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      setSaved('error');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <AuthLayout title='Decorfer | Login'>
      <form onSubmit={handleSubmit} noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Stack spacing={3}>
            <Box>
              <Typography variant='h1' component='h1' my={3}>
                Iniciar sesión
              </Typography>
              <Chip
                label='Invalid user / password'
                color='error'
                icon={<ErrorOutline />}
                className='fadeIn'
                sx={{ display: showError ? 'flex' : 'none' }}
              />
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
                /* error={!!errors.email}
                              helperText={errors.email?.message} */
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
                /* error={!!errors.password} */
                /* helperText={errors.password?.message} */
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
