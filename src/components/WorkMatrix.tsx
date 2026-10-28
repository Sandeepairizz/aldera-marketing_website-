'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WORK_ITEMS = [
  { id: 1, src: '/images/hero-1.jpg', title: 'Architectural Form', category: 'Fashion' },
  { id: 2, src: '/images/hero-2.jpg', title: 'Geometric Study', category: 'Editorial' },
  { id: 3, src: '/images/hero-3.jpg', title: 'Motion Captured', category: 'Photography' },
  { id: 4, src: '/images/hero-4.jpg', title: 'Brutalist Line', category: 'Marketing' },
  { id: 5, src: '/images/hero-5.jpg', title: 'Fabric in Air', category: 'E-commerce' },
  { id: 6, src: '/images/hero-1.jpg', title: 'Studio Portrait', category: 'Fashion' },
  { id: 7, src: '/images/hero-2.jpg', title: 'Shadow & Form', category: 'Editorial' },
  { id: 8, src: '/images/hero-3.jpg', title: 'Dynamic Silhouette', category: 'Photography' },
  { id: 9, src: '/images/hero-4.jpg', title: 'Concrete Horizon', category: 'Marketing' },
];

// Split into 3 columns
const COLUMNS = [
  WORK_ITEMS.filter((_, i) => i % 3 === 0),
  WORK_ITEMS.filter((_, i) => i % 3 === 1),
  WORK_ITEMS.filter((_, i) => i % 3 === 2),
];

export default function WorkMatrix() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Columns drift in opposite directions on scroll
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      colRefs.current.forEach((col, i) => {
        if (!col) return;
        const dir = i % 2 === 0 ? -1 : 1;
        gsap.to(col, {
          yPercent: dir * 15,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      style={{
        backgroundColor: 'var(--porcelain)',
        padding: '8rem 4vw',
        overflow: 'hidden',
      }}
    >
      {/* Section header */}
      <div style={{ marginBottom: '4rem' }}>
        <h2 className="text-h2" style={{ color: 'var(--onyx)' }}>
          Selected{' '}
          <em className="accent-serif">work.</em>
        </h2>
      </div>

      {/* Three-column grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem',
        }}
      >
        {COLUMNS.map((col, ci) => (
          <div
            key={ci}
            ref={(el) => { colRefs.current[ci] = el; }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              marginTop: ci === 1 ? '4rem' : ci === 2 ? '8rem' : '0',
              willChange: 'transform',
            }}
          >
            {col.map((item) => (
              <div
                key={item.id}
                data-cursor="view"
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  position: 'relative',
                  aspectRatio: '3/4',
                  borderRadius: 6,
                  overflow: 'hidden',
                  cursor: 'none',
                  transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)',
                  transform: hoveredId === item.id ? 'scale(1.02)' : 'scale(1)',
                }}
                role="article"
                aria-label={`${item.title} — ${item.category}`}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="33vw"
                  style={{
                    objectFit: 'cover',
                    filter: hoveredId === item.id ? 'grayscale(0%)' : 'grayscale(25%)',
                    transition: 'filter 0.6s ease',
                  }}
                />

                {/* Hover overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(10,10,10,0.7) 0%, transparent 50%)',
                    opacity: hoveredId === item.id ? 1 : 0,
                    transition: 'opacity 0.4s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '1.5rem',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--electric-red)',
                      marginBottom: '0.35rem',
                    }}
                  >
                    {item.category}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: 'var(--porcelain)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {item.title}
                  </p>
                </div>

                {/* Electric Red corner accent on hover */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: hoveredId === item.id ? '3px' : '0px',
                    height: '40%',
                    backgroundColor: 'var(--electric-red)',
                    transition: 'width 0.3s ease',
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
