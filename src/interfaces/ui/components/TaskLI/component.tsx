import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  ListItem,
  Typography,
} from '@mui/material';
import type { ChangeEvent } from 'react';

import type { TaskModel } from '../../../../domain/models/task-model';
import { useChangeDoneHandler, useClickDeleteHandler } from './hook';

type ContainerProps = TaskModel;

type Props = {
  onChangeDone(e: ChangeEvent<HTMLInputElement>): void;
  onClickDelete(): void;
} & ContainerProps;
export const TaskLI: React.VFC<ContainerProps> = (props) => {
  const handleChangeDone = useChangeDoneHandler(props.id, props.title);
  const handleClickDelete = useClickDeleteHandler(props.id, props.title);

  return (
    <View
      {...props}
      onChangeDone={handleChangeDone}
      onClickDelete={handleClickDelete}
    />
  );
};

export const View: React.VFC<Props> = (props) => {
  const id = `item_${props.id}`;

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
              id={id}
              checked={props.done}
              onChange={props.onChangeDone}
            />
          }
          label={<Typography noWrap>{props.title}</Typography>}
        />
        <Button type="button" onClick={props.onClickDelete}>
          Delete
        </Button>
      </Box>
    </ListItem>
  );
};
