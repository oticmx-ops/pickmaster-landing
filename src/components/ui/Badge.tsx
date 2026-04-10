import React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "success" | "warning" | "info" | "error";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    "bg-surface-elevated text-text-secondary border border-border",
  success:
    "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  warning:
    "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  info:
    "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  error:
    "bg-red-500/10 text-red-400 border border-red-500/20",
};

const dotStyles: Record<BadgeVariant, string> = {
  default: "bg-text-secondary",
  success: "bg-emerald-400",
  warning: "bg-amber-400",
  info: "bg-blue-400",
  error: "bg-red-400",
};

export default function Badge({
  variant = "default",
  children,
  className,
  dot = false,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        variantStyles[variant],
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full flex-shrink-0",
            dotStyles[variant]
          )}
        />
      )}
      {children}
    </span>
  );
}
