import type { File } from "../types/file";
import { Folder } from "./folder";

interface ExplorerProps {
  files: File[];
}

export const Explorer = ({ files }: ExplorerProps) => {
  return (
    <div>
      {files.map((file) => (
        <Folder key={file.id} file={file} />
      ))}
    </div>
  );
};
