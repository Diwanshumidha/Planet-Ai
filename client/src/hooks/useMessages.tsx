import { TResponseFile } from "@/lib/schemas/files.schema";
import { TMessage } from "@/types/message";

import { useMutation } from "react-query";
import { toast } from "sonner";

import { create } from "zustand";

interface MessageState {
  messages: TMessage[];
  status: string;
  setStatus: (status: string) => void;
  addMessageToStore: (message: TMessage) => void;
  removeMessageFromStore: (message: TMessage) => void;
}

const useMessageStore = create<MessageState>()((set) => ({
  messages: [],
  addMessageToStore(message) {
    set((state) => ({ messages: [...state.messages, message] }));
  },
  removeMessageFromStore(message) {
    set((state) => ({
      messages: state.messages.filter((m) => m.id !== message.id),
    }));
  },
  status: "idle",
  setStatus(status) {
    set({ status });
  },
}));

const useMessages = () => {
  const { addMessageToStore, messages, setStatus, status } = useMessageStore();

  const { mutateAsync: sendMessage } = useMutation({
    mutationKey: "generate_message",
    mutationFn: async ({
      message,
      includedFile,
    }: {
      message: string;
      includedFile: TResponseFile;
    }) => {
      const path = `${import.meta.env.VITE_SERVER_BASE_PATH}/answer`;
      const res = await fetch(path, {
        method: "POST",
        body: JSON.stringify({ message, filename: includedFile.fileId }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to upload file");
      }
      const data = await res.json();
      console.log(data);
      if ("error" in data || !data.success) {
        throw new Error(data.error);
      }

      addMessageToStore({
        by: "chatbot",
        id: crypto.randomUUID(),
        text: data.answer,
        timestamp: new Date().getTime(),
      });

      return data;
    },
    onSuccess: async () => {
      setStatus("success");
    },
    onError: (error) => {
      setStatus("error");
      if (error instanceof Error) {
        console.log(error.message);
        toast.error(error.message);
        addMessageToStore({
          by: "error",
          id: crypto.randomUUID(),
          text: "There Was an Issue While Generating The Message",
          timestamp: new Date().getTime(),
        });
      } else {
        toast.error("Something Went Wrong ");
      }
    },
    onSettled: () => {
      setStatus("idle");
    },
  });

  const GenerateMessage = async (
    message: string,
    includedFile: TResponseFile
  ) => {
    addMessageToStore({
      by: "user",
      id: crypto.randomUUID(),
      text: message,
      timestamp: Date.now(),
    });
    setStatus("loading");
    await sendMessage({ message, includedFile });
  };

  return { GenerateMessage, status, messages };
};

export default useMessages;
