import * as React from "react";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

interface InputProps extends React.ComponentProps<"input"> {
  containerClassName?: string;
  startAdornment?: React.ReactNode;
}
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, containerClassName, startAdornment, type, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex h-12 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-kumi-gray-300  ring-offset-background focus-within:ring-2 md:text-sm",
          props.disabled && "cursor-not-allowed opacity-50",
          containerClassName,
        )}
      >
        {startAdornment}
        <input
          type={type}
          className={cn(
            "w-full bg-transparent p-0 placeholder:text-kumi-gray-300  focus-visible:outline-none disabled:cursor-not-allowed",
            startAdornment && "ml-2",
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
