'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface MagneticProps {
  children: React.ReactNode;
  strength?: number;  // 0.2–0.6
  className?: string;
}

/**
 * Magnetic — cursor attract/repel (anti-gravity: Repel)
 * Elements ease away from the cursor on proximity.
 */
export default function Magnetic({ children, strength = 0.35, className = '' }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const bounds = useRef<DOMRect | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const onMouseMove = (e: MouseEvent) => {
      if (!bounds.current) return;
      const { left, top, width, height } = bounds.current;
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      gsap.to(el, {
        x: dx * strength,
        y: dy * strength,
        duration: 0.6,
        ease: 'power3.out',
      });
    };

    const onMouseLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' });
    };

    const onMouseEnter = () => {
      bounds.current = el.getBoundingClientRect();
    };

    el.addEventListener('mouseenter', onMouseEnter);
    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);

    return () => {
      el.removeEventListener('mouseenter', onMouseEnter);
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [strength]);

  return (
    <div ref={ref} className={className} style={{ display: 'inline-block', willChange: 'transform' }}>
      {children}
    </div>
  );
}
