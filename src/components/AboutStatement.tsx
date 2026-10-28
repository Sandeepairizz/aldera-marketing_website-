'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ABOUT_CAPSULES } from '../lib/content';

gsap.registerPlugin(ScrollTrigger);

export default function AboutStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const capsule1Ref = useRef<HTMLSpanElement>(null);
  const capsule2Ref = useRef<HTMLSpanElement>(null);
  const capsule3Ref = useRef<HTMLSpanElement>(null);
  const capsule4Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const textBlock = textBlockRef.current;
    const c1 = capsule1Ref.current;
    const c2 = capsule2Ref.current;
    const c3 = capsule3Ref.current;
    const c4 = capsule4Ref.current;
    if (!section || !textBlock || !c1 || !c2 || !c3 || !c4) return;

    const ctx = gsap.context(() => {
      // Scrubbed timeline for statement block and expanding capsules
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'center 45%',
          scrub: 0.8,
        },
      });

      tl.fromTo(
        textBlock,
        { yPercent: 12, scale: 0.96, opacity: 0.7 },
        { yPercent: 0, scale: 1.0, opacity: 1, ease: 'none' },
        0
      );

      tl.fromTo(
        [c1, c2, c3, c4],
        { width: '1em' },
        {
          width: '2.1em',
          stagger: 0.12,
          ease: 'power2.out',
        },
        0.05
      );
    }, section);

    // Refresh ScrollTrigger after fonts and images load
    if (document.fonts) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full h-[100svh] min-h-[640px] bg-porcelain text-onyx flex flex-col items-center justify-center px-6 sm:px-12 select-none overflow-hidden"
      aria-label="About Aldera"
    >
      {/* Editorial Eyebrow */}
      <div className="absolute top-8 left-6 sm:left-12 right-6 sm:right-12 max-w-7xl mx-auto flex items-center justify-between border-b border-onyx/10 pb-4 pointer-events-none z-10">
        <span className="font-body text-label text-onyx/60 uppercase tracking-widest font-medium">
          About
        </span>
        <span className="font-body text-xs text-onyx/40 uppercase tracking-widest hidden sm:inline-block">
          Studio Thesis
        </span>
      </div>

      <div className="w-full max-w-7xl mx-auto flex items-center justify-center pt-8">
        {/* Full-screen centered Statement with 4 balanced expanding capsules */}
        <div ref={textBlockRef} className="w-full text-center will-change-transform">
          <h2
            className="text-statement text-onyx inline-block max-w-[22em] mx-auto text-center"
            style={{
              textWrap: 'balance',
            }}
          >
            <span>Made for </span>
            {/* Capsule 1: The Bold */}
            <span
              ref={capsule1Ref}
              className="inline-block relative overflow-hidden rounded-full shadow-md border border-onyx/15 mx-1.5 sm:mx-2.5 will-change-[width]"
              style={{
                height: '0.82em',
                width: '2.1em',
                verticalAlign: 'middle',
              }}
            >
              <Image
                src={ABOUT_CAPSULES[0].url}
                alt={ABOUT_CAPSULES[0].alt}
                fill
                className="object-cover"
                sizes="180px"
              />
            </span>
            <span>the bold, </span>
            <br className="hidden md:inline" />

            {/* Capsule 2: The Curious */}
            <span>the curious </span>
            <span
              ref={capsule2Ref}
              className="inline-block relative overflow-hidden rounded-full shadow-md border border-onyx/15 mx-1.5 sm:mx-2.5 will-change-[width]"
              style={{
                height: '0.82em',
                width: '2.1em',
                verticalAlign: 'middle',
              }}
            >
              <Image
                src={ABOUT_CAPSULES[1].url}
                alt={ABOUT_CAPSULES[1].alt}
                fill
                className="object-cover"
                sizes="180px"
              />
            </span>
            <span>and ambitious brands </span>
            <br className="hidden md:inline" />

            {/* Capsule 3: Visionary */}
            <span
              ref={capsule3Ref}
              className="inline-block relative overflow-hidden rounded-full shadow-md border border-onyx/15 mx-1.5 sm:mx-2.5 will-change-[width]"
              style={{
                height: '0.82em',
                width: '2.1em',
                verticalAlign: 'middle',
              }}
            >
              <Image
                src={ABOUT_CAPSULES[2].url}
                alt={ABOUT_CAPSULES[2].alt}
                fill
                className="object-cover"
                sizes="180px"
              />
            </span>
            <span>who shape culture at </span>

            {/* Capsule 4: Every Launch */}
            <span
              ref={capsule4Ref}
              className="inline-block relative overflow-hidden rounded-full shadow-md border border-onyx/15 mx-1.5 sm:mx-2.5 will-change-[width]"
              style={{
                height: '0.82em',
                width: '2.1em',
                verticalAlign: 'middle',
              }}
            >
              <Image
                src={ABOUT_CAPSULES[3].url}
                alt={ABOUT_CAPSULES[3].alt}
                fill
                className="object-cover"
                sizes="180px"
              />
            </span>
            <span>every launch.</span>
          </h2>
        </div>
      </div>
    </section>
  );
}
