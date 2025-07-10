import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { LanguageProvider } from '@/components/providers/LanguageProvider';
import { LoadingProvider } from '@/components/providers/LoadingProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Leadway Academy Admin',
  description: 'Admin dashboard for Leadway Academy',
  icons: {
    icon: [
      { url: '/assets/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/assets/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/assets/favicon/favicon.ico', sizes: 'any' },
    ],
    apple: '/assets/favicon/apple-touch-icon.png',
    other: [
      {
        rel: 'manifest',
        url: '/assets/favicon/site.webmanifest',
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <LanguageProvider>
          <LoadingProvider>{children}</LoadingProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
