import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { rest } from 'msw';

import type { TaskModel } from '../../../../domain/models/task-model';
import { TaskUList } from './component';

const meta: ComponentMeta<typeof TaskUList> = {
  title: 'Component/TaskUList',
  component: TaskUList,
};
export default meta;

const Template: ComponentStory<typeof TaskUList> = (args) => (
  <TaskUList {...args} />
);

export const Default = Template.bind({});
Default.parameters = {
  msw: {
    handlers: [
      rest.get('*/api/v1/tasks', (req, res, ctx) =>
        res(
          ctx.delay(100),
          ctx.status(200),
          ctx.json<{ items: TaskModel[] }>({
            items: [
              {
                id: 1,
                createdAt: '2021-01-01 00:00',
                updatedAt: '2021-01-01 00:00',
                title: 'TODO_01',
                done: false,
              },
              {
                id: 2,
                createdAt: '2021-01-01 00:00',
                updatedAt: '2021-01-01 00:00',
                title: 'TODO_02',
                done: true,
              },
            ],
          }),
        ),
      ),
    ],
  },
};

export const Error = Template.bind({});
Error.parameters = {
  msw: {
    handlers: [
      rest.get('*/api/v1/tasks', (req, res, ctx) =>
        res(ctx.delay(100), ctx.status(400), ctx.json({})),
      ),
    ],
  },
};
