import React from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core';
import { useState } from 'react';
import categoryApi from 'api/categoryApi';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  menu: {
    padding: 0,
    margin: 0,
    listStyle: 'none',
    '& > li': {
      padding: theme.spacing(1),
      transition: 'all .1s',
      '&:hover': {
        cursor: 'pointer',
        color: theme.palette.primary.main,
      },
    },
  },
}));
function FilterByCategory({ onChange }) {
  const [categoryList, setCategoryList] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    (async () => {
      try {
        const response = await categoryApi.getAll();
        setCategoryList(
          response.map((x) => ({
            id: x.id,
            name: x.name,
          }))
        );
      } catch (error) {
        console.log('Failed to fetch category list', error);
      }
    })();
  }, []);

  const handleCategoryClick = (category) => {
    if (onChange) onChange(category.id);
  };

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">Danh mục sản phẩm</Typography>
      <ul className={classes.menu}>
        {categoryList.map((category) => (
          <li key={category.id} onClick={() => handleCategoryClick(category)}>
            <Typography variant="body2">{category.name}</Typography>
          </li>
        ))}
      </ul>
    </Box>
  );
}

FilterByCategory.propTypes = {};

export default FilterByCategory;
