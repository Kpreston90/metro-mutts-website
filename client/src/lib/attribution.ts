import { captureAttribution, attributionSchema } from "@shared/attribution";

// Memory only until the visitor explicitly opts in on the inquiry form.
// No cookies, localStorage, cross-device identity, or automatic ad-platform uploads.
const landing = captureAttribution(window.location.href);
export function inquiryAttribution(consent: boolean) {
  return consent
    ? attributionSchema.parse({ ...landing, consent: true })
    : undefined;
}
