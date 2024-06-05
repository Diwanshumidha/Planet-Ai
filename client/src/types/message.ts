export type TMessage = {
  id: string;
  text: string;
  timestamp: number;
  by: "user" | "chatbot" | "error";
};
