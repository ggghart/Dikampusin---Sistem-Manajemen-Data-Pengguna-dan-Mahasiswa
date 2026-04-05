import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    const variants = {
      primary: "bg-[var(--color-primary)] text-[var(--color-background)] hover:bg-[var(--color-primary-hover)] shadow-md hover:shadow-lg",
      secondary: "bg-[var(--color-glass-bg)] border border-[var(--color-glass-border)] text-[var(--color-foreground)] hover:bg-white/50 dark:hover:bg-black/20",
      danger: "bg-red-500 text-white hover:bg-red-600 shadow-md",
      ghost: "hover:bg-black/5 dark:hover:bg-white/10 text-[var(--color-foreground)]"
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
