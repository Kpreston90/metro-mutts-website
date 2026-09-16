import {
  captureAttribution,
  attributionSchema,
  isGoogleAdEntry,
  attributionKeys,
} from "@shared/attribution";

// Memory only until the visitor explicitly opts in on the inquiry form.
// No cookies, localStorage, cross-device identity, or automatic ad-platform uploads.
const landing = captureAttribution(window.location.href);
export function inquiryAttribution(consent: boolean) {
  const current = captureAttribution(window.location.href);
  const fields = isGoogleAdEntry(current) ? current : landing;
  return consent
    ? attributionSchema.parse({ ...fields, consent: true })
    : undefined;
}

export function isAdEntry() {
  return (
    isGoogleAdEntry(landing) ||
    isGoogleAdEntry(captureAttribution(window.location.href))
  );
}
// Preserve only allowlisted campaign fields across same-site navigation/reloads.
export function signupEntryHref() {
  const current = captureAttribution(window.location.href);
  const fields = isGoogleAdEntry(current) ? current : landing;
  const query = new URLSearchParams();
  for (const key of attributionKeys)
    if (fields[key]) query.set(key, fields[key]);
  return `/start${query.size ? `?${query}` : ""}`;
}
