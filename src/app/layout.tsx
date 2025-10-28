import type { Metadata } from "next";
import { playfair, satoshi } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Raphael Capital",
    template: "%s | Raphael Capital",
  },
  description:
    "Raphael Capital is a discreet investment partner with a 25-year portfolio of projects across London and the UK.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${satoshi.className} ${satoshi.variable} ${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
