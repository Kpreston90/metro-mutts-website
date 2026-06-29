/*
 * Metro Mutts Hero Slider — Auto-rotating hero with multiple slides
 * Brand: Green #48D597, Dark #345460
 * Slides: 1) Main CTA  2) Dog of the Week  3) Facility
 * Fixed height, crossfade only, no initial load glitch
 */
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useBookingModal } from "@/contexts/BookingModalContext";
import { trpc } from "@/lib/trpc";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/hero-welcome-v4-AoYRMSTyzjVinFfTjXN5YV.webp";
const DOTW_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/dotw-real-pup_37baa9e9.webp";
const TURF_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/vet-referred-facility-v3-DCNGQE4pnuuDpVkZkPVYMQ.webp";

interface Slide {
  id: string;
  image: string;
  alt: string;
}

const slides: Slide[] = [
  {
    id: "main",
    image: HERO_IMG,
    alt: "Dog pulling on leash toward Metro Mutts entrance, excited for daycare",
  },
  {
    id: "dotw",
    image: DOTW_IMG,
    alt: "Dog of the Week - Cooper the Golden Retriever at Metro Mutts",
  },
  {
    id: "facility",
    image: TURF_IMG,
    alt: "Metro Mutts indoor play area with staff and happy dogs on turf",
  },
];

const SLIDE_INTERVAL = 7000;

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { openBookingModal } = useBookingModal();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    resetTimer();
  }, [resetTimer]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    resetTimer();
  }, [resetTimer]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    resetTimer();
  }, [resetTimer]);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [resetTimer]);

  return (
    <section className="relative overflow-hidden h-[600px] sm:h-[650px] lg:h-[700px]">
      {/* Background images — crossfade only */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: index === currentSlide ? 1 : 0 }}
        >
          <img
            src={slide.image}
            alt={slide.alt}
            className="w-full h-full object-cover"
          />
          {/* Morning glow overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a2e38]/55 via-[#2a4048]/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/12 via-orange-400/6 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#345460]/20 to-transparent" />
        </div>
      ))}

      {/* Content — crossfade between slides, no vertical motion */}
      <div className="relative h-full container flex items-center">
        <div className="max-w-2xl w-full">
          {/* All slide content stacked absolutely so height is fixed */}
          <div className="relative min-h-[420px] sm:min-h-[440px]">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                style={{
                  opacity: index === currentSlide ? 1 : 0,
                  pointerEvents: index === currentSlide ? "auto" : "none",
                }}
              >
                {index === 0 && <MainSlideContent openBookingModal={openBookingModal} />}
                {index === 1 && <DOTWSlideContent openBookingModal={openBookingModal} />}
                {index === 2 && <FacilitySlideContent openBookingModal={openBookingModal} />}
              </div>
            ))}
          </div>

          {/* Live availability badge — always visible */}
          <HeroAvailabilityBadge />
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "w-8 bg-[#48D597]"
                : "w-2 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
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

/* ─── Slide 1: Main CTA ─── */
function MainSlideContent({ openBookingModal }: { openBookingModal: () => void }) {
  return (
    <div>
      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#48D597]/20 text-[#48D597] text-sm font-semibold mb-6 border border-[#48D597]/30 backdrop-blur-sm">
        <Play className="w-3.5 h-3.5 fill-current" />
        Tulsa's Favorite Dog Daycare
      </span>

      <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.08] tracking-tight mb-6 drop-shadow-lg">
        Where Every Dog{" "}
        <span className="text-[#48D597]">Wants</span> to Be
      </h1>

      <p className="text-lg sm:text-xl text-white/85 leading-relaxed mb-8 max-w-xl drop-shadow-md">
        7,000+ sq ft of play, rest & real care. Tulsa's premier dog daycare, boarding, and grooming facility.
      </p>

      <div className="flex flex-wrap gap-4">
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
      </div>

      {/* Trust badge */}
      <div className="mt-8 pt-6 border-t border-white/15">
        <div className="inline-flex items-center gap-2">
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map((i) => (
              <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
            ))}
          </div>
          <span className="text-white/80 text-sm font-medium">Rated 5 stars by 100+ happy dog owners</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Slide 2: Dog of the Week (Coming Soon) ─── */
