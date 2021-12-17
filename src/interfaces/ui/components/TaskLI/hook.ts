import type { ChangeEvent } from 'react';
import { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import type { TaskModel } from '../../../../domain/models/task-model';
import { deleteTask, taskKeys, updateTask } from '../../queries/tasks';

export const useChangeDoneHandler = (id: number, title: string) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(taskKeys.detail(id), updateTask, {
    onMutate: async ({ done }) => {
      await queryClient.cancelQueries(taskKeys.list());

      queryClient.setQueryData<TaskModel[]>(
        taskKeys.list(),
        (tasks) =>
          tasks?.map((task) =>
            task.id === id
              ? {
                  ...task,
                  done,
                }
              : task,
          ) ?? [],
      );
    },
    onSettled: async (result) => {
      queryClient.invalidateQueries(taskKeys.list());
    },
    retry: 5,
  });

  return useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      mutate({ id, title, done: e.target.checked });
    },
    [id, mutate, title],
  );
};

export const useClickDeleteHandler = (id: number, title: string) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(taskKeys.detail(id), deleteTask, {
    onMutate: async () => {
      await queryClient.cancelQueries(taskKeys.list());

      queryClient.setQueryData<TaskModel[]>(
        taskKeys.list(),
        (tasks) => tasks?.filter((task) => task.id !== id) ?? [],
      );
    },
    onSettled: async () => {
      queryClient.invalidateQueries(taskKeys.list());
    },
    retry: 5,
  });

  return useCallback(() => {
    if (confirm(`Are you OK to delete "${title || 'NO TITLE'}"`)) {
      mutate(id);
    }
  }, [id, mutate, title]);
};
