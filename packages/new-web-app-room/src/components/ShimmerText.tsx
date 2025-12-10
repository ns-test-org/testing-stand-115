'use client';

import { useEffect, useState } from 'react';

interface ShimmerTextProps {
  text: string;
  className?: string;
}

export default function ShimmerText({ text, className = '' }: ShimmerTextProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`relative inline-block ${className}`}>
      <span className="relative inline-block bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
        {text}
      </span>
      {mounted && (
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer-wave blur-sm" />
      )}
    </div>
  );
}

