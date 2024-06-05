import { TMessage } from "@/types/message";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import useMessages from "@/hooks/useMessages";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import Markdown from "react-markdown";

const Messages = () => {
  const { messages, status } = useMessages();
  const bottomDivRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (bottomDivRef) {
      bottomDivRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="px-4 flex flex-col gap-5">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}

      {status === "loading" ? (
        <div className="flex py-2 items-center  gap-3 ">
          <div className=" self-start py-3">
            <Avatar>
              <AvatarImage
                src="/logo_icon.svg"
                aria-label="Chatbot Logo"
                alt="Chatbot"
              />
              <AvatarFallback className="bg-green-400 text-white font-semibold">
                C
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="loader"></div>
        </div>
      ) : null}

      <div ref={bottomDivRef}></div>
    </div>
  );
};

export default Messages;

type MessageProps = {
  message: TMessage;
};
const Message = ({ message }: MessageProps) => {
  return (
    <div className="flex py-2 items-center  gap-3 ">
      <div className=" self-start py-3">
        {message.by === "user" ? (
          <Avatar>
            <AvatarFallback className="bg-purple-400  text-white font-semibold">
              S
            </AvatarFallback>
          </Avatar>
        ) : null}

        {message.by === "chatbot" || message.by === "error" ? (
          <Avatar>
            <AvatarImage
              src="/logo_icon.svg"
              aria-label="Chatbot Logo"
              alt="Chatbot"
            />
            <AvatarFallback className="bg-green-400 text-white font-semibold">
              C
            </AvatarFallback>
          </Avatar>
        ) : null}
      </div>

      <Markdown
        className={cn(
          " font-medium",
          message.by === "error" ? "text-red-500" : null
        )}
      >
        {message.text}
      </Markdown>
    </div>
  );
};
