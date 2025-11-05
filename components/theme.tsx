"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";

export function ThemeToggle() {
  return null;
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme: theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-muted-foreground"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <Moon className="size-5" />
      ) : (
        <Sun className="size-5" />
      )}
    </Button>
  );
}

export default ThemeToggle;
