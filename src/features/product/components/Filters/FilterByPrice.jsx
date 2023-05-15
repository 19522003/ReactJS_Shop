import React from 'react';
import { Box, Button, TextField, Typography, makeStyles } from '@material-ui/core';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    borderTop: `1px solid ${theme.palette.grey[300]}`,
    padding: theme.spacing(2),
  },
  range: {
    display: 'flex',
    flexFlow: 'row nowrap',
    margin: theme.spacing(1),
  },
}));

function FilterByPrice({ onChange }) {
  const [values, setValues] = useState({
    salePrice_gte: 0,
    salePrice_lte: 0,
  });
  const classes = useStyles();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((x) => ({ ...x, [name]: value }));
  };

  const handleSubmit = () => {
    onChange(values);
    console.log(values);
  };

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">Giá</Typography>
      <Box className={classes.range}>
        <TextField name="salePrice_gte" value={values.salePrice_gte} onChange={handleChange} />
        <span>- </span>
        <TextField name="salePrice_lte" value={values.salePrice_lte} onChange={handleChange} />
      </Box>

      <Button size="small" variant="outlined" color="primary" onClick={handleSubmit}>
        Áp dụng
      </Button>
    </Box>
  );
}

FilterByPrice.propTypes = {};

export default FilterByPrice;
