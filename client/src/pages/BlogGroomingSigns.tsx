/*
 * Metro Mutts Journal — "5 Signs Your Dog Is Ready for a Groom"
 * Design: Apple Notes × Linear Blog × Chewy Editorial
 * White background, editorial typography, 750-800px max-width
 * Subtle Metro Mutts green (#48D597) accent only
 * No emojis, no cartoon graphics, generous whitespace
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useBookingModal } from "@/contexts/BookingModalContext";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";

const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/blog-groom-hero_1f370a94.jpg";

const relatedArticles = [
  {
    title: "Why Your Dog Sleeps So Much After Daycare",
    slug: "why-your-dog-sleeps-so-much-after-daycare",
    readTime: "4 min read",
  },
  {
    title: "Does Your Dog Have a Best Friend?",
    slug: "does-your-dog-have-a-best-friend",
    readTime: "3 min read",
  },
  {
    title: "How Often Should You Bathe Your Dog?",
    slug: "how-often-should-you-bathe-your-dog",
    readTime: "3 min read",
  },
  {
    title: "The Benefits of Professional Nail Trims",
    slug: "benefits-of-professional-nail-trims",
    readTime: "3 min read",
  },
];

export default function BlogGroomingSigns() {
  const { openBookingModal } = useBookingModal();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[380px] sm:h-[460px] lg:h-[540px] overflow-hidden">
        <img
          src={HERO_IMG}
          alt="Freshly groomed dog at Metro Mutts"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
        <div className="relative container h-full flex flex-col justify-end pb-12 lg:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="block text-white/70 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
              The Metro Mutts Journal
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-bold text-white tracking-tight leading-[1.1] max-w-3xl">
              5 Signs Your Dog Is Ready for a Groom
            </h1>
            <p className="mt-4 text-white/75 text-lg font-light max-w-xl">
              Healthy coats. Happy dogs. Here's what to look for.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Article Meta */}
      <div className="border-b border-gray-100">
        <div className="mx-auto max-w-[800px] px-6 lg:px-0">
          <div className="flex items-center gap-5 py-5 text-sm text-gray-400">
            <span>Metro Mutts Team</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span>July 14, 2026</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />5 min read
            </span>
          </div>
        </div>
      </div>

      {/* Article Body */}
      <main className="flex-1">
        <article className="mx-auto max-w-[800px] px-6 lg:px-0 py-14 lg:py-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-0"
          >
            {/* Introduction */}
            <p className="text-[#345460] text-lg leading-relaxed mb-6">
              Have you ever looked at your dog and thought...
            </p>
            <p className="text-[#345460]/70 text-lg italic leading-relaxed mb-8">
              "Eh... maybe it's time?"
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
              Grooming isn't just about keeping your dog looking cute. Regular grooming helps keep skin healthy, prevents painful mats, improves comfort, and often catches little issues before they become bigger ones.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-16">
              Here are five simple signs your pup is probably ready for a spa day.
            </p>

            {/* Section 1 */}
            <h2 className="text-2xl sm:text-[1.75rem] font-bold text-[#345460] tracking-tight mb-6">
              1. The cuddles are getting... crunchy.
            </h2>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
              If you run your hand through your dog's coat and feel tangles, rough patches, or clumps—especially behind the ears, under the collar, or along the legs—it's time. What starts as a small knot can quickly tighten into a mat that pulls on the skin underneath.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-16">
              Mats become painful surprisingly quickly. They trap moisture, restrict airflow, and can even cause skin irritation or infection if left too long. A professional groom gets ahead of all of that—and your dog will feel noticeably lighter and more comfortable afterward.
            </p>

            {/* Section 2 */}
            <h2 className="text-2xl sm:text-[1.75rem] font-bold text-[#345460] tracking-tight mb-6">
              2. You hear click... click... click...
            </h2>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
              If your dog's nails are clicking on hardwood floors, they're overdue for a trim. Long nails aren't just a cosmetic issue—they change how your dog distributes weight across their paws, which can affect posture, gait, and long-term joint health.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-16">
              Over time, nails that are consistently too long can splay the toes, strain the tendons, and make walking uncomfortable. A regular nail trim—ideally every 2–4 weeks—keeps everything aligned and your dog moving confidently.
            </p>

            {/* Section 3 */}
            <h2 className="text-2xl sm:text-[1.75rem] font-bold text-[#345460] tracking-tight mb-6">
              3. They smell like... dog.
            </h2>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
              There's a difference between healthy dog smell and the kind of odor that builds up from weeks of natural oils, dirt, and loose coat sitting on the skin. If your dog smells noticeably "doggy" even after a day or two indoors, their coat is telling you something.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-16">
              A professional bath does more than rinse the surface. It removes built-up sebum, dead skin cells, and environmental debris that home baths often miss—especially for double-coated or thick-coated breeds. The result is a cleaner, healthier coat that actually stays fresh longer.
            </p>

            {/* Section 4 */}
            <h2 className="text-2xl sm:text-[1.75rem] font-bold text-[#345460] tracking-tight mb-6">
              4. You can't remember their last haircut.
            </h2>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
              If you have a Doodle, Poodle, or any curly-coated breed, their hair doesn't stop growing. Unlike shedding breeds that naturally cycle their coat, these dogs need regular haircuts to stay comfortable and mat-free.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-16">
              The general recommendation is approximately every 6–8 weeks, depending on coat type, lifestyle, and how much time they spend outdoors. If you're past that window and can't quite remember the last appointment—it's time.
            </p>

            {/* Section 5 */}
            <h2 className="text-2xl sm:text-[1.75rem] font-bold text-[#345460] tracking-tight mb-6">
              5. They're scratching more than usual.
            </h2>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
              Not all itching equals allergies. Sometimes the culprit is much simpler: dead coat that hasn't been brushed out, dry skin from product buildup, debris trapped close to the skin, or mats pulling and creating irritation.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-16">
              A thorough professional groom—with proper deshedding, skin-appropriate shampoo, and a full blow-dry—removes all of that. Many dogs stop scratching entirely after a good grooming session. It's one of the first things we check before assuming something more serious is going on.
            </p>

            {/* Pull Quote */}
            <div className="my-20 py-12 border-t border-b border-[#48D597]/30 text-center">
              <p className="text-2xl sm:text-[1.75rem] font-light text-[#345460] leading-relaxed italic max-w-2xl mx-auto">
                "A great groom isn't about making your dog look different. It's about helping them feel their best."
              </p>
            </div>

            {/* Closing */}
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
              One of our favorite parts of grooming is watching dogs leave looking confident, comfortable, and refreshed. There's a visible difference in how they carry themselves—lighter on their feet, more relaxed, clearly feeling good.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
              Whether your pup needs a bath, tidy-up, nail trim, or the full spa treatment—we'd love to help.
            </p>
          </motion.div>
        </article>

        {/* CTA Section */}
        <section className="py-20 bg-white border-t border-gray-100">
          <div className="text-center max-w-lg mx-auto px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#345460] tracking-tight mb-4">
              Ready for a Fresh Start?
            </h2>
            <button
              onClick={openBookingModal}
              className="mt-6 inline-flex items-center gap-2 bg-[#48D597] hover:bg-[#3bc085] text-white font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-[#48D597]/20 transition-all hover:-translate-y-0.5"
            >
              Schedule a Groom
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="mt-4 text-sm text-gray-400">
              Appointments available throughout the week.
            </p>
          </div>
        </section>

        {/* Related Articles */}
        <section className="py-16 bg-[#fafaf8] border-t border-gray-100">
          <div className="mx-auto max-w-[800px] px-6 lg:px-0">
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-gray-400 mb-8">
              More from the Journal
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {relatedArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="group flex items-center justify-between p-5 bg-white rounded-xl border border-gray-100 hover:border-[#48D597]/30 hover:shadow-sm transition-all"
                >
                  <div>
                    <h4 className="text-[#345460] font-medium text-sm group-hover:text-[#48D597] transition-colors leading-snug">
                      {article.title}
                    </h4>
                    <span className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#48D597] transition-colors flex-shrink-0 ml-3" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
