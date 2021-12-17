import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  ListItem,
  Typography,
} from '@mui/material';
import type { ChangeEvent, VFC } from 'react';
import { useCallback, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useUID, useUIDSeed } from 'react-uid';

import type { TaskModel } from '../../../../domain/models/task-model';
import { deleteTask, taskKeys, updateTask } from '../../queries/tasks';

type ContainerProps = TaskModel;

type Props = {
  onChangeDone(e: ChangeEvent<HTMLInputElement>): void;
  onClickDelete(): void;
} & ContainerProps;

const useChangeDoneHandler = (id: number, title: string) => {
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

const useClickDeleteHandler = (id: number, title: string) => {
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

export const TaskLI: React.VFC<ContainerProps> = ({ id, title, done }) => {
  const handleChangeDone = useChangeDoneHandler(id, title);
  const handleClickDelete = useClickDeleteHandler(id, title);

  return (
    <View
      title={title}
      done={done}
      onChangeDone={handleChangeDone}
      onClickDelete={handleClickDelete}
    />
  );
};

export const View: React.VFC<Omit<Props, 'id' | 'createdAt' | 'updatedAt'>> = ({
  title,
  done,
  onChangeDone,
  onClickDelete,
}) => {
  const id = useUID();

  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = useCallback(() => {
    setIsOpened(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpened(false);
  }, []);

  const handleDelete = useCallback(() => {
    onClickDelete();
  }, [onClickDelete]);

  return (
    <ListItem>
      <Box
        display="grid"
        gridTemplateColumns="minmax(0, 1fr) max-content"
        gap={2}
        width="100%"
        alignItems="center"
      >
        <FormControlLabel
          control={<Checkbox id={id} checked={done} onChange={onChangeDone} />}
          label={<Typography noWrap>{title}</Typography>}
        />
        <Button type="button" onClick={handleOpen}>
          Delete
        </Button>
        <Confirm
          isOpened={isOpened}
          title={title}
          onDelete={handleDelete}
          onClose={handleClose}
        />
      </Box>
    </ListItem>
  );
};

const Confirm: VFC<{
  isOpened: boolean;
  title: string;
  onDelete(): void;
  onClose(): void;
}> = ({ isOpened, title, onClose, onDelete }) => {
  const seed = useUIDSeed();
  return (
    <Dialog
      open={isOpened}
      onClose={onClose}
      aria-labelledby={seed('label')}
      aria-describedby={seed('description')}
    >
      <DialogTitle id={seed('label')}>Delete task</DialogTitle>
      <DialogContent>
        <DialogContentText id={seed('description')}>
          {`Are you sure want to delete "${title}"?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onDelete} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
