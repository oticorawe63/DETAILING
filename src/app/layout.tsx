import type { Metadata } from "next";
import { Public_Sans, Chakra_Petch, Inter } from "next/font/google";
import "./globals.css";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
});

const chakraPetch = Chakra_Petch({
  variable: "--font-chakra-petch",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Detailing23 | Premium Auto Detailing",
  description: "Experience automotive perfection with Detailing23.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined&display=block"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Round&display=block"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${publicSans.variable} ${chakraPetch.variable} ${inter.variable} font-sans antialiased text-slate-900 dark:text-slate-100 bg-background-light dark:bg-background-dark min-h-screen transition-colors duration-300`}
      >
        {children}
      </body>
    </html>
  );
}
