'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMAGERY } from '../lib/content';
import { getLenis } from './SmoothScroll';

gsap.registerPlugin(ScrollTrigger);

const CHAPTERS = [
  {
    num: '01',
    name: 'Discover',
    label: 'Chapter 01 · Discover',
    headline: 'We start with the question behind the brief',
    image: IMAGERY.brandIdentity[0],
    imageSide: 'right' as const,
  },
  {
    num: '02',
    name: 'Define',
    label: 'Chapter 02 · Define',
    headline: 'One idea, sharpened until it cuts',
    image: IMAGERY.packagingProduct[2],
    imageSide: 'left' as const,
  },
  {
    num: '03',
    name: 'Design',
    label: 'Chapter 03 · Design',
    headline: 'Every detail built, tested and refined',
    image: IMAGERY.photoFilm[0],
    imageSide: 'right' as const,
  },
  {
    num: '04',
    name: 'Deliver',
    label: 'Chapter 04 · Deliver',
    headline: 'Launched so the work speaks for itself',
    image: IMAGERY.campaignsAds[0],
    imageSide: 'left' as const,
  },
];

export default function Process() {
  const containerRef = useRef<HTMLElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeStep, setActiveStep] = useState(0);
  const activeStepRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    const pinWrap = pinWrapRef.current;
    const track = trackRef.current;
    const windowEl = windowRef.current;
    if (!container || !pinWrap || !track || !windowEl) return;

    const ctx = gsap.context(() => {
      const totalSteps = CHAPTERS.length;

      // Function to calculate exact scroll distance so each chapter lines up perfectly
      const getScrollDist = () => {
        const firstRow = rowRefs.current[0];
        if (!firstRow) return track.scrollHeight - windowEl.clientHeight;
        const rowHeight = firstRow.offsetHeight;
        return rowHeight * (totalSteps - 1);
      };

      // 1. PIN the entire Process section to viewport
      // As user scrolls, the chapters track translates vertically
      gsap.to(track, {
        y: () => -getScrollDist(),
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          pin: pinWrap,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: 1 / (totalSteps - 1),
            duration: { min: 0.25, max: 0.5 },
            ease: 'power2.inOut',
          },
          onUpdate: (self) => {
            // Determine active chapter based on scroll progress
            const rawStep = self.progress * (totalSteps - 1);
            const currentStep = Math.min(
              totalSteps - 1,
              Math.max(0, Math.round(rawStep))
            );
            if (currentStep !== activeStepRef.current) {
              activeStepRef.current = currentStep;
              setActiveStep(currentStep);
            }
          },
        },
      });
    }, container);

    ScrollTrigger.refresh();
    const t = setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, []);

  // Jump smoothly to chapter on tick click
  const handleChapterClick = useCallback((index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const totalSteps = CHAPTERS.length;
    const scrollDistance = container.offsetHeight - window.innerHeight;
    const targetScroll = container.offsetTop + (index / (totalSteps - 1)) * scrollDistance;

    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(targetScroll, { duration: 1.0 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  }, []);

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative w-full bg-porcelain text-onyx mt-16 md:mt-24"
      style={{ height: '300vh' }}
      aria-label="Studio Process Chapters"
    >
      {/* Pinned Sticky Frame: locked to viewport from 'Our Process' to end of section */}
      <div
        ref={pinWrapRef}
        className="w-full h-[100svh] overflow-hidden relative flex flex-col justify-start bg-porcelain"
      >
        {/* Sticky Process Section Header (No progression line across bottom) */}
        <div className="w-full bg-porcelain border-b border-onyx/10 shrink-0 z-20">
          <div className="mx-auto flex w-[calc(100%-8vw)] max-w-7xl items-end justify-between py-5 sm:py-6">
            <div>
              <span className="font-body text-label text-electric-red uppercase tracking-widest font-semibold flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-electric-red animate-pulse" />
                Our Process
              </span>
              <h2 className="text-h2 mt-1 sm:mt-2 text-onyx font-display font-semibold tracking-tight">
                How we work
              </h2>
            </div>

            {/* Desktop Chapter Ticks with active electric-red state */}
            <div className="hidden sm:flex items-center gap-3 md:gap-4 lg:gap-6 text-xs uppercase tracking-widest font-body">
              {CHAPTERS.map((ch, idx) => {
                const isActive = activeStep === idx;
                return (
                  <div key={ch.num} className="flex items-center gap-3 md:gap-4 lg:gap-6">
                    <button
                      type="button"
                      onClick={() => handleChapterClick(idx)}
                      className={`flex items-center gap-2 transition-all duration-300 py-1 cursor-pointer ${
                        isActive
                          ? 'text-electric-red font-semibold'
                          : 'text-onyx/45 hover:text-onyx font-medium'
                      }`}
                      aria-label={`Jump to ${ch.label}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          isActive
                            ? 'bg-electric-red scale-100 shadow-[0_0_8px_rgba(255,42,42,0.8)]'
                            : 'bg-onyx/20 scale-75'
                        }`}
                      />
                      <span>
                        {ch.num} {ch.name}
                      </span>
                    </button>
                    {idx < CHAPTERS.length - 1 && (
                      <span className="text-onyx/20 select-none pointer-events-none">/</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile active chapter badge */}
            <div className="sm:hidden flex items-center gap-2 text-xs uppercase tracking-widest font-body text-electric-red font-semibold pb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-electric-red animate-pulse" />
              <span>
                {CHAPTERS[activeStep].num} {CHAPTERS[activeStep].name}
              </span>
            </div>
          </div>
        </div>

        {/* Viewport Window for the scrolling chapters */}
        <div ref={windowRef} className="relative w-full flex-1 overflow-hidden">
          <div
            ref={trackRef}
            className="w-full flex flex-col will-change-transform"
          >
            {CHAPTERS.map((ch, idx) => {
              const isRightImage = ch.imageSide === 'right';

              return (
                <div
                  key={ch.num}
                  ref={(el) => {
                    rowRefs.current[idx] = el;
                  }}
                  className="relative w-full border-b border-onyx/10 last:border-b-0 flex flex-col md:flex-row items-stretch shrink-0"
                  style={{
                    height: 'clamp(320px, 56vh, 520px)',
                  }}
                >
                  {/* Left Column (26% on desktop) - reduced image cards size as original */}
                  <div className="w-full md:w-[26%] relative border-r border-onyx/10 overflow-hidden hidden md:block">
                    {!isRightImage ? (
                      /* Full-bleed full-colour 3:4 image edge to edge */
                      <div className="chapter-img-wrap relative w-full h-full overflow-hidden bg-onyx">
                        <div className="chapter-img-inner relative w-full h-[115%] -top-[7.5%]">
                          <Image
                            src={ch.image.url}
                            alt={ch.headline}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 30vw"
                          />
                        </div>
                      </div>
                    ) : (
                      /* Empty outer cell */
                      <div className="w-full h-full bg-porcelain" />
                    )}
                  </div>

                  {/* Centre Column (48% on desktop): perfectly centred text block, always visible */}
                  <div className="w-full md:w-[48%] flex flex-col items-center justify-center p-8 sm:p-12 text-center border-r border-onyx/10">
                    <div className="max-w-md mx-auto">
                      {/* Small Label: Inter 500, 0.75rem, Onyx at 55% */}
                      <span className="block font-sans font-medium text-[0.75rem] uppercase tracking-widest text-onyx/55 mb-4">
                        {ch.label}
                      </span>

                      {/* Two-line headline: Inter 400, clamp(1.75rem, 3.2vw, 2.9rem) - 100% visible */}
                      <div>
                        <h3
                          className="chapter-headline font-sans font-normal text-onyx leading-[1.08] tracking-[-0.035em] text-balance opacity-100"
                          style={{
                            fontSize: 'clamp(1.75rem, 3.2vw, 2.9rem)',
                          }}
                        >
                          {ch.headline}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Right Column (26% on desktop) - reduced image cards size as original */}
                  <div className="w-full md:w-[26%] relative overflow-hidden hidden md:block">
                    {isRightImage ? (
                      /* Full-bleed full-colour 3:4 image edge to edge */
                      <div className="chapter-img-wrap relative w-full h-full overflow-hidden bg-onyx">
                        <div className="chapter-img-inner relative w-full h-[115%] -top-[7.5%]">
                          <Image
                            src={ch.image.url}
                            alt={ch.headline}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 30vw"
                          />
                        </div>
                      </div>
                    ) : (
                      /* Empty outer cell */
                      <div className="w-full h-full bg-porcelain" />
                    )}
                  </div>

                  {/* Mobile Fallback: Image below text on small screens */}
                  <div className="md:hidden w-full h-48 relative overflow-hidden bg-onyx shrink-0">
                    <Image
                      src={ch.image.url}
                      alt={ch.headline}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
