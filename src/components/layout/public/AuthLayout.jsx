import React from 'react';
import { Box } from '@mui/material';

const AuthLayout = ({ children, title }) => {
  document.title = title;

  return (
    <>
      <main>
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          height='calc(100vh - 200px)'
        >
          {children}
        </Box>
      </main>
    </>
  );
};

export default AuthLayout;
