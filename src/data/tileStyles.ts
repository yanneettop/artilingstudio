export type TileStyle = {
  title: string;
  slug: string;
  category: string;
  description: string;
  bestFor: string[];
  finishes: string[];
  colourFamily: string[];
  projectNameExamples: string[];
  seoKeywords: string[];
  image: string;
  alt: string;
  inspirationImages?: TileStyleInspirationImage[];
  quoteHref?: string;
  filterGroups: TileStyleFilterGroup[];
  sinkSuitability: TileStyleSinkSuitability;
  sinkSuitabilityLabel: string;
  recommendedUseShort: string;
};

export type TileStyleInspirationImage = {
  src: string;
  alt: string;
  title: string;
  type: string;
};

export type TileStyleFilterGroup =
  | "best-for-sinks"
  | "marble-onyx"
  | "stone-effect"
  | "decorative"
  | "outdoor";

export type TileStyleSinkSuitability = "great" | "possible" | "not-usually";

export const getTileStyleQuoteHref = (slug: string) =>
  `/quote/?style=${encodeURIComponent(slug)}`;

export const tileStyles = [
  {
    title: "Calacatta Marble Effect",
    slug: "calacatta-marble-effect",
    category: "Marble Effect Porcelain",
    description:
      "A bright white porcelain look with elegant grey or gold veining, often used for luxury bathrooms, feature walls and bespoke sinks.",
    bestFor: ["Bespoke sinks", "Feature walls", "Wet rooms", "Vanity tops"],
    finishes: ["Matt", "Polished"],
    colourFamily: ["White", "Grey", "Gold"],
    projectNameExamples: [
      "Calacatta Porcelain Sink",
      "Calacatta Gold Mitred Basin",
      "Bookmatched Calacatta Wet Room",
    ],
    seoKeywords: [
      "Calacatta porcelain",
      "marble effect porcelain",
      "Calacatta bathroom tiles",
      "porcelain sink London",
    ],
    image: "/images/tile-styles/calacatta-marble-effect.jpg",
    alt: "Calacatta marble effect porcelain tile sample with grey and subtle gold veining",
    quoteHref: getTileStyleQuoteHref("calacatta-marble-effect"),
    filterGroups: ["best-for-sinks", "marble-onyx"],
    sinkSuitability: "great",
    sinkSuitabilityLabel: "Great for bespoke sinks",
    recommendedUseShort: "Sinks, walls & vanities",
  },
  {
    title: "Nero Marquina Marble Effect",
    slug: "nero-marquina-marble-effect",
    category: "Marble Effect Porcelain",
    description:
      "A dramatic black marble-effect porcelain with white veining, ideal for bold feature walls, statement sinks and darker luxury bathrooms.",
    bestFor: ["Statement sinks", "Feature walls", "Shower walls", "Vanity areas"],
    finishes: ["Matt", "Polished"],
    colourFamily: ["Black", "White"],
    projectNameExamples: [
      "Nero Marquina Porcelain Basin",
      "Black Marble Effect Feature Wall",
      "Nero Porcelain Vanity",
    ],
    seoKeywords: [
      "Nero Marquina porcelain",
      "black marble effect tiles",
      "black porcelain bathroom",
      "luxury porcelain sink",
    ],
    image: "/images/tile-styles/nero-marquina-marble-effect.jpg",
    alt: "Nero Marquina marble effect porcelain tile sample with white veining",
    quoteHref: getTileStyleQuoteHref("nero-marquina-marble-effect"),
    filterGroups: ["best-for-sinks", "marble-onyx"],
    sinkSuitability: "great",
    sinkSuitabilityLabel: "Great for bespoke sinks",
    recommendedUseShort: "Statement sinks & walls",
  },
  {
    title: "Green Onyx Effect",
    slug: "green-onyx-effect",
    category: "Onyx Effect Porcelain",
    description:
      "A gemstone-inspired porcelain look with green, blue and cloudy translucent-style veining, perfect for statement sinks and feature surfaces.",
    bestFor: ["Statement sinks", "Feature walls", "Vanity tops", "Luxury bathrooms"],
    finishes: ["Matt", "Polished", "Gloss"],
    colourFamily: ["Green", "Blue", "White"],
    projectNameExamples: [
      "Gemstone Green Onyx Porcelain Sink",
      "Green Onyx Feature Wall",
      "Jade Onyx Mitred Basin",
    ],
    seoKeywords: [
      "green onyx porcelain",
      "onyx effect porcelain",
      "green porcelain sink",
      "statement bathroom tiles",
    ],
    image: "/images/tile-styles/green-onyx-effect.jpg",
    alt: "Green onyx effect porcelain tile sample with soft green veining",
    inspirationImages: [
      {
        src: "/images/tile-styles/inspiration/green-onyx-bespoke-porcelain-sink-preview.jpg",
        alt: "Green onyx effect bespoke porcelain sink with mitred edges and black wall mounted tap",
        title: "Bespoke porcelain sink",
        type: "Bespoke sink",
      },
      {
        src: "/images/tile-styles/inspiration/green-onyx-porcelain-bathroom-sink-shower-preview.jpg",
        alt: "Green onyx effect porcelain bathroom with bespoke sink and walk in shower",
        title: "Bathroom sink and shower concept",
        type: "Bathroom concept",
      },
      {
        src: "/images/tile-styles/inspiration/green-onyx-porcelain-wet-room-feature-wall-preview.jpg",
        alt: "Green onyx effect porcelain wet room with feature shower wall and niche",
        title: "Wet room feature wall",
        type: "Wet room",
      },
    ],
    quoteHref: getTileStyleQuoteHref("green-onyx-effect"),
    filterGroups: ["best-for-sinks", "marble-onyx"],
    sinkSuitability: "great",
    sinkSuitabilityLabel: "Great for bespoke sinks",
    recommendedUseShort: "Statement sinks & features",
  },
  {
    title: "Blue Onyx Effect",
    slug: "blue-onyx-effect",
    category: "Onyx Effect Porcelain",
    description:
      "A cool blue-toned onyx-effect porcelain with soft movement and stone-like depth, suited to calm but distinctive bathroom designs.",
    bestFor: ["Feature walls", "Bespoke sinks", "Shower walls", "Vanity tops"],
    finishes: ["Matt", "Polished", "Gloss"],
    colourFamily: ["Blue", "Grey", "White"],
    projectNameExamples: [
      "Blue Onyx Porcelain Sink",
      "Ocean Onyx Feature Bathroom",
      "Blue Stone Effect Vanity",
    ],
    seoKeywords: [
      "blue onyx porcelain",
      "blue marble effect tiles",
      "onyx effect bathroom tiles",
      "bespoke porcelain sink",
    ],
    image: "/images/tile-styles/blue-onyx-effect.jpg",
    alt: "Blue onyx effect porcelain tile sample with pale blue translucent veining",
    quoteHref: getTileStyleQuoteHref("blue-onyx-effect"),
    filterGroups: ["best-for-sinks", "marble-onyx"],
    sinkSuitability: "great",
    sinkSuitabilityLabel: "Great for bespoke sinks",
    recommendedUseShort: "Sinks, walls & vanities",
  },
  {
    title: "Travertine Effect",
    slug: "travertine-effect",
    category: "Stone Effect Porcelain",
    description:
      "A warm beige stone-effect porcelain inspired by travertine, often chosen for calm spa-style bathrooms and soft neutral interiors.",
    bestFor: ["Wet rooms", "Bathroom floors", "Feature walls", "Bespoke sinks"],
    finishes: ["Matt", "Honed", "Textured"],
    colourFamily: ["Beige", "Ivory", "Warm neutral"],
    projectNameExamples: [
      "Travertine Effect Porcelain Bathroom",
      "Warm Travertine Mitred Sink",
      "Ivory Travertine Wet Room",
    ],
    seoKeywords: [
      "travertine effect porcelain",
      "travertine bathroom tiles",
      "stone effect porcelain",
      "spa bathroom tiles",
    ],
    image: "/images/tile-styles/travertine-effect.jpg",
    alt: "Travertine effect porcelain tile sample with warm beige linear stone texture",
    quoteHref: getTileStyleQuoteHref("travertine-effect"),
    filterGroups: ["best-for-sinks", "stone-effect"],
    sinkSuitability: "great",
    sinkSuitabilityLabel: "Great for bespoke sinks",
    recommendedUseShort: "Warm spa-style bathrooms",
  },
  {
    title: "Limestone Effect",
    slug: "limestone-effect",
    category: "Stone Effect Porcelain",
    description:
      "A soft natural stone look with quiet movement and neutral tones, useful for timeless bathrooms, floors and understated surfaces.",
    bestFor: ["Bathroom floors", "Wet rooms", "Walls", "Minimal interiors"],
    finishes: ["Matt", "Honed", "Textured"],
    colourFamily: ["Ivory", "Beige", "Grey"],
    projectNameExamples: [
      "Limestone Effect Ensuite",
      "Ivory Limestone Porcelain Floor",
      "Soft Stone Wet Room",
    ],
    seoKeywords: [
      "limestone effect porcelain",
      "limestone bathroom tiles",
      "neutral stone effect tiles",
      "porcelain floor tiles",
    ],
    image: "/images/tile-styles/limestone-effect.jpg",
    alt: "Limestone effect porcelain tile sample with soft greige stone texture",
    quoteHref: getTileStyleQuoteHref("limestone-effect"),
    filterGroups: ["best-for-sinks", "stone-effect"],
    sinkSuitability: "great",
    sinkSuitabilityLabel: "Great for bespoke sinks",
    recommendedUseShort: "Calm neutral bathrooms",
  },
  {
    title: "Concrete / Microcement Effect",
    slug: "concrete-microcement-effect",
    category: "Concrete Effect Porcelain",
    description:
      "A smooth industrial-inspired porcelain look that gives bathrooms and wet rooms a seamless, minimal and contemporary feel.",
    bestFor: ["Wet rooms", "Bathroom floors", "Modern walls", "Minimal interiors"],
    finishes: ["Matt", "Textured", "Anti-slip"],
    colourFamily: ["Grey", "Taupe", "Warm neutral"],
    projectNameExamples: [
      "Microcement Effect Wet Room",
      "Concrete Porcelain Bathroom",
      "Soft Grey Minimal Bathroom",
    ],
    seoKeywords: [
      "microcement effect porcelain",
      "concrete effect tiles",
      "grey porcelain bathroom tiles",
      "modern wet room tiles",
    ],
    image: "/images/tile-styles/concrete-microcement-effect.jpg",
    alt: "Concrete microcement effect porcelain tile sample with soft grey matte texture",
    quoteHref: getTileStyleQuoteHref("concrete-microcement-effect"),
    filterGroups: ["stone-effect"],
    sinkSuitability: "possible",
    sinkSuitabilityLabel: "Possible for minimal sinks",
    recommendedUseShort: "Minimal wet rooms",
  },
  {
    title: "Terrazzo",
    slug: "terrazzo",
    category: "Terrazzo / Speckled Surfaces",
    description:
      "A speckled surface with stone-chip character, often used for playful but premium bathrooms, floors and feature details.",
    bestFor: ["Bathroom floors", "Feature walls", "Vanity areas", "Shower floors"],
    finishes: ["Matt", "Polished", "Textured"],
    colourFamily: ["White", "Grey", "Beige", "Mixed"],
    projectNameExamples: [
      "Ivory Terrazzo Bathroom",
      "Grey Terrazzo Wet Room",
      "Speckled Porcelain Vanity",
    ],
    seoKeywords: [
      "terrazzo tiles",
      "terrazzo porcelain",
      "terrazzo bathroom tiles",
      "speckled porcelain tiles",
    ],
    image: "/images/tile-styles/terrazzo.jpg",
    alt: "Terrazzo effect porcelain tile sample with ivory base and grey beige stone chips",
    quoteHref: getTileStyleQuoteHref("terrazzo"),
    filterGroups: ["decorative"],
    sinkSuitability: "possible",
    sinkSuitabilityLabel: "Possible for selected sinks",
    recommendedUseShort: "Floors, details & vanities",
  },
  {
    title: "Zellige / Handmade Look",
    slug: "zellige-handmade-look",
    category: "Handmade Look Tiles",
    description:
      "Glossy characterful tiles with subtle variation, uneven reflections and a handcrafted feel, often used for feature walls and splashbacks.",
    bestFor: ["Feature walls", "Shower walls", "Splashbacks", "Decorative details"],
    finishes: ["Gloss", "Handmade look"],
    colourFamily: ["Green", "White", "Blue", "Terracotta"],
    projectNameExamples: [
      "Green Zellige Shower Wall",
      "Handmade Look Feature Bathroom",
      "Gloss Zellige Splashback",
    ],
    seoKeywords: [
      "zellige tiles",
      "handmade look tiles",
      "green zellige bathroom",
      "gloss wall tiles",
    ],
    image: "/images/tile-styles/zellige-handmade-look.jpg",
    alt: "Green zellige handmade look tile sample with glossy glazed finish",
    quoteHref: getTileStyleQuoteHref("zellige-handmade-look"),
    filterGroups: ["decorative"],
    sinkSuitability: "not-usually",
    sinkSuitabilityLabel: "Better for walls",
    recommendedUseShort: "Feature walls & splashbacks",
  },
  {
    title: "Mosaic Details",
    slug: "mosaic-details",
    category: "Mosaic Tiles",
    description:
      "Small-format tiles used for shower floors, niches, borders and detailed areas where grip, scale or decorative rhythm matters.",
    bestFor: ["Shower floors", "Niches", "Borders", "Feature details"],
    finishes: ["Matt", "Gloss", "Textured", "Anti-slip"],
    colourFamily: ["Mixed", "Stone", "Green", "White"],
    projectNameExamples: [
      "Mosaic Shower Floor",
      "Kit Kat Feature Niche",
      "Marble Mosaic Detail",
    ],
    seoKeywords: [
      "mosaic tiles",
      "shower floor mosaic",
      "kit kat tiles",
      "bathroom mosaic tiles",
    ],
    image: "/images/tile-styles/mosaic-details.jpg",
    alt: "Sage green square mosaic tile sample with light grout lines",
    quoteHref: getTileStyleQuoteHref("mosaic-details"),
    filterGroups: ["decorative"],
    sinkSuitability: "not-usually",
    sinkSuitabilityLabel: "Better for small details",
    recommendedUseShort: "Niches & shower floors",
  },
  {
    title: "Fluted / Ribbed Tiles",
    slug: "fluted-ribbed-tiles",
    category: "Textured Wall Tiles",
    description:
      "Linear textured tiles that add depth, shadow and architectural rhythm to feature walls, vanity areas and bathroom details.",
    bestFor: ["Feature walls", "Vanity areas", "Bathroom details", "Decorative surfaces"],
    finishes: ["Matt", "Gloss", "Textured"],
    colourFamily: ["White", "Ivory", "Grey", "Green"],
    projectNameExamples: [
      "Fluted Porcelain Feature Wall",
      "Ribbed Tile Vanity Detail",
      "Linear Textured Bathroom Wall",
    ],
    seoKeywords: [
      "fluted tiles",
      "ribbed wall tiles",
      "3D bathroom tiles",
      "textured porcelain tiles",
    ],
    image: "/images/tile-styles/fluted-ribbed-tiles.jpg",
    alt: "Ivory fluted ribbed porcelain tile sample with vertical textured lines",
    quoteHref: getTileStyleQuoteHref("fluted-ribbed-tiles"),
    filterGroups: ["decorative"],
    sinkSuitability: "possible",
    sinkSuitabilityLabel: "Possible for feature details",
    recommendedUseShort: "Feature walls & vanities",
  },
  {
    title: "Outdoor Anti-Slip Porcelain",
    slug: "outdoor-anti-slip-porcelain",
    category: "Outdoor Porcelain",
    description:
      "Durable grip-friendly porcelain designed for patios, steps, external floors and areas exposed to water or changing weather.",
    bestFor: ["Patios", "Steps", "Outdoor floors", "External tiling"],
    finishes: ["Textured", "Grip", "Anti-slip"],
    colourFamily: ["Grey", "Beige", "Stone", "Concrete"],
    projectNameExamples: [
      "Outdoor Stone Effect Porcelain",
      "Anti-Slip Porcelain Patio",
      "External Porcelain Steps",
    ],
    seoKeywords: [
      "outdoor porcelain tiles",
      "anti slip porcelain tiles",
      "porcelain patio tiles",
      "external porcelain tiling London",
    ],
    image: "/images/tile-styles/outdoor-anti-slip-porcelain.jpg",
    alt: "Outdoor anti-slip porcelain tile sample with textured warm grey beige stone surface",
    quoteHref: getTileStyleQuoteHref("outdoor-anti-slip-porcelain"),
    filterGroups: ["stone-effect", "outdoor"],
    sinkSuitability: "not-usually",
    sinkSuitabilityLabel: "Better for outdoor floors",
    recommendedUseShort: "Patios, steps & exteriors",
  },
] as const satisfies readonly TileStyle[];

export type TileStyleSlug = (typeof tileStyles)[number]["slug"];

export const tileStyleCategories = [
  ...new Set(tileStyles.map((style) => style.category)),
] as string[];

export const tileStylesBySlug: ReadonlyMap<string, TileStyle> = new Map(
  tileStyles.map((style) => [style.slug, style]),
);

export const getTileStyleBySlug = (slug: TileStyleSlug | string) =>
  tileStylesBySlug.get(slug);

export const getTileStylesByCategory = (category: string) =>
  tileStyles.filter((style) => style.category === category);
