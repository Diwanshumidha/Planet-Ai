import { TMessage } from "@/types/message";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
const messages: TMessage[] = [
  {
    by: "user",
    text: "Hello! How are you doing today? I am doing quite well, just wanted to check in and see how things are on your end.",
    timestamp: 1685977200000,
  },
  {
    by: "chatbot",
    text: "Hello! I am functioning perfectly fine. Thank you for asking. How can I assist you today? I am here to help with any questions you might have.",
    timestamp: 1685977260000,
  },
  {
    by: "user",
    text: "I've been curious about the weather today. Could you tell me what the weather is like in my area? I am planning to go out and would like to be prepared.",
    timestamp: 1685977320000,
  },
  {
    by: "chatbot",
    text: "Certainly! The weather in your area is expected to be sunny with a slight chance of rain in the afternoon. It's a good idea to carry an umbrella just in case.",
    timestamp: 1685977380000,
  },
  {
    by: "user",
    text: "That's very helpful, thank you. Also, I've been looking for a good book to read. Could you recommend something interesting and engaging?",
    timestamp: 1685977440000,
  },
  {
    by: "chatbot",
    text: "Of course! I highly recommend 'To Kill a Mockingbird' by Harper Lee. It's a classic novel that offers profound insights and compelling storytelling.",
    timestamp: 1685977500000,
  },
  {
    by: "user",
    text: "That sounds like a great suggestion. I have heard good things about that book. I will definitely check it out. Thank you for the recommendation!",
    timestamp: 1685977560000,
  },
  {
    by: "chatbot",
    text: "You're welcome! I'm glad I could help. If you have any other questions or need further assistance, feel free to ask. I'm here to help.",
    timestamp: 1685977620000,
  },
  {
    by: "user",
    text: "I think that's all I needed for now. You've been very helpful. I appreciate your assistance. Have a wonderful day!",
    timestamp: 1685977680000,
  },
  {
    by: "chatbot",
    text: "Thank you! I'm glad I could assist you. Have a great day ahead! If you need anything else in the future, don't hesitate to reach out.",
    timestamp: 1685977740000,
  },
];

const Messages = () => {
  return (
    <div className="px-4 flex flex-col gap-5">
      {messages.map((message) => (
        <Message message={message} />
      ))}
    </div>
  );
};

export default Messages;

type MessageProps = {
  message: TMessage;
};
const Message = ({ message }: MessageProps) => {
  return (
    <div className="flex py-5 items-center  gap-3 ">
      <div className=" self-start py-3">
        {message.by === "user" ? (
          <Avatar>
            <AvatarFallback className="bg-purple-400  text-white font-semibold">
              S
            </AvatarFallback>
          </Avatar>
        ) : null}

        {message.by === "chatbot" ? (
          <Avatar>
            <AvatarImage
              src="/logo_icon.svg"
              aria-label="Chatbot Logo"
              alt="C"
            />
            <AvatarFallback className="bg-green-400 text-white font-semibold">
              Chatbot
            </AvatarFallback>
          </Avatar>
        ) : null}
      </div>

      <p className=" font-medium">{message.text}</p>
    </div>
  );
};
