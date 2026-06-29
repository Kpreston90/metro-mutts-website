/*
 * Metro Mutts "Why Choose Us" Section
 * Brand: Green #48D597, Dark #345460
 * Feature cards in a grid with icons
 */
import { motion } from "framer-motion";
import { Camera, ShieldCheck, Stethoscope, Clock, Smile, Award } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Safety Certified",
    description: "Our facility meets or exceeds state safety standards with secure entry, fire suppression, and 24/7 monitoring.",
  },
  {
    icon: Camera,
    title: "Full Camera Coverage",
    description: "Cameras in every play area, boarding suite, and common space for complete safety monitoring around the clock.",
  },
  {
    icon: Stethoscope,
    title: "Vet on Call",
    description: "Partnered with local Tulsa veterinarians for immediate care. Your dog's health is always our priority.",
  },
  {
    icon: Clock,
    title: "Flexible Hours",
    description: "Open Mon–Fri 7 AM–6 PM and Sat–Sun 9 AM–5 PM. Convenient hours to fit your schedule.",
  },
  {
    icon: Smile,
    title: "Expert Team",
    description: "Every team member is pet first-aid certified and undergoes extensive hands-on education in dog behavior and safety.",
  },
  {
    icon: Award,
    title: "5-Star Rated",
    description: "Consistently rated 5 stars by Tulsa dog owners for our exceptional care and clean facilities.",
  },
];

export default function WhyChooseSection() {
  return (
    <section className="py-10 lg:py-12 pb-6 lg:pb-8 relative">
      <div className="container">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#48D597]/10 text-[#48D597] text-sm font-bold mb-4 tracking-wide uppercase">
            Why Metro Mutts
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#345460] tracking-tight mb-5">
            The <span className="text-[#48D597]">Metro Mutts</span> Difference
          </h2>
          <p className="text-[#345460]/70 text-lg leading-relaxed">
            We go above and beyond to ensure every dog in our care has the safest, happiest, and most enriching experience possible.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className="group bg-white rounded-2xl p-7 shadow-sm shadow-black/5 border border-black/5 hover:shadow-xl hover:shadow-[#48D597]/10 hover:border-[#48D597]/20 transition-all duration-300 hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <div className="w-13 h-13 rounded-2xl bg-[#48D597]/10 group-hover:bg-[#48D597] flex items-center justify-center mb-5 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-[#48D597] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-bold text-[#345460] mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#345460]/60 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
