import { cn } from "@/lib/utils";

type HTMLDivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const MaxWidthWrapper = ({
  className,
  children,
  ...remaining
}: HTMLDivProps) => {
  return (
    <div
      className={cn(" max-w-[1400px] px-2 sm:px-5 mx-auto", className)}
      {...remaining}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
