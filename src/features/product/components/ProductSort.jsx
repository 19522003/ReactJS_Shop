import React from 'react';
import { Tab, Tabs } from '@material-ui/core';

function ProductSort({ currentSort, onChange }) {
  const handleSortChange = (event, newValue) => {
    if (onChange) onChange(newValue);
  };

  return (
    <Tabs value={currentSort} indicatorColor="primary" textColor="primary" onChange={handleSortChange}>
      <Tab label="Giá thấp tới cao" value="salePrice:ASC"></Tab>
      <Tab label="Giá cao tới thấp" value="salePrice:DESC"></Tab>
    </Tabs>
  );
}

ProductSort.propTypes = {};

export default ProductSort;
