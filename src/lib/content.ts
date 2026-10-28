export interface ImageItem {
  id: string;
  url: string;
  alt: string;
  category: string;
  title: string;
}

export const IMAGERY = {
  // Brand identity (6)
  brandIdentity: [
    {
      id: 'brand-1',
      url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1400&q=85',
      alt: 'Luxury typography publication monograph and chromatic swatches',
      category: 'Brand Identity',
      title: 'Aethel Identity',
    },
    {
      id: 'brand-2',
      url: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1400&q=85',
      alt: 'Minimalist brand stationery on rich terracotta background',
      category: 'Brand Identity',
      title: 'Vesper System',
    },
    {
      id: 'brand-3',
      url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=85',
      alt: 'Dynamic abstract brand graphics and 3D typography',
      category: 'Brand Identity',
      title: 'Kroma Studio',
    },
    {
      id: 'brand-4',
      url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1400&q=85',
      alt: 'Architectural illuminated studio signage on glass facade',
      category: 'Brand Identity',
      title: 'Novus Signage',
    },
    {
      id: 'brand-5',
      url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1400&q=85',
      alt: 'Minimalist corporate letterhead and business card suite',
      category: 'Brand Identity',
      title: 'Solis Suite',
    },
    {
      id: 'brand-6',
      url: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1400&q=85',
      alt: 'Strategic brand identity moodboard and collateral',
      category: 'Brand Identity',
      title: 'Caelum Collateral',
    },
  ],

  // Packaging and product (8)
  packagingProduct: [
    {
      id: 'pack-1',
      url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1400&q=85',
      alt: 'Craft soda botanical beverage cans with matte finish and condensation',
      category: 'Packaging & Product',
      title: 'Nectar Botanicals',
    },
    {
      id: 'pack-2',
      url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1400&q=85',
      alt: 'Luxury cosmetic amber serum dropper bottle in directional sunlight',
      category: 'Packaging & Product',
      title: 'Aura Skincare',
    },
    {
      id: 'pack-3',
      url: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1400&q=85',
      alt: 'Sculptural luxury amber glass flacon bottle with warm light refraction',
      category: 'Packaging & Product',
      title: 'Verve Fragrance',
    },
    {
      id: 'pack-4',
      url: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1400&q=85',
      alt: 'Limited edition high-performance running sneaker with neon accents',
      category: 'Packaging & Product',
      title: 'Strata Kicks',
    },
    {
      id: 'pack-5',
      url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1400&q=85',
      alt: 'Anodized aluminum over-ear wireless audio headphones',
      category: 'Packaging & Product',
      title: 'Echo Audio',
    },
    {
      id: 'pack-6',
      url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=1400&q=85',
      alt: 'Specialty coffee bag with hot gold foil stamping',
      category: 'Packaging & Product',
      title: 'Origin Roast',
    },
    {
      id: 'pack-7',
      url: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=1400&q=85',
      alt: 'Botanical cider bottle with tactile debossed label',
      category: 'Packaging & Product',
      title: 'Forge Cider',
    },
    {
      id: 'pack-8',
      url: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1400&q=85',
      alt: 'Ceramic luxury moisturizer vessel packaging',
      category: 'Packaging & Product',
      title: 'Terra Crème',
    },
  ],

  // Campaigns and advertising (6)
  campaignsAds: [
    {
      id: 'camp-1',
      url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1400&q=85',
      alt: 'Metropolitan out-of-home illuminated billboard takeover at twilight',
      category: 'Campaigns & Advertising',
      title: 'Metropolis OOH',
    },
    {
      id: 'camp-2',
      url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1400&q=85',
      alt: 'Urban typographic paste-up posters on brick city wall',
      category: 'Campaigns & Advertising',
      title: 'Unbound Street',
    },
    {
      id: 'camp-3',
      url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1400&q=85',
      alt: 'Transit shelter advertising screen with glowing color blocks',
      category: 'Campaigns & Advertising',
      title: 'Transit Pulse',
    },
    {
      id: 'camp-4',
      url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1400&q=85',
      alt: 'Digital outdoor media totem screen at twilight',
      category: 'Campaigns & Advertising',
      title: 'Beacon Network',
    },
    {
      id: 'camp-5',
      url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1400&q=85',
      alt: 'Graphic wild posting campaign across concrete urban wall',
      category: 'Campaigns & Advertising',
      title: 'Vanguard Flypost',
    },
    {
      id: 'camp-6',
      url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1400&q=85',
      alt: 'Architectural mega-LED display screen in the night rain',
      category: 'Campaigns & Advertising',
      title: 'Nocturne LED',
    },
  ],

  // Web, app and digital design (5)
  webAppUI: [
    {
      id: 'web-1',
      url: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1400&q=85',
      alt: 'Luxury eyewear and bespoke digital product art direction',
      category: 'Web & App Design',
      title: 'Monolith Design',
    },
    {
      id: 'web-2',
      url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1400&q=85',
      alt: 'Boutique hospitality mobile application on iPhone screen',
      category: 'Web & App Design',
      title: 'Kavala iOS',
    },
    {
      id: 'web-3',
      url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1400&q=85',
      alt: 'Luxury fashion craftsmanship and bespoke typography',
      category: 'Web & App Design',
      title: 'Prism System',
    },
    {
      id: 'web-4',
      url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1400&q=85',
      alt: 'High fashion editorial model campaign',
      category: 'Web & App Design',
      title: 'Atelier Portal',
    },
    {
      id: 'web-5',
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1400&q=85',
      alt: 'Cinematic portraiture art direction',
      category: 'Web & App Design',
      title: 'Helix Platform',
    },
  ],

  // Social and content (4)
  socialContent: [
    {
      id: 'soc-1',
      url: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=1400&q=85',
      alt: 'Curated minimal editorial digital interface on smartphone screen',
      category: 'Social & Content',
      title: 'Reverie Social',
    },
    {
      id: 'soc-2',
      url: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=1400&q=85',
      alt: 'Content creator studio filming vertical cinema campaign',
      category: 'Social & Content',
      title: 'Pulse Studio',
    },
    {
      id: 'soc-3',
      url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=85',
      alt: 'Editorial still life curated for brand social feed',
      category: 'Social & Content',
      title: 'Cortex Grid',
    },
    {
      id: 'soc-4',
      url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=85',
      alt: 'Digital creators producing social storytelling reel',
      category: 'Social & Content',
      title: 'Collective Reel',
    },
  ],

  // Editorial and print (4)
  editorialPrint: [
    {
      id: 'edit-1',
      url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1400&q=85',
      alt: 'Art and design publication spread with bold typography and photography',
      category: 'Editorial & Print',
      title: 'Format Quarterly',
    },
    {
      id: 'edit-2',
      url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1400&q=85',
      alt: 'Hardcover design monograph with swiss typographic grid',
      category: 'Editorial & Print',
      title: 'Archiv Monograph',
    },
    {
      id: 'edit-3',
      url: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=1400&q=85',
      alt: 'Architectural tri-fold brochure catalogue',
      category: 'Editorial & Print',
      title: 'Spanne Brochure',
    },
    {
      id: 'edit-4',
      url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1400&q=85',
      alt: 'Limited edition fluorescent risograph poster print',
      category: 'Editorial & Print',
      title: 'Spectrum Riso',
    },
  ],

  // Fashion and lifestyle (4)
  fashionLifestyle: [
    {
      id: 'fash-1',
      url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=85',
      alt: 'Avant-garde fashion lookbook in vivid yellow couture',
      category: 'Fashion & Lifestyle',
      title: 'Soleil Lookbook',
    },
    {
      id: 'fash-2',
      url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85',
      alt: 'Saturated crimson and emerald capsule collection campaign',
      category: 'Fashion & Lifestyle',
      title: 'Moda Capsule',
    },
    {
      id: 'fash-3',
      url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1400&q=85',
      alt: 'Dynamic streetwear campaign portrait in natural light',
      category: 'Fashion & Lifestyle',
      title: 'Raw Rhythm',
    },
    {
      id: 'fash-4',
      url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1400&q=85',
      alt: 'Cinematic lifestyle portrait in warm sunlight',
      category: 'Fashion & Lifestyle',
      title: 'Kinfolk Series',
    },
  ],

  // Photography and film (5)
  photoFilm: [
    {
      id: 'film-1',
      url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1400&q=85',
      alt: 'Cinema production camera rig filming on location with vivid atmospheric illumination',
      category: 'Photo & Film',
      title: 'Lucid 35mm',
    },
    {
      id: 'film-2',
      url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1400&q=85',
      alt: 'Commercial studio still-life with geometric shadows and fruit',
      category: 'Photo & Film',
      title: 'Prisma Stills',
    },
    {
      id: 'film-3',
      url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1400&q=85',
      alt: 'Michelin gastronomy styling and dramatic directional spotlighting',
      category: 'Photo & Film',
      title: 'Feast Commercial',
    },
    {
      id: 'film-4',
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
      alt: 'Modern architectural interior in warm sunset illumination',
      category: 'Photo & Film',
      title: 'Horizon Spatial',
    },
    {
      id: 'film-5',
      url: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1400&q=85',
      alt: 'Cinema camera director rig filming on movie set',
      category: 'Photo & Film',
      title: 'Axiom Reel',
    },
  ],

  // Architecture, retail and events (4)
  architectureRetail: [
    {
      id: 'arch-1',
      url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=85',
      alt: 'Boutique storefront facade with brass architectural entrance',
      category: 'Architecture & Retail',
      title: 'Maison Flâneur',
    },
    {
      id: 'arch-2',
      url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=85',
      alt: 'Illuminated architectural exhibition pavilion canopy',
      category: 'Architecture & Retail',
      title: 'Forum Pavilion',
    },
    {
      id: 'arch-3',
      url: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1400&q=85',
      alt: 'Experiential concept retail interior with sculpted walls',
      category: 'Architecture & Retail',
      title: 'Atrium Retail',
    },
    {
      id: 'arch-4',
      url: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1400&q=85',
      alt: 'Sculptural architectural pavilion with dramatic light and shadows',
      category: 'Architecture & Retail',
      title: 'Apex Pavilion',
    },
  ],
};

