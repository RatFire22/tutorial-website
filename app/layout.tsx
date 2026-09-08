import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getAllArticles } from '@/lib/articles';

export const metadata: Metadata = {
  title: '2AMCoding — System Design (HLD & LLD) & Autonomous AI Engineering',
  description: 'In-depth High-Level Design (HLD), Low-Level Design (LLD), object-oriented patterns, and autonomous AI engineering guides by Vishwajeet Gupta (2AMCoding).',
  keywords: ['System Design', 'HLD', 'LLD', 'High-Level Design', 'Low-Level Design', 'Distributed Systems', 'AI Engineering', 'Autonomous Agents', 'LangGraph', 'Design Patterns', '2AMCoding'],
  authors: [{ name: 'Vishwajeet Gupta' }],
  openGraph: {
    title: '2AMCoding — System Design (HLD & LLD) & Autonomous AI Engineering',
    description: 'In-depth High-Level Design (HLD), Low-Level Design (LLD), and enterprise AI engineering guides.',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

import ScrollRestorationFix from '@/components/ScrollRestorationFix';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const articles = getAllArticles();

  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('site-theme');
                  var theme = saved || 'dark';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <ScrollRestorationFix />
        <div className="ambient-glow-top" />
        <Navbar articles={articles} />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
