"use client";

import { AuthProvider } from "@/contexts/auth-context";
import { EventsProvider } from "@/contexts/events-context";
import { ThemeProvider } from "next-themes";

export function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      storageKey="greenlife-theme"
      disableTransitionOnChange={false}
    >
      <AuthProvider>
        <EventsProvider>{children}</EventsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
