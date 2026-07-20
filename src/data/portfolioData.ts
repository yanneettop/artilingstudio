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
  coverImage?: string;
  collage?: string;
  galleryImages: string[];
  detailImages: string[];
  imageAlts?: string[];
  alt?: string;
  categories: PortfolioCategory[];
  featured?: boolean;
  material: string;
  category?: string;
  scope: string;
  descriptor: string;
  summary: string;
  metaTitle?: string;
  metaDescription?: string;
  fullDescription?: string;
  projectSections?: {
    title: string;
    body: string;
  }[];
  details?: {
    material?: string;
    work?: string;
    detail?: string;
  };
  features?: string[];
  seoDescription?: string;
  serviceTags?: string[];
  keywords?: string[];
};

export const portfolioCategories = [
  "bespoke-sinks",
  "bathrooms",
  "vanity-details",
  "premium-tiling",
] as const satisfies readonly PortfolioCategory[];

export const portfolioData = [
  {
    id: "onyx-frame-porcelain-vanity",
    title: "Onyx Frame Vanity",
    slug: "onyx-frame-porcelain-vanity",
    cover:
      "/projects/onyx-frame-porcelain-vanity/bespoke-mitred-porcelain-vanity-blue-onyx-wall-london.webp",
    coverImage:
      "/projects/onyx-frame-porcelain-vanity/bespoke-mitred-porcelain-vanity-blue-onyx-wall-london.webp",
    collage:
      "/projects/onyx-frame-porcelain-vanity/bespoke-mitred-porcelain-vanity-blue-onyx-wall-london.webp",
    galleryImages: [
      "/projects/onyx-frame-porcelain-vanity/integrated-porcelain-sink-bronze-wall-mounted-tap.webp",
      "/projects/onyx-frame-porcelain-vanity/porcelain-vanity-unit-push-to-open-drawers.webp",
      "/projects/onyx-frame-porcelain-vanity/made-to-measure-porcelain-sink-vanity-london.webp",
      "/projects/onyx-frame-porcelain-vanity/beige-marble-effect-porcelain-bathroom-vanity.webp",
    ],
    detailImages: [],
    imageAlts: [
      "Bespoke mitred porcelain vanity unit with integrated sink, push-to-open drawers and blue onyx-effect feature wall in a London bathroom.",
      "Close-up of integrated mitred porcelain sink with bronze wall-mounted tap and beige marble-effect porcelain finish.",
      "Made-to-measure porcelain vanity unit with push-to-open drawers and matching porcelain drawer fronts.",
      "Side detail of bespoke porcelain sink vanity with open handle-free drawer storage.",
      "Beige marble-effect porcelain bathroom vanity with mitred sink and seamless drawer detail.",
    ],
    alt:
      "Bespoke mitred porcelain vanity unit with integrated sink, push-to-open drawers and blue onyx-effect feature wall in a London bathroom.",
    categories: ["bespoke-sinks", "bathrooms", "vanity-details", "premium-tiling"],
    featured: true,
    material: "Beige marble-effect porcelain with blue onyx-effect feature wall",
    category: "Bespoke Mitred Porcelain Vanity with Push-to-Open Drawers",
    scope: "Bespoke Porcelain Sinks & Vanity Units",
    descriptor: "Bespoke porcelain sink and vanity unit with push-to-open drawers",
    summary:
      "A made-to-measure porcelain vanity unit with an integrated mitred sink, matching porcelain drawer fronts and push-to-open storage, set against a blue onyx-effect feature wall.",
    metaTitle:
      "Bespoke Porcelain Vanity with Push-to-Open Drawers | Artiling Studio",
    metaDescription:
      "A bespoke mitred porcelain sink and vanity unit with matching push-to-open drawers, beige marble-effect porcelain and a blue onyx-effect feature wall.",
    fullDescription:
      "This project features a bespoke porcelain vanity unit designed as a complete bathroom feature. The integrated sink is built from beige marble-effect porcelain with clean mitred edges, matching drawer fronts and a seamless surface finish. The vanity also includes practical push-to-open drawers, allowing the storage to stay minimal and handle-free while keeping the exterior fully wrapped in porcelain. Bronze wall-mounted tapware and a blue onyx-effect feature wall add contrast to the soft stone tones. More than a basin, it is a full made-to-measure porcelain sink and vanity unit, combining storage, surface design and fabrication detail in one architectural piece.",
    features: [
      "Bespoke porcelain vanity unit",
      "Integrated mitred porcelain sink",
      "Push-to-open drawers",
      "Matching porcelain drawer fronts",
      "Beige marble-effect porcelain finish",
      "Blue onyx-effect feature wall",
      "Bronze wall-mounted tapware",
      "Made-to-measure bathroom fabrication",
      "Seamless porcelain surface detail",
      "Designed and installed in London",
    ],
    seoDescription:
      "A made-to-measure porcelain vanity with an integrated mitred sink, matching drawer fronts and handle-free push-to-open storage, finished against a blue onyx-effect bathroom wall.",
    serviceTags: [
      "Bespoke Porcelain Sink",
      "Porcelain Vanity Unit",
      "Push-to-Open Drawers",
      "Mitred Edges",
      "Blue Onyx Feature Wall",
    ],
    keywords: [
      "bespoke porcelain vanity London",
      "porcelain sink London",
      "mitred porcelain sink",
      "porcelain vanity unit",
      "push to open bathroom vanity",
      "made to measure porcelain sink",
      "large format porcelain bathroom",
      "bespoke bathroom vanity London",
    ],
  },
  {
    id: "rose-onyx-porcelain-sinks-large-format-bathroom-tiling",
    title: "Rose Onyx Large Format Bathrooms",
    slug: "rose-onyx-porcelain-sinks-large-format-bathroom-tiling",
    cover:
      "/projects/rose-onyx-porcelain-sinks-large-format-bathroom-tiling/bespoke-rose-onyx-porcelain-sink-wall-mounted-taps-london.webp",
    coverImage:
      "/projects/rose-onyx-porcelain-sinks-large-format-bathroom-tiling/bespoke-rose-onyx-porcelain-sink-wall-mounted-taps-london.webp",
    collage:
      "/projects/rose-onyx-porcelain-sinks-large-format-bathroom-tiling/bespoke-rose-onyx-porcelain-sink-wall-mounted-taps-london.webp",
    galleryImages: [
      "/projects/rose-onyx-porcelain-sinks-large-format-bathroom-tiling/rose-onyx-porcelain-bathroom-large-format-shower-walls.webp",
      "/projects/rose-onyx-porcelain-sinks-large-format-bathroom-tiling/rose-onyx-large-format-porcelain-bathroom-freestanding-bath.webp",
      "/projects/rose-onyx-porcelain-sinks-large-format-bathroom-tiling/angled-rose-onyx-porcelain-sink-integrated-basin-floating-shelf.webp",
      "/projects/rose-onyx-porcelain-sinks-large-format-bathroom-tiling/close-view-rose-onyx-porcelain-sink-integrated-basin-taps.webp",
    ],
    detailImages: [],
    imageAlts: [
      "Rose onyx-effect large format porcelain bathroom with shower walls.",
      "Rose onyx-effect porcelain shower wall with niche detail.",
      "Large format 1600x3200 porcelain tiles installed in rose onyx-effect bathroom.",
      "Large format porcelain bathroom tiling across two bathrooms.",
      "Rose onyx-effect large format porcelain bathroom with continuous wall surfaces.",
    ],
    alt:
      "Rose onyx-effect large format porcelain bathroom with shower walls.",
    categories: ["bathrooms", "premium-tiling"],
    featured: true,
    material: "Rose onyx-effect porcelain slabs, 1600x3200 mm",
    category: "Large Format Porcelain Tiling Across Two Bathrooms",
    scope: "Large format porcelain bathroom tiling across two bathrooms",
    descriptor:
      "Large Format Porcelain Bathroom Tiling",
    summary:
      "Large format 1600x3200 rose onyx-effect porcelain tiles installed across two bathrooms, creating continuous wall, shower and feature surfaces with minimal grout lines.",
    metaTitle:
      "Rose Onyx Large Format Bathrooms | Artiling Studio",
    metaDescription:
      "Large format 1600x3200 rose onyx-effect porcelain tiling across two bathrooms, including shower walls, feature walls and continuous porcelain surfaces.",
    fullDescription:
      "Large format 1600x3200 rose onyx-effect porcelain tiles installed across two bathrooms, creating continuous shower walls, feature surfaces and a bold rose-toned bathroom finish.",
    projectSections: [
      {
        title: "Overview",
        body:
          "This project covered two bathrooms within the same property, using large format 1600x3200 rose onyx-effect porcelain tiles across the wall, shower and feature areas. The large slab format helped reduce grout lines and create a more continuous surface, allowing the rose-toned porcelain pattern to flow through the bathrooms with stronger visual depth.",
      },
      {
        title: "Large Format Porcelain Tiling",
        body:
          "The main work focused on the installation of 1600x3200 porcelain slabs across bathroom walls and shower areas. The large tile format creates a cleaner architectural finish with fewer joints and a stronger sense of material continuity.",
      },
      {
        title: "Shower & Feature Wall Areas",
        body:
          "The rose onyx-effect porcelain continues through the shower walls, niches and surrounding bathroom surfaces, giving both bathrooms a consistent and dramatic material identity.",
      },
      {
        title: "Result",
        body:
          "The result is a pair of bold rose-toned bathrooms with large format porcelain surfaces, minimal grout lines and a strong continuous stone-effect finish.",
      },
    ],
    features: [
      "Large Format Tiling",
      "1600x3200 Porcelain Slabs",
      "Rose Onyx Effect",
      "Porcelain Bathroom",
      "Shower Walls",
      "Feature Walls",
      "Minimal Grout Lines",
      "Niche Detailing",
    ],
    seoDescription:
      "Large format 1600x3200 rose onyx-effect porcelain tiles installed across two bathrooms, creating continuous wall, shower and feature surfaces with minimal grout lines.",
    details: {
      material: "Rose onyx-effect porcelain slabs, 1600x3200 mm",
      work: "Large format bathroom tiling, shower walls, feature wall areas",
      detail:
        "Bookmatch-style surface flow, minimal grout lines, niche and shower detailing",
    },
    serviceTags: [
      "Large Format Tiling",
      "Onyx Effect",
      "Porcelain Bathroom",
    ],
    keywords: [
      "rose onyx large format tiling London",
      "1600x3200 porcelain slabs bathroom",
      "large format porcelain bathroom tiling",
      "rose onyx-effect porcelain bathroom",
      "porcelain shower walls",
      "minimal grout porcelain bathroom",
    ],
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
    cover: "/projects/soft-stone-double-vanity/cover.png",
    coverImage: "/projects/soft-stone-double-vanity/cover.png",
    collage: "/projects/soft-stone-double-vanity/collage.png",
    galleryImages: [
      "/projects/soft-stone-double-vanity/gallery/gallery-01.png",
      "/projects/soft-stone-double-vanity/gallery/gallery-1.png",
      "/projects/soft-stone-double-vanity/gallery/gallery-2.png",
      "/projects/soft-stone-double-vanity/gallery/gallery-3.png",
      "/projects/soft-stone-double-vanity/gallery/gallery-4.png",
      "/projects/soft-stone-double-vanity/gallery/gallery-5.png",
    ],
    detailImages: [
      "/projects/soft-stone-double-vanity/details/detail-1.png",
    ],
    alt: "Soft Stone Double Vanity bespoke porcelain sink",
    categories: ["bathrooms", "vanity-details"],
    material: "Soft stone-effect porcelain",
    category: "Bespoke Porcelain Vanity",
    scope: "Bespoke Porcelain Vanity",
    descriptor: "Bespoke Porcelain Vanity",
    summary:
      "A calm double vanity crafted with soft stone tones, integrated sinks, and minimal architectural detailing.",
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
      "A darker spa-like bathroom direction defined by quiet luxury, integrated lighting, and a strong floating sink statement.",
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
    cover:
      "/projects/calacatta-gold-bespoke-bathroom/calacatta-gold-integrated-vanity-sink-london-bathroom.webp",
    coverImage:
      "/projects/calacatta-gold-bespoke-bathroom/calacatta-gold-integrated-vanity-sink-london-bathroom.webp",
    collage:
      "/projects/calacatta-gold-bespoke-bathroom/calacatta-gold-integrated-vanity-sink-london-bathroom.webp",
    galleryImages: [
      "/projects/calacatta-gold-bespoke-bathroom/calacatta-gold-porcelain-vanity-mirror-bathroom.webp",
      "/projects/calacatta-gold-bespoke-bathroom/calacatta-gold-double-basin-vanity-detail.webp",
      "/projects/calacatta-gold-bespoke-bathroom/calacatta-gold-wall-mounted-tap-basin-detail.webp",
      "/projects/calacatta-gold-bespoke-bathroom/calacatta-gold-bathroom-niche-toilet-detail.webp",
    ],
    detailImages: [],
    alt: "Calacatta Gold bespoke porcelain bathroom",
    categories: ["bathrooms", "bespoke-sinks", "premium-tiling"],
    featured: true,
    material: "Calacatta Gold porcelain",
    category: "Bespoke Porcelain Bathroom",
    scope: "Bespoke Porcelain Bathroom",
    descriptor: "Bespoke Porcelain Bathroom",
    summary:
      "A refined bathroom composition using Calacatta Gold porcelain, elegant veining, and seamless premium finishes.",
  },
] as const satisfies readonly PortfolioItem[];

export type PortfolioSlug = (typeof portfolioData)[number]["slug"];

export const homepageSelectedWorkSlugs = [
  "soft-stone-double-vanity",
  "calacatta-gold-bespoke-bathroom",
] as const satisfies readonly PortfolioSlug[];

export const projectsFeaturedSlugs = [
  "onyx-frame-porcelain-vanity",
  "rose-onyx-porcelain-sinks-large-format-bathroom-tiling",
  "soft-stone-double-vanity",
  "calacatta-gold-bespoke-bathroom",
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
