import * as React from "react"
import { cn } from "@/lib/utils" // Assuming you have a utility function for classNames.

const Separator = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement> & { orientation?: "horizontal" | "vertical"; decorative?: boolean }
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => {
    if (!decorative) return null; // Don't render if the separator is not decorative.
    
    return (
      <div
        ref={ref}
        className={cn(
          "shrink-0 bg-border",
          orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
          className
        )}
        {...props}
      />
    )
  }
)

Separator.displayName = "Separator"

export { Separator }
