import Link from 'next/link';
import { Compass, Mountain, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5rem 1.5rem',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <div
        style={{
          maxWidth: '620px',
          width: '100%',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-lg)',
          padding: '3rem 2rem',
          boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.4)',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            color: '#ef4444',
            background: 'rgba(239, 68, 68, 0.1)',
            padding: '4px 12px',
            borderRadius: '9999px',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            marginBottom: '1.25rem',
          }}
        >
          <Compass size={14} />
          <span>OFF-ROUTE · BARO 280 hPa · ZERO VISIBILITY</span>
        </div>

        <h1
          style={{
            fontSize: '3.5rem',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            margin: '0 0 0.5rem 0',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-mono)',
          }}
        >
          404
        </h1>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
          Lost in the High Pass: Waypoint Not Found
        </h2>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, margin: '0 auto 2rem auto', maxWidth: '480px' }}>
          The ridge you are trying to summit has shifted or does not exist on our topographic survey. Check your compass and return to safety.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.4rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--primary)',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.875rem',
              textDecoration: 'none',
            }}
          >
            <Home size={16} />
            <span>Return to Base Camp</span>
          </Link>

          <Link
            href="/expedition"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.4rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              fontWeight: 700,
              fontSize: '0.875rem',
              textDecoration: 'none',
            }}
          >
            <Mountain size={16} />
            <span>8,000M Summits</span>
          </Link>

          <Link
            href="/system-design"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.4rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              fontWeight: 700,
              fontSize: '0.875rem',
              textDecoration: 'none',
            }}
          >
            <Search size={16} />
            <span>System Design</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
