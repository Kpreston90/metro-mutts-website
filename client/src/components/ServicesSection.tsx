/*
 * Metro Mutts Services Section
 * Brand: Green #48D597, Dark #345460
 * Alternating two-column layouts with real facility photos
 */
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sun, Moon, Scissors, Camera } from "lucide-react";
import { Link } from "wouter";

const DAYCARE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/vet-referred-facility-v3-DCNGQE4pnuuDpVkZkPVYMQ.webp";
const BOARDING_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/boarding-suites-staff-water_b9c9cf4a.png";
const GROOMING_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/grooming-room-active-1_3a32bb83.png";

const services = [
  {
    id: "daycare",
    icon: Sun,
    title: "Dog Daycare",
    tagline: "Play All Day",
    description:
      "Your dog will love spending the day with their furry friends in our safe, supervised playrooms. We group dogs by size and temperament to ensure the best experience for every pup. With 2,000 sq ft of indoor and 2,000 sq ft of outdoor play areas, enrichment activities, and trained staff, your dog will come home happy and tired.",
    features: ["Supervised group play", "Size-appropriate grouping", "Indoor & outdoor areas", "Enrichment activities"],
    image: DAYCARE_IMG,
    color: "#48D597",
    bgColor: "rgba(72, 213, 151, 0.1)",
  },
  {
    id: "boarding",
    icon: Moon,
    title: "Overnight Boarding",
    tagline: "Home Away From Home",
    description:
      "When you need to travel, your dog deserves a comfortable, loving stay. Our spacious boarding suites feature comfortable bedding, climate control, and plenty of playtime during the day. We provide evening walks, bedtime snacks, and around-the-clock care so you can travel worry-free.",
    features: ["Spacious private suites", "24/7 supervised care", "Evening walks & playtime", "Full camera monitoring"],
    image: BOARDING_IMG,
    color: "#345460",
    bgColor: "rgba(52, 84, 96, 0.1)",
  },
  {
    id: "grooming",
    icon: Scissors,
    title: "Grooming & Spa",
    tagline: "Pamper Your Pup",
    description:
      "Our professional groomers provide everything from basic baths to full breed-specific styling. We use premium, pet-safe products and take the time to ensure every dog looks and feels their best. Add-on spa treatments include teeth brushing, nail grinding, and soothing oatmeal baths.",
    features: ["Full-service grooming", "Breed-specific styling", "Premium products", "Spa treatments"],
    image: GROOMING_IMG,
    color: "#48D597",
    bgColor: "rgba(72, 213, 151, 0.1)",
  },

];

function ServiceBlock({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const isReversed = index % 2 === 1;
  const Icon = service.icon;

  return (
    <div id={service.id} className="scroll-mt-24">
      <div
        className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
          isReversed ? "lg:direction-rtl" : ""
        }`}
      >
        {/* Image */}
        <motion.div
          className={`relative ${isReversed ? "lg:order-2" : ""}`}
          initial={{ opacity: 0, x: isReversed ? 40 : -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/10 group">
            <img
              src={service.image}
              alt={service.title}
              className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
          {/* Floating badge */}
          <div
            className="absolute -bottom-4 left-6 lg:left-8 px-5 py-2.5 rounded-xl shadow-lg font-bold text-white text-sm"
            style={{ backgroundColor: service.color }}
          >
            <Icon className="w-4 h-4 inline-block mr-1.5 -mt-0.5" />
            {service.tagline}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          className={`${isReversed ? "lg:order-1" : ""} pt-6 lg:pt-0`}
          initial={{ opacity: 0, x: isReversed ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{ direction: "ltr" }}
        >
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5"
            style={{ backgroundColor: service.bgColor }}
          >
            <Icon className="w-7 h-7" style={{ color: service.color }} />
          </div>
          <h3 className="text-3xl lg:text-4xl font-extrabold text-[#345460] mb-4 tracking-tight">
            {service.title}
          </h3>
          <p className="text-[#345460]/70 text-base lg:text-lg leading-relaxed mb-6">
            {service.description}
          </p>
          <ul className="grid grid-cols-2 gap-3 mb-8">
            {service.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm font-medium text-[#345460]/80">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: service.bgColor }}
                >
                  <svg className="w-3 h-3" style={{ color: service.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                {feature}
              </li>
            ))}
          </ul>
          <Button
            className="font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
            style={{ backgroundColor: service.color }}
            asChild
          >
            <Link href={`/pricing#${service.id}`}>
              View Pricing
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section id="services" className="pt-8 pb-12 lg:pt-10 lg:pb-16 scroll-mt-20">
      <div className="container">
        {/* Section header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#48D597]/10 text-[#48D597] text-sm font-bold mb-4 tracking-wide uppercase">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#345460] tracking-tight mb-5">
            Everything Your Dog{" "}
            <span className="text-[#48D597]">Needs & Loves</span>
          </h2>
          <p className="text-[#345460]/70 text-lg leading-relaxed">
            From energetic daycare play sessions to relaxing spa days, we offer a complete range of premium services tailored to your dog's unique needs.
          </p>
        </motion.div>

        {/* Service blocks */}
        <div className="space-y-24 lg:space-y-32">
          {services.map((service, index) => (
            <ServiceBlock key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Grooming Gallery Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mt-24 lg:mt-32"
        >
          <Link href="/grooming-gallery">
            <div className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-xl shadow-black/10">
              <div className="grid grid-cols-4 sm:grid-cols-6 h-[200px] sm:h-[240px]">
                {[
                  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/v2-groom-04_14dac1c6.jpg",
                  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/v2-groom-19_16b7fa21.jpg",
                  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/v2-groom-26_db809956.jpg",
                  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/v2-groom-30_64184bfe.jpg",
                  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/v2-groom-11_0611c3ca.jpg",
                  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/v2-groom-22_f39ad591.jpg",
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="Groomed dog at Metro Mutts"
                    className={`w-full h-full object-cover ${i >= 4 ? "hidden sm:block" : ""}`}
                  />
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#345460]/90 via-[#345460]/70 to-[#345460]/40 group-hover:from-[#345460]/85 group-hover:via-[#345460]/60 group-hover:to-[#345460]/30 transition-all duration-300 flex items-center">
                <div className="px-8 sm:px-10">
                  <div className="flex items-center gap-2 mb-2">
                    <Camera className="w-4 h-4 text-[#48D597]" />
                    <span className="text-[#48D597] text-xs font-bold uppercase tracking-wider">Grooming Gallery</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                    See Jacque's Work
                  </h3>
                  <p className="text-white/60 text-sm mb-4 max-w-md">
                    Browse 30+ photos of freshly groomed pups — from doodles to dachshunds.
                  </p>
                  <span className="inline-flex items-center gap-2 text-[#48D597] font-bold text-sm group-hover:gap-3 transition-all">
                    View Gallery
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
