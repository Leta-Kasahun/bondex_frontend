// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

// Fonts
import { Inter, Poppins, Fira_Mono } from "next/font/google";
import { Noto_Sans_Ethiopic } from "next/font/google";

// Shadcn@ providers
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const notoEthiopic = Noto_Sans_Ethiopic({
  variable: "--font-noto-ethiopic",
  subsets: ["ethiopic"],
  weight: ["400", "500", "600", "700"],
});

const firaMono = Fira_Mono({
  variable: "--font-fira-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Bondex CRM",
  description: "Feature-rich CRM frontend",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} ${notoEthiopic.variable} ${firaMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Wrap Shadcn@ providers */}
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}