import { motion } from "framer-motion";
import { ArrowUpRight, MessageCircle } from "lucide-react";

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/search/Metro+Mutts+1219+E+13th+St+Tulsa+OK";

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="scroll-mt-20 bg-[oklch(0.97_0.005_90)] py-20 lg:py-28"
    >
      <div className="container">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="mb-4 inline-block rounded-full bg-[#48D597]/10 px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-[#48D597]">
            Customer Feedback
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#345460] sm:text-4xl lg:text-5xl">
            Hear From the <span className="text-[#48D597]">Metro Mutts Community</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[#345460]/65 sm:text-lg">
            We keep feedback where it belongs: on the platform where it was shared. Visit Google to explore the latest customer reviews and ratings.
          </p>
        </motion.div>

        <motion.a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto mt-10 flex max-w-3xl items-center justify-between gap-6 rounded-3xl border border-black/5 bg-white p-7 shadow-xl shadow-black/5 transition-all hover:-translate-y-0.5 hover:border-[#48D597]/30 hover:shadow-[#48D597]/10 sm:p-9"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          <span className="flex items-center gap-4 text-left">
            <span className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-[#48D597]/10 text-[#48D597]">
              <MessageCircle className="h-6 w-6" />
            </span>
            <span>
              <span className="block text-lg font-extrabold text-[#345460]">Read reviews on Google</span>
              <span className="mt-1 block text-sm text-[#345460]/60">View current customer feedback and share your experience.</span>
            </span>
          </span>
          <ArrowUpRight className="h-6 w-6 flex-none text-[#48D597]" aria-hidden="true" />
        </motion.a>
      </div>
    </section>
  );
}
