'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SmoothScroll from '../../components/SmoothScroll';
import Cursor from '../../components/Cursor';
import { SELECTED_PROJECTS } from '../../lib/content';

const CATEGORIES = [
  'All',
  'Brand Identity',
  'Packaging',
  'Digital Product',
  'Industrial Design',
  'Fashion Campaign',
  'Spatial Identity',
] as const;

export default function WorksPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredProjects =
    activeCategory === 'All'
      ? SELECTED_PROJECTS
      : SELECTED_PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <SmoothScroll>
      <Cursor />
      <Header />

      <main className="relative w-full min-h-screen bg-porcelain text-onyx pt-36 sm:pt-44 pb-32 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Page-level H1: Outfit 700 */}
          <div className="mb-12 sm:mb-16 pb-8 border-b border-onyx/10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="font-body text-label text-electric-red block mb-3">
                Index 2023 — 2025
              </span>
              <h1 className="text-h1 text-onyx tracking-tight">
                Works
              </h1>
            </div>

            <p className="font-body text-p text-onyx/70 max-w-md">
              Selected commercial commissions spanning brand architecture, structural packaging,
              global campaigns, and flagship digital products.
            </p>
          </div>

          {/* Filter Chips with Framer Motion layout and AnimatePresence */}
          <div className="flex flex-wrap items-center gap-2.5 mb-14">
            {CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-body transition-all duration-300 ${
                    isSelected
                      ? 'bg-onyx text-porcelain font-medium shadow-md'
                      : 'bg-alabaster/60 text-onyx/75 hover:bg-alabaster hover:text-onyx'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Strict 3-column grid of identical 4:5 cards */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredProjects.map((proj) => (
                <motion.div
                  key={proj.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  className="group relative flex flex-col"
                >
                  <Link
                    href={`/works/${proj.slug}`}
                    className="block relative w-full aspect-[4/5] rounded-[18px] overflow-hidden bg-onyx border border-onyx/10 shadow-sm transition-all duration-500 group-hover:shadow-2xl"
                    data-cursor="view"
                  >
                    <Image
                      src={typeof proj.image === 'string' ? proj.image : proj.image.url}
                      alt={proj.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-onyx/85 via-onyx/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

                    {/* Top-right Year badge */}
                    <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-onyx/75 backdrop-blur-md border border-porcelain/15 text-porcelain text-[11px] font-mono">
                      {proj.year}
                    </div>

                    {/* Bottom Content: Category label and project title */}
                    <div className="absolute bottom-5 left-5 right-5 z-10">
                      <span className="block text-[11px] font-body uppercase tracking-widest text-electric-red font-semibold mb-1">
                        {proj.category}
                      </span>
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-porcelain tracking-tight line-clamp-1">
                        {proj.name}
                      </h3>
                    </div>
                  </Link>

                  {/* Summary & Deliverables under card */}
                  <div className="pt-3 flex items-center justify-between text-xs text-onyx/60 font-body">
                    <span>{proj.client}</span>
                    <span>↗</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>

      <Footer />
    </SmoothScroll>
  );
}
