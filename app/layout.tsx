import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getAllArticles } from '@/lib/articles';

export const metadata: Metadata = {
  title: 'CodeCraft — Deep Technical Guides & Tutorials',
  description: 'In-depth tutorials, expert insights, and modern architectural deep dives for modern software engineers. Free on Vercel.',
  keywords: ['Next.js', 'TypeScript', 'Edge Computing', 'CSS', 'Rust', 'Web Development', 'Tutorials', 'Blog'],
  authors: [{ name: 'Alex Chen' }],
  openGraph: {
    title: 'CodeCraft — Modern Technical Tutorials & Guides',
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
    <html lang="en" data-theme="light">
      <body>
        <div className="ambient-glow-top" />
        <Navbar articles={articles} />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
