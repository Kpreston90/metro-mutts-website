/** Campaign context changes copy only; it is not measurement consent. */
export function isDaycareSignupEntry(search: string): boolean {
  const query = new URLSearchParams(search);
  const service = query.get("service");
  if (service) return service === "daycare";
  return (
    query.get("utm_source") === "meta" &&
    query.get("utm_medium") === "paid_social" &&
    query.get("utm_campaign") === "website_email_leads"
  );
}