// Flat array of all distinct images (42 total)
export const ALL_IMAGES: ImageItem[] = Object.values(IMAGERY).flat();

// Hero Arc / Wall: 20 distinct colorful items of varied categories for 17-panel concave wall
export const HERO_WALL_IMAGES: ImageItem[] = [
  IMAGERY.packagingProduct[0], // Nectar Botanicals
  IMAGERY.fashionLifestyle[0], // Soleil Lookbook
  IMAGERY.campaignsAds[0],     // Metropolis Times Square OOH
  IMAGERY.brandIdentity[0],    // Aethel Monograph
  IMAGERY.packagingProduct[2], // Verve Fragrance
  IMAGERY.fashionLifestyle[1], // Moda Capsule
  IMAGERY.photoFilm[0],        // Lucid 35mm
  IMAGERY.architectureRetail[0], // Maison Flâneur
  IMAGERY.packagingProduct[3], // Strata Kicks
  IMAGERY.brandIdentity[1],    // Vesper System
  IMAGERY.fashionLifestyle[2], // Raw Rhythm
  IMAGERY.campaignsAds[1],     // Unbound Street
  IMAGERY.packagingProduct[1], // Aura Skincare
  IMAGERY.webAppUI[0],         // Monolith Design
  IMAGERY.photoFilm[1],        // Prisma Stills
  IMAGERY.editorialPrint[0],   // Format Quarterly
  IMAGERY.architectureRetail[1], // Forum Pavilion
  IMAGERY.packagingProduct[4], // Echo Audio
  IMAGERY.campaignsAds[2],     // Transit Pulse
  IMAGERY.fashionLifestyle[3], // Kinfolk Series
];

