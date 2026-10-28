import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import SmoothScroll from '../../../components/SmoothScroll';
import Cursor from '../../../components/Cursor';
import { SELECTED_PROJECTS } from '../../../lib/content';

export function generateStaticParams() {
  return SELECTED_PROJECTS.map((proj) => ({
    slug: proj.slug,
  }));
}

export default function CasePage({ params }: { params: { slug: string } }) {
  const projectIndex = SELECTED_PROJECTS.findIndex((p) => p.slug === params.slug);
  if (projectIndex === -1) notFound();

  const project = SELECTED_PROJECTS[projectIndex];
  const nextProject = SELECTED_PROJECTS[(projectIndex + 1) % SELECTED_PROJECTS.length];

  return (
    <SmoothScroll>
      <Cursor />
      <Header />

      <main className="relative w-full bg-porcelain text-onyx">
        {/* 1. Full-bleed Hero Image */}
        <div className="relative w-full h-[65vh] sm:h-[80vh] bg-onyx overflow-hidden">
          <Image
            src={typeof project.image === 'string' ? project.image : project.image.url}
            alt={project.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-onyx/85 via-onyx/30 to-transparent" />

          {/* Overlaid Title & Category */}
          <div className="absolute bottom-8 sm:bottom-16 left-6 sm:left-12 lg:left-16 right-6 sm:right-12 z-10 max-w-5xl">
            <span className="font-body text-label text-electric-red uppercase tracking-widest block mb-3">
              {project.category} · {project.year}
            </span>
            <h1 className="text-h1 text-porcelain tracking-tight">
              {project.name}
            </h1>
          </div>
        </div>

        {/* 2. Meta Row: Client, Year, Services, Deliverables */}
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-14 sm:py-20 border-b border-onyx/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
            <div>
              <span className="block font-body text-label text-onyx/40 mb-1">Client</span>
              <span className="font-body font-medium text-onyx">{project.client}</span>
            </div>
            <div>
              <span className="block font-body text-label text-onyx/40 mb-1">Year</span>
              <span className="font-body font-medium text-onyx">{project.year}</span>
            </div>
            <div>
              <span className="block font-body text-label text-onyx/40 mb-1">Services</span>
              <span className="font-body font-medium text-onyx">{project.services}</span>
            </div>
            <div>
              <span className="block font-body text-label text-onyx/40 mb-1">Deliverables</span>
              <span className="font-body font-medium text-onyx">
                {project.deliverables.join(' · ')}
              </span>
            </div>
          </div>

          <div className="mt-12 max-w-3xl">
            <p className="font-body text-p text-onyx/80 leading-relaxed text-lg sm:text-xl">
              {project.summary}
            </p>
          </div>
        </div>

        {/* 3. Three Image Blocks in Alternating Layouts */}
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-16 sm:py-24 flex flex-col gap-16 sm:gap-24">
          {/* Layout 1: Full-width Image */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-onyx border border-onyx/10 shadow-lg">
            <Image
              src={typeof (project.gallery[0] || project.image) === 'string' ? (project.gallery[0] as unknown as string) : (project.gallery[0]?.url || project.image.url)}
              alt={`${project.name} full view`}
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>

          {/* Layout 2: Two-up Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-onyx border border-onyx/10 shadow-md">
              <Image
                src={typeof (project.gallery[1] || project.image) === 'string' ? (project.gallery[1] as unknown as string) : (project.gallery[1]?.url || project.image.url)}
                alt={`${project.name} perspective`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-onyx border border-onyx/10 shadow-md">
              <Image
                src={typeof (project.gallery[2] || project.image) === 'string' ? (project.gallery[2] as unknown as string) : (project.gallery[2]?.url || project.image.url)}
                alt={`${project.name} detail`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Layout 3: Offset Editorial Block */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-alabaster/40 p-8 sm:p-14 rounded-3xl border border-onyx/10">
            <div className="md:col-span-5 flex flex-col gap-4">
              <span className="font-body text-label text-electric-red">System & Form</span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-onyx">
                Precision materiality across physical and digital touchpoints.
              </h3>
              <p className="font-body text-p text-onyx/70 text-sm sm:text-base">
                Each interaction point was crafted with custom physics and bespoke typographic hierarchy to honor the heritage while expanding future reach.
              </p>
            </div>
            <div className="md:col-span-7 relative aspect-[16/10] rounded-2xl overflow-hidden bg-onyx shadow-xl">
              <Image
                src={typeof (project.gallery[0] || project.image) === 'string' ? (project.gallery[0] as unknown as string) : (project.gallery[0]?.url || project.image.url)}
                alt={`${project.name} materiality`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
            </div>
          </div>
        </div>

        {/* 4. Next Project Preview Link */}
        <div className="w-full bg-onyx text-porcelain py-24 sm:py-32 px-6 sm:px-12 text-center border-t border-porcelain/15">
          <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
            <span className="font-body text-label text-electric-red">Next Case Study</span>
            <Link
              href={`/works/${nextProject.slug}`}
              className="group flex flex-col items-center gap-4 transition-transform hover:scale-[1.02]"
              data-cursor="view"
            >
              <h2 className="font-display font-bold text-4xl sm:text-6xl md:text-7xl text-porcelain group-hover:text-electric-red transition-colors">
                {nextProject.name}
              </h2>
              <span className="font-body text-sm uppercase tracking-widest text-porcelain/50 group-hover:text-porcelain transition-colors">
                Explore {nextProject.category} Case →
              </span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </SmoothScroll>
  );
}
