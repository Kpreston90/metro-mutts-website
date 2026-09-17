import { describe, expect, it } from "vitest";
import { isDaycareSignupEntry } from "./signupEntry";

describe("daycare landing context", () => {
  it("recognizes the existing Meta daycare campaign", () => {
    expect(isDaycareSignupEntry("?utm_source=meta&utm_medium=paid_social&utm_campaign=website_email_leads")).toBe(true);
  });
  it("supports an explicit daycare link", () => {
    expect(isDaycareSignupEntry("?service=daycare")).toBe(true);
  });
  it("preserves general and Google entry copy", () => {
    expect(isDaycareSignupEntry("")).toBe(false);
    expect(isDaycareSignupEntry("?utm_source=google&utm_medium=cpc")).toBe(false);
    expect(isDaycareSignupEntry("?utm_source=meta")).toBe(false);
  });
  it("does not override an explicit different service", () => {
    expect(isDaycareSignupEntry("?service=boarding&utm_source=meta&utm_medium=paid_social&utm_campaign=website_email_leads")).toBe(false);
  });
});
