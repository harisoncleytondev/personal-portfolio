import type { Metadata } from "next";
import "./globals.css";
import {
  AppSettingsContext,
  AppSettingsProvider,
} from "@/contexts/app-settings-context";
import { ReactQueryProvider } from "@/providers/QueryProviderClient";
import { Toaster } from "sonner";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;

export const metadata: Metadata = {
  title: {
    default: "Harison | Desenvolvedor",
    template: "%s | Harison",
  },

  description:
    "Harison é um desenvolvedor focado em criar soluções modernas, eficientes e bem estruturadas. Conheça seus projetos, experiências e formas de contato.",

  metadataBase: new URL(siteUrl),

  alternates: {
    canonical: siteUrl,
  },

  openGraph: {
    title: "Harison | Desenvolvedor",
    description:
      "Portfólio profissional de Harison. Projetos, experiências e contato.",
    url: siteUrl,
    siteName: "Harison | Desenvolvedor ",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Harison | Desenvolvedor",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Harison | Desenvolvedor",
    description: "Portfólio profissional de Harison. Projetos e experiências.",
    images: ["/og.png"],
  },

  authors: [
    {
      name: "Harison Cleyton",
      url: "https://github.com/harisoncleytondev",
    },
  ],

  creator: "Harison Cleyton",

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
    <html lang="pt-br">
      <body>
        <AppSettingsProvider>
          <ReactQueryProvider>
            <Toaster richColors position="top-right" />
            {children}
          </ReactQueryProvider>
        </AppSettingsProvider>
      </body>
    </html>
  );
}
