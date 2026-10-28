'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RESULTS_METRICS } from '../lib/content';

gsap.registerPlugin(ScrollTrigger);

export default function ResultsBand() {
  const sectionRef = useRef<HTMLElement>(null);
  const numRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      RESULTS_METRICS.forEach((item, idx) => {
        const el = numRefs.current[idx];
        if (!el) return;

        const counterObj = { val: 0 };

        gsap.to(counterObj, {
          val: item.value,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            if (el) {
              el.textContent = Math.round(counterObj.val) + item.suffix;
            }
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="results"
      ref={sectionRef}
      className="relative w-full py-16 sm:py-20 md:py-24 bg-electric-red text-onyx overflow-hidden"
      aria-label="Studio impact and milestones"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between mb-10 sm:mb-12 pb-4 border-b border-onyx/20">
          <span className="font-body text-label text-onyx font-bold tracking-widest uppercase text-xs sm:text-sm">
            Track Record
          </span>
          <span className="font-body text-xs text-onyx/80 uppercase tracking-wider font-mono">
            Measured Studio Impact
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-14 lg:gap-20 items-center">
          {RESULTS_METRICS.map((metric, i) => (
            <div key={metric.label} className="flex flex-col items-center justify-center text-center border-t border-onyx/20 pt-6">
              <div className="flex items-center justify-center overflow-visible">
                <span
                  ref={(el) => {
                    numRefs.current[i] = el;
                  }}
                  className="font-display font-semibold tracking-tight leading-none text-onyx whitespace-nowrap tabular-nums text-center"
                  style={{
                    fontSize: 'clamp(3.5rem, 7vw, 6rem)',
                    fontWeight: 600,
                    lineHeight: 1.05,
                    letterSpacing: '-0.035em',
                  }}
                >
                  0{metric.suffix}
                </span>
              </div>
              <span className="font-body font-medium text-xs sm:text-sm uppercase tracking-widest text-onyx/85 mt-3 text-center">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
