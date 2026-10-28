'use client';

import { useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HERO_WALL_IMAGES } from '../lib/content';
import { useLoaderContext } from '../context/LoaderContext';
import { getLenis } from './SmoothScroll';

gsap.registerPlugin(ScrollTrigger);

const ROTATING_WORDS = ['brand', 'campaign', 'product', 'story'];

/* ------------------------------------------------------------------ */
/*  Wall geometry, measured from the reference (1400 x 720 design)     */
/*  t = position along the track in "slots"; 0 is the centre.          */
/* ------------------------------------------------------------------ */
const FRAME_W = 74; // width of one filmstrip frame
const STRIP_HALF_SLOTS = 2.5; // centre 5 frames = filmstrip
const STRIP_HALF_W = FRAME_W * STRIP_HALF_SLOTS; // 185
const OUTER_GROW = 68; // outer panels widen from 74 to about 140
const OUTER_SOFT = 0.9;
const H_MIN = 78; // filmstrip height at the centre
const H_EDGE = 88; // filmstrip height at its edges
const SLOPE = 0.06; // outer edge of a panel is taller than its inner edge
const BASE_DRIFT = 0.16; // slots per second
const MAX_VISIBLE_T = 7.6;

const xAbs = (a: number) => {
  if (a <= STRIP_HALF_SLOTS) return a * FRAME_W;
  const u = a - STRIP_HALF_SLOTS;
  return (
    STRIP_HALF_W +
    FRAME_W * u +
    OUTER_GROW * (u - OUTER_SOFT * (1 - Math.exp(-u / OUTER_SOFT)))
  );
};
const signedX = (t: number) => Math.sign(t) * xAbs(Math.abs(t));

const heightAt = (a: number) => {
  if (a <= STRIP_HALF_SLOTS) {
    const r = a / STRIP_HALF_SLOTS;
    return H_MIN + (H_EDGE - H_MIN) * r * r;
  }
  const u = a - STRIP_HALF_SLOTS;
  return H_EDGE * Math.exp(0.4 * u + 0.25 * (1 - Math.exp(-u / 0.25)));
};

const getScale = (W: number, H: number) => {
  const mobile = W < 768;
  const half = mobile ? 360 : 700; // reference px visible on each side
  const kx = W / (half * 2);
  const ky = Math.min(kx * (mobile ? 1.35 : 1), (H * 0.66) / 458);
  return { kx, ky };
};

