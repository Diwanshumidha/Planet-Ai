import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import UseFiles from "@/hooks/useFiles";
import { TResponseFile } from "@/lib/schemas/files.schema";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import UploadDialog from "./uploadDialog";
import { PlusCircle, Trash } from "lucide-react";

export function FilesSheet({ children }: { children: React.ReactNode }) {
  const { files, handleDeleteFile } = UseFiles();
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>You Files</SheetTitle>
          <SheetDescription>
            Here is the list of all of your files that are trained
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-2 py-4 ">
          {files.map((file) => {
            return (
              <FileRow
                handleDeleteFile={handleDeleteFile}
                file={file}
                key={file.fileId}
              />
            );
          })}
        </div>

        <SheetFooter>
          <UploadDialog>
            <Button
              variant={"outline"}
              className="gap-3  sm:px-7 items-center font-semibold"
            >
              <PlusCircle size={18} />
              <p>Upload More PDF</p>
            </Button>
          </UploadDialog>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

const FileRow = ({
  file,
  handleDeleteFile,
}: {
  file: TResponseFile;
  handleDeleteFile: (file: TResponseFile) => void;
}) => {
  const { currentFile, setCurrentFile } = UseFiles();
  return (
    <div className="flex w-full items-center gap-1 ">
      <button
        onClick={() => setCurrentFile(file)}
        className={cn(
          "px-4 py-3 flex-1 rounded-md text-left",
          currentFile?.fileId === file.fileId ? "bg-input" : "hover:bg-input/60"
        )}
      >
        {file.filename}
      </button>
      <Button
        variant={"ghost"}
        onClick={() => handleDeleteFile(file)}
        className="text-red-500 hover:text-white  hover:bg-destructive"
      >
        <Trash size={18} />
      </Button>
    </div>
  );
};
