'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string>('');
  const [isHoveringCursorEl, setIsHoveringCursorEl] = useState(false);
  const [isOverRedBg, setIsOverRedBg] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Initially position far off-screen
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -100, y: -100, opacity: 0 });

    const xDotTo = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3.out' });
    const yDotTo = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3.out' });
    const xRingTo = gsap.quickTo(ring, 'x', { duration: 0.22, ease: 'power3.out' });
    const yRingTo = gsap.quickTo(ring, 'y', { duration: 0.22, ease: 'power3.out' });

    let firstMoveDone = false;

    const onPointerMove = (e: PointerEvent) => {
      // Ignore touch taps
      if (e.pointerType === 'touch') return;

      if (!firstMoveDone) {
        firstMoveDone = true;
        setHasMoved(true);
        gsap.set(dot, { x: e.clientX, y: e.clientY, opacity: 1 });
        gsap.set(ring, { x: e.clientX, y: e.clientY });
      }

      xDotTo(e.clientX);
      yDotTo(e.clientY);
      xRingTo(e.clientX);
      yRingTo(e.clientY);
    };

    const onPointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Color change on red background: invert to Onyx / Porcelain so it stays visible
      const isRed = Boolean(target.closest('#results, .bg-electric-red'));
      setIsOverRedBg(isRed);

      const cursorEl = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorEl) {
        const rawCursor = cursorEl.getAttribute('data-cursor') || '';
        const formatted = rawCursor.charAt(0).toUpperCase() + rawCursor.slice(1).toLowerCase();
        setLabel(formatted || 'View');
        setIsHoveringCursorEl(true);
      } else {
        setLabel('');
        setIsHoveringCursorEl(false);
      }
    };

    const onPointerLeaveWindow = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    };

    const onPointerEnterWindow = () => {
      if (firstMoveDone) {
        gsap.to(dot, { opacity: 1, duration: 0.2 });
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('mouseover', onPointerOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', onPointerLeaveWindow);
    document.documentElement.addEventListener('mouseenter', onPointerEnterWindow);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('mouseover', onPointerOver);
      document.documentElement.removeEventListener('mouseleave', onPointerLeaveWindow);
      document.documentElement.removeEventListener('mouseenter', onPointerEnterWindow);
    };
  }, []);

  const dotBgColor = isOverRedBg ? '#0A0A0A' : '#FF2E1F';
  const ringBgColor = isOverRedBg ? '#0A0A0A' : '#FF2E1F';
  const ringTextColor = isOverRedBg ? '#F5F5F0' : '#0A0A0A';
  const dotShadow = isOverRedBg
    ? '0 0 10px rgba(10, 10, 10, 0.4), 0 0 2px #F5F5F0'
    : '0 0 12px rgba(255, 46, 31, 0.5)';

  return (
    <>
      {/* 10px dot that follows pointer, inverts on red background */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full will-change-transform"
        style={{
          width: 10,
          height: 10,
          backgroundColor: dotBgColor,
          boxShadow: dotShadow,
          opacity: hasMoved ? (isHoveringCursorEl ? 0 : 1) : 0,
          transform: 'translate(-50%, -50%)',
          transition: 'background-color 0.25s ease, opacity 0.2s ease, transform 0.2s ease',
        }}
      />

      {/* Labelled ring that expands over [data-cursor], inverts on red background */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[99998] rounded-full flex items-center justify-center will-change-transform"
        style={{
          width: isHoveringCursorEl ? 76 : 0,
          height: isHoveringCursorEl ? 76 : 0,
          opacity: hasMoved && isHoveringCursorEl ? 1 : 0,
          backgroundColor: ringBgColor,
          transform: 'translate(-50%, -50%)',
          boxShadow: isOverRedBg ? '0 10px 30px rgba(0, 0, 0, 0.4)' : '0 10px 30px rgba(255, 46, 31, 0.3)',
          transition:
            'width 0.28s cubic-bezier(0.16, 1, 0.3, 1), height 0.28s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease, background-color 0.25s ease',
        }}
      >
        {isHoveringCursorEl && label && (
          <span
            className="font-display font-bold text-xs uppercase tracking-wider select-none"
            style={{
              fontSize: '0.6875rem',
              letterSpacing: '0.08em',
              color: ringTextColor,
              transition: 'color 0.25s ease',
            }}
          >
            {label}
          </span>
        )}
      </div>
    </>
  );
}
