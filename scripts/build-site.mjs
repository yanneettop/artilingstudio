import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { transform } from "esbuild";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = path.join(projectRoot, "dist");

const rootFiles = [
  "404.html",
  "_headers",
  "_redirects",
  "android-chrome-192x192.png",
  "android-chrome-512x512.png",
  "apple-touch-icon.png",
  "artiling-favicon-transparent.png",
  "bimi-logo.svg",
  "favicon-16x16.png",
  "favicon-32x32.png",
  "favicon-48x48.png",
  "favicon.ico",
  "index.html",
  "llms.txt",
  "og-image-v2.jpg",
  "robots.txt",
  "site.webmanifest",
  "sitemap.xml",
];

const routeDirectories = [
  "bespoke-porcelain-sinks",
  "bespoke-sinks",
  "card",
  "contact",
  "large-format-tiling",
  "large-format-tiling-london",
  "microcement-alternative-london",
  "porcelain-fabrication-london",
  "portfolio",
  "privacy-policy",
  "projects",
  "quote",
  "services",
  "studio",
  "surfaces",
  "thank-you",
  "tile-style-library",
  "wet-rooms-bathroom-tiling",
];

async function copyIfPresent(relativePath) {
  const source = path.join(projectRoot, relativePath);
  try {
    await stat(source);
  } catch {
    return;
  }
  const destination = path.join(outputRoot, relativePath);
  await mkdir(path.dirname(destination), { recursive: true });
  await cp(source, destination, { recursive: true });
}

async function minifyTree(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  await Promise.all(entries.map(async (entry) => {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await minifyTree(target);
      return;
    }
    const extension = path.extname(entry.name).toLowerCase();
    if (extension !== ".css" && extension !== ".js") return;
    const source = await readFile(target, "utf8");
    const result = await transform(source, {
      loader: extension === ".css" ? "css" : "js",
      minify: true,
      legalComments: "none",
      target: "es2020",
    });
    await writeFile(target, result.code, "utf8");
  }));
}

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });
await Promise.all([
  ...rootFiles.map(copyIfPresent),
  ...routeDirectories.map(copyIfPresent),
  copyIfPresent("assets"),
  copyIfPresent("public"),
]);
await minifyTree(path.join(outputRoot, "assets"));

console.log("Production site built in dist/ with minified CSS and JavaScript.");
