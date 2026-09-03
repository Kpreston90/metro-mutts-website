/*
 * Metro Mutts — /booking Landing Page
 * A clean, shareable entry point for emails, ads, and social links.
 * Shows services at a glance, trust signals, live availability, and clear CTAs.
 * Brand: Green #48D597, Dark #345460, Accent #FB923C
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import { useBookingModal } from "@/contexts/BookingModalContext";
import {
  Phone,
  ExternalLink,
  Dog,
  Scissors,
  Moon,
  Star,
  Shield,
  Clock,
  MapPin,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Users,
  Heart,
  CalendarCheck,
} from "lucide-react";

const GINGR_LOGIN =
  "https://metromutts.portal.gingrapp.com/public/login/Ii9zZWN1cmUvaG9tZSI=";
const GINGR_SIGNUP =
  "https://metromutts.portal.gingrapp.com/public/new_customer";

const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/vet-referred-facility-v3-DCNGQE4pnuuDpVkZkPVYMQ.webp";

/* ─── Services Quick Cards ─── */
const services = [
  {
    icon: Dog,
    title: "Daycare",
    description: "Full-day supervised play, socialization & enrichment",
    highlight: "First day FREE",
    color: "bg-[#48D597]/10 text-[#48D597]",
  },
  {
    icon: Moon,
    title: "Boarding",
    description: "Overnight luxury suites with daycare included",
    highlight: "Camera-monitored overnight",
    color: "bg-sky-50 text-sky-500",
  },
  {
    icon: Scissors,
    title: "Grooming",
    description: "Bath, haircut, nails, teeth & spa treatments",
    highlight: "By appointment",
    color: "bg-[#FB923C]/10 text-[#FB923C]",
  },
];

/* ─── Trust Points ─── */
const trustPoints = [
  { icon: Star, text: "4.9★ on Google & Yelp" },
  { icon: Shield, text: "Trained & certified staff" },
  { icon: Users, text: "Supervised play groups" },
  { icon: Clock, text: "Mon–Fri 7AM–6PM" },
  { icon: MapPin, text: "Tulsa, Oklahoma" },
  { icon: Heart, text: "Family-owned & operated" },
];

