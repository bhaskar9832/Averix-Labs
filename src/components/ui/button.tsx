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
  outline: "border border-slate-300 hover:border-slate-400 text-slate-700 bg-transparent",
  ghost: "hover:bg-slate-100 text-slate-700 bg-transparent",
  secondary: "bg-slate-100 hover:bg-slate-200 text-slate-900",
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
