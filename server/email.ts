import { Resend } from "resend";
import { ENV } from "./_core/env";

function getResendClient(): Resend | null {
  if (!ENV.resendApiKey) {
    return null;
  }

  return new Resend(ENV.resendApiKey);
}

const FRONT_DESK_EMAIL = "info@metromutts.com";
const FROM_EMAIL = "Metro Mutts <noreply@metromutts.com>";

export interface PromoRedemptionEmailData {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  serviceType: string;
  promoCode: string;
  promoDescription: string;
  discountType: string;
  discountValue: number;
}

/**
 * Send an email to the front desk when a promo code is redeemed.
 * Includes all details needed to apply the discount manually in Gingr.
 */
export async function sendPromoRedemptionEmail(
  data: PromoRedemptionEmailData
): Promise<boolean> {
  const resend = getResendClient();
  if (!resend) {
    console.warn("[Email] Resend API key not configured, skipping email");
    return false;
  }

  const discountDisplay =
    data.discountType === "percentage"
      ? `${data.discountValue}% off`
      : data.discountType === "free_night"
        ? `${data.discountValue} free night(s)`
        : `$${data.discountValue} off`;

  const subject = `🎟️ Promo Code Redeemed: ${data.promoCode} — ${data.customerName}`;

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: #345460; padding: 20px; border-radius: 8px 8px 0 0;">
        <h1 style="color: #48D597; margin: 0; font-size: 20px;">🎟️ Promo Code Redeemed</h1>
      </div>
      <div style="background: #f9fafb; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
        <p style="margin: 0 0 16px; color: #374151; font-size: 15px;">
          A customer just redeemed a promo code on the website. Please apply the discount manually in Gingr when they check in.
        </p>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151; width: 140px;">Customer</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; color: #111827;">${data.customerName}</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151;">Email</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; color: #111827;"><a href="mailto:${data.customerEmail}" style="color: #0891b2;">${data.customerEmail}</a></td>
          </tr>
          ${data.customerPhone ? `
          <tr>
            <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151;">Phone</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; color: #111827;"><a href="tel:${data.customerPhone}" style="color: #0891b2;">${data.customerPhone}</a></td>
          </tr>
          ` : ""}
          <tr>
            <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151;">Service</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; color: #111827; text-transform: capitalize;">${data.serviceType}</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151;">Promo Code</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; color: #111827; font-weight: 700;">${data.promoCode}</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151;">Discount</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; color: #48D597; font-weight: 700;">${discountDisplay}</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; font-weight: 600; color: #374151;">Offer Details</td>
            <td style="padding: 10px 12px; color: #111827;">${data.promoDescription}</td>
          </tr>
        </table>

        <div style="background: #fffbeb; border: 1px solid #fbbf24; border-radius: 6px; padding: 12px 16px;">
          <p style="margin: 0; color: #92400e; font-size: 13px; font-weight: 600;">⚡ Action Required</p>
          <p style="margin: 4px 0 0; color: #92400e; font-size: 13px;">
            When this customer checks in, search for them in Gingr by email or phone and apply the discount to their invoice.
          </p>
        </div>

        <p style="margin: 20px 0 0; color: #9ca3af; font-size: 12px;">
          This is an automated notification from the Metro Mutts website promo code system.
        </p>
      </div>
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [FRONT_DESK_EMAIL],
      subject,
      html,
    });

    if (error) {
      console.error("[Email] Failed to send promo redemption email:", error);
      return false;
    }

    console.log(`[Email] Promo redemption email sent to ${FRONT_DESK_EMAIL} for ${data.promoCode}`);
    return true;
  } catch (err) {
    console.error("[Email] Error sending promo redemption email:", err);
    return false;
  }
}
