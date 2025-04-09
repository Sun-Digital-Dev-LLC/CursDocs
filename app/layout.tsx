import './global.css';
import { RootProvider } from 'fumadocs-ui/provider';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'CursHosting 教學文檔',
  description: '了解如何使用 CursHosting 的所有功能',
  icons: {
    icon: './favicon.ico'
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
