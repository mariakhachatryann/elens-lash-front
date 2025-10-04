import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DynamicFavicon from "@/components/DynamicFavicon";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ElensLash - Professional Lash Extensions",
  description: "Transform your look with our premium lash extension services. Professional, safe, and stunning results that last.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <DynamicFavicon />
        {children}
      </body>
    </html>
  );
}
