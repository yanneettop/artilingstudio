export type PortfolioCategory =
  | "bespoke-sinks"
  | "bathrooms"
  | "vanity-details"
  | "premium-tiling";

export type PortfolioItem = {
  id: string;
  title: string;
  slug: string;
  cover: string;
  collage?: string;
  galleryImages: string[];
  detailImages: string[];
  categories: PortfolioCategory[];
  featured?: boolean;
  material: string;
  scope: string;
  descriptor: string;
  summary: string;
};

export const portfolioCategories = [
  "bespoke-sinks",
  "bathrooms",
  "vanity-details",
  "premium-tiling",
] as const satisfies readonly PortfolioCategory[];

export const portfolioData = [
  {
    id: "dark-emperador-floating-sink",
    title: "Dark Emperador Floating Sink",
    slug: "dark-emperador-floating-sink",
    cover: "/projects/dark-emperador-floating-sink/dark-emperador-floating-sink.png",
    collage: "/projects/dark-emperador-floating-sink/dark-emperador-floating-sink.png",
    galleryImages: [],
    detailImages: [],
    categories: ["bespoke-sinks", "bathrooms", "premium-tiling"],
    featured: true,
    material: "Dark marble-effect porcelain",
    scope: "Floating bespoke sink with integrated bathroom composition",
    descriptor: "Dark stone surfaces with a quiet floating sink statement",
    summary:
      "A dramatic dark-toned bathroom composition built around a custom floating sink, precise detailing, and integrated lighting.",
  },
  {
    id: "statuario-linear-sink",
    title: "Statuario Linear Sink",
    slug: "statuario-linear-sink",
    cover: "/projects/statuario-linear-sink/statuario-linear-sink.png",
    collage: "/projects/statuario-linear-sink/statuario-linear-sink.png",
    galleryImages: [],
    detailImages: [],
    categories: ["bespoke-sinks", "vanity-details"],
    material: "Statuario marble-effect porcelain",
    scope: "Linear sink composition with refined edge detailing",
    descriptor: "Clean white stone effect with refined linear proportion",
    summary:
      "A clean white linear sink design focused on proportion, sharp detailing, and calm architectural presentation.",
  },
  {
    id: "calacatta-gold-led-vanity",
    title: "Calacatta Gold LED Vanity",
    slug: "calacatta-gold-led-vanity",
    cover: "/projects/calacatta-gold-led-vanity/calacatta-gold-led-vanity.png",
    collage: "/projects/calacatta-gold-led-vanity/calacatta-gold-led-vanity.png",
    galleryImages: [],
    detailImages: [],
    categories: ["bathrooms", "vanity-details", "bespoke-sinks"],
    material: "Calacatta Gold porcelain",
    scope: "Vanity composition with LED mirror integration",
    descriptor: "Warm-veined porcelain with integrated vanity lighting",
    summary:
      "A refined vanity project combining warm-veined marble-effect porcelain, lighting integration, and clean bespoke sink geometry.",
  },
  {
    id: "soft-stone-double-vanity",
    title: "Soft Stone Double Vanity",
    slug: "soft-stone-double-vanity",
    cover: "/projects/soft-stone-double-vanity/soft-stone-double-vanity.png",
    collage: "/projects/soft-stone-double-vanity/soft-stone-double-vanity.png",
    galleryImages: [],
    detailImages: [],
    categories: ["bathrooms", "vanity-details"],
    material: "Soft stone-effect porcelain",
    scope: "Double vanity with integrated storage and sink detailing",
    descriptor: "Soft stone textures with a restrained contemporary finish",
    summary:
      "A calm neutral-toned double vanity composition that highlights clean joinery, storage integration, and precise finish quality.",
  },
  {
    id: "beige-stone-floating-vanity",
    title: "Beige Stone Floating Vanity",
    slug: "beige-stone-floating-vanity",
    cover: "/projects/beige-stone-floating-vanity/beige-stone-floating-vanity.png",
    collage: "/projects/beige-stone-floating-vanity/beige-stone-floating-vanity.png",
    galleryImages: [],
    detailImages: [],
    categories: ["bathrooms", "bespoke-sinks"],
    material: "Beige stone-effect porcelain",
    scope: "Floating vanity and minimal architectural bathroom composition",
    descriptor: "Pared-back beige stone with floating architectural calm",
    summary:
      "A restrained stone-look bathroom centered around a floating vanity and minimalist bespoke sink design.",
  },
  {
    id: "framed-mirror-double-vanity",
    title: "Framed Mirror Double Vanity",
    slug: "framed-mirror-double-vanity",
    cover: "/projects/framed-mirror-double-vanity/framed-mirror-double-vanity.png",
    collage: "/projects/framed-mirror-double-vanity/framed-mirror-double-vanity.png",
    galleryImages: [],
    detailImages: [],
    categories: ["bathrooms", "vanity-details"],
    material: "Light stone-effect porcelain with brass fixtures",
    scope: "Double vanity with framed mirror and integrated lighting",
    descriptor: "Framed mirror symmetry with warm brass detailing",
    summary:
      "A polished double vanity composition pairing architectural mirror framing with soft lighting and warm metal fixtures.",
  },
  {
    id: "taupe-stone-mono-sink",
    title: "Taupe Stone Mono Sink",
    slug: "taupe-stone-mono-sink",
    cover: "/projects/taupe-stone-mono-sink/taupe-stone-mono-sink.png",
    collage: "/projects/taupe-stone-mono-sink/taupe-stone-mono-sink.png",
    galleryImages: [],
    detailImages: [],
    categories: ["bespoke-sinks", "vanity-details"],
    material: "Taupe stone-effect porcelain",
    scope: "Minimal monolithic sink feature",
    descriptor: "Warm taupe stone shaped into a monolithic sink form",
    summary:
      "A compact monolithic sink design with a warm stone character and restrained contemporary detailing.",
  },
  {
    id: "backlit-marble-double-vanity",
    title: "Backlit Marble Double Vanity",
    slug: "backlit-marble-double-vanity",
    cover: "/projects/backlit-marble-double-vanity/backlit-marble-double-vanity.png",
    collage: "/projects/backlit-marble-double-vanity/backlit-marble-double-vanity.png",
    galleryImages: [],
    detailImages: [],
    categories: ["bathrooms", "vanity-details"],
    material: "Marble-effect porcelain with backlit mirror detailing",
    scope: "Double vanity with integrated illumination",
    descriptor: "Refined double-vanity composition with integrated lighting",
    summary:
      "A balanced bathroom composition that combines elegant backlighting, soft marble movement, and a custom double vanity layout.",
  },
  {
    id: "graphite-spa-bathroom",
    title: "Graphite Spa Bathroom",
    slug: "graphite-spa-bathroom",
    cover: "/projects/graphite-spa-bathroom/graphite-spa-bathroom.png",
    collage: "/projects/graphite-spa-bathroom/graphite-spa-bathroom.png",
    galleryImages: [],
    detailImages: [],
    categories: ["bathrooms", "bespoke-sinks", "premium-tiling"],
    featured: true,
    material: "Graphite stone-effect porcelain",
    scope: "Floating sink with spa-style shower composition",
    descriptor: "Graphite surfaces with a calm spa-like atmosphere",
    summary:
      "A darker spa-like bathroom concept defined by quiet luxury, integrated lighting, and a strong floating sink statement.",
  },
  {
    id: "mauve-stone-statement-bathroom",
    title: "Mauve Stone Statement Bathroom",
    slug: "mauve-stone-statement-bathroom",
    cover: "/projects/mauve-stone-statement-bathroom/mauve-stone-statement-bathroom.png",
    collage: "/projects/mauve-stone-statement-bathroom/mauve-stone-statement-bathroom.png",
    galleryImages: [],
    detailImages: [],
    categories: ["bathrooms", "bespoke-sinks", "premium-tiling"],
    featured: true,
    material: "Mauve-brown polished stone-effect porcelain",
    scope: "Statement bathroom with bespoke sink and shower detailing",
    descriptor: "Deep-toned stone surfaces with a dramatic architectural mood",
    summary:
      "A richly expressive bathroom built around deep-toned surfaces, a custom sink, and a highly atmospheric material palette.",
  },
  {
    id: "onyx-feature-floating-sink",
    title: "Onyx Feature Floating Sink",
    slug: "onyx-feature-floating-sink",
    cover: "/projects/onyx-feature-floating-sink/onyx-feature-floating-sink.png",
    collage: "/projects/onyx-feature-floating-sink/onyx-feature-floating-sink.png",
    galleryImages: [],
    detailImages: [],
    categories: ["bespoke-sinks", "premium-tiling"],
    material: "Onyx-inspired porcelain",
    scope: "Floating feature sink with dramatic material expression",
    descriptor: "Expressive onyx movement with a sculptural floating presence",
    summary:
      "A high-impact statement sink using expressive onyx-style surfaces to create a bold architectural focal point.",
  },
  {
    id: "verde-marble-feature-bathroom",
    title: "Verde Marble Feature Bathroom",
    slug: "verde-marble-feature-bathroom",
    cover: "/projects/verde-marble-feature-bathroom/verde-marble-feature-bathroom.png",
    collage: "/projects/verde-marble-feature-bathroom/verde-marble-feature-bathroom.png",
    galleryImages: [],
    detailImages: [],
    categories: ["bathrooms", "bespoke-sinks", "premium-tiling"],
    featured: true,
    material: "Verde marble-effect porcelain",
    scope: "Full-surface bathroom composition with integrated sink",
    descriptor: "Full-surface marble effect with integrated bespoke composition",
    summary:
      "A full-room green marble composition where the bespoke sink, walls, and detailing work together as one dramatic surface language.",
  },
  {
    id: "walnut-double-vanity-suite",
    title: "Walnut Double Vanity Suite",
    slug: "walnut-double-vanity-suite",
    cover: "/projects/walnut-double-vanity-suite/walnut-double-vanity-suite.png",
    collage: "/projects/walnut-double-vanity-suite/walnut-double-vanity-suite.png",
    galleryImages: [],
    detailImages: [],
    categories: ["bathrooms", "vanity-details"],
    material: "Wood cabinetry with stone vanity surfaces",
    scope: "Double vanity suite with integrated bathroom detailing",
    descriptor: "Warm timber and stone balanced in a composed vanity suite",
    summary:
      "A warm residential vanity project combining wood cabinetry, layered lighting, and a refined contemporary bathroom composition.",
  },
  {
    id: "calacatta-gold-bespoke-bathroom",
    title: "Calacatta Gold Bespoke Bathroom",
    slug: "calacatta-gold-bespoke-bathroom",
    cover: "/projects/calacatta-gold-bespoke-bathroom/calacatta-gold-bespoke-bathroom.png",
    collage: "/projects/calacatta-gold-bespoke-bathroom/calacatta-gold-bespoke-bathroom.png",
    galleryImages: [],
    detailImages: [],
    categories: ["bathrooms", "bespoke-sinks", "premium-tiling"],
    featured: true,
    material: "Calacatta Gold porcelain",
    scope: "Bespoke bathroom composition with floating sink and brass fixtures",
    descriptor: "Warm-veined porcelain with bespoke floating detailing",
    summary:
      "A premium bathroom composition built around warm-veined marble-effect porcelain, wall-mounted brass fixtures, and a bespoke floating sink.",
  },
] as const satisfies readonly PortfolioItem[];

