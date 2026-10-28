'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CASE_STUDY, type CaseItem } from '../lib/content';

gsap.registerPlugin(ScrollTrigger);

const pad = (n: number) => String(n).padStart(2, '0');
const U = (n: number) => `calc(var(--u) * ${n})`;

export default function WorksStack() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);

  const total = CASE_STUDY.items.length;

  /* ---- horizontal pinned track ---- */
  useEffect(() => {
    const pin = pinRef.current;
    const track = trackRef.current;
    const bar = barRef.current;
    if (!pin || !track) return;

    const items = gsap.utils.toArray<HTMLElement>('[data-item]', track);

    const getDist = () => {
      const trackW = track.scrollWidth || track.offsetWidth;
      const minFallback = items.length * 360;
      return Math.max(minFallback, trackW - window.innerWidth + window.innerWidth * 0.15);
    };

    const ctx = gsap.context(() => {
      const updateIndex = () => {
        const x = Math.abs(Number(gsap.getProperty(track, 'x')) || 0);
        const probe = x + window.innerWidth * 0.45;
        let idx = 0;
        items.forEach((el, i) => {
          if (el.offsetLeft <= probe) idx = i;
        });
        setActive(idx);
      };

      const scrollTween = gsap.to(track, {
        x: () => -getDist(),
        ease: 'none',
        scrollTrigger: {
          trigger: pin,
          start: 'top top',
          end: () => `+=${getDist()}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (bar) bar.style.transform = `scaleX(${self.progress})`;
            updateIndex();
          },
        },
      });

      // Reveal each item as it enters from the right
      items.forEach((item) => {
        const media = item.querySelector<HTMLElement>('[data-media]');
        const img = item.querySelector<HTMLElement>('[data-img]');
        const st = {
          trigger: item,
          containerAnimation: scrollTween,
          start: 'left 92%',
          toggleActions: 'play none none none',
        };

        if (media && img) {
          gsap.fromTo(
            media,
            { clipPath: 'inset(0% 0% 100% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'power3.out', scrollTrigger: st }
          );
          gsap.fromTo(
            img,
            { scale: 1.15 },
            { scale: 1, duration: 1.4, ease: 'power3.out', scrollTrigger: st }
          );
        }
        const text = item.querySelectorAll<HTMLElement>('[data-text]');
        if (text.length) {
          gsap.fromTo(
            text,
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.08, scrollTrigger: st }
          );
        }
      });
    }, pin);

    // Refresh ScrollTrigger to ensure accurate layout calculations
    ScrollTrigger.refresh();
    const t1 = setTimeout(() => ScrollTrigger.refresh(), 150);
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 600);
    if (document.fonts) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      ctx.revert();
    };
  }, []);

  /* ---- counter roll ---- */
  useEffect(() => {
    const el = numRef.current;
    if (!el) return;
    gsap.fromTo(el, { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.4, ease: 'power3.out' });
  }, [active]);

  const renderItem = (item: CaseItem, i: number) => {
    switch (item.type) {
      case 'intro':
        return (
          <div
            key={i}
            data-item
            className="flex shrink-0 flex-col justify-between"
            style={{ width: U(48), height: U(46) }}
          >
            <div>
              <h3
                data-text
                className="font-display text-onyx"
                style={{
                  fontSize: 'clamp(2rem, 3.8vw, 3.5rem)',
                  fontWeight: 600,
                  lineHeight: 1,
                  letterSpacing: '-0.035em',
                }}
              >
                {CASE_STUDY.title}
              </h3>
              <p
                data-text
                className="mt-4 max-w-[34ch] font-body leading-relaxed text-onyx/60"
                style={{ fontSize: 'clamp(0.8125rem, 0.95vw, 0.95rem)' }}
              >
                {CASE_STUDY.intro}
              </p>
            </div>

            <dl data-text className="w-full">
              {CASE_STUDY.meta.map((row: { label: string; value: string }) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between border-t border-onyx/10 py-2 font-body text-[0.75rem]"
                >
                  <dt className="text-onyx/45">{row.label}</dt>
                  <dd className="text-onyx">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        );

      case 'statement':
        return (
          <div key={i} data-item className="shrink-0 flex flex-col justify-center" style={{ width: U(40), height: U(46) }}>
            <span data-text className="block font-body text-[0.6875rem] font-medium text-electric-red uppercase tracking-wider">
              {item.label}
            </span>
            <p
              data-text
              className="mt-3 font-display text-onyx/85"
              style={{
                fontSize: 'clamp(1.2rem, 2vw, 1.85rem)',
                lineHeight: 1.25,
                letterSpacing: '-0.035em',
                fontWeight: 600,
              }}
            >
              {item.text}
            </p>
          </div>
        );

      default:
        return (
          <figure
            key={i}
            data-item
            className="m-0 shrink-0"
            style={{ width: U(item.height * item.ratio) }}
          >
            <div
              data-media
              className="relative w-full overflow-hidden bg-onyx/5 rounded-[8px]"
              style={{ height: U(item.height) }}
            >
              <Image
                data-img
                src={item.src}
                alt={item.alt}
                fill
                quality={90}
                sizes="(max-width: 768px) 70vw, 40vw"
                className="object-cover will-change-transform"
              />
            </div>
            <figcaption className="mt-2 font-body text-[0.6875rem] leading-snug text-onyx">
              {item.caption}
            </figcaption>
            {item.type === 'tile' && (
              <p data-text className="mt-2 font-body text-[0.6875rem] leading-relaxed text-onyx/55">
                {item.text}
              </p>
            )}
          </figure>
        );
    }
  };

  return (
    <section
      id="case-study"
      ref={pinRef}
      className="relative w-full h-[100svh] bg-porcelain text-onyx overflow-hidden flex flex-col justify-between my-16 md:my-24"
      style={{ ['--u' as string]: 'min(1svh, 0.9vw)' }}
      aria-label="Case study: featured project"
    >
      {/* Section header inside the pinned viewport: always sticky with the case study */}
      <div className="mx-auto flex w-[calc(100%-8vw)] max-w-7xl items-end justify-between border-b border-onyx/10 pb-4 pt-6 sm:pt-8 flex-shrink-0 z-20">
        <div>
          <span className="font-body text-label text-electric-red font-semibold uppercase tracking-widest">Case Study</span>
          <h2 className="text-h2 mt-1 text-onyx font-display font-semibold">Featured Case Study</h2>
        </div>
        <div className="flex items-center gap-6">
          <span className="font-body text-label text-onyx/50 hidden sm:inline-block">Scroll to explore</span>
          <Link
            href="/works"
            className="text-xs uppercase tracking-widest text-electric-red font-body font-medium hover:text-onyx transition-colors flex items-center gap-1.5"
          >
            <span>All Case Studies</span>
            <span>→</span>
          </Link>
        </div>
      </div>

      {/* Pinned horizontal case study track */}
      <div className="relative w-full flex-grow overflow-hidden flex items-center">
        <div
          ref={trackRef}
          className="relative flex w-max items-start will-change-transform"
          style={{
            paddingLeft: 'calc((100vw - min(100vw - 8vw, 80rem)) / 2)',
            paddingRight: '12vw',
            columnGap: U(4.4),
          }}
        >
          {CASE_STUDY.items.map(renderItem)}
        </div>
      </div>

      {/* Progress bar + counter at the bottom of the sticky frame */}
      <div className="w-[calc(100%-8vw)] max-w-7xl mx-auto pb-6 pt-2 flex-shrink-0 z-20">
        <div className="relative h-px w-full bg-onyx/10">
          <div
            ref={barRef}
            className="absolute inset-0 origin-left bg-electric-red"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
        <div className="mt-3 flex items-baseline justify-between font-body text-[0.6875rem] tabular-nums">
          <div className="flex items-baseline gap-1">
            <span className="inline-block overflow-hidden">
              <span ref={numRef} className="inline-block font-medium text-onyx">
                {pad(active + 1)}
              </span>
            </span>
            <span className="text-onyx/40">/ {pad(total)}</span>
          </div>

          <span className="text-onyx/40">
            {CASE_STUDY.slug} · {active < total ? CASE_STUDY.items[active]?.type : ''}
          </span>
        </div>
      </div>
    </section>
  );
}
