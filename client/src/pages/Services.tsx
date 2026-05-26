/*
 * Metro Mutts All Services Landing Page
 * Unified landing page for all three services — daycare, boarding, grooming
 * Brand: Green #48D597, Dark #345460
 * Designed for general ad campaigns when audience isn't service-specific
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Sun,
  Moon,
  Scissors,
  Phone,
  CheckCircle2,
  Star,
  ArrowRight,
  MapPin,
  Clock,
  Shield,
  Heart,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trackPhoneCall, trackCTA } from "@/lib/analytics";
import { useSectionTracking } from "@/hooks/usePageTracking";
import { useBookingModal } from "@/contexts/BookingModalContext";

const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/services-hero-v2_cd3ef501.png";
const DAYCARE_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/new-daycare-9JTdpbodWw4zW5xQhTfmzM.webp";
const BOARDING_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/boarding-suites-staff-water_b9c9cf4a.png";
const GROOMING_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/grooming-room-active-1_3a32bb83.png";

const services = [
  {
    id: "daycare",
    icon: Sun,
    title: "Dog Daycare",
    tagline: "Play All Day",
    price: "From $30/day",
    freeOffer: "First day FREE",
    description:
      "Supervised group play in 7,000+ sq ft of indoor and outdoor space (4K of turfed play area). Dogs are grouped by size and temperament. Enrichment activities, puzzle toys, and agility equipment keep your pup mentally stimulated and physically tired.",
    features: [
      "Supervised group play",
      "Size & temperament grouping",
      "Indoor & outdoor areas",
      "Enrichment activities",
      "Flexible drop-off (7am–6pm)",
      "Multi-dog discounts",
    ],
    image: DAYCARE_IMG,
    link: "/daycare",
    cta: "Learn About Daycare",
  },
  {
    id: "boarding",
    icon: Moon,
    title: "Overnight Boarding",
    tagline: "Private Suites",
    price: "From $50/night",
    freeOffer: "Includes daily play",
    description:
      "Spacious, climate-controlled private suites with cozy bedding. Every boarding guest gets daily group play sessions, morning and evening walks, meals on your schedule, and overnight staff check-ins.",
    features: [
      "Private boarding suites",
      "24/7 supervised care",
      "Daily group play sessions",
      "Meals & medication included",
      "Evening walks & potty breaks",
      "Multi-dog family discounts",
    ],
    image: BOARDING_IMG,
    link: "/boarding",
    cta: "Learn About Boarding",
  },
  {
    id: "grooming",
    icon: Scissors,
    title: "Grooming & Spa",
    tagline: "Fresh Cuts by Jacque",
    price: "From $30",
    freeOffer: "Premium products",
    description:
      "Professional grooming from basic baths to full breed-specific styling by Jacque, Tulsa's favorite dog groomer. We use premium, pet-safe products and offer spa add-ons including teeth brushing, nail grinding, and oatmeal baths.",
    features: [
      "Full-service grooming",
      "Breed-specific styling",
      "Premium pet-safe products",
      "Spa treatments available",
      "Teeth brushing & nail grinding",
      "Walk-ins when available",
    ],
    image: GROOMING_IMG,
    link: "/grooming",
    cta: "Learn About Grooming",
  },
];

const testimonials = [
  {
    name: "Joseph O.",
    text: "I love Metro Mutts!!! Truly the best doggy daycare in Tulsa. My puppy absolutely loves it there and is always so well taken care of.",
    rating: 5,
    source: "Google",
  },
  {
    name: "Marvin M.",
    text: "This is the only place Allie has not turned and ran to the door when we walk in. Jacque, the groomer is the absolute BEST!",
    rating: 5,
    source: "Google",
  },
  {
    name: "Amy",
    text: "I have an older dog and the groomer is wonderful! She's very good with her and she comes out looking beautiful!",
    rating: 5,
    source: "Google",
  },
];

const highlights = [
  {
    icon: Shield,
    title: "Safe & Supervised",
    desc: "Trained staff, temperament-tested playgroups, and a clean, climate-controlled facility.",
  },
  {
    icon: Heart,
    title: "Passionate Team",
    desc: "We're dog people first. Your pup gets genuine love and individual attention every visit.",
  },
  {
    icon: MapPin,
    title: "Convenient Location",
    desc: "Near downtown Tulsa at 1219 E 13th St. Easy drop-off and pick-up for your daily routine.",
  },
  {
    icon: Clock,
    title: "Flexible Hours",
    desc: "Open Mon–Fri 7am–6pm, Sat–Sun 9am–5pm. We work around your schedule.",
  },
];

export default function Services() {
  const { openBookingModal } = useBookingModal();
  useSectionTracking([
    "services-hero",
    "services-overview",
    "services-highlights",
    "services-testimonials",
    "services-cta",
  ]);

  return (
    <div className="min-h-screen bg-[oklch(0.98_0.003_90)]">
      <Navbar />

      {/* Hero */}
      <section
        id="services-hero"
        className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden"
      >
        <img
          src={HERO_IMG}
          alt="Metro Mutts premium dog care facility at golden hour"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a2e38]/90 via-[#1a2e38]/75 to-[#1a2e38]/45" />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#48D597]/15 text-[#48D597] text-sm font-bold mb-6 tracking-wide uppercase">
              <Star className="w-4 h-4" />
              Tulsa's Premium Dog Care
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-5">
              Daycare. Boarding.{" "}
              <br />
              <span className="text-[#48D597]">Grooming.</span>
            </h1>
            <p className="text-lg text-white/65 max-w-xl mb-8 leading-relaxed">
              Everything your dog needs under one roof — from energetic daycare
              play sessions to cozy overnight stays and professional grooming.
              First day of daycare is always free.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:539-867-3841"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#48D597] text-white font-bold hover:bg-[#3bc485] transition-all shadow-lg shadow-[#48D597]/25 hover:shadow-xl hover:shadow-[#48D597]/30"
                onClick={() => trackPhoneCall("services_hero")}
              >
                <Phone className="w-4 h-4" />
                Call Us — 539-867-3841
              </a>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-white/25 text-white font-semibold hover:bg-white/10 transition-all"
              >
                View All Pricing
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
              { value: "3", label: "Services" },
              { value: "7,000+", label: "Sq Ft Facility" },
              { value: "4.9★", label: "Google Rating" },
              { value: "FREE", label: "First Day Daycare" },
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

      {/* Services Overview */}
      <section id="services-overview" className="py-20 lg:py-28">
        <div className="container">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#48D597]/10 text-[#48D597] text-sm font-bold mb-4 tracking-wide uppercase">
              Our Services
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#345460] tracking-tight mb-4">
              Everything Your Dog{" "}
              <span className="text-[#48D597]">Needs & Loves</span>
            </h2>
            <p className="text-[#345460]/55 text-lg">
              Three premium services designed to keep your pup happy, healthy,
              and looking their best.
            </p>
          </motion.div>

          <div className="space-y-16">
            {services.map((service, i) => {
              const Icon = service.icon;
              const isReversed = i % 2 === 1;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className={`grid lg:grid-cols-2 gap-8 lg:gap-14 items-center`}
                >
                  {/* Image */}
                  <div
                    className={`relative ${isReversed ? "lg:order-2" : ""}`}
                  >
                    <div className="rounded-2xl overflow-hidden shadow-xl shadow-black/10 group">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    {/* Price badge */}
                    <div className="absolute -bottom-3 left-6 px-4 py-2 rounded-xl bg-[#48D597] text-white font-bold text-sm shadow-lg shadow-[#48D597]/25">
                      {service.price}
                    </div>
                  </div>

                  {/* Content */}
                  <div className={isReversed ? "lg:order-1" : ""}>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#48D597]/10 text-[#48D597] text-xs font-bold mb-4 uppercase tracking-wider">
                      <Icon className="w-3.5 h-3.5" />
                      {service.tagline}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#345460] mb-3 tracking-tight">
                      {service.title}
                    </h3>
                    <p className="text-[#345460]/60 text-base leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <div className="grid grid-cols-2 gap-2.5 mb-6">
                      {service.features.map((f) => (
                        <div key={f} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#48D597] flex-shrink-0" />
                          <span className="text-sm text-[#345460]/65">
                            {f}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={service.link}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#48D597] text-white font-bold text-sm hover:bg-[#3bc485] transition-all shadow-lg shadow-[#48D597]/20"
                      >
                        {service.cta}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/pricing#${service.id}`}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#345460]/15 text-[#345460] font-semibold text-sm hover:bg-[#345460]/5 transition-colors"
                      >
                        View Pricing
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Metro Mutts */}
      <section id="services-highlights" className="py-20 lg:py-28 bg-[#345460]">
        <div className="container">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#48D597]/15 text-[#48D597] text-sm font-bold mb-4 tracking-wide uppercase">
              Why Metro Mutts
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Built for Dogs.{" "}
              <span className="text-[#48D597]">Trusted by Families.</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {highlights.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#48D597]/15 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#48D597]" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="services-testimonials" className="py-20 lg:py-28 bg-[oklch(0.97_0.003_90)]">
        <div className="container">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#48D597]/10 text-[#48D597] text-sm font-bold mb-4 tracking-wide uppercase">
              Real Reviews
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#345460] tracking-tight">
              What Tulsa Dog Parents{" "}
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

          {/* Google rating bar */}
          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span className="text-sm font-semibold text-[#345460]">4.9</span>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4].map((i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 text-[#FB923C] fill-[#FB923C]"
                  />
                ))}
                <Star className="w-3.5 h-3.5 text-[#FB923C] fill-[#FB923C] opacity-70" />
              </div>
              <span className="text-xs text-[#345460]/50">
                96 reviews on Google
              </span>
            </div>
            <span className="hidden sm:block text-[#345460]/20">|</span>
            <a
              href="https://www.google.com/maps/place/Metro+Mutts/@36.1468,-95.9868,17z/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-[#48D597] hover:underline underline-offset-2"
            >
              Leave us a review on Google →
            </a>
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section id="services-cta" className="py-16 bg-[#345460]">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Ready to Give Your Dog{" "}
              <span className="text-[#48D597]">The Best</span>?
            </h2>
            <p className="text-white/55 text-lg mb-8 max-w-xl mx-auto">
              Call us today to schedule a tour, book daycare, reserve a boarding
              suite, or schedule a grooming appointment.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="tel:539-867-3841"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#48D597] text-white font-bold text-lg hover:bg-[#3bc485] transition-all shadow-lg shadow-[#48D597]/25"
                onClick={() => trackPhoneCall("services_bottom_cta")}
              >
                <Phone className="w-5 h-5" />
                539-867-3841
              </a>
              <button
                onClick={openBookingModal}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-white/25 text-white font-semibold text-lg hover:bg-white/10 transition-all"
              >
                Book a Free Visit
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
