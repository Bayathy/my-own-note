import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Explorer } from "./explorer";

const meta: Meta<typeof Explorer> = {
  title: "File/Explorer",
  component: Explorer,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    files: [],
  },
};
