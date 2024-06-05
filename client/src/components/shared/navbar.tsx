import { File, PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import Icons from "./Icons";
import MaxWidthWrapper from "./MaxWidthWrapper";
import UploadDialog from "../knowledgebase/uploadDialog";
import UseFiles from "@/hooks/useFiles";

const Navbar = () => {
  const { currentFile } = UseFiles();
  return (
    <header className=" h-[77px] w-full shadow-sm border-b-border border-solid border-[1px]">
      <MaxWidthWrapper className="flex h-full justify-between items-center">
        <div>
          <Icons.wideLogo />
        </div>
        <div className=" flex items-center  h-full gap-5">
          <div className="text-primary max-sm:text-xs flex-col sm:flex-row  flex items-center sm:gap-2">
            <div className=" p-2 border-solid   rounded-md border-primary/50 border-[1px]">
              <File size={20} className=" size-3 sm:size-4" />
            </div>
            <p>{currentFile?.filename}</p>
          </div>
          <UploadDialog>
            <Button
              variant={"outline"}
              className="gap-3  sm:px-7 items-center font-semibold"
            >
              <PlusCircle size={18} />
              <p className=" hidden sm:block">Upload PDF</p>
            </Button>
          </UploadDialog>
        </div>
      </MaxWidthWrapper>
    </header>
  );
};

export default Navbar;
