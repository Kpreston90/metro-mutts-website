import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { inquiryAttribution } from "@/lib/attribution";
import { prepareMetaLead, reportMetaLead } from "@/lib/metaLead";
import { reportGoogleEmailLead } from "@/lib/googleEmailLead";
import { isDaycareSignupEntry } from "@/lib/signupEntry";
import { GINGR_SIGNUP_URL, GINGR_LOGIN_URL } from "@shared/attribution";
import PageSEO from "@/components/PageSEO";

export default function StartSignup() {
  const [daycareEntry] = useState(() =>
    isDaycareSignupEntry(window.location.search)
  );
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [id] = useState(() => crypto.randomUUID());
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const mutation = trpc.attribution.startSignup.useMutation();
  const continueToGingr = () => window.location.assign(GINGR_SIGNUP_URL);
  return (
    <main className="min-h-screen bg-[#f6faf8] text-[#345460] px-5 py-10 sm:py-16">
      <PageSEO
        title="Start Your First Visit | Metro Mutts Tulsa"
        description="Start your first Metro Mutts visit, then create your booking account."
        canonical="https://metromutts.com/start"
      />
      <div className="mx-auto max-w-lg">
        <a href="/" className="text-2xl font-extrabold">
          Metro Mutts
        </a>
        <p className="mt-10 text-sm font-semibold uppercase tracking-widest text-[#345460]/60">
          New customers · Step 1 of 2
        </p>
        <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold leading-tight">
          {daycareEntry ? "Your dog has plans." : "Let’s plan your pup’s first visit."}
        </h1>
        <p className="mt-5 text-lg leading-relaxed">
          {daycareEntry
            ? "Less couch. More company. Start your dog’s daycare journey at Metro Mutts in Tulsa."
            : "Your first day of daycare is free and includes a temperament assessment. Boarding requires approval first. Grooming can be booked directly."}
        </p>
        {daycareEntry && (
          <p className="mt-4 leading-relaxed text-[#345460]/80">
            New to our pack? We start with a temperament assessment to see
            whether group daycare is a good fit for your dog. Your first day
            of daycare is free and includes the assessment.
          </p>
        )}
        <p className="mt-4 text-[#345460]/70">
          Start with your email, then finish your account in our booking portal.
          Use the same email in both places so we can connect your signup to
          your first visit.
        </p>
        <form
          className="mt-8 space-y-5"
          onSubmit={async event => {
            event.preventDefault();
            if (mutation.isPending) return;
            if (saved) {
              continueToGingr();
              return;
            }
            const botField = String(
              new FormData(event.currentTarget).get("company") ?? ""
            );
            setError("");
            try {
              await mutation.mutateAsync({
                id,
                email,
                botField,
                service: daycareEntry ? "daycare" : "",
                attribution: inquiryAttribution(consent),
              });
              setSaved(true);
              await Promise.all([
                reportMetaLead(id, consent),
                reportGoogleEmailLead(id, consent),
              ]);
              continueToGingr();
            } catch {
              setError(
                "We couldn’t save your email. Please try again or call 539-867-3841."
              );
            }
          }}
        >
          <label htmlFor="signup-email" className="block font-semibold">
            Your email
          </label>
          <input
            id="signup-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={320}
            value={email}
            readOnly={saved || mutation.isPending}
            onChange={event => setEmail(event.target.value)}
            className="w-full rounded-xl border border-[#345460]/20 bg-white px-4 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-[#48D597]"
          />
          <div hidden>
            <label>
              Company
              <input name="company" autoComplete="off" tabIndex={-1} />
            </label>
          </div>
          <label className="flex items-start gap-3 text-sm leading-relaxed text-[#345460]/70">
            <input
              type="checkbox"
              checked={consent}
              disabled={saved || mutation.isPending}
              onChange={event => {
                setConsent(event.target.checked);
                void prepareMetaLead(event.target.checked);
              }}
              className="mt-1"
            />
            <span>
              Optional: allow Metro Mutts to connect this inquiry and resulting
              bookings to the ad that brought me here to measure advertising
              results, including sharing an inquiry conversion event with Google
              and Meta. This event does not include your email.
            </span>
          </label>
          {error && (
            <p role="alert" className="text-red-700">
              {error}
            </p>
          )}
          {saved && (
            <p role="status">
              Your email is saved. Continue to finish your registration.
            </p>
          )}
          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full rounded-xl bg-[#48D597] px-5 py-4 font-bold text-lg hover:bg-[#3bc085] disabled:opacity-60"
          >
            {mutation.isPending ? "Saving…" : "Continue to booking portal →"}
          </button>
          <p className="text-sm text-[#345460]/65">
            This starts your inquiry; it doesn’t create an account or reserve a
            date. No mailing-list signup.{" "}
            <a href="/privacy" className="underline">
              Privacy policy
            </a>
          </p>
        </form>
        <div className="mt-9 border-t border-[#345460]/15 pt-6 space-y-4">
          <p>
            Already a customer?{" "}
            <a href={GINGR_LOGIN_URL} className="font-semibold underline">
              Log in to book
            </a>
          </p>
          <p className="text-sm text-[#345460]/70">
            Have your vaccination records handy. The booking portal also
            requests contact details, a card on file, and service agreements.
          </p>
          <a href="tel:5398673841" className="inline-block underline">
            Need a hand? Call 539-867-3841
          </a>
        </div>
      </div>
    </main>
  );
}
