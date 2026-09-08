'use client';

import { useSyncExternalStore, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

function getThemeSnapshot(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return (localStorage.getItem('site-theme') as 'light' | 'dark') || 'light';
}

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

export default function ThemeToggle() {
  const storeTheme = useSyncExternalStore(subscribe, getThemeSnapshot, () => 'light');
  const [localTheme, setLocalTheme] = useState<'light' | 'dark' | null>(null);

  const currentTheme = localTheme ?? storeTheme;

  const toggleTheme = () => {
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    setLocalTheme(nextTheme);
    localStorage.setItem('site-theme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="icon-btn"
      title={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
      aria-label="Toggle color theme"
    >
      {currentTheme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}
