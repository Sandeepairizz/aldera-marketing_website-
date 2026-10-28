'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Float from './Float';

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    id: 'fashion',
    label: 'Fashion',
    image: '/images/hero-1.jpg',
    tiles: [
      { src: '/images/hero-3.jpg', x: '60%', y: '15%', rotate: 5,  w: 140 },
      { src: '/images/hero-5.jpg', x: '72%', y: '55%', rotate: -8, w: 110 },
      { src: '/images/hero-2.jpg', x: '52%', y: '72%', rotate: 3,  w: 90  },
    ],
  },
  {
    id: 'ecommerce',
    label: 'E-commerce',
    image: '/images/hero-2.jpg',
    tiles: [
      { src: '/images/hero-1.jpg', x: '58%', y: '10%', rotate: -4, w: 130 },
      { src: '/images/hero-4.jpg', x: '76%', y: '45%', rotate: 7,  w: 120 },
      { src: '/images/hero-3.jpg', x: '55%', y: '68%', rotate: -5, w: 95  },
    ],
  },
  {
    id: 'marketing',
    label: 'Marketing',
    image: '/images/hero-3.jpg',
    tiles: [
      { src: '/images/hero-5.jpg', x: '62%', y: '20%', rotate: 6,  w: 150 },
      { src: '/images/hero-2.jpg', x: '74%', y: '52%', rotate: -9, w: 110 },
      { src: '/images/hero-1.jpg', x: '54%', y: '75%', rotate: 2,  w: 85  },
    ],
  },
  {
    id: 'editorial',
    label: 'Editorial',
    image: '/images/hero-4.jpg',
    tiles: [
      { src: '/images/hero-3.jpg', x: '60%', y: '12%', rotate: -3, w: 135 },
      { src: '/images/hero-1.jpg', x: '78%', y: '48%', rotate: 8,  w: 115 },
      { src: '/images/hero-5.jpg', x: '56%', y: '70%', rotate: -6, w: 90  },
    ],
  },
  {
    id: 'photography',
    label: 'Photography',
    image: '/images/hero-5.jpg',
    tiles: [
      { src: '/images/hero-4.jpg', x: '64%', y: '18%', rotate: 4,  w: 145 },
      { src: '/images/hero-2.jpg', x: '72%', y: '50%', rotate: -7, w: 120 },
      { src: '/images/hero-3.jpg', x: '57%', y: '72%', rotate: 5,  w: 88  },
    ],
  },
];

export default function Pillars() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  // Pinned scroll with snap
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const totalHeight = PILLARS.length * 100;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: `+=${totalHeight}vh`,
        pin: true,
        pinSpacing: true,
        snap: {
          snapTo: 1 / (PILLARS.length - 1),
          duration: { min: 0.2, max: 0.5 },
          ease: 'power2.inOut',
        },
        onUpdate: (self) => {
          const idx = Math.round(self.progress * (PILLARS.length - 1));
          setActive(Math.max(0, Math.min(PILLARS.length - 1, idx)));
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  // Crossfade image on tab change
  useEffect(() => {
    if (!imageRef.current) return;
    gsap.fromTo(
      imageRef.current,
      { opacity: 0.4 },
      { opacity: 1, duration: 0.6, ease: 'power2.out' }
    );
  }, [active]);

  return (
    <div
      ref={sectionRef}
      style={{
        height: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        backgroundColor: 'var(--onyx)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Left: full-bleed image */}
      <div
        ref={imageRef}
        style={{
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          height: '100%',
        }}
      >
        <Image
          src={PILLARS[active].image}
          alt={PILLARS[active].label}
          fill
          sizes="50vw"
          style={{ objectFit: 'cover', filter: 'grayscale(10%)' }}
        />
        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, transparent 60%, var(--onyx) 100%)',
          }}
        />

        {/* Floating tab pill */}
        <div
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '0.25rem',
            backgroundColor: 'rgba(10,10,10,0.7)',
            backdropFilter: 'blur(12px)',
            borderRadius: 999,
            padding: '0.35rem',
            border: '1px solid rgba(245,245,240,0.12)',
          }}
          role="tablist"
          aria-label="Creative pillars"
        >
          {PILLARS.map((p, i) => (
            <button
              key={p.id}
              id={`pillar-tab-${p.id}`}
              role="tab"
              aria-selected={active === i}
              aria-controls={`pillar-panel-${p.id}`}
              onClick={() => setActive(i)}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: 999,
                border: 'none',
                cursor: 'none',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                transition: 'all 0.3s ease',
                backgroundColor: active === i ? 'var(--electric-red)' : 'transparent',
                color: active === i ? 'var(--onyx)' : 'var(--porcelain-60)',
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Right: dotted canvas with floating tiles */}
      <div
        id={`pillar-panel-${PILLARS[active].id}`}
        role="tabpanel"
        aria-labelledby={`pillar-tab-${PILLARS[active].id}`}
        style={{
          position: 'relative',
          overflow: 'hidden',
          backgroundImage: `radial-gradient(circle, rgba(223,223,218,0.12) 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      >
        {/* Pillar label — large background text */}
        <div
          style={{
            position: 'absolute',
            bottom: '3rem',
            left: '2.5rem',
            right: '2rem',
          }}
        >
          <h2 className="text-h2" style={{ color: 'var(--porcelain)', lineHeight: 1 }}>
            {PILLARS[active].label}
          </h2>
        </div>

        {/* Floating image tiles */}
        {PILLARS[active].tiles.map((tile, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: tile.x,
              top: tile.y,
              width: tile.w,
              aspectRatio: '3/4',
              transform: `rotate(${tile.rotate}deg)`,
              borderRadius: 4,
              overflow: 'hidden',
              willChange: 'transform',
            }}
          >
            <Float amplitude={6} duration={3 + i * 0.5} phase={i / 3}>
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <Image
                  src={tile.src}
                  alt=""
                  fill
                  sizes="150px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </Float>
          </div>
        ))}
      </div>
    </div>
  );
}
