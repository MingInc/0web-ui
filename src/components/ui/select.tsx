import * as React from "react"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils" // Assuming you have a utility function for classNames

interface SelectProps {
  value: string
  onChange: (value: string) => void
  children: React.ReactNode
}

const Select = ({ value, onChange, children }: SelectProps) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const toggleDropdown = () => setIsOpen(!isOpen)

  return (
    <div className="relative w-full">
      {/* Trigger */}
      <button
        onClick={toggleDropdown}
        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span>{value || "Select..."}</span>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <div
          className="absolute z-50 w-full max-h-96 mt-2 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md"
        >
          <div className="p-1 max-h-[var(--dropdown-height)]">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

interface SelectItemProps {
  value: string
  children: React.ReactNode
  onSelect: (value: string) => void
  isSelected: boolean
}

const SelectItem = ({
  value,
  children,
  onSelect,
  isSelected,
}: SelectItemProps) => (
  <button
    onClick={() => onSelect(value)}
    className={`relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none ${
      isSelected ? "bg-accent text-accent-foreground" : "text-muted"
    }`}
  >
    {isSelected && (
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <Check className="h-4 w-4" />
      </span>
    )}
    <span>{children}</span>
  </button>
)

const SelectGroup = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
)

const SelectValue = ({ value }: { value: string }) => (
  <span>{value}</span>
)

const SelectTrigger = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
)

const SelectScrollUpButton = () => (
  <div className="flex cursor-default items-center justify-center py-1">
    <ChevronUp className="h-4 w-4" />
  </div>
)

const SelectScrollDownButton = () => (
  <div className="flex cursor-default items-center justify-center py-1">
    <ChevronDown className="h-4 w-4" />
  </div>
)

const SelectLabel = ({ children }: { children: React.ReactNode }) => (
  <label className="py-1.5 pl-8 pr-2 text-sm font-semibold">{children}</label>
)

const SelectSeparator = () => (
  <div className="-mx-1 my-1 h-px bg-muted" />
)

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
