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

If that is unavailable, an identified handoff (email captured before Gingr registration) could link the click to the owner through the API, but it adds friction and is not made mandatory by this PR. The existing inquiry form is optional; direct registrations bypass it. Creating a new owner would measure signup, while a completed paid visit measures a different business outcome. Both should be separate events.

## Automatic matching and uploads: deliberately not activated

Gingr's API documents owner lookup, reservations by owner, and invoice listing, but we have not verified this account's response shape, payment semantics, customer matching cardinality, or location boundary. Do not infer payment from `closed_only` or assume a card authorization is revenue.

Use a newly rotated server-only `GINGR_API_KEY` and the verified `GINGR_BASE_URL` in staging. Confirm exact email/normalized phone lookup, reject ambiguous owners, then store the stable owner ID. Verify a completed visit and a truly settled invoice with documented payment/void/refund fields. Page invoice results correctly: Gingr's documented `page` is a row offset, not a page number. Direct-to-Gingr visitors without a website inquiry cannot currently be matched to a website click; do not claim complete attribution.

Next, configure Google Ads conversion action/customer credentials and Meta dataset/token. Use consent-qualified records only; normalize/hash identifiers where required, persist upload receipts with retries, and deduplicate using `gingr-paid-{invoiceId}`. Verify conversion time windows, refunds, currency, first-visit rules, and browser/server event deduplication before enabling uploads. Existing calls, chats, directions, and booking clicks remain separate from paid visits. No budgets or advertising settings are changed by this PR.

References:

- https://support.gingrapp.com/hc/en-us/articles/25722122517517-Gingr-API-Functions-Reference
- https://support.google.com/google-ads/answer/15713840
- https://developers.facebook.com/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events/