export const HERO_ARC_IMAGES: ImageItem[] = HERO_WALL_IMAGES.slice(0, 9);

// Loader tile images (6 rapid cycling images)
export const LOADER_TILE_IMAGES: ImageItem[] = [
  IMAGERY.brandIdentity[0],
  IMAGERY.packagingProduct[0],
  IMAGERY.campaignsAds[0],
  IMAGERY.webAppUI[0],
  IMAGERY.fashionLifestyle[0],
];

// About section capsules (4 inline items celebrating the bold, curious, ambitious, and culture-shaping)
export const ABOUT_CAPSULES: ImageItem[] = [
  {
    id: 'about-cap-1',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=85',
    alt: 'Dynamic abstract 3D fluid chromatic wave sculpture',
    category: 'Creativity',
    title: 'The Bold',
  },
  {
    id: 'about-cap-2',
    url: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=85',
    alt: 'Prismatic iridescent light refraction and tactile glass texture',
    category: 'Curiosity',
    title: 'The Curious',
  },
  {
    id: 'about-cap-3',
    url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=85',
    alt: 'High fashion sculptural silhouette and avant-garde craftsmanship',
    category: 'Ambitious',
    title: 'Ambitious Brands',
  },
  {
    id: 'about-cap-4',
    url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=85',
    alt: 'Vibrant neon atmospheric light installation and creative energy',
    category: 'Culture',
    title: 'Shape Culture',
  },
];

