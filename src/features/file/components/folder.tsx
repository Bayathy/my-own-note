import { ChevronDownIcon, ChevronRightIcon, FileIcon, FolderIcon } from "lucide-react";
import { type FC, useState } from "react";
import { cn } from "@/lib/utils";
import type { File } from "../types/file";

interface FolderProps {
  file: File;
  openFileId: string | null;
}

export const Folder: FC<FolderProps> = ({ file, openFileId }) => {
  const [isExpand, setExpand] = useState<boolean>(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setExpand(!isExpand)}
        className={cn("my-1 flex w-full gap-1 rounded-md p-1 hover:bg-muted", {
          "pl-6": file.parentId,
          "bg-muted": openFileId === file.id,
        })}
      >
        {file.type === "folder" &&
          (isExpand ? <ChevronDownIcon className="size-5" /> : <ChevronRightIcon className="size-5" />)}
        <div className="flex items-center gap-2">
          {file.type === "folder" && <FolderIcon className="size-5" />}
          {file.type === "file" && <FileIcon className="size-5" />}
          <p>{file.name}</p>
        </div>
      </button>
      {isExpand && file.children?.map((child) => <Folder key={child.id} file={child} openFileId={openFileId} />)}
    </>
  );
};
