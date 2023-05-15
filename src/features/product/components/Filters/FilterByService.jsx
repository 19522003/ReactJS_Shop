import { Box, Checkbox, FormControlLabel, Typography, makeStyles } from '@material-ui/core';

import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    borderTop: `1px solid ${theme.palette.grey[300]}`,
    padding: theme.spacing(2),
  },
  range: {
    listStyle: 'none',
  },
}));

function FilterByService({ filter = {}, onChange }) {
  const classes = useStyles();
  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (onChange) onChange({ [name]: checked });
  };

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">Dịch vụ</Typography>
      <ul className={classes.range}>
        {['isPromotion', 'isFreeShip'].map((service) => (
          <li key={service}>
            <FormControlLabel
              control={
                <Checkbox checked={Boolean(filter[service])} onChange={handleChange} name={service} color="primary" />
              }
              label={service}
            />
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default FilterByService;
