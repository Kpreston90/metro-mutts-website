import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";

export default function AdminAttribution() {
  const { user, loading } = useAuth();
  const allowed = user?.role === "admin";
  const inquiries = trpc.attribution.list.useQuery(undefined, {
    enabled: allowed,
  });
  const outcomes = trpc.attribution.outcomes.useQuery(undefined, {
    enabled: allowed,
  });
  const registrations = trpc.attribution.registrations.useQuery(undefined, {
    enabled: allowed,
  });
  const [registrationInquiryId, setRegistrationInquiryId] = useState("");
  const utils = trpc.useUtils();
  const verifyRegistration = trpc.attribution.verifyRegistration.useMutation({
    onSuccess: () => utils.attribution.registrations.invalidate(),
  });
  const verify = trpc.attribution.verifyPaidVisit.useMutation({
    onSuccess: () => utils.attribution.outcomes.invalidate(),
  });
  const [inquiryId, setInquiryId] = useState("");
  if (loading) return <p className="p-8">Loading…</p>;
  if (!user)
    return (
      <a className="m-8 block underline" href={getLoginUrl()}>
        Sign in
      </a>
    );
  if (!allowed) return <p className="p-8">Administrator access required.</p>;
  return (
    <main className="max-w-5xl mx-auto p-6 space-y-6 text-[#345460]">
      <h1 className="text-3xl font-bold">Inquiries and verified bookings</h1>
      <p>
        Recent 100 inquiries and outcomes. Opted-in website inquiries can send a
        Meta Lead event. Verified Gingr registrations and payments are not
        automatically uploaded to ad platforms.
        Confirm owner identity using the inquiry email or phone and verify a
        completed, paid visit in Gingr before recording an outcome. Closed
        invoices alone do not prove payment.
      </p>
      <p>
        Recent records:{" "}
        {inquiries.data?.filter(item => item.kind === "signup_handoff")
          .length ?? 0}{" "}
        email handoffs · {registrations.data?.length ?? 0} verified
        registrations · {outcomes.data?.length ?? 0} paid visits. These are
        recent-record counts, not campaign conversion rates.
      </p>
      {(inquiries.error || outcomes.error || registrations.error) && (
        <p role="alert">
          Unable to load records. Check the database and migration.
        </p>
      )}
      {inquiries.isLoading && <p>Loading inquiries…</p>}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th>Date</th>
              <th>Customer</th>
              <th>Inquiry</th>
              <th>Attribution</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.data?.map(item => (
              <tr key={item.id} className="border-b align-top">
                <td className="p-2">{item.createdAt.toLocaleDateString()}</td>
                <td className="p-2">
                  {item.name || "New customer email"}
                  <br />
                  {item.email}
                  <br />
                  {item.phone}
                </td>
                <td className="p-2">
                  {item.kind === "signup_handoff"
                    ? "Email handoff"
                    : "Contact inquiry"}
                  <br />
                  {item.service}
                  <br />
                  {item.message}
                </td>
                <td className="p-2">
                  {item.attribution ? (
                    <details>
                      <summary>Opted in</summary>
                      <pre className="whitespace-pre-wrap text-xs max-w-xs">
                        {item.attribution}
                      </pre>
                    </details>
                  ) : (
                    "No consent"
                  )}
                  <br />
                  <small>{item.id}</small>
                </td>
                <td className="p-2">
                  <p>
                    {registrations.data?.some(
                      registration => registration.inquiryId === item.id
                    )
                      ? "Registration verified"
                      : "Registration unverified"}
                  </p>
                  <button
                    className="underline block mb-2"
                    onClick={() => setRegistrationInquiryId(item.id)}
                  >
                    Verify new account
                  </button>
                  <button
                    className="underline"
                    onClick={() => setInquiryId(item.id)}
                  >
                    Record paid visit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {registrationInquiryId && (
        <form
          key={registrationInquiryId}
          className="space-y-3 border rounded p-4"
          onSubmit={async event => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            try {
              await verifyRegistration.mutateAsync({
                inquiryId: registrationInquiryId,
                ownerId: String(data.get("ownerId")),
                ownerEmail: String(data.get("ownerEmail")),
                registeredAt: new Date(String(data.get("registeredAt"))),
                verified: true,
              });
              setRegistrationInquiryId("");
            } catch {
              /* visible mutation error below */
            }
          }}
        >
          <h2 className="font-bold">
            Verify a completed new Gingr registration
          </h2>
          <p>Inquiry: {registrationInquiryId}</p>
          <label className="block">
            Gingr owner ID{" "}
            <input
              name="ownerId"
              required
              maxLength={100}
              className="border ml-2"
            />
          </label>
          <label className="block">
            Email on the Gingr account{" "}
            <input
              name="ownerEmail"
              type="email"
              required
              maxLength={320}
              className="border ml-2"
            />
          </label>
          <label className="block">
            Account creation time (your local time){" "}
            <input
              name="registeredAt"
              type="datetime-local"
              step="1"
              required
              className="border ml-2"
            />
          </label>
          <label className="block">
            <input type="checkbox" required /> I verified this is a completed
            new account created after the inquiry and the email matches.
          </label>
          {verifyRegistration.error && (
            <p role="alert">{verifyRegistration.error.message}</p>
          )}
          <button
            disabled={verifyRegistration.isPending}
            className="rounded bg-[#48D597] p-3"
          >
            {verifyRegistration.isPending
              ? "Saving…"
              : "Save verified registration"}
          </button>
        </form>
      )}
      {inquiryId && (
        <form
          key={inquiryId}
          className="space-y-3 border rounded p-4"
          onSubmit={async event => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            try {
              await verify.mutateAsync({
                inquiryId,
                ownerId: String(data.get("ownerId")),
                invoiceId: String(data.get("invoiceId")),
                paidAt: new Date(String(data.get("paidAt"))),
                valueCents: Math.round(Number(data.get("value")) * 100),
                verified: true,
              });
              setInquiryId("");
            } catch {
              /* mutation error is shown below */
            }
          }}
        >
          <p>Inquiry: {inquiryId}</p>
          <label className="block">
            Gingr owner ID{" "}
            <input
              name="ownerId"
              required
              maxLength={100}
              className="border ml-2"
            />
          </label>
          <label className="block">
            Gingr invoice ID{" "}
            <input
              name="invoiceId"
              required
              maxLength={100}
              className="border ml-2"
            />
          </label>
          <label className="block">
            Payment date and time (your local time){" "}
            <input
              name="paidAt"
              type="datetime-local"
              required
              className="border ml-2"
            />
          </label>
          <label className="block">
            Net service revenue paid (USD, excluding tax/tips){" "}
            <input
              name="value"
              type="number"
              min="0.01"
              step="0.01"
              required
              className="border ml-2"
            />
          </label>
          <label className="block">
            <input type="checkbox" required /> I verified the owner match,
            completed visit, and payment in Gingr.
          </label>
          {verify.error && <p role="alert">{verify.error.message}</p>}
          <button
            disabled={verify.isPending}
            className="rounded bg-[#48D597] p-3"
          >
            {verify.isPending ? "Saving…" : "Save verified outcome"}
          </button>
        </form>
      )}
      <h2 className="text-xl font-bold">Verified registrations</h2>
      {registrations.data?.map(item => (
        <p key={item.ownerId}>
          Owner {item.ownerId} · {item.registeredAt.toLocaleString()} · Inquiry{" "}
          {item.inquiryId} · Not uploaded
        </p>
      ))}
      <h2 className="text-xl font-bold">Verified paid visits</h2>
      {outcomes.data?.map(item => (
        <p key={item.invoiceId}>
          Invoice {item.invoiceId} · Owner {item.ownerId} · $
          {(item.valueCents / 100).toFixed(2)} · {item.paidAt.toLocaleString()}{" "}
          · Not uploaded
        </p>
      ))}
      <a href="/admin/promos" className="underline">
        Promo administration
      </a>
    </main>
  );
}
