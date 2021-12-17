import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { View } from './component';

const meta: ComponentMeta<typeof View> = {
  title: 'Component/NewTaskForm',
  component: View,
  args: {
    value: '',
  },
};
export default meta;

const Template: ComponentStory<typeof View> = (args) => <View {...args} />;

export const Default = Template.bind({});
Default.args = {};
