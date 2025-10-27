export type FileType = "file" | "folder";

export type File = {
	id: string;
	name: string;
	path: string;
	type: FileType;
	children?: File[];
	parentId: string | null;
	createdAt: Date;
	updatedAt: Date;
};