// Trust clients (12 invented names)
export const TRUST_CLIENTS = [
  'KROMA',
  'VESPER',
  'NOVUS',
  'AETHEL',
  'SOLIS',
  'LUMINA',
  'PRISM',
  'VERVE',
  'ZEPHYR',
  'ORBIT',
  'ASTRA',
  'CAELUM',
];

// Services pinned section data: 6 steps, 14 words or fewer P, 4 distinct full-colour images per step
export const SERVICES_DATA = [
  {
    id: '01',
    name: 'Brand identity',
    tagline: 'Distinct visual languages and design systems engineered for category leadership.',
    mainImage: IMAGERY.brandIdentity[0],
    nodes: [
      {
        tag: 'Image' as const,
        label: 'Visual Symbolism',
        thumb: IMAGERY.brandIdentity[1],
      },
      {
        tag: 'Layout' as const,
        label: 'Grid Architecture',
        thumb: IMAGERY.brandIdentity[2],
      },
      {
        tag: 'Copy' as const,
        label: 'Voice & Positioning',
        thumb: IMAGERY.brandIdentity[4],
      },
    ],
  },
  {
    id: '02',
    name: 'Packaging and product',
    tagline: 'Tactile packaging structures and industrial design that command shelf presence.',
    mainImage: IMAGERY.packagingProduct[0],
    nodes: [
      {
        tag: 'Image' as const,
        label: 'Form & Materiality',
        thumb: IMAGERY.packagingProduct[1],
      },
      {
        tag: 'Layout' as const,
        label: 'Foil & Die Cut',
        thumb: IMAGERY.packagingProduct[2],
      },
      {
        tag: 'Copy' as const,
        label: 'Ingredient Story',
        thumb: IMAGERY.packagingProduct[4],
      },
    ],
  },
  {
    id: '03',
    name: 'Campaigns and advertising',
    tagline: 'High-impact global activations, billboards and digital films with cultural traction.',
    mainImage: IMAGERY.campaignsAds[0],
    nodes: [
      {
        tag: 'Image' as const,
        label: 'Key Visual Art',
        thumb: IMAGERY.campaignsAds[1],
      },
      {
        tag: 'Layout' as const,
        label: 'Multi-Format OOH',
        thumb: IMAGERY.campaignsAds[2],
      },
      {
        tag: 'Copy' as const,
        label: 'Provocative Hook',
        thumb: IMAGERY.campaignsAds[4],
      },
    ],
  },
  {
    id: '04',
    name: 'Web and app design',
    tagline: 'Flagship digital experiences, web apps and eCommerce with bespoke motion.',
    mainImage: IMAGERY.webAppUI[0],
    nodes: [
      {
        tag: 'Image' as const,
        label: 'Interface Motion',
        thumb: IMAGERY.webAppUI[1],
      },
      {
        tag: 'Layout' as const,
        label: 'Component Systems',
        thumb: IMAGERY.webAppUI[2],
      },
      {
        tag: 'Copy' as const,
        label: 'Micro-Interactions',
        thumb: IMAGERY.webAppUI[4],
      },
    ],
  },
  {
    id: '05',
    name: 'Photo and film',
    tagline: 'Cinematic brand films, product still-lifes and bespoke art direction.',
    mainImage: IMAGERY.photoFilm[0],
    nodes: [
      {
        tag: 'Image' as const,
        label: 'Color Grade & Tone',
        thumb: IMAGERY.photoFilm[1],
      },
      {
        tag: 'Layout' as const,
        label: 'Cinematography',
        thumb: IMAGERY.photoFilm[3],
      },
      {
        tag: 'Copy' as const,
        label: 'Narrative Script',
        thumb: IMAGERY.photoFilm[4],
      },
    ],
  },
  {
    id: '06',
    name: 'Social and content',
    tagline: 'Rapid cultural content, social campaigns and episodic narrative feeds.',
    mainImage: IMAGERY.socialContent[0],
    nodes: [
      {
        tag: 'Image' as const,
        label: 'Dynamic Motion',
        thumb: IMAGERY.socialContent[1],
      },
      {
        tag: 'Layout' as const,
        label: 'Modular Editorial',
        thumb: IMAGERY.socialContent[2],
      },
      {
        tag: 'Copy' as const,
        label: 'Conversational Hooks',
        thumb: IMAGERY.socialContent[3],
      },
    ],
  },
];

