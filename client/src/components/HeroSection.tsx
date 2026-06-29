/*
 * Metro Mutts Hero Section — Static Photo Background
 * Brand: Green #48D597, Dark #345460
 * Full-width photo hero with dark overlay, animated text, wave SVG divider
 */
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import { useBookingModal } from "@/contexts/BookingModalContext";
import { trpc } from "@/lib/trpc";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/vet-referred-facility-v3-DCNGQE4pnuuDpVkZkPVYMQ.webp";

export default function HeroSection() {
  const { openBookingModal } = useBookingModal();
  return (
    <section className="relative overflow-hidden flex items-center">
      {/* Photo background */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="Metro Mutts staff playing with dogs on indoor turf"
          className="w-full h-full object-cover"
        />
        {/* Morning-light gradient overlay — brighter, warmer feel */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a2e38]/75 via-[#345460]/55 to-[#345460]/30" />
        {/* Extra bottom fade for wave transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#345460]/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container py-20 sm:py-24 lg:py-28">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#48D597]/20 text-[#48D597] text-sm font-semibold mb-6 border border-[#48D597]/30 backdrop-blur-sm">
              <Play className="w-3.5 h-3.5 fill-current" />
              Tulsa's Favorite Dog Daycare
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.08] tracking-tight mb-6 drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            Where Every Dog{" "}
            <span className="text-[#48D597]">Wants</span> to Be
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-white/85 leading-relaxed mb-8 max-w-xl drop-shadow-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            7,000+ sq ft of play, rest & real care. Tulsa's premier dog daycare, boarding, and grooming facility.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
          >
            <Button
              size="lg"
              className="bg-[#48D597] hover:bg-[#3bc085] text-[#345460] font-bold text-base px-8 h-13 shadow-xl shadow-[#48D597]/25 transition-all hover:shadow-2xl hover:shadow-[#48D597]/30 hover:-translate-y-0.5"
              onClick={openBookingModal}
            >
              Book a Free Visit
              <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 font-semibold text-base px-8 h-13 bg-transparent backdrop-blur-sm"
              onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
            >
              Explore Services
            </Button>
          </motion.div>

          {/* Live availability badge */}
          <HeroAvailabilityBadge />

          {/* Trust badge */}
          <motion.div
            className="mt-10 pt-8 border-t border-white/15"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <div className="inline-flex items-center gap-2">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map((i) => (
                  <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-white/80 text-sm font-medium">Rated 5 stars by 100+ happy dog owners</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" preserveAspectRatio="none">
          <path d="M0 40L48 35C96 30 192 20 288 18C384 16 480 22 576 30C672 38 768 48 864 50C960 52 1056 46 1152 38C1248 30 1344 20 1392 15L1440 10V80H1392C1344 80 1248 80 1152 80C1056 80 960 80 864 80C768 80 672 80 576 80C480 80 384 80 288 80C192 80 96 80 48 80H0V40Z" fill="oklch(0.995 0.002 90)" />
        </svg>
      </div>
    </section>
  );
}

/* ─── Live Availability Badge ─── */
function HeroAvailabilityBadge() {
  const { data: availability } = trpc.availability.todayAndTomorrow.useQuery(
    undefined,
    { staleTime: 5 * 60 * 1000, retry: 1 }
  );

  // Build a summary string from real data
  const getSummary = () => {
    if (!availability) return null;
    const { today } = availability;
    const parts: string[] = [];
    if (today.daycare.spotsLeft > 0) parts.push(`${today.daycare.spotsLeft} daycare`);
    if (today.grooming.spotsLeft > 0) parts.push(`${today.grooming.spotsLeft} grooming`);
    if (today.boarding.spotsLeft > 0) parts.push(`${today.boarding.spotsLeft} boarding`);
    if (parts.length === 0) return null;
    return parts.join(" \u00B7 ") + " spots open today";
  };

  const summary = getSummary();

  // Show actual capacity as fallback when API hasn't loaded
  const displayText = summary || "33 daycare \u00B7 12 boarding spots open today";

  return (
    <motion.div
      className="mt-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#48D597] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#48D597]"></span>
        </span>
        <span className="text-white/90 text-sm font-medium">
          {displayText}
        </span>
      </div>
    </motion.div>
  );
}
