import { ScrollArea } from "@radix-ui/react-scroll-area";
import Messages from "./components/Chat/Messages";
import MaxWidthWrapper from "./components/shared/MaxWidthWrapper";
import GenerationForm from "./components/Chat/GenerationForm";
import { ReactQueryDevtools } from "react-query/devtools";
import UseFiles from "./hooks/useFiles";
import { Button } from "./components/ui/button";
import UploadDialog from "./components/knowledgebase/uploadDialog";
import { PlusCircle } from "lucide-react";

const App = () => {
  const { currentFile } = UseFiles();
  return (
    <main className=" h-[calc(100svh-77px)] flex flex-col gap-3">
      <ScrollArea className=" flex-1 overflow-y-auto gutter  ">
        {!currentFile ? (
          <div className=" w-full h-full flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold">Welcome to Planet Ai</h1>
            <p className="">Please select a file to start chatting.</p>
            <UploadDialog>
              <Button
                variant={"outline"}
                className="gap-3 mt-3 sm:px-7 items-center font-semibold"
              >
                <PlusCircle size={18} />
                <p>Upload PDF To Chat</p>
              </Button>
            </UploadDialog>
          </div>
        ) : (
          <MaxWidthWrapper className=" pt-3 sm:pt-8">
            <Messages />
          </MaxWidthWrapper>
        )}
      </ScrollArea>
      <section className="sm:h-[100px] h-[150px]  ">
        <MaxWidthWrapper>
          <GenerationForm />
        </MaxWidthWrapper>
      </section>
      <ReactQueryDevtools initialIsOpen={false} />
    </main>
  );
};

export default App;
