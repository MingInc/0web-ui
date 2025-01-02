import * as React from "react"
import { cn } from "@/lib/utils" // Assuming you have a utility function for classNames
import { X } from "lucide-react"

// Overlay Component
const SheetOverlay = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 bg-black/80 transition-opacity duration-300",
        className
      )}
      {...props}
    />
  )
)
SheetOverlay.displayName = "SheetOverlay"

// Sheet content variants (side positioning)
const sheetVariants = (side: "top" | "bottom" | "left" | "right") => {
  switch (side) {
    case "top":
      return "inset-x-0 top-0 border-b slide-in-from-top slide-out-to-top";
    case "bottom":
      return "inset-x-0 bottom-0 border-t slide-in-from-bottom slide-out-to-bottom";
    case "left":
      return "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm slide-in-from-left slide-out-to-left";
    case "right":
    default:
      return "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm slide-in-from-right slide-out-to-right";
  }
}

interface SheetContentProps {
  side?: "top" | "bottom" | "left" | "right"
  isOpen: boolean
  onClose: () => void
  className?: string
  children?: React.ReactNode
}

// SheetContent component
const SheetContent = ({
  side = "right",
  isOpen,
  onClose,
  className,
  children,
}: SheetContentProps) => (
  <div>
    {/* Overlay */}
    {isOpen && <SheetOverlay onClick={onClose} />}

    {/* Sheet content */}
    <div
      className={cn(
        "fixed z-50 gap-4 bg-background p-6 shadow-lg transition-all duration-500 ease-in-out",
        sheetVariants(side),
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        className
      )}
    >
      {children}

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </button>
    </div>
  </div>
)

SheetContent.displayName = "SheetContent"

// SheetHeader component
const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
)
SheetHeader.displayName = "SheetHeader"

// SheetFooter component
const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
)
SheetFooter.displayName = "SheetFooter"

// SheetTitle component
const SheetTitle = React.forwardRef<React.ElementRef<"h2">, React.HTMLProps<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2 ref={ref} className={cn("text-lg font-semibold text-foreground", className)} {...props} />
  )
)
SheetTitle.displayName = "SheetTitle"

// SheetDescription component
const SheetDescription = React.forwardRef<React.ElementRef<"p">, React.HTMLProps<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
)
SheetDescription.displayName = "SheetDescription"

// Main Sheet component that controls visibility
const Sheet = ({
  isOpen,
  onClose,
  side,
  children,
}: {
  isOpen: boolean
  onClose: () => void
  side?: "top" | "bottom" | "left" | "right"
  children: React.ReactNode
}) => (
  <div>
    {/* SheetContent */}
    <SheetContent isOpen={isOpen} onClose={onClose} side={side}>
      {children}
    </SheetContent>
  </div>
)

export {
  Sheet,
  SheetOverlay,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
