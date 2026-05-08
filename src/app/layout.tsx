import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "PickMaster",
  description:
    "Quinielas deportivas en vivo. Elige tus picks, compite en el ranking y gana premios reales — sin apuestas, sin complicaciones.",
  keywords: [
    "quinielas",
    "deportes",
    "picks",
    "pool",
    "ranking",
    "fútbol",
    "PickMaster",
  ],
  authors: [{ name: "PickMaster" }],
  openGraph: {
    title: "PickMaster — Quinielas deportivas en vivo",
    description:
      "Elige tus picks, compite en el ranking y gana premios reales. Gratis para empezar.",
    type: "website",
    locale: "es_MX",
    siteName: "PickMaster",
  },
  twitter: {
    card: "summary_large_image",
    title: "PickMaster — Quinielas deportivas en vivo",
    description:
      "Elige tus picks, compite en el ranking y gana premios reales. Gratis para empezar.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16-readable.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="font-sans bg-background text-white antialiased">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
