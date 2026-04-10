"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

type ButtonBaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  href?: string;
};

type ButtonProps =
  | (ButtonBaseProps & React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined })
  | (ButtonBaseProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string });

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#2563EB] hover:bg-[#1D4ED8] text-white border border-[#3B82F6]/30 hover:border-[#3B82F6]/50 shadow-[0_0_24px_rgba(37,99,235,0.3)] hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] active:shadow-[0_0_16px_rgba(37,99,235,0.2)]",
  secondary:
    "bg-[#1F2937] hover:bg-[#374151] text-white border border-[#374151] hover:border-[#4B5563]",
  ghost:
    "bg-transparent hover:bg-[#1F2937]/60 text-[#D1D5DB] hover:text-white border border-transparent hover:border-[#1F2937]",
  outline:
    "bg-transparent hover:bg-[#2563EB]/8 text-[#3B82F6] border border-[#2563EB]/40 hover:border-[#2563EB]/70",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm gap-1.5 rounded-lg",
  md: "h-10 px-5 text-sm gap-2 rounded-xl",
  lg: "h-12 px-7 text-base gap-2.5 rounded-xl",
};

const baseClass = (variant: ButtonVariant, size: ButtonSize, className?: string) =>
  cn(
    "inline-flex items-center justify-center font-medium transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background",
    "hover:-translate-y-px active:scale-[0.98] active:translate-y-0",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

export default function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    loading = false,
    iconLeft,
    iconRight,
    children,
    className,
    href,
    ...rest
  } = props;

  const content = (
    <>
      {loading ? (
        <Loader2 className="animate-spin" size={size === "sm" ? 14 : 16} />
      ) : (
        iconLeft && <span className="flex-shrink-0">{iconLeft}</span>
      )}
      <span>{children}</span>
      {!loading && iconRight && <span className="flex-shrink-0">{iconRight}</span>}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={baseClass(variant, size, className)}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  const { disabled, ...buttonRest } = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  const isDisabled = disabled || loading;

  return (
    <button
      className={cn(
        baseClass(variant, size, className),
        "disabled:opacity-50 disabled:cursor-not-allowed"
      )}
      disabled={isDisabled}
      {...buttonRest}
    >
      {content}
    </button>
  );
}
