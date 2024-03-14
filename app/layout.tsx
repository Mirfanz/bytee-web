import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "./ui/providers";
import SessionProvider from "./session-provider";
import { getServerSession } from "@/lib/utils/session";

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sessionData = await getServerSession();

  return (
    <html lang="en">
      <body className={poppins.className}>
        <SessionProvider value={sessionData}>
          <Providers>{children}</Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
