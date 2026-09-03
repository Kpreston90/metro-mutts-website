/*
 * Metro Mutts Pricing Page — Redesigned
 * Brand: Green #48D597, Dark #345460
 * All-on-one-page layout with anchor nav, quick-glance summary,
 * simplified daycare packages, and "starting at" grooming prices
 */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { useBookingModal } from "@/contexts/BookingModalContext";
import { pricing } from "@/data/pricing";
import {
  Sun,
  Moon,
  Bed,
  Scissors,
  ArrowRight,
  Check,
  Info,
  Sparkles,
  Clock,
  Dog,
  Phone,
  ChevronDown,
  HelpCircle,
  MessageCircle,
} from "lucide-react";

/* ─── FAQ Accordion Item ─── */
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50/50 transition-colors"
      >
        <span className="font-semibold text-[#345460] pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-[#345460]/40 flex-shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-60" : "max-h-0"
        }`}
      >
        <p className="px-6 pb-5 text-[#345460]/60 text-sm leading-relaxed">
          {answer}
        </p>
      </div>
    </motion.div>
  );
}

const GINGR_URL =
  "https://metromutts.portal.gingrapp.com/public/login/Ii9zZWN1cmUvaG9tZSI=";

const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/vet-referred-facility-v3-DCNGQE4pnuuDpVkZkPVYMQ.webp";
const DAYCARE_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/new-daycare-9JTdpbodWw4zW5xQhTfmzM.webp";
const BOARDING_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/boarding-suites-staff-water_b9c9cf4a.png";
const GROOMING_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/grooming-dog-enhanced_04ac8ef9.png";

/* ─── Daycare Packages ─── */
const fullDayPackages = pricing.daycare.packages.map((pkg) => ({
  ...pkg,
  popular: pkg.days === 20,
}));

/* ─── Grooming Add-Ons ─── */
const groomingAddOns = [
  { name: "De-matting", price: "$30" },
  {
    name: "Nail buffing",
    price: "$15",
    note: "We use a Dremel if your pup is comfortable!",
  },
  {
    name: "Teeth brushing",
    price: "$10",
    note: "Brush with doggy toothpaste + breath freshening gel",
  },
  { name: "Ear cleaning", price: "$15", note: "Flush and wipe ears" },
  { name: "Anal gland expression", price: "$15" },
  { name: "Face, feet & fanny trim", price: "$15" },
  { name: "Poodle design", price: "$40" },
  { name: "Flea & tick treatment", price: "$30" },
];

const sections = [
  { id: "daycare", label: "Daycare", icon: Sun },
  { id: "boarding", label: "Boarding", icon: Bed },
  { id: "grooming", label: "Grooming", icon: Scissors },
];

export default function Pricing() {
  const { openBookingModal } = useBookingModal();
  const [daycareSub, setDaycareSub] = useState<"full" | "half">("full");
  const [activeSection, setActiveSection] = useState("daycare");

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Track which section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const singlePrice = daycareSub === "full" ? pricing.daycare.fullDay : pricing.daycare.halfDay;
  const additionalPrice = pricing.daycare.sibling;
  const fullRate = pricing.daycare.fullDay;

  return (
    <div className="min-h-screen flex flex-col bg-[oklch(0.98_0.003_90)]">
      <Navbar />

      {/* ─── Hero ─── */}
      <section className="relative h-[340px] sm:h-[320px] lg:h-[380px] overflow-hidden">
        <img
          src={HERO_IMG}
          alt="Dogs playing at Metro Mutts"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#345460]/90 via-[#345460]/75 to-[#345460]/50" />
        <div className="relative container h-full flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#48D597]/20 text-[#48D597] text-sm font-bold mb-5 backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              Transparent Pricing
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4">
              Services &{" "}
              <span className="text-[#48D597]">Pricing</span>
            </h1>
            <p className="text-white/70 text-lg max-w-xl leading-relaxed">
              Simple, honest pricing for Tulsa's best dog care. No hidden fees.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Quick-Glance Summary ─── */}
      <div className="relative -mt-12 z-10 mb-4">
        <div className="container">
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                label: "Daycare",
                price: "$32",
                unit: "/day",
                sub: "Full day drop-in",
                icon: Sun,
                anchor: "#daycare",
              },
              {
                label: "Boarding",
                price: "$50",
                unit: "/night",
                sub: "Includes daycare",
                icon: Bed,
                anchor: "#boarding",
              },
              {
                label: "Grooming",
                price: "$30",
                unit: "+",
                sub: "Starting at",
                icon: Scissors,
                anchor: "#grooming",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.anchor}
                  className="group bg-white rounded-2xl p-6 shadow-xl shadow-black/8 border border-gray-100 hover:border-[#48D597]/30 hover:shadow-[#48D597]/10 transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#48D597]/10 flex items-center justify-center group-hover:bg-[#48D597]/20 transition-colors">
                      <Icon className="w-5 h-5 text-[#48D597]" />
                    </div>
                    <span className="text-sm font-bold text-[#345460]/50 uppercase tracking-wider">
                      {item.label}
                    </span>
                  </div>
                  <p className="text-xs text-[#345460]/40 mb-1">{item.sub}</p>
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-3xl font-extrabold text-[#345460]">
                      {item.price}
                    </span>
                    <span className="text-[#345460]/40 text-sm font-medium">
                      {item.unit}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── Sticky Anchor Nav ─── */}
      <div className="sticky top-16 lg:top-20 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container">
          <div className="flex gap-1 py-3">
            {sections.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeSection === sec.id;
              return (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    isActive
                      ? "bg-[#48D597] text-[#345460] shadow-lg shadow-[#48D597]/20"
                      : "text-[#345460]/60 hover:text-[#345460] hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {sec.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <main className="flex-1">
        {/* ═══════════════════════════════════════════════════
           DAYCARE SECTION
           ═══════════════════════════════════════════════════ */}
        <section id="daycare" className="py-16 lg:py-20 scroll-mt-32">
          <div className="container">
            {/* Header with image */}
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-12">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#48D597]/10 text-[#48D597] text-xs font-bold mb-4 uppercase tracking-wider">
                  <Sun className="w-3.5 h-3.5" />
                  Daycare
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#345460] tracking-tight mb-4">
                  Dog Daycare
                </h2>
                <p className="text-[#345460]/70 text-lg leading-relaxed mb-4">
                  Full day (5+ hours) or half day (under 5 hours) — your pup
                  gets supervised play, socialization, and loving care all day
                  long.
                </p>
                <div className="flex items-center gap-3 text-sm text-[#345460]/60">
                  <Clock className="w-4 h-4 text-[#48D597]" />
                  Mon–Fri: 7 AM – 6 PM &nbsp;|&nbsp; Sat–Sun: 9 AM – 5 PM
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl shadow-black/10">
                <img
                  src={DAYCARE_IMG}
                  alt="Dogs playing at Metro Mutts daycare"
                  className="w-full h-64 lg:h-80 object-cover"
                />
              </div>
            </div>

            {/* Full / Half toggle */}
            <div className="flex gap-2 mb-8">
              <button
                onClick={() => {
                  setDaycareSub("full");
                }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  daycareSub === "full"
                    ? "bg-[#345460] text-white shadow-lg"
                    : "bg-gray-100 text-[#345460]/60 hover:bg-gray-200"
                }`}
              >
                <Sun className="w-4 h-4" />
                Full Day (5+ hrs)
              </button>
              <button
                onClick={() => {
                  setDaycareSub("half");
                }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  daycareSub === "half"
                    ? "bg-[#345460] text-white shadow-lg"
                    : "bg-gray-100 text-[#345460]/60 hover:bg-gray-200"
                }`}
              >
                <Moon className="w-4 h-4" />
                Half Day (&lt;5 hrs)
              </button>
            </div>

            {/* Single day rate cards */}
            <div className="grid sm:grid-cols-2 gap-5 mb-10">
              <div className="bg-white rounded-2xl border border-gray-100 p-7 shadow-lg shadow-black/5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-[#48D597]/10 flex items-center justify-center">
                    <Dog className="w-5 h-5 text-[#48D597]" />
                  </div>
                  <h3 className="font-bold text-[#345460]">One Dog</h3>
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-extrabold text-[#345460]">
                    ${singlePrice}
                  </span>
                  <span className="text-[#345460]/50 text-sm font-medium">
                    / day
                  </span>
                </div>
                <p className="text-xs text-[#345460]/40">
                  Single-day drop-in rate
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-7 shadow-lg shadow-black/5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-[#48D597]/10 flex items-center justify-center">
                    <Dog className="w-5 h-5 text-[#48D597]" />
                  </div>
                  <h3 className="font-bold text-[#345460]">
                    Each Additional Dog
                  </h3>
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-extrabold text-[#345460]">
                    ${additionalPrice}
                  </span>
                  <span className="text-[#345460]/50 text-sm font-medium">
                    / day
                  </span>
                </div>
                <p className="text-xs text-[#345460]/40">
                  Bring the whole pack & save
                </p>
              </div>
            </div>

            {daycareSub === "full" ? (
              <div className="rounded-2xl bg-[#345460] p-8 shadow-xl lg:p-10">
                <h3 className="mb-1 text-xl font-extrabold text-white">Full Day Packages</h3>
                <p className="mb-8 text-sm text-white/50">Save with an approved full-day package.</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {fullDayPackages.map((pkg) => {
                    const perDay = (pkg.price / pkg.days).toFixed(0);
                    const savings = fullRate * pkg.days - pkg.price;
                    return (
                      <div
                        key={pkg.days}
                        className={`relative rounded-xl p-6 ${pkg.popular ? "bg-[#48D597] text-[#345460]" : "border border-white/10 bg-white/5 text-white"}`}
                      >
                        {pkg.popular && <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-[#FB923C] px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">Best Value</span>}
                        <p className={`mb-3 text-sm font-bold ${pkg.popular ? "text-[#345460]/70" : "text-white/50"}`}>{pkg.days} Days</p>
                        <p className="text-3xl font-extrabold">${pkg.price}</p>
                        <div className="mt-3 flex items-center justify-between text-sm">
                          <span className={pkg.popular ? "text-[#345460]/60" : "text-white/40"}>${perDay}/day</span>
                          <span className={pkg.popular ? "font-semibold text-[#345460]/80" : "font-semibold text-[#48D597]"}>Save ${savings}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-[#345460]/10 bg-[#345460]/5 p-6 text-center text-sm leading-relaxed text-[#345460]/70">
                Half-day daycare is $20 per dog. Contact our team for current multi-day options.
              </div>
            )}
          </div>
        </section>

        {/* Divider */}
        <div className="container">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </div>

        {/* ═══════════════════════════════════════════════════
           BOARDING SECTION
           ═══════════════════════════════════════════════════ */}
        <section id="boarding" className="py-16 lg:py-20 scroll-mt-32">
          <div className="container">
            {/* Header with image */}
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-12">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#48D597]/10 text-[#48D597] text-xs font-bold mb-4 uppercase tracking-wider">
                  <Bed className="w-3.5 h-3.5" />
                  Boarding
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#345460] tracking-tight mb-4">
                  Overnight Boarding
                </h2>
                <p className="text-[#345460]/70 text-lg leading-relaxed mb-4">
                  A comfortable home away from home. Spacious suites, loving
                  staff, and a full day of daycare included with every night's
                  stay.
                </p>
                <div className="flex items-center gap-3 text-sm text-[#345460]/60">
                  <Clock className="w-4 h-4 text-[#48D597]" />
                  Check-in during regular business hours
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl shadow-black/10">
                <img
                  src={BOARDING_IMG}
                  alt="Metro Mutts boarding suites"
                  className="w-full h-64 lg:h-80 object-cover"
                />
              </div>
            </div>

            {/* Pricing cards */}
            <div className="grid sm:grid-cols-2 gap-5 mb-10">
              <div className="bg-white rounded-2xl border border-gray-100 p-7 shadow-lg shadow-black/5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-[#48D597]/10 flex items-center justify-center">
                    <Bed className="w-5 h-5 text-[#48D597]" />
                  </div>
                  <h3 className="font-bold text-[#345460]">One Dog</h3>
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-extrabold text-[#345460]">
                    ${pricing.boarding.nightly}
                  </span>
                  <span className="text-[#345460]/50 text-sm font-medium">
                    / night
                  </span>
                </div>
                <p className="text-xs text-[#345460]/40">
                  Includes full day of daycare
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-7 shadow-lg shadow-black/5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-[#48D597]/10 flex items-center justify-center">
                    <Dog className="w-5 h-5 text-[#48D597]" />
                  </div>
                  <h3 className="font-bold text-[#345460]">
                    Each Additional Dog
                  </h3>
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-extrabold text-[#345460]">
                    $45
                  </span>
                  <span className="text-[#345460]/50 text-sm font-medium">
                    / night
                  </span>
                </div>
                <p className="text-xs text-[#345460]/40">Per additional dog</p>
              </div>
            </div>

            {/* What's included */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
              {[
                "Spacious private suites",
                "Full day of daycare included",
                "Climate-controlled facility",
                "Loving & attentive staff",
                "Indoor & outdoor play areas",
                "Feeding per your schedule",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
                >
                  <div className="w-6 h-6 rounded-full bg-[#48D597]/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-[#48D597]" />
                  </div>
                  <span className="text-sm font-medium text-[#345460]">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Important note */}
            <div className="bg-[#48D597]/10 border border-[#48D597]/20 rounded-2xl p-6 lg:p-8">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#48D597]/20 flex items-center justify-center flex-shrink-0">
                  <Info className="w-5 h-5 text-[#48D597]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#345460] mb-2">
                    First-Time Boarders
                  </h4>
                  <p className="text-[#345460]/70 text-sm leading-relaxed">
                    All first-time boarding dogs must complete a full day of
                    daycare for temperament testing. Please call{" "}
                    <a
                      href="tel:5398673841"
                      className="text-[#48D597] font-semibold hover:underline"
                    >
                      539-867-3841
                    </a>{" "}
                    at least 2 days before your boarding dates to schedule.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="container">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </div>

        {/* ═══════════════════════════════════════════════════
           GROOMING SECTION
           ═══════════════════════════════════════════════════ */}
        <section id="grooming" className="py-16 lg:py-20 scroll-mt-32">
          <div className="container">
            {/* Header with image */}
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-12">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#48D597]/10 text-[#48D597] text-xs font-bold mb-4 uppercase tracking-wider">
                  <Scissors className="w-3.5 h-3.5" />
                  Grooming
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#345460] tracking-tight mb-4">
                  Grooming Services
                </h2>
                <p className="text-[#345460]/70 text-lg leading-relaxed mb-4">
                  Our groomer Jacque will have your pup looking and feeling
                  amazing. Prices vary by size, breed, and coat condition.
                </p>
                <div className="flex items-center gap-3 text-sm text-[#345460]/60">
                  <Phone className="w-4 h-4 text-[#48D597]" />
                  Call{" "}
                  <a
                    href="tel:5398673841"
                    className="text-[#48D597] font-semibold hover:underline"
                  >
                    539-867-3841
                  </a>{" "}
                  for your breed's exact price
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl shadow-black/10">
                <img
                  src={GROOMING_IMG}
                  alt="Happy dog after grooming at Metro Mutts"
                  className="w-full h-64 lg:h-80 object-cover"
                />
              </div>
            </div>

            {/* Main grooming services — "starting at" approach */}
            <div className="grid md:grid-cols-3 gap-5 mb-10">
              {/* Full Bath */}
              <div className="bg-white rounded-2xl border border-gray-100 p-7 shadow-lg shadow-black/5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-[#48D597]/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-[#48D597]" />
                  </div>
                  <h3 className="font-bold text-[#345460]">Full Bath</h3>
                </div>
                <p className="text-[#345460]/60 text-sm mb-4">
                  Wash, dry, and brush out. Recommended for short-hair and
                  non-grooming breeds.
                </p>
                <p className="text-xs text-[#345460]/40 mb-1">Starting at</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-[#345460]">
                    $30
                  </span>
                </div>
              </div>

              {/* Full Grooming — highlighted */}
              <div className="bg-white rounded-2xl border-2 border-[#48D597] p-7 shadow-lg shadow-[#48D597]/10 relative">
                <div className="absolute -top-3 left-6">
                  <span className="bg-[#FB923C] text-white text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-[#48D597]/10 flex items-center justify-center">
                    <Scissors className="w-5 h-5 text-[#48D597]" />
                  </div>
                  <h3 className="font-bold text-[#345460]">Full Grooming</h3>
                </div>
                <p className="text-[#345460]/60 text-sm mb-4">
                  Full bath + haircut/shaving. Ear hair pulling, paw pads &
                  anal gland expression included on request.
                </p>
                <p className="text-xs text-[#345460]/40 mb-1">Starting at</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-[#345460]">
                    $70
                  </span>
                </div>
              </div>

              {/* De-shedding */}
              <div className="bg-white rounded-2xl border border-gray-100 p-7 shadow-lg shadow-black/5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-[#48D597]/10 flex items-center justify-center">
                    <Dog className="w-5 h-5 text-[#48D597]" />
                  </div>
                  <h3 className="font-bold text-[#345460]">De-shedding</h3>
                </div>
                <p className="text-[#345460]/60 text-sm mb-4">
                  Special shampoo & conditioner with de-shedding brushes/rakes
                  to reduce shedding.
                </p>
                <p className="text-xs text-[#345460]/40 mb-1">Add-on from</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-[#345460]">
                    $20
                  </span>
                </div>
              </div>
            </div>

            {/* Call for quote CTA */}
            <div className="bg-[#345460] rounded-2xl p-6 lg:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 mb-10">
              <div>
                <h4 className="text-lg font-extrabold text-white mb-1">
                  Not sure what your pup needs?
                </h4>
                <p className="text-white/50 text-sm">
                  Call us and we'll recommend the right service and give you an
                  exact quote for your breed.
                </p>
              </div>
              <a
                href="tel:5398673841"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#48D597] text-[#345460] font-bold hover:bg-[#3bc485] transition-colors shadow-lg shadow-[#48D597]/25 flex-shrink-0"
              >
                <Phone className="w-4 h-4" />
                539-867-3841
              </a>
            </div>

            {/* Add-ons */}
            <div className="bg-white rounded-2xl p-8 lg:p-10 border border-gray-100 shadow-lg shadow-black/5">
              <h3 className="text-xl font-extrabold text-[#345460] mb-1">
                Grooming Add-Ons
              </h3>
              <p className="text-[#345460]/50 text-sm mb-6">
                Customize your pup's grooming experience.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {groomingAddOns.map((addon) => (
                  <div
                    key={addon.name}
                    className="flex items-center justify-between bg-[oklch(0.98_0.003_90)] rounded-xl p-4 border border-gray-100 hover:border-[#48D597]/20 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#48D597]/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3.5 h-3.5 text-[#48D597]" />
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-[#345460]">
                          {addon.name}
                        </span>
                        {addon.note && (
                          <p className="text-xs text-[#345460]/40 mt-0.5">
                            {addon.note}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="text-sm font-bold text-[#48D597] ml-4 flex-shrink-0">
                      {addon.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Grooming Gallery Banner */}
            <Link href="/grooming-gallery">
              <div className="mt-10 relative rounded-2xl overflow-hidden group cursor-pointer shadow-xl shadow-black/10">
                {/* Photo mosaic background */}
                <div className="grid grid-cols-4 sm:grid-cols-6 h-[200px] sm:h-[220px]">
                  {[
                    "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/v2-groom-28_e2dabc24.jpg",
                    "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/v2-groom-32_96e243c7.jpg",
                    "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/v2-groom-11_0611c3ca.jpg",
                    "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/v2-groom-19_16b7fa21.jpg",
                    "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/v2-groom-26_db809956.jpg",
                    "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/v2-groom-30_64184bfe.jpg",
                  ].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="Groomed dog"
                      className={`w-full h-full object-cover ${i >= 4 ? "hidden sm:block" : ""}`}
                    />
                  ))}
                </div>
                {/* Overlay with CTA */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#345460]/90 via-[#345460]/70 to-[#345460]/40 group-hover:from-[#345460]/85 group-hover:via-[#345460]/60 group-hover:to-[#345460]/30 transition-all duration-300 flex items-center">
                  <div className="px-8 sm:px-10">
                    <div className="flex items-center gap-2 mb-2">
                      <Scissors className="w-4 h-4 text-[#48D597]" />
                      <span className="text-[#48D597] text-xs font-bold uppercase tracking-wider">Grooming Gallery</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                      See Jacque's Work
                    </h3>
                    <p className="text-white/60 text-sm mb-4 max-w-md">
                      Browse 30+ photos of freshly groomed pups — from doodles to dachshunds.
                    </p>
                    <span className="inline-flex items-center gap-2 text-[#48D597] font-bold text-sm group-hover:gap-3 transition-all">
                      View Gallery
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* ─── FAQ Section ─── */}
        <section className="py-16 lg:py-20">
          <div className="container max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#48D597]/10 text-[#48D597] text-xs font-bold mb-4 uppercase tracking-wider">
                <HelpCircle className="w-3.5 h-3.5" />
                FAQ
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#345460] tracking-tight">
                Common Questions
              </h2>
            </motion.div>

            <div className="space-y-3">
              {[
                {
                  q: "What vaccines are required?",
                  a: "All dogs must be current on Rabies, DHPP (Distemper), and Bordetella (kennel cough). We also recommend the Canine Influenza vaccine. Please bring proof of vaccination on your first visit.",
                },
                {
                  q: "Is a temperament test required?",
                  a: "Yes — every new dog gets a free meet & greet and temperament evaluation before their first day. This helps us place your pup in the right play group by size and energy level. You can schedule this by calling us.",
                },
                {
                  q: "What should I bring on my dog's first day?",
                  a: "Bring proof of current vaccinations, any medications your dog takes, and their favorite toy or blanket if it helps them feel comfortable. We provide food and water bowls, beds, and treats.",
                },
                {
                  q: "Do daycare packages expire?",
                  a: "Daycare packages are valid for 12 months from the date of purchase. Unused days do not roll over after expiration.",
                },
                {
                  q: "What's included with overnight boarding?",
                  a: "Every boarding stay includes a full day of daycare, a private suite with comfortable bedding, evening walks, bedtime snacks, and camera-monitored overnight care. Additional dogs from the same family receive a discounted rate of $45/night.",
                },
                {
                  q: "How do I book a grooming appointment?",
                  a: "Grooming appointments are booked by phone. Call us at 539-867-3841 to schedule with our groomer Jacque. Prices depend on your dog's size, breed, and coat condition — Jacque will give you an exact quote when you call.",
                },
                {
                  q: "What are your hours?",
                  a: "We're open Monday through Friday 7:00 AM – 6:00 PM and Saturday & Sunday 9:00 AM – 5:00 PM. Drop-off and pick-up for daycare and boarding happen during regular business hours.",
                },
                {
                  q: "What's your cancellation policy?",
                  a: "We ask for at least 24 hours notice for cancellations. Late cancellations or no-shows may be charged a fee. Grooming appointments require 24 hours notice as well.",
                },
              ].map((faq, i) => (
                <FaqItem key={i} question={faq.q} answer={faq.a} />
              ))}
            </div>

            <div className="mt-10 text-center">
              <p className="text-[#345460]/50 text-sm mb-3">Still have questions?</p>
              <Button
                variant="outline"
                className="border-[#345460]/20 text-[#345460] hover:bg-[#345460]/5 font-semibold"
                asChild
              >
                <a href="tel:5398673841">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Call Us — 539-867-3841
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* ─── Bottom CTA ─── */}
        <section className="py-16 lg:py-20 bg-[#345460]">
          <div className="container text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-white/60 text-lg mb-8 max-w-lg mx-auto">
                Book your pup's first visit today. New customers get a free meet
                & greet!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-[#48D597] hover:bg-[#3bc085] text-[#345460] font-bold text-base px-8 h-13 shadow-xl shadow-black/15"
                  onClick={openBookingModal}
                >
                  Book a Visit
                  <ArrowRight className="w-5 h-5 ml-1" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 font-semibold text-base px-8 h-13 bg-transparent"
                  asChild
                >
                  <a href="tel:5398673841">Call 539-867-3841</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
