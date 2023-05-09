import { TextField } from '@material-ui/core';
import React from 'react';
import { Controller } from 'react-hook-form';

function InputField(props) {
  const { form, name, label, disabled } = props;
  const { errors } = form;
  const hasError = errors[name];
  return (
    <Controller
      name={name}
      label={label}
      as={TextField}
      fullWidth
      control={form.control}
      disabled={disabled}
      error={!!hasError}
      helperText={errors[name]?.message}
      variant="outlined"
      margin="normal"
    />
  );
}

export default InputField;
