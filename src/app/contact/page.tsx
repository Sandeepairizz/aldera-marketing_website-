'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SmoothScroll from '../../components/SmoothScroll';
import Cursor from '../../components/Cursor';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: 'Brand Identity',
    budget: '$50k - $100k',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <SmoothScroll>
      <Cursor />
      <Header />

      <main className="relative w-full min-h-screen bg-porcelain text-onyx pt-36 sm:pt-44 pb-32 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Page-level H1: Outfit 700 */}
          <div className="mb-14 sm:mb-20 pb-8 border-b border-onyx/10">
            <span className="font-body text-label text-electric-red block mb-3">
              New Inquiries
            </span>
            <h1 className="text-h1 text-onyx tracking-tight">
              Start a project
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-20">
            {/* Left Column: Direct Contact & Office Info */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <div>
                <span className="font-body text-label text-onyx/40 block mb-2">Direct Channel</span>
                <a
                  href="mailto:hello@aldera.studio"
                  className="font-display font-bold text-2xl sm:text-3xl text-onyx hover:text-electric-red transition-colors"
                >
                  hello@aldera.studio
                </a>
              </div>

              <div>
                <span className="font-body text-label text-onyx/40 block mb-2">Press & Editorial</span>
                <a
                  href="mailto:press@aldera.studio"
                  className="font-body text-xl text-onyx/80 hover:text-electric-red transition-colors"
                >
                  press@aldera.studio
                </a>
              </div>

              <div className="pt-8 border-t border-onyx/10 flex flex-col gap-3">
                <span className="font-body text-label text-onyx/40">Inquiry Notes</span>
                <p className="font-body text-sm text-onyx/70 leading-relaxed max-w-sm">
                  We reply to all qualified inquiries within 24 business hours. For immediate
                  conversations, include your target timeline and scope summary.
                </p>
              </div>
            </div>

            {/* Right Column: Contact Inquiry Form */}
            <div className="lg:col-span-7">
              {submitted ? (
                <div className="p-12 rounded-[24px] bg-alabaster border border-onyx/10 text-center">
                  <span className="font-body text-label text-electric-red block mb-2">Received</span>
                  <h3 className="font-display font-bold text-3xl text-onyx mb-3">
                    Thank you for reaching out.
                  </h3>
                  <p className="font-body text-p text-onyx/75 mx-auto">
                    A partner from our studio will review your brief and be in touch shortly.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6 p-8 sm:p-12 rounded-[24px] bg-alabaster border border-onyx/10 shadow-sm"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="font-body text-xs uppercase tracking-wider text-onyx/60 block mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Elena Vance"
                        className="w-full px-4 py-3 rounded-xl bg-porcelain text-onyx border border-onyx/15 focus:outline-none focus:border-electric-red transition-colors text-sm font-body"
                      />
                    </div>

                    <div>
                      <label className="font-body text-xs uppercase tracking-wider text-onyx/60 block mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="elena@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-porcelain text-onyx border border-onyx/15 focus:outline-none focus:border-electric-red transition-colors text-sm font-body"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="font-body text-xs uppercase tracking-wider text-onyx/60 block mb-2">
                        Company / Brand
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Company Inc."
                        className="w-full px-4 py-3 rounded-xl bg-porcelain text-onyx border border-onyx/15 focus:outline-none focus:border-electric-red transition-colors text-sm font-body"
                      />
                    </div>

                    <div>
                      <label className="font-body text-xs uppercase tracking-wider text-onyx/60 block mb-2">
                        Primary Discipline
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-porcelain text-onyx border border-onyx/15 focus:outline-none focus:border-electric-red transition-colors text-sm font-body"
                      >
                        <option>Brand Identity</option>
                        <option>Packaging & Product</option>
                        <option>Global Campaigns</option>
                        <option>Web & Digital Experience</option>
                        <option>Photo & Cinema Film</option>
                        <option>Full-Service Launch</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-body text-xs uppercase tracking-wider text-onyx/60 block mb-2">
                      Project Brief & Scope
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your brand, goals, target timeline, and budget..."
                      className="w-full px-4 py-3 rounded-xl bg-porcelain text-onyx border border-onyx/15 focus:outline-none focus:border-electric-red transition-colors text-sm font-body resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-electric-red text-porcelain font-body font-medium text-base tracking-wide hover:brightness-110 active:scale-95 transition-all shadow-md mt-2"
                  >
                    Send inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </SmoothScroll>
  );
}
