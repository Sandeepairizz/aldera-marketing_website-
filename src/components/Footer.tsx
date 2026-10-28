'use client';

import { useEffect, useState } from 'react';
import LogoMark from './LogoMark';
import { getLenis } from './SmoothScroll';

export default function Footer() {
  const [localTime, setLocalTime] = useState<string>('');
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  // Live local studio time (India / IST)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLocalTime(
        now.toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
          timeZone: 'Asia/Kolkata',
        }) + ' IST'
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer
      className="relative w-full bg-onyx text-porcelain pt-20 pb-12 px-6 sm:px-10 lg:px-16 overflow-hidden border-t border-porcelain/10"
      aria-label="Aldera Footer"
    >
      <div className="max-w-7xl mx-auto flex flex-col justify-between min-h-[580px]">
        {/* Top Grid: Links, Newsletter, Live Time */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-porcelain/10">
          {/* Col 1: Logo & Tagline */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <LogoMark inverted size={32} />
              <span className="font-display font-bold text-xl text-porcelain">
                aldera<span className="text-porcelain/40 font-normal">/studio</span>
              </span>
            </div>
            <p className="text-sm font-body text-porcelain/60 max-w-[34ch] mt-2 leading-relaxed">
              Independent design and marketing studio for ambitious brands. Bengaluru · Mumbai · New Delhi, India.
            </p>
            <div className="flex items-center gap-2 mt-4 text-xs font-mono text-porcelain/50">
              <span className="w-2 h-2 rounded-full bg-electric-red animate-pulse" />
              <span>Studio India: {localTime || '12:00:00 IST'}</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <span className="font-body text-label text-porcelain/40 mb-1">Index</span>
            <a href="/works" className="text-sm font-body text-porcelain/80 hover:text-electric-red transition-colors">
              Works
            </a>
            <a href="#services" className="text-sm font-body text-porcelain/80 hover:text-electric-red transition-colors">
              Services
            </a>
            <a href="/studio" className="text-sm font-body text-porcelain/80 hover:text-electric-red transition-colors">
              Studio
            </a>
            <a href="#process" className="text-sm font-body text-porcelain/80 hover:text-electric-red transition-colors">
              Process
            </a>
            <a href="/contact" className="text-sm font-body text-porcelain/80 hover:text-electric-red transition-colors">
              Contact
            </a>
          </div>

          {/* Col 3: Network / Social Links */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <span className="font-body text-label text-porcelain/40 mb-1">Network</span>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-body text-porcelain/80 hover:text-electric-red transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-body text-porcelain/80 hover:text-electric-red transition-colors"
            >
              Twitter / X
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-body text-porcelain/80 hover:text-electric-red transition-colors"
            >
              LinkedIn
            </a>
           
          </div>

          {/* Col 4: Newsletter field with Red Button */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <span className="font-body text-label text-porcelain/40">Dispatch</span>
            <p className="text-xs font-body text-porcelain/60">
              Monthly essays on visual strategy, brand form, and design systems.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="relative flex items-center mt-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter work email"
                className="w-full px-4 py-3 rounded-full bg-porcelain/10 text-porcelain placeholder:text-porcelain/40 text-sm border border-porcelain/15 focus:outline-none focus:border-electric-red transition-colors pr-28 font-body"
              >
              </input>
              <button
                type="submit"
                className="absolute right-1 px-4 py-2 rounded-full bg-electric-red text-onyx font-body font-medium text-xs hover:brightness-110 active:scale-95 transition-all"
              >
                {subscribed ? 'Subscribed' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        {/* Center/Bottom: Oversized "aldera" wordmark in Outfit display font */}
        <div className="py-12 md:py-20 flex flex-col items-center justify-center select-none overflow-hidden">
          <span
            className="font-display font-semibold lowercase text-center text-porcelain tracking-tighter leading-none"
            style={{
              fontSize: 'clamp(4.5rem, 18vw, 16rem)',
              fontWeight: 600,
              letterSpacing: '-0.035em',
              lineHeight: 1.05,
            }}
          >
            aldera
          </span>
        </div>

        {/* Bottom Bar: Copyright, Powered by AIRIZZ (airizz.co), and Back-to-Top Button */}
        <div className="pt-8 border-t border-porcelain/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-porcelain/50">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-center sm:text-left">
            <span>© {new Date().getFullYear()} Aldera Studio India. All rights reserved.</span>
            <span className="hidden sm:inline text-porcelain/30">·</span>
            <span>
              Powered by{' '}
              <a
                href="https://airizz.co"
                target="_blank"
                rel="noreferrer"
                className="text-electric-red hover:underline font-semibold tracking-wide transition-colors"
              >
                AIRIZZ
              </a>
            </span>
          </div>

          {/* Back-to-Top Button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-electric-red transition-colors group font-body"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <span className="text-base transition-transform group-hover:-translate-y-1">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
