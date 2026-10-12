"use client";

import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  function toggleTheme() {
    const theme = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("averix-theme", theme);
    } catch {
      // The theme still changes when browser storage is unavailable.
    }
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Change color theme"
      title="Change color theme"
      className="inline-flex shrink-0 items-center justify-center rounded-lg border border-border bg-card p-2.5 text-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
    >
      <span className="theme-light-option items-center gap-2"><Sun size={18} aria-hidden="true" />{!compact && <span className="hidden lg:inline text-xs font-medium">Light mode</span>}</span>
      <span className="theme-dark-option items-center gap-2"><Moon size={18} aria-hidden="true" />{!compact && <span className="hidden lg:inline text-xs font-medium">Dark mode</span>}</span>
    </button>
  );
}
