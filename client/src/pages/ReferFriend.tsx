/*
 * Metro Mutts — Refer a Friend Page
 * Brand: Green #48D597, Dark #345460
 * Plus Jakarta Sans typography, motion animations
 * Referral program with how-it-works, rewards, sharing, and FAQ
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { useBookingModal } from "@/contexts/BookingModalContext";
import {
  Gift,
  Users,
  Heart,
  Share2,
  Copy,
  Check,
  MessageCircle,
  Mail,
  ChevronDown,
  Sparkles,
  ArrowRight,
  DollarSign,
  Dog,
} from "lucide-react";
import { toast } from "sonner";

const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/refer-hero-metromutts_6200bf92.png";

const REFERRAL_LINK = "https://metromuttstulsa.com/refer";

const steps = [
  {
    num: "01",
    icon: Share2,
    title: "Share Your Link",
    desc: "Send your unique referral link to friends, family, or fellow dog lovers via text, email, or social media.",
  },
  {
    num: "02",
    icon: Dog,
    title: "Friend Books a Visit",
    desc: "Your friend signs up and books their pup's first daycare or boarding visit at Metro Mutts.",
  },
  {
    num: "03",
    icon: Gift,
    title: "You Both Get Rewarded",
    desc: "Once their first visit is complete, you both receive a credit toward your next service. Win-win!",
  },
];

const rewards = [
  {
    icon: DollarSign,
    label: "You Get",
    amount: "$15",
    detail: "credit toward any service",
    accent: true,
  },
  {
    icon: Heart,
    label: "They Get",
    amount: "$15",
    detail: "off their first visit",
    accent: false,
  },
  {
    icon: Users,
    label: "No Limit",
    amount: "Unlimited",
    detail: "referrals per customer",
    accent: false,
  },
];

const faqs = [
  {
    q: "Who can I refer?",
    a: "Anyone with a dog who hasn't visited Metro Mutts before! Friends, family, neighbors, coworkers, people you meet at the dog park — the more the merrier.",
  },
  {
    q: "How do I share my referral?",
    a: "Just mention our name! When your friend books their first visit, have them tell our front desk that you referred them. We'll apply the credit to both accounts.",
  },
  {
    q: "When do I receive my credit?",
    a: "Your $15 credit is applied after your friend completes their first visit. You'll see it on your account next time you check in.",
  },
  {
    q: "Is there a limit to how many friends I can refer?",
    a: "Nope! Refer as many friends as you'd like. There's no cap — every successful referral earns you another $15 credit.",
  },
  {
    q: "Can I combine referral credits with other promotions?",
    a: "Referral credits can be applied to any service (daycare, boarding, or grooming) but cannot be combined with other promotional offers.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#345460]/10 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="font-semibold text-[#345460] pr-8 group-hover:text-[#48D597] transition-colors">
          {q}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-[#345460]/40 shrink-0 transition-transform duration-300 ${
            open ? "rotate-180 text-[#48D597]" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-40 pb-5" : "max-h-0"
        }`}
      >
        <p className="text-[#345460]/65 leading-relaxed text-sm">{a}</p>
      </div>
    </div>
  );
}

export default function ReferFriend() {
  const { openBookingModal } = useBookingModal();
  const [copied, setCopied] = useState(false);
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(REFERRAL_LINK);
      setCopied(true);
      toast.success("Link copied! Share it with your friends.");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Couldn't copy — try selecting and copying manually.");
    }
  };

  const shareText = encodeURIComponent(
    "My dog loves Metro Mutts in Tulsa! Book your pup's first visit and we both get $15 off. Check them out:"
  );
  const shareUrl = encodeURIComponent(REFERRAL_LINK);

  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf8]">
      <Navbar />

      {/* ─── Hero ─── */}
      {/* GRADIENT CONFIG — adjust these values to control the overlay */}
      {/* direction: to-r (left→right), to-l (right→left), to-b (top→down), to-t (bottom→up) */}
      {/* color: base overlay color (hex) */}
      {/* from/via/to: opacity stops from 0-100 (percentage) */}
      <section className="relative h-[420px] sm:h-[380px] lg:h-[460px] overflow-hidden">
        <img
          src={HERO_IMG}
          alt="Two friends with their dogs at Metro Mutts"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Directional gradient overlay — edit inline style for full control */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, rgba(52, 84, 96, 1) 0%, rgba(52, 84, 96, 0.85) 40%, rgba(52, 84, 96, 0.5) 70%, rgba(52, 84, 96, 0.2) 100%)`,
          }}
        />
        <div className="relative container h-full flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#48D597]/20 text-[#48D597] text-sm font-bold mb-5 backdrop-blur-sm">
              <Gift className="w-4 h-4" />
              Referral Program
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 leading-tight">
              Share the Love,{" "}
              <span className="text-[#48D597]">Earn Rewards</span>
            </h1>
            <p className="text-white/75 text-lg lg:text-xl leading-relaxed max-w-xl">
              Refer a friend to Metro Mutts and you both get $15 off. Because
              good things are better shared — especially dog care.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[#48D597] font-bold text-sm uppercase tracking-widest">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#345460] mt-3">
              Three Simple Steps
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                className="relative text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                {/* Connector line (desktop only) */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] border-t-2 border-dashed border-[#48D597]/25" />
                )}

                <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-[#345460] mb-6 group-hover:scale-105 transition-transform duration-300">
                  <step.icon className="w-10 h-10 text-[#48D597]" />
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#48D597] text-[#345460] text-xs font-extrabold flex items-center justify-center">
                    {step.num}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#345460] mb-2">
                  {step.title}
                </h3>
                <p className="text-[#345460]/60 text-sm leading-relaxed max-w-xs mx-auto">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Rewards ─── */}
      <section className="py-20 lg:py-28 bg-[#345460]">
        <div className="container">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[#48D597] font-bold text-sm uppercase tracking-widest">
              Rewards
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
              Everyone Wins
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {rewards.map((r, i) => (
              <motion.div
                key={r.label}
                className={`rounded-2xl p-8 text-center ${
                  r.accent
                    ? "bg-[#48D597] text-[#345460]"
                    : "bg-white/10 text-white backdrop-blur-sm"
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <r.icon
                  className={`w-8 h-8 mx-auto mb-4 ${
                    r.accent ? "text-[#345460]" : "text-[#48D597]"
                  }`}
                />
                <p
                  className={`text-sm font-bold uppercase tracking-wider mb-2 ${
                    r.accent ? "text-[#345460]/70" : "text-white/50"
                  }`}
                >
                  {r.label}
                </p>
                <p className="text-4xl font-extrabold mb-1">{r.amount}</p>
                <p
                  className={`text-sm ${
                    r.accent ? "text-[#345460]/70" : "text-white/60"
                  }`}
                >
                  {r.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Share Section ─── */}
      <section className="py-20 lg:py-28">
        <div className="container max-w-3xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[#48D597] font-bold text-sm uppercase tracking-widest">
              Spread the Word
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#345460] mt-3 mb-4">
              Share With Friends
            </h2>
            <p className="text-[#345460]/60 max-w-lg mx-auto">
              The easiest way? Just tell your friend to mention your name at
              check-in. Or share the link below so they can learn more about us.
            </p>
          </motion.div>

          {/* Copy link bar */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg shadow-black/5 border border-[#345460]/8 p-2 flex items-center gap-2 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="flex-1 px-4 py-3 text-[#345460]/50 text-sm truncate font-mono">
              {REFERRAL_LINK}
            </div>
            <Button
              onClick={copyLink}
              className={`shrink-0 px-6 h-12 font-bold text-sm transition-all ${
                copied
                  ? "bg-[#48D597] text-[#345460]"
                  : "bg-[#345460] hover:bg-[#2a4550] text-white"
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-1.5" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-1.5" />
                  Copy Link
                </>
              )}
            </Button>
          </motion.div>

          {/* Share buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <a
              href={`sms:?body=${shareText}%20${shareUrl}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#345460]/5 text-[#345460] font-semibold text-sm hover:bg-[#345460]/10 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Text a Friend
            </a>
            <a
              href={`mailto:?subject=Check out Metro Mutts!&body=${shareText}%20${shareUrl}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#345460]/5 text-[#345460] font-semibold text-sm hover:bg-[#345460]/10 transition-colors"
            >
              <Mail className="w-4 h-4" />
              Send Email
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#345460]/5 text-[#345460] font-semibold text-sm hover:bg-[#345460]/10 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Share on Facebook
            </a>
          </motion.div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container max-w-3xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[#48D597] font-bold text-sm uppercase tracking-widest">
              Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#345460] mt-3">
              Referral FAQ
            </h2>
          </motion.div>

          <motion.div
            className="bg-[#fafaf8] rounded-2xl p-6 sm:p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Bottom CTA ─── */}
      <section className="py-20 lg:py-24 bg-[#345460]">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="w-8 h-8 text-[#48D597] mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Ready to Spread the Word?
            </h2>
            <p className="text-white/60 max-w-lg mx-auto mb-8">
              Every referral means another happy pup at Metro Mutts — and more
              savings for you. Start sharing today!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-[#48D597] hover:bg-[#3bc085] text-[#345460] font-bold text-base px-8 h-13 shadow-xl shadow-black/15 transition-all hover:-translate-y-0.5"
                onClick={copyLink}
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5 mr-1.5" />
                    Link Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5 mr-1.5" />
                    Copy Referral Link
                  </>
                )}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 font-semibold text-base px-8 h-13 bg-transparent"
                onClick={openBookingModal}
              >
                Book a Visit
                <ArrowRight className="w-5 h-5 ml-1" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
