"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"

interface ToggleSwitchProps extends React.HTMLAttributes<HTMLDivElement> {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  disabled?: boolean
}

export function ToggleSwitch({
  checked,
  onCheckedChange,
  disabled = false,
  className,
  ...props
}: ToggleSwitchProps) {
  return (
    <div
      className={cn(
        "relative inline-flex cursor-pointer rounded-full transition-colors",
        "h-6 w-12 sm:h-7 sm:w-14 md:h-8 md:w-16", // responsive size
        checked ? "bg-green-600" : "bg-red-600",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={() => !disabled && onCheckedChange(!checked)}
      {...props}
    >
      <span
        className={cn(
          "absolute left-1 top-1 flex items-center justify-center rounded-full bg-white transition-transform",
          "h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6", // responsive knob size
          checked && "translate-x-6 sm:translate-x-7 md:translate-x-8"
        )}
      />
      <span className="flex h-full w-full items-center">
        <span
          className={cn(
            "flex w-full items-center justify-center font-medium text-white",
            "text-[8px] sm:text-xs md:text-sm", // responsive text size
            checked ? "pl-1" : "pr-1"
          )}
        >
          {checked ? "ON" : "OFF"}
        </span>
      </span>
    </div>
  )
}
