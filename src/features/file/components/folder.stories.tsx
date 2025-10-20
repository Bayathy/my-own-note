import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Folder } from "./folder";
import { within, userEvent, expect } from "@storybook/test";
import type { File } from "../types/file";

const meta: Meta<typeof Folder> = {
  title: "File/Folder",
  component: Folder,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

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

export const Default: Story = {
  args: { file },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Click the folder to expand it
    await userEvent.click(canvas.getByText("Folder"));

    // Check if the files are visible
    await expect(canvas.getByText("File 1")).toBeVisible();
    await expect(canvas.getByText("File 2")).toBeVisible();
    await expect(canvas.getByText("File 3")).toBeVisible();
  },
};
