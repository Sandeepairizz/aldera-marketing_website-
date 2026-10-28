'use client';

import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SmoothScroll from '../../components/SmoothScroll';
import Cursor from '../../components/Cursor';

export default function StudioPage() {
  return (
    <SmoothScroll>
      <Cursor />
      <Header />

      <main className="relative w-full min-h-screen bg-porcelain text-onyx pt-36 sm:pt-44 pb-32 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Page-level H1: Outfit 700 */}
          <div className="mb-16 sm:mb-24 pb-10 border-b border-onyx/10">
            <span className="font-body text-label text-electric-red block mb-3">
              Independent Practice
            </span>
            <h1 className="text-h1 text-onyx tracking-tight max-w-4xl">
              An independent design & marketing studio for ambitious brands.
            </h1>
          </div>

          {/* Studio Editorial Manifesto & Main Image */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start mb-24">
            <div className="lg:col-span-5 flex flex-col gap-6">
              <span className="font-body text-label text-onyx/40">Our Thesis</span>
              <p className="font-body text-onyx/85 text-xl sm:text-2xl leading-relaxed">
                Aldera operates at the intersection of brand architecture, industrial materiality,
                and digital craft. We believe great brands are not decorated—they are engineered
                from first principles.
              </p>
              <p className="font-body text-p text-onyx/70 leading-relaxed">
                Founded in 2020, our studio remains deliberately compact, pairing world-class
                specialists with ambitious founders who refuse to blend into category convention.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="relative w-full aspect-[16/10] rounded-[24px] overflow-hidden bg-onyx border border-onyx/10 shadow-xl">
                <Image
                  src="/img/projects/06.webp"
                  alt="Aldera Studio Paris Interior"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Studio Disciplines */}
          <div className="py-16 border-t border-onyx/10 mb-20">
            <span className="font-body text-label text-electric-red block mb-8">
              Capabilities
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                {
                  title: 'Brand Architecture',
                  desc: 'Positioning, naming systems, visual identity, custom typography, and complete design guidelines.',
                },
                {
                  title: 'Packaging & Industrial',
                  desc: 'Structural vessel forms, tactile paper stocks, hot foil stamping, and sustainable supply-chain packaging.',
                },
                {
                  title: 'Global Campaigns',
                  desc: 'Key visual art direction, metropolitan out-of-home takeovers, digital cinema, and guerrilla street activations.',
                },
                {
                  title: 'Web & Digital Products',
                  desc: 'Flagship eCommerce, creative web applications, component libraries, and fluid kinetic physics interactions.',
                },
                {
                  title: 'Photo & Motion Film',
                  desc: 'Studio still-life styling, 35mm cinema production, lighting design, color grading, and broadcast films.',
                },
                {
                  title: 'Content & Narrative',
                  desc: 'Rapid cultural storytelling, social video frameworks, episodic editorial feeds, and community resonance.',
                },
              ].map((disc) => (
                <div key={disc.title} className="flex flex-col border-t border-onyx/10 pt-6">
                  <h3 className="font-display font-bold text-xl text-onyx mb-2">{disc.title}</h3>
                  <p className="font-body text-sm text-onyx/70 leading-relaxed">{disc.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Studio Locations: India (Bengaluru, Mumbai, New Delhi) */}
          <div className="py-16 border-t border-onyx/10">
            <span className="font-body text-label text-onyx/50 block mb-8">Locations</span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { city: 'Bengaluru', address: 'Indiranagar 100 Feet Road, Bengaluru, Karnataka 560038', tz: 'IST' },
                { city: 'Mumbai', address: 'Bandra Kurla Complex (BKC), Mumbai, Maharashtra 400051', tz: 'IST' },
                { city: 'New Delhi', address: 'Connaught Place, Central Delhi, New Delhi 110001', tz: 'IST' },
              ].map((loc) => (
                <div key={loc.city} className="p-8 rounded-2xl bg-alabaster/40 border border-onyx/10">
                  <span className="text-xs font-mono text-electric-red uppercase tracking-wider block mb-1">
                    {loc.tz}
                  </span>
                  <h4 className="font-display font-bold text-2xl text-onyx mb-2">{loc.city}</h4>
                  <p className="font-body text-sm text-onyx/70">{loc.address}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </SmoothScroll>
  );
}