export const SERVICES = SERVICES_DATA;

// Work Pass (Section 4): 9 passing images scattered left, center, right drifting past pinned "WORK"
export const WORK_PASS_ITEMS = [
  {
    image: IMAGERY.packagingProduct[0],
    title: 'Nectar Seltzer',
    category: 'Packaging',
    col: 'left' as const,
    speed: 1.15,
    top: '12%',
    leftOffset: '8%',
    width: '16.5vw',
    aspect: '4/5',
  },
  {
    image: IMAGERY.fashionLifestyle[1],
    title: 'Moda Capsule',
    category: 'Fashion Campaign',
    col: 'right' as const,
    speed: 0.9,
    top: '22%',
    leftOffset: '72%',
    width: '16.5vw',
    aspect: '4/5',
  },
  {
    image: IMAGERY.packagingProduct[2],
    title: 'Verve Fragrance',
    category: 'Luxury Product',
    col: 'center' as const,
    speed: 1.05,
    top: '34%',
    leftOffset: '42%',
    width: '16.5vw',
    aspect: '4/5',
  },
  {
    image: IMAGERY.fashionLifestyle[0],
    title: 'Soleil Lookbook',
    category: 'Haute Couture',
    col: 'left' as const,
    speed: 0.95,
    top: '46%',
    leftOffset: '10%',
    width: '16.5vw',
    aspect: '4/5',
  },
  {
    image: IMAGERY.photoFilm[0],
    title: 'Lucid 35mm',
    category: 'Brand Film',
    col: 'right' as const,
    speed: 1.25,
    top: '58%',
    leftOffset: '70%',
    width: '16.5vw',
    aspect: '4/5',
  },
  {
    image: IMAGERY.fashionLifestyle[2],
    title: 'Raw Rhythm',
    category: 'Editorial Portrait',
    col: 'center' as const,
    speed: 1.0,
    top: '70%',
    leftOffset: '41%',
    width: '16.5vw',
    aspect: '4/5',
  },
  {
    image: IMAGERY.campaignsAds[0],
    title: 'Metropolis OOH',
    category: 'Global Campaign',
    col: 'left' as const,
    speed: 1.15,
    top: '82%',
    leftOffset: '9%',
    width: '16.5vw',
    aspect: '4/5',
  },
  {
    image: IMAGERY.architectureRetail[0],
    title: 'Flâneur Store',
    category: 'Retail Space',
    col: 'right' as const,
    speed: 0.95,
    top: '94%',
    leftOffset: '71%',
    width: '16.5vw',
    aspect: '4/5',
  },
  {
    image: IMAGERY.packagingProduct[1],
    title: 'Aura Skincare',
    category: 'Product Design',
    col: 'center' as const,
    speed: 1.1,
    top: '106%',
    leftOffset: '40%',
    width: '16.5vw',
    aspect: '4/5',
  },
];

// Full-bleed showcase image reference
export const WORK_PASS_CUT_IMAGE = IMAGERY.fashionLifestyle[0];

