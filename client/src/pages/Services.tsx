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
import { formatCurrency, pricing } from "@/data/pricing";

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
    price: `${formatCurrency(pricing.daycare.fullDay)}/day`,
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
      "Spacious, climate-controlled private suites with cozy bedding. Every boarding guest gets daily group play sessions, morning and evening walks, meals on your schedule, and camera-monitored overnight care.",
    features: [
      "Private boarding suites",
      "Camera-monitored overnight",
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
    price: "Call for a quote",
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

      {/* Customer feedback */}
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
              Customer Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#345460] tracking-tight">
              Read Current Customer{" "}
              <span className="text-[#48D597]">Feedback</span>
            </h2>
            <p className="mt-4 text-base text-[#345460]/60">Explore current reviews directly on Google.</p>
          </motion.div>

          <a
            href="https://www.google.com/maps/search/Metro+Mutts+1219+E+13th+St+Tulsa+OK"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto flex max-w-xl items-center justify-center gap-2 rounded-full bg-[#48D597] px-7 py-3.5 font-bold text-[#345460] shadow-lg shadow-[#48D597]/20 transition-colors hover:bg-[#3bc085]"
          >
            Read Reviews on Google
            <ArrowRight className="h-4 w-4" />
          </a>
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
