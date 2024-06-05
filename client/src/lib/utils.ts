import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncateFilename = (filename: string) => {
  return filename.length > 30 ? `${filename.slice(0, 30)}...` : filename;
};
