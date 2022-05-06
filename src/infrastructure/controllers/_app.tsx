import type { AppProps } from 'next/app';
import Head from 'next/head';
import type { FC, PropsWithChildren } from 'react';
import { useMemo } from 'react';
import type { DehydratedState } from 'react-query';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider as ReduxStoreProvider } from 'react-redux';

import { wrapper } from '../../interfaces/ui/store/store';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GetConstructorArgs<T> = T extends new (...args: infer U) => any
  ? U
  : never;

export const ReactQueryClientProvider: FC<
  PropsWithChildren<{
    queryClientConfig?: GetConstructorArgs<typeof QueryClient>[0];
    dehydratedState?: DehydratedState;
  }>
> = (props) => {
  const queryClient = useMemo(
    () =>
      new QueryClient(
        props.queryClientConfig ?? {
          defaultOptions: {
            queries: {
              refetchOnWindowFocus: false,
            },
          },
        },
      ),
    [props.queryClientConfig],
  );

  return (
    <QueryClientProvider client={queryClient}>
      {process.env.NODE_ENV !== 'production' &&
        // eslint-disable-next-line dot-notation
        process.env['STORYBOOK'] !== 'true' && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      {props.children}
    </QueryClientProvider>
  );
};

export const MyApp = wrapper.withRedux(({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content={[
            ['initial-scale', '1'],
            ['width', 'device-width'],
          ]
            .map(([key, value]) => `${key}=${value}`)
            .join(', ')}
        />
      </Head>
      <ReduxStoreProvider store={store}>
        <ReactQueryClientProvider
          dehydratedState={props.pageProps.dehydratedState}
        >
          <Component {...props.pageProps} />
        </ReactQueryClientProvider>
      </ReduxStoreProvider>
    </>
  );
});
