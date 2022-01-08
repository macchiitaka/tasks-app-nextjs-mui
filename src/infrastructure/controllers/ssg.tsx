import { Input, Typography } from '@mui/material';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import type { ChangeEvent } from 'react';
import { useCallback } from 'react';

import { aSlice } from '../../interfaces/ui/store/a';
import { bSlice } from '../../interfaces/ui/store/b';
import {
  useAppDispatch,
  useAppSelector,
  wrapper,
} from '../../interfaces/ui/store/store';

export const SSG: React.VFC = () => {
  const a = useAppSelector((state) => state.a.value);
  const b = useAppSelector((state) => state.b.value);
  const dispatch = useAppDispatch();

  const handleChangeA = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(aSlice.actions.replace(e.target.valueAsNumber));
    },
    [dispatch],
  );

  const handleChangeB = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(bSlice.actions.replace(e.target.valueAsNumber));
    },
    [dispatch],
  );

  return (
    <>
      <Head>
        <title>Tasks</title>
      </Head>
      <Input type="number" value={a} onChange={handleChangeA} />
      <Typography component="span">+</Typography>
      <Input type="number" value={b} onChange={handleChangeB} />
      <Typography component="span">={a + b}</Typography>
    </>
  );
};

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) => async () => {
    store.dispatch(aSlice.actions.replace(1));
    store.dispatch(bSlice.actions.replace(2));
    return { props: {} };
  },
);
