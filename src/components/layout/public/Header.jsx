import React, { useContext } from 'react';
import { Nav } from './Nav';
import { UiContext } from '../../../context/ui/UiContext';
import { Box, Button } from '@mui/material';
import SideMenu from '../../ui/SideMenu';

export const Header = () => {
  const { toggleSideMenu } = useContext(UiContext);
  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 1000,
          backgroundColor: 'white',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Nav />
      </Box>

      <Box sx={{ position: 'fixed', top: 15, right: 20, zIndex: 1100 }}>
        <Button onClick={toggleSideMenu} variant='contained'>
          Menu
        </Button>
      </Box>

      <SideMenu />
    </>
  );
};
