/*
 * Metro Mutts About Section
 * Brand: Green #48D597, Dark #345460
 * Two-column with real aerial photo and company values
 */
import { motion } from "framer-motion";
import { Shield, Heart, Sparkles, Users } from "lucide-react";

const ABOUT_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/reception-welcome-aBghJbxUirJ4BZnJwhtVtQ.webp";
const STAFF_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/new-staff-cuddle-PjhfHvXzFSDCVuoaoZZxq6.webp";

const values = [
  {
    icon: Shield,
    title: "Safety First",
    description: "Every area is designed with your dog's safety as the top priority. From secure play areas to trained staff, we leave nothing to chance.",
  },
  {
    icon: Heart,
    title: "Genuine Love",
    description: "Our team members aren't just employees — they're passionate dog lovers who treat every pup like their own.",
  },
  {
    icon: Sparkles,
    title: "Premium Care",
    description: "We invest in the best facilities, products, and staff development to ensure your dog receives nothing but the highest quality care.",
  },
  {
    icon: Users,
    title: "Community",
    description: "We're more than a business — we're a community of Tulsa dog lovers dedicated to making life better for dogs and their families.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-28 scroll-mt-20">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image side */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              {/* Main image */}
              <div className="rounded-3xl overflow-hidden shadow-2xl shadow-black/10">
                <img
                  src={ABOUT_IMAGE}
                  alt="Metro Mutts reception area — staff greeting a customer and their dog at the front desk"
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
              {/* Floating accent card */}
              <div className="absolute -bottom-6 -right-4 lg:-right-8 bg-white rounded-2xl p-5 shadow-xl shadow-black/10 border border-black/5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#48D597]/10 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-[#48D597]" fill="currentColor" />
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-[#345460]">7,000+</div>
                    <div className="text-sm text-[#345460]/60 font-medium">Sq Ft Facility</div>
                  </div>
                </div>
              </div>
              {/* Secondary image */}
              <div className="hidden lg:block absolute -top-6 -left-6 w-28 h-28 rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                <img
                  src={STAFF_IMAGE}
                  alt="Metro Mutts staff member cuddling a golden retriever"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative dots */}
              <div className="absolute -top-4 -left-4 w-24 h-24 opacity-20">
                <div className="grid grid-cols-4 gap-2">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-[#48D597]" />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#48D597]/10 text-[#48D597] text-sm font-bold mb-4 tracking-wide uppercase">
              About Metro Mutts
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#345460] tracking-tight mb-6 leading-tight">
              Born From a Love{" "}
              <span className="text-[#48D597]">of Dogs</span>
            </h2>
            <p className="text-[#345460]/70 text-lg leading-relaxed mb-5">
              Metro Mutts was founded in Tulsa, Oklahoma with a simple mission: to create the kind of dog care we'd want for our own pups. Our state-of-the-art 7,000 sq ft facility features 4,000 sq ft of turfed play space and spacious overnight boarding suites.
            </p>
            <p className="text-[#345460]/70 text-base leading-relaxed mb-8">
              Every decision we make — from the products we use to the staff we hire — is guided by one question: "Is this what's best for the dogs?" That commitment to excellence is why Tulsa families trust us with their furry family members every day.
            </p>

            {/* Values grid */}
            <div className="grid sm:grid-cols-2 gap-5">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    className="flex gap-3"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#48D597]/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[#48D597]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#345460] mb-1">{value.title}</h4>
                      <p className="text-sm text-[#345460]/60 leading-relaxed">{value.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
