import * as React from "react"
import { cn } from "@/lib/utils" // Assuming you still have a utility function for classNames

// Basic Tab Component
const Tabs = ({ children }: { children: (props: { activeTab: number; handleTabClick: (index: number) => void }) => React.ReactNode }) => {
  const [activeTab, setActiveTab] = React.useState(0)
  const handleTabClick = (index: number) => setActiveTab(index)

  return (
    <div>
      {children({ activeTab, handleTabClick })}
    </div>
  )
}

// TabsList Component
const TabsList = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
))

TabsList.displayName = "TabsList"

// TabsTrigger Component
const TabsTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { index: number; activeTab: number; onClick: (index: number) => void }
>(({ className, index, activeTab, onClick, ...props }, ref) => (
  <button
    ref={ref}
    onClick={() => onClick(index)}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      activeTab === index ? "bg-background text-foreground shadow-sm" : "",
      className
    )}
    {...props}
  />
))

TabsTrigger.displayName = "TabsTrigger"

// TabsContent Component
const TabsContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))

TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsTrigger, TabsContent }