// Selected Work (Section 8 / Works Page): 6 featured projects with slugs and rich metadata
export const SELECTED_PROJECTS = [
  {
    id: 'proj-1',
    slug: 'aethel',
    name: 'Aethel Living',
    category: 'Branding',
    year: '2025',
    client: 'Aethel Group',
    services: 'Brand Architecture · Packaging · Spatial',
    image: IMAGERY.brandIdentity[0],
    summary: 'A complete identity redesign, luxury packaging, and retail environment for Aethel.',
    deliverables: ['Brand Architecture', 'Custom Display Font', 'Packaging Suite', 'Retail Flagship'],
    gallery: [
      IMAGERY.brandIdentity[0],
      IMAGERY.brandIdentity[1],
      IMAGERY.architectureRetail[0],
    ],
  },
  {
    id: 'proj-2',
    slug: 'nectar',
    name: 'Nectar Botanicals',
    category: 'Packaging',
    year: '2025',
    client: 'Nectar Beverage Co.',
    services: 'Industrial Design · Foil Finishes · 3D Motion',
    image: IMAGERY.packagingProduct[0],
    summary: 'Custom aluminum vessel forms, foil finishing, and sustainable supply-chain packaging.',
    deliverables: ['Structural Packaging', 'Label Finishes', 'Global Campaign', '3D Motion'],
    gallery: [
      IMAGERY.packagingProduct[0],
      IMAGERY.packagingProduct[2],
      IMAGERY.packagingProduct[1],
    ],
  },
  {
    id: 'proj-3',
    slug: 'monolith',
    name: 'Monolith Design',
    category: 'Digital',
    year: '2024',
    client: 'Monolith Systems',
    services: 'Design System · Interaction · Web App',
    image: IMAGERY.webAppUI[0],
    summary: 'Next-generation luxury digital flagship experience with fluid kinetic physics feedback.',
    deliverables: ['Design System', 'Fluid Physics UI', 'Desktop & Mobile App', 'Component Library'],
    gallery: [
      IMAGERY.webAppUI[0],
      IMAGERY.webAppUI[1],
      IMAGERY.webAppUI[2],
    ],
  },
  {
    id: 'proj-4',
    slug: 'vanguard',
    name: 'Vanguard Pulse',
    category: 'Campaigns',
    year: '2024',
    client: 'Vanguard Media Global',
    services: 'Global Activation · Key Art · Digital OOH',
    image: IMAGERY.campaignsAds[0],
    summary: 'Cross-continental billboard takeover across Tokyo, London, Paris, and New York.',
    deliverables: ['Key Art Direction', 'Out-of-Home Takeover', 'Broadcast Film', 'Experiential AR'],
    gallery: [
      IMAGERY.campaignsAds[0],
      IMAGERY.campaignsAds[1],
      IMAGERY.campaignsAds[2],
    ],
  },
  {
    id: 'proj-5',
    slug: 'soleil',
    name: 'Soleil Haute',
    category: 'Photo and film',
    year: '2024',
    client: 'Maison Soleil Paris',
    services: 'Creative Direction · Runway · Lookbook',
    image: IMAGERY.fashionLifestyle[0],
    summary: 'Seasonal capsule collection lookbook, digital runway experience, and print monograph.',
    deliverables: ['Lookbook Art Direction', 'Digital Runway', 'Print Monograph', 'Social Content'],
    gallery: [
      IMAGERY.fashionLifestyle[0],
      IMAGERY.fashionLifestyle[1],
      IMAGERY.photoFilm[0],
    ],
  },
  {
    id: 'proj-6',
    slug: 'flaneur',
    name: 'Maison Flâneur',
    category: 'Branding',
    year: '2023',
    client: 'Flâneur Retail International',
    services: 'Spatial Identity · Wayfinding · Materiality',
    image: IMAGERY.architectureRetail[0],
    summary: 'Spatial retail experience merging architectural brasswork with tactile digital tables.',
    deliverables: ['Interior Branding', 'Wayfinding System', 'Interactive Tables', 'Sound Design'],
    gallery: [
      IMAGERY.architectureRetail[0],
      IMAGERY.architectureRetail[1],
      IMAGERY.editorialPrint[0],
    ],
  },
];

// Results Band (Section 6)
export const RESULTS_METRICS = [
  { value: 120, suffix: '+', label: 'Projects' },
  { value: 40, suffix: '', label: 'Countries' },
  { value: 12, suffix: '', label: 'Awards' },
];

