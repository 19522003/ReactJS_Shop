import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increase: (state, action) => state + 1,
    decrease: (state, action) => state - 1,
  },
});

const { actions, reducer } = counterSlice;

export const { decrease, increase } = actions;

export default reducer;
