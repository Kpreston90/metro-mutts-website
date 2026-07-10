/*
 * Metro Mutts Daycare Landing Page
 * Dedicated landing page for prospective daycare clients
 * Brand: Green #48D597, Dark #345460
 * Designed for ad campaigns, social media, and SEO
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Sun,
  Shield,
  Heart,
  Dog,
  Phone,
  Clock,
  CheckCircle2,
  Star,
  ArrowRight,
  Users,
  Zap,
  Eye,
  Droplets,
  Smile,
  TreePine,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import ServiceAvailabilityBar from "@/components/ServiceAvailabilityBar";
import Footer from "@/components/Footer";
import { trackPhoneCall, trackCTA } from "@/lib/analytics";
import { useSectionTracking } from "@/hooks/usePageTracking";
import { useBookingModal } from "@/contexts/BookingModalContext";

const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/daycare-hero-8mHoiByPEENzni474W7hiK.webp";
const DAYCARE_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/new-daycare-9JTdpbodWw4zW5xQhTfmzM.webp";

const included = [
  {
    icon: Users,
    title: "Supervised Group Play",
    desc: "Trained staff actively supervise all play sessions, ensuring safe, positive interactions between dogs at all times.",
  },
  {
    icon: Shield,
    title: "Temperament Grouping",
    desc: "Dogs are grouped by size, energy level, and temperament — so every pup plays with the right pack.",
  },
  {
    icon: TreePine,
    title: "Indoor & Outdoor Areas",
    desc: "2,000 sq ft indoor and 2,000 sq ft outdoor play areas with shade, turf, and splash pads for year-round fun.",
  },
  {
    icon: Zap,
    title: "Enrichment Activities",
    desc: "Puzzle toys, agility equipment, and sensory games keep your dog mentally stimulated — not just physically tired.",
  },
  {
    icon: Droplets,
    title: "Fresh Water & Rest",
    desc: "Unlimited fresh water stations and quiet rest areas for dogs who need a break from the action.",
  },
  {
    icon: Heart,
    title: "Lots of Love",
    desc: "Our team genuinely loves dogs. Your pup will get belly rubs, ear scratches, and individual attention every day.",
  },
];

const whyUs = [
  "7,000+ sq ft facility (4K of turfed play space)",
  "Climate-controlled facility year-round",
  "Temperament-tested playgroups for safety",
  "Trained, passionate staff on-site",
  "Flexible drop-off & pick-up (7am–6pm)",
  "Multi-dog family discounts available",
  "Convenient Tulsa location near downtown",
  "First day FREE for new clients",
];

const testimonials = [
  {
    name: "Joseph O.",
    text: "I love Metro Mutts!!! Truly the best doggy daycare in Tulsa. My puppy absolutely loves it there and is always so well taken care of. Drop-offs are easy because he's excited and ready to go!",
    rating: 5,
    source: "Google",
  },
  {
    name: "Loghan A.",
    text: "Nicole was amazing, patient and understanding of our situation. She took our new puppy and gave him his freedom back. We will definitely be returning! Thank you!",
    rating: 5,
    source: "Google",
  },
  {
    name: "Verified Customer",
    text: "Very thoughtful, very clean! Happy with my mini Schnauzer's grooming and she didn't seem stressed. Play yard is a great bonus!",
    rating: 5,
    source: "Yelp",
  },
];

export default function Daycare() {
  const { openBookingModal } = useBookingModal();
  useSectionTracking([
    "daycare-hero",
    "daycare-included",
    "daycare-facility",
    "daycare-schedule",
    "daycare-testimonials",
    "daycare-pricing",
    "daycare-cta",
  ]);

  return (
    <div className="min-h-screen bg-[oklch(0.98_0.003_90)]">
      <Navbar />
      <ServiceAvailabilityBar service="daycare" />

      {/* Hero */}
      <section
        id="daycare-hero"
        className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden"
      >
        <img
          src={HERO_IMG}
          alt="Happy dogs playing together at Metro Mutts daycare facility"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a2e38]/90 via-[#1a2e38]/70 to-[#1a2e38]/40" />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#48D597]/15 text-[#48D597] text-sm font-bold mb-6 tracking-wide uppercase">
              <Sun className="w-4 h-4" />
              Dog Daycare in Tulsa
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-5">
              Your Dog's{" "}
              <span className="text-[#48D597]">Best Day</span>
              <br />
              Starts Here
            </h1>
            <p className="text-lg text-white/65 max-w-xl mb-8 leading-relaxed">
              Supervised group play, enrichment activities, and 7,000+ sq ft of
              indoor and outdoor space — where every dog comes home happy and
              tired. First day free for new pups.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:539-867-3841"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#48D597] text-white font-bold hover:bg-[#3bc485] transition-all shadow-lg shadow-[#48D597]/25 hover:shadow-xl hover:shadow-[#48D597]/30"
                onClick={() => trackPhoneCall("daycare_hero")}
              >
                <Phone className="w-4 h-4" />
                Book a Visit — 539-867-3841
              </a>
              <Link
                href="/pricing#daycare"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-white/25 text-white font-semibold hover:bg-white/10 transition-all"
              >
                View Pricing
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick stats bar */}
      <div className="bg-white border-b border-black/5 shadow-sm">
        <div className="container py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "$32", label: "Full Day" },
              { value: "FREE", label: "First Day" },
              { value: "7,000+", label: "Sq Ft Facility" },
              { value: "7–6", label: "Mon–Fri Hours" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-extrabold text-[#345460]">
                  {stat.value}
                </div>
                <div className="text-sm text-[#345460]/50 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What's Included */}
      <section id="daycare-included" className="py-20 lg:py-28">
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
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#345460] tracking-tight mb-4">
              More Than Just a{" "}
              <span className="text-[#48D597]">Play Date</span>
            </h2>
            <p className="text-[#345460]/55 text-lg">
              Every daycare visit includes supervised play, enrichment, and
              individual attention — all in a safe, clean environment.
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
                  className="bg-white rounded-2xl p-6 shadow-md shadow-black/5 border border-black/5 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#48D597]/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#48D597]" />
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

      {/* Facility showcase */}
      <section id="daycare-facility" className="py-20 lg:py-28 bg-[#345460]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={DAYCARE_IMG}
                  alt="Dogs socializing in Metro Mutts indoor play area"
                  className="w-full aspect-[16/10] object-cover"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#48D597]/15 text-[#48D597] text-sm font-bold mb-4 tracking-wide uppercase">
                Our Facility
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-6 leading-tight">
                Why Tulsa Families{" "}
                <span className="text-[#48D597]">Choose Us</span>
              </h2>
              <div className="grid gap-3">
                {whyUs.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.15 + i * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#48D597] mt-0.5 flex-shrink-0" />
                    <span className="text-white/75 text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* A Day in Daycare */}
      <section id="daycare-schedule" className="py-20 lg:py-28">
        <div className="container">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#48D597]/10 text-[#48D597] text-sm font-bold mb-4 tracking-wide uppercase">
              Daily Schedule
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#345460] tracking-tight mb-4">
              A Day in Your Dog's{" "}
              <span className="text-[#48D597]">Daycare Life</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {[
              { time: "7:00 AM", activity: "Doors open — drop-off begins", icon: Clock },
              { time: "7:30 AM", activity: "Morning potty break & warm-up play", icon: Sun },
              { time: "9:00 AM", activity: "Group play session — fetch, chase, tug", icon: Dog },
              { time: "11:00 AM", activity: "Enrichment time — puzzles, agility, sensory games", icon: Zap },
              { time: "12:00 PM", activity: "Midday rest & water break", icon: Droplets },
              { time: "1:00 PM", activity: "Afternoon outdoor play session", icon: TreePine },
              { time: "3:00 PM", activity: "Free play & socialization", icon: Smile },
              { time: "5:00 PM", activity: "Wind-down time & belly rubs", icon: Heart },
              { time: "6:00 PM", activity: "Pick-up — one tired, happy pup", icon: Star },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  className="flex items-center gap-5 py-4 border-b border-black/5 last:border-0"
                >
                  <div className="w-20 text-right flex-shrink-0">
                    <span className="text-sm font-bold text-[#48D597]">
                      {item.time}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#48D597]/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-[#48D597]" />
                  </div>
                  <span className="text-[#345460] font-medium">
                    {item.activity}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="daycare-testimonials" className="py-20 lg:py-28 bg-[oklch(0.97_0.003_90)]">
        <div className="container">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#48D597]/10 text-[#48D597] text-sm font-bold mb-4 tracking-wide uppercase">
              Happy Pups
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#345460] tracking-tight">
              What Daycare Parents{" "}
              <span className="text-[#48D597]">Say</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-md shadow-black/5 border border-black/5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star
                        key={j}
                        className="w-4 h-4 text-[#FB923C]"
                        fill="currentColor"
                      />
                    ))}
                  </div>
                  <span className="text-xs text-[#345460]/40 font-medium">
                    {t.source}
                  </span>
                </div>
                <p className="text-[#345460]/65 text-sm leading-relaxed mb-4 italic">
                  "{t.text}"
                </p>
                <div className="text-sm font-bold text-[#345460]">{t.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing snapshot */}
      <section id="daycare-pricing" className="py-20 lg:py-28">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#48D597]/10 text-[#48D597] text-sm font-bold mb-4 tracking-wide uppercase">
                Simple Pricing
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#345460] tracking-tight">
                Daycare Packages
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-3 gap-6">
              {[
                {
                  title: "Drop-In",
                  price: "$32",
                  unit: "/ full day",
                  desc: "Perfect for occasional visits",
                  features: [
                    "Full day (7am–6pm)",
                    "Supervised group play",
                    "Enrichment activities",
                    "$24 per sibling dog",
                    "Half day available ($20)",
                  ],
                  highlight: false,
                },
                {
                  title: "10-Day Pack",
                  price: "$250",
                  unit: "/ 10 days",
                  desc: "Most popular — save $50",
                  features: [
                    "10 full-day passes",
                    "Never expires",
                    "$25 per day",
                    "Best for weekly regulars",
                  ],
                  highlight: true,
                },
                {
                  title: "20-Day Pack",
                  price: "$440",
                  unit: "/ 20 days",
                  desc: "Best value — save $160",
                  features: [
                    "20 full-day passes",
                    "Never expires",
                    "$22 per day",
                    "Best for daily daycare",
                  ],
                  highlight: false,
                },
              ].map((plan, i) => (
                <motion.div
                  key={plan.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className={`rounded-2xl p-6 lg:p-8 shadow-md border transition-all ${
                    plan.highlight
                      ? "bg-[#345460] border-[#48D597]/30 shadow-xl scale-[1.02]"
                      : "bg-white border-black/5 shadow-black/5"
                  }`}
                >
                  {plan.highlight && (
                    <span className="inline-block px-3 py-1 rounded-full bg-[#FB923C] text-white text-xs font-bold mb-4 uppercase tracking-wider">
                      Most Popular
                    </span>
                  )}
                  <h3
                    className={`text-lg font-bold mb-1 ${
                      plan.highlight ? "text-white" : "text-[#345460]"
                    }`}
                  >
                    {plan.title}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span
                      className={`text-4xl font-extrabold ${
                        plan.highlight ? "text-[#48D597]" : "text-[#48D597]"
                      }`}
                    >
                      {plan.price}
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        plan.highlight ? "text-white/50" : "text-[#345460]/50"
                      }`}
                    >
                      {plan.unit}
                    </span>
                  </div>
                  <p
                    className={`text-sm mb-5 ${
                      plan.highlight ? "text-white/50" : "text-[#345460]/50"
                    }`}
                  >
                    {plan.desc}
                  </p>
                  <div className="space-y-2.5 mb-6">
                    {plan.features.map((f) => (
                      <div key={f} className="flex items-center gap-2">
                        <CheckCircle2
                          className={`w-4 h-4 flex-shrink-0 ${
                            plan.highlight
                              ? "text-[#48D597]"
                              : "text-[#48D597]"
                          }`}
                        />
                        <span
                          className={`text-sm ${
                            plan.highlight
                              ? "text-white/70"
                              : "text-[#345460]/65"
                          }`}
                        >
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>
                  <a
                    href="tel:539-867-3841"
                    className={`inline-flex items-center justify-center gap-2 w-full py-3 rounded-full font-bold text-sm transition-all ${
                      plan.highlight
                        ? "bg-[#48D597] text-white hover:bg-[#3bc485] shadow-lg shadow-[#48D597]/25"
                        : "bg-[#345460]/10 text-[#345460] hover:bg-[#345460]/15"
                    }`}
                    onClick={() => trackPhoneCall("daycare_pricing")}
                  >
                    <Phone className="w-4 h-4" />
                    Book Now
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section id="daycare-cta" className="py-16 bg-[#345460]">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Ready for Your Dog's{" "}
              <span className="text-[#48D597]">Best Day Ever</span>?
            </h2>
            <p className="text-white/55 text-lg mb-8 max-w-xl mx-auto">
              Call us today to schedule a tour or book your pup's first free
              daycare visit. New clients always get their first day on us.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="tel:539-867-3841"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#48D597] text-white font-bold text-lg hover:bg-[#3bc485] transition-all shadow-lg shadow-[#48D597]/25"
                onClick={() => trackPhoneCall("daycare_bottom_cta")}
              >
                <Phone className="w-5 h-5" />
                539-867-3841
              </a>
              <button
                onClick={openBookingModal}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-white/25 text-white font-semibold text-lg hover:bg-white/10 transition-all"
              >
                Schedule a Tour
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <p className="mt-6 text-white/30 text-sm">
              1219 E 13th St, Tulsa, OK 74120 · Open Mon–Fri 7am–6pm, Sat–Sun
              9am–5pm
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
