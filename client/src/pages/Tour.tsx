/*
 * Metro Mutts Virtual Facility Tour
 * Brand: Green #48D597, Dark #345460
 * Room-by-room walkthrough using real facility photos
 * Designed to build trust and drive bookings
 */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight,
  Phone,
  MapPin,
  Camera,
  Shield,
  Sparkles,
  Dog,
  Scissors,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trackPhoneCall, trackCTA } from "@/lib/analytics";
import { useBookingModal } from "@/contexts/BookingModalContext";

/* ── CDN image URLs ─────────────────────────────────────── */
const IMAGES = {
  lobbyWide:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/facility-lobby-wide_f16bbb5d.jpg",
  lobbyEntry:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/facility-lobby-entry_5549a8ab.jpg",
  lobbyCounter:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/facility-lobby-counter_aa421086.jpg",
  lobbyBack:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/facility-lobby-back_b0a245ff.jpg",
  checkIn:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/IMG_5305_29accea5.jpg",
  hallway:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/facility-hallway_f15e2f93.jpg",
  playEntry:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/facility-play-area-entry_65064dd0.jpg",
  playTurf:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/facility-play-area-turf_902c5b16.jpg",
  backArea:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/facility-back-area_035c064f.jpg",
  groomCollie:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/IMG_4498_b86f4033.jpg",
  groomDoodle:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/IMG_4504_a6207116.jpg",
  groomAussie:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/PhotoOct302024,115828AM_4ffe8401.webp",
  yorkiePlayArea:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/FullSizeRender_a37f8aa0.jpg",
};

/* ── Tour stops data ────────────────────────────────────── */
const tourStops = [
  {
    id: "lobby",
    number: "01",
    title: "Lobby & Check-In",
    subtitle: "Where every great day begins",
    icon: MapPin,
    color: "#48D597",
    description:
      "Walk through our front doors and you're greeted by our bright, open lobby with a granite check-in counter, colorful dog art on the walls, and a friendly face behind the desk. This is where we get to know you and your pup, handle paperwork, and make sure every visit starts stress-free.",
    highlights: [
      "Granite check-in counter",
      "Secure entry with baby gates",
      "Dog art gallery on walls",
      "Climate-controlled comfort",
    ],
    images: [
      { src: IMAGES.lobbyWide, alt: "Wide view of Metro Mutts lobby with granite counter and green doors" },
      { src: IMAGES.lobbyEntry, alt: "Metro Mutts front entrance and lobby" },
      { src: IMAGES.lobbyCounter, alt: "Granite check-in counter at Metro Mutts" },
      { src: IMAGES.checkIn, alt: "Customer checking in with their doodle at the front desk" },
    ],
  },
  {
    id: "hallway",
    number: "02",
    title: "The Hallway",
    subtitle: "Industrial charm meets modern care",
    icon: ArrowRight,
    color: "#48D597",
    description:
      "Step through the signature green door and into our hallway — a beautifully converted industrial space with original steel-frame windows that flood the corridor with natural light. This is the transition from check-in to playtime, and dogs can already sense the excitement ahead.",
    highlights: [
      "Original industrial windows",
      "Natural light throughout",
      "Epoxy-sealed floors for easy cleaning",
      "Secure transition zone",
    ],
    images: [
      { src: IMAGES.hallway, alt: "Industrial hallway with steel-frame windows at Metro Mutts" },
      { src: IMAGES.lobbyBack, alt: "View from lobby toward the hallway and green door" },
    ],
  },
  {
    id: "play-area",
    number: "03",
    title: "Indoor Play Area",
    subtitle: "7,000+ sq ft of pure pup paradise",
    icon: Dog,
    color: "#48D597",
    description:
      "The heart of Metro Mutts — our massive indoor play area features professional-grade artificial turf, towering ceilings with exposed steel beams, and a roll-up garage door that opens to our outdoor yard. Dogs are grouped by size and temperament for safe, supervised play sessions throughout the day.",
    highlights: [
      "Professional artificial turf",
      "4,000 sq ft of turfed play space",
      "Roll-up garage door to outdoor yard",
      "Size-appropriate play groups",
    ],
    images: [
      { src: IMAGES.playEntry, alt: "Entry to the indoor play area with turf and steel beams" },
      { src: IMAGES.playTurf, alt: "Wide view of indoor turf play area" },
      { src: IMAGES.yorkiePlayArea, alt: "Happy yorkie in the play area" },
      { src: IMAGES.backArea, alt: "Back area of the facility" },
    ],
  },
  {
    id: "grooming",
    number: "04",
    title: "Grooming Salon",
    subtitle: "Where every pup gets the spa treatment",
    icon: Scissors,
    color: "#48D597",
    description:
      "Our professional grooming salon is equipped with hydraulic grooming tables, a full line of premium shampoos and conditioners, and everything our groomer Jacque needs to make your dog look and feel their best. From basic baths to full breed-specific cuts, this is where the magic happens.",
    highlights: [
      "Professional hydraulic tables",
      "Premium pet-safe products",
      "Breed-specific styling",
      "Same-day daycare + grooming combo",
    ],
    images: [
      { src: IMAGES.groomCollie, alt: "Beautiful collie on the grooming table at Metro Mutts" },
      { src: IMAGES.groomDoodle, alt: "Goldendoodle getting groomed at Metro Mutts" },
      { src: IMAGES.groomAussie, alt: "Blue merle Australian Shepherd on grooming table" },
    ],
  },
];

