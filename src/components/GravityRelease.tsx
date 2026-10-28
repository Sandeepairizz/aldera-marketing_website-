'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Float from './Float';

gsap.registerPlugin(ScrollTrigger);

// 7 floating fashion editorial drift images across three depth planes
const DRIFT_IMAGES = [
  // Depth 1 (far background, slowest drift)
  { src: '/images/hero-2.jpg', x: '8%',  y: '18%', depth: 0.18, phase: 0.1,  rotate: -6,  w: 220, z: 2 },
  { src: '/images/hero-4.jpg', x: '76%', y: '22%', depth: 0.22, phase: 0.4,  rotate: 7,   w: 200, z: 2 },
  // Depth 2 (midground)
  { src: '/images/hero-1.jpg', x: '20%', y: '42%', depth: 0.40, phase: 0.6,  rotate: -4,  w: 280, z: 4 },
  { src: '/images/hero-5.jpg', x: '65%', y: '38%', depth: 0.38, phase: 0.2,  rotate: 5,   w: 260, z: 4 },
  // Depth 3 (foreground, fastest upward drift)
  { src: '/images/hero-3.jpg', x: '38%', y: '58%', depth: 0.65, phase: 0.8,  rotate: -9,  w: 320, z: 6 },
  { src: '/images/hero-2.jpg', x: '12%', y: '74%', depth: 0.58, phase: 0.5,  rotate: 4,   w: 230, z: 6 },
  { src: '/images/hero-4.jpg', x: '72%', y: '70%', depth: 0.62, phase: 0.3,  rotate: -6,  w: 220, z: 6 },
];

export default function GravityRelease() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Pin the section for the anti-gravity release experience
      ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: '+=180%',
        pin: true,
        pinSpacing: true,
      });

      // Drift images upward at depths
      DRIFT_IMAGES.forEach((img, i) => {
        const imgEl = imageRefs.current[i];
        if (!imgEl) return;
        gsap.to(imgEl, {
          yPercent: -(90 + img.depth * 140),
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: '+=180%',
            scrub: 1.2,
          },
        });
      });

      // Pinned VÉRÈNE typography scaling & revealing
      if (wordRef.current) {
        gsap.fromTo(
          wordRef.current,
          { opacity: 0.3, scale: 0.94, letterSpacing: '-0.06em' },
          {
            opacity: 1,
            scale: 1,
            letterSpacing: '-0.03em',
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 75%',
              end: 'top 20%',
              scrub: 1,
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gravity-release"
      style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: 'var(--porcelain)',
      }}
      aria-label="Anti-gravity image showcase"
    >
      {/* Editorial floating drift images */}
      {DRIFT_IMAGES.map((img, i) => (
        <div
          key={i}
          ref={(el) => { imageRefs.current[i] = el; }}
          style={{
            position: 'absolute',
            left: img.x,
            top: img.y,
            width: `clamp(140px, 18vw, ${img.w}px)`,
            aspectRatio: '3/4',
            transform: `rotate(${img.rotate}deg)`,
            zIndex: img.z,
            willChange: 'transform',
          }}
        >
          <Float amplitude={8} duration={3 + i * 0.4} phase={img.phase}>
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                borderRadius: 6,
                overflow: 'hidden',
                boxShadow: '0 24px 50px rgba(10, 10, 10, 0.14)',
                border: '1px solid rgba(10, 10, 10, 0.06)',
              }}
            >
              <Image
                src={img.src}
                alt={`Maison Vérène editorial portrait ${i + 1}`}
                fill
                sizes="340px"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </Float>
        </div>
      ))}

      {/* Pinned VÉRÈNE wordmark — majestic center anchor */}
      <div
        ref={wordRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 5,
          pointerEvents: 'none',
          color: 'var(--onyx)',
          textAlign: 'center',
          userSelect: 'none',
        }}
      >
        <span
          style={{
            display: 'block',
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(4.5rem, 14vw, 12rem)',
            fontWeight: 700,
            letterSpacing: '-0.035em',
            lineHeight: 1.0,
            whiteSpace: 'nowrap',
          }}
        >
          VÉRÈNE
        </span>
        <span
          style={{
            display: 'block',
            fontFamily: 'var(--font-sans)',
            fontStyle: 'normal',
            fontSize: 'clamp(1rem, 2vw, 1.8rem)',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: 'var(--electric-red)',
            marginTop: '0.75rem',
          }}
        >
          Anti-Gravity Visual Language
        </span>
      </div>
    </section>
  );
}
