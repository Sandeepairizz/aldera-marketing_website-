'use client';

import { useEffect, useRef } from 'react';
import SmoothScroll from '../components/SmoothScroll';
import MotionProvider from '../components/MotionProvider';
import { LoaderProvider } from '../context/LoaderContext';
import Cursor from '../components/Cursor';
import Loader from '../components/Loader';
import Header from '../components/Header';
import Hero from '../components/Hero';
import AboutStatement from '../components/AboutStatement';
import Services from '../components/Services';
import WorkPass from '../components/WorkPass';
import WorksStack from '../components/WorksStack';
import Process from '../components/Process';
import ResultsBand from '../components/ResultsBand';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

function Site() {
  return (
    <SmoothScroll>
      <MotionProvider>
        <Cursor />
        <Loader />
        <Header />

        <main id="main-content" className="relative w-full bg-porcelain">
          {/* 1. Hero: 100svh, solid Porcelain, bold 1-line H1, unclipped word, random image swap */}
          <Hero />

          {/* 2. About: 2-line statement with expanding capsules & supporting paragraph */}
          <AboutStatement />

          {/* 3. Services: Solid Onyx, pinned 6 steps, 4:5 images, floating pill, 3 node cards */}
          <Services />

          {/* 4. Works Pass: Solid Onyx, sticky WORKS 800 heading, 12 4:5 images in 3 lanes, hard-cut */}
          <WorkPass />

          {/* 5. Selected Projects: Stacking sticky 16:9 cards, scaling 0.94 and dimming 0.7, All works button */}
          <WorksStack />

          {/* 6. Process: Sticky heading band with chapter ticks, 26/48/26 grid, active red label */}
          <Process />

          {/* 7. Results Band: Electric Red with 3 counting display numerals */}
          <ResultsBand />

          {/* 8. Contact: H2 in display font, magnetic button, cursor image trail */}
          <Contact />
        </main>

        {/* 9. Footer: Oversized aldera wordmark, plural links, studio time, back-to-top */}
        <Footer />
      </MotionProvider>
    </SmoothScroll>
  );
}

export default function Home() {
  return (
    <LoaderProvider>
      <Site />
    </LoaderProvider>
  );
}
