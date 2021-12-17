import type { QueryFunctionContext } from 'react-query';

import { CreateTask } from '../../../application/usecases/create-task';
import { ListTasks } from '../../../application/usecases/list-tasks';
import { RemoveTask } from '../../../application/usecases/remove-task';
import { ReplaceTask } from '../../../application/usecases/replace-task';
import { api } from '../../api';
import { TaskRepository } from '../../repositories/task-repository';

export const taskKeys = {
  all: () => [{ scope: 'tasks' }] as const,
  // lists: () => [...taskKeys.all(), 'list'] as const,
  // list: () => [...taskKeys.lists()] as const,
  list: () => [{ ...taskKeys.all()[0], entity: 'list' }] as const,
  // details: () => [...taskKeys.all(), 'detail'] as const,
  // detail: (id: number) => [...taskKeys.details(), id] as const,
  detail: (id: number) =>
    [{ ...taskKeys.all()[0], entity: 'detail', id }] as const,
};

export const fetchTasks = async (
  _: QueryFunctionContext<ReturnType<typeof taskKeys['list']>>,
) => {
  const res = await new ListTasks(new TaskRepository(api)).execute();

  if (!res.success) {
    throw res.error;
  }

  return res.data;
};

export const createTask = async (title: string) => {
  const res = await new CreateTask(new TaskRepository(api)).execute(title);

  if (!res.success) {
    throw res.error;
  }

  return res.data;
};

export const updateTask = async (data: {
  id: number;
  title: string;
  done: boolean;
}) => {
  const res = await new ReplaceTask(new TaskRepository(api)).execute(data);

  if (!res.success) {
    throw res.error;
  }

  return res.data;
};

export const deleteTask = async (id: number) => {
  const res = await new RemoveTask(new TaskRepository(api)).execute(id);

  if (!res.success) {
    throw res.error;
  }

  return res.data;
};
