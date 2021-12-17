import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { View } from './component';

const meta: ComponentMeta<typeof View> = {
  title: 'Component/TaskLI',
  component: View,
  args: {
    title: 'TODO_01',
    done: false,
  },
  parameters: {
    a11y: {
      config: {
        rules: [{ id: 'listitem', enabled: false }],
      },
    },
  },
};
export default meta;

const Template: ComponentStory<typeof View> = (args) => <View {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Done = Template.bind({});
Done.args = {
  done: true,
};
