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

export default function UploadDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px] max-sm:w-[95%]">
          <DialogHeader>
            <DialogTitle>Upload The File</DialogTitle>
            <DialogDescription>
              Please select the file you want to ask questions from.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className=" space-y-1">
              <Label htmlFor="name" className="text-right">
                File
              </Label>
              <Input id="name" type="file" className="col-span-3" />
              <p className="text-xs text-foreground/35">
                supported files are PDF, Docx and Txt
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
