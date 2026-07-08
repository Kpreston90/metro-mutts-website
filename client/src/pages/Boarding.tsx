/**
 * Metro Mutts — Boarding Landing Page (Conversion-Optimized)
 * Designed for $347/week LSA ad traffic.
 * Premium visual design with live availability, urgency, trust signals.
 * Single focused CTA: Reserve Your Dog's Stay
 */

import { motion, useScroll, useTransform } from "framer-motion";

import {
  Moon,
  Sun,
  Shield,
  Heart,
  Phone,
  Clock,
  CheckCircle2,
  Star,
  ArrowRight,
  ArrowDown,
  Users,
  Utensils,
  Gamepad2,
  Bed,
  Camera,
  Stethoscope,
  CalendarCheck,
  Sparkles,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import PageSEO from "@/components/PageSEO";
import SEOFaqSection from "@/components/SEOFaqSection";
import Footer from "@/components/Footer";
import { trackPhoneCall, trackCTA } from "@/lib/analytics";
import { useSectionTracking } from "@/hooks/usePageTracking";
import { useBookingModal } from "@/contexts/BookingModalContext";
import { trpc } from "@/lib/trpc";

// Images
const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/boarding-hero-kennel-view-v2-QdugeeeW4JYJD7cLpKXaNL.webp";
const FACILITY_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/vet-referred-facility-v3-DCNGQE4pnuuDpVkZkPVYMQ.webp";
const PLAY_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/outdoor-yard-real-edited_937b0e31.png";
const STAFF_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/new-staff-cuddle-PjhfHvXzFSDCVuoaoZZxq6.webp";

// ─── Data ───────────────────────────────────────────────────────────────────

const included = [
  {
    icon: Bed,
    title: "Private Suite",
    desc: "Climate-controlled, spacious suite with elevated bed and cozy blankets.",
  },
  {
    icon: Utensils,
    title: "Meals & Meds",
    desc: "Fed on your schedule with your food. Medication admin included free.",
  },
  {
    icon: Gamepad2,
    title: "Daily Play Sessions",
    desc: "Supervised group play in our 7,000+ sq ft indoor & outdoor areas.",
  },
  {
    icon: Moon,
    title: "Overnight Care",
    desc: "Staff check-ins throughout the night. Your dog is never alone.",
  },
  {
    icon: Sun,
    title: "Morning & Evening Walks",
    desc: "Potty breaks and walks to start and end each day on routine.",
  },
  {
    icon: Heart,
    title: "Love & Attention",
    desc: "Belly rubs, ear scratches, and genuine one-on-one time every day.",
  },
];

const trustSignals = [
  { icon: Shield, text: "Fully insured & licensed" },
  { icon: Camera, text: "Webcam access available" },
  { icon: Stethoscope, text: "Vet partnership on call" },
  { icon: Users, text: "Trained, passionate staff" },
  { icon: Clock, text: "Flexible drop-off & pick-up" },
  { icon: CalendarCheck, text: "Free temperament assessment" },
];

const schedule = [
  { time: "7:00 AM", activity: "Morning potty break & walk", icon: Sun },
  { time: "7:30 AM", activity: "Breakfast (your pup's own food)", icon: Utensils },
  { time: "9:00 AM", activity: "Group play — supervised socialization", icon: Users },
  { time: "12:00 PM", activity: "Midday rest & potty break", icon: Clock },
  { time: "2:00 PM", activity: "Afternoon play & enrichment", icon: Gamepad2 },
  { time: "5:00 PM", activity: "Dinner & evening walk", icon: Utensils },
  { time: "7:00 PM", activity: "Wind-down with cuddles", icon: Heart },
  { time: "9:00 PM", activity: "Final potty break & lights out", icon: Moon },
];

// ─── Component ──────────────────────────────────────────────────────────────

export default function Boarding() {
  const { openBookingModal } = useBookingModal();
  const { data: availability } = trpc.availability.todayAndTomorrow.useQuery(
    undefined,
    { staleTime: 5 * 60 * 1000, retry: 1 }
  );
  useSectionTracking([
    "boarding-hero",
    "boarding-trust",
    "boarding-included",
    "boarding-facility",
    "boarding-schedule",
    "boarding-pricing",
    "boarding-cta",
  ]);

  const boardingSpots = availability?.today?.boarding?.spotsLeft;
  const isUrgent = boardingSpots !== undefined && boardingSpots <= 5;

  // Parallax effect for hero
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.3]);

  return (
    <div className="min-h-screen bg-[#fafaf8]">
      <PageSEO
        title="Dog Boarding in Tulsa | Overnight Suites from $50/night | Metro Mutts"
        description="Tulsa's most trusted dog boarding. Private suites, daily play, overnight staff, and vet on call. 19 suites — book before they fill up. Call 539-867-3841."
        canonical="https://www.metromutts.com/boarding"
      />
      <Navbar />

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO — Full-bleed immersive with parallax
      ═══════════════════════════════════════════════════════════════════════ */}
      <section
        id="boarding-hero"
        data-hero-section
        className="relative h-[90vh] min-h-[600px] max-h-[900px] overflow-hidden"
      >
        <motion.div
          className="absolute inset-0"
          style={{ y: heroY }}
        >
          <img
            src={HERO_IMG}
            alt="Golden retriever sleeping peacefully in a cozy Metro Mutts boarding suite"
            className="w-full h-[110%] object-cover"
          />
        </motion.div>
        {/* Cinematic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e38] via-[#1a2e38]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a2e38]/50 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex items-end pb-16 lg:pb-20">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="max-w-3xl"
              style={{ opacity: heroOpacity }}
            >
              {/* Urgency badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6 backdrop-blur-md border ${
                  isUrgent
                    ? "bg-amber-500/20 border-amber-400/40 text-amber-200"
                    : "bg-[#48D597]/15 border-[#48D597]/30 text-[#48D597]"
                }`}
              >
                <span className={`w-2 h-2 rounded-full animate-pulse ${isUrgent ? "bg-amber-400" : "bg-[#48D597]"}`} />
                {boardingSpots === undefined
                  ? "19 boarding suites · Book today"
                  : isUrgent
                    ? `Only ${boardingSpots} suite${boardingSpots === 1 ? "" : "s"} left tonight`
                    : `${boardingSpots} boarding suites available`}
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.05] mb-5">
                Go on your trip.
                <br />
                <span className="text-[#48D597]">We've got your best friend.</span>
              </h1>
              <p className="text-lg lg:text-xl text-white/70 max-w-2xl mb-8 leading-relaxed">
                Private suites. Daily playtime. Overnight staff. Everything your dog needs
                to feel safe, loved, and happy while you're away.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-[#48D597] hover:bg-[#3bc085] text-[#1a2e38] font-bold text-base px-8 h-14 shadow-2xl shadow-[#48D597]/30 transition-all hover:-translate-y-0.5 hover:shadow-[#48D597]/40 rounded-full"
                  onClick={() => {
                    trackCTA("boarding_hero_reserve");
                    openBookingModal();
                  }}
                >
                  Reserve Your Dog's Stay
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/25 text-white hover:bg-white/10 font-semibold text-base px-8 h-14 bg-transparent rounded-full"
                  asChild
                >
                  <a href="tel:5398673841" onClick={() => trackPhoneCall("boarding_hero")}>
                    <Phone className="w-5 h-5 mr-2" />
                    539-867-3841
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown className="w-5 h-5 text-white/40" />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          TRUST BAR — Quick credibility signals
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="boarding-trust" className="bg-[#345460] py-5 border-b border-white/10">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8 text-white/80 text-sm font-medium">
            <span className="flex items-center gap-2">
              <Star className="w-4 h-4 text-[#48D597]" fill="currentColor" />
              4.9 Google Rating
            </span>
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#48D597]" />
              Insured & Licensed
            </span>
            <span className="flex items-center gap-2">
              <Moon className="w-4 h-4 text-[#48D597]" />
              Overnight Staff
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#48D597]" />
              Midtown Tulsa
            </span>
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#48D597]" />
              $50/night
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          PRICING — Big, bold, clear
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="boarding-pricing" className="py-20 lg:py-28">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#345460] to-[#2a4550] p-10 lg:p-14 shadow-2xl"
            >
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#48D597]/5 -translate-y-1/2 translate-x-1/3" />
              <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#48D597]/5 translate-y-1/3 -translate-x-1/4" />

              <div className="relative grid lg:grid-cols-2 gap-10 items-center">
                {/* Left: Pricing */}
                <div className="text-center lg:text-left">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-[#48D597]/15 text-[#48D597] text-sm font-bold mb-6 tracking-wide uppercase">
                    Simple, Transparent Pricing
                  </span>
                  <div className="flex items-baseline justify-center lg:justify-start gap-2 mb-2">
                    <span className="text-7xl lg:text-8xl font-extrabold text-white">$50</span>
                    <span className="text-2xl text-white/50 font-medium">/ night</span>
                  </div>
                  <p className="text-white/50 text-lg mb-2">
                    Additional dogs: <span className="text-white font-bold">$45/night</span>
                  </p>
                  <p className="text-white/40 text-sm mb-8">
                    Everything included. No hidden fees. No surprises.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                    <Button
                      size="lg"
                      className="bg-[#48D597] hover:bg-[#3bc085] text-[#1a2e38] font-bold px-8 h-13 shadow-xl shadow-[#48D597]/25 rounded-full"
                      onClick={() => {
                        trackCTA("boarding_pricing_reserve");
                        openBookingModal();
                      }}
                    >
                      Reserve Now
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </div>

                {/* Right: What's included list */}
                <div className="space-y-3">
                  {[
                    "Private climate-controlled suite",
                    "Daily supervised group play",
                    "Meals on your schedule",
                    "Medication administration",
                    "Morning & evening walks",
                    "Overnight staff check-ins",
                    "Belly rubs & one-on-one time",
                    "Report card at pickup",
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#48D597] flex-shrink-0" />
                      <span className="text-white/80 font-medium">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          WHAT'S INCLUDED — Feature cards
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="boarding-included" className="py-20 lg:py-28 bg-white">
        <div className="container">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#48D597]/10 text-[#48D597] text-sm font-bold mb-4 tracking-wide uppercase">
              What's Included
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#345460] tracking-tight mb-4">
              Everything for a{" "}
              <span className="text-[#48D597]">Perfect Stay</span>
            </h2>
            <p className="text-[#345460]/55 text-lg">
              One rate covers it all — no hidden fees, no surprise charges.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {included.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="group relative bg-[#fafaf8] rounded-2xl p-7 border border-black/5 hover:border-[#48D597]/30 hover:shadow-xl hover:shadow-[#48D597]/5 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#48D597]/15 to-[#48D597]/5 flex items-center justify-center mb-5 group-hover:from-[#48D597]/25 group-hover:to-[#48D597]/10 transition-colors">
                    <Icon className="w-7 h-7 text-[#48D597]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#345460] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[#345460]/55 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FACILITY — Split image + trust signals
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="boarding-facility" className="py-20 lg:py-28">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image stack */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={FACILITY_IMG}
                  alt="Dogs playing in Metro Mutts indoor facility"
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
              {/* Floating accent image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute -bottom-6 -right-6 lg:-right-8 w-40 h-40 lg:w-48 lg:h-48 rounded-2xl overflow-hidden shadow-xl border-4 border-white"
              >
                <img
                  src={STAFF_IMG}
                  alt="Metro Mutts staff member cuddling a dog"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#48D597]/10 text-[#48D597] text-sm font-bold mb-5 tracking-wide uppercase">
                Why Tulsa Trusts Us
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#345460] tracking-tight mb-4 leading-tight">
                Your dog deserves more than
                <br />
                <span className="text-[#48D597]">a kennel.</span>
              </h2>
              <p className="text-[#345460]/55 text-lg mb-8 leading-relaxed max-w-lg">
                7,000+ sq ft of purpose-built space with 4,000 sq ft of turfed play area.
                Temperament-tested playgroups. Climate control year-round. This isn't
                traditional boarding — it's a vacation for your dog.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {trustSignals.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.2 + i * 0.06 }}
                      className="flex items-center gap-3 py-2"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#48D597]/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4.5 h-4.5 text-[#48D597]" />
                      </div>
                      <span className="text-sm font-medium text-[#345460]/75">{item.text}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          DAILY SCHEDULE — Timeline
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="boarding-schedule" className="py-20 lg:py-28 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Header + image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#48D597]/10 text-[#48D597] text-sm font-bold mb-4 tracking-wide uppercase">
                A Day in Their Life
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#345460] tracking-tight mb-4 leading-tight">
                Your dog's day,{" "}
                <span className="text-[#48D597]">planned to perfection.</span>
              </h2>
              <p className="text-[#345460]/55 text-lg mb-8 leading-relaxed">
                Every boarding guest gets a structured day of play, rest, meals, and
                love — designed to keep them happy and on routine.
              </p>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={PLAY_IMG}
                  alt="Dogs playing together at Metro Mutts"
                  className="w-full aspect-[16/10] object-cover"
                />
              </div>
            </motion.div>

            {/* Right: Timeline */}
            <div className="space-y-0">
              {schedule.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                    className="flex items-center gap-4 py-4 border-b border-black/5 last:border-0"
                  >
                    <div className="w-16 text-right flex-shrink-0">
                      <span className="text-sm font-bold text-[#48D597]">
                        {item.time}
                      </span>
                    </div>
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-[#48D597]/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[#48D597]" />
                      </div>
                      {i < schedule.length - 1 && (
                        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-px h-[calc(100%+6px)] bg-[#48D597]/15" />
                      )}
                    </div>
                    <span className="text-[#345460] font-medium text-sm sm:text-base">
                      {item.activity}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          BOTTOM CTA — Bold, emotional, single action
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="boarding-cta" className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-[#345460] via-[#2f4f5c] to-[#1a2e38] py-20 lg:py-28">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-[#48D597]/5" />
            <div className="absolute bottom-10 right-20 w-56 h-56 rounded-full bg-[#48D597]/5" />
            <div className="absolute top-1/2 left-2/3 w-24 h-24 rounded-full bg-[#48D597]/5" />
          </div>

          <div className="container relative">
            <motion.div
              className="text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Live urgency */}
              {boardingSpots !== undefined && isUrgent && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-200 text-sm font-bold mb-6"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  Only {boardingSpots} suite{boardingSpots === 1 ? "" : "s"} left — filling fast
                </motion.div>
              )}

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
                Your dog's{" "}
                <span className="text-[#48D597]">best sleepover</span>
                <br />
                starts with one call.
              </h2>
              <p className="text-white/60 text-lg lg:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
                Book a stay, schedule a tour, or just ask us anything.
                First-time boarding guests get a free temperament assessment.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-[#48D597] hover:bg-[#3bc085] text-[#1a2e38] font-bold text-lg px-10 h-14 shadow-2xl shadow-[#48D597]/30 transition-all hover:-translate-y-0.5 rounded-full"
                  onClick={() => {
                    trackCTA("boarding_bottom_reserve");
                    openBookingModal();
                  }}
                >
                  Reserve Your Dog's Stay
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/25 text-white hover:bg-white/10 font-semibold text-lg px-10 h-14 bg-transparent rounded-full"
                  asChild
                >
                  <a href="tel:5398673841" onClick={() => trackPhoneCall("boarding_bottom_cta")}>
                    <Phone className="w-5 h-5 mr-2" />
                    539-867-3841
                  </a>
                </Button>
              </div>
              <p className="mt-8 text-white/30 text-sm">
                1219 E 13th St, Tulsa, OK 74120 · Mon–Fri 7am–6pm, Sat–Sun 9am–5pm
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SEO FAQ Section */}
      <SEOFaqSection
        title="Dog Boarding in Tulsa — Frequently Asked Questions"
        subtitle="Everything you need to know about boarding your dog at Metro Mutts"
        schemaId="boarding-faq"
        faqs={[
          {
            question: "How much does dog boarding cost in Tulsa?",
            answer:
              "Dog boarding at Metro Mutts starts at $50 per night for a private suite. Multi-dog families pay $45/night for additional dogs. Every boarding stay includes daily supervised group play, meals on your schedule, evening walks, and overnight staff check-ins — no hidden fees.",
          },
          {
            question: "What is included in overnight dog boarding at Metro Mutts?",
            answer:
              "Every boarding stay includes a private climate-controlled suite with cozy bedding, daily group play sessions, individual attention, meals served on your schedule, evening potty walks, and overnight staff monitoring. We also offer add-ons like grooming and extra play sessions.",
          },
          {
            question: "What vaccinations are required for dog boarding?",
            answer:
              "All dogs must be current on Rabies, DHPP (Distemper), and Bordetella (kennel cough) vaccinations. We also require a negative fecal test within the past 12 months. Puppies must have completed their full vaccination series.",
          },
          {
            question: "Can I board my dog if they have never been to Metro Mutts before?",
            answer:
              "Yes! We recommend scheduling a free daycare trial day first so your dog can get comfortable with our facility, staff, and other pups. This helps reduce stress during their first overnight stay. Call 539-867-3841 to schedule.",
          },
          {
            question: "What makes Metro Mutts different from other dog boarding in Tulsa?",
            answer:
              "Metro Mutts is Tulsa's newest purpose-built dog care facility with 7,000+ sq ft of indoor and outdoor space. Unlike traditional kennels, our dogs aren't crated all day — they enjoy supervised group play, enrichment activities, and personalized attention from our passionate team.",
          },
          {
            question: "Do you offer boarding for large dogs in Tulsa?",
            answer:
              "Absolutely! We welcome dogs of all sizes. Our spacious suites comfortably accommodate large and giant breeds. During play sessions, dogs are grouped by size and temperament for safe interactions.",
          },
          {
            question: "What are your dog boarding hours for drop-off and pick-up?",
            answer:
              "Drop-off is available Monday through Friday from 7:00 AM to 6:00 PM, and Saturday & Sunday 9:00 AM to 5:00 PM. We're flexible — just let us know your travel plans and we'll work with you.",
          },
        ]}
      />

      <Footer />
    </div>
  );
}
