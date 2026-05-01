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
    "bg-[#4F7FFF] hover:bg-[#3B6FF5] text-white border border-[#6E94FF]/30 hover:border-[#6E94FF]/60 shadow-[0_1px_0_rgba(255,255,255,0.2)_inset,0_8px_24px_rgba(59,111,245,0.35)] hover:shadow-[0_1px_0_rgba(255,255,255,0.28)_inset,0_16px_40px_rgba(59,111,245,0.65),0_0_0_3px_rgba(79,127,255,0.18)] hover:scale-[1.025] active:scale-[0.97]",
  secondary:
    "bg-[#151B2E] hover:bg-[#1A2235] text-white border border-[#1A2035] hover:border-[#2A3150]",
  ghost:
    "bg-transparent hover:bg-[#151B2E]/80 text-[#E5E9F0] hover:text-white border border-[#1A2035] hover:border-[#4F7FFF]/40",
  outline:
    "bg-transparent hover:bg-[#4F7FFF]/8 text-[#6E94FF] border border-[#4F7FFF]/40 hover:border-[#4F7FFF]/70",
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
