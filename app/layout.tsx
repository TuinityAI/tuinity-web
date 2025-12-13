import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "next-themes";
import { Footer } from "@/components/footer";
import { StructuredData } from "@/components/structured-data";
import { FAQSchema } from "@/components/faq-schema";

const glitz = localFont({
  variable: "--font-glitz",
  src: "../public/fonts/Glitz.ttf",
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tuinity.lat'),
  title: {
    default: 'Tuinity AI - Agencia de Inteligencia Artificial en Panamá',
    template: '%s | Tuinity AI'
  },
  description: 'Agencia líder de Inteligencia Artificial en Panamá. Automatiza tus ventas con agentes de IA conversacionales. Voice Agents, Chat Agents y Broadcast. Escala tu negocio con tecnología de vanguardia.',
  keywords: [
    'inteligencia artificial panamá',
    'agencia IA panamá',
    'automatización ventas',
    'agentes conversacionales IA',
    'chatbot inteligente',
    'voice agent',
    'asistente virtual',
    'automatización atención al cliente',
    'IA para empresas',
    'transformación digital panamá',
    'desarrollo software IA',
    'machine learning panamá',
    'agentes de ventas IA',
    'broadcast automatizado',
    'tuinity',
    'tuinity ai',
    'tuinity panama'
  ],
  authors: [{ name: 'Tuinity AI', url: 'https://tuinity.lat' }],
  creator: 'Tuinity AI',
  publisher: 'Tuinity AI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'es_PA',
    url: 'https://tuinity.lat',
    siteName: 'Tuinity AI',
    title: 'Tuinity AI - Agencia de Inteligencia Artificial en Panamá',
    description: 'Automatiza tus ventas con agentes de IA conversacionales. Voice Agents, Chat Agents y Broadcast para escalar tu negocio.',
    phoneNumbers: ['+507-6346-9953'],
  },
  // twitter: {
  //   card: 'summary',
  //   title: 'Tuinity AI - Agencia de Inteligencia Artificial en Panamá',
  //   description: 'Automatiza tus ventas con agentes de IA conversacionales. Voice Agents, Chat Agents y Broadcast.',
  //   creator: '@tuinity_lat',
  //   site: '@tuinity_lat',
  // },
  other: {
    'contact:phone_number': '+507-6346-9953',
    'contact:email': 'admin@tuinity.lat',
    'social:instagram': 'https://instagram.com/tuinity.lia',
    'social:github': 'https://github.com/TuinityAI',
    'social:tiktok': 'https://www.tiktok.com/@tuinitylat',
    // 'social:linkedin': 'https://www.linkedin.com/company/tuinity',
    // 'social:twitter': 'https://twitter.com/tuinity_lat',
    // 'social:facebook': 'https://facebook.com/tuinity.lat',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://tuinity.lat',
    languages: {
      'es-PA': 'https://tuinity.lat',
      'es': 'https://tuinity.lat',
    },
  },
  verification: {
    google: 'google-site-verification-code', // Reemplazar con código real
    // yandex: 'yandex-verification-code',
    // bing: 'bing-verification-code',
  },
  category: 'technology',
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
