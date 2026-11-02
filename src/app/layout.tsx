
import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import GoogleProvider from "@/components/GoogleProvider";
import { Navbar } from "@/components/navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "GreenLife",
  description: "Social Development Events Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <GoogleProvider>
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </GoogleProvider>
      </body>
    </html>
  );
}
