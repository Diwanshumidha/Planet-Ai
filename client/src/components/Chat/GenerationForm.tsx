import { SendHorizonal } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import useMessages from "@/hooks/useMessages";
import UseFiles from "@/hooks/useFiles";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { truncateFilename } from "@/lib/utils";

const GenerationForm = () => {
  const [message, setMessage] = useState("");
  const { GenerateMessage, status } = useMessages();
  const { currentFile } = UseFiles();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentFile) {
      console.log(message);
      GenerateMessage(message, currentFile);
      setMessage("");
    }
  };

  return (
    <div>
      <form
        onSubmit={onSubmit}
        className=" w-full relative h-max flex gap-4 flex-col sm:flex-row items-center"
      >
        <SelectFile />
        <div className="w-full flex gap-3 items-center ">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className=" h-[45px] flex-1 sm:h-[55px] disabled:bg-input rounded-xl shadow-sm disabled:shadow-none"
            placeholder="Send a Message....."
            disabled={!currentFile}
          />
          <Button
            variant={"ghost"}
            disabled={
              !currentFile || status === "loading" || message.trim().length <= 1
            }
            type="submit"
            className=" sm:absolute sm:right-5 sm:top-1/2 sm:translate-y-[-50%] disabled:text-[#222222] max-sm:bg-input max-sm:h-full  text-foreground/90"
          >
            <SendHorizonal />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default GenerationForm;

const SelectFile = () => {
  const { files, currentFile, setCurrentFileById } = UseFiles();
  return (
    <Select
      value={currentFile?.fileId}
      onValueChange={(value) => setCurrentFileById(value)}
    >
      <SelectTrigger className=" w-full sm:w-[180px]  h-[45px] sm:h-[55px] rounded-xl  ">
        <SelectValue placeholder="Select a File" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select File</SelectLabel>
          {files.map((file) => {
            return (
              <SelectItem
                value={file.fileId}
                key={file.fileId}
                className="truncate "
              >
                @ {truncateFilename(file.filename)}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
