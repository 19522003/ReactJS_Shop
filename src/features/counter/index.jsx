import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrease, increase } from './counterSlice';

function CounterFeature(props) {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();

  const handleIncreaseClick = () => {
    const action = increase();
    console.log(action);
    dispatch(action);
  };

  const handleDecreaseClick = () => {
    const action = decrease();
    console.log(action);
    dispatch(action);
  };

  return (
    <>
      <div>{count}</div>
      <button onClick={handleIncreaseClick}>Click</button>
      <button onClick={handleDecreaseClick}>Click</button>
    </>
  );
}

export default CounterFeature;
