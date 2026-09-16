# Gingr attribution: staged rollout

## Implemented

The contact form saves inquiries to MySQL through `attribution.submit` before displaying success. A stable UUID makes retries idempotent. Failure keeps the form available and shows a phone fallback. Owner notification is best effort; records remain available at `/admin/attribution` behind existing admin authentication.

Campaign parameters are captured on initial page load in memory only. Only an explicit, unchecked-by-default form checkbox permits storing the allowlisted Google click identifiers, Meta click identifier, UTMs, landing path (without query), and capture timestamp alongside the inquiry. No browser storage or ad upload is added. Existing GTM and analytics configuration is outside this change and must be audited separately.

Administrators can record a completed, paid Gingr visit after matching the owner by exact inquiry email/phone and verifying payment. Owner ID and invoice ID are stored without cards, passwords, pet health data, or full Gingr responses. Invoice IDs are unique. Repeating the same outcome is idempotent; conflicting records are rejected. This is a paid-visit record, not proof of a first-ever customer visit.

Legacy advertising URLs `/schedule-yourself`, `/new-customer`, `/about-us`, and `/contact` now redirect to current destinations in Express and the static-host redirects file. Express preserves campaign query parameters.

## Deployment requirements

1. Rotate/revoke the Gingr credential previously committed in `gingr-api-notes.md`. Removal from the current file does not remove Git history. Coordinate history cleanup separately; do not force-push during this rollout.
2. Review the PR, test a staging inquiry, back up the database, and apply the generated migration with the normal deployment process. No production database migration has been run by this change.
3. Configure the existing `DATABASE_URL`, administrator authentication, and owner notification service. Verify actual deployment serves `/api/trpc`; static-only hosting cannot accept these inquiries. Test success, database failure, notification failure, and retry.
4. Assign staff responsibility for the inquiry dashboard. Provide a retention/deletion process; deletion must remove linked outcomes before the inquiry because of the foreign key. Avoid broad access to contact data.

## LSA → website → direct Gingr signup

This exact path is **not tracked end to end by this foundation**. We must verify that the real LSA website link carries a distinguishable source/click identifier; a generic Google referrer cannot prove LSA attribution. Do not assume Search Ads auto-tagging applies to LSA website links.

Prefer a Gingr-supported analytics/tag integration using the same GA4 web data stream across the website and portal, preserving the cross-domain linker and firing a signup-completed event only after successful registration. This requires confirming portal customization and event support with Gingr/account settings. A redirect to the registration form is not a signup event. Google requires matching tag IDs on both domains: https://support.google.com/analytics/answer/10071811

This PR adds a temporary email-first handoff at `/start`. Recognizable Google paid entries use it when selecting new-customer signup from the booking modal, booking page, or `/get-started`. Organic visitors retain the existing flow; returning customers retain direct login. The email is saved before forwarding to Gingr, with a stable retry ID. It is never passed in the portal URL. Attribution remains optional and unchecked by default. The customer is asked to use the same email in Gingr; no unsupported email prefill or automatic matching is assumed.

Staff can separately verify a new Gingr registration at `/admin/attribution` using the exact email, owner ID, and actual account creation time. The API rejects mismatched emails, accounts predating the inquiry, and reassignment of an already recorded owner. Handoffs, registrations, and paid visits remain separate. Nothing is uploaded to ad platforms. Apply migration `0004_signup_handoff.sql` through the normal deployment process after the preceding migrations.

After deployment and a successful real test, configure the LSA website entry with `/start?utm_source=google&utm_medium=local_services&utm_campaign=lsa` if the account supports that destination. Verify the actual clicked URL retains those parameters. Do not point ads at this route before deployment. Untagged traffic is not labeled as LSA.

## Live portal hook verification — September 16, 2026

Verified the signed-in Metro Mutts account under Admin → Advanced Settings → Custom Configurations. The account exposes Customer app JS, Customer app footer (described as supporting Google Analytics), and webhook integration fields. These descriptions establish available settings, not compatibility with the current registration flow.

The active registration URL is `https://metromutts.portal.gingrapp.com/public/new_customer`. Its loaded script elements did not include the Metro Mutts Google tag/container during inspection.

