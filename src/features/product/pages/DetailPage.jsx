import React from 'react';
import { Box, Container, Grid, LinearProgress, Paper, makeStyles } from '@material-ui/core';
import ProductThumbnail from '../components/ProductThumbnail';
import { Switch, Route, useRouteMatch } from 'react-router-dom/cjs/react-router-dom';
import useProductDetail from '../hooks/useProductDetail';
import ProductInfo from '../components/ProductInfo';
import AddToCartForm from '../components/AddToCartForm';
import ProductMenu from '../components/ProductMenu';
import ProductDescription from '../components/ProductDescription';
import ProductAdditional from '../components/ProductAdditional';
import ProductReviews from '../components/ProductReviews';
import { useDispatch } from 'react-redux';
import { addToCart } from 'features/cart/CartSlice';

DetailPage.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing[3],
  },
  left: {
    width: '400px',
    padding: theme.spacing(1.5),
    borderRight: `1px solid ${theme.palette.grey[300]}`,
  },
  right: {
    flex: '1 1 0',
    padding: theme.spacing(1.5),
  },

  loading: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
  },
}));

function DetailPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    params: { productId },
    url,
  } = useRouteMatch();

  const { product, loading } = useProductDetail(productId);

  const handleAddToCartSubmit = (values) => {
    const action = addToCart({
      id: product.id,
      product,
      quantity: values.quantity,
    });

    dispatch(action);
  };

  if (loading)
    return (
      <Box className={classes.loading}>
        <LinearProgress />
      </Box>
    );
  return (
    <Box className={classes.root}>
      <Container>
        <Paper elevation={0}>
          <Grid container>
            <Grid item className={classes.left}>
              <ProductThumbnail product={product} />
            </Grid>
            <Grid item className={classes.right}>
              <ProductInfo product={product} />
              <AddToCartForm onSubmit={handleAddToCartSubmit} />
            </Grid>
          </Grid>
        </Paper>
        <ProductMenu />
        <Switch>
          <Route exact path={url}>
            <ProductDescription product={product} />
          </Route>
          <Route exact path={`${url}/additional`}>
            <ProductAdditional />
          </Route>
          <Route exact path={`${url}/reviews`}>
            <ProductReviews />
          </Route>
        </Switch>
      </Container>
    </Box>
  );
}

export default DetailPage;
