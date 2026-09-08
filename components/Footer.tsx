import Link from 'next/link';
import { Moon, Heart } from 'lucide-react';
import { GithubIcon, TwitterIcon, LinkedinIcon } from '@/components/Icons';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="brand-logo">
              <div className="brand-icon" style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 50%, #0284c7 100%)' }}>
                <Moon size={16} color="#facc15" fill="#facc15" />
              </div>
              <span>2AMCoding</span>
            </Link>
            <p>
              Late-night technical guides, deep system architecture breakdowns, and flow-state developer tutorials. Hosted seamlessly on Vercel.
            </p>
          </div>

          <div className="footer-nav-col">
            <h5>Explore</h5>
            <ul className="footer-nav-links">
              <li><Link href="/system-design">System Design</Link></li>
              <li><Link href="/expedition">Learn AI (8,848M)</Link></li>
              <li><Link href="/tutorials">Tutorials</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/about">About</Link></li>
            </ul>
          </div>

          <div className="footer-nav-col">
            <h5>System Design</h5>
            <ul className="footer-nav-links">
              <li><Link href="/system-design/lld">LLD (Low-Level Design)</Link></li>
              <li><Link href="/system-design/hld">HLD (High-Level Design)</Link></li>
              <li><Link href="/system-design">Architecture Blueprints</Link></li>
              <li><Link href="/expedition">AI System Swarms</Link></li>
            </ul>
          </div>

          <div className="footer-nav-col">
            <h5>Connect</h5>
            <ul className="footer-nav-links">
              <li>
                <a href="https://github.com" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <GithubIcon size={15} /> GitHub
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <TwitterIcon size={15} /> Twitter / X
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <LinkedinIcon size={15} /> LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} 2AMCoding. Built with Next.js &amp; Vanilla CSS. Free on Vercel.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            Crafted with <Heart size={14} color="#ef4444" fill="#ef4444" /> for developers
          </div>
        </div>
      </div>
    </footer>
  );
}
