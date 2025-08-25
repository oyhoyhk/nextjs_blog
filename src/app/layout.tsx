import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import PageTrackingWrapper from "@/components/PageTrackingWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "부자 되는 습관",
  description: "주식, 비트코인, 부동산 투자 인사이트와 분석을 제공하는 투자 블로그",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAnalytics />
        <Header />
        <main className="min-h-screen">
          <PageTrackingWrapper>
            {children}
          </PageTrackingWrapper>
        </main>
      </body>
    </html>
  );
}
