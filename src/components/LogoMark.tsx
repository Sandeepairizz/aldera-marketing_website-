import React from 'react';

interface LogoMarkProps {
  inverted?: boolean;
  size?: number;
  className?: string;
}

export default function LogoMark({
  inverted = false,
  size = 48,
  className = '',
}: LogoMarkProps) {
  const rectFill = inverted ? '#F5F5F0' : '#0A0A0A';
  const circleFill = inverted ? '#0A0A0A' : '#F5F5F0';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="48" height="48" rx="10" fill={rectFill} />
      <circle cx="34" cy="34" r="12" fill={circleFill} />
    </svg>
  );
}

export function Wordmark({
  inverted = false,
  sizeClass = 'text-2xl',
  className = '',
}: {
  inverted?: boolean;
  sizeClass?: string;
  className?: string;
}) {
  const baseColor = inverted ? 'text-porcelain' : 'text-onyx';
  const studioOpacity = inverted ? 'text-porcelain/40' : 'text-onyx/40';

  return (
    <span
      className={`inline-flex items-baseline font-display font-bold tracking-tight select-none ${baseColor} ${sizeClass} ${className}`}
    >
      <span>aldera</span>
      <span className={`ml-0.5 font-normal ${studioOpacity}`}>/studio</span>
    </span>
  );
}
