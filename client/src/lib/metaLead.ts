// Website inquiry only: never report a Gingr registration or paid booking here.
const PIXEL_ID = "411155718006190";
type Pixel = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push?: Pixel;
  loaded?: boolean;
  version?: string;
};
declare global {
  interface Window {
    fbq?: Pixel;
    _fbq?: Pixel;
  }
}
let ready: Promise<void> | undefined;
const sent = new Set<string>();

// Called only after explicit permission. No email or other form fields are sent.
export function prepareMetaLead(consent: boolean): Promise<void> {
  if (!consent) return Promise.resolve();
  if (ready) return ready;
  ready = new Promise(resolve => {
    try {
      if (!window.fbq) {
        const pixel = function (...args: unknown[]) {
          if (pixel.callMethod) pixel.callMethod(...args);
          else pixel.queue.push(args);
        } as Pixel;
        pixel.queue = [];
        pixel.push = pixel;
        pixel.loaded = true;
        pixel.version = "2.0";
        window.fbq = pixel;
        window._fbq = pixel;
      }
      window.fbq("set", "autoConfig", false, PIXEL_ID);
      window.fbq("init", PIXEL_ID);
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://connect.facebook.net/en_US/fbevents.js";
      script.onload = () => resolve();
      script.onerror = () => resolve();
      if (document.querySelector('script[src*="connect.facebook.net"][src*="fbevents.js"]')) {
        resolve();
      } else {
        document.head.appendChild(script);
      }
      // Ad blockers and network failures must never prevent booking.
      window.setTimeout(resolve, 1500);
    } catch {
      resolve();
    }
  });
  return ready;
}

export async function reportMetaLead(id: string, consent: boolean): Promise<void> {
  if (!consent || sent.has(id)) return;
  const key = `metro-mutts-meta-lead:${id}`;
  try {
    if (sessionStorage.getItem(key)) return;
  } catch {
    // The in-memory guard still works when storage is unavailable.
  }
  sent.add(id);
  try {
    await prepareMetaLead(true);
    window.fbq?.("trackSingle", PIXEL_ID, "Lead", {
      content_name: "Website email inquiry",
    }, { eventID: `website-inquiry-${id}` });
    try { sessionStorage.setItem(key, "1"); } catch { /* optional */ }
    // Give the browser request a chance to leave before the cross-domain handoff.
    await new Promise<void>(resolve => window.setTimeout(resolve, 250));
  } catch {
    // Tracking must not interrupt a successfully saved inquiry.
  }
}
