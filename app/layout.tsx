import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Weather App",
  description: "A simple weather application built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/assets/icons/pwa/pwa-192x192.png" />
        <meta name="theme-color" content="#6366F1" />
      </head>
      <body className="bg-gradient-to-b from-indigo-600 via-purple-600 to-pink-500 min-h-screen flex items-center justify-center p-4">
        {children}
      </body>
    </html>
  );
}
