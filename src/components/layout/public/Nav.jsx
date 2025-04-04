import React from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import decorferLogo from '../../../assets/logo/decorfer.png';
import { Link } from 'react-router-dom';

export const Nav = () => {
  return (
    <AppBar>
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
            src={decorferLogo}
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
