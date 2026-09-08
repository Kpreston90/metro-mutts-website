/**
 * Metro Mutts Grooming Gallery
 * Brand: Green #48D597, Dark #345460
 * Showcases Jacque's grooming work — 32 real client photos
 * SEO target: "dog grooming Tulsa", "pet grooming gallery Tulsa"
 */
import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Scissors, ArrowLeft, Phone } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trackPhoneCall, trackGalleryView } from "@/lib/analytics";
import { useSectionTracking } from "@/hooks/usePageTracking";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb";

const groomingPhotos = [
  { src: `${CDN}/v2-groom-01_7ad5a2f9.jpg`, alt: "Small dog freshly groomed at Metro Mutts Tulsa" },
  { src: `${CDN}/v2-groom-02_554becfc.jpg`, alt: "Happy Corgi with tongue out on the grooming table after a bath and trim" },
  { src: `${CDN}/v2-groom-03_40b888e6.jpg`, alt: "Rough Collie with a gorgeous flowing coat after a full groom session" },
  { src: `${CDN}/v2-groom-04_14dac1c6.jpg`, alt: "Goldendoodle with a neat body trim looking adorable on the grooming table" },
  { src: `${CDN}/v2-groom-05_1846c247.jpg`, alt: "Freshly groomed pup ready for pickup at Metro Mutts" },
  { src: `${CDN}/v2-groom-06_21ac158b.jpg`, alt: "Dog looking sharp after a professional grooming session" },
  { src: `${CDN}/v2-groom-07_79498112.jpg`, alt: "Clean and fluffy dog after Jacque's expert grooming" },
  { src: `${CDN}/v2-groom-08_a3b052e6.jpg`, alt: "Happy dog on the grooming table after a bath and style" },
  { src: `${CDN}/v2-groom-09_77872c60.jpg`, alt: "Freshly bathed and trimmed dog at Metro Mutts grooming salon" },
  { src: `${CDN}/v2-groom-10_df4d82d7.jpg`, alt: "Dog with a perfect coat after grooming at Metro Mutts Tulsa" },
  { src: `${CDN}/v2-groom-11_0611c3ca.jpg`, alt: "Black Standard Poodle with a fresh clip on the grooming table" },
  { src: `${CDN}/v2-groom-12_4e4c44aa.jpg`, alt: "Beautifully groomed dog posing after a spa treatment" },
  { src: `${CDN}/v2-groom-13_75058ce3.jpg`, alt: "Dog looking their best after a full grooming session" },
  { src: `${CDN}/v2-groom-14_19e8832a.jpg`, alt: "Professional breed-specific grooming results at Metro Mutts" },
  { src: `${CDN}/v2-groom-15_1733044a.jpg`, alt: "Freshly groomed and happy pup on the grooming table" },
  { src: `${CDN}/v2-groom-16_80ca94ea.jpg`, alt: "Clean coat and neat trim by groomer Jacque" },
  { src: `${CDN}/v2-groom-17_125e06c9.jpg`, alt: "Dog with a beautiful grooming cut at Metro Mutts" },
  { src: `${CDN}/v2-groom-18_f9a87752.jpg`, alt: "Another satisfied grooming client at Metro Mutts Tulsa" },
  { src: `${CDN}/v2-groom-19_16b7fa21.jpg`, alt: "Professional cut and style on the grooming table" },
  { src: `${CDN}/v2-groom-20_72a91ea6.jpg`, alt: "Dog looking gorgeous after a full spa day" },
  { src: `${CDN}/v2-groom-21_260af9c1.jpg`, alt: "Freshly groomed pup ready to go home" },
  { src: `${CDN}/v2-groom-22_f39ad591.jpg`, alt: "Beautiful grooming work by Jacque at Metro Mutts" },
  { src: `${CDN}/v2-groom-23_6adec6e3.jpg`, alt: "Dog with a perfect trim and clean coat" },
  { src: `${CDN}/v2-groom-24_0b06367d.jpg`, alt: "Happy dog after grooming at Metro Mutts in Tulsa" },
  { src: `${CDN}/v2-groom-25_2e207512.jpg`, alt: "Freshly groomed and camera-ready pup" },
  { src: `${CDN}/v2-groom-26_db809956.jpg`, alt: "Black and white terrier mix with a neat body clip, tongue out and happy" },
  { src: `${CDN}/v2-groom-27_95fcd5be.jpg`, alt: "Adorable dog after a grooming session at Metro Mutts" },
  { src: `${CDN}/v2-groom-28_e2dabc24.jpg`, alt: "Dog looking clean and styled after a professional groom" },
  { src: `${CDN}/v2-groom-29_9eb2f504.jpg`, alt: "Freshly bathed and trimmed pup at Metro Mutts grooming" },
  { src: `${CDN}/v2-groom-30_64184bfe.jpg`, alt: "Dog with a beautiful coat after grooming by Jacque" },
  { src: `${CDN}/v2-groom-31_f9d190ed.jpg`, alt: "Happy grooming client on the table at Metro Mutts Tulsa" },
  { src: `${CDN}/v2-groom-32_96e243c7.jpg`, alt: "Lhasa Apso with a gorgeous flowing golden coat after a full groom" },
];

