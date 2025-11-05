import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { WorkingProviders } from './providers-working';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dynamic Data Table Manager',
  description: 'A powerful data table manager with sorting, filtering, and interactive features',
  keywords: 'data table, csv import, export, sorting, filtering, react, nextjs, redux, material-ui',
  authors: [{ name: 'Mohish Padave' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <WorkingProviders>{children}</WorkingProviders>
        </ErrorBoundary>
      </body>
    </html>
  );
}