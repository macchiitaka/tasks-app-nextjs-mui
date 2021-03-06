import { List } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { memo } from 'react';

import type { TaskModel } from '../../../../domain/models/task-model';
import { fetchTasks, taskKeys } from '../../queries/tasks';
import { TaskLI } from '../TaskLI';

type ContainerProps = {};

type Props = {
  isLoading: boolean;
  isError: boolean;
  data: TaskModel[] | undefined;
} & ContainerProps;

const TaskLIMemoized = memo(TaskLI);

export const View: React.FC<Props> = (props) => (
  <List>
    {props.data?.map((task) => (
      <TaskLIMemoized key={task.id} {...task} />
    ))}
  </List>
);

export const TaskUList: React.FC<ContainerProps> = (props) => {
  const { isLoading, isError, data } = useQuery(taskKeys.list(), fetchTasks);

  return (
    <View isLoading={isLoading} isError={isError} data={data} {...props} />
  );
};
