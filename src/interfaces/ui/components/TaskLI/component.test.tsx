/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ComponentProps } from 'react';

import { Provider } from '../../../../infrastructure/controllers/_app';
import { View } from './component';

const renderComponent = (props?: Partial<ComponentProps<typeof View>>) => {
  const defaultProps = {
    id: 1,
    title: 'dummy_title',
    done: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    onChangeDone: jest.fn(),
    onClickDelete: jest.fn(),
  };

  return render(<View {...defaultProps} {...props} />, { wrapper: Provider });
};

it('Render title', async () => {
  renderComponent({ title: 'dummy_title' });
  expect(screen.getByText('dummy_title')).toBeInTheDocument();
});

it('To be Checked', async () => {
  renderComponent({ done: true });
  expect(await screen.findByRole('checkbox')).toBeChecked();
});

it('Not to be Checked', async () => {
  renderComponent({ done: false });
  expect(await screen.findByRole('checkbox')).not.toBeChecked();
});

it('If check the checkbox, should onChangeDone to be called', async () => {
  const handleChangeDone = jest.fn();

  renderComponent({ done: false, onChangeDone: handleChangeDone });
  userEvent.click(await screen.findByRole('checkbox'));

  expect(handleChangeDone).toHaveBeenCalled();
});

it('If check the delete button, should onClickDelete to be called', async () => {
  const handleClickDelete = jest.fn();

  renderComponent({ done: false, onClickDelete: handleClickDelete });
  userEvent.click(await screen.findByRole('button', { name: 'Delete' }));

  expect(handleClickDelete).toHaveBeenCalled();
});
