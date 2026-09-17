// Saved website inquiry only, never a Gingr registration or paid booking.
// Action ID 7774551315; tag/label copied from this account's Google Ads setup.
const TAG_ID = "AW-16543896139";
const DESTINATION = `${TAG_ID}/CsTnCJP6mPscEMuk39A9`;
type GoogleWindow = Window & {
  googleInquiryDataLayer?: unknown[];
};
function inquiryTag(..._args: unknown[]) {
  const tracking = window as GoogleWindow;
  tracking.googleInquiryDataLayer ??= [];
  tracking.googleInquiryDataLayer.push(arguments);
}
let ready: Promise<void> | undefined;
const sent = new Set<string>();

export function prepareGoogleEmailLead(consent: boolean): Promise<void> {
  if (!consent) return Promise.resolve();
  if (ready) return ready;
  ready = new Promise(resolve => {
    try {
      const tracking = window as GoogleWindow;
      tracking.googleInquiryDataLayer ??= [];
      // Measurement consent is not permission for enhanced conversions or remarketing.
      inquiryTag("consent", "default", {
        ad_storage: "granted", ad_user_data: "denied", ad_personalization: "denied",
      });
      inquiryTag("js", new Date());
      inquiryTag("config", TAG_ID, {
        send_page_view: false, allow_enhanced_conversions: false,
        allow_ad_personalization_signals: false,
      });
      if (document.querySelector('script[data-google-inquiry-tag]')) {
        resolve();
      } else {
        const script = document.createElement("script");
        script.async = true;
        script.dataset.googleInquiryTag = "true";
        script.src = `https://www.googletagmanager.com/gtag/js?id=${TAG_ID}&l=googleInquiryDataLayer`;
        script.onload = () => resolve();
        script.onerror = () => resolve();
        document.head.appendChild(script);
      }
      window.setTimeout(resolve, 1500);
    } catch { resolve(); }
  });
  return ready;
}

// Call only after the server has successfully saved the inquiry.
export async function reportGoogleEmailLead(id: string, consent: boolean): Promise<void> {
  if (!consent || sent.has(id)) return;
  const key = `metro-mutts-google-email-lead:${id}`;
  try { if (sessionStorage.getItem(key)) return; } catch { /* optional */ }
  sent.add(id);
  try {
    await prepareGoogleEmailLead(true);
    await new Promise<void>(resolve => {
      const done = () => resolve();
      const timeout = window.setTimeout(done, 1500);
      try {
        inquiryTag("event", "conversion", {
          send_to: DESTINATION,
          transaction_id: `website-inquiry-${id}`,
          value: 0, currency: "USD",
          event_callback: () => { window.clearTimeout(timeout); done(); },
          event_timeout: 1500,
        });
        try { sessionStorage.setItem(key, "1"); } catch { /* optional */ }
      } catch { window.clearTimeout(timeout); done(); }
    });
  } catch { /* Tracking must never prevent a saved inquiry reaching Gingr. */ }
}
