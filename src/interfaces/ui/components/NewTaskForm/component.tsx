import { Box, Button, TextField } from '@mui/material';
import type { ChangeEvent, FormEvent } from 'react';
import { useCallback, useState } from 'react';

import { useSubmitHandler } from './hook';

type ContainerProps = {};

type Props = {
  value: string;
  onChangeText(e: ChangeEvent<HTMLInputElement>): void;
  onSubmit(e: FormEvent<HTMLFormElement>): void;
} & ContainerProps;

export const NewTaskForm: React.VFC<ContainerProps> = (props) => {
  const [value, setValue] = useState('');

  const handleChangeText = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const resetValue = useCallback(() => {
    setValue('');
  }, []);

  const handleSubmit = useSubmitHandler(value, resetValue);

  return (
    <View
      {...props}
      value={value}
      onChangeText={handleChangeText}
      onSubmit={handleSubmit}
    />
  );
};

export const View: React.VFC<Props> = (props) => (
  <Box
    component="form"
    display="grid"
    gridTemplateColumns="minmax(0, 1fr) max-content"
    gap={2}
    onSubmit={props.onSubmit}
  >
    <TextField
      name="task"
      label="New task"
      value={props.value}
      autoFocus
      required
      InputProps={{
        inputProps: {
          maxLength: 2 ** 16,
        },
      }}
      size="small"
      onChange={props.onChangeText}
    />
    <Button variant="contained" type="submit">
      Add
    </Button>
  </Box>
);
