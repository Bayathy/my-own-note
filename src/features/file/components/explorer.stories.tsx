import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "@storybook/test";
import type { File } from "../types/file";
import { Explorer } from "./explorer";

const meta: Meta<typeof Explorer> = {
  title: "File/Explorer",
  component: Explorer,
  tags: ["autodocs"],
};

export default meta;

const file: File = {
  id: "1",
  name: "Folder",
  path: "/",
  type: "folder",
  children: [
    {
      id: "2",
      name: "File 1",
      path: "/",
      type: "file",
      parentId: "1",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "3",
      name: "File 2",
      path: "/",
      type: "file",
      parentId: "1",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "4",
      name: "File 3",
      path: "/",
      type: "file",
      parentId: "1",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  parentId: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const files: File[] = [file, file, file];

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { files },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByText("Folder")[0]).toBeVisible();
    await userEvent.click(canvas.getAllByText("Folder")[0]);
    await expect(canvas.getAllByText("File 1")[0]).toBeVisible();
    await expect(canvas.getAllByText("File 2")[0]).toBeVisible();
    await expect(canvas.getAllByText("File 3")[0]).toBeVisible();
  },
};
