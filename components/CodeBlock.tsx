'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  children?: React.ReactNode;
  className?: string;
  codeString?: string;
}

export default function CodeBlock({ children, className, codeString }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  // Extract language from className (e.g., 'language-typescript')
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : 'code';

  const textToCopy = codeString || (typeof children === 'string' ? children : '');

  const handleCopy = async () => {
    try {
      if (textToCopy) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        // Fallback to text content
        const el = document.createElement('div');
        el.innerHTML = String(children);
        await navigator.clipboard.writeText(el.innerText || '');
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="code-container">
      <div className="code-header">
        <div className="code-dots">
          <span className="code-dot dot-red" />
          <span className="code-dot dot-yellow" />
          <span className="code-dot dot-green" />
        </div>
        <div className="code-lang-label">{language}</div>
        <button
          onClick={handleCopy}
          className="copy-btn"
          aria-label="Copy code to clipboard"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check size={14} color="#22c55e" />
              <span style={{ color: '#22c55e' }}>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="code-pre">
        <code>{children}</code>
      </pre>
    </div>
  );
}
