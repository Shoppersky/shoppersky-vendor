"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"

interface ToggleSwitchProps extends React.HTMLAttributes<HTMLDivElement> {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  disabled?: boolean
}

export function ToggleSwitch({ checked, onCheckedChange, disabled = false, className, ...props }: ToggleSwitchProps) {
  return (
    <div
      className={cn(
        "relative inline-flex h-8 w-16 cursor-pointer rounded-full transition-colors",
        checked ? "bg-green-600" : "bg-red-600",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
      onClick={() => !disabled && onCheckedChange(!checked)}
      {...props}
    >
      <span
        className={cn(
          "absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition-transform",
          checked && "translate-x-8",
        )}
      />
      <span className="flex h-full w-full items-center">
        <span
          className={cn(
            "flex w-full items-center justify-center text-xs font-medium text-white",
            checked ? "pl-1" : "pr-1",
          )}
        >
          {checked ? "ON" : "OFF"}
        </span>
      </span>
    </div>
  )
}
