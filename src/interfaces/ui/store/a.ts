import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export type CounterState = {
  value: number;
};

const initialState: CounterState = {
  value: 0,
};

export const aSlice = createSlice({
  name: 'a',
  initialState,
  reducers: {
    replace: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.a,
    }),
  },
});
