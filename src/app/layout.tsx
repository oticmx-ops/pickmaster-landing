import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "PickMaster — Haz tus picks. Domina el ranking.",
  description:
    "Crea quinielas deportivas, selecciona tus resultados y compite con otros jugadores en tiempo real. Simple, estratégico y adictivo.",
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
    title: "PickMaster — Haz tus picks. Domina el ranking.",
    description:
      "Crea quinielas deportivas, selecciona tus resultados y compite con otros jugadores en tiempo real.",
    type: "website",
    locale: "es_MX",
    siteName: "PickMaster",
  },
  twitter: {
    card: "summary_large_image",
    title: "PickMaster — Haz tus picks. Domina el ranking.",
    description:
      "Crea quinielas deportivas, selecciona tus resultados y compite en tiempo real.",
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-background text-white antialiased">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
