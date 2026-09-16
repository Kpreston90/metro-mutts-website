import { z } from "zod";

export const attributionKeys = [
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;
export const attributionSchema = z.object({
  consent: z.literal(true),
  capturedAt: z.string().datetime(),
  landingPath: z
    .string()
    .max(500)
    .refine(value => value.startsWith("/") && !value.includes("?")),
  gclid: z.string().max(500).optional(),
  gbraid: z.string().max(500).optional(),
  wbraid: z.string().max(500).optional(),
  fbclid: z.string().max(500).optional(),
  utm_source: z.string().max(500).optional(),
  utm_medium: z.string().max(500).optional(),
  utm_campaign: z.string().max(500).optional(),
  utm_content: z.string().max(500).optional(),
  utm_term: z.string().max(500).optional(),
});
export type Attribution = z.infer<typeof attributionSchema>;

// Keep only known campaign fields, never the full URL, email, or arbitrary query data.
export function captureAttribution(
  url: string,
  now = new Date()
): Record<string, string> {
  const parsed = new URL(url);
  const result: Record<string, string> = {
    capturedAt: now.toISOString(),
    landingPath: parsed.pathname.slice(0, 500),
  };
  for (const key of attributionKeys) {
    const value = parsed.searchParams.get(key);
    if (value) result[key] = value.slice(0, 500);
  }
  return result;
}

// A generic Google referrer, newsletter UTM, or campaign name does not prove a paid visit.
export function isGoogleAdEntry(fields: Record<string, string | undefined>) {
  if (fields.gclid || fields.gbraid || fields.wbraid) return true;
  return (
    /^(google|google_ads)$/i.test(fields.utm_source ?? "") &&
    /^(cpc|ppc|paid_search|local_services|lsa)$/i.test(fields.utm_medium ?? "")
  );
}
export const GINGR_SIGNUP_URL =
  "https://metromutts.portal.gingrapp.com/public/new_customer";
export const GINGR_LOGIN_URL =
  "https://metromutts.portal.gingrapp.com/public/login/Ii9zZWN1cmUvaG9tZSI=";
