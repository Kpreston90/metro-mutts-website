/*
 * Metro Mutts Grooming Landing Page
 * Dedicated landing page for prospective grooming clients
 * Brand: Green #48D597, Dark #345460
 * Designed for ad campaigns, social media, and SEO
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Scissors,
  Phone,
  ArrowRight,
  CheckCircle2,
  Star,
  Droplets,
  Sparkles,
  Heart,
  Award,
  Clock,
  Shield,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import ServiceAvailabilityBar from "@/components/ServiceAvailabilityBar";
import PageSEO from "@/components/PageSEO";
import SEOFaqSection from "@/components/SEOFaqSection";
import Footer from "@/components/Footer";
import { trackPhoneCall, trackCTA } from "@/lib/analytics";
import { useSectionTracking } from "@/hooks/usePageTracking";

const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/grooming-landing-hero-AFYY6732hpWUkTwdecrQKw.webp";
const BEFORE_AFTER_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/grooming-before-after-Th2drZtwmP4V4R7XU55T2x.webp";
const JACQUE_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/jacque-portrait-v3_d7a92609.png";

const galleryPhotos = [
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/v2-groom-28_e2dabc24.jpg",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/v2-groom-32_96e243c7.jpg",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/v2-groom-19_16b7fa21.jpg",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/v2-groom-26_db809956.jpg",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/v2-groom-30_64184bfe.jpg",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/v2-groom-11_0611c3ca.jpg",
];

const services = [
  {
    icon: Droplets,
    title: "Bath & Brush",
    price: "Starting at $30",
    desc: "Shampoo, conditioner, blow-dry, brush-out, ear cleaning, and nail trim. Perfect for short-coated breeds or between full grooms.",
    features: ["Premium shampoo & conditioner", "Blow-dry & brush-out", "Ear cleaning", "Nail trim & file"],
  },
  {
    icon: Scissors,
    title: "Full Grooming",
    price: "Starting at $70",
    desc: "Complete bath plus a full haircut styled to your preference — breed-specific cuts, teddy bear cuts, puppy cuts, and more.",
    features: ["Everything in Bath & Brush", "Full haircut & styling", "Breed-specific cuts", "Sanitary trim"],
  },
  {
    icon: Sparkles,
    title: "Spa Add-Ons",
    price: "From $5",
    desc: "Elevate any grooming appointment with premium spa treatments for extra pampering.",
    features: ["Teeth brushing — $5", "De-shedding treatment — $15", "Flea & tick treatment — $10", "Blueberry facial — $8"],
  },
];

const testimonials = [
  {
    name: "Amanda T.",
    text: "Jacque is absolutely incredible with our anxious poodle. She takes her time, keeps him calm, and he always comes out looking like a show dog. Best groomer in Tulsa!",
    rating: 5,
  },
  {
    name: "Marcus W.",
    text: "We've tried every groomer in town for our doodle. Jacque's teddy bear cuts are on another level. Our dog actually gets excited to go now.",
    rating: 5,
  },
  {
    name: "Rachel & Tom S.",
    text: "The attention to detail is unmatched. Jacque noticed a skin issue we hadn't seen and let us know right away. She genuinely cares about the dogs.",
    rating: 5,
  },
];

export default function Grooming() {
  useSectionTracking(["grooming-hero", "grooming-meet", "grooming-services", "grooming-gallery", "grooming-reviews", "grooming-cta"]);
  return (
    <div className="min-h-screen bg-[oklch(0.98_0.003_90)]">
      <PageSEO
        title="Dog Grooming in Tulsa, OK | Professional Styling | Metro Mutts"
        description="Professional dog grooming in Tulsa by certified stylist Jacque. Full-service baths, breed-specific haircuts, nail trims, de-shedding, and spa add-ons. All breeds welcome. Book today."
        canonical="https://www.metromutts.com/grooming"
      />
      <Navbar />
      <ServiceAvailabilityBar service="grooming" />

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <img
          src={HERO_IMG}
          alt="Jacque grooming a Bichon Frise at Metro Mutts"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a2e38]/90 via-[#1a2e38]/70 to-[#1a2e38]/40" />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#48D597]/15 text-[#48D597] text-sm font-bold mb-6 tracking-wide uppercase">
              <Scissors className="w-4 h-4" />
              Dog Grooming in Tulsa
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-5">
              Dog Grooming in{" "}
              <span className="text-[#48D597]">Tulsa, OK</span>
              {" "}— Expert Cuts, Happy Pups
            </h1>
            <p className="text-lg text-white/65 max-w-xl mb-8 leading-relaxed">
              Professional dog grooming by Jacque — from bath & brush to full
              breed-specific styling. Every pup leaves looking and feeling their
              absolute best.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:539-867-3841"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#48D597] text-white font-bold hover:bg-[#3bc485] transition-all shadow-lg shadow-[#48D597]/25 hover:shadow-xl hover:shadow-[#48D597]/30"
                onClick={() => trackPhoneCall("grooming_hero")}
              >
                <Phone className="w-4 h-4" />
                Book a Grooming — 539-867-3841
              </a>
              <Link
                href="/grooming-gallery"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-white/25 text-white font-semibold hover:bg-white/10 transition-all"
              >
                See Our Work
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
              { value: "1,000s", label: "Happy Grooms" },
              { value: "All Breeds", label: "Welcome" },
              { value: "From $30", label: "Bath & Brush" },
              { value: "From $70", label: "Full Groom" },
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

      {/* Meet Your Groomer */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/10">
                <img
                  src={JACQUE_IMG}
                  alt="Jacque, Lead Groomer at Metro Mutts"
                  className="w-full aspect-square object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-lg border border-black/5">
                <div className="flex items-center gap-2">
                  <Award className="w-6 h-6 text-[#48D597]" />
                  <div>
                    <div className="text-sm font-bold text-[#345460]">Lead Groomer</div>
                    <div className="text-xs text-[#345460]/50">Years of Experience</div>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#48D597]/10 text-[#48D597] text-sm font-bold mb-4 tracking-wide uppercase">
                Meet Your Groomer
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#345460] tracking-tight mb-5 leading-tight">
                Jacque — Your Pup's{" "}
                <span className="text-[#48D597]">New Best Friend</span>
              </h2>
              <p className="text-[#345460]/65 text-lg leading-relaxed mb-5">
                Jacque brings years of professional grooming experience and a
                genuine love for every dog that walks through our doors. She
                specializes in breed-specific cuts, doodle styling, and working
                with anxious or first-time grooming pups.
              </p>
              <p className="text-[#345460]/55 leading-relaxed mb-6">
                Whether your dog needs a simple bath and nail trim or a full
                show-quality cut, Jacque takes the time to understand your
                preferences and your dog's comfort level. Every groom is
                tailored to your pup's unique coat and personality.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Scissors, text: "All breed expertise" },
                  { icon: Heart, text: "Gentle with anxious dogs" },
                  { icon: Sparkles, text: "Doodle cut specialist" },
                  { icon: Shield, text: "Health-first approach" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-[#48D597] flex-shrink-0" />
                      <span className="text-sm text-[#345460]/70 font-medium">
                        {item.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 lg:py-28 bg-[oklch(0.97_0.003_90)]">
        <div className="container">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#48D597]/10 text-[#48D597] text-sm font-bold mb-4 tracking-wide uppercase">
              Our Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#345460] tracking-tight mb-4">
              Grooming Services{" "}
              <span className="text-[#48D597]">& Pricing</span>
            </h2>
            <p className="text-[#345460]/55 text-lg">
              Prices vary by breed, size, and coat condition. Call for your pup's
              exact quote.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className={`bg-white rounded-2xl p-7 shadow-md shadow-black/5 border border-black/5 ${
                    i === 1
                      ? "ring-2 ring-[#48D597] relative"
                      : ""
                  }`}
                >
                  {i === 1 && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-3 py-1 rounded-full bg-[#FB923C] text-white text-xs font-bold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className="w-12 h-12 rounded-xl bg-[#48D597]/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#48D597]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#345460] mb-1">
                    {service.title}
                  </h3>
                  <div className="text-lg font-extrabold text-[#48D597] mb-3">
                    {service.price}
                  </div>
                  <p className="text-[#345460]/55 text-sm leading-relaxed mb-5">
                    {service.desc}
                  </p>
                  <div className="space-y-2">
                    {service.features.map((f, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#48D597] mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-[#345460]/65">{f}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <p className="text-[#345460]/40 text-sm">
              Exact pricing depends on breed, size, and coat condition.{" "}
              <a href="tel:539-867-3841" className="text-[#48D597] font-semibold hover:underline" onClick={() => trackPhoneCall("grooming_quote")}>
                Call for a quote
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Before & After */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#48D597]/10 text-[#48D597] text-sm font-bold mb-4 tracking-wide uppercase">
                The Transformation
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#345460] tracking-tight mb-5 leading-tight">
                From Scruffy to{" "}
                <span className="text-[#48D597]">Stunning</span>
              </h2>
              <p className="text-[#345460]/60 text-lg leading-relaxed mb-6">
                Every grooming session is a transformation. Whether your pup
                needs a simple tidy-up or a complete makeover, Jacque works her
                magic to bring out their best look.
              </p>
              <a
                href="tel:539-867-3841"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#48D597] text-white font-bold hover:bg-[#3bc485] transition-all shadow-lg shadow-[#48D597]/25"
                onClick={() => trackPhoneCall("grooming_before_after")}
              >
                <Phone className="w-4 h-4" />
                Book Your Pup's Transformation
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/10">
                <img
                  src={BEFORE_AFTER_IMG}
                  alt="Before and after dog grooming transformation at Metro Mutts"
                  className="w-full aspect-[16/9] object-cover"
                />
              </div>
              <div className="flex justify-between mt-3 px-4">
                <span className="text-sm font-bold text-[#345460]/40 uppercase tracking-wider">Before</span>
                <span className="text-sm font-bold text-[#48D597] uppercase tracking-wider">After</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery preview */}
      <section className="py-20 lg:py-28 bg-[#345460]">
        <div className="container">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#48D597]/15 text-[#48D597] text-sm font-bold mb-4 tracking-wide uppercase">
              Our Work
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Fresh Grooms from{" "}
              <span className="text-[#48D597]">Our Shop</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-4xl mx-auto mb-10">
            {galleryPhotos.map((photo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="rounded-xl overflow-hidden aspect-square"
              >
                <img
                  src={photo}
                  alt={`Freshly groomed dog at Metro Mutts`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/grooming-gallery"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 text-white font-bold hover:bg-white/20 transition-all border border-white/15"
            >
              View Full Gallery — 30+ Photos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#48D597]/10 text-[#48D597] text-sm font-bold mb-4 tracking-wide uppercase">
              Reviews
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#345460] tracking-tight">
              What Grooming Clients{" "}
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
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 text-[#FB923C]"
                      fill="currentColor"
                    />
                  ))}
                </div>
                <p className="text-[#345460]/65 text-sm leading-relaxed mb-4 italic">
                  "{t.text}"
                </p>
                <div className="text-sm font-bold text-[#345460]">{t.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-[#345460]">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Ready for a{" "}
              <span className="text-[#48D597]">Fresh Look</span>?
            </h2>
            <p className="text-white/55 text-lg mb-8 max-w-xl mx-auto">
              Call today to book your pup's grooming appointment with Jacque.
              Walk-ins welcome when available!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="tel:539-867-3841"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#48D597] text-white font-bold text-lg hover:bg-[#3bc485] transition-all shadow-lg shadow-[#48D597]/25"
                onClick={() => trackPhoneCall("grooming_bottom_cta")}
              >
                <Phone className="w-5 h-5" />
                539-867-3841
              </a>
              <Link
                href="/pricing#grooming"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-white/25 text-white font-semibold text-lg hover:bg-white/10 transition-all"
              >
                Full Pricing Details
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <p className="mt-6 text-white/30 text-sm">
              1219 E 13th St, Tulsa, OK 74120 · Open Mon–Fri 7am–6pm, Sat–Sun 9am–5pm
            </p>
          </motion.div>
        </div>
      </section>

      {/* SEO FAQ Section */}
      <SEOFaqSection
        title="Dog Grooming in Tulsa — Frequently Asked Questions"
        subtitle="Common questions about professional dog grooming at Metro Mutts"
        schemaId="grooming-faq"
        faqs={[
          {
            question: "How much does dog grooming cost in Tulsa?",
            answer: "Dog grooming at Metro Mutts starts at $30 for a bath & brush. Full-service grooming (bath, haircut, nails, ears) starts at $55 and varies by breed, size, and coat condition. We provide a personalized quote during your pup's first visit. Call 539-867-3841 for pricing."
          },
          {
            question: "What dog grooming services do you offer?",
            answer: "We offer full-service dog grooming including baths, breed-specific haircuts, nail trimming, ear cleaning, de-shedding treatments, teeth brushing, and spa add-ons like blueberry facials and paw balm. Our groomer Jacque specializes in doodles, poodles, and all breed-specific styles."
          },
          {
            question: "Do I need an appointment for dog grooming?",
            answer: "Yes, grooming is by appointment only to ensure each pup gets dedicated one-on-one time with our groomer Jacque. We recommend booking 1-2 weeks in advance, especially for weekend slots. Call 539-867-3841 or book through our online portal."
          },
          {
            question: "How often should I get my dog groomed?",
            answer: "Most dogs benefit from professional grooming every 4-8 weeks depending on breed and coat type. Dogs with longer coats (doodles, poodles, shih tzus) typically need grooming every 4-6 weeks. Short-coated breeds can go 6-8 weeks between visits. Jacque can recommend a schedule during your first appointment."
          },
          {
            question: "Do you groom doodles and poodles in Tulsa?",
            answer: "Yes! Doodle and poodle grooming is one of our specialties. Jacque is experienced with all doodle varieties (Goldendoodles, Labradoodles, Bernedoodles) and poodle clips. We handle everything from puppy's first groom to maintaining complex breed-specific styles."
          },
          {
            question: "What should I expect during my dog's first grooming appointment?",
            answer: "For first-time visits, we schedule extra time for a consultation. Jacque will assess your dog's coat condition, discuss your preferred style, and ensure your pup is comfortable. We go at your dog's pace — no rushing, no stress. Puppies should be at least 12 weeks old with up-to-date vaccinations."
          },
          {
            question: "Can I get my dog groomed while they're at daycare or boarding?",
            answer: "Absolutely! Many of our clients combine services. You can add grooming to any daycare or boarding stay so your pup comes home clean, styled, and happy. Just let us know when you book and we'll coordinate the schedule."
          }
        ]}
      />

      <Footer />
    </div>
  );
}
