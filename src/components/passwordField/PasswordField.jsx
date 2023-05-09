import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { FormHelperText } from '@material-ui/core';

function PasswordField(props) {
  const { form, name, label, disabled } = props;
  const { errors } = form;
  const hasError = errors[name];

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword((x) => !x);
  };

  return (
    <>
      <FormControl error={!!hasError} variant="outlined" fullWidth margin="normal">
        <InputLabel htmlFor={name}>{label}</InputLabel>
        <Controller
          name={name}
          as={OutlinedInput}
          control={form.control}
          id={name}
          type={showPassword ? 'text' : 'password'}
          label={label}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" onClick={toggleShowPassword} edge="end">
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          disabled={disabled}
        />
        <FormHelperText error={!!hasError}>{errors[name]?.message}</FormHelperText>
      </FormControl>
    </>
  );
}

export default PasswordField;
