/*
 * Metro Mutts "First Visit" Welcome Section
 * Brand: Green #48D597, Dark #345460
 * Reassuring step-by-step guide for new dog parents
 * Designed to reduce anxiety and drive first-time bookings
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Phone, CalendarCheck, ClipboardCheck, Users, Heart } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: CalendarCheck,
    title: "Create Your Account",
    description:
      "Create your Metro Mutts account so we have everything we need to welcome your dog.",
  },
  {
    number: "02",
    icon: ClipboardCheck,
    title: "Add Your Dog & Records",
    description:
      "Add your dog and upload current vaccination records directly in the customer portal.",
  },
  {
    number: "03",
    icon: Users,
    title: "Request the Free First Day",
    description:
      "Request a free first daycare day; our team will confirm availability and the best next step.",
  },
  {
    number: "04",
    icon: Heart,
    title: "Supervised Daycare Assessment",
    description:
      "During at least five hours of daycare, we evaluate your dog&apos;s play style, energy level, and group fit.",
  },
];

export default function FirstVisitSection() {
  return (
    <section className="pt-8 pb-8 lg:pt-10 lg:pb-10 bg-white relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#48D597]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#48D597]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

      <div className="container relative">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#48D597]/10 text-[#48D597] text-sm font-semibold mb-5 border border-[#48D597]/20"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            New Here?
          </motion.span>
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#345460] leading-tight mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Your First Visit in{" "}
            <span className="text-[#48D597]">4 Easy Steps</span>
          </motion.h2>
          <motion.p
            className="text-lg text-[#345460]/65 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Your dog&apos;s first daycare day is free and serves as their temperament assessment. Here&apos;s exactly what to expect.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5 mb-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {/* Connector line (desktop) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px">
                    <div className="w-full h-full border-t-2 border-dashed border-[#48D597]/25" />
                  </div>
                )}

                <div className="bg-[#fafbf9] rounded-2xl p-7 h-full border border-gray-100 hover:border-[#48D597]/30 hover:shadow-lg hover:shadow-[#48D597]/5 transition-all duration-300">
                  {/* Step number + icon */}
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-sm font-extrabold text-[#48D597]/40 tracking-wider">
                      {step.number}
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-[#48D597]/10 flex items-center justify-center group-hover:bg-[#48D597]/20 transition-colors">
                      <Icon className="w-5 h-5 text-[#48D597]" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-[#345460] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[15px] text-[#345460]/60 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href="/get-started"
            className="inline-flex h-13 items-center rounded-md bg-[#48D597] px-8 text-base font-bold text-[#345460] shadow-lg shadow-[#48D597]/20 transition-colors hover:bg-[#3bc085]"
          >
            Book Your Dog&apos;s First Visit
            <ArrowRight className="ml-1 w-5 h-5" />
          </Link>
          <a
            href="tel:5398673841"
            className="inline-flex h-13 items-center rounded-md border border-[#345460]/20 px-8 text-base font-semibold text-[#345460] transition-colors hover:bg-[#345460]/5"
          >
            <Phone className="mr-2 h-4 w-4" />
            Call or Text Us
          </a>
        </motion.div>
      </div>
    </section>
  );
}
