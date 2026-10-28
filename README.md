# Aldera /studio

> *Brands, campaigns and products people remember.*

Award-level design and marketing agency website built for **Aldera**, replicating the exact layouts, scroll mechanics, transitions, and imagery requirements.

---

## Brand Identity

- **Name**: Aldera
- **Wordmark**: `"aldera"` in Onyx + `"/studio"` at 40% opacity, set in Syne.
- **Logo Mark** (inline SVG):
  `<svg viewBox="0 0 48 48"><rect width="48" height="48" rx="10" fill="#0A0A0A"/><circle cx="34" cy="34" r="12" fill="#F5F5F0"/></svg>`
  Inverted on dark sections (Porcelain square, Onyx circle).
- **Positioning**: Independent design and marketing studio for ambitious brands.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + Custom CSS (`globals.css`) |
| Smooth Scroll | Lenis driven by GSAP ticker (`autoRaf: false`, `lagSmoothing(0)`) |
| Animation Engine | GSAP 3.15 + ScrollTrigger |
| Micro-interactions | Framer Motion (`LazyMotion` + `m`) |
| Typography | Syne (700, 800) + Inter (400, 500) via `next/font/google` |
| Image Optimization | `next/image` with remote patterns and responsive sizes |

---

## Typography Rules (Exactly Two Fonts, No Italics)

| Role | Font | Weights | Hierarchy & Style |
|---|---|---|---|
| **Display** | Syne | 700, 800 | H1, H2, Wordmark, Numerals, Pinned "WORK" |
| **Body** | Inter | 400, 500 | P, Navigation, Buttons, Labels, Captions |

- **H1**: `clamp(2.75rem, 7vw, 6.5rem)`, Syne 700, `line-height: 1`, `letter-spacing: -0.03em`
- **H2**: `clamp(2rem, 4vw, 3.5rem)`, Syne 700, `line-height: 1.05`, `letter-spacing: -0.02em`
- **P**: `1.0625rem` Inter 400, `line-height: 1.55`, `max-width: 56ch`
- **Label**: `0.8125rem` Inter 500, uppercase, `letter-spacing: 0.08em`
- `font-style: normal` everywhere. No serif, no italic, no third font.

---

## Color System

| Token | Hex | Role |
|---|---|---|
| **Porcelain** | `#F5F5F0` | 60% — Backgrounds, loader layer |
| **Onyx** | `#0A0A0A` | 30% — Text, header pill, dark sections, footer |
| **Electric Red** | `#FF2E1F` | 10% — CTAs, active pills, results band, cursor |
| **Alabaster** | `#DFDFDA` | Dividers, card borders, grid canvas dots |

---

## Architecture & Section Composition

1. **Loader & Curtain Reveal (`src/components/Loader.tsx`)**
   - Full-screen Porcelain layer above everything. Top-left logo mark, bottom-right tabular counter `000` to `100`.
   - 0–0.6s: Centred logo mark scales 0.9 to 1.
   - 0.6–2.4s: Counter runs, square tile cycling 5-6 colourful project images with clip-path wipe, Porcelain logo overlaid.
   - 2.4–3.0s: Tiles fan into rotated stack, lift up and fade out.
   - 3.0–3.8s: Centred wordmark masked rise, counter at 100.
   - 3.8–5.0s: Curtain wipe upward (`inset(0 0 100% 0)`, `expo.inOut`, 1.2s). Hero image arc rises from `yPercent 40` (scale 0.9 to 1, stagger 0.08s) as header pill fades in.
   - Session bypass on repeat visits (`sessionStorage.getItem('aldera_loader_played')`).

2. **Header (`src/components/Header.tsx`)**
   - Floating pill: `top: 16px`, width `min(92vw, 440px)`, height `52px`, Onyx background, `14px` radius.
   - Left: Inverted logo mark. Right: Two-line menu button.
   - Hides on scroll down, returns on scroll up.
   - Full-screen Onyx menu with large Syne links (staggered line reveal), red "Start a project" CTA, and email/social links in Inter.

3. **Hero (`src/components/Hero.tsx`)**
   - Centred H1: *"Brands, campaigns and products people remember."*
   - Image Arc: 9 colourful cards on curved arch (5 on mobile). Center card is highest and largest, cards step down symmetrically toward edges. Drift along arc, mouse parallax by depth, and scroll lift apart.
   - P + two buttons: "Start a project" (Electric Red fill) and "View work" (Onyx outline).

4. **Section 2 — Trust (`src/components/Trust.tsx`)**
   - Large Alabaster-bordered Porcelain card with dark case-study tile and 4x3 grid of 12 invented client wordmarks (Kroma, Vesper, Novus, Aethel, Solis, Lumina, Prism, Verve, Zephyr, Orbit, Astra, Caelum) with hairline dividers.

5. **Section 3 — Services (`src/components/Services.tsx`)**
   - Pinned for 6 steps, Onyx background with fine grain overlay.
   - Left half: full-bleed full-colour image changing with clip-path wipe + slow scale (1.08 to 1), floating Onyx/blur tab pill with Electric Red active tab.
   - Right half: dotted-grid canvas (Alabaster dots at 10% opacity), step counter (`01 / 06`), H2 name, 14-word P, and 3 node cards with red tags ("Image" / "Layout" / "Copy"), thumbnails, and red hairline connector lines.

6. **Section 4 — Work Pass (`src/components/WorkPass.tsx`)**
   - Pinned giant H2 "WORK" in Syne 800 uppercase.
   - 9 colourful project images scattered left, center, right drifting upward at three parallax speeds, overlapping the pinned word with `mix-blend-mode: difference`.
   - Ends with hard cut to full-bleed colour image.

7. **Section 5 — Selected Work (`src/components/SelectedWork.tsx`)**
   - Light Porcelain section with staggered two-column grid of 6 projects.
   - Hover scales 1.04, custom red cursor labelled "View" appears.
   - Click opens shared-element case study modal.

8. **Section 6 — Results Band (`src/components/ResultsBand.tsx`)**
   - Full-width Electric Red section with Onyx text.
   - Three large Syne numerals counting up (120+ Projects, 40 Countries, 12 Awards) with one-word labels.

9. **Section 7 — Process (`src/components/Process.tsx`)**
   - Four steps (Discover, Define, Design, Deliver), each with large number, H2 word, one-line P, and full-colour image, revealed with masked line rises.

10. **Section 8 — Contact (`src/components/Contact.tsx`)**
    - H2 *"Have a brand in mind?"* with large Onyx button *"Start a project"* and email address.
    - Interactive cursor trail of colourful images following pointer movement.
    - Zero rotating rings or carousels.

11. **Footer (`src/components/Footer.tsx`)**
    - Onyx background with oversized `"aldera"` wordmark in Syne 800, nav links, social links, newsletter with red button, live CET local time, and back-to-top button.

---

## Imagery Library (`src/lib/content.ts`)

42 distinct, vivid commercial images across:
- Brand identity (6)
- Packaging and product (8)
- Campaigns and advertising (6)
- Web, app and UI (5)
- Social and content (4)
- Editorial and print (4)
- Fashion and lifestyle (4)
- Photography and film (5)
- Architecture, retail and events (4)

All wrapped in `next/image` with responsive sizing and remote patterns configured.

---

## Running Locally

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```