/* ── Lightbox component ─────────────────────────────────── */
function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: { src: string; alt: string }[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={onPrev}
            className="absolute left-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={onNext}
            className="absolute right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      <motion.img
        key={currentIndex}
        src={images[currentIndex].src}
        alt={images[currentIndex].alt}
        className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl shadow-2xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      />

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === currentIndex ? "bg-[#48D597]" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ── Tour Stop Section ──────────────────────────────────── */
function TourStop({
  stop,
  index,
}: {
  stop: (typeof tourStops)[0];
  index: number;
}) {
  const isReversed = index % 2 === 1;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const Icon = stop.icon;

  return (
    <>
      {lightboxIndex !== null && (
        <Lightbox
          images={stop.images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() =>
            setLightboxIndex((prev) =>
              prev !== null ? (prev - 1 + stop.images.length) % stop.images.length : 0
            )
          }
          onNext={() =>
            setLightboxIndex((prev) =>
              prev !== null ? (prev + 1) % stop.images.length : 0
            )
          }
        />
      )}

      <section id={stop.id} className="py-16 lg:py-24">
        <div className="container">
          <div
            className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
              isReversed ? "lg:[direction:rtl]" : ""
            }`}
          >
            {/* Image gallery */}
            <motion.div
              className={`${isReversed ? "lg:[direction:ltr]" : ""}`}
              initial={{ opacity: 0, x: isReversed ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="grid grid-cols-2 gap-3">
                {/* Main large image */}
                <div
                  className="col-span-2 relative group cursor-pointer overflow-hidden rounded-2xl"
                  onClick={() => setLightboxIndex(0)}
                >
                  <img
                    src={stop.images[0].src}
                    alt={stop.images[0].alt}
                    className="w-full h-64 sm:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-80 transition-opacity" />
                  </div>
                </div>

                {/* Smaller images */}
                {stop.images.slice(1).map((img, i) => (
                  <div
                    key={i}
                    className="relative group cursor-pointer overflow-hidden rounded-xl"
                    onClick={() => setLightboxIndex(i + 1)}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-36 sm:h-44 object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <Camera className="w-6 h-6 text-white opacity-0 group-hover:opacity-80 transition-opacity" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              className={`${isReversed ? "lg:[direction:ltr]" : ""}`}
              initial={{ opacity: 0, x: isReversed ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-5xl font-black text-[#48D597]/15 leading-none">
                  {stop.number}
                </span>
                <div className="w-10 h-10 rounded-xl bg-[#48D597]/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#48D597]" />
                </div>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#345460] mb-2 leading-tight">
                {stop.title}
              </h2>
              <p className="text-[#48D597] font-semibold text-sm uppercase tracking-wider mb-5">
                {stop.subtitle}
              </p>
              <p className="text-[#345460]/65 text-[16px] leading-relaxed mb-7">
                {stop.description}
              </p>

              <div className="grid grid-cols-2 gap-3">
                {stop.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 bg-[#fafbf9] rounded-xl px-4 py-3 border border-gray-100"
                  >
                    <Shield className="w-4 h-4 text-[#48D597] mt-0.5 shrink-0" />
                    <span className="text-sm text-[#345460]/75 font-medium leading-snug">
                      {h}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Tour Jump Nav ──────────────────────────────────────── */
function TourNav() {
  const [active, setActive] = useState("lobby");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    tourStops.forEach((stop) => {
      const el = document.getElementById(stop.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="sticky top-[72px] z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container">
        <nav className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
          {tourStops.map((stop) => {
            const Icon = stop.icon;
            const isActive = active === stop.id;
            return (
              <a
                key={stop.id}
                href={`#${stop.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(stop.id)?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-[#48D597]/10 text-[#48D597] border border-[#48D597]/20"
                    : "text-[#345460]/50 hover:text-[#345460] hover:bg-gray-50"
                }`}
              >
                <Icon className="w-4 h-4" />
                {stop.title}
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

/* ── Main Tour Page ─────────────────────────────────────── */
export default function Tour() {
  const { openBookingModal } = useBookingModal();
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-[#345460] pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
        {/* Background image overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${IMAGES.lobbyWide})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#345460]/80 to-[#345460]" />

        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-[#48D597]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-[#48D597]/5 rounded-full blur-3xl" />

        <div className="container relative text-center">
          <motion.span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#48D597]/15 text-[#48D597] text-sm font-semibold mb-6 border border-[#48D597]/20"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Camera className="w-4 h-4" />
            Virtual Facility Tour
          </motion.span>

          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            See Where the{" "}
            <span className="text-[#48D597]">Magic Happens</span>
          </motion.h1>

          <motion.p
            className="text-lg text-white/60 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Take a room-by-room walkthrough of our Tulsa facility. Real photos, no stock images — because we want you to see exactly where your dog will play, rest, and get pampered.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button
              size="lg"
              className="bg-[#48D597] hover:bg-[#3bc085] text-[#345460] font-bold text-base px-8 h-13 shadow-lg shadow-[#48D597]/20"
              onClick={openBookingModal}
            >
              Book a Free In-Person Tour
              <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 font-semibold text-base px-8 h-13"
              asChild
            >
              <a
                href="tel:5398673841"
                onClick={() => trackPhoneCall("tour_hero")}
              >
                <Phone className="w-4 h-4 mr-2" />
                539-867-3841
              </a>
            </Button>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            className="mt-12 flex flex-wrap justify-center gap-8 lg:gap-14"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {[
              { value: "7,000+", label: "Sq Ft of Space" },
              { value: "13", label: "Real Photos" },
              { value: "4", label: "Tour Stops" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-extrabold text-[#48D597]">
                  {stat.value}
                </div>
                <div className="text-xs text-white/40 uppercase tracking-wider font-semibold mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Sticky tour navigation */}
      <TourNav />

      {/* Tour stops */}
      <main>
        {tourStops.map((stop, i) => (
          <TourStop key={stop.id} stop={stop} index={i} />
        ))}

        {/* Facility facts interlude */}
        <section className="py-16 bg-[#fafbf9] border-y border-gray-100">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-[#345460] mb-3">
                Built for <span className="text-[#48D597]">Dogs First</span>
              </h2>
              <p className="text-[#345460]/55 max-w-xl mx-auto">
                Every detail of our facility was designed with your dog's safety, comfort, and happiness in mind.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  icon: Shield,
                  title: "Secure Entry",
                  desc: "Double-gate system and baby gates at every transition point prevent escapes.",
                },
                {
                  icon: Camera,
                  title: "Full Camera Coverage",
                  desc: "Cameras in every play area, boarding suite, and common space for 24/7 monitoring.",
                },
                {
                  icon: Sparkles,
                  title: "Hospital-Grade Clean",
                  desc: "Epoxy-sealed floors, professional-grade turf, and daily deep cleaning protocols.",
                },
                {
                  icon: Dog,
                  title: "Climate Controlled",
                  desc: "Industrial HVAC keeps every room comfortable year-round, rain or shine.",
                },
              ].map((fact, i) => {
                const Icon = fact.icon;
                return (
                  <motion.div
                    key={i}
                    className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#48D597]/20 hover:shadow-lg hover:shadow-[#48D597]/5 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#48D597]/10 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-[#48D597]" />
                    </div>
                    <h3 className="font-bold text-[#345460] mb-1.5">{fact.title}</h3>
                    <p className="text-sm text-[#345460]/55 leading-relaxed">{fact.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 lg:py-28 bg-[#345460] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#48D597]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#48D597]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

          <div className="container relative text-center">
            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Ready to See It{" "}
              <span className="text-[#48D597]">In Person?</span>
            </motion.h2>
            <motion.p
              className="text-lg text-white/55 max-w-xl mx-auto mb-8"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Photos are great, but nothing beats walking through our doors yourself. Schedule a free tour and your dog's first day is on us.
            </motion.p>
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button
                size="lg"
                className="bg-[#48D597] hover:bg-[#3bc085] text-[#345460] font-bold text-base px-8 h-13 shadow-lg shadow-[#48D597]/20"
                onClick={() => { trackCTA("tour_bottom_cta"); openBookingModal(); }}
              >
                Book a Free Visit
                <ArrowRight className="w-5 h-5 ml-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 font-semibold text-base px-8 h-13"
                asChild
              >
                <a
                  href="tel:5398673841"
                  onClick={() => trackPhoneCall("tour_bottom")}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call 539-867-3841
                </a>
              </Button>
            </motion.div>

            <motion.div
              className="mt-8 flex items-center justify-center gap-2 text-white/35 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <MapPin className="w-4 h-4" />
              1219 E 13th St, Tulsa, OK 74120
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
