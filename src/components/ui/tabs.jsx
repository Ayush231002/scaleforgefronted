import * as React from "react"
import { cn } from "@/lib/utils"

const tabsVariants = {
  base: "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
  active: "bg-background text-foreground shadow-sm"
}

function Tabs({
  className,
  children,
  ...props
}) {
  return (
    <div
      data-slot="tabs"
      className={cn("w-full", className)}
      {...props}
    >
      {children}
    </div>
  )
}

function TabsList({
  className,
  children,
  ...props
}) {
  return (
    <div
      data-slot="tabs-list"
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function TabsTrigger({
  className,
  isActive = false,
  children,
  ...props
}) {
  return (
    <button
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isActive && "bg-background text-foreground shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

function TabsContent({
  className,
  children,
  ...props
}) {
  return (
    <div
      data-slot="tabs-content"
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
