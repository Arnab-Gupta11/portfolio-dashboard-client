import type { Metadata } from "next";

import { Kanit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProviders";
import StoreProviders from "@/providers/StoreProviders";
import { Toaster } from "react-hot-toast";

const kanit = Kanit({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-kanit",
});

export const metadata: Metadata = {
  title: "Arnab Gupta",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProviders>
      <html lang="en" className={`${kanit.variable}`} suppressHydrationWarning>
        <body className="font-kanit">
          <Toaster position="top-right" reverseOrder={false} />
          <ThemeProvider attribute="class" defaultTheme="system">
            {children}
          </ThemeProvider>
        </body>
      </html>
    </StoreProviders>
  );
}
