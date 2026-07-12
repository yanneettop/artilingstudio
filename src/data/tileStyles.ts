import { materials } from "./materials";

export type TileStyle = (typeof materials)[number];
export type TileStyleInspirationImage = NonNullable<TileStyle["inspirationImages"]>[number];
export type TileStyleFilterGroup = string;
export type TileStyleSinkSuitability = TileStyle["sinkSuitability"];

export const getTileStyleQuoteHref = (slug: string) =>
  `/quote/?style=${encodeURIComponent(slug)}`;

export const tileStyles = materials;
export type TileStyleSlug = (typeof tileStyles)[number]["slug"];

export const tileStyleCategories = [
  ...new Set(tileStyles.map((style) => style.categoryLabel)),
] as string[];

export const tileStylesBySlug: ReadonlyMap<string, TileStyle> = new Map(
  tileStyles.map((style) => [style.slug, style]),
);

export const getTileStyleBySlug = (slug: TileStyleSlug | string) =>
  tileStylesBySlug.get(slug);

export const getTileStylesByCategory = (category: string) =>
  tileStyles.filter((style) => style.categoryLabel === category);
