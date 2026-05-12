/**
 * Admin Promo Codes Management Page
 * Allows the owner/admin to create, edit, deactivate promo codes
 * and view redemption history.
 */
import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import {
  Plus,
  Tag,
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  Gift,
  Users,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowLeft,
  Loader2,
  Copy,
} from "lucide-react";
import { Link } from "wouter";

type PromoFormData = {
  code: string;
  description: string;
  serviceType: "daycare" | "boarding" | "grooming" | "all";
  discountType: "percentage" | "fixed_amount" | "free_night";
  discountValue: number;
  maxRedemptions: number | null;
  newCustomersOnly: boolean;
  expiresAt: string;
};

const emptyForm: PromoFormData = {
  code: "",
  description: "",
  serviceType: "all",
  discountType: "free_night",
  discountValue: 1,
  maxRedemptions: null,
  newCustomersOnly: false,
  expiresAt: "",
};

export default function AdminPromos() {
  const { user, loading, isAuthenticated } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<PromoFormData>(emptyForm);
  const [viewRedemptions, setViewRedemptions] = useState<number | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const utils = trpc.useUtils();
  const { data: promoCodes, isLoading: loadingCodes } = trpc.promo.list.useQuery(
    undefined,
    { enabled: isAuthenticated && user?.role === "admin" }
  );
  const { data: redemptions, isLoading: loadingRedemptions } = trpc.promo.redemptions.useQuery(
    viewRedemptions ? { promoCodeId: viewRedemptions } : undefined,
    { enabled: viewRedemptions !== null }
  );

  const createMutation = trpc.promo.create.useMutation({
    onSuccess: () => {
      utils.promo.list.invalidate();
      setShowForm(false);
      setForm(emptyForm);
    },
  });
  const updateMutation = trpc.promo.update.useMutation({
    onSuccess: () => {
      utils.promo.list.invalidate();
      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);
    },
  });
  const deleteMutation = trpc.promo.delete.useMutation({
    onSuccess: () => utils.promo.list.invalidate(),
  });
  const updateRedemptionMutation = trpc.promo.updateRedemption.useMutation({
    onSuccess: () => utils.promo.redemptions.invalidate(),
  });

  // Auth gate
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-[#48D597]" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <Tag className="w-12 h-12 text-[#345460]/30 mx-auto" />
          <h1 className="text-xl font-bold text-[#345460]">Admin Access Required</h1>
          <p className="text-[#345460]/60">Please sign in to manage promo codes.</p>
          <Button asChild className="bg-[#48D597] hover:bg-[#3bc085] text-[#345460] font-bold">
            <a href={getLoginUrl()}>Sign In</a>
          </Button>
        </div>
      </div>
    );
  }

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <XCircle className="w-12 h-12 text-red-400 mx-auto" />
          <h1 className="text-xl font-bold text-[#345460]">Access Denied</h1>
          <p className="text-[#345460]/60">Only admins can manage promo codes.</p>
          <Button asChild variant="outline">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      code: form.code.toUpperCase(),
      description: form.description,
      serviceType: form.serviceType,
      discountType: form.discountType,
      discountValue: form.discountValue,
      maxRedemptions: form.maxRedemptions,
      newCustomersOnly: form.newCustomersOnly,
      expiresAt: form.expiresAt ? new Date(form.expiresAt) : null,
    };

    if (editingId) {
      updateMutation.mutate({ id: editingId, ...payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const handleEdit = (promo: any) => {
    setEditingId(promo.id);
    setForm({
      code: promo.code,
      description: promo.description,
      serviceType: promo.serviceType,
      discountType: promo.discountType,
      discountValue: promo.discountValue,
      maxRedemptions: promo.maxRedemptions,
      newCustomersOnly: promo.newCustomersOnly === "true",
      expiresAt: promo.expiresAt ? new Date(promo.expiresAt).toISOString().split("T")[0] : "",
    });
    setShowForm(true);
  };

  const handleToggleActive = (promo: any) => {
    updateMutation.mutate({
      id: promo.id,
      isActive: promo.isActive !== "true",
    });
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getDiscountLabel = (type: string, value: number) => {
    if (type === "free_night") return `${value} Free Night${value > 1 ? "s" : ""}`;
    if (type === "percentage") return `${value}% Off`;
    if (type === "fixed_amount") return `$${value} Off`;
    return `${value}`;
  };

  // Redemptions view
  if (viewRedemptions !== null) {
    const promoName = promoCodes?.find((p) => p.id === viewRedemptions)?.code || "Unknown";
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setViewRedemptions(null)}
            className="flex items-center gap-2 text-[#345460]/60 hover:text-[#345460] mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Promo Codes
          </button>

          <h1 className="text-2xl font-bold text-[#345460] mb-1">
            Redemptions: {promoName}
          </h1>
          <p className="text-[#345460]/60 text-sm mb-6">
            {redemptions?.length || 0} total redemptions
          </p>

          {loadingRedemptions ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-[#48D597]" />
            </div>
          ) : !redemptions?.length ? (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
              <Users className="w-10 h-10 text-[#345460]/20 mx-auto mb-3" />
              <p className="text-[#345460]/50">No redemptions yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {redemptions.map((r) => (
                <div
                  key={r.id}
                  className="bg-white rounded-xl border border-gray-100 p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${
                      r.status === "confirmed" ? "bg-[#48D597]" :
                      r.status === "expired" ? "bg-red-400" : "bg-amber-400"
                    }`} />
                    <div>
                      <p className="font-semibold text-[#345460] text-sm">{r.customerName}</p>
                      <p className="text-xs text-[#345460]/50">{r.customerEmail}</p>
                      {r.customerPhone && (
                        <p className="text-xs text-[#345460]/40">{r.customerPhone}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-[#345460]/50 capitalize">{r.serviceType}</span>
                    <span className="text-xs text-[#345460]/40">
                      {new Date(r.redeemedAt).toLocaleDateString()}
                    </span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => updateRedemptionMutation.mutate({ id: r.id, status: "confirmed" })}
                        className={`p-1.5 rounded-lg transition-colors ${
                          r.status === "confirmed"
                            ? "bg-[#48D597]/20 text-[#48D597]"
                            : "hover:bg-[#48D597]/10 text-[#345460]/30"
                        }`}
                        title="Mark confirmed"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => updateRedemptionMutation.mutate({ id: r.id, status: "expired" })}
                        className={`p-1.5 rounded-lg transition-colors ${
                          r.status === "expired"
                            ? "bg-red-100 text-red-500"
                            : "hover:bg-red-50 text-[#345460]/30"
                        }`}
                        title="Mark expired"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Link href="/" className="flex items-center gap-2 text-[#345460]/60 hover:text-[#345460] text-sm transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to site
              </Link>
              <span className="text-[#345460]/30">|</span>
              <Link href="/admin/messages" className="text-[#345460]/60 hover:text-[#345460] text-sm transition-colors">
                Ticker Messages
              </Link>
            </div>
            <h1 className="text-2xl font-bold text-[#345460]">Promo Codes</h1>
            <p className="text-[#345460]/60 text-sm">
              Create and manage promotional offers for Metro Mutts
            </p>
          </div>
          <Button
            onClick={() => {
              setShowForm(true);
              setEditingId(null);
              setForm(emptyForm);
            }}
            className="bg-[#48D597] hover:bg-[#3bc085] text-[#345460] font-bold"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Code
          </Button>
        </div>

        {/* Create/Edit Form */}
        {showForm && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-8">
            <h2 className="font-bold text-[#345460] mb-4">
              {editingId ? "Edit Promo Code" : "Create New Promo Code"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-[#345460]/70 mb-1 block">
                    Code *
                  </label>
                  <input
                    type="text"
                    value={form.code}
                    onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                    placeholder="e.g., FIRSTNIGHT"
                    required
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm uppercase focus:outline-none focus:ring-2 focus:ring-[#48D597]/50"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-[#345460]/70 mb-1 block">
                    Service
                  </label>
                  <select
                    value={form.serviceType}
                    onChange={(e) => setForm({ ...form, serviceType: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#48D597]/50"
                  >
                    <option value="all">All Services</option>
                    <option value="daycare">Daycare Only</option>
                    <option value="boarding">Boarding Only</option>
                    <option value="grooming">Grooming Only</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-[#345460]/70 mb-1 block">
                  Description *
                </label>
                <input
                  type="text"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="e.g., First night of boarding free for new customers"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#48D597]/50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-medium text-[#345460]/70 mb-1 block">
                    Discount Type
                  </label>
                  <select
                    value={form.discountType}
                    onChange={(e) => setForm({ ...form, discountType: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#48D597]/50"
                  >
                    <option value="free_night">Free Night(s)</option>
                    <option value="percentage">Percentage Off</option>
                    <option value="fixed_amount">Fixed $ Off</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-[#345460]/70 mb-1 block">
                    Value *
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={form.discountValue}
                    onChange={(e) => setForm({ ...form, discountValue: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#48D597]/50"
                  />
                  <p className="text-[10px] text-[#345460]/40 mt-0.5">
                    {form.discountType === "free_night" && "Number of free nights"}
                    {form.discountType === "percentage" && "Percentage (e.g., 20 = 20%)"}
                    {form.discountType === "fixed_amount" && "Dollar amount off"}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-[#345460]/70 mb-1 block">
                    Max Uses
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={form.maxRedemptions || ""}
                    onChange={(e) => setForm({ ...form, maxRedemptions: e.target.value ? parseInt(e.target.value) : null })}
                    placeholder="Unlimited"
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#48D597]/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-[#345460]/70 mb-1 block">
                    Expires (optional)
                  </label>
                  <input
                    type="date"
                    value={form.expiresAt}
                    onChange={(e) => setForm({ ...form, expiresAt: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#48D597]/50"
                  />
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.newCustomersOnly}
                      onChange={(e) => setForm({ ...form, newCustomersOnly: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-300 text-[#48D597] focus:ring-[#48D597]"
                    />
                    <span className="text-sm text-[#345460]/70">New customers only</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="bg-[#48D597] hover:bg-[#3bc085] text-[#345460] font-bold"
                >
                  {(createMutation.isPending || updateMutation.isPending) ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : null}
                  {editingId ? "Update Code" : "Create Code"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setForm(emptyForm);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Promo Codes List */}
        {loadingCodes ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-[#48D597]" />
          </div>
        ) : !promoCodes?.length ? (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
            <Tag className="w-12 h-12 text-[#345460]/20 mx-auto mb-3" />
            <h3 className="font-bold text-[#345460] mb-1">No promo codes yet</h3>
            <p className="text-[#345460]/50 text-sm mb-4">
              Create your first promo code to start offering deals
            </p>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-[#48D597] hover:bg-[#3bc085] text-[#345460] font-bold"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create First Code
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {promoCodes.map((promo) => (
              <div
                key={promo.id}
                className={`bg-white rounded-xl border p-5 transition-all ${
                  promo.isActive === "true"
                    ? "border-gray-100 hover:border-[#48D597]/30"
                    : "border-gray-100 opacity-60"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                      promo.isActive === "true" ? "bg-[#48D597]/10" : "bg-gray-100"
                    }`}>
                      <Tag className={`w-5 h-5 ${promo.isActive === "true" ? "text-[#48D597]" : "text-gray-400"}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <button
                          onClick={() => handleCopyCode(promo.code)}
                          className="font-mono font-bold text-[#345460] text-lg hover:text-[#48D597] transition-colors flex items-center gap-1.5"
                          title="Click to copy"
                        >
                          {promo.code}
                          <Copy className={`w-3.5 h-3.5 ${copiedCode === promo.code ? "text-[#48D597]" : "text-[#345460]/30"}`} />
                        </button>
                        {promo.isActive !== "true" && (
                          <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-semibold">
                            Inactive
                          </span>
                        )}
                        {promo.newCustomersOnly === "true" && (
                          <span className="text-[10px] bg-[#FB923C]/10 text-[#FB923C] px-2 py-0.5 rounded-full font-semibold">
                            New only
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[#345460]/70 mb-1">{promo.description}</p>
                      <div className="flex items-center gap-3 text-xs text-[#345460]/50">
                        <span className="flex items-center gap-1">
                          <Gift className="w-3 h-3" />
                          {getDiscountLabel(promo.discountType, promo.discountValue)}
                        </span>
                        <span className="capitalize">{promo.serviceType}</span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {promo.currentRedemptions}/{promo.maxRedemptions || "∞"} used
                        </span>
                        {promo.expiresAt && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Expires {new Date(promo.expiresAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setViewRedemptions(promo.id)}
                      className="p-2 rounded-lg hover:bg-gray-100 text-[#345460]/40 hover:text-[#345460] transition-colors"
                      title="View redemptions"
                    >
                      <Users className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleToggleActive(promo)}
                      className="p-2 rounded-lg hover:bg-gray-100 text-[#345460]/40 hover:text-[#345460] transition-colors"
                      title={promo.isActive === "true" ? "Deactivate" : "Activate"}
                    >
                      {promo.isActive === "true" ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleEdit(promo)}
                      className="p-2 rounded-lg hover:bg-gray-100 text-[#345460]/40 hover:text-[#345460] transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete promo code "${promo.code}"? This cannot be undone.`)) {
                          deleteMutation.mutate({ id: promo.id });
                        }
                      }}
                      className="p-2 rounded-lg hover:bg-red-50 text-[#345460]/40 hover:text-red-500 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
