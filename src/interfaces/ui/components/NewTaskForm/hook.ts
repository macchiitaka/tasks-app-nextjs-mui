import type { FormEvent } from 'react';
import { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import type { TaskModel } from '../../../../domain/models/task-model';
import { createTask, taskKeys } from '../../queries/tasks';

export const useSubmitHandler = (value: string, callback: () => void) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(createTask, {
    onMutate: async (title: string) => {
      await queryClient.cancelQueries(taskKeys.list());
      queryClient.setQueryData<TaskModel[]>(taskKeys.list(), (old) => [
        {
          id: Math.random(),
          title,
          done: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        ...(old ?? []),
      ]);
    },
    onSettled: async () => {
      queryClient.invalidateQueries(taskKeys.list());
    },
    retry: 5,
  });

  return useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!value) {
        return;
      }

      mutate(value);
      callback();
    },
    [callback, mutate, value],
  );
};
