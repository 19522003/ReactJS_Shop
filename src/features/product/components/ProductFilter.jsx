import React from 'react';
import FilterByCategory from './Filters/FilterByCategory';
import { Box } from '@material-ui/core';
import FilterByPrice from './Filters/FilterByPrice';
import FilterByService from './Filters/FilterByService';

function ProductFilter({ filter, onChange }) {
  const handleCategoryChange = (newCategoryId) => {
    if (!onChange) return;

    const newFilter = {
      ...filter,
      'category.id': newCategoryId,
    };
    onChange(newFilter);
  };

  const handlePriceChange = (values) => {
    if (onChange) onChange(values);
  };

  const handleServiceChange = (values) => {
    if (onChange) onChange(values);
  };
  return (
    <Box>
      <FilterByCategory onChange={handleCategoryChange} />
      <FilterByPrice onChange={handlePriceChange} />
      <FilterByService filter={filter} onChange={handleServiceChange} />
    </Box>
  );
}

ProductFilter.propTypes = {};

export default ProductFilter;