/* ------------------------------------------------------------------ */
/*  Rotating word: per-character vertical roll, no React re-renders    */
/* ------------------------------------------------------------------ */
function RotatingWord({ words }: { words: string[] }) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const els = wordRefs.current.filter(Boolean) as HTMLSpanElement[];
    const letters = els.map((el) => Array.from(el.querySelectorAll<HTMLElement>('[data-l]')));
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let idx = 0;
    let widths: number[] = [];
    let timer: gsap.core.Tween | null = null;
    let tl: gsap.core.Timeline | null = null;

    const measure = () => {
      widths = els.map((el) => el.getBoundingClientRect().width);
      gsap.set(wrap, { width: widths[idx] });
    };

    gsap.set(letters.flat(), { yPercent: 110, opacity: 0 });
    gsap.set(letters[0], { yPercent: 0, opacity: 1 });
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener('resize', measure);

    const next = () => {
      const to = (idx + 1) % words.length;
      tl = gsap.timeline({
        onComplete: () => {
          idx = to;
          timer = gsap.delayedCall(1.6, next); // about 2.6s per word in total
        },
      });
      tl.to(
        letters[idx],
        { yPercent: -110, opacity: 0, filter: 'blur(3px)', duration: 0.55, stagger: 0.02, ease: 'power3.inOut' },
        0
      )
        .fromTo(
          letters[to],
          { yPercent: 110, opacity: 0, filter: 'blur(3px)' },
          { yPercent: 0, opacity: 1, filter: 'blur(0px)', duration: 0.6, stagger: 0.02, ease: 'power3.out' },
          0.25 // 0.25s overlap with the outgoing letters
        )
        .to(wrap, { width: widths[to], duration: 0.6, ease: 'power3.inOut' }, 0.2);
    };

    if (!reduced) timer = gsap.delayedCall(2.6, next);

    return () => {
      window.removeEventListener('resize', measure);
      timer?.kill();
      tl?.kill();
    };
  }, [words]);

  return (
    <span
      ref={wrapRef}
      aria-hidden="true"
      className="relative inline-block overflow-hidden text-electric-red align-baseline"
      style={{ height: '1.25em', marginBottom: '-0.05em' }}
    >
      {words.map((w, wi) => (
        <span
          key={w}
          ref={(el) => {
            wordRefs.current[wi] = el;
          }}
          className="absolute left-0 top-0 inline-flex whitespace-nowrap font-bold"
          style={{ lineHeight: 1.05, letterSpacing: '-0.035em' }}
        >
          {w.split('').map((ch, ci) => (
            <span key={ci} data-l className="inline-block will-change-transform">
              {ch}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */
export default function Hero() {
  const { curtainStarted, registerCurtainCallback } = useLoaderContext();

  const heroRef = useRef<HTMLElement>(null);
  const wallRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Ring of cards: at least 16 so the visible span never shows a repeat
  const wall = useMemo(() => {
    const n = Math.max(16, HERO_WALL_IMAGES.length);
    return Array.from({ length: n }, (_, i) => HERO_WALL_IMAGES[i % HERO_WALL_IMAGES.length]);
  }, []);
  const N = wall.length;

  const offsetRef = useRef(0);
  const velRef = useRef(BASE_DRIFT);
  const dragRef = useRef({ active: false, lastX: 0, lastT: 0 });
  const revealRef = useRef({ v: 0 });
  const mouseRef = useRef({ tx: 0, x: 0 });
  const sizeRef = useRef({ W: 0, H: 0 });
  const reducedRef = useRef(false);
  const playedRef = useRef(false);

  /* ---- measure the wall ---- */
  useEffect(() => {
    const el = wallRef.current;
    if (!el) return;
    const measure = () => {
      sizeRef.current = { W: el.clientWidth, H: el.clientHeight };
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* ---- cursor parallax ---- */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.tx = (e.clientX / window.innerWidth - 0.5) * 2 * 12;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  /* ---- ticker: drift + inertia + scroll kick + layout ---- */
  useEffect(() => {
    let lastY = window.scrollY;

    const tick = (_time: number, dtMs: number) => {
      const { W, H } = sizeRef.current;
      if (!W || !H) return;
      const dt = Math.min(dtMs / 1000, 0.05);

      const y = window.scrollY;
      const kick = gsap.utils.clamp(-0.6, 0.6, (y - lastY) * 0.012);
      lastY = y;

      if (!dragRef.current.active && !reducedRef.current) {
        velRef.current += (BASE_DRIFT - velRef.current) * (1 - Math.exp(-dt * 2.2));
        offsetRef.current += velRef.current * dt + kick;
      }
      offsetRef.current = ((offsetRef.current % N) + N) % N;

      const m = mouseRef.current;
      m.x += (m.tx - m.x) * (1 - Math.exp(-dt * 5));

      const { kx, ky } = getScale(W, H);
      const reveal = revealRef.current.v;
      const cx = W / 2;
      const cy = H * 0.46;

      for (let i = 0; i < N; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;

        let tc = (((i - offsetRef.current) % N) + N) % N;
        if (tc >= N / 2) tc -= N;
        const a = Math.abs(tc);

        if (a > MAX_VISIBLE_T) {
          el.style.visibility = 'hidden';
          continue;
        }
        el.style.visibility = 'visible';

        // Horizontal extent: cards touch because they share the same mapping
        const xl = signedX(tc - 0.5) * kx * reveal;
        const xr = signedX(tc + 0.5) * kx * reveal;
        const par = m.x * Math.max(0, 1 - a / 7);
        const width = xr - xl + 1;
        const left = cx + xl + par;

        // Height: geometric ladder, outer edge taller than inner edge
        const hc = heightAt(a) * ky;
        const dir = Math.tanh(tc * 1.5);
        const hL = hc * (1 - SLOPE * dir);
        const hR = hc * (1 + SLOPE * dir);
        const box = Math.max(hL, hR);
        const tL = ((1 - hL / box) / 2) * 100;
        const tR = ((1 - hR / box) / 2) * 100;

        // Black filmstrip frame fades out just past the strip
        const strip = gsap.utils.clamp(0, 1, (2.9 - a) / 0.8);
        const pad = 3 * strip * Math.max(ky, 0.6);

        el.style.width = `${width}px`;
        el.style.height = `${box}px`;
        el.style.padding = `${pad}px`;
        el.style.background = pad > 0.05 ? '#0A0A0A' : 'transparent';
        el.style.clipPath = `polygon(0% ${tL}%, 100% ${tR}%, 100% ${100 - tR}%, 0% ${100 - tL}%)`;
        el.style.transform = `translate3d(${left}px, ${cy - box / 2}px, 0)`;
        el.style.zIndex = `${Math.round(100 - a * 5)}`;
      }
    };

    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, [N]);

  /* ---- drag with inertia ---- */
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current = { active: true, lastX: e.clientX, lastT: performance.now() };
    velRef.current = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
    e.currentTarget.style.cursor = 'grabbing';
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d.active) return;
    const now = performance.now();
    const dtS = Math.max(0.001, (now - d.lastT) / 1000);
    const { kx } = getScale(sizeRef.current.W, sizeRef.current.H);
    const slots = (e.clientX - d.lastX) / (90 * kx);
    offsetRef.current -= slots;
    velRef.current = gsap.utils.clamp(-8, 8, -slots / dtS) * 0.35 + velRef.current * 0.65;
    d.lastX = e.clientX;
    d.lastT = now;
  };
  const onPointerEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d.active) return;
    if (performance.now() - d.lastT > 80) velRef.current = 0; // held still, no fling
    d.active = false;
    e.currentTarget.releasePointerCapture?.(e.pointerId);
    e.currentTarget.style.cursor = 'grab';
  };

  /* ---- entrance (waits for the loader curtain) + scroll parallax ---- */
  useEffect(() => {
    const hero = heroRef.current;
    const wallEl = wallRef.current;
    const h1 = h1Ref.current;
    const bottom = bottomRef.current;
    if (!hero || !wallEl || !h1 || !bottom) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    reducedRef.current = reduced;

    if (reduced) {
      revealRef.current.v = 1;
      gsap.set([wallEl, h1, bottom], { opacity: 1, y: 0 });
      return;
    }

    const play = () => {
      if (playedRef.current) return;
      playedRef.current = true;
      gsap
        .timeline()
        .to(h1, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 0)
        .to(wallEl, { opacity: 1, duration: 0.4, ease: 'none' }, 0.05)
        .to(revealRef.current, { v: 1, duration: 1.2, ease: 'expo.out' }, 0.05) // wall opens from the centre
        .to(bottom, { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out' }, 0.5);
    };

    if (!playedRef.current) gsap.set([h1, bottom], { y: 24 });
    if (curtainStarted) play();
    else registerCurtainCallback(play);

    const ctx = gsap.context(() => {
      gsap.to(wallEl, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.8 },
      });
    }, hero);

    return () => ctx.revert();
  }, [curtainStarted, registerCurtainCallback]);

  return (
    <section
      id="hero"
      ref={heroRef}
      aria-label="Aldera studio introduction"
      className="relative h-[100svh] w-full select-none overflow-hidden bg-porcelain text-onyx"
    >
      {/* Curved image wall (decorative) */}
      <div
        ref={wallRef}
        aria-hidden="true"
        data-cursor="drag"
        className="absolute inset-0 z-10 touch-pan-y"
        style={{ opacity: 0, cursor: 'grab' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
      >
        {wall.map((img, i) => (
          <div
            key={`card-${i}`}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="absolute left-0 top-0 box-border overflow-hidden will-change-transform"
            style={{ visibility: 'hidden', borderRadius: 4 }}
          >
            <div className="relative h-full w-full">
              <Image
                src={img.url}
                alt=""
                fill
                sizes="(max-width: 768px) 30vw, 12vw"
                priority={i < 9}
                draggable={false}
                className="pointer-events-none select-none object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Headline (single line, bold) */}
      <div
        ref={h1Ref}
        className="pointer-events-none absolute inset-x-0 z-20 px-6 text-center"
        style={{ top: 'clamp(84px, 13vh, 140px)', opacity: 0 }}
      >
        <h1
          aria-label="Design any brand, campaign, product or story you imagine"
          className="font-h1 mx-auto flex flex-nowrap items-center justify-center text-onyx whitespace-nowrap"
          style={{
            fontSize: 'clamp(2.25rem, 4vw, 3.75rem)',
            fontWeight: 700,
            letterSpacing: '-0.035em',
            lineHeight: 1.05,
            columnGap: '0.28em',
          }}
        >
          <span aria-hidden="true">Design any</span>
          <RotatingWord words={ROTATING_WORDS} />
          <span aria-hidden="true">you imagine</span>
        </h1>
      </div>

      {/* Label, paragraph, buttons */}
      <div
        ref={bottomRef}
        className="pointer-events-none absolute inset-x-0 z-20 mx-auto flex max-w-xl flex-col items-center gap-3 px-6 text-center"
        style={{ bottom: 'clamp(20px, 5.5vh, 56px)', opacity: 0 }}
      >
        <span className="font-sans text-[0.95rem] font-medium tracking-tight text-onyx/85">
          Design and marketing studio.
        </span>

        <p className="mx-auto hidden max-w-[440px] font-sans text-[0.95rem] leading-relaxed text-onyx/70 [@media(min-height:640px)]:block">
          Identity, packaging, campaigns and content, crafted by one team from first sketch to final
          launch.
        </p>

        <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-3.5 pt-1">
          <a
            href="/contact"
            className="flex h-12 items-center justify-center rounded-[8px] bg-electric-red px-7 font-sans text-[17px] font-medium text-porcelain shadow-md transition-all hover:brightness-110 active:scale-95"
          >
            Start a project
          </a>

          <button
            onClick={() => {
              const lenis = getLenis();
              const target = document.querySelector('#works');
              if (target && lenis) lenis.scrollTo(target as HTMLElement);
            }}
            data-cursor="play"
            className="flex h-12 items-center justify-center gap-2.5 rounded-[8px] border border-onyx/15 bg-porcelain px-6 font-sans text-[17px] font-medium text-onyx shadow-sm transition-all hover:border-onyx active:scale-95"
          >
            <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            <span>Watch showreel</span>
          </button>
        </div>
      </div>
    </section>
  );
}