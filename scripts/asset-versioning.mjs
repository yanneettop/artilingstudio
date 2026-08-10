import { createHash } from "node:crypto";
import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const VERSION_LENGTH = 12;
const HTML_ASSET_ATTRIBUTE = /\b(?:href|src)=(['"])([^'"]+)\1/gi;

async function listFiles(directory, predicate) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nestedFiles = await Promise.all(entries.map(async (entry) => {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) return listFiles(target, predicate);
    return predicate(target) ? [target] : [];
  }));
  return nestedFiles.flat();
}

function contentHash(content) {
  return createHash("sha256").update(content).digest("hex").slice(0, VERSION_LENGTH);
}

function pathIsInside(candidate, directory) {
  const relative = path.relative(directory, candidate);
  return relative !== "" && !relative.startsWith("..") && !path.isAbsolute(relative);
}

function splitReference(reference) {
  const hashIndex = reference.indexOf("#");
  const fragment = hashIndex >= 0 ? reference.slice(hashIndex) : "";
  const withoutFragment = hashIndex >= 0 ? reference.slice(0, hashIndex) : reference;
  const queryIndex = withoutFragment.indexOf("?");
  return {
    pathname: queryIndex >= 0 ? withoutFragment.slice(0, queryIndex) : withoutFragment,
    query: queryIndex >= 0 ? withoutFragment.slice(queryIndex + 1) : "",
    fragment,
  };
}

function resolveAssetReference(reference, htmlPath, outputRoot) {
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(reference)) return null;

  const parts = splitReference(reference);
  let decodedPathname;
  try {
    decodedPathname = decodeURIComponent(parts.pathname);
  } catch {
    decodedPathname = parts.pathname;
  }

  const normalizedReference = decodedPathname.replaceAll("\\", "/");
  if (!/(?:^|\/)assets\/(?:css|js)\/.+\.(?:css|js)$/i.test(normalizedReference)) return null;

  const resolvedPath = normalizedReference.startsWith("/")
    ? path.resolve(outputRoot, `.${normalizedReference}`)
    : path.resolve(path.dirname(htmlPath), normalizedReference);

  if (!pathIsInside(resolvedPath, outputRoot)) {
    throw new Error(`${path.relative(outputRoot, htmlPath)} references an asset outside dist: ${reference}`);
  }

  return { ...parts, resolvedPath };
}

function withVersion(referenceParts, version) {
  const parameters = new URLSearchParams(referenceParts.query);
  parameters.set("v", version);
  return `${referenceParts.pathname}?${parameters.toString()}${referenceParts.fragment}`;
}

async function createAssetHashMap(outputRoot) {
  const assetRoot = path.join(outputRoot, "assets");
  const assetFiles = await listFiles(assetRoot, (filePath) => /\.(?:css|js)$/i.test(filePath));
  const entries = await Promise.all(assetFiles.map(async (filePath) => {
    const content = await readFile(filePath);
    return [path.resolve(filePath), contentHash(content)];
  }));
  return new Map(entries);
}

export async function fingerprintHtmlAssets(outputRoot) {
  const assetHashes = await createAssetHashMap(outputRoot);
  const htmlFiles = await listFiles(outputRoot, (filePath) => path.extname(filePath).toLowerCase() === ".html");
  let referenceCount = 0;
  let changedHtmlCount = 0;

  for (const htmlPath of htmlFiles) {
    const html = await readFile(htmlPath, "utf8");
    const rewritten = html.replace(HTML_ASSET_ATTRIBUTE, (attribute, quote, reference) => {
      const assetReference = resolveAssetReference(reference, htmlPath, outputRoot);
      if (!assetReference) return attribute;

      const version = assetHashes.get(path.resolve(assetReference.resolvedPath));
      if (!version) {
        throw new Error(`${path.relative(outputRoot, htmlPath)} references a missing production asset: ${reference}`);
      }

      referenceCount += 1;
      const versionedReference = withVersion(assetReference, version);
      return attribute.replace(reference, versionedReference);
    });

    if (rewritten !== html) {
      await writeFile(htmlPath, rewritten, "utf8");
      changedHtmlCount += 1;
    }
  }

  return {
    assetCount: assetHashes.size,
    htmlCount: htmlFiles.length,
    referenceCount,
    changedHtmlCount,
  };
}

export async function verifyHtmlAssetVersions(outputRoot) {
  const assetHashes = await createAssetHashMap(outputRoot);
  const htmlFiles = await listFiles(outputRoot, (filePath) => path.extname(filePath).toLowerCase() === ".html");
  let referenceCount = 0;

  for (const htmlPath of htmlFiles) {
    const html = await readFile(htmlPath, "utf8");
    for (const match of html.matchAll(HTML_ASSET_ATTRIBUTE)) {
      const reference = match[2];
      const assetReference = resolveAssetReference(reference, htmlPath, outputRoot);
      if (!assetReference) continue;

      const expectedVersion = assetHashes.get(path.resolve(assetReference.resolvedPath));
      if (!expectedVersion) {
        throw new Error(`${path.relative(outputRoot, htmlPath)} references a missing production asset: ${reference}`);
      }

      const actualVersion = new URLSearchParams(assetReference.query).get("v");
      if (actualVersion !== expectedVersion) {
        throw new Error(
          `${path.relative(outputRoot, htmlPath)} has stale asset version ${actualVersion || "<missing>"}; expected ${expectedVersion} for ${assetReference.pathname}.`,
        );
      }
      referenceCount += 1;
    }
  }

  if (referenceCount === 0) throw new Error("No local CSS or JavaScript references were found in production HTML.");
  return { assetCount: assetHashes.size, htmlCount: htmlFiles.length, referenceCount };
}
