import {
  ChevronDownIcon,
  ChevronRightIcon,
  FileIcon,
  FolderIcon,
} from "lucide-react";
import { type FC, useState } from "react";
import type { File } from "../types/file";
import { cn } from "@/lib/utils";

interface FolderProps {
  file: File;
}

export const Folder: FC<FolderProps> = ({ file }) => {
  const [isExpand, setExpand] = useState<boolean>(false);

  return (
    <div
      className={cn("flex flex-col", {
        "ml-6": file.parentId,
      })}
    >
      <button
        type="button"
        onClick={() => setExpand(!isExpand)}
        className="flex items-center gap-1 hover:bg-muted rounded-md p-1"
      >
        {file.type === "folder" &&
          (isExpand ? (
            <ChevronDownIcon className="size-5" />
          ) : (
            <ChevronRightIcon className="size-5" />
          ))}
        <div className="flex items-center gap-2">
          {file.type === "folder" && <FolderIcon className="size-5" />}
          {file.type === "file" && <FileIcon className="size-5" />}
          <p>{file.name}</p>
        </div>
      </button>
      {isExpand &&
        file.children?.map((child) => <Folder key={child.id} file={child} />)}
    </div>
  );
};
