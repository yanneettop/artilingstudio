export type MaterialImage = {
  src: string;
  alt: string;
  caption: string;
  type?: string;
};

export type Material = {
  id: string;
  slug: string;
  title: string;
  collection: string;
  categoryLabel: string;
  subtitle: string;
  badge?: string;
  description: string;
  modalDescription?: string;
  colours: string[];
  applications: string[];
  finishes: string[];
  image: string;
  imageAlt: string;
  featured?: boolean;
  relatedMaterials?: string[];
  inspirationImages?: MaterialImage[];
  filterGroups: string[];
  sinkSuitability: "great" | "possible" | "not-usually";
  sinkSuitabilityLabel: string;
  recommendedUseShort: string;
};

const gallery = (slug: string) =>
  slug === "calacatta-gold"
    ? [
        { src: "/images/tile-styles/inspiration/calacatta-marble-bespoke-vanity.webp", alt: "Calacatta Gold marble-effect porcelain floating vanity with integrated basin and mitred edges", caption: "Bespoke marble-effect vanity" },
        { src: "/images/tile-styles/inspiration/calacatta-marble-feature-wall.webp", alt: "Calacatta Gold marble-effect porcelain feature wall with freestanding bath", caption: "Large-format feature wall" },
        { src: "/images/tile-styles/inspiration/calacatta-marble-detail-niche.webp", alt: "Calacatta Gold marble-effect porcelain shower niche and vanity detail", caption: "Mitred niche and vanity detail" },
      ]
    : slug === "calacatta-macchia"
      ? [
          { src: "/images/tile-styles/inspiration/calacatta-macchia-bespoke-vanity.webp", alt: "Calacatta Macchia marble-effect porcelain wall-mounted vanity with integrated basin and mitred edges", caption: "Sculptural bespoke vanity" },
          { src: "/images/tile-styles/inspiration/calacatta-macchia-bookmatch-bathroom.webp", alt: "Bookmatched Calacatta Macchia marble-effect porcelain feature wall behind a dark sculptural bath", caption: "Bookmatched statement wall" },
          { src: "/images/tile-styles/inspiration/calacatta-macchia-mitred-niche-detail.webp", alt: "Calacatta Macchia marble-effect porcelain mitred shower return and recessed niche detail", caption: "Mitred niche craftsmanship" },
        ]
      : slug === "statuario"
        ? [
            { src: "/images/tile-styles/inspiration/statuario-cantilevered-trough-sink.webp", alt: "Statuario marble-effect porcelain cantilevered trough sink with cool grey veining", caption: "Cantilevered trough sink" },
            { src: "/images/tile-styles/inspiration/statuario-sunken-wet-room.webp", alt: "Sunken wet room clad in large-format Statuario marble-effect porcelain", caption: "Sunken porcelain wet room" },
            { src: "/images/tile-styles/inspiration/statuario-floating-shelf-detail.webp", alt: "Floating Statuario porcelain shelf with mitred edge and concealed lighting detail", caption: "Floating shelf junction" },
          ]
        : slug === "arabescato"
          ? [
              { src: "/images/tile-styles/inspiration/arabescato-pedestal-basin.webp", alt: "Wall-mounted Arabescato marble-effect porcelain linear sink with mitred apron and twin wall taps", caption: "Bespoke linear porcelain sink" },
              { src: "/images/tile-styles/inspiration/arabescato-arched-shower.webp", alt: "Arched walk-through shower portal clad in Arabescato marble-effect porcelain", caption: "Arched porcelain shower" },
              { src: "/images/tile-styles/inspiration/arabescato-stepped-bench-detail.webp", alt: "Arabescato porcelain stepped plinth and integrated bench with matched veining", caption: "Stepped bench fabrication" },
            ]
          : slug === "invisible-white"
            ? [
                { src: "/images/tile-styles/inspiration/invisible-white-linear-sink.webp", alt: "Wall-mounted Invisible White porcelain linear sink with mitred apron and twin wall taps", caption: "Bespoke linear porcelain sink" },
                { src: "/images/tile-styles/inspiration/invisible-white-corner-wet-room.webp", alt: "Sloped-roof wet room clad in large-format Invisible White porcelain slabs", caption: "Architectural corner wet room" },
                { src: "/images/tile-styles/inspiration/invisible-white-waterfall-detail.webp", alt: "Invisible White porcelain waterfall vanity end with mitred corner and recessed drawer", caption: "Waterfall vanity junction" },
              ]
            : slug === "breccia-capraia"
              ? [
                  { src: "/images/tile-styles/inspiration/breccia-capraia-linear-sink.webp", alt: "Wall-mounted Breccia Capraia porcelain linear sink with burgundy veining and twin wall taps", caption: "Bespoke statement sink" },
                  { src: "/images/tile-styles/inspiration/breccia-capraia-shower-divider.webp", alt: "Freestanding shower divider clad in bookmatched Breccia Capraia porcelain", caption: "Sculptural shower divider" },
                  { src: "/images/tile-styles/inspiration/breccia-capraia-mitred-detail.webp", alt: "Breccia Capraia porcelain sink corner with continuous burgundy vein across mitred edges", caption: "Vein-wrapped mitred corner" },
                ]
            : slug === "lux-viola"
              ? [
                  { src: "/images/tile-styles/inspiration/lux-viola-bespoke-sink.webp", alt: "Wall-mounted Lux Viola marble-effect porcelain sink with integrated basin and brushed bronze wall tap", caption: "Bespoke Lux Viola sink" },
                  { src: "/images/tile-styles/inspiration/lux-viola-large-format-bathroom.webp", alt: "Bathroom with large-format Lux Viola porcelain across the walk-in shower wall and floating vanity", caption: "Large-format shower bathroom" },
                  { src: "/images/tile-styles/inspiration/lux-viola-mitred-detail.webp", alt: "Close view of a Lux Viola porcelain sink with brecciated pattern continuing across a precise mitred corner", caption: "Breccia-wrapped mitred edge" },
                ]
              : slug === "fior-di-bosco"
                ? [
                    { src: "/images/tile-styles/inspiration/fior-di-bosco-compact-sink.webp", alt: "Compact wall-mounted Fior di Bosco porcelain sink with mitred apron and bronze wall tap", caption: "Compact bespoke sink" },
                    { src: "/images/tile-styles/inspiration/fior-di-bosco-curved-wall.webp", alt: "Bathroom walls, floor and bath surround installed in large-format Fior di Bosco porcelain slabs", caption: "Large-format bathroom installation" },
                    { src: "/images/tile-styles/inspiration/fior-di-bosco-drawer-detail.webp", alt: "Fior di Bosco porcelain vanity drawer with shadow gap and aligned amber vein", caption: "Mitred drawer detail" },
                  ]
                : slug === "sahara-noir"
                  ? [
                      { src: "/images/tile-styles/inspiration/sahara-noir-linear-sink.webp", alt: "Wall-mounted Sahara Noir porcelain linear sink with white and gold veining", caption: "Bespoke black porcelain sink" },
                      { src: "/images/tile-styles/inspiration/sahara-noir-large-format-bathroom.webp", alt: "Bathroom clad in large-format Sahara Noir porcelain across walls, floor and bath surround", caption: "Large-format noir bathroom" },
                      { src: "/images/tile-styles/inspiration/sahara-noir-niche-detail.webp", alt: "Sahara Noir porcelain shower niche and mitred corner with aligned white and gold veins", caption: "Vein-aligned niche detail" },
                    ]
                    : slug === "patagonia"
                      ? [
                          { src: "/images/tile-styles/inspiration/patagonia-linear-sink.webp", alt: "Wall-mounted Patagonia porcelain linear sink with ivory crystal, amber and charcoal pattern", caption: "Bespoke crystalline sink" },
                          { src: "/images/tile-styles/inspiration/patagonia-large-format-bathroom.webp", alt: "Bathroom with large-format bookmatched Patagonia porcelain shower wall and bath surround", caption: "Large-format Patagonia bathroom" },
                          { src: "/images/tile-styles/inspiration/patagonia-mitred-crystal-detail.webp", alt: "Patagonia porcelain mitred sink corner with amber crystal and charcoal pattern continuity", caption: "Crystal-wrapped mitred edge" },
                        ]
                    : slug === "antique-black"
                      ? [
                          { src: "/images/tile-styles/inspiration/antique-black-bespoke-vanity.webp", alt: "Wall-mounted Antique Black gemstone-effect porcelain vanity with integrated basin and brushed bronze wall tap", caption: "Bespoke gemstone-effect vanity" },
                          { src: "/images/tile-styles/inspiration/antique-black-large-format-bathroom.webp", alt: "Bathroom with a bookmatched large-format Antique Black porcelain shower wall and floating vanity", caption: "Large-format statement bathroom" },
                          { src: "/images/tile-styles/inspiration/antique-black-mitred-detail.webp", alt: "Close view of an Antique Black porcelain vanity corner with continuous pattern across a precise mitred edge", caption: "Pattern-wrapped mitred edge" },
                        ]
                    : slug === "silver-travertine"
                      ? [
                          { src: "/images/tile-styles/inspiration/silver-travertine-sink.webp", alt: "Wall-mounted Silver Travertine porcelain sink with horizontal vein-cut banding", caption: "Bespoke silver travertine sink" },
                          { src: "/images/tile-styles/inspiration/silver-travertine-bathroom.webp", alt: "Bathroom clad in large-format Silver Travertine porcelain across walls, floor and bath surround", caption: "Large-format travertine bathroom" },
                          { src: "/images/tile-styles/inspiration/silver-travertine-mitred-detail.webp", alt: "Silver Travertine porcelain mitred sink corner with continuous horizontal bands", caption: "Vein-aligned mitred detail" },
                        ]
                      : slug === "ivory-limestone"
                        ? [
                            { src: "/images/tile-styles/inspiration/ivory-limestone-sink.webp", alt: "Wall-mounted Ivory Limestone porcelain sink with quiet fossil-like texture", caption: "Bespoke ivory limestone sink" },
                            { src: "/images/tile-styles/inspiration/ivory-limestone-bathroom.webp", alt: "Bathroom clad in large-format Ivory Limestone porcelain across wet room, floor and bath surround", caption: "Large-format limestone bathroom" },
                            { src: "/images/tile-styles/inspiration/ivory-limestone-mitred-detail.webp", alt: "Ivory Limestone porcelain sink corner with precise mitred fabrication", caption: "Quiet mitred edge detail" },
                          ]
                        : slug === "pietra-grey"
                          ? [
                              { src: "/images/tile-styles/inspiration/pietra-grey-linear-sink.webp", alt: "Wall-mounted Pietra Grey porcelain linear sink with sparse white veining", caption: "Bespoke Pietra Grey sink" },
                              { src: "/images/tile-styles/inspiration/pietra-grey-bathroom.webp", alt: "Bathroom clad in large-format Pietra Grey porcelain across shower, walls, floor and bath surround", caption: "Large-format dark bathroom" },
                              { src: "/images/tile-styles/inspiration/pietra-grey-mitred-detail.webp", alt: "Pietra Grey porcelain sink corner with white vein continuing across a mitred edge", caption: "Vein-wrapped mitred corner" },
                            ]
      : slug === "nero-marquina"
      ? [
          { src: "/images/tile-styles/inspiration/nero-marquina-bespoke-vanity.webp", alt: "Nero Marquina marble-effect porcelain floating vanity with white veining and mitred edges", caption: "Bespoke dark marble vanity" },
          { src: "/images/tile-styles/inspiration/nero-marquina-feature-wall.webp", alt: "Nero Marquina marble-effect porcelain feature wall behind a freestanding bath", caption: "Statement feature wall" },
          { src: "/images/tile-styles/inspiration/nero-marquina-detail-niche.webp", alt: "Nero Marquina marble-effect porcelain shower niche and vanity detail", caption: "Mitred niche detail" },
        ]
      : slug === "green-onyx"
        ? [
            { src: "/images/tile-styles/inspiration/green-onyx-bespoke-porcelain-sink-preview.webp", alt: "Green Onyx onyx-effect porcelain bespoke sink with mitred edges and black wall mounted tap", caption: "Bespoke porcelain sink" },
            { src: "/images/tile-styles/inspiration/green-onyx-porcelain-bathroom-sink-shower-preview.webp", alt: "Green Onyx onyx-effect porcelain bathroom with bespoke sink and walk-in shower", caption: "Bathroom sink and shower concept" },
            { src: "/images/tile-styles/inspiration/green-onyx-porcelain-wet-room-feature-wall-preview.webp", alt: "Green Onyx onyx-effect porcelain wet room with feature shower wall and niche", caption: "Wet room feature wall" },
          ]
        : slug === "blue-onyx"
          ? [
              { src: "/images/tile-styles/inspiration/blue-onyx-bespoke-vanity.webp", alt: "Blue Onyx onyx-effect porcelain floating vanity with integrated basin and mitred edges", caption: "Bespoke blue onyx-effect vanity" },
              { src: "/images/tile-styles/inspiration/blue-onyx-feature-wall.webp", alt: "Blue Onyx onyx-effect porcelain feature wall behind a freestanding bath", caption: "Calm statement feature wall" },
              { src: "/images/tile-styles/inspiration/blue-onyx-detail-niche.webp", alt: "Blue Onyx onyx-effect porcelain shower niche and vanity detail", caption: "Mitred niche detail" },
            ]
          : slug === "classic-travertine"
            ? [
                { src: "/images/tile-styles/inspiration/travertine-material-vanity.webp", alt: "Classic Travertine travertine-inspired porcelain floating vanity with integrated basin and mitred edges", caption: "Material-led floating vanity" },
                { src: "/images/tile-styles/inspiration/travertine-curved-wet-room.webp", alt: "Classic Travertine travertine-inspired porcelain curved wet room with integrated bench", caption: "Curved wet-room architecture" },
                { src: "/images/tile-styles/inspiration/travertine-outdoor-terrace.webp", alt: "Classic Travertine travertine-inspired porcelain outdoor terrace with large-format slabs", caption: "Outdoor terrace and steps" },
              ]
            : undefined;

