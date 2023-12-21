import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "./ui/providers";

const poppins = Poppins({
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "700",
    "800",
    "900",
  ],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bytee Smart",
  description: "WEb server untuk belajar iot smarthome device.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