/* ─── Animation Variants ─── */
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Booking() {
  const { openBookingModal } = useBookingModal();
  const [showStickyBtn, setShowStickyBtn] = useState(false);

  // Show sticky button after scrolling past the hero
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBtn(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <PageSEO
        title="Book Your Dog's Visit | Metro Mutts — Tulsa Dog Daycare, Boarding & Grooming"
        description="Book daycare, boarding, or grooming for your dog at Metro Mutts in Tulsa. First day of daycare is free. Call 539-867-3841 or book online."
        canonical="https://metromutts.com/booking"
      />
      <Navbar />

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={HERO_IMG}
            alt="Dogs playing at Metro Mutts facility"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a2e38]/92 via-[#345460]/82 to-[#345460]/55" />
        </div>

        <div className="relative container py-16 sm:py-20 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#48D597]/20 text-[#48D597] text-sm font-bold mb-5 backdrop-blur-sm border border-[#48D597]/30">
              <Sparkles className="w-4 h-4" />
              Tulsa's Favorite Dog Daycare
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-5 leading-tight">
              Book Your Dog's{" "}
              <span className="text-[#48D597]">Next Visit</span>
            </h1>
            <p className="text-white/75 text-lg lg:text-xl leading-relaxed mb-8 max-w-xl">
              Daycare, boarding, or grooming — pick your service and we'll take
              care of the rest. First day of daycare is always free.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-[#48D597] hover:bg-[#3bc085] text-[#345460] font-bold text-base px-8 h-13 shadow-xl shadow-black/15 transition-all hover:-translate-y-0.5"
                onClick={openBookingModal}
              >
                Book Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 font-semibold text-base px-8 h-13 bg-transparent"
                asChild
              >
                <a href="tel:5398673841">
                  <Phone className="w-5 h-5 mr-2" />
                  539-867-3841
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <main className="flex-1">
        {/* ─── Services Quick Cards ─── */}
        <section className="py-14 lg:py-20 bg-white">
          <div className="container">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#345460] tracking-tight mb-3">
                Choose Your Service
              </h2>
              <p className="text-[#345460]/60 text-lg max-w-xl mx-auto">
                Select what your pup needs and we'll guide you through booking.
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.title}
                    variants={fadeUp}
                    className="group cursor-pointer"
                    onClick={openBookingModal}
                  >
                    <div className="bg-white rounded-2xl border border-gray-100 p-7 h-full shadow-sm hover:shadow-xl hover:shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:border-[#48D597]/30">
                      <div
                        className={`w-12 h-12 rounded-xl ${service.color} flex items-center justify-center mb-5`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-[#345460] mb-2">
                        {service.title}
                      </h3>
                      <p className="text-[#345460]/60 text-sm leading-relaxed mb-4">
                        {service.description}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#48D597]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {service.highlight}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ─── Trust Signals ─── */}
        <section className="py-12 lg:py-16 bg-gray-50">
          <div className="container">
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {trustPoints.map((point) => {
                const Icon = point.icon;
                return (
                  <motion.div
                    key={point.text}
                    variants={fadeUp}
                    className="flex flex-col items-center text-center gap-2"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#345460]/5 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#345460]/70" />
                    </div>
                    <span className="text-sm font-medium text-[#345460]/80">
                      {point.text}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ─── New vs Returning ─── */}
        <section className="py-14 lg:py-20 bg-white">
          <div className="container">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#345460] tracking-tight mb-3">
                New or Returning?
              </h2>
              <p className="text-[#345460]/60 text-lg max-w-xl mx-auto">
                We've got you covered either way.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {/* New Customer */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-[#48D597]/5 to-[#48D597]/10 rounded-2xl border border-[#48D597]/20 p-8"
              >
                <div className="w-12 h-12 rounded-xl bg-[#48D597]/20 text-[#48D597] flex items-center justify-center mb-5">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#345460] mb-2">
                  New Customer
                </h3>
                <p className="text-[#345460]/60 text-sm leading-relaxed mb-5">
                  Create an account, add your dog's profile, and book a free
                  temperament assessment. Your first day of daycare is on us!
                </p>
                <ul className="space-y-2 mb-6">
                  {["Free first day of daycare", "Quick online sign-up", "Upload records digitally"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-[#345460]/70">
                      <CheckCircle2 className="w-4 h-4 text-[#48D597] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full bg-[#48D597] hover:bg-[#3bc085] text-[#345460] font-bold"
                  asChild
                >
                  <a href={GINGR_SIGNUP} target="_blank" rel="noopener noreferrer">
                    Create Account
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </motion.div>

              {/* Returning Customer */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-[#345460]/5 to-[#345460]/10 rounded-2xl border border-[#345460]/15 p-8"
              >
                <div className="w-12 h-12 rounded-xl bg-[#345460]/10 text-[#345460] flex items-center justify-center mb-5">
                  <CalendarCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#345460] mb-2">
                  Returning Customer
                </h3>
                <p className="text-[#345460]/60 text-sm leading-relaxed mb-5">
                  Log in to your existing account to book daycare, boarding, or
                  grooming. Manage reservations, update records, and more.
                </p>
                <ul className="space-y-2 mb-6">
                  {["Instant booking confirmation", "Manage all reservations", "View report cards & photos"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-[#345460]/70">
                      <CheckCircle2 className="w-4 h-4 text-[#345460]/60 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full bg-[#345460] hover:bg-[#2a4550] text-white font-bold"
                  asChild
                >
                  <a href={GINGR_LOGIN} target="_blank" rel="noopener noreferrer">
                    Log In & Book
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── Quick Info Bar ─── */}
        <section className="py-10 lg:py-14 bg-gray-50 border-t border-gray-100">
          <div className="container">
            <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-center">
              <div>
                <Clock className="w-6 h-6 text-[#48D597] mx-auto mb-2" />
                <p className="font-bold text-[#345460] text-sm">Hours</p>
                <p className="text-[#345460]/60 text-xs mt-1">
                  Mon–Fri 7AM–6PM<br />Sat–Sun 9AM–5PM
                </p>
              </div>
              <div>
                <MapPin className="w-6 h-6 text-[#48D597] mx-auto mb-2" />
                <p className="font-bold text-[#345460] text-sm">Location</p>
                <p className="text-[#345460]/60 text-xs mt-1">
                  Tulsa, Oklahoma<br />7,000+ sq ft facility (4K turfed play space)
                </p>
              </div>
              <div>
                <Phone className="w-6 h-6 text-[#48D597] mx-auto mb-2" />
                <p className="font-bold text-[#345460] text-sm">Call Us</p>
                <p className="text-[#345460]/60 text-xs mt-1">
                  <a href="tel:5398673841" className="hover:text-[#48D597] transition-colors">
                    539-867-3841
                  </a>
                  <br />Questions? We're here to help.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Final CTA ─── */}
        <section className="py-14 lg:py-18 bg-[#345460]">
          <div className="container text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                Your Dog's Best Day Starts Here
              </h2>
              <p className="text-white/60 text-lg mb-8 max-w-lg mx-auto">
                Join hundreds of Tulsa dog owners who trust Metro Mutts for
                daycare, boarding, and grooming.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-[#48D597] hover:bg-[#3bc085] text-[#345460] font-bold text-base px-10 h-14 shadow-xl shadow-black/15 transition-all hover:-translate-y-0.5"
                  onClick={openBookingModal}
                >
                  Book Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 font-semibold text-base px-8 h-14 bg-transparent"
                  asChild
                >
                  <a href="tel:5398673841">
                    <Phone className="w-5 h-5 mr-2" />
                    Call 539-867-3841
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />

      {/* ─── Sticky Book Now Button ─── */}
      <AnimatePresence>
        {showStickyBtn && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 sm:bottom-8"
          >
            <Button
              size="lg"
              className="bg-[#48D597] hover:bg-[#3bc085] text-[#345460] font-bold text-base px-8 h-13 shadow-2xl shadow-black/20 transition-all hover:-translate-y-0.5 rounded-full"
              onClick={openBookingModal}
            >
              <CalendarCheck className="w-5 h-5 mr-2" />
              Book Now
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
