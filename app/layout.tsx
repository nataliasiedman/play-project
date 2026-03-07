import { LanguageProvider } from '@/lib/languageContext' // Certifique-se que o caminho está correto
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ColorWords - Learn English daily",
  description: "The most efficient way to bring English into your routine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-gradient-to-b from-pink-50 via-fuchsia-50 to-violet-50 text-neutral-900">
        {/* O Provider deve envolver tudo que precisa de tradução */}
        <LanguageProvider >
          <Navbar />
          <Analytics />
          <main className="flex-1 bg-transparent">
            {children}
          </main>
          <Footer />
        </LanguageProvider >
      </body>
    </html>
  );
}