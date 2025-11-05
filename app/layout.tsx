import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "next-themes";
import { Footer } from "@/components/footer";

const glitz = localFont({
  variable: "--font-glitz",
  src: "../public/fonts/Glitz.ttf",
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
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
  5;
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${notoSans.variable} ${glitz.variable} antialiased relative`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
