import './global.css';
import { RootProvider } from 'fumadocs-ui/provider';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://docs.curshosting.net/docs'),
  title: {
    default: 'CursHosting 教學文檔',
    template: '%s | CursHosting Docs',
  },
  description: '了解如何使用 CursHosting 的所有功能',
  icons: {
    icon: './favicon.ico'
  },
  openGraph: {
    title: 'CursHosting 教學文檔',
    description: '了解如何使用 CursHosting 的所有功能',
    type: 'website',
    locale: 'zh_TW',
    siteName: 'CursHosting Docs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CursHosting 教學文檔',
    description: '了解如何使用 CursHosting 的所有功能',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-TW" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