const material = (
  record: Omit<Material, "inspirationImages"> & { inspirationImages?: MaterialImage[] },
): Material => ({ ...record, inspirationImages: record.inspirationImages ?? gallery(record.slug) });

const materialRecords: readonly Material[] = [
  material({
    id: "calacatta-gold", slug: "calacatta-gold", title: "Calacatta Gold", collection: "Marble Effect", categoryLabel: "Marble Effect Porcelain", subtitle: "Warm Refined Marble", badge: "Great for Bespoke Sinks",
    description: "A refined marble-effect porcelain with a bright white ground, warm grey movement and delicate gold veining, suited to bespoke sinks, vanity units and quietly luxurious bathrooms.",
    colours: ["White", "Warm Grey", "Gold"], applications: ["Bespoke Sinks", "Vanity Units", "Feature Walls", "Bathrooms"], finishes: ["Matt", "Polished"], image: "/images/materials/calacatta-gold.webp", imageAlt: "Calacatta Gold marble-effect porcelain surface with warm grey and gold veining", featured: true, relatedMaterials: ["calacatta-macchia", "statuario"], filterGroups: ["best-for-sinks", "marble-onyx"], sinkSuitability: "great", sinkSuitabilityLabel: "Great for bespoke sinks", recommendedUseShort: "Sinks, walls & vanities",
  }),
  material({
    id: "calacatta-macchia", slug: "calacatta-macchia", title: "Calacatta Macchia", collection: "Marble Effect", categoryLabel: "Marble Effect Porcelain", subtitle: "Bold Luxury Bathrooms", badge: "Great for Bespoke Sinks",
    description: "A dramatic white marble-effect porcelain with bold charcoal veining and subtle warm gold accents, suited to statement bathrooms, bespoke sinks and sculptural vanity units.",
    colours: ["White", "Charcoal Grey", "Soft Gold"], applications: ["Bespoke Sinks", "Vanity Units", "Feature Walls", "Shower Panels", "Bathrooms"], finishes: ["Matt", "Polished"], image: "/images/materials/calacatta-macchia-marble-effect-porcelain-slab.webp", imageAlt: "Calacatta Macchia marble-effect porcelain slab with charcoal grey and warm gold veining", relatedMaterials: ["calacatta-gold", "arabescato", "breccia-capraia", "statuario"], filterGroups: ["best-for-sinks", "marble-onyx"], sinkSuitability: "great", sinkSuitabilityLabel: "Great for bespoke sinks", recommendedUseShort: "Statement sinks & bathrooms",
  }),
  material({
    id: "statuario", slug: "statuario", title: "Statuario", collection: "Marble Effect", categoryLabel: "Marble Effect Porcelain", subtitle: "Clean Architectural Marble",
    description: "A bright white marble-effect porcelain with refined cool-grey veining, offering a crisp architectural look for bespoke sinks, vanity units and calm contemporary bathrooms.",
    colours: ["White", "Cool Grey"], applications: ["Bespoke Sinks", "Vanity Units", "Bathrooms", "Feature Walls", "Shower Panels"], finishes: ["Matt", "Polished"], image: "/images/materials/statuario-marble-effect-porcelain-slab.webp", imageAlt: "Statuario marble-effect porcelain slab with a bright white base and cool grey veining", relatedMaterials: ["invisible-white", "arabescato", "calacatta-gold", "calacatta-macchia"], filterGroups: ["best-for-sinks", "marble-onyx"], sinkSuitability: "great", sinkSuitabilityLabel: "Great for bespoke sinks", recommendedUseShort: "Bathrooms, walls & sinks",
  }),
  material({
    id: "arabescato", slug: "arabescato", title: "Arabescato", collection: "Marble Effect", categoryLabel: "Marble Effect Porcelain", subtitle: "Expressive Italian Character",
    description: "An expressive white marble-effect porcelain with layered grey veining and delicate warm undertones, ideal for characterful sinks, feature walls and refined vanity installations.",
    colours: ["White", "Grey", "Charcoal", "Warm Beige"], applications: ["Bespoke Sinks", "Vanity Units", "Feature Walls", "Bathrooms"], finishes: ["Matt", "Polished"], image: "/images/materials/arabescato-marble-effect-porcelain-slab.webp", imageAlt: "Arabescato marble-effect porcelain slab with layered grey veining on a white base", relatedMaterials: ["statuario", "invisible-white", "calacatta-macchia", "breccia-capraia"], filterGroups: ["best-for-sinks", "marble-onyx"], sinkSuitability: "great", sinkSuitabilityLabel: "Great for bespoke sinks", recommendedUseShort: "Sinks, vanities & walls",
  }),
  material({
    id: "nero-marquina", slug: "nero-marquina", title: "Nero Marquina", collection: "Marble Effect", categoryLabel: "Marble Effect Porcelain", subtitle: "Dramatic Dark Marble", badge: "Great for Bespoke Sinks",
    description: "A dramatic black marble-effect porcelain crossed by clear white veining, giving bespoke sinks, vanity units and feature walls a strong architectural presence in darker bathrooms.",
    colours: ["Black", "White"], applications: ["Bespoke Sinks", "Vanity Units", "Feature Walls"], finishes: ["Matt", "Polished"], image: "/images/materials/nero-marquina.webp", imageAlt: "Nero Marquina black marble-effect porcelain surface with white veining", relatedMaterials: ["calacatta-macchia", "arabescato"], filterGroups: ["best-for-sinks", "marble-onyx"], sinkSuitability: "great", sinkSuitabilityLabel: "Great for bespoke sinks", recommendedUseShort: "Dark sinks, vanities & walls",
  }),
  material({
    id: "green-onyx", slug: "green-onyx", title: "Green Onyx", collection: "Onyx Effect", categoryLabel: "Onyx Effect Porcelain", subtitle: "Statement Green Surfaces", badge: "Great for Bespoke Sinks",
    description: "A richly veined onyx-effect porcelain with layered green movement and soft mineral depth, designed for statement bespoke sinks, feature walls, vanity units and expressive bathrooms.",
    colours: ["Green", "Blue", "White"], applications: ["Bespoke Sinks", "Vanity Units", "Feature Walls", "Bathrooms"], finishes: ["Matt", "Polished", "Gloss"], image: "/images/materials/green-onyx.webp", imageAlt: "Green Onyx onyx-effect porcelain surface with layered green movement", relatedMaterials: ["blue-onyx", "calacatta-macchia"], filterGroups: ["best-for-sinks", "marble-onyx"], sinkSuitability: "great", sinkSuitabilityLabel: "Great for bespoke sinks", recommendedUseShort: "Statement sinks & features",
  }),
  material({
    id: "blue-onyx", slug: "blue-onyx", title: "Blue Onyx", collection: "Onyx Effect", categoryLabel: "Onyx Effect Porcelain", subtitle: "Soft Blue Statement Stone", badge: "Great for Bespoke Sinks",
    description: "A softly expressive onyx-effect porcelain with cool blue movement and pale mineral veining, creating distinctive but composed surfaces for bespoke sinks, vanity units and feature walls.",
    colours: ["Blue", "Grey", "White"], applications: ["Bespoke Sinks", "Vanity Units", "Feature Walls", "Bathrooms"], finishes: ["Matt", "Polished", "Gloss"], image: "/images/materials/blue-onyx.webp", imageAlt: "Blue Onyx onyx-effect porcelain surface with pale blue mineral veining", relatedMaterials: ["green-onyx", "statuario"], filterGroups: ["best-for-sinks", "marble-onyx"], sinkSuitability: "great", sinkSuitabilityLabel: "Great for bespoke sinks", recommendedUseShort: "Calm sinks, walls & vanities",
  }),
  material({
    id: "classic-travertine", slug: "classic-travertine", title: "Classic Travertine", collection: "Travertine Effect", categoryLabel: "Travertine Effect Porcelain", subtitle: "Warm Spa-Style Bathrooms", badge: "Great for Bespoke Sinks",
    description: "A warm travertine-inspired porcelain with gentle beige variation and a relaxed stone character, suited to bespoke sinks, wet rooms, bathroom floors and feature walls.",
    colours: ["Beige", "Ivory", "Warm Neutral"], applications: ["Bespoke Sinks", "Wet Rooms", "Bathroom Floors", "Feature Walls"], finishes: ["Matt", "Honed"], image: "/images/materials/classic-travertine.webp", imageAlt: "Classic Travertine travertine-inspired porcelain surface in warm beige tones", featured: true, relatedMaterials: ["silver-travertine", "ivory-limestone"], filterGroups: ["best-for-sinks", "stone-effect"], sinkSuitability: "great", sinkSuitabilityLabel: "Great for bespoke sinks", recommendedUseShort: "Warm spa-style bathrooms",
  }),
  material({
    id: "silver-travertine", slug: "silver-travertine", title: "Silver Travertine", collection: "Travertine Effect", categoryLabel: "Travertine Effect Porcelain", subtitle: "Calm Contemporary Stone",
    description: "A silver-toned travertine-inspired porcelain with restrained movement and cool neutral depth, bringing a calm contemporary finish to bathrooms, wet rooms, floors and walls.",
    colours: ["Silver Grey", "Ivory", "Taupe"], applications: ["Bathrooms", "Wet Rooms", "Bathroom Floors", "Feature Walls"], finishes: ["Matt", "Honed"], image: "/images/materials/silver-travertine.webp", imageAlt: "Silver Travertine travertine-inspired porcelain surface with cool neutral movement", relatedMaterials: ["classic-travertine", "pietra-grey"], filterGroups: ["stone-effect"], sinkSuitability: "possible", sinkSuitabilityLabel: "Suitable for selected sinks", recommendedUseShort: "Calm floors, walls & wet rooms",
  }),
  material({
    id: "ivory-limestone", slug: "ivory-limestone", title: "Ivory Limestone", collection: "Limestone Effect", categoryLabel: "Limestone Effect Porcelain", subtitle: "Soft Minimal Interiors",
    description: "A soft limestone-effect porcelain in quiet ivory and beige tones, providing a restrained surface language for minimal bathrooms, wet rooms, floors and understated feature walls.",
    colours: ["Ivory", "Beige", "Soft Grey"], applications: ["Bathrooms", "Wet Rooms", "Bathroom Floors", "Feature Walls"], finishes: ["Matt", "Honed"], image: "/images/materials/ivory-limestone.webp", imageAlt: "Ivory Limestone limestone-effect porcelain surface with soft neutral movement", relatedMaterials: ["classic-travertine", "warm-concrete"], filterGroups: ["best-for-sinks", "stone-effect"], sinkSuitability: "great", sinkSuitabilityLabel: "Great for bespoke sinks", recommendedUseShort: "Soft minimal bathrooms",
  }),
  material({
    id: "pietra-grey", slug: "pietra-grey", title: "Pietra Grey", collection: "Stone Effect", categoryLabel: "Stone Effect Porcelain", subtitle: "Refined Dark Stone",
    description: "A deep stone-effect porcelain with a composed grey surface and subtle tonal variation, suited to refined bathrooms, vanity units, feature walls and carefully framed details.",
    colours: ["Charcoal", "Grey", "Soft White"], applications: ["Bathrooms", "Vanity Units", "Feature Walls", "Bespoke Sinks"], finishes: ["Matt", "Honed"], image: "/images/materials/pietra-grey.webp", imageAlt: "Pietra Grey stone-effect porcelain surface in refined dark grey tones", relatedMaterials: ["silver-travertine", "warm-concrete"], filterGroups: ["best-for-sinks", "stone-effect"], sinkSuitability: "possible", sinkSuitabilityLabel: "Suitable for selected sinks", recommendedUseShort: "Dark walls, vanities & sinks",
  }),
  material({
    id: "ceppo-di-gre", slug: "ceppo-di-gre", title: "Ceppo di GrÃ©", collection: "Stone Effect", categoryLabel: "Stone Effect Porcelain", subtitle: "Architectural Aggregate Stone",
    description: "An aggregate stone-effect porcelain with a distinctive pebbled visual rhythm, adding architectural texture to bathrooms, feature walls, vanity units and sculptural surface details.",
    colours: ["Grey", "Charcoal", "Warm Grey"], applications: ["Bathrooms", "Feature Walls", "Vanity Units", "Large-Format Installations"], finishes: ["Matt", "Honed"], image: "/images/materials/ceppo-di-gre.webp", imageAlt: "Ceppo di GrÃ© aggregate stone-effect porcelain surface with grey mineral pattern", relatedMaterials: ["pietra-grey", "terrazzo"], filterGroups: ["stone-effect", "decorative"], sinkSuitability: "possible", sinkSuitabilityLabel: "Suitable for selected sinks", recommendedUseShort: "Architectural walls & vanities",
  }),
  material({
    id: "warm-concrete", slug: "warm-concrete", title: "Warm Concrete", collection: "Concrete Effect", categoryLabel: "Concrete Effect Porcelain", subtitle: "Soft Contemporary Minimalism",
    description: "A warm concrete-effect porcelain with soft taupe-grey variation, offering a calm contemporary backdrop for wet rooms, floors, walls, vanity units and minimal bathrooms.",
    colours: ["Warm Grey", "Taupe", "Beige Grey"], applications: ["Wet Rooms", "Bathroom Floors", "Feature Walls", "Vanity Units"], finishes: ["Matt", "Textured"], image: "/images/materials/warm-concrete.webp", imageAlt: "Warm Concrete concrete-effect porcelain surface with soft taupe-grey variation", relatedMaterials: ["ivory-limestone", "pietra-grey"], filterGroups: ["stone-effect"], sinkSuitability: "possible", sinkSuitabilityLabel: "Suitable for selected sinks", recommendedUseShort: "Minimal wet rooms & walls",
  }),
  material({
    id: "terrazzo", slug: "terrazzo", title: "Terrazzo", collection: "Terrazzo", categoryLabel: "Terrazzo Effect Porcelain", subtitle: "Playful Mineral Texture",
    description: "A terrazzo-effect porcelain with a lively mineral pattern and balanced neutral base, bringing playful texture to bathroom floors, feature walls, vanity units and shower areas.",
    colours: ["White", "Grey", "Beige", "Mixed"], applications: ["Bathroom Floors", "Feature Walls", "Vanity Units", "Shower Areas"], finishes: ["Matt", "Polished", "Textured"], image: "/images/materials/terrazzo.webp", imageAlt: "Terrazzo-effect porcelain surface with ivory base and grey beige mineral chips", relatedMaterials: ["ceppo-di-gre", "zellige-green"], filterGroups: ["decorative"], sinkSuitability: "possible", sinkSuitabilityLabel: "Suitable for selected sinks", recommendedUseShort: "Floors, details & vanities",
  }),
  material({
    id: "zellige-green", slug: "zellige-green", title: "Zellige Green", collection: "Handmade Look", categoryLabel: "Handmade Look Tiles", subtitle: "Rich Glazed Character",
    description: "A green handmade-look porcelain with a rich glazed character and softly varied reflection, ideal for feature walls, shower panels, splashbacks and decorative bathroom details.",
    colours: ["Green", "Sage", "Deep Teal"], applications: ["Feature Walls", "Shower Panels", "Splashbacks", "Decorative Details"], finishes: ["Gloss", "Handmade Look"], image: "/images/materials/zellige-green.webp", imageAlt: "Zellige Green handmade-look porcelain surface with rich glazed variation", relatedMaterials: ["fluted-stone", "terrazzo"], filterGroups: ["decorative"], sinkSuitability: "not-usually", sinkSuitabilityLabel: "Better for walls", recommendedUseShort: "Feature walls & splashbacks",
  }),
  material({
    id: "fluted-stone", slug: "fluted-stone", title: "Fluted Stone", collection: "Textured Porcelain", categoryLabel: "Textured Porcelain", subtitle: "Sculptural Linear Texture",
    description: "A fluted stone-effect porcelain with repeating linear relief and measured shadow, adding sculptural texture to feature walls, vanity units and considered bathroom details.",
    colours: ["Ivory", "Warm Grey", "Stone"], applications: ["Feature Walls", "Vanity Units", "Bathroom Details", "Decorative Surfaces"], finishes: ["Matt", "Textured"], image: "/images/materials/fluted-stone.webp", imageAlt: "Fluted Stone textured porcelain surface with linear relief in warm neutral tones", relatedMaterials: ["zellige-green", "pietra-grey"], filterGroups: ["decorative"], sinkSuitability: "possible", sinkSuitabilityLabel: "Suitable for feature details", recommendedUseShort: "Feature walls & vanities",
  }),
  material({
    id: "invisible-white", slug: "invisible-white", title: "Invisible White", collection: "Marble Effect", categoryLabel: "Marble Effect Porcelain", subtitle: "Elegant Contemporary Marble", badge: "Great for Bespoke Sinks",
    description: "A refined white marble-effect porcelain with angular grey veining and a clean balanced composition, designed for elegant bespoke sinks, vanity units and contemporary bathroom surfaces.",
    colours: ["White", "Soft Grey"], applications: ["Bespoke Sinks", "Vanity Units", "Feature Walls", "Bathrooms", "Shower Panels"], finishes: ["Matt", "Polished"], image: "/images/materials/invisible-white-marble-effect-porcelain-slab.webp", imageAlt: "Invisible White marble-effect porcelain slab with angular soft grey veining", relatedMaterials: ["statuario", "arabescato", "calacatta-gold", "calacatta-macchia"], filterGroups: ["best-for-sinks", "marble-onyx"], sinkSuitability: "great", sinkSuitabilityLabel: "Great for bespoke sinks", recommendedUseShort: "Elegant sinks & bathrooms",
  }),
  material({
    id: "patagonia", slug: "patagonia", title: "Patagonia", collection: "Quartzite Effect", categoryLabel: "Quartzite-Effect Porcelain", subtitle: "Sculptural Crystal-Like Stone", badge: "Statement Surface",
    description: "A warm quartzite-effect porcelain combining ivory crystalline forms, amber mineral tones and small dark accents for striking vanity units, feature walls and statement bathroom details.",
    colours: ["Ivory", "Cream", "Amber", "Brown", "Black"], applications: ["Vanity Units", "Feature Walls", "Bespoke Sinks", "Bathroom Details"], finishes: ["Matt", "Polished"], image: "/images/materials/patagonia-quartzite-effect-porcelain-slab.webp", imageAlt: "Patagonia quartzite-effect porcelain slab with ivory crystal forms, amber tones and dark mineral accents", relatedMaterials: ["breccia-capraia", "calacatta-macchia", "fior-di-bosco", "sahara-noir"], filterGroups: ["stone-effect", "marble-onyx"], sinkSuitability: "possible", sinkSuitabilityLabel: "Suitable for selected sinks", recommendedUseShort: "Statement vanities & walls",
  }),
  material({
    id: "antique-black", slug: "antique-black", title: "Antique Black", collection: "Gemstone Effect", categoryLabel: "Gemstone Effect Porcelain", subtitle: "Sculptural Monochrome Pattern", badge: "Statement Surface",
    description: "A dramatic gemstone-effect porcelain combining fluid black, white and grey formations with subtle warm gold accents. Ideal for bold feature walls, vanity units and distinctive bathroom surfaces.",
    colours: ["Black", "White", "Grey", "Soft Gold"], applications: ["Feature Walls", "Vanity Units", "Bathroom Details", "Shower Panels"], finishes: ["Polished"], image: "/images/materials/antique-black-gemstone-effect-porcelain-slab.webp", imageAlt: "Antique Black gemstone-effect porcelain slab with swirling black, white, grey and soft gold pattern", relatedMaterials: ["sahara-noir", "nero-marquina", "patagonia", "breccia-capraia"], filterGroups: ["marble-onyx", "decorative"], sinkSuitability: "possible", sinkSuitabilityLabel: "Suitable for selected fabrication", recommendedUseShort: "Feature walls, vanities & details",
  }),
  material({
    id: "breccia-capraia", slug: "breccia-capraia", title: "Breccia Capraia", collection: "Marble Effect", categoryLabel: "Marble Effect Porcelain", subtitle: "Dramatic Artistic Veining", badge: "Statement Surface",
    description: "A highly expressive marble-effect porcelain with fragmented white forms, charcoal outlines and deep burgundy mineral bands, created for bold sinks, vanity units and feature installations.",
    colours: ["White", "Grey", "Charcoal", "Burgundy"], applications: ["Bespoke Sinks", "Vanity Units", "Feature Walls", "Bathroom Details"], finishes: ["Matt", "Polished"], image: "/images/materials/breccia-capraia-marble-effect-porcelain-slab.webp", imageAlt: "Breccia Capraia marble-effect porcelain slab with white fragments, charcoal veining and burgundy mineral bands", relatedMaterials: ["arabescato", "patagonia", "calacatta-macchia", "sahara-noir"], filterGroups: ["best-for-sinks", "marble-onyx"], sinkSuitability: "great", sinkSuitabilityLabel: "Great for bespoke sinks", recommendedUseShort: "Bold sinks, vanities & walls",
  }),
  material({
    id: "lux-viola", slug: "lux-viola", title: "Lux Viola", collection: "Marble Effect", categoryLabel: "Marble Effect Porcelain", subtitle: "Soft Brecciated Marble", badge: "Great for Bespoke Sinks",
    description: "A refined white marble-effect porcelain with fragmented grey veining and warm taupe mineral accents. Ideal for bespoke sinks, vanity units and elegant bathroom feature surfaces.",
    colours: ["White", "Grey", "Taupe", "Warm Beige"], applications: ["Bespoke Sinks", "Vanity Units", "Shower Walls", "Feature Walls", "Bathrooms"], finishes: ["Polished"], image: "/images/materials/lux-viola-marble-effect-porcelain-slab.webp", imageAlt: "Lux Viola marble-effect porcelain slab with white brecciated forms, grey veining and warm taupe accents", relatedMaterials: ["breccia-capraia", "arabescato", "calacatta-macchia", "invisible-white"], filterGroups: ["best-for-sinks", "marble-onyx"], sinkSuitability: "great", sinkSuitabilityLabel: "Great for bespoke sinks", recommendedUseShort: "Sinks, vanities & feature walls",
  }),
  material({
    id: "fior-di-bosco", slug: "fior-di-bosco", title: "Fior di Bosco", collection: "Marble Effect", categoryLabel: "Marble Effect Porcelain", subtitle: "Warm Architectural Grey", badge: "Calm Contemporary Choice",
    description: "A warm taupe-grey marble-effect porcelain with fine white veining and subtle earthy mineral notes, suited to sophisticated sinks, wet rooms and understated architectural interiors.",
    colours: ["Taupe Grey", "Warm Grey", "White", "Rust Brown"], applications: ["Bespoke Sinks", "Vanity Units", "Wet Rooms", "Floors", "Feature Walls"], finishes: ["Matt", "Honed", "Polished"], image: "/images/materials/fior-di-bosco-marble-effect-porcelain-slab.webp", imageAlt: "Fior di Bosco marble-effect porcelain slab with warm taupe grey colouring and fine white veins", relatedMaterials: ["pietra-grey", "silver-travertine", "patagonia", "sahara-noir"], filterGroups: ["best-for-sinks", "marble-onyx", "stone-effect"], sinkSuitability: "great", sinkSuitabilityLabel: "Great for bespoke sinks", recommendedUseShort: "Warm sinks, floors & wet rooms",
  }),
  material({
    id: "sahara-noir", slug: "sahara-noir", title: "Sahara Noir", collection: "Marble Effect", categoryLabel: "Marble Effect Porcelain", subtitle: "Graphic Black Statement Stone", badge: "Statement Surface",
    description: "A jet-black marble-effect porcelain crossed by precise white and warm gold veining, ideal for dramatic bespoke sinks, vanity units and high-contrast feature surfaces.",
    colours: ["Black", "White", "Gold", "Copper"], applications: ["Bespoke Sinks", "Vanity Units", "Feature Walls", "Bathroom Details"], finishes: ["Matt", "Polished"], image: "/images/materials/sahara-noir-marble-effect-porcelain-slab.webp", imageAlt: "Sahara Noir marble-effect porcelain slab with a black base and fine white and gold linear veining", relatedMaterials: ["nero-marquina", "breccia-capraia", "fior-di-bosco", "patagonia"], filterGroups: ["best-for-sinks", "marble-onyx"], sinkSuitability: "great", sinkSuitabilityLabel: "Great for bespoke sinks", recommendedUseShort: "Dramatic sinks & feature walls",
  }),
];

