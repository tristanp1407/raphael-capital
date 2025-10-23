import { Playfair_Display } from "next/font/google";
import localFont from "next/font/local";

export const satoshi = localFont({
  src: [
    {
      path: "./fonts/satoshi/satoshi-variable.woff2",
      style: "normal",
      weight: "100 900",
    },
    {
      path: "./fonts/satoshi/satoshi-variable-italic.woff2",
      style: "italic",
      weight: "100 900",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  variable: "--font-playfair",
  display: "swap",
});
