import type { Metadata } from "next";
import { Noto_Sans, Archivo } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Footer } from "@/components/footer";

const glitz = localFont({
  variable: "--font-glitz",
  src: "../public/fonts/Glitz.ttf",
});

const grift = localFont({
  variable: "--font-grift",
  src: [
    {
      path: "../assets/fuentes-marca-tuinity/Grift-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../assets/fuentes-marca-tuinity/Grift-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fuentes-marca-tuinity/Grift-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

export const metadata: Metadata = {
  title: "Tuinity AI",
  description: "Software Development Agency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${notoSans.variable} ${glitz.variable} ${grift.variable} ${archivo.variable} antialiased relative`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
