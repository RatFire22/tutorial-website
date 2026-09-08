import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getAllArticles } from '@/lib/articles';

export const metadata: Metadata = {
  title: '2AMCoding — Late-Night Engineering Guides & Deep Dives',
  description: 'In-depth tutorials, system architecture breakdowns, and flow-state engineering guides by 2AMCoding. Free on Vercel.',
  keywords: ['Next.js', 'TypeScript', 'Edge Computing', 'CSS', 'Rust', 'Web Development', 'Tutorials', 'Blog', '2AMCoding'],
  authors: [{ name: 'Vishwajeet Gupta' }],
  openGraph: {
    title: '2AMCoding — Modern Developer Tutorials & Deep Dives',
    description: 'In-depth developer guides and tutorials with modern architecture.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const articles = getAllArticles();

  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('site-theme');
                  if (saved) {
                    document.documentElement.setAttribute('data-theme', saved);
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <div className="ambient-glow-top" />
        <Navbar articles={articles} />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
