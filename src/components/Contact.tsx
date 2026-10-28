'use client';

import { useState, useRef, MouseEvent } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { CURSOR_TRAIL_IMAGES } from '../lib/content';

interface TrailItem {
  id: number;
  x: number;
  y: number;
  url: string;
  rotation: number;
}

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [trail, setTrail] = useState<TrailItem[]>([]);
  const lastPos = useRef({ x: 0, y: 0 });
  const imgIndexRef = useRef(0);
  const trailIdRef = useRef(0);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const dist = Math.hypot(x - lastPos.current.x, y - lastPos.current.y);

    // Spawn an image trail item every 75px moved
    if (dist > 75) {
      lastPos.current = { x, y };

      const currentImg = CURSOR_TRAIL_IMAGES[imgIndexRef.current % CURSOR_TRAIL_IMAGES.length];
      imgIndexRef.current += 1;
      const nextId = trailIdRef.current++;

      const newItem: TrailItem = {
        id: nextId,
        x,
        y,
        url: typeof currentImg === 'string' ? currentImg : currentImg.url,
        rotation: (Math.random() - 0.5) * 20,
      };

      setTrail((prev) => [...prev.slice(-6), newItem]);

      // Remove after 750ms
      setTimeout(() => {
        setTrail((prev) => prev.filter((item) => item.id !== nextId));
      }, 750);
    }
  };

  // Magnetic hover for "Start a project" button
  const handleButtonMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const btn = buttonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.35,
      y: y * 0.35,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleButtonMouseLeave = () => {
    const btn = buttonRef.current;
    if (!btn) return;
    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[90vh] py-36 md:py-52 px-6 sm:px-10 lg:px-16 bg-porcelain text-onyx flex flex-col items-center justify-center text-center overflow-hidden border-t border-onyx/10"
      aria-label="Contact Aldera"
    >
      {/* Floating Cursor Image Trail */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {trail.map((item) => (
          <div
            key={item.id}
            className="absolute rounded-xl overflow-hidden shadow-2xl border border-onyx/15 bg-onyx transition-all pointer-events-none"
            style={{
              left: item.x,
              top: item.y,
              width: '120px',
              height: '150px',
              transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`,
              animation: 'fadeScaleOut 0.8s forwards cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            <Image
              src={item.url}
              alt=""
              fill
              className="object-cover"
              sizes="120px"
            />
          </div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes fadeScaleOut {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0.9);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.15) translateY(-20px);
          }
        }
      `}</style>

      {/* Main Content */}
      <div className="relative z-20 max-w-4xl mx-auto flex flex-col items-center gap-7">
        <div className="flex items-center gap-2 border-b border-onyx/10 pb-2">
          <span className="font-body text-label text-electric-red font-semibold uppercase tracking-widest">
            New Business
          </span>
        </div>

        {/* H2: "Have a brand in mind?" in Display Font */}
        <h2 className="text-h2 text-onyx max-w-2xl text-center">
          Have a brand in mind?
        </h2>

        <p className="font-body text-p text-onyx/75 max-w-[50ch] text-center">
          We partner with ambitious founders and leadership teams worldwide to create unforgettable brands and digital experiences.
        </p>

        {/* Large button "Start a project" with magnetic hover */}
        <div className="pt-2">
          <a
            ref={buttonRef}
            onMouseMove={handleButtonMouseMove}
            onMouseLeave={handleButtonMouseLeave}
            href="mailto:hello@aldera.studio"
            className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-onyx text-porcelain font-body font-medium text-base sm:text-lg tracking-wide shadow-xl hover:bg-electric-red hover:text-onyx active:scale-95 transition-colors duration-300"
          >
            Start a project
          </a>
        </div>

        {/* Direct Email Address */}
        <div className="pt-3">
          <a
            href="mailto:hello@aldera.studio"
            className="font-body text-xl sm:text-2xl text-onyx/80 hover:text-electric-red underline underline-offset-8 decoration-onyx/20 hover:decoration-electric-red transition-all"
          >
            hello@aldera.studio
          </a>
        </div>
      </div>
    </section>
  );
}
