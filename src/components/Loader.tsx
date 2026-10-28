'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useLoaderContext } from '../context/LoaderContext';
import LogoMark, { Wordmark } from './LogoMark';
import { LOADER_TILE_IMAGES } from '../lib/content';
import { getLenis } from './SmoothScroll';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Loader() {
  const { setCurtainStarted, setLoaderDone, fireCurtainCallbacks } = useLoaderContext();

  const rootRef = useRef<HTMLDivElement>(null);
  const logoMarkRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const tileContainerRef = useRef<HTMLDivElement>(null);
  const tile1Ref = useRef<HTMLDivElement>(null);
  const tile2Ref = useRef<HTMLDivElement>(null);
  const tile3Ref = useRef<HTMLDivElement>(null);
  const wordmarkWrapRef = useRef<HTMLDivElement>(null);
  const wordmarkInnerRef = useRef<HTMLDivElement>(null);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showTiles, setShowTiles] = useState(false);
  const [showWordmark, setShowWordmark] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // Check session repeat visit
    let hasPlayed = false;
    try {
      hasPlayed = sessionStorage.getItem('aldera_loader_played') === 'true';
    } catch (e) {}

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Fast-path for repeat visits or prefers-reduced-motion
    if (hasPlayed || prefersReduced) {
      if (hasPlayed && !prefersReduced && rootRef.current) {
        gsap.to(rootRef.current, {
          opacity: 0,
          duration: 0.4,
          ease: 'power2.out',
          onComplete: () => {
            setIsMounted(false);
            setCurtainStarted(true);
            setLoaderDone(true);
            fireCurtainCallbacks();
          },
        });
      } else {
        setIsMounted(false);
        setCurtainStarted(true);
        setLoaderDone(true);
        fireCurtainCallbacks();
      }
      return;
    }

    // Stop Lenis during loader
    const lenis = getLenis();
    if (lenis) {
      lenis.stop();
    }
    document.body.style.overflow = 'hidden';

    // Preload key images in parallel
    const preloadPromises = LOADER_TILE_IMAGES.slice(0, 4).map(
      (item) =>
        new Promise<void>((resolve) => {
          const img = new window.Image();
          img.src = item.url;
          img.onload = () => resolve();
          img.onerror = () => resolve();
        })
    );
    Promise.all(preloadPromises);

    const tl = gsap.timeline();

    // Counter helper
    const counterObj = { val: 0 };
    const updateCounter = () => {
      if (counterRef.current) {
        const num = Math.min(100, Math.round(counterObj.val));
        counterRef.current.textContent = String(num).padStart(3, '0');
      }
    };

    // 1. 0.0 - 0.6s: Centred logo mark fades in and scales 0.9 to 1
    tl.fromTo(
      logoMarkRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' },
      0
    );

    // 2. 0.6 - 2.4s: Counter runs 000 to 100
    tl.add(() => {
      if (logoMarkRef.current) {
        gsap.to(logoMarkRef.current, { opacity: 0, scale: 0.95, duration: 0.25 });
      }
      setShowTiles(true);
    }, 0.6);

    tl.to(
      counterObj,
      {
        val: 100,
        duration: 1.8,
        ease: 'power1.inOut',
        onUpdate: updateCounter,
      },
      0.6
    );

    // Cycle through 5-6 colourful images with clip-path wipes (0.3s intervals)
    LOADER_TILE_IMAGES.forEach((_, idx) => {
      if (idx === 0) return;
      tl.add(() => {
        setActiveImageIndex(idx);
      }, 0.6 + idx * 0.3);
    });

    // 3. 2.4 - 3.0s: The tiles fan into a slightly offset, rotated stack, then lift up and fade out
    tl.add(() => {
      if (tile1Ref.current && tile2Ref.current && tile3Ref.current) {
        gsap.to(tile1Ref.current, {
          rotate: -7,
          x: -16,
          y: -8,
          duration: 0.35,
          ease: 'power2.out',
        });
        gsap.to(tile2Ref.current, {
          rotate: 0,
          y: -4,
          duration: 0.35,
          ease: 'power2.out',
        });
        gsap.to(tile3Ref.current, {
          rotate: 8,
          x: 16,
          y: -10,
          duration: 0.35,
          ease: 'power2.out',
        });
      }
    }, 2.4);

    tl.to(
      tileContainerRef.current,
      {
        yPercent: -35,
        opacity: 0,
        scale: 0.94,
        duration: 0.5,
        ease: 'power3.in',
      },
      2.55
    );

    tl.add(() => {
      setShowTiles(false);
      setShowWordmark(true);
    }, 3.0);

    // 4. 3.0 - 3.8s: Centred wordmark appears, revealed by a masked rise, counter at 100
    tl.add(() => {
      if (counterRef.current) counterRef.current.textContent = '100';
    }, 3.0);

    tl.fromTo(
      wordmarkInnerRef.current,
      { yPercent: 105 },
      { yPercent: 0, duration: 0.7, ease: 'expo.out' },
      3.05
    );

    // 5. 3.8 - 5.0s: CURTAIN REVEAL
    // Porcelain loader layer wipes upward clip-path inset(0 0 0 0) to inset(0 0 100% 0), expo.inOut, 1.2s.
    // Wordmark exits with trailing edge.
    // At same moment hero images rise from yPercent 40 and scale 0.9 to 1 with 0.08s stagger, and header fades in.
    tl.add(() => {
      setCurtainStarted(true);
      fireCurtainCallbacks();
    }, 3.8);

    tl.to(
      wordmarkInnerRef.current,
      {
        yPercent: -120,
        opacity: 0.3,
        duration: 0.9,
        ease: 'power3.in',
      },
      3.8
    );

    tl.fromTo(
      rootRef.current,
      { clipPath: 'inset(0 0 0% 0)' },
      {
        clipPath: 'inset(0 0 100% 0)',
        duration: 1.2,
        ease: 'expo.inOut',
      },
      3.8
    );

    // 6. Then remove loader, lenis.start(), ScrollTrigger.refresh()
    tl.add(() => {
      setLoaderDone(true);
      setIsMounted(false);
      document.body.style.overflow = '';
      try {
        sessionStorage.setItem('aldera_loader_played', 'true');
      } catch (e) {}

      const activeLenis = getLenis();
      if (activeLenis) {
        activeLenis.start();
      }
      ScrollTrigger.refresh();
    }, 5.0);

    return () => {
      tl.kill();
      document.body.style.overflow = '';
    };
  }, [fireCurtainCallbacks, setCurtainStarted, setLoaderDone]);

  if (!isMounted) return null;

  return (
    <div
      id="aldera-loader-root"
      ref={rootRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#F5F5F0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        clipPath: 'inset(0 0 0% 0)',
      }}
      role="status"
      aria-label="Loading Aldera studio"
    >
      {/* Top-left small logo mark */}
      <div className="absolute top-7 left-7 z-20 flex items-center gap-3">
        <LogoMark size={28} />
      </div>

      {/* Bottom-right counter (label style, tabular numbers, Onyx 60%) */}
      <div className="absolute bottom-7 right-7 z-20">
        <span
          ref={counterRef}
          className="text-counter text-onyx/60 text-sm tracking-widest font-mono font-medium"
        >
          000
        </span>
      </div>

      {/* 1. Centred full logo mark (Phase 1) */}
      <div
        ref={logoMarkRef}
        className="absolute z-10 flex items-center justify-center pointer-events-none"
      >
        <LogoMark size={64} />
      </div>

      {/* 2 & 3. Small square image tile (~12vw) cycling images + fanning into stack */}
      {showTiles && (
        <div
          ref={tileContainerRef}
          className="absolute z-15 flex items-center justify-center pointer-events-none"
          style={{ width: 'min(14vw, 160px)', height: 'min(14vw, 160px)' }}
        >
          {/* Fan cards behind */}
          <div
            ref={tile1Ref}
            className="absolute inset-0 rounded-xl overflow-hidden shadow-xl border border-alabaster/40 bg-onyx"
            style={{ willChange: 'transform' }}
          >
            <Image
              src={LOADER_TILE_IMAGES[1].url}
              alt=""
              fill
              className="object-cover opacity-80"
              sizes="160px"
              priority
            />
          </div>
          <div
            ref={tile3Ref}
            className="absolute inset-0 rounded-xl overflow-hidden shadow-xl border border-alabaster/40 bg-onyx"
            style={{ willChange: 'transform' }}
          >
            <Image
              src={LOADER_TILE_IMAGES[2].url}
              alt=""
              fill
              className="object-cover opacity-80"
              sizes="160px"
              priority
            />
          </div>

          {/* Active front cycling card */}
          <div
            ref={tile2Ref}
            className="absolute inset-0 rounded-xl overflow-hidden shadow-2xl border border-alabaster/60 bg-onyx"
          >
            <Image
              src={LOADER_TILE_IMAGES[activeImageIndex].url}
              alt=""
              fill
              className="object-cover transition-opacity duration-300"
              sizes="160px"
              priority
            />
            {/* Logo overlaid in Porcelain */}
            <div className="absolute inset-0 bg-onyx/20 flex items-center justify-center z-10">
              <LogoMark inverted size={36} />
            </div>
          </div>
        </div>
      )}

      {/* 4. Centred wordmark masked rise: "aldera /studio" */}
      {showWordmark && (
        <div
          ref={wordmarkWrapRef}
          className="absolute z-20 overflow-hidden flex items-center justify-center"
        >
          <div ref={wordmarkInnerRef} className="px-4 py-2">
            <Wordmark sizeClass="text-5xl md:text-7xl" />
          </div>
        </div>
      )}
    </div>
  );
}
