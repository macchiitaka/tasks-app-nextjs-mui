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
import type { ChangeEvent, FC } from 'react';
import { useCallback, useId,useState  } from 'react';
import { useMutation, useQueryClient } from 'react-query';

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
    onError: async () => {
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
    onError: async () => {
      queryClient.invalidateQueries(taskKeys.list());
    },
    retry: 5,
  });

  return useCallback(() => {
    mutate(id);
  }, [id, mutate]);
};

export const TaskLI: React.FC<ContainerProps> = ({ id, title, done }) => {
  const handleChangeDone = useChangeDoneHandler(id, title);
  const handleClickDelete = useClickDeleteHandler(id, title);

  return (
    <View
      id={id}
      title={title}
      done={done}
      onChangeDone={handleChangeDone}
      onClickDelete={handleClickDelete}
    />
  );
};

export const View: React.FC<Omit<Props, 'createdAt' | 'updatedAt'>> = ({
  id,
  title,
  done,
  onChangeDone,
  onClickDelete,
}) => {
  const checkboxId = useId();

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
          control={
            <Checkbox
              id={checkboxId}
              checked={done}
              disabled={id < 1}
              onChange={onChangeDone}
            />
          }
          label={<Typography noWrap>{title}</Typography>}
        />
        <Button type="button" disabled={id < 1} onClick={handleOpen}>
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

const Confirm: FC<{
  isOpened: boolean;
  title: string;
  onDelete(): void;
  onClose(): void;
}> = ({ isOpened, title, onClose, onDelete }) => {
  const label = useId();
  const description = useId();
  return (
    <Dialog
      open={isOpened}
      onClose={onClose}
      aria-labelledby={label}
      aria-describedby={description}
    >
      <DialogTitle id={label}>Delete task</DialogTitle>
      <DialogContent>
        <DialogContentText id={description}>
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
