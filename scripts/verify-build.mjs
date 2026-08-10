import { createReadStream } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { verifyHtmlAssetVersions } from "./asset-versioning.mjs";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = path.join(projectRoot, "dist");
const pagePaths = [
  "index.html",
  "bespoke-porcelain-sinks/index.html",
  "contact/index.html",
  "large-format-tiling-london/index.html",
  "microcement-alternative-london/index.html",
  "porcelain-fabrication-london/index.html",
  "privacy-policy/index.html",
  "projects/index.html",
  "quote/index.html",
  "services/index.html",
  "studio/index.html",
  "thank-you/index.html",
  "tile-style-library/index.html",
  "wet-rooms-bathroom-tiling/index.html",
];

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

for (const pagePath of pagePaths) {
  const html = await readFile(path.join(outputRoot, pagePath), "utf8");
  const h1Count = (html.match(/<h1\b/gi) || []).length;
  assert(h1Count === 1, `${pagePath} must contain exactly one h1 (found ${h1Count}).`);
  assert(!html.includes("data-page-loader"), `${pagePath} still includes the page loader.`);
  assert(!/<h4\b/i.test(html), `${pagePath} still includes an h4 footer label.`);
  assert(html.includes('class="skip-link"'), `${pagePath} is missing the skip link.`);
}

const headers = await readFile(path.join(outputRoot, "_headers"), "utf8");
for (const requiredHeader of [
  "Strict-Transport-Security: max-age=31536000; includeSubDomains",
  "X-Content-Type-Options: nosniff",
  "Referrer-Policy: strict-origin-when-cross-origin",
  "Permissions-Policy:",
  "X-Frame-Options: SAMEORIGIN",
  "Cache-Control: public, max-age=31536000, immutable",
]) {
  assert(headers.includes(requiredHeader), `_headers is missing ${requiredHeader}`);
}

const sourceCssSize = (await stat(path.join(projectRoot, "assets/css/styles.css"))).size;
const outputCssSize = (await stat(path.join(outputRoot, "assets/css/styles.css"))).size;
assert(outputCssSize < sourceCssSize, "Production CSS was not minified.");
const assetVersionSummary = await verifyHtmlAssetVersions(outputRoot);

const contentTypes = new Map([
  [".css", "text/css"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript"],
  [".txt", "text/plain; charset=utf-8"],
  [".xml", "application/xml; charset=utf-8"],
]);

const server = createServer(async (request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, "http://127.0.0.1").pathname);
  const relativePath = pathname === "/"
    ? "index.html"
    : pathname.endsWith("/")
      ? path.join(pathname.slice(1), "index.html")
      : pathname.slice(1);
  let filePath = path.join(outputRoot, relativePath);
  let status = 200;
  try {
    const fileStat = await stat(filePath);
    if (fileStat.isDirectory()) filePath = path.join(filePath, "index.html");
    await stat(filePath);
  } catch {
    filePath = path.join(outputRoot, "404.html");
    status = 404;
  }
  response.writeHead(status, {
    "Content-Type": contentTypes.get(path.extname(filePath).toLowerCase()) || "application/octet-stream",
  });
  createReadStream(filePath).pipe(response);
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const address = server.address();
const baseUrl = `http://127.0.0.1:${address.port}`;
try {
  for (const route of ["/", "/projects/", "/tile-style-library/", "/robots.txt", "/sitemap.xml"]) {
    const response = await fetch(`${baseUrl}${route}`);
    assert(response.status === 200, `${route} returned ${response.status}, expected 200.`);
  }
  const missingResponse = await fetch(`${baseUrl}/this-page-does-not-exist`);
  assert(missingResponse.status === 404, `Missing route returned ${missingResponse.status}, expected 404.`);
  assert((await missingResponse.text()).includes("This page could not"), "Custom 404 content was not served.");
} finally {
  await new Promise((resolve) => server.close(resolve));
}

console.log(
  `Verification passed. CSS: ${sourceCssSize} bytes source -> ${outputCssSize} bytes production; ${assetVersionSummary.referenceCount} asset versions verified.`,
);
