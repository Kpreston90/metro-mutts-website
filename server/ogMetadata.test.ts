import { describe, expect, it } from "vitest";
import { getOgMetaForPath, injectOgMeta } from "./ogMetadata";

describe("getOgMetaForPath", () => {
  it("returns default metadata for homepage", () => {
    const meta = getOgMetaForPath("/");
    expect(meta.title).toContain("Metro Mutts");
    expect(meta.title).toContain("Tulsa");
  });

  it("returns vet-referred metadata for /vet-referred", () => {
    const meta = getOgMetaForPath("/vet-referred");
    expect(meta.title).toContain("Recommended by Your Vet");
    expect(meta.description).toContain("free trial day");
    expect(meta.image).toContain("vet-referred-hero");
    expect(meta.url).toContain("/vet-referred");
  });

  it("returns refer-specific metadata for /refer", () => {
    const meta = getOgMetaForPath("/refer");
    expect(meta.title).toContain("Refer a Friend");
    expect(meta.description).toContain("$15 off");
    expect(meta.image).toContain("og-refer");
    expect(meta.url).toContain("/refer");
  });

  it("returns services-specific metadata for /services", () => {
    const meta = getOgMetaForPath("/services");
    expect(meta.title).toContain("Services");
    expect(meta.image).toContain("services-hero");
  });

  it("returns daycare-specific metadata for /daycare", () => {
    const meta = getOgMetaForPath("/daycare");
    expect(meta.title).toContain("Daycare");
    expect(meta.title).toContain("FREE");
  });

  it("returns boarding-specific metadata for /boarding", () => {
    const meta = getOgMetaForPath("/boarding");
    expect(meta.title).toContain("Boarding");
    expect(meta.image).toContain("boarding");
  });

  it("returns grooming-specific metadata for /grooming", () => {
    const meta = getOgMetaForPath("/grooming");
    expect(meta.title).toContain("Grooming");
  });

  it("returns blog metadata for /blog/some-slug (prefix match)", () => {
    const meta = getOgMetaForPath("/blog/why-daycare-dogs-are-happier");
    expect(meta.title).toContain("Blog");
  });

  it("strips query params and hash before matching", () => {
    const meta = getOgMetaForPath("/refer?utm_source=email#top");
    expect(meta.title).toContain("Refer a Friend");
  });

  it("is case-insensitive", () => {
    const meta = getOgMetaForPath("/REFER");
    expect(meta.title).toContain("Refer a Friend");
  });

  it("returns default for unknown routes", () => {
    const meta = getOgMetaForPath("/some-random-page");
    expect(meta.title).toContain("Metro Mutts");
    expect(meta.url).toBe("https://www.metromutts.com");
  });
});

describe("injectOgMeta", () => {
  const sampleHtml = `<!doctype html>
<html>
<head>
  <title>Metro Mutts | Dog Daycare, Boarding, Grooming &amp; Training</title>
  <meta name="description" content="Old description" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://www.metromutts.com/" />
  <meta property="og:title" content="Old Title" />
  <meta property="og:description" content="Old OG description" />
  <meta property="og:image" content="https://example.com/old.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Old Twitter Title" />
  <meta name="twitter:description" content="Old Twitter desc" />
  <meta name="twitter:image" content="https://example.com/old.png" />
</head>
<body><div id="root"></div></body>
</html>`;

  it("replaces all OG tags with route-specific values", () => {
    const meta = getOgMetaForPath("/refer");
    const result = injectOgMeta(sampleHtml, meta);

    expect(result).toContain("Refer a Friend");
    expect(result).toContain("$15 off");
    expect(result).toContain("og-refer");
    expect(result).not.toContain("Old Title");
    expect(result).not.toContain("Old OG description");
    expect(result).not.toContain("old.png");
  });

  it("replaces twitter tags", () => {
    const meta = getOgMetaForPath("/services");
    const result = injectOgMeta(sampleHtml, meta);

    expect(result).toContain('name="twitter:title" content="Dog Boarding, Grooming');
    expect(result).toContain('name="twitter:image" content="https://d2xsxph8kpxj0f');
  });

  it("replaces the page title tag", () => {
    const meta = getOgMetaForPath("/boarding");
    const result = injectOgMeta(sampleHtml, meta);

    expect(result).toContain("<title>Dog Boarding in Tulsa");
  });

  it("replaces the meta description", () => {
    const meta = getOgMetaForPath("/grooming");
    const result = injectOgMeta(sampleHtml, meta);

    expect(result).toContain('name="description" content="Professional dog grooming');
  });
});
