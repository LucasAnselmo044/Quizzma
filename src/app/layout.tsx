import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Roboto } from 'next/font/google';
import { SessionProvider } from "next-auth/react";

const roboto = Roboto({
  subsets: ['latin'],
  weight: '400',
}) 

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Quizzma",
  description: "Página Principal do Quizzma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${roboto.className} antialiased`}
      >
        <SessionProvider >
        {children}
        </SessionProvider>
      </body>
    </html>
  );
}
