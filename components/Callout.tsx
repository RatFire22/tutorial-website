import React from 'react';
import { Lightbulb, Info, AlertTriangle } from 'lucide-react';

interface CalloutProps {
  type?: 'tip' | 'info' | 'warning';
  title?: string;
  children: React.ReactNode;
}

export default function Callout({ type = 'tip', title, children }: CalloutProps) {
  const getIcon = () => {
    switch (type) {
      case 'tip':
        return <Lightbulb size={20} />;
      case 'warning':
        return <AlertTriangle size={20} />;
      case 'info':
      default:
        return <Info size={20} />;
    }
  };

  return (
    <div className={`callout-box callout-${type}`}>
      <div style={{ flexShrink: 0, marginTop: '2px' }}>
        {getIcon()}
      </div>
      <div className="callout-content">
        {title && <div className="callout-title">{title}</div>}
        <div>{children}</div>
      </div>
    </div>
  );
}
