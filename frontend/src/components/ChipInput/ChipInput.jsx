import React, { useState } from 'react';
import { TextField, Chip, Box } from '@mui/material';

const ChipInput = ({ value, onAdd, onDelete, label, ...props }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddChip = () => {
    if (inputValue.trim() && !value.includes(inputValue)) {
      onAdd(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      handleAddChip();
      e.preventDefault();
    }
  };

  return (
    <TextField
      {...props}
      variant="outlined"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={handleKeyDown}
      label={label}
      InputProps={{
        startAdornment: (
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap', gap: 0.5 }}>
            {value.map((chip, index) => (
              <Chip
                key={index}
                label={chip}
                onDelete={() => onDelete(chip)}
                sx={{ maxWidth: '100%' }}
              />
            ))}
          </Box>
        ),
        sx: { display: 'flex', flexWrap: 'nowrap' },
      }}
    />
  );
};

export default ChipInput;
