import { SendHorizonal } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const GenerationForm = () => {
  return (
    <div>
      <form className=" w-full relative h-max ">
        <Input
          className=" h-[45px] sm:h-[55px] disabled:bg-input rounded-xl shadow-sm disabled:shadow-none"
          placeholder="Send a Message....."
        />
        <Button
          variant={"ghost"}
          className=" absolute right-5 top-1/2 translate-y-[-50%] disabled:text-[#222222]  text-foreground/90"
        >
          <SendHorizonal />
        </Button>
      </form>
    </div>
  );
};

export default GenerationForm;
