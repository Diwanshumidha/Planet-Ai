import { z } from "zod";
import { ALLOWED_TYPES } from "../constant";

export const validFileTypeSchema = z
  .instanceof(File)
  .refine((file) => {
    return ALLOWED_TYPES.includes(file.type);
  })
  .refine((file) => {
    // MAX size 20MB
    return file.size <= 20 * 1024 * 1024;
  });

export const responseFileSchema = z.object({
  filename: z.string().min(1),
  fileId: z.string().min(1),
});

export type TResponseFile = z.infer<typeof responseFileSchema>;
