import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export const YearSelect = ({ value, onChange }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  return (
    <FormControl sx={{ width: '200px' }}>
      <InputLabel>Año</InputLabel>
      <Select value={value} label='Año' onChange={onChange}>
        {years.map((year) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
