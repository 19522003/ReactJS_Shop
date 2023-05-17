import React from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core';
import { formatPrice } from '../utils';

ProductInfo.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {},
  description: {
    margin: theme.spacing(2, 0),
  },
  salePrice: {
    fontSize: theme.typography.h5.fontSize,
    marginRight: theme.spacing(3),
    fontWeight: 'bold',
  },
  originalPrice: { marginRight: theme.spacing(2), textDecoration: 'line-through' },
  promotionPercent: {},
  priceBox: {
    padding: theme.spacing(2),
    background: theme.palette.grey[100],
  },
}));
function ProductInfo({ product = {} }) {
  const { name, shortDescription, salePrice, originalPrice, promotionPercent } = product;
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography component="h1" variant="h4">
        {name}
      </Typography>
      <Typography className={classes.description} variant="body2">
        {shortDescription}
      </Typography>
      <Box className={classes.priceBox}>
        <Box component="span" className={classes.salePrice}>
          {formatPrice(salePrice)}
        </Box>
        {promotionPercent > 0 && (
          <>
            <Box component="span" className={classes.originalPrice}>
              {formatPrice(originalPrice)}
            </Box>
            <Box component="span" className={classes.promotionPercent}>
              {`-${promotionPercent} %`}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}

export default ProductInfo;
