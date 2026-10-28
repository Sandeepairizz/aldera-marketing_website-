'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMAGERY } from '../lib/content';

gsap.registerPlugin(ScrollTrigger);

export type ServiceImage = { src: string; alt: string };

export type Service = {
  id: string;
  num: string;
  slug: string;
  name: string;
  heading: string;
  text: string;
  tags: string[];
  images: ServiceImage[]; /* exactly 6 */
};

export const SERVICES: Service[] = [
  {
    id: '01',
    num: '01',
    slug: 'branding',
    name: 'Brand identity',
    heading: 'Branding',
    text: 'Identities built to last: strategy, naming, logo systems and guidelines that make a brand unmistakable.',
    tags: ['Strategy', 'Logo system', 'Guidelines'],
    images: [
      { src: IMAGERY.brandIdentity[0].url, alt: 'Luxury foil-stamped brand guideline book and chromatic swatches' },
      { src: IMAGERY.brandIdentity[1].url, alt: 'Minimalist brand stationery on rich terracotta background' },
      { src: IMAGERY.brandIdentity[2].url, alt: 'Dynamic abstract brand graphics and 3D typography' },
      { src: IMAGERY.brandIdentity[3].url, alt: 'Architectural illuminated studio signage on glass facade' },
      { src: IMAGERY.brandIdentity[4].url, alt: 'Minimalist corporate letterhead and business card suite' },
      { src: IMAGERY.brandIdentity[5].url, alt: 'Strategic brand identity moodboard and collateral' },
    ],
  },
  {
    id: '02',
    num: '02',
    slug: 'packaging',
    name: 'Packaging and product',
    heading: 'Packaging',
    text: 'Boxes, bottles and labels engineered for the shelf, with materials and finishes you can feel.',
    tags: ['Structure', 'Materials', 'Labels'],
    images: [
      { src: IMAGERY.packagingProduct[0].url, alt: 'Craft soda botanical beverage cans with matte finish' },
      { src: IMAGERY.packagingProduct[1].url, alt: 'Luxury cosmetic amber serum dropper bottle in sunlight' },
      { src: IMAGERY.packagingProduct[2].url, alt: 'Sculptural luxury eau de parfum bottle with amber refraction' },
      { src: IMAGERY.packagingProduct[5].url, alt: 'Specialty coffee bag with hot gold foil stamping' },
      { src: IMAGERY.packagingProduct[6].url, alt: 'Botanical cider bottle with tactile debossed label' },
      { src: IMAGERY.packagingProduct[7].url, alt: 'Ceramic luxury moisturizer vessel packaging' },
    ],
  },
  {
    id: '03',
    num: '03',
    slug: 'campaigns',
    name: 'Campaigns and advertising',
    heading: 'Campaigns',
    text: 'Big ideas for billboards, film and social, built to travel across every channel.',
    tags: ['Art direction', 'Outdoor', 'Launch'],
    images: [
      { src: IMAGERY.campaignsAds[0].url, alt: 'Metropolitan out-of-home illuminated billboard takeover' },
      { src: IMAGERY.campaignsAds[1].url, alt: 'Urban typographic paste-up posters on brick city wall' },
      { src: IMAGERY.campaignsAds[2].url, alt: 'Transit shelter advertising screen with glowing color blocks' },
      { src: IMAGERY.campaignsAds[3].url, alt: 'Digital outdoor media totem screen at twilight' },
      { src: IMAGERY.campaignsAds[4].url, alt: 'Graphic wild posting campaign across concrete urban wall' },
      { src: IMAGERY.campaignsAds[5].url, alt: 'Architectural mega-LED display screen in the night rain' },
    ],
  },
  {
    id: '04',
    num: '04',
    slug: 'digital',
    name: 'Web and app design',
    heading: 'Digital',
    text: 'Websites and apps with fluid interfaces, sharp systems and motion that feels alive.',
    tags: ['Web design', 'App UI', 'Motion'],
    images: [
      { src: IMAGERY.webAppUI[0].url, alt: 'Luxury digital product interface art direction' },
      { src: IMAGERY.webAppUI[1].url, alt: 'Boutique hospitality mobile application on iPhone screen' },
      { src: IMAGERY.webAppUI[2].url, alt: 'Digital typography system and interactive grid design' },
      { src: IMAGERY.webAppUI[3].url, alt: 'Editorial web design experience and fashion portfolio' },
      { src: IMAGERY.webAppUI[4].url, alt: 'Cinematic digital media application art direction' },
      { src: IMAGERY.brandIdentity[2].url, alt: 'Interactive digital brand experience and motion graphics' },
    ],
  },
  {
    id: '05',
    num: '05',
    slug: 'film',
    name: 'Photo and film',
    heading: 'Film',
    text: 'Photography and film that look like the brand: stills, product, direction and grade.',
    tags: ['Photography', 'Film', 'Grading'],
    images: [
      { src: IMAGERY.photoFilm[0].url, alt: 'Cinema production camera rig filming on location' },
      { src: IMAGERY.photoFilm[1].url, alt: 'Commercial studio still-life with geometric shadows' },
      { src: IMAGERY.photoFilm[2].url, alt: 'Gastronomy styling and directional spotlighting' },
      { src: IMAGERY.photoFilm[3].url, alt: 'Cinematographic editorial portrait and film lighting' },
      { src: IMAGERY.photoFilm[4].url, alt: 'Atmospheric architectural film still' },
      { src: IMAGERY.fashionLifestyle[2].url, alt: 'Dynamic editorial fashion and streetwear shoot' },
    ],
  },
  {
    id: '06',
    num: '06',
    slug: 'social',
    name: 'Social and content',
    heading: 'Social',
    text: 'Content series and feeds designed for culture, made to be recognised in a swipe.',
    tags: ['Content', 'Reels', 'Feed design'],
    images: [
      { src: IMAGERY.socialContent[0].url, alt: 'Curated editorial social feed on smartphone screen' },
      { src: IMAGERY.socialContent[1].url, alt: 'Content creator studio filming vertical cinema campaign' },
      { src: IMAGERY.socialContent[2].url, alt: 'Editorial still life curated for brand social feed' },
      { src: IMAGERY.socialContent[3].url, alt: 'Digital creators producing social storytelling reel' },
      { src: IMAGERY.fashionLifestyle[0].url, alt: 'Avant-garde fashion lookbook social content' },
      { src: IMAGERY.fashionLifestyle[1].url, alt: 'Vibrant studio capsule social series' },
    ],
  },
];

