import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import Logo from '../../../assets/logo/decorfer.png';

export const Nav = () => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Link
          to='/'
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: 'black'
          }}
        >
          <img
            src={Logo}
            alt='Decorfer'
            width='50'
            height='50'
            style={{ borderRadius: '50%' }}
          />
          <Typography sx={{ ml: 0.5 }}>Estampados Decorfer</Typography>
        </Link>
        <Box flex={1} />
      </Toolbar>
    </AppBar>
  );
};
