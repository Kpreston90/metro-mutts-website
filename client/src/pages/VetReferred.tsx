/*
 * Metro Mutts — Vet Referred Landing Page
 * Dedicated page for pet parents referred by veterinary partners.
 * Offers a free trial day and builds trust through vet endorsement messaging.
 * Brand: Green #48D597, Dark #345460
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import {
  Heart,
  Shield,
  Users,
  PawPrint,
  Phone,
  ArrowRight,
  CheckCircle2,
  Stethoscope,
  Star,
  Clock,
  MapPin,
  Sparkles,
  Dog,
  CalendarCheck,
} from "lucide-react";
import { toast } from "sonner";
import { trackFormSubmit, trackCTA } from "@/lib/analytics";

const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/vet-referred-hero-NDd4fTY9BdDrJ9HMbsxEuv.webp";

const FACILITY_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/vet-referred-facility-v3-DCNGQE4pnuuDpVkZkPVYMQ.webp";

const GINGR_URL =
  "https://metromutts.portal.gingrapp.com/public/login/Ii9zZWN1cmUvaG9tZSI=";

const trustPoints = [
  {
    icon: Shield,
    title: "Supervised Play Groups",
    desc: "Dogs are grouped by size, energy, and temperament. Trained staff monitor every interaction.",
  },
  {
    icon: Stethoscope,
    title: "Health-First Approach",
    desc: "Daily health checks at drop-off. We report any concerns directly to you and your vet.",
  },
  {
    icon: Users,
    title: "Low Staff-to-Dog Ratios",
    desc: "Our team maintains safe ratios so every pup gets the attention they deserve.",
  },
  {
    icon: Heart,
    title: "Vet-Approved Protocols",
    desc: "Vaccination requirements, sanitation standards, and emergency procedures your vet would approve of.",
  },
];

const services = [
  {
    icon: Dog,
    title: "Daycare",
    desc: "Full-day supervised play on our indoor turf and outdoor areas. Drop off before work, pick up after.",
    price: "From $30/day",
  },
  {
    icon: Clock,
    title: "Boarding",
    desc: "Overnight stays with evening walks, bedtime routines, and morning play sessions.",
    price: "From $55/night",
  },
  {
    icon: Sparkles,
    title: "Grooming",
    desc: "Baths, haircuts, nail trims, and spa packages. Your pup goes home looking and smelling amazing.",
    price: "From $45",
  },
];

export default function VetReferred() {
  const [formData, setFormData] = useState({
    ownerName: "",
    dogName: "",
    email: "",
    phone: "",
    vetOffice: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Submit form data
      const body = new URLSearchParams({
        "form-name": "vet-referral",
        ...formData,
      });
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      setSubmitted(true);
      trackFormSubmit("vet_referral", true);
      toast.success("We'll be in touch soon to schedule your free trial day!");
    } catch {
      setSubmitted(true);
      trackFormSubmit("vet_referral", false);
      toast.success("We'll be in touch soon to schedule your free trial day!");
    } finally {
      setSubmitting(false);
    }
  };

  // Get vet code from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const vetCode = urlParams.get("ref") || "";

  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf8]">
      <Navbar />

      {/* ─── Hero ─── */}
      <section className="relative h-[460px] sm:h-[420px] lg:h-[520px] overflow-hidden">
        <img
          src={HERO_IMG}
          alt="Veterinary professional recommending Metro Mutts to a dog owner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#345460]/90 via-[#345460]/80 to-[#345460]/40" />
        <div className="relative container h-full flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#48D597]/20 text-[#48D597] text-sm font-bold mb-5 backdrop-blur-sm">
              <Stethoscope className="w-4 h-4" />
              Recommended by Your Vet
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 leading-tight">
              Your Vet Trusts Us.{" "}
              <span className="text-[#48D597]">Your Pup Will Love Us.</span>
            </h1>
            <p className="text-white/80 text-lg lg:text-xl leading-relaxed max-w-xl mb-8">
              Your veterinarian recommended Metro Mutts because they know we
              share the same commitment to your dog's health, safety, and
              happiness. Claim your free trial day below.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-[#48D597] text-[#345460] hover:bg-[#3bc485] font-bold text-base px-8 rounded-full"
                onClick={() => {
                  trackCTA("vet_referred_hero_claim");
                  document
                    .getElementById("claim-form")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Claim Your Free Trial Day
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <a href="tel:5398673841">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 font-bold text-base px-8 rounded-full"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Us: 539-867-3841
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Trust Badge Bar ─── */}
      <section className="bg-[#345460] py-5">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-white/80 text-sm font-medium">
            <span className="flex items-center gap-2">
              <Star className="w-4 h-4 text-[#48D597]" />
              4.9 Google Rating
            </span>
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#48D597]" />
              Fully Insured & Licensed
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#48D597]" />
              Midtown Tulsa
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#48D597]" />
              Mon–Fri 7AM–6PM
            </span>
          </div>
        </div>
      </section>

      {/* ─── Why Your Vet Recommends Us ─── */}
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
              Why Your Vet Recommends Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#345460] mt-3">
              The Same Standards Your Vet Expects
            </h2>
            <p className="text-[#345460]/60 mt-4 max-w-2xl mx-auto text-lg">
              Veterinary professionals recommend Metro Mutts because we operate
              with the same care, attention, and health-first mindset they bring
              to their practice.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {trustPoints.map((point, i) => (
              <motion.div
                key={point.title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-[#345460]/5 hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="w-12 h-12 rounded-xl bg-[#48D597]/10 flex items-center justify-center mb-4">
                  <point.icon className="w-6 h-6 text-[#48D597]" />
                </div>
                <h3 className="font-bold text-[#345460] text-lg mb-2">
                  {point.title}
                </h3>
                <p className="text-[#345460]/60 text-sm leading-relaxed">
                  {point.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Facility Preview ─── */}
      <section className="py-20 lg:py-28 bg-[#345460]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-[#48D597] font-bold text-sm uppercase tracking-widest">
                Our Facility
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 mb-6">
                7,000+ Sq Ft of Pure Pup Paradise
              </h2>
              <div className="space-y-4">
                {[
                  "Indoor artificial turf play areas with climate control",
                  "Separate zones for large and small dogs",
                  "Professional-grade sanitation between sessions",
                  "Webcam access so you can check in anytime",
                  "Secure entry/exit with double-gate system",
                  "Comfortable boarding suites for overnight stays",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#48D597] mt-0.5 shrink-0" />
                    <span className="text-white/80">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link href="/tour">
                  <Button
                    size="lg"
                    className="bg-[#48D597] text-[#345460] hover:bg-[#3bc485] font-bold rounded-full"
                    onClick={() => trackCTA("vet_referred_tour")}
                  >
                    Take a Virtual Tour
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <img
                src={FACILITY_IMG}
                alt="Metro Mutts indoor play area with dogs on green turf"
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-4 -left-4 bg-[#48D597] text-[#345460] rounded-xl px-5 py-3 font-bold shadow-lg">
                <div className="flex items-center gap-2">
                  <PawPrint className="w-5 h-5" />
                  <span>Midtown Tulsa</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Services Overview ─── */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[#48D597] font-bold text-sm uppercase tracking-widest">
              Our Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#345460] mt-3">
              Everything Under One Roof
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {services.map((svc, i) => (
              <motion.div
                key={svc.title}
                className="bg-white rounded-2xl p-6 text-center shadow-sm border border-[#345460]/5 hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="w-14 h-14 rounded-2xl bg-[#345460] flex items-center justify-center mx-auto mb-4">
                  <svc.icon className="w-7 h-7 text-[#48D597]" />
                </div>
                <h3 className="font-bold text-[#345460] text-xl mb-2">
                  {svc.title}
                </h3>
                <p className="text-[#345460]/60 text-sm leading-relaxed mb-3">
                  {svc.desc}
                </p>
                <p className="text-[#48D597] font-bold text-sm">{svc.price}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Claim Your Free Trial Day Form ─── */}
      <section id="claim-form" className="py-20 lg:py-28 bg-[#f5f5f0]">
        <div className="container max-w-3xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#48D597]/15 text-[#48D597] text-sm font-bold mb-5">
              <CalendarCheck className="w-4 h-4" />
              Exclusive Vet Partner Offer
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#345460]">
              Claim Your Free Trial Day
            </h2>
            <p className="text-[#345460]/60 mt-4 text-lg max-w-xl mx-auto">
              Fill out the form below and we'll reach out to schedule your pup's
              complimentary first day at Metro Mutts.
            </p>
          </motion.div>

          {submitted ? (
            <motion.div
              className="bg-white rounded-2xl p-10 shadow-sm border border-[#48D597]/20 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-16 h-16 rounded-full bg-[#48D597]/15 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-[#48D597]" />
              </div>
              <h3 className="text-2xl font-bold text-[#345460] mb-3">
                You're All Set!
              </h3>
              <p className="text-[#345460]/60 text-lg mb-6 max-w-md mx-auto">
                We'll be in touch within 24 hours to schedule your pup's free
                trial day. In the meantime, feel free to explore our facility.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/tour">
                  <Button
                    size="lg"
                    className="bg-[#48D597] text-[#345460] hover:bg-[#3bc485] font-bold rounded-full"
                  >
                    Take a Virtual Tour
                  </Button>
                </Link>
                <a href="tel:5398673841">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-[#345460]/20 text-[#345460] hover:bg-[#345460]/5 font-bold rounded-full"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call Us Now
                  </Button>
                </a>
              </div>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-[#345460]/5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-[#345460] mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.ownerName}
                    onChange={(e) =>
                      setFormData({ ...formData, ownerName: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-[#345460]/15 bg-[#fafaf8] text-[#345460] placeholder:text-[#345460]/30 focus:outline-none focus:ring-2 focus:ring-[#48D597]/40 focus:border-[#48D597] transition-all"
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#345460] mb-2">
                    Dog's Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.dogName}
                    onChange={(e) =>
                      setFormData({ ...formData, dogName: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-[#345460]/15 bg-[#fafaf8] text-[#345460] placeholder:text-[#345460]/30 focus:outline-none focus:ring-2 focus:ring-[#48D597]/40 focus:border-[#48D597] transition-all"
                    placeholder="Buddy"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#345460] mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-[#345460]/15 bg-[#fafaf8] text-[#345460] placeholder:text-[#345460]/30 focus:outline-none focus:ring-2 focus:ring-[#48D597]/40 focus:border-[#48D597] transition-all"
                    placeholder="jane@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#345460] mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-[#345460]/15 bg-[#fafaf8] text-[#345460] placeholder:text-[#345460]/30 focus:outline-none focus:ring-2 focus:ring-[#48D597]/40 focus:border-[#48D597] transition-all"
                    placeholder="(918) 555-1234"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label className="block text-sm font-semibold text-[#345460] mb-2">
                  Which Vet Office Referred You?
                </label>
                <input
                  type="text"
                  value={formData.vetOffice || (vetCode ? `Ref: ${vetCode}` : "")}
                  onChange={(e) =>
                    setFormData({ ...formData, vetOffice: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-[#345460]/15 bg-[#fafaf8] text-[#345460] placeholder:text-[#345460]/30 focus:outline-none focus:ring-2 focus:ring-[#48D597]/40 focus:border-[#48D597] transition-all"
                  placeholder="e.g., Harvard Avenue Veterinary Hospital"
                />
              </div>

              <div className="mt-5">
                <label className="block text-sm font-semibold text-[#345460] mb-2">
                  Anything We Should Know About Your Dog?
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-[#345460]/15 bg-[#fafaf8] text-[#345460] placeholder:text-[#345460]/30 focus:outline-none focus:ring-2 focus:ring-[#48D597]/40 focus:border-[#48D597] transition-all resize-none"
                  placeholder="Breed, age, energy level, any special needs..."
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={submitting}
                className="w-full mt-6 bg-[#48D597] text-[#345460] hover:bg-[#3bc485] font-bold text-base rounded-full h-14"
                onClick={() => trackCTA("vet_referred_form_submit")}
              >
                {submitting ? (
                  "Submitting..."
                ) : (
                  <>
                    Claim My Free Trial Day
                    <PawPrint className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>

              <p className="text-center text-[#345460]/40 text-xs mt-4">
                We'll contact you within 24 hours. No spam, ever.
              </p>
            </motion.form>
          )}
        </div>
      </section>

      {/* ─── Bottom CTA ─── */}
      <section className="py-16 bg-[#345460]">
        <div className="container text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
            Prefer to Call?
          </h2>
          <p className="text-white/70 text-lg mb-6 max-w-lg mx-auto">
            Our team is happy to answer any questions and help you schedule your
            pup's first visit over the phone.
          </p>
          <a href="tel:5398673841">
            <Button
              size="lg"
              className="bg-[#48D597] text-[#345460] hover:bg-[#3bc485] font-bold text-lg px-10 rounded-full"
            >
              <Phone className="w-5 h-5 mr-2" />
              539-867-3841
            </Button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
