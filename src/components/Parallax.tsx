'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;      // 0.1 (slow/background) to 1 (foreground)
  direction?: 'up' | 'down';
  className?: string;
}

/**
 * Parallax — scroll-driven drift (anti-gravity vocabulary: Drift)
 * Outer wrapper only; Float handles idle bob on inner elements.
 */
export default function Parallax({
  children,
  speed = 0.3,
  direction = 'up',
  className = '',
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const distance = 120 * speed;
    const yFrom = direction === 'up' ? distance : -distance;
    const yTo = direction === 'up' ? -distance : distance;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: yFrom * 0.5 },
        {
          yPercent: yTo * 0.5,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [speed, direction]);

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform' }}>
      {children}
    </div>
  );
}
