import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "h-12" }) => (
  <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* The Circle O */}
    <circle cx="30" cy="30" r="22" stroke="white" strokeWidth="4" />
    {/* The highlight curve on the O to look like a bubble */}
    <path d="M35 15 Q45 15 48 25" stroke="white" strokeWidth="3" strokeLinecap="round" />
    {/* The subscript 2 */}
    <text x="55" y="52" fill="white" fontFamily="sans-serif" fontWeight="bold" fontSize="24">2</text>
  </svg>
);
