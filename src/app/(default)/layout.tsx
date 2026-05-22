import type { Metadata } from "next";
import { Cinzel, Noto_Sans_SC } from "next/font/google";
import "../globals.css";
import { DEFAULT_LOCALE } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";

const cinzel = Cinzel({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const notoSansSc = Noto_Sans_SC({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const t = getTranslations(DEFAULT_LOCALE);

export const metadata: Metadata = {
  title: `${t.gameName} ${t.demoLabel}`,
  description: t.metaDescription,
  icons: {
    icon: "/favicon.png",
  },
};

export default function DefaultRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={DEFAULT_LOCALE}
      className={`${cinzel.variable} ${notoSansSc.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