// Process (Section 7): 4 steps
export const PROCESS_STEPS = [
  {
    num: '01',
    name: 'Discover',
    desc: 'Uncompromising research into category dynamics, audience tensions, and brand truths.',
    image: IMAGERY.editorialPrint[1],
  },
  {
    num: '02',
    name: 'Define',
    desc: 'Sharpening the strategic thesis into an unmistakable creative edge and positioning.',
    image: IMAGERY.brandIdentity[5],
  },
  {
    num: '03',
    name: 'Design',
    desc: 'Relentless craft across visual systems, spatial form, digital interaction, and motion.',
    image: IMAGERY.webAppUI[2],
  },
  {
    num: '04',
    name: 'Deliver',
    desc: 'Seamless launch, production fidelity, and asset frameworks built to endure at scale.',
    image: IMAGERY.photoFilm[4],
  },
];

// Cursor Trail Images (Section 8)
export const CURSOR_TRAIL_IMAGES: ImageItem[] = [
  IMAGERY.packagingProduct[2],
  IMAGERY.campaignsAds[1],
  IMAGERY.brandIdentity[1],
  IMAGERY.fashionLifestyle[0],
  IMAGERY.photoFilm[0],
  IMAGERY.webAppUI[1],
  IMAGERY.packagingProduct[0],
  IMAGERY.architectureRetail[0],
];

export type CaseItem =
  | { type: 'intro' }
  | { type: 'image'; src: string; alt: string; caption: string; height: number; ratio: number }
  | { type: 'tile'; src: string; alt: string; caption: string; text: string; height: number; ratio: number }
  | { type: 'statement'; label: string; text: string };

// height is in "units" (100 = viewport height); ratio is width / height
export const CASE_STUDY: {
  slug: string;
  title: string;
  intro: string;
  meta: { label: string; value: string }[];
  items: CaseItem[];
} = {
  slug: 'colour-that-travels',
  title: 'Colour that travels.',
  intro:
    'An identity, packaging range and launch campaign for a sparkling drink, shot over two days in a sunlit rooftop studio.',
  meta: [
    { label: 'Client', value: 'Sunmark' },
    { label: 'Year', value: '2026' },
    { label: 'Scope', value: 'Identity, packaging, film' },
  ],
  items: [
    { type: 'intro' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1400&q=85', alt: 'Sparkling botanical craft drink can with natural condensation', caption: 'The hero can', height: 45, ratio: 16 / 9 },
    { type: 'image', src: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=1400&q=85', alt: 'Craft beverage bottles with tactile debossed label', caption: 'The palette', height: 60, ratio: 3 / 4 },
    { type: 'tile', src: '/img/case/03.webp', alt: 'Close-up of a can label pattern', caption: 'The label', text: 'Every colour is mixed to glow in daylight: citrus orange, deep teal and a clean cream ground.', height: 22, ratio: 1 },
    { type: 'statement', label: 'Chapter two', text: 'One bold system, and a product that carries the colour from shelf to screen.' },
    { type: 'image', src: '/img/case/04.webp', alt: 'A shelf of colourful drink cans', caption: 'Shelf test, day one', height: 32, ratio: 3 / 2 },
    { type: 'image', src: '/img/case/05.webp', alt: 'Four flavour cans on a pedestal', caption: 'The flavour range', height: 40, ratio: 3 / 4 },
    { type: 'image', src: '/img/case/06.webp', alt: 'Geometric pattern in orange and teal', caption: 'Pattern study', height: 30, ratio: 3 / 4 },
    { type: 'image', src: '/img/case/07.webp', alt: 'Rooftop photo studio set', caption: 'The rooftop set', height: 45, ratio: 16 / 9 },
    { type: 'image', src: '/img/case/08.webp', alt: 'Model in profile holding a can', caption: 'The campaign portrait', height: 42, ratio: 3 / 4 },
    { type: 'statement', label: 'Result', text: 'Sell-through up 38% in the first month.' },
    { type: 'image', src: '/img/case/09.webp', alt: 'Billboard with a drink can on a city street', caption: 'Billboard, launch week', height: 32, ratio: 3 / 2 },
  ],
};