export default function GroomingGallery() {
  useSectionTracking(["grooming-gallery-hero", "grooming-gallery-grid", "grooming-gallery-groomer", "grooming-gallery-cta"]);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const openLightbox = useCallback((index: number) => {
    setLightbox(index);
    trackGalleryView(`photo-${index + 1}`, "grooming_gallery");
  }, []);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  const goNext = useCallback(() => {
    setLightbox((prev) =>
      prev !== null ? (prev + 1) % groomingPhotos.length : null
    );
  }, []);

  const goPrev = useCallback(() => {
    setLightbox((prev) =>
      prev !== null
        ? (prev - 1 + groomingPhotos.length) % groomingPhotos.length
        : null
    );
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightbox === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightbox, closeLightbox, goNext, goPrev]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[oklch(0.98_0.003_90)]">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 bg-[#345460] overflow-hidden">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/jacque-grooming-hero_ba6417a6.png"
          alt="Jacque grooming a dog at Metro Mutts"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#345460]/90 via-[#345460]/75 to-[#345460]/50" />
        <div className="container relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#48D597]/15 text-[#48D597] text-sm font-bold mb-6 tracking-wide uppercase">
              <Scissors className="w-4 h-4" />
              Grooming by Jacque
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
              Dog Grooming{" "}
              <span className="text-[#48D597]">Gallery</span>
            </h1>
            <p className="mt-5 text-lg text-white/60 max-w-xl">
              Every pup deserves to look and feel their best. Browse real results
              from our in-house groomer Jacque — baths, trims, breed cuts, and full
              spa treatments right here in Tulsa.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="tel:539-867-3841"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#48D597] text-white font-bold hover:bg-[#3bc485] transition-colors shadow-lg shadow-[#48D597]/25"
                onClick={() => trackPhoneCall("grooming_gallery_hero")}
              >
                <Phone className="w-4 h-4" />
                Book a Grooming — 539-867-3841
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="bg-white border-b border-black/5 shadow-sm">
        <div className="container py-6">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-8">
              <div>
                <p className="text-3xl font-extrabold text-[#345460]">1,000s</p>
                <p className="text-sm text-[#345460]/50 font-medium">of Happy Grooms</p>
              </div>
              <div className="w-px h-10 bg-[#345460]/10" />
              <div>
                <p className="text-3xl font-extrabold text-[#345460]">All</p>
                <p className="text-sm text-[#345460]/50 font-medium">Breeds Welcome</p>
              </div>
              <div className="w-px h-10 bg-[#345460]/10 hidden sm:block" />
              <div className="hidden sm:block">
                <p className="text-3xl font-extrabold text-[#345460]">5★</p>
                <p className="text-sm text-[#345460]/50 font-medium">Rated Grooming</p>
              </div>
            </div>
            <p className="text-sm text-[#345460]/40 italic max-w-xs">
              All photos are real clients groomed at Metro Mutts by Jacque.
            </p>
          </div>
        </div>
      </div>

      {/* Gallery grid — masonry columns */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 [column-fill:_balance]">
            {groomingPhotos.map((photo, i) => (
              <motion.button
                key={photo.src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.3) }}
                onClick={() => openLightbox(i)}
                className="relative group w-full mb-4 break-inside-avoid rounded-xl overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#48D597] block"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white text-sm font-medium drop-shadow-lg">
                    {photo.alt}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* SEO content section */}
      <section className="py-12 bg-white border-t border-black/5">
        <div className="container max-w-3xl">
          <h2 className="text-2xl font-bold text-[#345460] mb-4">
            Professional Dog Grooming in Tulsa, OK
          </h2>
          <div className="prose prose-slate max-w-none text-[#345460]/70 leading-relaxed space-y-4">
            <p>
              At Metro Mutts, our in-house groomer Jacque provides professional dog grooming
              services for all breeds and sizes. From simple baths and nail trims to full
              breed-specific cuts and spa treatments, every dog leaves looking and feeling
              their best.
            </p>
            <p>
              Our grooming services include baths with premium shampoos, haircuts and breed
              cuts, nail trimming and grinding, ear cleaning, teeth brushing, de-shedding
              treatments, and flea &amp; tick baths. We use professional-grade equipment and
              products to ensure your pup gets the best care possible.
            </p>
            <p>
              Located at 1219 E 13th St in Tulsa, Metro Mutts is your one-stop shop for
              dog daycare, boarding, and grooming. Call us at{" "}
              <a href="tel:539-867-3841" className="text-[#48D597] font-semibold hover:underline" onClick={() => trackPhoneCall("grooming_gallery_seo")}>
                539-867-3841
              </a>{" "}
              to book a grooming appointment today.
            </p>
          </div>
        </div>
      </section>

      {/* Meet Your Groomer */}
      <section className="py-12 lg:py-16">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-8 bg-white rounded-2xl p-8 shadow-lg shadow-black/5 border border-gray-100"
          >
            <div className="flex-shrink-0">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/jacque-portrait-v3_d7a92609.png"
                alt="Jacque, Metro Mutts groomer"
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl object-cover shadow-md"
              />
            </div>
            <div className="text-center sm:text-left">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#48D597]/10 text-[#48D597] text-xs font-bold mb-3 uppercase tracking-wider">
                <Scissors className="w-3.5 h-3.5" />
                Meet Your Groomer
              </span>
              <h3 className="text-2xl font-extrabold text-[#345460] mb-2">Jacque</h3>
              <p className="text-[#345460]/60 text-sm leading-relaxed">
                With years of professional grooming experience across all breeds and sizes,
                Jacque brings skill, patience, and genuine love for dogs to every appointment.
                From doodle teddy bear cuts to breed-specific styling, she'll have your pup
                looking and feeling their absolute best.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#345460]">
        <div className="container text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready for Your Pup's{" "}
            <span className="text-[#48D597]">Glow Up?</span>
          </h2>
          <p className="text-white/60 max-w-lg mx-auto mb-8">
            Book a grooming appointment with Jacque today. Baths, breed-specific
            cuts, nail trims, teeth brushing, and full spa packages available.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:539-867-3841"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#48D597] text-white font-bold hover:bg-[#3bc485] transition-colors shadow-lg shadow-[#48D597]/25"
              onClick={() => trackPhoneCall("grooming_gallery_bottom_cta")}
            >
              <Phone className="w-4 h-4" />
              Call to Book — 539-867-3841
            </a>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-white/20 text-white font-bold hover:bg-white/10 transition-colors"
            >
              Send a Message
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50"
              aria-label="Close lightbox"
            >
              <X className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-50 p-2"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-50 p-2"
              aria-label="Next photo"
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            <motion.img
              key={lightbox}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              src={groomingPhotos[lightbox].src}
              alt={groomingPhotos[lightbox].alt}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
              <p className="text-white/80 text-sm font-medium mb-1">
                {groomingPhotos[lightbox].alt}
              </p>
              <p className="text-white/40 text-xs">
                {lightbox + 1} / {groomingPhotos.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
