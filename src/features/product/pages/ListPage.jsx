import { Box, Container, Grid, Paper, makeStyles } from '@material-ui/core';
import productApi from 'api/productApi';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductList from '../components/ProductList';
import { Pagination } from '@material-ui/lab';
import ProductSort from '../components/ProductSort';
import ProductFilter from '../components/ProductFilter';
import FilterViewer from '../components/FilterViewer';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom';
import queryString from 'query-string';

const useStyles = makeStyles((theme) => ({
  root: {},
  left: {
    width: '250px',
  },
  right: {
    flex: '1 1 0',
  },
  pagination: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    marginTop: '20px',
    paddingBottom: '20px',
  },
}));

function ListPage(props) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState(() => ({
    ...queryParams,
    _page: Number.parseInt(queryParams._page) || 1,
    _limit: Number.parseInt(queryParams._limit) || 10,
    _sort: queryParams._sort || 'salePrice:ASC',
  }));

  const [pagination, setPagination] = useState({
    limit: 10,
    total: 10,
    page: 1,
  });

  useEffect(() => {
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  }, [history, filters]);

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(filters);
        setProductList(data);
        setPagination(pagination);
        console.log(pagination);
      } catch (error) {
        console.log('Failed', error);
      }
      setIsLoading(false);
    })();
  }, [filters]);

  const handlePageChange = (e, page) => {
    setFilters((x) => ({ ...x, _page: page }));
  };

  const handleSortChange = (newValue) => {
    setFilters((x) => ({ ...x, _sort: newValue }));
  };

  const handleFilterChange = (newFilter) => {
    setFilters((x) => ({ ...x, ...newFilter }));
  };

  const setNewFilters = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>
              <ProductFilter filter={filters} onChange={handleFilterChange} />
            </Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0}>
              <ProductSort currentSort={filters._sort} onChange={handleSortChange} />
              <FilterViewer filters={filters} onChange={setNewFilters} />

              {isLoading ? <ProductSkeletonList /> : <ProductList data={productList} />}

              <Box className={classes.pagination}>
                <Pagination
                  onChange={(event, page) => handlePageChange(event, page)}
                  color="primary"
                  count={Math.ceil(pagination.total / pagination.limit)}
                  page={pagination.page}
                ></Pagination>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
