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
  const utils = trpc.useUtils();
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
        Recent 100 inquiries and outcomes. Ad-platform uploads are disabled.
        Confirm owner identity using the inquiry email or phone and verify a
        completed, paid visit in Gingr before recording an outcome. Closed
        invoices alone do not prove payment.
      </p>
      {(inquiries.error || outcomes.error) && (
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
                  {item.name}
                  <br />
                  {item.email}
                  <br />
                  {item.phone}
                </td>
                <td className="p-2">
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
      <h2 className="text-xl font-bold">Verified outcomes</h2>
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
