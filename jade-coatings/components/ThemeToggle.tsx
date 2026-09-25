"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`w-9 h-9 rounded-xl bg-white/10 ${className}`} aria-hidden="true" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className={`relative p-2 rounded-xl border transition-all duration-300 flex items-center justify-center group ${
        isDark
          ? "bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-amber-300 hover:text-amber-200 shadow-sm"
          : "bg-white/10 hover:bg-white/20 border-white/20 text-white hover:text-white shadow-sm"
      } ${className}`}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light Mode" : "Dark Mode"}
    >
      {isDark ? (
        <Sun className="w-4 h-4 transition-transform duration-300 rotate-0 group-hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 transition-transform duration-300 rotate-0 group-hover:-rotate-12" />
      )}
    </button>
  );
}
