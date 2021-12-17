import { Provider } from '../src/infrastructure/controllers/_app';
import { addDecorator } from '@storybook/react';
import { initialize, mswDecorator } from 'msw-storybook-addon';

export const parameters = {
  actions: {
    argTypesRegex: '^on[A-Z].*',
  },
  controls: {
    expanded: true,
    matchers: {
      date: /^(created|updated)At$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <Provider
      queryClientConfig={{
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      }}
    >
      <Story />
    </Provider>
  ),
];

initialize();
addDecorator(mswDecorator);
