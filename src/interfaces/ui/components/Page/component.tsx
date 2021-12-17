import { Box, Grid, Typography } from '@mui/material';

import { NewTaskForm } from '../NewTaskForm';
import { TaskUList } from '../TaskUList';

type ContainerProps = {};

type Props = {} & ContainerProps;

export const View: React.VFC<Props> = () => (
  <Box padding={4}>
    <Grid container direction="column" gap={2}>
      <Grid item>
        <Typography variant="h1" fontSize="2em">
          Tasks
        </Typography>
      </Grid>
      <Grid item>
        <NewTaskForm />
      </Grid>
      <Grid item>
        <TaskUList />
      </Grid>
    </Grid>
  </Box>
);

export const Page: React.VFC<ContainerProps> = (props) => <View {...props} />;
