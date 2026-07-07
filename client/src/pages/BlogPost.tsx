/*
 * Metro Mutts Blog Post Page
 * Brand: Green #48D597, Dark #345460
 * Individual article view with Markdown-style rendering
 */
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPostBySlug, getRecentPosts } from "@/data/blogPosts";
import { useBookingModal } from "@/contexts/BookingModalContext";
import {
  Clock,
  ArrowLeft,
  ArrowRight,
  Calendar,
  User,
  Tag,
  BookOpen,
} from "lucide-react";

/* Helper to render inline markdown (bold, italic, links) */
function renderInline(text: string, baseKey: number): React.ReactNode[] {
  // Split on bold, italic, and links
  const parts: React.ReactNode[] = [];
  // Regex to match [text](url), **bold**, or *italic*
  const regex = /\[([^\]]+)\]\(([^)]+)\)|\*\*(.+?)\*\*|\*(.+?)\*/g;
  let lastIndex = 0;
  let match;
  let i = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[1] && match[2]) {
      // Link
      parts.push(
        <a key={`${baseKey}-${i}`} href={match[2]} className="text-[#48D597] font-semibold hover:underline">
          {match[1]}
        </a>
      );
    } else if (match[3]) {
      // Bold
      parts.push(
        <strong key={`${baseKey}-${i}`} className="text-[#345460] font-semibold">
          {match[3]}
        </strong>
      );
    } else if (match[4]) {
      // Italic
      parts.push(
        <em key={`${baseKey}-${i}`} className="italic text-[#345460]/65">
          {match[4]}
        </em>
      );
    }
    lastIndex = match.index + match[0].length;
    i++;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts;
}

/* Simple Markdown-ish renderer for blog content */
function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];
  let key = 0;

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={key++} className="list-disc list-inside space-y-1.5 text-[#345460]/75 leading-relaxed mb-6 pl-2">
          {listItems.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed === "") {
      flushList();
      continue;
    }

    if (trimmed.startsWith("## ")) {
      flushList();
      elements.push(
        <h2
          key={key++}
          className="text-2xl font-extrabold text-[#345460] mt-10 mb-4"
        >
          {trimmed.slice(3)}
        </h2>
      );
    } else if (trimmed.startsWith("- **")) {
      // Bold list item
      const match = trimmed.match(/^- \*\*(.+?)\*\*(.*)$/);
      if (match) {
        listItems.push(`<strong>${match[1]}</strong>${match[2]}`);
      } else {
        listItems.push(trimmed.slice(2));
      }
    } else if (trimmed.startsWith("- ")) {
      listItems.push(trimmed.slice(2));
    } else if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
      flushList();
      elements.push(
        <p key={key++} className="font-bold text-[#345460] mb-2">
          {trimmed.slice(2, -2)}
        </p>
      );
    } else if (trimmed.startsWith("**How daycare helps:**")) {
      flushList();
      const text = trimmed.replace("**How daycare helps:**", "").trim();
      elements.push(
        <div
          key={key++}
          className="bg-[#48D597]/8 border-l-4 border-[#48D597] rounded-r-lg px-5 py-4 mb-6"
        >
          <p className="font-bold text-[#48D597] text-sm mb-1">
            How daycare helps:
          </p>
          <p className="text-[#345460]/70 text-sm leading-relaxed">{text}</p>
        </div>
      );
    } else {
      flushList();
      elements.push(
        <p key={key++} className="text-[#345460]/75 leading-relaxed mb-4">
          {renderInline(trimmed, key)}
        </p>
      );
    }
  }
  flushList();
  return elements;
}

export default function BlogPost() {
  const { openBookingModal } = useBookingModal();
  const params = useParams<{ slug: string }>();
  const post = getPostBySlug(params.slug || "");

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return getRecentPosts(4).filter((p) => p.slug !== post.slug).slice(0, 3);
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-[#fafaf8]">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-[#345460] mb-4">
              Post Not Found
            </h1>
            <p className="text-[#345460]/60 mb-8">
              The article you're looking for doesn't exist.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[#48D597] font-bold hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf8]">
      <Navbar />

      {/* Hero Image */}
      <section className="relative h-[320px] sm:h-[380px] lg:h-[440px] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#345460] via-[#345460]/60 to-transparent" />
        <div className="relative container h-full flex flex-col justify-end pb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-white/70 text-sm font-medium hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Blog
            </Link>
            <span className="block text-[#48D597] text-sm font-bold uppercase tracking-wider mb-3">
              {post.category}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-4xl">
              {post.title}
            </h1>
          </motion.div>
        </div>
      </section>

      <main className="flex-1">
        {/* Article Meta */}
        <div className="container">
          <div className="flex flex-wrap items-center gap-4 py-6 border-b border-gray-200 text-sm text-[#345460]/55">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>
        </div>

        {/* Article Content */}
        <article className="py-10 lg:py-14">
          <div className="container max-w-3xl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="prose-metro"
            >
              {renderContent(post.content)}
            </motion.div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="w-4 h-4 text-[#345460]/40" />
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-[#345460]/5 text-[#345460]/60 text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-14 bg-white border-t border-gray-100">
            <div className="container">
              <h2 className="text-2xl font-extrabold text-[#345460] mb-8">
                More from the Blog
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((rp) => (
                  <Link key={rp.slug} href={`/blog/${rp.slug}`}>
                    <article className="group bg-[#fafaf8] rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-col">
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={rp.image}
                          alt={rp.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <span className="text-[#48D597] text-xs font-bold uppercase tracking-wider mb-2">
                          {rp.category}
                        </span>
                        <h3 className="text-base font-bold text-[#345460] group-hover:text-[#48D597] transition-colors leading-snug mb-2">
                          {rp.title}
                        </h3>
                        <span className="text-xs text-[#345460]/45 mt-auto flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {rp.readTime}
                        </span>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-16 bg-[#345460]">
          <div className="container text-center">
            <BookOpen className="w-10 h-10 text-[#48D597] mx-auto mb-4" />
            <h2 className="text-3xl font-extrabold text-white mb-4">
              Ready to Visit Metro Mutts?
            </h2>
            <p className="text-white/60 text-lg mb-8 max-w-lg mx-auto">
              See our facility in person and meet the team. Your pup's new
              favorite place is waiting.
            </p>
            <button
              onClick={openBookingModal}
              className="inline-flex items-center gap-2 bg-[#48D597] hover:bg-[#3bc085] text-[#345460] font-bold px-8 py-3.5 rounded-xl shadow-xl shadow-black/15 transition-all hover:-translate-y-0.5"
            >
              Book a Free Visit
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
