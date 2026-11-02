"use client";

import { useEffect } from "react";

export function ThemeScript() {
  useEffect(() => {
    // Read stored theme or system preference before hydration completes
    const stored = localStorage.getItem("greenlife-theme");
    if (stored) {
      document.documentElement.classList.toggle("dark", stored === "dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return null;
}
