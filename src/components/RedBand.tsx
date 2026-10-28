'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { numeral: '340', label: 'Projects' },
  { numeral: '12', label: 'Seasons' },
  { numeral: '98', label: 'Clients' },
];

export default function RedBand() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const numRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Count-up animation on scroll into view
      STATS.forEach((stat, i) => {
        const el = numRefs.current[i];
        if (!el) return;

        const endVal = parseInt(stat.numeral, 10);
        const obj = { val: 0 };

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              val: endVal,
              duration: 1.8,
              ease: 'power2.out',
              delay: i * 0.15,
              onUpdate: () => {
                if (el) el.textContent = String(Math.round(obj.val));
              },
            });
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: 'var(--electric-red)',
        padding: '6rem 4vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'clamp(3rem, 8vw, 8rem)',
        flexWrap: 'wrap',
      }}
      aria-label="Agency statistics"
    >
      {STATS.map((stat, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span
            ref={(el) => { numRefs.current[i] = el; }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(4rem, 10vw, 9rem)',
              fontWeight: 800,
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              color: 'var(--onyx)',
              fontVariantNumeric: 'tabular-nums',
            }}
            aria-label={`${stat.numeral} ${stat.label}`}
          >
            0
          </span>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.9rem',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--onyx)',
              opacity: 0.7,
            }}
          >
            {stat.label}
          </span>
        </div>
      ))}
    </section>
  );
}
