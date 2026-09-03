/*
 * Metro Mutts CTA Section
 * Brand: Green #48D597, Dark #345460
 * Bold green background with CTA buttons
 */
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { Link } from "wouter";
import { trackPhoneCall } from "@/lib/analytics";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-gradient-to-br from-[#345460] via-[#3a5f6d] to-[#345460] py-20 lg:py-24">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-[#48D597]/5" />
          <div className="absolute bottom-10 right-20 w-48 h-48 rounded-full bg-[#48D597]/5" />
          <div className="absolute top-1/2 left-1/3 w-20 h-20 rounded-full bg-[#48D597]/5" />
          {/* Paw prints */}
          <svg className="absolute top-8 right-1/4 w-16 h-16 text-white/8 rotate-12" viewBox="0 0 100 100" fill="currentColor">
            <ellipse cx="35" cy="25" rx="12" ry="15" />
            <ellipse cx="65" cy="25" rx="12" ry="15" />
            <ellipse cx="20" cy="50" rx="10" ry="13" />
            <ellipse cx="80" cy="50" rx="10" ry="13" />
            <ellipse cx="50" cy="68" rx="22" ry="20" />
          </svg>
          <svg className="absolute bottom-12 left-1/4 w-12 h-12 text-white/8 -rotate-12" viewBox="0 0 100 100" fill="currentColor">
            <ellipse cx="35" cy="25" rx="12" ry="15" />
            <ellipse cx="65" cy="25" rx="12" ry="15" />
            <ellipse cx="20" cy="50" rx="10" ry="13" />
            <ellipse cx="80" cy="50" rx="10" ry="13" />
            <ellipse cx="50" cy="68" rx="22" ry="20" />
          </svg>
        </div>

        <div className="container relative">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Ready to Give Your Dog the{" "}
              <span className="text-[#48D597]">Best Day Ever?</span>
            </h2>
            <p className="text-white/80 text-lg lg:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
              Create an account, add your dog, upload current vaccination records, and request a free first daycare day. Our team will confirm the visit.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/get-started"
                className="inline-flex h-13 items-center rounded-md bg-[#48D597] px-8 text-base font-bold text-[#345460] shadow-xl shadow-black/15 transition-colors hover:-translate-y-0.5 hover:bg-[#3bc085]"
              >
                Book Your Dog&apos;s First Visit
                <ArrowRight className="ml-1 w-5 h-5" />
              </Link>
              <a
                href="tel:5398673841"
                onClick={() => trackPhoneCall("cta_section")}
                className="inline-flex h-13 items-center rounded-md border border-white/30 bg-transparent px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <Phone className="mr-2 w-5 h-5" />
                Call 539-867-3841
              </a>
              <a
                href="sms:19183597727?&body=Hi!%20I%27d%20like%20to%20request%20my%20dog%27s%20first%20visit."
                className="inline-flex h-13 items-center rounded-md border border-white/30 bg-transparent px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <MessageCircle className="mr-2 w-5 h-5" />
                Text 918-359-7727
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