export type PortfolioSlug = (typeof portfolioData)[number]["slug"];

export const homepageSelectedWorkSlugs = [
  "calacatta-gold-bespoke-bathroom",
  "mauve-stone-statement-bathroom",
  "verde-marble-feature-bathroom",
] as const satisfies readonly PortfolioSlug[];

export const projectsFeaturedSlugs = [
  "calacatta-gold-bespoke-bathroom",
  "mauve-stone-statement-bathroom",
  "verde-marble-feature-bathroom",
  "graphite-spa-bathroom",
] as const satisfies readonly PortfolioSlug[];

export const featuredPortfolioItems = portfolioData.filter((item) => item.featured);

export const portfolioItemsBySlug = new Map(
  portfolioData.map((item) => [item.slug, item]),
);

export const getPortfolioItemBySlug = (slug: PortfolioSlug | string) =>
  portfolioItemsBySlug.get(slug);

export const getPortfolioItemsBySlugs = (slugs: readonly (PortfolioSlug | string)[]) =>
  slugs
    .map((slug) => portfolioItemsBySlug.get(slug))
    .filter((item): item is (typeof portfolioData)[number] => Boolean(item));

export const getPortfolioItemsByCategory = (category: PortfolioCategory) =>
  portfolioData.filter((item) => item.categories.includes(category));

export const homepageSelectedWorks = getPortfolioItemsBySlugs(homepageSelectedWorkSlugs);

export const projectsFeaturedPortfolioItems = getPortfolioItemsBySlugs(projectsFeaturedSlugs);

const projectsFeaturedSlugSet = new Set<string>(projectsFeaturedSlugs);

export const projectsSupportingPortfolioItems = portfolioData.filter(
  (item) => !projectsFeaturedSlugSet.has(item.slug),
);
