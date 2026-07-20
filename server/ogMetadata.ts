/**
 * Per-route Open Graph metadata for dynamic injection.
 * Crawlers (iMessage, Facebook, Slack, Google) see these tags
 * instead of the static index.html defaults.
 *
 * SEO-optimized for: dog boarding Tulsa, dog grooming Tulsa,
 * pet boarding Tulsa OK, luxury dog boarding, dog daycare Tulsa
 */

export interface OgMeta {
  title: string;
  description: string;
  image: string;
  url: string;
  canonical?: string;
}

const BASE_URL = "https://metromutts.com";
const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb";

// Default / fallback OG metadata (homepage)
const defaultOg: OgMeta = {
  title: "Metro Mutts | Dog Boarding, Grooming & Daycare in Tulsa, OK",
  description:
    "Metro Mutts offers luxury dog boarding, professional grooming, and supervised daycare in Tulsa, Oklahoma. 4,000+ sq ft facility. First day free! Call 539-867-3841.",
  image: `${CDN}/og-homepage-4Bvn5v2GYGM8G8Cq2fVJZq.png`,
  url: BASE_URL,
};

/**
 * Route-specific OG metadata map.
 * Keys are path prefixes matched against the request URL.
 * More specific routes should come first.
 */
const routeOgMap: Record<string, OgMeta> = {
  "/vet-referred": {
    title: "Free Trial Day | Metro Mutts — Recommended by Your Vet",
    description:
      "Your veterinarian recommends Metro Mutts for daycare, boarding, and grooming in Tulsa. Claim your free trial day — because your vet trusts us with their patients.",
    image: `${CDN}/vet-referred-hero-NDd4fTY9BdDrJ9HMbsxEuv.webp`,
    url: `${BASE_URL}/vet-referred`,
  },
  "/refer": {
    title: "Refer a Friend | Metro Mutts Tulsa — You Both Get $15 Off",
    description:
      "Refer a friend to Metro Mutts and you both get $15 off your next dog boarding, grooming, or daycare service in Tulsa. Share the love.",
    image: `${CDN}/og-refer-v2-gegNfk5rw2qURCwoGL5xZS.png`,
    url: `${BASE_URL}/refer`,
  },
  "/services": {
    title: "Dog Boarding, Grooming & Daycare Services | Metro Mutts Tulsa, OK",
    description:
      "Three premium dog care services under one roof in Tulsa: luxury overnight boarding, professional grooming by Jacque, and supervised daycare. First day free.",
    image: `${CDN}/services-hero-v2_cd3ef501.png`,
    url: `${BASE_URL}/services`,
  },
  "/daycare": {
    title: "Dog Daycare in Tulsa, OK | Metro Mutts — First Day FREE",
    description:
      "Supervised dog daycare in Tulsa with 4,000+ sq ft of indoor and outdoor play space. Dogs grouped by size and temperament. Enrichment activities daily. First day free for new pups.",
    image: `${CDN}/services-hero-v2_cd3ef501.png`,
    url: `${BASE_URL}/daycare`,
  },
  "/boarding": {
    title: "Dog Boarding in Tulsa, OK | Luxury Overnight Suites | Metro Mutts",
    description:
      "Best dog boarding in Tulsa, Oklahoma. Spacious private suites with climate control, cozy bedding, daily supervised play, evening walks, and overnight staff. Book your pup's stay today.",
    image: `${CDN}/boarding-suites_dd0c1aa0.png`,
    url: `${BASE_URL}/boarding`,
  },
  "/grooming": {
    title: "Dog Grooming in Tulsa, OK | Professional Styling | Metro Mutts",
    description:
      "Professional dog grooming in Tulsa by certified stylist Jacque. Full-service baths, breed-specific haircuts, nail trims, de-shedding, and spa add-ons. All breeds welcome. Book today.",
    image: `${CDN}/grooming-room-active-1_3a32bb83.png`,
    url: `${BASE_URL}/grooming`,
  },
  "/grooming-gallery": {
    title: "Dog Grooming Gallery | Before & After Photos | Metro Mutts Tulsa",
    description:
      "See real before-and-after dog grooming photos from Metro Mutts in Tulsa. Breed-specific styling, fresh cuts, doodle grooming, and happy pups by groomer Jacque.",
    image: `${CDN}/grooming-room-active-1_3a32bb83.png`,
    url: `${BASE_URL}/grooming-gallery`,
  },
  "/pricing": {
    title: "Dog Boarding & Grooming Prices | Metro Mutts Tulsa, OK",
    description:
      "Transparent pricing for dog boarding, grooming, and daycare at Metro Mutts Tulsa. Daycare from $30/day, boarding from $50/night, grooming from $30. Multi-dog discounts available.",
    image: `${CDN}/og-homepage-4Bvn5v2GYGM8G8Cq2fVJZq.png`,
    url: `${BASE_URL}/pricing`,
  },
  "/book": {
    title: "Book Dog Boarding or Grooming | Metro Mutts Tulsa, OK",
    description:
      "Schedule your pup's boarding stay, grooming appointment, or first free daycare visit at Metro Mutts Tulsa. Call 539-867-3841 or book online.",
    image: `${CDN}/og-homepage-4Bvn5v2GYGM8G8Cq2fVJZq.png`,
    url: `${BASE_URL}/book`,
  },
  "/booking": {
    title: "Book Your Dog's Visit | Metro Mutts Tulsa — Daycare, Boarding & Grooming",
    description:
      "Book daycare, boarding, or grooming for your dog at Metro Mutts in Tulsa. First day of daycare is free. Call 539-867-3841 or book online.",
    image: `${CDN}/og-homepage-4Bvn5v2GYGM8G8Cq2fVJZq.png`,
    url: `${BASE_URL}/booking`,
  },
  "/careers": {
    title: "Careers at Metro Mutts Tulsa | Dog Care Jobs",
    description:
      "Love dogs? Join the Metro Mutts team in Tulsa. We're hiring passionate dog care professionals, groomers, and kennel attendants.",
    image: `${CDN}/og-homepage-4Bvn5v2GYGM8G8Cq2fVJZq.png`,
    url: `${BASE_URL}/careers`,
  },
  "/blog/why-does-your-dog-sigh": {
    title: "Why Does Your Dog Sigh? | Metro Mutts Journal",
    description:
      "That big 'ahhhh...' might be the happiest sound you'll hear all day. Learn what your dog's sigh really means and why it's a sign of a fulfilled pup.",
    image: `${CDN}/journal-005-hero-sigh-ahwBY4DH3NFcyNkZSxeMt8.webp`,
    url: `${BASE_URL}/blog/why-does-your-dog-sigh`,
  },
  "/blog/which-one-is-your-dog": {
    title: "Which One Is Your Dog? The 7 Daycare Personalities | Metro Mutts Tulsa",
    description:
      "From the Wrestler to the Observer, every dog has a daycare personality. Discover the 7 types we see every day and what they tell us about your pup.",
    image: `${CDN}/dog-personalities-hero_70375c1c.png`,
    url: `${BASE_URL}/blog/which-one-is-your-dog`,
  },
  "/blog/5-signs-your-dog-is-ready-for-a-groom": {
    title: "5 Signs Your Dog Is Ready for a Groom | Metro Mutts Tulsa",
    description:
      "Wondering if your dog is due for a groom? Learn five simple signs to watch for and why regular grooming keeps your pup healthier, happier, and more comfortable.",
    image: `${CDN}/blog-groom-hero_1f370a94.jpg`,
    url: `${BASE_URL}/blog/5-signs-your-dog-is-ready-for-a-groom`,
  },
  "/blog": {
    title: "Dog Care Blog | Tips & Advice | Metro Mutts Tulsa",
    description:
      "Expert dog care tips, grooming advice, boarding preparation guides, and news from Metro Mutts Tulsa. Science-backed insights for happier, healthier pups.",
    image: `${CDN}/og-homepage-4Bvn5v2GYGM8G8Cq2fVJZq.png`,
    url: `${BASE_URL}/blog`,
  },
  "/faq": {
    title: "FAQ | Dog Boarding & Grooming Questions | Metro Mutts Tulsa",
    description:
      "Answers to common questions about dog boarding, grooming, daycare, vaccinations, hours, and first visit policies at Metro Mutts in Tulsa, OK.",
    image: `${CDN}/og-homepage-4Bvn5v2GYGM8G8Cq2fVJZq.png`,
    url: `${BASE_URL}/faq`,
  },
  "/tour": {
    title: "Facility Tour | Dog Boarding & Daycare Center | Metro Mutts Tulsa",
    description:
      "Take a virtual tour of Metro Mutts — 4,000+ sq ft of indoor and outdoor dog play space, private boarding suites, and professional grooming stations in Tulsa, OK.",
    image: `${CDN}/services-hero-v2_cd3ef501.png`,
    url: `${BASE_URL}/tour`,
  },
};