type SlotState = {
  current: ServiceImage;
  incoming: ServiceImage | null;
};

export default function Services() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Active step tracking
  const [activeStep, setActiveStep] = useState(0);
  const activeStepRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const isStageInViewRef = useRef(false);

  // Layer element references
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const slotRefs = useRef<{ [serviceIdx: number]: (HTMLDivElement | null)[] }>({});

  // 3 visible slots per service, 3 spare images per service
  const [slotsByService, setSlotsByService] = useState<{ [sIdx: number]: SlotState[] }>(() => {
    const initial: { [sIdx: number]: SlotState[] } = {};
    SERVICES.forEach((srv, idx) => {
      initial[idx] = [
        { current: srv.images[0], incoming: null },
        { current: srv.images[1], incoming: null },
        { current: srv.images[2], incoming: null },
      ];
    });
    return initial;
  });

  const sparePoolsRef = useRef<{ [sIdx: number]: ServiceImage[] }>({
    0: [SERVICES[0].images[3], SERVICES[0].images[4], SERVICES[0].images[5]],
    1: [SERVICES[1].images[3], SERVICES[1].images[4], SERVICES[1].images[5]],
    2: [SERVICES[2].images[3], SERVICES[2].images[4], SERVICES[2].images[5]],
    3: [SERVICES[3].images[3], SERVICES[3].images[4], SERVICES[3].images[5]],
    4: [SERVICES[4].images[3], SERVICES[4].images[4], SERVICES[4].images[5]],
    5: [SERVICES[5].images[3], SERVICES[5].images[4], SERVICES[5].images[5]],
  });

  const lastSwappedSlotRef = useRef<{ [sIdx: number]: number }>({
    0: -1, 1: -1, 2: -1, 3: -1, 4: -1, 5: -1,
  });

  const swapTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // Preload first 3 images of next service
  useEffect(() => {
    const nextIdx = Math.min(SERVICES.length - 1, activeStep + 1);
    SERVICES[nextIdx].images.slice(0, 3).forEach((img) => {
      if (typeof window !== 'undefined') {
        const preloader = new window.Image();
        preloader.src = img.src;
      }
    });
  }, [activeStep]);

  // Stage in-view intersection observer (to pause swaps when off-screen)
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isStageInViewRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );

    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  // GSAP Master Timeline driven by ScrollTrigger on wrapper
  useEffect(() => {
    if (prefersReducedMotion) return;

    const wrapper = wrapperRef.current;
    const stage = stageRef.current;
    if (!wrapper || !stage) return;

    const ctx = gsap.context(() => {
      const masterTl = gsap.timeline({ paused: true });
      const totalServices = SERVICES.length;

      // Initialize all layers
      SERVICES.forEach((_, idx) => {
        const layer = layerRefs.current[idx];
        if (!layer) return;

        if (idx === 0) {
          gsap.set(layer, { autoAlpha: 1, pointerEvents: 'auto' });
          const heading = layer.querySelector('.service-heading');
          const content = layer.querySelectorAll('.service-text, .service-tags, .service-link');
          const wrapA = layer.querySelector('.slot-a-wrap');
          const wrapB = layer.querySelector('.slot-b-wrap');
          const wrapC = layer.querySelector('.slot-c-wrap');
          const innerA = layer.querySelector('.slot-a-inner');
          const innerB = layer.querySelector('.slot-b-inner');
          const innerC = layer.querySelector('.slot-c-inner');

          if (heading) gsap.set(heading, { yPercent: 0, opacity: 1 });
          if (content.length) gsap.set(content, { y: 0, opacity: 1 });
          if (wrapA) gsap.set(wrapA, { clipPath: 'inset(0% 0% 0% 0%)', yPercent: 0 });
          if (wrapB) gsap.set(wrapB, { clipPath: 'inset(0% 0% 0% 0%)', yPercent: 0 });
          if (wrapC) gsap.set(wrapC, { clipPath: 'inset(0% 0% 0% 0%)', yPercent: 0 });
          if (innerA) gsap.set(innerA, { scale: 1.0 });
          if (innerB) gsap.set(innerB, { scale: 1.0 });
          if (innerC) gsap.set(innerC, { scale: 1.0 });
        } else {
          gsap.set(layer, { autoAlpha: 0, pointerEvents: 'none' });
          const heading = layer.querySelector('.service-heading');
          const content = layer.querySelectorAll('.service-text, .service-tags, .service-link');
          const wrapA = layer.querySelector('.slot-a-wrap');
          const wrapB = layer.querySelector('.slot-b-wrap');
          const wrapC = layer.querySelector('.slot-c-wrap');
          const innerA = layer.querySelector('.slot-a-inner');
          const innerB = layer.querySelector('.slot-b-inner');
          const innerC = layer.querySelector('.slot-c-inner');

          if (heading) gsap.set(heading, { yPercent: 100, opacity: 0 });
          if (content.length) gsap.set(content, { y: 20, opacity: 0 });
          if (wrapA) gsap.set(wrapA, { clipPath: 'inset(100% 0% 0% 0%)' });
          if (wrapB) gsap.set(wrapB, { clipPath: 'inset(100% 0% 0% 0%)' });
          if (wrapC) gsap.set(wrapC, { clipPath: 'inset(100% 0% 0% 0%)' });
          if (innerA) gsap.set(innerA, { scale: 1.12 });
          if (innerB) gsap.set(innerB, { scale: 1.12 });
          if (innerC) gsap.set(innerC, { scale: 1.12 });
        }
      });

      // Build transition sequence between services
      for (let i = 0; i < totalServices - 1; i++) {
        const currLayer = layerRefs.current[i];
        const nextLayer = layerRefs.current[i + 1];
        if (!currLayer || !nextLayer) continue;

        const currHeading = currLayer.querySelector('.service-heading');
        const currContent = currLayer.querySelectorAll('.service-text, .service-tags, .service-link');
        const currWrapA = currLayer.querySelector('.slot-a-wrap');
        const currWrapB = currLayer.querySelector('.slot-b-wrap');
        const currWrapC = currLayer.querySelector('.slot-c-wrap');

        const nextHeading = nextLayer.querySelector('.service-heading');
        const nextContent = nextLayer.querySelectorAll('.service-text, .service-tags, .service-link');
        const nextWrapA = nextLayer.querySelector('.slot-a-wrap');
        const nextWrapB = nextLayer.querySelector('.slot-b-wrap');
        const nextWrapC = nextLayer.querySelector('.slot-c-wrap');
        const nextInnerA = nextLayer.querySelector('.slot-a-inner');
        const nextInnerB = nextLayer.querySelector('.slot-b-inner');
        const nextInnerC = nextLayer.querySelector('.slot-c-inner');

        const stepStartTime = i * 1.0;
        const transitionStartTime = stepStartTime + 0.35; // Hold period before transition

        // 1. Outgoing animations:
        // Heading rises through mask and out
        if (currHeading) {
          masterTl.to(
            currHeading,
            { yPercent: -100, opacity: 0, duration: 0.35, ease: 'power2.in' },
            transitionStartTime
          );
        }

        // Paragraph, tags, link fade out
        if (currContent.length) {
          masterTl.to(
            currContent,
            { opacity: 0, y: -16, duration: 0.3, stagger: 0.04, ease: 'power2.in' },
            transitionStartTime
          );
        }

        // Outgoing images exit with clip-path upward and different travel distance (A: -6%, B: -10%, C: -8%)
        if (currWrapA) {
          masterTl.to(
            currWrapA,
            { clipPath: 'inset(0% 0% 100% 0%)', yPercent: -6, duration: 0.5, ease: 'power2.in' },
            transitionStartTime
          );
        }
        if (currWrapB) {
          masterTl.to(
            currWrapB,
            { clipPath: 'inset(0% 0% 100% 0%)', yPercent: -10, duration: 0.5, ease: 'power2.in' },
            transitionStartTime
          );
        }
        if (currWrapC) {
          masterTl.to(
            currWrapC,
            { clipPath: 'inset(0% 0% 100% 0%)', yPercent: -8, duration: 0.5, ease: 'power2.in' },
            transitionStartTime
          );
        }

        masterTl.set(currLayer, { autoAlpha: 0, pointerEvents: 'none' }, transitionStartTime + 0.5);

        // 2. Incoming animations:
        const incomingStart = transitionStartTime + 0.2;
        masterTl.set(nextLayer, { autoAlpha: 1, pointerEvents: 'auto' }, incomingStart);

        // Heading rises in from below
        if (nextHeading) {
          masterTl.fromTo(
            nextHeading,
            { yPercent: 100, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
            incomingStart
          );
        }

        // Paragraph, tags, link fade up with 0.08s stagger
        if (nextContent.length) {
          masterTl.fromTo(
            nextContent,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.45, stagger: 0.08, ease: 'power2.out' },
            incomingStart + 0.05
          );
        }

        // Incoming images reveal with clip-path wipe from bottom, scale 1.12 to 1, staggered 0.1s (B, then A, then C)
        // Image B (first)
        if (nextWrapB && nextInnerB) {
          masterTl.fromTo(
            nextWrapB,
            { clipPath: 'inset(100% 0% 0% 0%)', yPercent: 0 },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.55, ease: 'power2.out' },
            incomingStart
          );
          masterTl.fromTo(
            nextInnerB,
            { scale: 1.12 },
            { scale: 1.0, duration: 0.55, ease: 'power2.out' },
            incomingStart
          );
        }

        // Image A (second, +0.1s)
        if (nextWrapA && nextInnerA) {
          masterTl.fromTo(
            nextWrapA,
            { clipPath: 'inset(100% 0% 0% 0%)', yPercent: 0 },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.55, ease: 'power2.out' },
            incomingStart + 0.1
          );
          masterTl.fromTo(
            nextInnerA,
            { scale: 1.12 },
            { scale: 1.0, duration: 0.55, ease: 'power2.out' },
            incomingStart + 0.1
          );
        }

        // Image C (third, +0.2s)
        if (nextWrapC && nextInnerC) {
          masterTl.fromTo(
            nextWrapC,
            { clipPath: 'inset(100% 0% 0% 0%)', yPercent: 0 },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.55, ease: 'power2.out' },
            incomingStart + 0.2
          );
          masterTl.fromTo(
            nextInnerC,
            { scale: 1.12 },
            { scale: 1.0, duration: 0.55, ease: 'power2.out' },
            incomingStart + 0.2
          );
        }
      }

      // Add a trailing hold for the final service
      masterTl.to({}, { duration: 0.35 });

      // Create ScrollTrigger on the 660svh wrapper
      ScrollTrigger.create({
        trigger: wrapper,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        animation: masterTl,
        snap: {
          snapTo: 1 / (totalServices - 1),
          duration: { min: 0.3, max: 0.6 },
          ease: 'power2.inOut',
        },
        onUpdate: (self) => {
          const rawStep = self.progress * (totalServices - 1);
          const currentStep = Math.min(
            totalServices - 1,
            Math.max(0, Math.round(rawStep))
          );

          // Detect if currently in a transition zone
          const distanceToStep = Math.abs(rawStep - currentStep);
          isTransitioningRef.current = distanceToStep > 0.15;

          if (currentStep !== activeStepRef.current) {
            activeStepRef.current = currentStep;
            setActiveStep(currentStep);
          }
        },
      });
    }, wrapper);

    ScrollTrigger.refresh();
    const t = setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  // Random Image Swap Timer Logic
  const triggerRandomSwap = useCallback(() => {
    if (prefersReducedMotion) return;
    if (document.hidden) return;
    if (!isStageInViewRef.current) return;
    if (isTransitioningRef.current) return;

    const sIdx = activeStepRef.current;
    const spares = sparePoolsRef.current[sIdx];
    if (!spares || spares.length === 0) return;

    // Pick slot at random (never the same slot twice in a row)
    const lastSlot = lastSwappedSlotRef.current[sIdx] ?? -1;
    const candidates = [0, 1, 2].filter((slot) => slot !== lastSlot);
    const chosenSlot = candidates[Math.floor(Math.random() * candidates.length)];
    lastSwappedSlotRef.current[sIdx] = chosenSlot;

    // Pick random spare (never one currently visible)
    const spareIdx = Math.floor(Math.random() * spares.length);
    const newImage = spares[spareIdx];

    // Find the DOM slot element
    const layer = layerRefs.current[sIdx];
    if (!layer) return;
    const slotClass = chosenSlot === 0 ? '.slot-a' : chosenSlot === 1 ? '.slot-b' : '.slot-c';
    const slotEl = layer.querySelector(slotClass) as HTMLElement | null;

    if (!slotEl) return;

    // Mount incoming image and execute bottom wipe animation (0.9s, expo.out, scale 1.08 to 1)
    setSlotsByService((prev) => {
      const currentServiceSlots = [...(prev[sIdx] || [])];
      currentServiceSlots[chosenSlot] = {
        ...currentServiceSlots[chosenSlot],
        incoming: newImage,
      };
      return { ...prev, [sIdx]: currentServiceSlots };
    });

    // Animate incoming overlay
    requestAnimationFrame(() => {
      const incomingOverlay = slotEl.querySelector('.incoming-overlay') as HTMLElement | null;
      const incomingInner = slotEl.querySelector('.incoming-inner') as HTMLElement | null;

      if (incomingOverlay && incomingInner) {
        gsap.fromTo(
          incomingOverlay,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.9,
            ease: 'expo.out',
            overwrite: 'auto',
            onComplete: () => {
              // Finalize swap: current becomes newImage, old image returns to spare pool
              setSlotsByService((curr) => {
                const updatedServiceSlots = [...(curr[sIdx] || [])];
                const oldImage = updatedServiceSlots[chosenSlot].current;

                // Return old to spare pool and remove new from spare pool
                const updatedSpares = sparePoolsRef.current[sIdx].filter((img) => img.src !== newImage.src);
                updatedSpares.push(oldImage);
                sparePoolsRef.current[sIdx] = updatedSpares;

                updatedServiceSlots[chosenSlot] = {
                  current: newImage,
                  incoming: null,
                };
                return { ...curr, [sIdx]: updatedServiceSlots };
              });
            },
          }
        );

        gsap.fromTo(
          incomingInner,
          { scale: 1.08 },
          { scale: 1.0, duration: 0.9, ease: 'expo.out', overwrite: 'auto' }
        );
      }
    });
  }, [prefersReducedMotion]);

  // Schedule random swaps while service is active and held
  useEffect(() => {
    if (prefersReducedMotion) return;

    const scheduleNext = () => {
      if (swapTimerRef.current) clearTimeout(swapTimerRef.current);
      const isMobile = window.innerWidth < 768;
      const delay = isMobile ? 3000 : 2200 + Math.random() * 1000;

      swapTimerRef.current = setTimeout(() => {
        triggerRandomSwap();
        scheduleNext();
      }, delay);
    };

    scheduleNext();

    const onVisibilityChange = () => {
      if (document.hidden && swapTimerRef.current) {
        clearTimeout(swapTimerRef.current);
      } else {
        scheduleNext();
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      if (swapTimerRef.current) clearTimeout(swapTimerRef.current);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [activeStep, triggerRandomSwap, prefersReducedMotion]);

  // Subtle desktop cursor parallax for active collage
  useEffect(() => {
    if (prefersReducedMotion) return;
    const stage = stageRef.current;
    if (!stage) return;

    const onMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      const rect = stage.getBoundingClientRect();
      const nx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const ny = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

      const activeLayer = layerRefs.current[activeStepRef.current];
      if (!activeLayer) return;

      const slotA = activeLayer.querySelector('.slot-a');
      const slotB = activeLayer.querySelector('.slot-b');
      const slotC = activeLayer.querySelector('.slot-c');

      // A: up to 8px; B: up to 12px; C: up to 10px in opposite directions
      if (slotA) gsap.to(slotA, { x: nx * 8, y: ny * 8, duration: 0.6, ease: 'power2.out', overwrite: 'auto' });
      if (slotB) gsap.to(slotB, { x: -nx * 12, y: -ny * 12, duration: 0.6, ease: 'power2.out', overwrite: 'auto' });
      if (slotC) gsap.to(slotC, { x: nx * 10, y: -ny * 10, duration: 0.6, ease: 'power2.out', overwrite: 'auto' });
    };

    const onMouseLeave = () => {
      const activeLayer = layerRefs.current[activeStepRef.current];
      if (!activeLayer) return;
      const slots = activeLayer.querySelectorAll('.slot-a, .slot-b, .slot-c');
      gsap.to(slots, { x: 0, y: 0, duration: 0.6, ease: 'power2.out', overwrite: 'auto' });
    };

    stage.addEventListener('mousemove', onMouseMove);
    stage.addEventListener('mouseleave', onMouseLeave);

    return () => {
      stage.removeEventListener('mousemove', onMouseMove);
      stage.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [prefersReducedMotion]);

  // Reduced motion: Clean static vertical list
  if (prefersReducedMotion) {
    return (
      <section
        id="services"
        className="relative w-full bg-porcelain text-onyx border-t border-onyx/10 py-20 px-6 sm:px-12"
        aria-label="Aldera Studio Services"
      >
        <div className="max-w-7xl mx-auto flex flex-col gap-28">
          {SERVICES.map((service, sIdx) => (
            <div
              key={service.id}
              className="flex flex-col lg:flex-row items-center justify-between gap-12"
            >
              <div className="w-full lg:w-[40%] flex flex-col justify-start">
                <div className="flex items-center justify-between border-b border-onyx/10 pb-2 mb-3">
                  <span className="font-body text-label text-onyx/60 uppercase tracking-widest font-semibold">
                    Services
                  </span>
                  <span className="font-body text-label text-electric-red font-semibold tracking-wider">
                    {service.num}
                  </span>
                </div>
                <h2
                  className="font-display font-bold text-onyx mt-3"
                  style={{
                    fontSize: 'clamp(2.75rem, 6vw, 6rem)',
                    lineHeight: 1,
                    letterSpacing: '-0.035em',
                  }}
                >
                  {service.heading}
                </h2>
                <p className="font-body text-p text-onyx/70 max-w-[34ch] mt-4 leading-relaxed">
                  {service.text}
                </p>
                <div className="flex flex-wrap gap-2 items-center mt-5">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-body text-xs text-onyx/80 border border-onyx/20 rounded-full px-3 py-1 uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-6">
                  <Link
                    href={`/works?category=${service.slug}`}
                    className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-body font-medium text-onyx hover:text-electric-red transition-colors"
                  >
                    <span>View {service.name.toLowerCase()} work →</span>
                  </Link>
                </div>
              </div>

              <div className="w-full lg:w-[55%] flex justify-center lg:justify-end">
                <div className="services-collage">
                  <div
                    className="slot-a relative overflow-hidden"
                    style={{ gridColumn: '1', gridRow: '1 / span 2', alignSelf: 'center', width: 'var(--w)', aspectRatio: '4/5' }}
                  >
                    <Image src={service.images[0].src} alt={service.images[0].alt} fill className="object-cover" sizes="(max-width: 768px) 40vw, 20vw" />
                  </div>
                  <div
                    className="slot-b relative overflow-hidden"
                    style={{ gridColumn: '2', gridRow: '1', width: 'var(--w)', aspectRatio: '4/5' }}
                  >
                    <Image src={service.images[1].src} alt={service.images[1].alt} fill className="object-cover" sizes="(max-width: 768px) 40vw, 20vw" />
                  </div>
                  <div
                    className="slot-c relative overflow-hidden"
                    style={{ gridColumn: '2', gridRow: '2', width: 'var(--w)', aspectRatio: '4/5' }}
                  >
                    <Image src={service.images[2].src} alt={service.images[2].alt} fill className="object-cover" sizes="(max-width: 768px) 40vw, 20vw" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Accessible screen reader list of all 6 services */}
      <ul className="sr-only">
        {SERVICES.map((s) => (
          <li key={s.id}>
            <h3>{s.heading}</h3>
            <p>{s.text}</p>
            <Link href={`/works?category=${s.slug}`}>View {s.name.toLowerCase()} work</Link>
          </li>
        ))}
      </ul>

      {/* Outer Wrapper: 6 x 110svh = 660svh */}
      <section
        id="services"
        ref={wrapperRef}
        className="relative w-full bg-porcelain text-onyx"
        style={{ height: '660svh' }}
        aria-label="Aldera Studio Services"
      >
        {/* Sticky Stage: 100svh, locked with CSS position: sticky */}
        <div
          ref={stageRef}
          className="sticky top-0 h-[100svh] w-full overflow-hidden bg-porcelain text-onyx border-t border-onyx/10 flex items-center"
        >
          {SERVICES.map((service, sIdx) => {
            const slots = slotsByService[sIdx] || [
              { current: service.images[0], incoming: null },
              { current: service.images[1], incoming: null },
              { current: service.images[2], incoming: null },
            ];

            return (
              <div
                key={service.id}
                ref={(el) => {
                  layerRefs.current[sIdx] = el;
                }}
                className="absolute inset-0 w-full h-full flex flex-col md:flex-row items-center justify-between"
                style={{
                  visibility: sIdx === 0 ? 'visible' : 'hidden',
                  pointerEvents: sIdx === 0 ? 'auto' : 'none',
                }}
              >
                {/* Left Column (about 40% width, pl 4vw, positioned higher towards top) */}
                <div className="w-full md:w-[42%] lg:w-[40%] pl-[4vw] pr-6 md:pr-0 flex flex-col justify-start z-10 pt-[3svh] md:pt-[8.5svh] shrink-0">
                  {/* Editorial Eyebrow: "Services" with hairline */}
                  <div className="flex items-center justify-between border-b border-onyx/10 pb-3 mb-4 w-full">
                    <span className="font-body text-label text-onyx/60 uppercase tracking-widest font-semibold">
                      Services
                    </span>
                    <span className="font-body text-label text-electric-red font-semibold tracking-wider">
                      {service.num}
                    </span>
                  </div>

                  {/* Large Display Heading: Display font 700, clamp(2.75rem, 6vw, 6rem) */}
                  <div className="overflow-hidden mt-3 sm:mt-4">
                    <h2
                      className="service-heading font-display font-bold text-onyx leading-none text-balance"
                      style={{
                        fontSize: 'clamp(2.75rem, 6vw, 6rem)',
                        lineHeight: 1,
                        letterSpacing: '-0.035em',
                      }}
                    >
                      {service.heading}
                    </h2>
                  </div>

                  {/* Paragraph: P token, max-width 34ch, 20 words or fewer */}
                  <p className="service-text font-body text-p text-onyx/70 max-w-[34ch] leading-relaxed mt-4 sm:mt-6">
                    {service.text}
                  </p>

                  {/* 3 Outline Deliverable Tags */}
                  <div className="service-tags flex flex-wrap gap-2 items-center mt-5 sm:mt-6">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-body text-xs text-onyx/80 border border-onyx/20 rounded-full px-3 py-1 uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Link: "View [service] work →" with animated underline */}
                  <div className="service-link mt-6 sm:mt-8">
                    <Link
                      href={`/works?category=${service.slug}`}
                      className="group relative inline-flex items-center gap-2 text-sm uppercase tracking-widest font-body font-medium text-onyx focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-red rounded-sm"
                    >
                      <span className="relative">
                        View {service.name.toLowerCase()} work
                        <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-electric-red scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                      </span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                </div>

                {/* Right Side: Larger 3-Image Collage (CSS Grid) */}
                <div className="w-full md:w-[56%] lg:w-[58%] pr-[4vw] flex justify-center md:justify-end items-center h-full z-10 shrink-0 pb-6 md:pb-0">
                  <div
                    className="services-collage"
                    style={{
                      maxHeight: '78svh',
                    }}
                  >
                    {/* Slot A: grid-column 1, grid-row 1 / span 2, align-self center */}
                    <div
                      className="slot-a"
                      style={{
                        gridColumn: '1',
                        gridRow: '1 / span 2',
                        alignSelf: 'center',
                        width: 'var(--w)',
                        aspectRatio: '4/5',
                      }}
                    >
                      <div className="slot-a-wrap relative w-full h-full overflow-hidden bg-porcelain">
                        <div className="slot-a-inner relative w-full h-full">
                          <Link
                            href={`/works?category=${service.slug}`}
                            data-cursor="View"
                            className="group relative block w-full h-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-red cursor-pointer"
                            aria-label={`View ${service.name} work`}
                          >
                            <div className="relative w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                              <Image
                                src={slots[0].current.src}
                                alt={slots[0].current.alt}
                                fill
                                priority={sIdx === 0}
                                quality={90}
                                className="object-cover"
                                sizes="(max-width: 768px) 38vw, 17vw"
                              />
                            </div>
                          </Link>

                          {/* Incoming Image Overlay for random swap */}
                          {slots[0].incoming && (
                            <div
                              className="incoming-overlay absolute inset-0 w-full h-full overflow-hidden z-20 pointer-events-none"
                              style={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                            >
                              <div className="incoming-inner relative w-full h-full">
                                <Image
                                  src={slots[0].incoming.src}
                                  alt={slots[0].incoming.alt}
                                  fill
                                  quality={90}
                                  className="object-cover"
                                  sizes="(max-width: 768px) 38vw, 17vw"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Slot B: grid-column 2, grid-row 1 */}
                    <div
                      className="slot-b"
                      style={{
                        gridColumn: '2',
                        gridRow: '1',
                        width: 'var(--w)',
                        aspectRatio: '4/5',
                      }}
                    >
                      <div className="slot-b-wrap relative w-full h-full overflow-hidden bg-porcelain">
                        <div className="slot-b-inner relative w-full h-full">
                          <Link
                            href={`/works?category=${service.slug}`}
                            data-cursor="View"
                            className="group relative block w-full h-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-red cursor-pointer"
                            aria-label={`View ${service.name} work`}
                          >
                            <div className="relative w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                              <Image
                                src={slots[1].current.src}
                                alt={slots[1].current.alt}
                                fill
                                priority={sIdx === 0}
                                quality={90}
                                className="object-cover"
                                sizes="(max-width: 768px) 38vw, 17vw"
                              />
                            </div>
                          </Link>

                          {/* Incoming Image Overlay for random swap */}
                          {slots[1].incoming && (
                            <div
                              className="incoming-overlay absolute inset-0 w-full h-full overflow-hidden z-20 pointer-events-none"
                              style={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                            >
                              <div className="incoming-inner relative w-full h-full">
                                <Image
                                  src={slots[1].incoming.src}
                                  alt={slots[1].incoming.alt}
                                  fill
                                  quality={90}
                                  className="object-cover"
                                  sizes="(max-width: 768px) 38vw, 17vw"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Slot C: grid-column 2, grid-row 2 */}
                    <div
                      className="slot-c"
                      style={{
                        gridColumn: '2',
                        gridRow: '2',
                        width: 'var(--w)',
                        aspectRatio: '4/5',
                      }}
                    >
                      <div className="slot-c-wrap relative w-full h-full overflow-hidden bg-porcelain">
                        <div className="slot-c-inner relative w-full h-full">
                          <Link
                            href={`/works?category=${service.slug}`}
                            data-cursor="View"
                            className="group relative block w-full h-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-red cursor-pointer"
                            aria-label={`View ${service.name} work`}
                          >
                            <div className="relative w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                              <Image
                                src={slots[2].current.src}
                                alt={slots[2].current.alt}
                                fill
                                priority={sIdx === 0}
                                quality={90}
                                className="object-cover"
                                sizes="(max-width: 768px) 38vw, 17vw"
                              />
                            </div>
                          </Link>

                          {/* Incoming Image Overlay for random swap */}
                          {slots[2].incoming && (
                            <div
                              className="incoming-overlay absolute inset-0 w-full h-full overflow-hidden z-20 pointer-events-none"
                              style={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                            >
                              <div className="incoming-inner relative w-full h-full">
                                <Image
                                  src={slots[2].incoming.src}
                                  alt={slots[2].incoming.alt}
                                  fill
                                  quality={90}
                                  className="object-cover"
                                  sizes="(max-width: 768px) 38vw, 17vw"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Scoped CSS for the larger 3-image collage wireframe layout */}
      <style jsx>{`
        .services-collage {
          --w: clamp(160px, min(23vw, 31svh), 360px);
          --g: clamp(14px, 1.6vw, 24px);
          display: grid;
          grid-template-columns: var(--w) var(--w);
          column-gap: var(--g);
          row-gap: var(--g);
          align-items: center;
        }
        @media (max-width: 1100px) and (min-width: 768px) {
          .services-collage {
            --w: clamp(150px, min(26vw, 27svh), 300px);
          }
        }
        @media (max-width: 767px) {
          .services-collage {
            --w: min(42vw, 24svh);
            --g: 12px;
          }
        }
      `}</style>
    </>
  );
}