function DOTWSlideContent({ openBookingModal }: { openBookingModal: () => void }) {
  return (
    <div>
      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 text-amber-300 text-sm font-semibold mb-6 border border-amber-400/30 backdrop-blur-sm">
        <Star className="w-3.5 h-3.5 fill-current" />
        Coming Soon
      </span>

      <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.08] tracking-tight mb-4 drop-shadow-lg">
        Pup of the <span className="text-[#48D597]">Week</span>
      </h1>

      <p className="text-lg sm:text-xl text-white/85 leading-relaxed mb-3 max-w-xl drop-shadow-md">
        Every week, we spotlight one of our amazing regulars.
      </p>

      <p className="text-base text-white/70 leading-relaxed mb-8 max-w-xl drop-shadow-md">
        Get to know the pups that make Metro Mutts special. Their name, their story, their favorite game. Could your dog be next?
      </p>

      <div className="flex flex-wrap gap-4">
        <Button
          size="lg"
          className="bg-[#48D597] hover:bg-[#3bc085] text-[#345460] font-bold text-base px-8 h-13 shadow-xl shadow-[#48D597]/25 transition-all hover:shadow-2xl hover:shadow-[#48D597]/30 hover:-translate-y-0.5"
          onClick={openBookingModal}
        >
          Book Your Pup's First Day
          <ArrowRight className="w-5 h-5 ml-1" />
        </Button>
      </div>
    </div>
  );
}

/* ─── Slide 3: Facility / Play All Day ─── */
function FacilitySlideContent({ openBookingModal }: { openBookingModal: () => void }) {
  return (
    <div>
      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#48D597]/20 text-[#48D597] text-sm font-semibold mb-6 border border-[#48D597]/30 backdrop-blur-sm">
        <Play className="w-3.5 h-3.5 fill-current" />
        Play All Day
      </span>

      <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.08] tracking-tight mb-6 drop-shadow-lg">
        7,000+ Sq Ft of{" "}
        <span className="text-[#48D597]">Pure Joy</span>
      </h1>

      <p className="text-lg sm:text-xl text-white/85 leading-relaxed mb-8 max-w-xl drop-shadow-md">
        Indoor turf play areas, dedicated small dog zones, and a team that treats every pup like family. This is what dog daycare should be.
      </p>

      <div className="flex flex-wrap gap-4">
        <Button
          size="lg"
          className="bg-[#48D597] hover:bg-[#3bc085] text-[#345460] font-bold text-base px-8 h-13 shadow-xl shadow-[#48D597]/25 transition-all hover:shadow-2xl hover:shadow-[#48D597]/30 hover:-translate-y-0.5"
          onClick={openBookingModal}
        >
          Schedule a Tour
          <ArrowRight className="w-5 h-5 ml-1" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="border-white/30 text-white hover:bg-white/10 font-semibold text-base px-8 h-13 bg-transparent backdrop-blur-sm"
          onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
        >
          View Services
        </Button>
      </div>
    </div>
  );
}

/* ─── Live Availability Badge ─── */
function HeroAvailabilityBadge() {
  const { data: availability } = trpc.availability.todayAndTomorrow.useQuery(
    undefined,
    { staleTime: 5 * 60 * 1000, retry: 1 }
  );

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
  const displayText = summary || "33 daycare \u00B7 12 boarding spots open today";

  return (
    <div className="mt-8">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#48D597] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#48D597]"></span>
        </span>
        <span className="text-white/90 text-sm font-medium">
          {displayText}
        </span>
      </div>
    </div>
  );
}
