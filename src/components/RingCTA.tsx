'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

const RING_IMAGES = [
  '/images/hero-1.jpg',
  '/images/hero-2.jpg',
  '/images/hero-3.jpg',
  '/images/hero-4.jpg',
  '/images/hero-5.jpg',
  '/images/hero-1.jpg',
  '/images/hero-2.jpg',
  '/images/hero-3.jpg',
  '/images/hero-4.jpg',
  '/images/hero-5.jpg',
  '/images/hero-1.jpg',
  '/images/hero-2.jpg',
  '/images/hero-3.jpg',
  '/images/hero-4.jpg',
  '/images/hero-5.jpg',
  '/images/hero-1.jpg',
  '/images/hero-2.jpg',
  '/images/hero-3.jpg',
  '/images/hero-4.jpg',
  '/images/hero-5.jpg',
];

export default function RingCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rotationRef = useRef(0);
  const tiltRef = useRef({ x: 0, y: 0 });
  const [email, setEmail] = useState('');

  const COUNT = RING_IMAGES.length;
  const RADIUS = typeof window !== 'undefined' && window.innerWidth < 768 ? 200 : 320;

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Position cards in a circle
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const angle = (i / COUNT) * Math.PI * 2;
      const x = Math.cos(angle) * RADIUS;
      const z = Math.sin(angle) * RADIUS;
      card.style.transform = `translateX(${x}px) translateZ(${z}px)`;
    });

    if (prefersReduced) return;

    // Auto-rotate
    let rafId: number;
    const animate = () => {
      rotationRef.current += 0.2;
      gsap.set(ring, {
        rotationY: rotationRef.current + tiltRef.current.x,
        rotationX: tiltRef.current.y,
        transformPerspective: 1200,
      });
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    // Tilt toward cursor
    const onMove = (e: MouseEvent) => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      tiltRef.current = {
        x: ((e.clientX - cx) / rect.width) * 20,
        y: -((e.clientY - cy) / rect.height) * 12,
      };
    };

    const el = sectionRef.current;
    el?.addEventListener('mousemove', onMove);

    return () => {
      cancelAnimationFrame(rafId);
      el?.removeEventListener('mousemove', onMove);
    };
  }, [COUNT, RADIUS]);

  return (
    <section
      ref={sectionRef}
      id="cta"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: 'var(--porcelain)',
        perspective: '1200px',
      }}
      aria-labelledby="cta-heading"
    >
      {/* 3D rotating ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center',
        }}
      >
        {RING_IMAGES.map((src, i) => (
          <div
            key={i}
            ref={(el) => { cardRefs.current[i] = el; }}
            style={{
              position: 'absolute',
              width: 80,
              height: 100,
              marginLeft: -40,
              marginTop: -50,
              borderRadius: 4,
              overflow: 'hidden',
              transformStyle: 'preserve-3d',
            }}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="80px"
              style={{ objectFit: 'cover', filter: 'grayscale(20%)' }}
            />
          </div>
        ))}
      </div>

      {/* Center CTA */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
        }}
      >
        <h2 id="cta-heading" className="text-h2" style={{ color: 'var(--onyx)' }}>
          <em className="accent-serif">Begin.</em>
        </h2>

        {/* Email + CTA */}
        <form
          style={{
            display: 'flex',
            gap: '0.75rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
          onSubmit={(e) => {
            e.preventDefault();
            // handle submission
          }}
          aria-label="Start a project"
        >
          <label htmlFor="cta-email" className="sr-only">
            Your email address
          </label>
          <input
            id="cta-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            style={{
              backgroundColor: 'var(--alabaster)',
              border: 'none',
              borderRadius: 4,
              padding: '0.85rem 1.25rem',
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              color: 'var(--onyx)',
              width: 280,
              outline: 'none',
            }}
            onFocus={(e) => {
              e.currentTarget.style.outline = '2px solid var(--electric-red)';
              e.currentTarget.style.outlineOffset = '2px';
            }}
            onBlur={(e) => {
              e.currentTarget.style.outline = 'none';
            }}
          />
          <button
            type="submit"
            id="cta-submit"
            style={{
              backgroundColor: 'var(--electric-red)',
              color: 'var(--onyx)',
              border: 'none',
              borderRadius: 4,
              padding: '0.85rem 1.75rem',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.875rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              cursor: 'none',
              transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1)',
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, { scale: 1.04, duration: 0.3, ease: 'power3.out' });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, { scale: 1, duration: 0.5, ease: 'elastic.out(1,0.5)' });
            }}
          >
            Start a project
          </button>
        </form>
      </div>
    </section>
  );
}
