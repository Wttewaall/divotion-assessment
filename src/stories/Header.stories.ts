import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { HeaderTop } from '@/components/headerTop';

const meta = {
  title: 'Nav/HeaderTop',
  component: HeaderTop,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof HeaderTop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Show: Story = {};
