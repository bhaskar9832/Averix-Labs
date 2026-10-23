// Simple button component — no external dependencies
// All pages use Tailwind classes directly for full control

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "sm" | "default" | "lg";
  asChild?: boolean;
}

const variantClasses: Record<string, string> = {
  default: "bg-blue-600 hover:bg-blue-700 text-white",
  outline: "border border-border hover:border-muted-foreground text-foreground bg-transparent",
  ghost: "hover:bg-secondary text-foreground bg-transparent",
  secondary: "bg-secondary hover:bg-muted text-foreground",
};

const sizeClasses: Record<string, string> = {
  sm: "h-8 px-3 text-xs",
  default: "h-10 px-4 py-2 text-sm",
  lg: "h-12 px-8 text-base",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", children, ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
