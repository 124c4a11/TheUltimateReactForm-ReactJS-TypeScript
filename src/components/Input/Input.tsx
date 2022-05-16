import { forwardRef } from 'react';

import { TextField, TextFieldProps } from '@mui/material';


export const Input = forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    return (
      <TextField
        fullWidth
        variant="outlined"
        margin="normal"
        inputRef={ref}
        {...props}
      />
    );
  }
);
