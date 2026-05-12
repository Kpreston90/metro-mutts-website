/**
 * Admin Seasonal Messages Management Page
 * Allows the owner/admin to create, edit, toggle, schedule, and delete
 * ticker messages that appear in the SocialProofTicker.
 */
import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import {
  Plus,
  Megaphone,
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  Calendar,
  ArrowLeft,
  Loader2,
  XCircle,
  Tag,
} from "lucide-react";
import { Link } from "wouter";

type MessageFormData = {
  message: string;
  highlight: string;
  bookable: boolean;
  isActive: boolean;
  startsAt: string;
  endsAt: string;
  priority: number;
};

const emptyForm: MessageFormData = {
  message: "",
  highlight: "",
  bookable: false,
  isActive: true,
  startsAt: "",
  endsAt: "",
  priority: 1,
};

export default function AdminMessages() {
  const { user, loading, isAuthenticated } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<MessageFormData>(emptyForm);

  const utils = trpc.useUtils();
  const { data: messages, isLoading: loadingMessages } = trpc.seasonalMessages.list.useQuery(
    undefined,
    { enabled: isAuthenticated && user?.role === "admin" }
  );

  const createMutation = trpc.seasonalMessages.create.useMutation({
    onSuccess: () => {
      utils.seasonalMessages.list.invalidate();
      setShowForm(false);
      setForm(emptyForm);
    },
  });
  const updateMutation = trpc.seasonalMessages.update.useMutation({
    onSuccess: () => {
      utils.seasonalMessages.list.invalidate();
      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);
    },
  });
  const deleteMutation = trpc.seasonalMessages.delete.useMutation({
    onSuccess: () => utils.seasonalMessages.list.invalidate(),
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
          <Megaphone className="w-12 h-12 text-[#345460]/30 mx-auto" />
          <h1 className="text-xl font-bold text-[#345460]">Admin Access Required</h1>
          <p className="text-[#345460]/60">Please sign in to manage ticker messages.</p>
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
          <p className="text-[#345460]/60">Only admins can manage ticker messages.</p>
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
      message: form.message,
      highlight: form.highlight || null,
      bookable: form.bookable,
      isActive: form.isActive,
      startsAt: form.startsAt ? new Date(form.startsAt) : null,
      endsAt: form.endsAt ? new Date(form.endsAt) : null,
      priority: form.priority,
    };

    if (editingId) {
      updateMutation.mutate({ id: editingId, ...payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const handleEdit = (msg: any) => {
    setEditingId(msg.id);
    setForm({
      message: msg.message,
      highlight: msg.highlight || "",
      bookable: msg.bookable === "true",
      isActive: msg.isActive === "true",
      startsAt: msg.startsAt ? new Date(msg.startsAt).toISOString().split("T")[0] : "",
      endsAt: msg.endsAt ? new Date(msg.endsAt).toISOString().split("T")[0] : "",
      priority: msg.priority,
    });
    setShowForm(true);
  };

  const handleToggleActive = (msg: any) => {
    updateMutation.mutate({
      id: msg.id,
      isActive: msg.isActive !== "true",
    });
  };

  const getStatusBadge = (msg: any) => {
    const now = new Date();
    if (msg.isActive !== "true") {
      return <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">Inactive</span>;
    }
    if (msg.startsAt && new Date(msg.startsAt) > now) {
      return <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">Scheduled</span>;
    }
    if (msg.endsAt && new Date(msg.endsAt) < now) {
      return <span className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-600">Expired</span>;
    }
    return <span className="text-xs px-2 py-0.5 rounded-full bg-[#48D597]/10 text-[#48D597]">Active</span>;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Link href="/admin/promos" className="flex items-center gap-2 text-[#345460]/60 hover:text-[#345460] text-sm transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Promo Codes
              </Link>
              <span className="text-[#345460]/30">|</span>
              <Link href="/" className="text-[#345460]/60 hover:text-[#345460] text-sm transition-colors">
                Back to site
              </Link>
            </div>
            <h1 className="text-2xl font-bold text-[#345460]">Ticker Messages</h1>
            <p className="text-[#345460]/60 text-sm">
              Manage seasonal announcements that rotate in the site header ticker
            </p>
          </div>
          <Button
            onClick={() => {
              setShowForm(true);
              setEditingId(null);
              setForm(emptyForm);
            }}
            className="bg-[#48D597] hover:bg-[#3bc085] text-[#345460] font-bold gap-2"
          >
            <Plus className="w-4 h-4" />
            New Message
          </Button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-xl border border-gray-100 p-6 mb-8 shadow-sm">
            <h2 className="text-lg font-bold text-[#345460] mb-4">
              {editingId ? "Edit Message" : "New Ticker Message"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#345460] mb-1">
                  Message Text *
                </label>
                <input
                  type="text"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="e.g., Summer special: 20% off all boarding!"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-[#48D597]/30 focus:border-[#48D597] outline-none"
                  required
                />
                <p className="text-xs text-[#345460]/40 mt-1">
                  This is the main text shown in the ticker bar
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#345460] mb-1">
                  Highlight Text (optional)
                </label>
                <input
                  type="text"
                  value={form.highlight}
                  onChange={(e) => setForm({ ...form, highlight: e.target.value })}
                  placeholder="e.g., Book now → or Limited time!"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-[#48D597]/30 focus:border-[#48D597] outline-none"
                />
                <p className="text-xs text-[#345460]/40 mt-1">
                  Shown in accent color after the main text. Add "→" to make it look clickable.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#345460] mb-1">Priority</label>
                  <select
                    value={form.priority}
                    onChange={(e) => setForm({ ...form, priority: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-[#48D597]/30 focus:border-[#48D597] outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? "(Low)" : n === 5 ? "(Med)" : n === 10 ? "(High)" : ""}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-end gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.bookable}
                      onChange={(e) => setForm({ ...form, bookable: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-300 text-[#48D597] focus:ring-[#48D597]"
                    />
                    <span className="text-sm text-[#345460]">Opens booking modal</span>
                  </label>
                </div>

                <div className="flex items-end gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.isActive}
                      onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-300 text-[#48D597] focus:ring-[#48D597]"
                    />
                    <span className="text-sm text-[#345460]">Active immediately</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#345460] mb-1">
                    <Calendar className="w-3.5 h-3.5 inline mr-1" />
                    Start Date (optional)
                  </label>
                  <input
                    type="date"
                    value={form.startsAt}
                    onChange={(e) => setForm({ ...form, startsAt: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-[#48D597]/30 focus:border-[#48D597] outline-none"
                  />
                  <p className="text-xs text-[#345460]/40 mt-1">Leave blank to start immediately</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#345460] mb-1">
                    <Calendar className="w-3.5 h-3.5 inline mr-1" />
                    End Date (optional)
                  </label>
                  <input
                    type="date"
                    value={form.endsAt}
                    onChange={(e) => setForm({ ...form, endsAt: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-[#48D597]/30 focus:border-[#48D597] outline-none"
                  />
                  <p className="text-xs text-[#345460]/40 mt-1">Leave blank to never expire</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="bg-[#48D597] hover:bg-[#3bc085] text-[#345460] font-bold"
                >
                  {(createMutation.isPending || updateMutation.isPending) && (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  )}
                  {editingId ? "Update Message" : "Create Message"}
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

        {/* Messages List */}
        {loadingMessages ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-[#48D597]" />
          </div>
        ) : !messages?.length ? (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
            <Megaphone className="w-12 h-12 text-[#345460]/15 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#345460]/70 mb-2">No ticker messages yet</h3>
            <p className="text-sm text-[#345460]/50 mb-6 max-w-md mx-auto">
              Create seasonal announcements, holiday specials, or promotional messages
              that will rotate in the site header ticker alongside reviews and availability.
            </p>
            <Button
              onClick={() => {
                setShowForm(true);
                setEditingId(null);
                setForm(emptyForm);
              }}
              className="bg-[#48D597] hover:bg-[#3bc085] text-[#345460] font-bold gap-2"
            >
              <Plus className="w-4 h-4" />
              Create First Message
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`bg-white rounded-xl border p-4 transition-all ${
                  msg.isActive === "true" ? "border-gray-100" : "border-gray-100 opacity-60"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Megaphone className="w-4 h-4 text-[#FB923C] flex-shrink-0" />
                      <span className="text-sm font-medium text-[#345460] truncate">
                        {msg.message}
                      </span>
                    </div>
                    {msg.highlight && (
                      <p className="text-xs text-[#FB923C] font-semibold ml-6 mb-1">
                        {msg.highlight}
                      </p>
                    )}
                    <div className="flex items-center gap-3 ml-6 mt-2">
                      {getStatusBadge(msg)}
                      {msg.bookable === "true" && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-[#FB923C]/10 text-[#FB923C]">
                          Bookable
                        </span>
                      )}
                      <span className="text-xs text-[#345460]/40">
                        Priority: {msg.priority}
                      </span>
                      {msg.startsAt && (
                        <span className="text-xs text-[#345460]/40">
                          From: {new Date(msg.startsAt).toLocaleDateString()}
                        </span>
                      )}
                      {msg.endsAt && (
                        <span className="text-xs text-[#345460]/40">
                          Until: {new Date(msg.endsAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => handleToggleActive(msg)}
                      className={`p-2 rounded-lg transition-colors ${
                        msg.isActive === "true"
                          ? "text-[#48D597] hover:bg-[#48D597]/10"
                          : "text-[#345460]/30 hover:bg-gray-100"
                      }`}
                      title={msg.isActive === "true" ? "Deactivate" : "Activate"}
                    >
                      {msg.isActive === "true" ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleEdit(msg)}
                      className="p-2 rounded-lg text-[#345460]/40 hover:text-[#345460] hover:bg-gray-100 transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("Delete this message? This cannot be undone.")) {
                          deleteMutation.mutate({ id: msg.id });
                        }
                      }}
                      className="p-2 rounded-lg text-[#345460]/30 hover:text-red-500 hover:bg-red-50 transition-colors"
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

        {/* Info box */}
        <div className="mt-8 bg-[#345460]/5 rounded-xl p-4 border border-[#345460]/10">
          <h3 className="text-sm font-semibold text-[#345460] mb-2">How Ticker Messages Work</h3>
          <ul className="text-xs text-[#345460]/60 space-y-1">
            <li>• Messages rotate in the header ticker alongside real-time availability and reviews</li>
            <li>• Higher priority messages appear more frequently in the rotation</li>
            <li>• Use start/end dates to schedule seasonal promotions (e.g., holiday specials)</li>
            <li>• "Bookable" messages open the booking modal when clicked</li>
            <li>• Highlight text appears in accent color (orange) — add "→" to suggest action</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
