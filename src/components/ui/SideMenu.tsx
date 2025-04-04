import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Reemplazo de useRouter
import { UiContext } from '../../context/ui/UiContext';
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from '@mui/material';

import {
  CategoryOutlined,
  ConfirmationNumberOutlined,
  Hail,
  LoginOutlined,
  SearchOutlined,
  VpnKeyOutlined
} from '@mui/icons-material';
import useAuth from '../../hooks/useAuth';

const SideMenu = () => {
  const navigate = useNavigate();
  const { isMenuOpen, toggleSideMenu } = useContext(UiContext);
  const { auth, logout } = useAuth();
  const role = auth?.role;

  const [searchTerm, setSearchTerm] = useState('');

  const navigateTo = (url) => {
    toggleSideMenu();
    navigate(url);
  };

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    navigateTo(`/search/${searchTerm}`);
  };

  return (
    <Drawer
      open={isMenuOpen}
      anchor='right'
      sx={{
        backdropFilter: 'blur(4px)',
        transition: 'all 0.5s ease-out'
      }}
      onClose={toggleSideMenu}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => (e.key === 'Enter' ? onSearchTerm() : null)}
              type='text'
              placeholder='Search...'
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton onClick={onSearchTerm} aria-label='search'>
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>

          {role?.name === 'Administrador' && (
            <>
              <Divider />
              <ListSubheader>Admin Panel</ListSubheader>

              {[
                {
                  label: 'Clientes',
                  icon: <Hail />,
                  path: '/admin/customer'
                },
                {
                  label: 'Facturas',
                  icon: <ConfirmationNumberOutlined />,
                  path: '/admin/invoice'
                },
                {
                  label: 'Productos',
                  icon: <CategoryOutlined />,
                  path: '/admin/product'
                }
                /* { label: "Users", icon: <AdminPanelSettings />, path: "/admin/users" }, */
              ].map((adminItem) => (
                <ListItem key={adminItem.label}>
                  <Button
                    onClick={() => navigateTo(adminItem.path)}
                    sx={{ paddingRight: '24px' }}
                  >
                    <ListItemIcon>{adminItem.icon}</ListItemIcon>
                    <ListItemText primary={adminItem.label} />
                  </Button>
                </ListItem>
              ))}
            </>
          )}
        </List>

        {auth ? (
          <Button
            sx={{ paddingRight: '24px', margin: '6px', minWidth: '196px' }}
            onClick={logout}
          >
            <ListItem>
              <ListItemIcon>
                <LoginOutlined />
              </ListItemIcon>
              <ListItemText primary='Salir' />
            </ListItem>
          </Button>
        ) : (
          <Button
            sx={{ paddingRight: '24px', minWidth: '196px' }}
            onClick={() => navigateTo('/login')}
          >
            <ListItem>
              <ListItemIcon>
                <VpnKeyOutlined />
              </ListItemIcon>
              <ListItemText primary='Iniciar sesión' />
            </ListItem>
          </Button>
        )}
      </Box>
    </Drawer>
  );
};

export default SideMenu;
