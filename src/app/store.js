import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/auth/userSlice';
import counterReducer from '../features/counter/counterSlice';

const rootReducer = {
  user: userReducer,
  count: counterReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
