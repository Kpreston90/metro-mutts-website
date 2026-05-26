/*
 * Metro Mutts Boarding Landing Page
 * Dedicated landing page for prospective boarding clients
 * Brand: Green #48D597, Dark #345460
 * Designed for ad campaigns, social media, and SEO
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Moon,
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
  Utensils,
  Gamepad2,
  Bed,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import ServiceAvailabilityBar from "@/components/ServiceAvailabilityBar";
import PageSEO from "@/components/PageSEO";
import SEOFaqSection from "@/components/SEOFaqSection";
import Footer from "@/components/Footer";
import { trackPhoneCall, trackCTA } from "@/lib/analytics";
import { useSectionTracking } from "@/hooks/usePageTracking";
import { useBookingModal } from "@/contexts/BookingModalContext";

const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/boarding-suites-staff-water_b9c9cf4a.png";
const FACILITY_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/boarding-playyard-enhanced_15fe1bd8.png";
const KENNELS_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/boarding-suites-staff-water_b9c9cf4a.png";

const included = [
  {
    icon: Bed,
    title: "Spacious Suites",
    desc: "Private, climate-controlled boarding suites with elevated beds and cozy blankets — not cramped kennels.",
  },
  {
    icon: Utensils,
    title: "Meals & Meds",
    desc: "We follow your pup's feeding schedule with their own food. Medication administration included at no extra charge.",
  },
  {
    icon: Gamepad2,
    title: "Daily Playtime",
    desc: "Every boarding guest gets supervised group play sessions in our 7,000+ sq ft indoor and outdoor play areas.",
  },
  {
    icon: Moon,
    title: "Overnight Supervision",
    desc: "Staff check-ins throughout the night ensure your dog is comfortable, safe, and settled.",
  },
  {
    icon: Sun,
    title: "Morning & Evening Walks",
    desc: "Potty breaks and short walks to start and end each day, keeping your pup on their routine.",
  },
  {
    icon: Heart,
    title: "Cuddles & Attention",
    desc: "Our team genuinely loves dogs. Your pup will get belly rubs, ear scratches, and one-on-one attention every day.",
  },
];

const whyUs = [
  "7,000+ sq ft facility (4K of turfed play space)",
  "Climate-controlled facility year-round",
  "Temperament-tested playgroups for safety",
  "Trained, passionate staff on-site",
  "Flexible drop-off & pick-up times",
  "Multi-dog family discounts available",
  "Convenient Tulsa location near downtown",
  "Free first day of daycare for new clients",
];

const testimonials = [
  {
    name: "Sarah M.",
    text: "We were so nervous leaving our golden for the first time, but the Metro Mutts team sent us updates and photos. He didn't want to leave when we picked him up!",
    rating: 5,
  },
  {
    name: "David & Lisa K.",
    text: "Best boarding in Tulsa, hands down. Clean facility, caring staff, and our two pups always come home happy and tired. We won't go anywhere else.",
    rating: 5,
  },
  {
    name: "Jennifer R.",
    text: "The fact that they include playtime with boarding is amazing. Our dog gets a vacation too! Worth every penny for the peace of mind.",
    rating: 5,
  },
];

export default function Boarding() {
  const { openBookingModal } = useBookingModal();
  useSectionTracking(["boarding-hero", "boarding-included", "boarding-facility", "boarding-schedule", "boarding-testimonials", "boarding-pricing", "boarding-cta"]);
  return (
    <div className="min-h-screen bg-[oklch(0.98_0.003_90)]">
      <PageSEO
        title="Dog Boarding in Tulsa, OK | Luxury Overnight Suites | Metro Mutts"
        description="Best dog boarding in Tulsa, Oklahoma. Spacious private suites with climate control, daily supervised play, evening walks, and overnight staff. Book your pup's stay today."
        canonical="https://www.metromutts.com/boarding"
      />
      <Navbar />
      <ServiceAvailabilityBar service="boarding" />

      {/* Hero */}
      <section id="boarding-hero" className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <img
          src={HERO_IMG}
          alt="Happy golden retriever relaxing in a cozy Metro Mutts boarding suite"
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
              <Moon className="w-4 h-4" />
              Dog Boarding in Tulsa
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-5">
              Dog Boarding in{" "}
              <span className="text-[#48D597]">Tulsa, OK</span>
              <br />
              — Your Dog's Home Away From Home
            </h1>
            <p className="text-lg text-white/65 max-w-xl mb-8 leading-relaxed">
              Spacious suites, daily playtime, and round-the-clock care — because
              your pup deserves a vacation too. Tulsa's most trusted overnight
              dog boarding facility.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:539-867-3841"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#48D597] text-white font-bold hover:bg-[#3bc485] transition-all shadow-lg shadow-[#48D597]/25 hover:shadow-xl hover:shadow-[#48D597]/30"
                onClick={() => trackPhoneCall("boarding_hero")}
              >
                <Phone className="w-4 h-4" />
                Book a Stay — 539-867-3841
              </a>
              <Link
                href="/pricing#boarding"
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
              { value: "$50", label: "Per Night" },
              { value: "$45", label: "Additional Dogs" },
              { value: "7,000+", label: "Sq Ft Facility" },
              { value: "24/7", label: "Supervised Care" },
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
      <section id="boarding-included" className="py-20 lg:py-28">
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
              Everything Your Pup Needs for a{" "}
              <span className="text-[#48D597]">Perfect Stay</span>
            </h2>
            <p className="text-[#345460]/55 text-lg">
              Our boarding rate covers it all — no hidden fees, no surprise charges.
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
      <section id="boarding-facility" className="py-20 lg:py-28 bg-[#345460]">
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
                  src={FACILITY_IMG}
                  alt="Dogs playing together in Metro Mutts indoor play area"
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
                <span className="text-[#48D597]">Trust Us</span>
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

      {/* A Day in Boarding */}
      <section className="py-20 lg:py-28">
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
              <span className="text-[#48D597]">Boarding Life</span>
            </h2>
          </motion.div>

          {/* Kennels photo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto mb-12 rounded-2xl overflow-hidden shadow-xl"
          >
            <img
              src={KENNELS_IMG}
              alt="Dogs relaxing in cozy Metro Mutts boarding kennels with plush beds and toys"
              className="w-full aspect-[16/9] object-cover"
            />
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {[
              { time: "7:00 AM", activity: "Morning potty break & walk", icon: Sun },
              { time: "7:30 AM", activity: "Breakfast served (your pup's own food)", icon: Utensils },
              { time: "9:00 AM", activity: "Group play session — supervised socialization", icon: Dog },
              { time: "12:00 PM", activity: "Midday potty break & rest time", icon: Clock },
              { time: "2:00 PM", activity: "Afternoon play session & enrichment", icon: Gamepad2 },
              { time: "5:00 PM", activity: "Dinner served & evening walk", icon: Utensils },
              { time: "7:00 PM", activity: "Wind-down time with cuddles & belly rubs", icon: Heart },
              { time: "9:00 PM", activity: "Final potty break & lights out in cozy suite", icon: Moon },
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
      <section className="py-20 lg:py-28 bg-[oklch(0.97_0.003_90)]">
        <div className="container">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#48D597]/10 text-[#48D597] text-sm font-bold mb-4 tracking-wide uppercase">
              Happy Guests
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#345460] tracking-tight">
              What Boarding Parents{" "}
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
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 text-[#FB923C]"
                      fill="currentColor"
                    />
                  ))}
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
      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl shadow-black/5 border border-black/5 text-center"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#48D597]/10 text-[#48D597] text-sm font-bold mb-6 tracking-wide uppercase">
                Simple Pricing
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#345460] tracking-tight mb-2">
                Overnight Boarding
              </h2>
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-6xl font-extrabold text-[#48D597]">$50</span>
                <span className="text-xl text-[#345460]/50 font-medium">/ night</span>
              </div>
              <p className="text-[#345460]/50 mb-8">
                Additional dogs from the same family:{" "}
                <span className="font-bold text-[#345460]">$45/night</span>
              </p>
              <div className="grid sm:grid-cols-2 gap-3 text-left max-w-md mx-auto mb-8">
                {[
                  "Private boarding suite",
                  "Daily group play sessions",
                  "Meals on your schedule",
                  "Medication administration",
                  "Morning & evening walks",
                  "Overnight staff check-ins",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#48D597] flex-shrink-0" />
                    <span className="text-sm text-[#345460]/70">{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="tel:539-867-3841"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#48D597] text-white font-bold hover:bg-[#3bc485] transition-all shadow-lg shadow-[#48D597]/25"
                  onClick={() => trackPhoneCall("boarding_pricing")}
                >
                  <Phone className="w-4 h-4" />
                  Book a Stay
                </a>
                <Link
                  href="/pricing#boarding"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border-2 border-[#345460]/15 text-[#345460] font-semibold hover:bg-[#345460]/5 transition-colors"
                >
                  Full Pricing Details
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-[#345460]">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Ready to Book Your Dog's{" "}
              <span className="text-[#48D597]">Staycation</span>?
            </h2>
            <p className="text-white/55 text-lg mb-8 max-w-xl mx-auto">
              Call us today to schedule a tour or book your pup's first overnight
              stay. First-time boarding clients get a free temperament assessment.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="tel:539-867-3841"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#48D597] text-white font-bold text-lg hover:bg-[#3bc485] transition-all shadow-lg shadow-[#48D597]/25"
                onClick={() => trackPhoneCall("boarding_bottom_cta")}
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
              1219 E 13th St, Tulsa, OK 74120 · Open Mon–Fri 7am–6pm, Sat–Sun 9am–5pm
            </p>
          </motion.div>
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
            answer: "Dog boarding at Metro Mutts starts at $50 per night for a private suite. Multi-night stays and multi-dog families receive discounts. Every boarding stay includes daily supervised group play, meals on your schedule, evening walks, and overnight staff check-ins — no hidden fees."
          },
          {
            question: "What is included in overnight dog boarding at Metro Mutts?",
            answer: "Every boarding stay includes a private climate-controlled suite with cozy bedding, daily group play sessions, individual attention, meals served on your schedule, evening potty walks, and overnight staff monitoring. We also offer add-ons like grooming, extra play sessions, and webcam access."
          },
          {
            question: "What vaccinations are required for dog boarding?",
            answer: "All dogs must be current on Rabies, DHPP (Distemper), and Bordetella (kennel cough) vaccinations. We also require a negative fecal test within the past 12 months. Puppies must have completed their full vaccination series. We verify records before every stay to keep all pups safe."
          },
          {
            question: "Can I board my dog if they have never been to Metro Mutts before?",
            answer: "Yes! We recommend scheduling a free daycare trial day first so your dog can get comfortable with our facility, staff, and other pups. This helps reduce stress during their first overnight stay. Call 539-867-3841 to schedule your pup's meet-and-greet."
          },
          {
            question: "What makes Metro Mutts different from other dog boarding in Tulsa?",
            answer: "Metro Mutts is Tulsa's newest purpose-built dog care facility with 7,000+ sq ft of indoor and outdoor space (4,000 sq ft of turfed play area). Unlike traditional kennels, our dogs aren't crated all day — they enjoy supervised group play, enrichment activities, and personalized attention. We're family-run by the team behind OKC's most waitlisted dog care spot."
          },
          {
            question: "Do you offer boarding for large dogs in Tulsa?",
            answer: "Absolutely! We welcome dogs of all sizes. Our spacious suites comfortably accommodate large and giant breeds. During play sessions, dogs are grouped by size and temperament to ensure safe, enjoyable interactions for everyone."
          },
          {
            question: "What are your dog boarding hours for drop-off and pick-up?",
            answer: "Drop-off is available Monday through Friday from 7:00 AM to 6:00 PM, and Saturday & Sunday 9:00 AM to 5:00 PM. We're flexible with scheduling — just let us know your travel plans and we'll work with you."
          }
        ]}
      />

      <Footer />
    </div>
  );
}
