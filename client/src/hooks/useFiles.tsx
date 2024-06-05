import {
  TResponseFile,
  responseFileSchema,
  validFileTypeSchema,
} from "@/lib/schemas/files.schema";
import { useMutation } from "react-query";

import { create } from "zustand";

interface FileState {
  files: TResponseFile[];
  currentFile: TResponseFile | null;
  setCurrentFile: (file: TResponseFile) => void;
  addFileToStore: (file: TResponseFile) => void;
  removeFileFromStore: (file: TResponseFile) => void;
}

const useFilesStore = create<FileState>()((set) => ({
  files: [],
  currentFile: null,
  setCurrentFile: (file) => set((state) => ({ ...state, currentFile: file })),
  addFileToStore: (file) => set((state) => ({ files: [...state.files, file] })),
  removeFileFromStore: (file) =>
    set((state) => ({
      files: state.files.filter((f) => f.fileId !== file.fileId),
    })),
}));

const UseFiles = () => {
  const { addFileToStore, files, setCurrentFile, currentFile } =
    useFilesStore();
  const { mutateAsync: uploadFileMutation, status } = useMutation({
    mutationKey: "upload_file",
    mutationFn: async (file: File) => {
      const parsed = validFileTypeSchema.safeParse(file);
      if (!parsed.success) {
        console.log(parsed.error);
        throw new Error("Only Pdf, Docx and Txt is Allowed");
      }

      const path = `${import.meta.env.VITE_SERVER_BASE_PATH}/file/upload`;
      const formData = new FormData();
      formData.append("file", parsed.data);

      const res = await fetch(path, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        throw new Error("Failed to upload file");
      }

      const data = await res.json();
      console.log(data);
      if ("error" in data) {
        throw new Error(data.error);
      }
      console.log({ data });

      const parsedResponse = responseFileSchema.safeParse(data.metadata);
      console.log({ parsedResponse });
      if (!parsedResponse.success) {
        console.log(parsedResponse.error);
        throw new Error("Something Went Wrong");
      }

      return parsedResponse.data;
    },
    onSuccess: async (ResponseFile) => {
      setCurrentFile(ResponseFile);
      addFileToStore(ResponseFile);
      alert("successfully uploaded the file");
    },
    onError: (error) => {
      if (error instanceof Error) {
        console.log(error.message);
        alert(error.message);
      } else {
        alert("Something Went Wrong While uploading");
      }
    },
  });

  const handleUploadFile = async (file: File) => {
    await uploadFileMutation(file);
  };

  return {
    handleUploadFile,
    status,
    files,
    setCurrentFile,
    currentFile,
  };
};

export default UseFiles;