Tested two temporary diagnostics through the normal admin UI:

1. Saved Customer app JS that set an invisible attribute on the HTML element. Confirmed the saved configuration after reload. Reloaded the registration portal, confirmed its registration form had rendered, and observed no diagnostic attribute.
2. Saved Customer app footer containing an invisible HTML element and a script marker. Confirmed both were present in the saved admin configuration. Reloaded the registration portal and confirmed the registration form had rendered; neither the element nor either script marker was present.

Both diagnostic fields were restored to their original empty values, then reloaded and verified empty. The existing webhook integration was left unchanged. No Google/Meta tag was installed, customer account created, payment entered, agreement accepted, or customer information uploaded during this verification.

**Result:** the tested custom-code fields did not apply to the current registration page in this session. This does not establish that Gingr never supports portal tracking: the settings may be for a different portal generation or require vendor configuration. Do not promise seamless signup attribution or ship a signup-completed detector based on a button click or form submission.

### Specific vendor confirmation needed

For our current customer portal at the registration URL above:

- Do Customer app JS and Customer app footer apply to this portal generation? If not, what supported mechanism installs our GA4/Google Tag Manager tag on registration and confirmation pages?
- Is there a documented callback/event or confirmation route for a successfully completed registration, distinct from the owner-info step and from clicking Continue to Pet(s)?
- Does the portal preserve and consume Google's cross-domain `_gl` linker, or support a stable anonymous attribution token that can be associated with the created owner?
- Which webhook event confirms customer registration, what stable owner ID does it include, and can it carry a website attribution token? Owner creation alone does not identify the advertising source.

Use Gingr's answer and a controlled registration test to establish a supported implementation before changing portal tracking. The registration flow currently requires payment-card entry and legal agreements, so do not fabricate a live test registration or accept agreements on behalf of a customer. Existing webhook workflows must be preserved.

## Automatic matching and uploads: deliberately not activated

Gingr's API documents owner lookup, reservations by owner, and invoice listing, but we have not verified this account's response shape, payment semantics, customer matching cardinality, or location boundary. Do not infer payment from `closed_only` or assume a card authorization is revenue.

Use a newly rotated server-only `GINGR_API_KEY` and the verified `GINGR_BASE_URL` in staging. Confirm exact email/normalized phone lookup, reject ambiguous owners, then store the stable owner ID. Verify a completed visit and a truly settled invoice with documented payment/void/refund fields. Page invoice results correctly: Gingr's documented `page` is a row offset, not a page number. Direct-to-Gingr visitors without a website inquiry cannot currently be matched to a website click; do not claim complete attribution.

Next, configure Google Ads conversion action/customer credentials and Meta dataset/token. Use consent-qualified records only; normalize/hash identifiers where required, persist upload receipts with retries, and deduplicate using `gingr-paid-{invoiceId}`. Verify conversion time windows, refunds, currency, first-visit rules, and browser/server event deduplication before enabling uploads. Existing calls, chats, directions, and booking clicks remain separate from paid visits. No budgets or advertising settings are changed by this PR.

References:

- https://support.gingrapp.com/hc/en-us/articles/25722122517517-Gingr-API-Functions-Reference
- https://support.google.com/google-ads/answer/15713840
- https://developers.facebook.com/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events/

## Gingr automated acknowledgment and documented events

The automated support acknowledgment for ticket 4082052 links to Gingr's Portal 2.0 GTM guide. The guide explicitly says Customer App JS and CSS fields are nonfunctional in Portal 2.0, specifies Customer app footer for tag installation, and documents `owner_created` (new account), `reservation_created` (reservation request), and `lead_created` (lead form). This establishes a documented direct-registration mechanism, but does not explain our failed footer probe or prove it works on this account. A registration request is not a settled visit. Do not export raw `ownerData` into analytics; allowlist nonpersonal event fields and verify consent and cross-domain attribution before activation.

References: https://support.gingrapp.com/hc/en-us/articles/25846389005325 and https://support.gingrapp.com/hc/en-us/articles/25846095500557.
