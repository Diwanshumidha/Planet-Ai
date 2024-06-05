import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UseFiles from "@/hooks/useFiles";
import { Loader2 } from "lucide-react";
import { FormEvent, useState } from "react";

export default function UploadDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const { handleUploadFile, status } = UseFiles();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const file = formData.get("file") as File;
    if (file) {
      await handleUploadFile(file);
      setIsOpen(false);
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px] max-sm:w-[95%]">
          <DialogHeader>
            <DialogTitle>Upload The File</DialogTitle>
            <DialogDescription>
              Please select the file you want to ask questions from.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="space-y-1">
              <Label htmlFor="file" className="text-right">
                File
              </Label>
              <Input id="file" name="file" type="file" className="col-span-3" />

              <p className="text-xs text-foreground/35">
                Supported files are PDF, Docx, and Txt.
              </p>
            </div>
            <DialogFooter>
              <Button
                disabled={status === "loading"}
                type="submit"
                className="gap-3"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Uploading...
                  </>
                ) : (
                  "Upload File"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
