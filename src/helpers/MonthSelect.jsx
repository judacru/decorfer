import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const months = [
  'Enero', 'Febrero', 'Marzo', 'Abril',
  'Mayo', 'Junio', 'Julio', 'Agosto',
  'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

export const MonthSelect = ({ value, onChange }) => (
  <FormControl sx={{ width: '200px' }}>
    <InputLabel>Mes</InputLabel>
    <Select value={value} label='Mes' onChange={onChange}>
      {months.map((month, index) => (
        <MenuItem key={index} value={index + 1}>
          {month}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);