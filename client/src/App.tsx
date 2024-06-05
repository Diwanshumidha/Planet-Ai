import { ScrollArea } from "@radix-ui/react-scroll-area";
import Messages from "./components/Chat/Messages";
import MaxWidthWrapper from "./components/shared/MaxWidthWrapper";
import GenerationForm from "./components/Chat/GenerationForm";

const App = () => {
  return (
    <main className=" h-[calc(100svh-77px)] flex flex-col gap-3">
      <ScrollArea className=" flex-1 overflow-y-auto  ">
        <MaxWidthWrapper className=" pt-3 sm:pt-8">
          <Messages />
        </MaxWidthWrapper>
      </ScrollArea>
      <section className="sm:h-[100px] h-[70px]  ">
        <MaxWidthWrapper>
          <GenerationForm />
        </MaxWidthWrapper>
      </section>
    </main>
  );
};

export default App;
