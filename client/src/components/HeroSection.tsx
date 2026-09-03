/*
 * Metro Mutts — permanent homepage hero
 * Brand: Green #48D597, Dark #345460
 */
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Star } from "lucide-react";
import { useBookingModal } from "@/contexts/BookingModalContext";
import { trpc } from "@/lib/trpc";

const FACILITY_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/vet-referred-facility-v3-DCNGQE4pnuuDpVkZkPVYMQ.webp";

export default function HeroSection() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const { openBookingModal } = useBookingModal();

  useEffect(() => {
    const timeout = window.setTimeout(() => setHeroLoaded(true), 100);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <section
      data-hero-section
      className={`relative h-[600px] overflow-hidden sm:h-[700px] lg:h-[750px] transition-all duration-1000 ease-out ${
        heroLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <img
        src={FACILITY_IMG}
        alt="Metro Mutts indoor play area with staff and happy dogs on turf"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a2e38]/55 via-[#1a2e38]/25 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/10" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#1a2e38]/20 to-transparent" />

      <div className="relative container flex h-full flex-col justify-center pb-36 sm:pb-36">
        <div className="max-w-2xl">
          <span className="animate-in fade-in slide-in-from-bottom-2 inline-flex items-center gap-2 rounded-full border border-[#48D597]/30 bg-[#48D597]/20 px-3 py-1 text-xs font-semibold text-[#48D597] backdrop-blur-sm sm:mb-6 sm:px-4 sm:py-1.5 sm:text-sm">
            <Play className="h-3 w-3 fill-current sm:h-3.5 sm:w-3.5" />
            Play. Learn. Belong.
          </span>

          <h1 className="mt-3 text-4xl font-extrabold leading-[1.08] tracking-tight text-white drop-shadow-lg sm:mt-0 sm:text-5xl lg:text-6xl xl:text-7xl">
            Every Day Should Feel{" "}
            <span className="text-[#48D597]">Like This.</span>
          </h1>

          <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/85 drop-shadow-md sm:mt-6 sm:text-xl">
            Safe playgroups. Dedicated small dog areas. Plenty of room to run, explore, and make new friends—all under the care of a team that truly loves dogs.
          </p>

          <Button
            size="lg"
            className="mt-6 h-12 bg-[#48D597] px-6 text-sm font-bold text-[#345460] shadow-xl shadow-[#48D597]/25 transition-all hover:-translate-y-0.5 hover:bg-[#3bc085] hover:shadow-2xl hover:shadow-[#48D597]/30 sm:mt-8 sm:h-13 sm:px-8 sm:text-base"
            onClick={openBookingModal}
          >
            Schedule a Tour
            <ArrowRight className="ml-1 h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
      </div>

      <div className="absolute bottom-32 left-0 right-0 z-10 sm:bottom-40">
        <div className="container">
          <a
            href="https://www.google.com/maps/place/Metro+Mutts"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-xs backdrop-blur-sm transition-colors hover:bg-white/15 sm:gap-2 sm:px-3 sm:py-1.5"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 flex-shrink-0 sm:h-4.5 sm:w-4.5" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            <span className="font-bold text-white sm:text-sm">4.8</span>
            <span className="flex gap-0.5" aria-label="5 stars">
              {[1, 2, 3, 4, 5].map(star => (
                <Star key={star} className="h-3 w-3 fill-amber-400 text-amber-400 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
              ))}
            </span>
            <span className="text-white/60">108 reviews</span>
          </a>
        </div>
      </div>

      <div className="absolute bottom-20 left-0 right-0 z-10 sm:bottom-28">
        <div className="container">
          <HeroAvailabilityBadge />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-auto w-full" preserveAspectRatio="none">
          <path d="M0 40L48 35C96 30 192 20 288 18C384 16 480 22 576 30C672 38 768 48 864 50C960 52 1056 46 1152 38C1248 30 1344 20 1392 15L1440 10V80H1392C1344 80 1248 80 1152 80C1056 80 960 80 864 80C768 80 672 80 576 80C480 80 384 80 288 80C192 80 96 80 48 80H0V40Z" fill="oklch(0.995 0.002 90)" />
        </svg>
      </div>
    </section>
  );
}

function HeroAvailabilityBadge() {
  const { data: availability } = trpc.availability.todayAndTomorrow.useQuery(undefined, {
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const getSummary = () => {
    if (!availability) return null;
    const { today } = availability;
    const parts: string[] = [];
    if (today.daycare.spotsLeft > 0) parts.push(`${today.daycare.spotsLeft} daycare`);
    if (today.boarding.spotsLeft > 0) parts.push(`${today.boarding.spotsLeft} boarding`);
    if (parts.length === 0) return null;
    return `${parts.join(" · ")} spots open today`;
  };

  const summary = getSummary();
  const displayText = summary || "33 daycare · 12 boarding spots open today";

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#48D597] opacity-75" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#48D597]" />
      </span>
      <span className="text-sm font-medium text-white/90">{displayText}</span>
    </div>
  );
}
