'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WORK_PASS_ITEMS } from '../lib/content';

gsap.registerPlugin(ScrollTrigger);

export default function WorkPass() {
  const containerRef = useRef<HTMLElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const laneLeftRef = useRef<HTMLDivElement>(null);
  const laneCenterRef = useRef<HTMLDivElement>(null);
  const laneRightRef = useRef<HTMLDivElement>(null);

  const leftItems = WORK_PASS_ITEMS.filter((item) => item.col === 'left');
  const centerItems = WORK_PASS_ITEMS.filter((item) => item.col === 'center');
  const rightItems = WORK_PASS_ITEMS.filter((item) => item.col === 'right');

  useEffect(() => {
    const container = containerRef.current;
    const pinWrap = pinWrapRef.current;
    const leftLane = laneLeftRef.current;
    const centerLane = laneCenterRef.current;
    const rightLane = laneRightRef.current;
    if (!container || !pinWrap || !leftLane || !centerLane || !rightLane) return;

    const ctx = gsap.context(() => {
      // 1. PIN the entire section to viewport so it is truly STICKY
      // As the user scrolls, the 3 lanes glide upwards at different parallax velocities
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          pin: pinWrap,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Left lane: fast upward flow
      tl.fromTo(
        leftLane,
        { y: '50vh' },
        { y: '-135vh', ease: 'none' },
        0
      );

      // Center lane: highest velocity drift creating dramatic depth
      tl.fromTo(
        centerLane,
        { y: '75vh' },
        { y: '-185vh', ease: 'none' },
        0
      );

      // Right lane: moderate counter-rhythm drift
      tl.fromTo(
        rightLane,
        { y: '35vh' },
        { y: '-115vh', ease: 'none' },
        0
      );

      // 2. Inner card image parallax
      const innerImages = container.querySelectorAll('.card-parallax-img');
      innerImages.forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -10, scale: 1.14 },
          {
            yPercent: 10,
            scale: 1.02,
            ease: 'none',
            scrollTrigger: {
              trigger: container,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.8,
            },
          }
        );
      });
    }, container);

    // Refresh triggers to ensure exact dimensions
    ScrollTrigger.refresh();
    const t = setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="works-pass"
      ref={containerRef}
      className="relative w-full bg-onyx text-porcelain z-10"
      style={{ height: '340vh' }}
      aria-label="Works showcase stream"
    >
      {/* Pinned Sticky Viewport Frame: locked to screen while user scrolls through 340vh */}
      <div
        ref={pinWrapRef}
        className="w-full h-[100svh] overflow-hidden relative flex flex-col justify-center"
      >
        {/* Editorial Eyebrow */}
        <div className="absolute top-6 left-6 sm:left-12 right-6 sm:right-12 max-w-7xl mx-auto flex items-center justify-between border-b border-porcelain/15 pb-3 pointer-events-none z-20">
          <span className="font-body text-label text-porcelain/70 uppercase tracking-widest font-medium">
            Selected Work
          </span>
          <span className="font-body text-xs text-porcelain/40 uppercase tracking-widest hidden sm:inline-block">
            Stream
          </span>
        </div>
        {/* Sticky Giant "WORKS" Background Heading locked to viewport center */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <h2
            className="font-display font-semibold uppercase text-porcelain/90 select-none text-center tracking-tighter"
            style={{
              fontSize: 'clamp(5.5rem, 19vw, 17rem)',
              fontWeight: 600,
              lineHeight: 1.0,
              letterSpacing: '-0.035em',
            }}
          >
            WORKS
          </h2>
        </div>

        {/* 3 Non-overlapping parallax lanes scrolling vertically OVER the sticky background */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 pointer-events-auto h-full items-start">
          {/* Lane 1 (Left) */}
          <div
            ref={laneLeftRef}
            className="flex flex-col gap-10 sm:gap-16 will-change-transform"
          >
            {leftItems.map((item, idx) => {
              const imgUrl = typeof item.image === 'string' ? item.image : item.image?.url;

              return (
                <div
                  key={`left-${item.title}-${idx}`}
                  className="w-full max-w-[360px] mx-auto rounded-[18px] overflow-hidden border border-porcelain/20 bg-onyx shadow-2xl group cursor-pointer will-change-transform"
                  style={{ aspectRatio: '4/5' }}
                  data-cursor="view"
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={imgUrl}
                      alt={item.title}
                      fill
                      className="card-parallax-img object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      sizes="(max-width: 640px) 90vw, 30vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-onyx/90 via-onyx/25 to-transparent flex flex-col justify-end p-5">
                      <span className="font-sans text-[11px] uppercase tracking-widest text-electric-red font-semibold mb-1">
                        {item.category}
                      </span>
                      <span className="font-sans font-semibold text-base sm:text-lg text-porcelain truncate">
                        {item.title}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Lane 2 (Center) */}
          <div
            ref={laneCenterRef}
            className="flex flex-col gap-10 sm:gap-16 will-change-transform"
          >
            {centerItems.map((item, idx) => {
              const imgUrl = typeof item.image === 'string' ? item.image : item.image?.url;

              return (
                <div
                  key={`center-${item.title}-${idx}`}
                  className="w-full max-w-[360px] mx-auto rounded-[18px] overflow-hidden border border-porcelain/20 bg-onyx shadow-2xl group cursor-pointer will-change-transform"
                  style={{ aspectRatio: '4/5' }}
                  data-cursor="view"
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={imgUrl}
                      alt={item.title}
                      fill
                      className="card-parallax-img object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      sizes="(max-width: 640px) 90vw, 30vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-onyx/90 via-onyx/25 to-transparent flex flex-col justify-end p-5">
                      <span className="font-sans text-[11px] uppercase tracking-widest text-electric-red font-semibold mb-1">
                        {item.category}
                      </span>
                      <span className="font-sans font-semibold text-base sm:text-lg text-porcelain truncate">
                        {item.title}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Lane 3 (Right) */}
          <div
            ref={laneRightRef}
            className="flex flex-col gap-10 sm:gap-16 will-change-transform"
          >
            {rightItems.map((item, idx) => {
              const imgUrl = typeof item.image === 'string' ? item.image : item.image?.url;

              return (
                <div
                  key={`right-${item.title}-${idx}`}
                  className="w-full max-w-[360px] mx-auto rounded-[18px] overflow-hidden border border-porcelain/20 bg-onyx shadow-2xl group cursor-pointer will-change-transform"
                  style={{ aspectRatio: '4/5' }}
                  data-cursor="view"
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={imgUrl}
                      alt={item.title}
                      fill
                      className="card-parallax-img object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      sizes="(max-width: 640px) 90vw, 30vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-onyx/90 via-onyx/25 to-transparent flex flex-col justify-end p-5">
                      <span className="font-sans text-[11px] uppercase tracking-widest text-electric-red font-semibold mb-1">
                        {item.category}
                      </span>
                      <span className="font-sans font-semibold text-base sm:text-lg text-porcelain truncate">
                        {item.title}
                      </span>
                    </div>
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
