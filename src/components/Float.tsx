'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface FloatProps {
  children: React.ReactNode;
  amplitude?: number;   // px, default 12
  duration?: number;    // seconds per cycle, default 4
  phase?: number;       // 0–1, random offset
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Float — idle sine-bob animation (anti-gravity vocabulary: Levitate)
 * Guarantees 100% width and height so that inner aspect-ratio and fill images receive proper bounding box.
 */
export default function Float({
  children,
  amplitude = 12,
  duration = 4,
  phase = 0,
  className = '',
  style,
}: FloatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const animRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const startProgress = phase;

    animRef.current = gsap.to(el, {
      y: -amplitude,
      duration: duration / 2,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: -(startProgress * duration),
    });

    return () => {
      animRef.current?.kill();
    };
  }, [amplitude, duration, phase]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        willChange: 'transform',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
