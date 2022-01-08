import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';

import { aSlice } from './a';
import { bSlice } from './b';

const makeStore = () =>
  configureStore({
    reducer: {
      [bSlice.name]: bSlice.reducer,
      [aSlice.name]: aSlice.reducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
  });

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const wrapper = createWrapper<AppStore>(makeStore);
