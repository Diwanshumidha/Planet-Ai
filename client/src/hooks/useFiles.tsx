import {
  TResponseFile,
  responseFileSchema,
  validFileTypeSchema,
} from "@/lib/schemas/files.schema";
import { useMutation } from "react-query";
import { toast } from "sonner";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface FileState {
  files: TResponseFile[];
  currentFile: TResponseFile | null;
  setCurrentFile: (file: TResponseFile) => void;
  addFileToStore: (file: TResponseFile) => void;
  removeFileFromStore: (fileId: string) => void;
}

const useFilesStore = create<FileState>()(
  devtools(
    persist(
      (set) => ({
        files: [],
        currentFile: null,
        setCurrentFile: (file) =>
          set((state) => ({ ...state, currentFile: file })),
        addFileToStore: (file) =>
          set((state) => ({ files: [...state.files, file] })),
        removeFileFromStore: (fileId) => {
          set((state) => {
            const newFiles = state.files.filter((f) => f.fileId !== fileId);
            let newCurrentFile = state.currentFile;

            if (state.currentFile?.fileId === fileId) {
              newCurrentFile = newFiles.length > 0 ? newFiles[0] : null;
            }

            return {
              files: newFiles,
              currentFile: newCurrentFile,
            };
          });
        },
      }),
      { name: "files_store" }
    )
  )
);

const UseFiles = () => {
  const {
    addFileToStore,
    files,
    setCurrentFile,
    currentFile,
    removeFileFromStore,
  } = useFilesStore();

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
      toast.success("Successfully uploaded the File");
    },
    onError: (error) => {
      if (error instanceof Error) {
        console.log(error.message);
        toast.error(error.message);
      } else {
        toast.error("Something Went Wrong While uploading");
      }
    },
  });

  const { mutateAsync: deleteFileMutation } = useMutation({
    mutationKey: "deleteFile",
    mutationFn: async (fileId: string) => {
      const path = `${
        import.meta.env.VITE_SERVER_BASE_PATH
      }/file/delete/${fileId}`;
      toast.loading("Deleting The File");
      const res = await fetch(path, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete file");
      }
      const data = await res.json();
      if (!data.success) {
        throw new Error("Failed to delete file");
      }
      toast.dismiss();

      return fileId;
    },
    onSuccess: (fileId) => {
      removeFileFromStore(fileId);
      toast.success("Successfully deleted the File");
    },
  });

  const handleUploadFile = async (file: File) => {
    await uploadFileMutation(file);
  };

  const handleDeleteFile = async (file: TResponseFile) => {
    await deleteFileMutation(file.fileId);
  };

  const setCurrentFileById = async (id: string) => {
    const file = files.find((val) => val.fileId === id);
    if (file) {
      setCurrentFile(file);
    }
  };

  return {
    handleUploadFile,
    status,
    files,
    setCurrentFile,
    currentFile,
    setCurrentFileById,
    handleDeleteFile,
  };
};

export default UseFiles;
