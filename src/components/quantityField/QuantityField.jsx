import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { Controller } from 'react-hook-form';
import { Box, FormHelperText, Typography, makeStyles } from '@material-ui/core';
import { AddCircleOutline, RemoveCircleOutline } from '@material-ui/icons';

const useStyle = makeStyles((theme) => ({
  root: {},
  box: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    maxWidth: '180px',
  },
}));
function QuantityField(props) {
  const classes = useStyle();
  const { form, name, label } = props;
  const { errors } = form;
  const hasError = errors[name];

  return (
    <>
      <FormControl size="small" error={!!hasError} variant="outlined" fullWidth margin="normal">
        <Typography>{label}</Typography>
        <Box className={classes.box}>
          <IconButton
            onClick={() =>
              form.setValue(name, Number.parseInt(form.getValues(name) ? Number.parseInt(form.getValues(name)) + 1 : 1))
            }
          >
            <AddCircleOutline />
          </IconButton>
          <Controller name={name} as={OutlinedInput} control={form.control} id={name} type="number" />
          <IconButton
            onClick={() =>
              form.setValue(name, Number.parseInt(form.getValues(name) ? Number.parseInt(form.getValues(name)) - 1 : 1))
            }
          >
            <RemoveCircleOutline />
          </IconButton>
        </Box>

        <FormHelperText error={!!hasError}>{errors[name]?.message}</FormHelperText>
      </FormControl>
    </>
  );
}

export default QuantityField;
