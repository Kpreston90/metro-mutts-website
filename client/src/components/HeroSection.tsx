/*
 * Metro Mutts — permanent homepage hero
 * Brand: Green #48D597, Dark #345460
 */
import { useEffect, useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "wouter";

const FACILITY_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/vet-referred-facility-v3-DCNGQE4pnuuDpVkZkPVYMQ.webp";

export default function HeroSection() {
  const [heroLoaded, setHeroLoaded] = useState(false);

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
            PLAY. LEARN. BELONG.
          </span>

          <h1 className="mt-3 text-4xl font-extrabold leading-[1.08] tracking-tight text-white drop-shadow-lg sm:mt-0 sm:text-5xl lg:text-6xl xl:text-7xl">
            Tulsa Dog Daycare, <span className="text-[#48D597]">Boarding &amp; Grooming</span>
          </h1>

          <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/85 drop-shadow-md sm:mt-6 sm:text-xl">
            Safe, supervised care in our 7,000-square-foot facility—with separate playgroups, indoor and outdoor space, and a team that genuinely knows dogs.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 sm:mt-8 sm:gap-4">
            <Link
              href="/get-started"
              className="inline-flex h-12 items-center justify-center bg-[#48D597] px-6 text-sm font-bold text-[#345460] shadow-xl shadow-[#48D597]/25 transition-all hover:-translate-y-0.5 hover:bg-[#3bc085] hover:shadow-2xl hover:shadow-[#48D597]/30 sm:h-13 sm:px-8 sm:text-base"
            >
              Book Your Dog&apos;s First Visit
              <ArrowRight className="ml-1 h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex h-12 items-center justify-center border border-white/40 bg-white/10 px-6 text-sm font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:h-13 sm:px-8 sm:text-base"
            >
              View Pricing
            </Link>
          </div>
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
