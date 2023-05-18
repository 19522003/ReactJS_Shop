import React from 'react';
import { useSelector } from 'react-redux';
import { cartTotalSelector } from './selectors';

function CartFeature(props) {
  const cartTotal = useSelector(cartTotalSelector);
  return <div>Cart {cartTotal}</div>;
}

export default CartFeature;
