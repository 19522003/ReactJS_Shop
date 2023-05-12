import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from 'constants/';

Product.propTypes = {
  product: PropTypes.object,
};

function Product({ product }) {
  const thumbnailUrl = product.thumbnail ? `${STATIC_HOST}${product.thumbnail?.url}` : THUMBNAIL_PLACEHOLDER;

  return (
    <Box padding={1}>
      <Box p={1}>
        <img width="100%" src={thumbnailUrl} alt={product.name} />
      </Box>
      <Typography variant="body2">{product.name}</Typography>
      <Typography variant="body2">
        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.salePrice)}
      </Typography>
    </Box>
  );
}

export default Product;