const collectionOrder = [
  "Marble Effect",
  "Quartzite Effect",
  "Gemstone Effect",
  "Onyx Effect",
  "Travertine Effect",
  "Limestone Effect",
  "Stone Effect",
  "Concrete Effect",
  "Terrazzo",
  "Handmade Look",
  "Textured Porcelain",
] as const;

const marbleEffectOrder = [
  "calacatta-gold",
  "calacatta-macchia",
  "statuario",
  "arabescato",
  "invisible-white",
  "breccia-capraia",
  "lux-viola",
  "fior-di-bosco",
  "nero-marquina",
  "sahara-noir",
] as const;

const collectionRank: ReadonlyMap<string, number> = new Map(collectionOrder.map((collection, index) => [collection, index]));
const marbleRank: ReadonlyMap<string, number> = new Map(marbleEffectOrder.map((slug, index) => [slug, index]));

export const materials: readonly Material[] = [...materialRecords].sort((a, b) => {
  const collectionDifference = (collectionRank.get(a.collection) ?? Number.MAX_SAFE_INTEGER) - (collectionRank.get(b.collection) ?? Number.MAX_SAFE_INTEGER);
  if (collectionDifference !== 0) return collectionDifference;
  if (a.collection === "Marble Effect") return (marbleRank.get(a.slug) ?? Number.MAX_SAFE_INTEGER) - (marbleRank.get(b.slug) ?? Number.MAX_SAFE_INTEGER);
  return 0;
});

export type MaterialSlug = string;
export const materialsBySlug: ReadonlyMap<string, Material> = new Map(materials.map((item) => [item.slug, item]));
export const getMaterialBySlug = (slug: MaterialSlug | string) => materialsBySlug.get(slug);
