import { useState } from "react";
import type { File } from "../types/file";
import { Folder } from "./folder";

interface ExplorerProps {
	files: File[];
}

export const Explorer = ({ files }: ExplorerProps) => {
	const [openFileId, _setOpenFileId] = useState<string | null>(null);

	return (
		<div>
			{files.map((file) => (
				<Folder key={file.id} file={file} openFileId={openFileId} />
			))}
		</div>
	);
};
