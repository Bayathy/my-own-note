import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "@storybook/test";
import type { File } from "../types/file";
import { Folder } from "./folder";

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

export const OpenFile: Story = {
	args: { file, openFileId: "2" },
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// フォルダを展開
		await userEvent.click(canvas.getByText("Folder"));

		// 全てのファイルが表示されることを確認
		await expect(canvas.getByText("File 1")).toBeVisible();
		await expect(canvas.getByText("File 2")).toBeVisible();
		await expect(canvas.getByText("File 3")).toBeVisible();

		// openFileId="2"のファイル（File 1）がハイライトされていることを確認
		const file1Button = canvas.getByText("File 1").closest("button");
		expect(file1Button).toHaveClass("bg-muted");
	},
};
