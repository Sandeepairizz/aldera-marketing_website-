'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import LogoMark from './LogoMark';
import { useLoaderContext } from '../context/LoaderContext';
import { getLenis } from './SmoothScroll';

export default function Header() {
  const { curtainStarted, registerCurtainCallback } = useLoaderContext();
  const headerRef = useRef<HTMLDivElement>(null);
  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLDivElement>(null);
  const menuFooterRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isOverDark, setIsOverDark] = useState(false);

  // Fade in on curtain reveal
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    gsap.set(header, { opacity: 0, y: -20 });

    const revealHeader = () => {
      gsap.to(header, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2,
      });
    };

    if (curtainStarted) {
      revealHeader();
    } else {
      registerCurtainCallback(revealHeader);
    }
  }, [curtainStarted, registerCurtainCallback]);

  // Hide on scroll down, return on scroll up + detect dark sections for pill inversion
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const header = headerRef.current;
          if (header && !isOpen) {
            if (currentY > 120 && currentY > lastScrollY) {
              // Scrolling down: hide
              gsap.to(header, { y: -80, opacity: 0, duration: 0.35, ease: 'power2.out' });
            } else {
              // Scrolling up: return
              gsap.to(header, { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' });
            }
          }
          setLastScrollY(currentY);

          // Check if header is currently over dark section (#works-pass)
          const worksEl = document.querySelector('#works-pass');
          if (worksEl) {
            const rect = worksEl.getBoundingClientRect();
            const headerMid = 42;
            if (rect.top <= headerMid && rect.bottom >= headerMid) {
              setIsOverDark(true);
            } else {
              setIsOverDark(false);
            }
          } else {
            setIsOverDark(false);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastScrollY, isOpen]);

  // Open/Close Full-screen Menu
  useEffect(() => {
    const overlay = menuOverlayRef.current;
    const links = menuLinksRef.current;
    const footer = menuFooterRef.current;
    if (!overlay || !links) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const lenis = getLenis();
      if (lenis) lenis.stop();

      gsap.set(overlay, { display: 'flex' });
      gsap.fromTo(
        overlay,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 0.7, ease: 'expo.inOut' }
      );

      const linkItems = links.querySelectorAll('.menu-link-item');
      gsap.fromTo(
        linkItems,
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          delay: 0.25,
        }
      );

      if (footer) {
        gsap.fromTo(
          footer,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.55 }
        );
      }
    } else {
      document.body.style.overflow = '';
      const lenis = getLenis();
      if (lenis) lenis.start();

      gsap.to(overlay, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.55,
        ease: 'expo.inOut',
        onComplete: () => {
          gsap.set(overlay, { display: 'none' });
        },
      });
    }
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Floating Header Pill: fixed, centred, top 16px, width min(92vw, 440px), height 52px, 14px radius */}
      <header
        ref={headerRef}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-5 transition-colors duration-300 shadow-2xl ${
          isOverDark
            ? 'bg-porcelain text-onyx'
            : 'bg-onyx text-porcelain'
        }`}
        style={{
          width: 'min(92vw, 440px)',
          height: '52px',
          borderRadius: '14px',
          boxShadow: isOverDark
            ? '0 10px 30px rgba(0, 0, 0, 0.45)'
            : '0 10px 30px rgba(10, 10, 10, 0.28)',
        }}
        aria-label="Aldera navigation"
      >
        {/* Left: Logo mark + Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group focus:outline-none"
          aria-label="Aldera Home"
        >
          <LogoMark inverted={!isOverDark} size={28} />
          <span
            className={`font-sans font-semibold text-sm tracking-tight ${
              isOverDark ? 'text-onyx' : 'text-porcelain'
            }`}
            style={{ letterSpacing: '-0.035em' }}
          >
            aldera
            <span className={isOverDark ? 'text-onyx/40' : 'text-porcelain/40'}>
              /studio
            </span>
          </span>
        </Link>

        {/* Right: Two-line menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-8 h-8 flex flex-col justify-center items-center gap-1.5 focus:outline-none group p-1"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
        >
          <span
            className={`w-5 h-[1.5px] transition-all duration-300 ${
              isOverDark ? 'bg-onyx' : 'bg-porcelain'
            } ${isOpen ? 'rotate-45 translate-y-[4px]' : 'group-hover:w-6'}`}
          />
          <span
            className={`w-5 h-[1.5px] transition-all duration-300 ${
              isOverDark ? 'bg-onyx' : 'bg-porcelain'
            } ${isOpen ? '-rotate-45 -translate-y-[4px]' : 'group-hover:w-4'}`}
          />
        </button>
      </header>

      {/* Full-screen Onyx Menu Overlay */}
      <div
        ref={menuOverlayRef}
        className="fixed inset-0 z-50 bg-onyx text-porcelain hidden flex-col justify-between p-6 sm:p-12 lg:p-16 overflow-y-auto"
        style={{ clipPath: 'inset(0 0 100% 0)' }}
        aria-hidden={!isOpen}
      >
        {/* Top bar inside menu */}
        <div className="flex items-center justify-between w-full max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <LogoMark inverted size={32} />
            <span className="font-sans font-semibold text-lg text-porcelain" style={{ letterSpacing: '-0.035em' }}>
              aldera<span className="text-porcelain/40 font-normal">/studio</span>
            </span>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-porcelain/20 hover:border-electric-red text-porcelain hover:text-electric-red text-xs uppercase tracking-widest font-medium transition-colors"
          >
            <span>Close</span>
            <span className="text-base leading-none">✕</span>
          </button>
        </div>

        {/* Center: Large Inter links with staggered reveal (Works, Services, Studio, Contact) */}
        <div
          ref={menuLinksRef}
          className="flex flex-col gap-4 md:gap-8 my-auto w-full max-w-6xl mx-auto py-8"
        >
          {[
            { label: 'Works', href: '/works', index: '01' },
            { label: 'Services', href: '/#services', index: '02' },
            { label: 'Studio', href: '/studio', index: '03' },
            { label: 'Contact', href: '/contact', index: '04' },
          ].map((item) => (
            <div key={item.label} className="overflow-hidden">
              <Link
                href={item.href}
                onClick={closeMenu}
                className="menu-link-item group flex items-baseline gap-4 md:gap-8 font-sans font-light text-4xl sm:text-6xl md:text-8xl tracking-tight text-porcelain hover:text-electric-red transition-colors"
              >
                <span className="font-mono text-sm md:text-base font-normal text-porcelain/30 group-hover:text-electric-red/70 transition-colors">
                  {item.index}
                </span>
                <span>{item.label}</span>
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom bar: Red CTA button, email & social links in Inter */}
        <div
          ref={menuFooterRef}
          className="w-full max-w-6xl mx-auto pt-8 border-t border-porcelain/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <Link
            href="/contact"
            onClick={closeMenu}
            className="px-7 py-3.5 rounded-full bg-electric-red text-onyx font-sans font-medium text-sm tracking-wide hover:brightness-110 active:scale-95 transition-all shadow-lg"
          >
            Start a project
          </Link>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-12 text-sm text-porcelain/60 font-sans">
            <a
              href="mailto:hello@aldera.studio"
              className="text-porcelain hover:text-electric-red transition-colors"
            >
              hello@aldera.studio
            </a>
            <div className="flex items-center gap-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-porcelain transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-porcelain transition-colors"
              >
                Twitter/X
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-porcelain transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
