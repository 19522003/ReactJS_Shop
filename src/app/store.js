import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/auth/userSlice';
import counterReducer from '../features/counter/counterSlice';
import cartReducer from '../features/cart/CartSlice';

const rootReducer = {
  user: userReducer,
  count: counterReducer,
  cart: cartReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
