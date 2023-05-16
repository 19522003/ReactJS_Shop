import { Box, Container, Grid, Paper, makeStyles } from '@material-ui/core';
import productApi from 'api/productApi';
import React, { useMemo } from 'react';
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
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 10,
      _sort: params._sort || 'salePrice:ASC',
      isPromotion: params.isPromotion === 'true',
      isFreeShip: params.isFreeShip === 'true',
    };
  }, [location.search]);

  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [pagination, setPagination] = useState({
    limit: 10,
    total: 10,
    page: 1,
  });

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(queryParams);
        setProductList(data);
        setPagination(pagination);
        console.log(pagination);
      } catch (error) {
        console.log('Failed', error);
      }
      setIsLoading(false);
    })();
  }, [queryParams]);

  const handlePageChange = (page) => {
    const filters = {
      ...queryParams,
      _page: page,
    };

    history.push({ pathname: history.location.pathname, search: queryString.stringify(filters) });
  };

  const handleSortChange = (sort) => {
    const filters = {
      ...queryParams,
      _sort: sort,
    };

    history.push({ pathname: history.location.pathname, search: queryString.stringify(filters) });
  };

  const handleFilterChange = (newFilter) => {
    const filters = {
      ...queryParams,
      ...newFilter,
    };

    history.push({ pathname: history.location.pathname, search: queryString.stringify(filters) });
  };

  const setNewFilters = (newFilters) => {
    const filters = {
      ...queryParams,
      ...newFilters,
    };

    history.push({ pathname: history.location.pathname, search: queryString.stringify(filters) });
  };

  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>
              <ProductFilter filter={queryParams} onChange={handleFilterChange} />
            </Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0}>
              <ProductSort currentSort={queryParams._sort} onChange={handleSortChange} />
              <FilterViewer filters={queryParams} onChange={setNewFilters} />

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