/**
 * Get OG metadata for a given URL path.
 * Returns route-specific metadata if available, otherwise defaults.
 */
export function getOgMetaForPath(path: string): OgMeta {
  // Normalize path
  const normalized = path.split("?")[0].split("#")[0].toLowerCase();

  // Check exact matches first
  if (routeOgMap[normalized]) {
    return routeOgMap[normalized];
  }

  // Check prefix matches (e.g., /blog/some-slug)
  for (const [route, meta] of Object.entries(routeOgMap)) {
    if (normalized.startsWith(route + "/")) {
      return meta;
    }
  }

  // Fallback to default
  return defaultOg;
}

/**
 * Inject OG meta tags into the HTML template.
 * Replaces the static meta tags with route-specific ones.
 */
export function injectOgMeta(html: string, meta: OgMeta): string {
  // Replace OG tags
  html = html.replace(
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`
  );
  html = html.replace(
    /<meta property="og:image" content="[^"]*" \/>/,
    `<meta property="og:image" content="${meta.image}" />`
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${meta.url}" />`
  );

  // Replace Twitter tags
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*" \/>/,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`
  );
  html = html.replace(
    /<meta name="twitter:image" content="[^"]*" \/>/,
    `<meta name="twitter:image" content="${meta.image}" />`
  );

  // Replace page title
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeHtml(meta.title)}</title>`
  );

  // Replace meta description
  html = html.replace(
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`
  );

  // Replace canonical URL
  html = html.replace(
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${meta.url}" />`
  );

  return html;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
