'use client';

import { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { TwitterIcon, LinkedinIcon } from '@/components/Icons';

export default function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const handleShareTwitter = () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const text = encodeURIComponent(`Check out "${title}" on 2AMCoding!`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const handleShareLinkedIn = () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
  };

  const handleCopyLink = async () => {
    if (typeof window !== 'undefined') {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="share-links-group">
      <button
        onClick={handleShareTwitter}
        className="share-action-btn"
        title="Share on Twitter"
        aria-label="Share on Twitter"
      >
        <TwitterIcon size={14} />
      </button>

      <button
        onClick={handleShareLinkedIn}
        className="share-action-btn"
        title="Share on LinkedIn"
        aria-label="Share on LinkedIn"
      >
        <LinkedinIcon size={14} />
      </button>

      <button
        onClick={handleCopyLink}
        className="share-action-btn"
        title="Copy Link"
        aria-label="Copy Link"
      >
        {copied ? <Check size={14} color="#22c55e" /> : <Share2 size={14} />}
        <span>{copied ? 'Copied' : 'Share'}</span>
      </button>
    </div>
  );
}
