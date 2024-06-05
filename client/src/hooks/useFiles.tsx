import { create } from "zustand";

type File = {
  filename: string;
  fileId: string;
};

interface BearState {
  files: number;
  increase: (by: number) => void;
}

const useFilesStore = create<BearState>()((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
}));
const UseFiles = () => {};

export default UseFiles;
