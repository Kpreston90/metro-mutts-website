/*
 * Metro Mutts Blog Index
 * Brand: Green #48D597, Dark #345460
 * SEO-focused blog with category filtering
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts, getAllCategories } from "@/data/blogPosts";
import { Clock, ArrowRight, BookOpen, Search } from "lucide-react";
import { useBookingModal } from "@/contexts/BookingModalContext";

const categories = ["All", ...getAllCategories()];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

function getPostHref(slug: string) {
  if (slug === "why-does-my-dog-follow-me-everywhere") {
    return "/journal/why-does-my-dog-follow-me-everywhere";
  }

  return `/blog/${slug}`;
}

export default function Blog() {
  const { openBookingModal } = useBookingModal();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const filtered = sorted.filter((post) => {
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featured = sorted[0];
  const rest = filtered.filter((p) => p.slug !== featured?.slug || activeCategory !== "All" || searchQuery !== "");

  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf8]">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#345460] pt-20 pb-16 lg:pt-28 lg:pb-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#48D597]/20 text-[#48D597] text-sm font-bold mb-5">
              <BookOpen className="w-4 h-4" />
              Metro Mutts Blog
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4">
              Dog Care Tips &{" "}
              <span className="text-[#48D597]">Expert Advice</span>
            </h1>
            <p className="text-white/65 text-lg lg:text-xl leading-relaxed max-w-2xl">
              Practical advice from Tulsa's trusted dog care team. From daycare
              prep to seasonal safety, we've got your pup covered.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="flex-1">
        {/* Featured Post (only on "All" with no search) */}
        {activeCategory === "All" && searchQuery === "" && featured && (
          <section className="py-12 lg:py-16">
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Link href={getPostHref(featured.slug)}>
                  <div className="group grid lg:grid-cols-2 gap-8 bg-white rounded-2xl overflow-hidden shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-300 cursor-pointer">
                    <div className="relative h-64 lg:h-auto overflow-hidden">
                      <img
                        src={featured.image}
                        alt={featured.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-[#FB923C] text-white text-xs font-bold uppercase tracking-wider">
                          Latest
                        </span>
                      </div>
                    </div>
                    <div className="p-8 lg:p-10 flex flex-col justify-center">
                      <span className="text-[#48D597] text-sm font-bold uppercase tracking-wider mb-3">
                        {featured.category}
                      </span>
                      <h2 className="text-2xl lg:text-3xl font-extrabold text-[#345460] mb-4 group-hover:text-[#48D597] transition-colors leading-tight">
                        {featured.title}
                      </h2>
                      <p className="text-[#345460]/60 leading-relaxed mb-6">
                        {featured.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-[#345460]/50">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {featured.readTime}
                        </span>
                        <span>·</span>
                        <span>
                          {new Date(featured.date).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </section>
        )}

        {/* Filters */}
        <section className="pb-4">
          <div className="container">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              {/* Category pills */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                      activeCategory === cat
                        ? "bg-[#345460] text-white shadow-md"
                        : "bg-white text-[#345460]/60 hover:text-[#345460] hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#345460]/40" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-[#345460] placeholder:text-[#345460]/40 focus:outline-none focus:ring-2 focus:ring-[#48D597]/30 focus:border-[#48D597] transition-all"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Article Grid */}
        <section className="py-8 pb-20">
          <div className="container">
            {rest.length === 0 && (
              <div className="text-center py-20">
                <p className="text-[#345460]/50 text-lg">
                  No articles found. Try a different category or search term.
                </p>
              </div>
            )}
            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            >
              {rest.map((post) => (
                <motion.div key={post.slug} variants={fadeUp}>
                  <Link href={getPostHref(post.slug)}>
                    <article className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-black/8 transition-all duration-300 cursor-pointer h-full flex flex-col">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[#345460] text-[11px] font-bold uppercase tracking-wider">
                            {post.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="text-lg font-bold text-[#345460] mb-2 group-hover:text-[#48D597] transition-colors leading-snug">
                          {post.title}
                        </h3>
                        <p className="text-[#345460]/55 text-sm leading-relaxed mb-4 flex-1">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-[#345460]/45">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </span>
                          <span>
                            {new Date(post.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[#345460]">
          <div className="container text-center">
            <h2 className="text-3xl font-extrabold text-white mb-4">
              Want to See Our Facility?
            </h2>
            <p className="text-white/60 text-lg mb-8 max-w-lg mx-auto">
              Book a free tour and see why Tulsa dog owners trust Metro Mutts.
            </p>
            <button
              onClick={openBookingModal}
              className="inline-flex items-center gap-2 bg-[#48D597] hover:bg-[#3bc085] text-[#345460] font-bold px-8 py-3.5 rounded-xl shadow-xl shadow-black/15 transition-all hover:-translate-y-0.5"
            >
              Book a Visit
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
