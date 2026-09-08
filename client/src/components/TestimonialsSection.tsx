/*
 * Metro Mutts Testimonials Section
 * Brand: Green #48D597, Dark #345460
 * Real Google Reviews with verified badge and auto-advancing carousel
 */
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Joseph O.",
    text: "I love Metro Mutts!!! Truly the best doggy daycare in Tulsa. My puppy absolutely loves it there and is always so well taken care of. Drop-offs are easy because he's excited and ready to go, and pick-ups are the hardest part — he's always having so much fun! I really appreciate the passion the team puts into caring for the dogs. Couldn't recommend them more!",
    rating: 5,
    source: "Google",
    timeAgo: "4 months ago",
  },
  {
    name: "Marvin M.",
    text: "This is the only place Allie has not turned and ran to the door when we walk in. Jacque, the groomer is the absolute BEST! She does exactly what you ask for and gives lots of TLC to your best friend. We love her so much, and highly recommend Metro Mutts!",
    rating: 5,
    source: "Google",
    timeAgo: "5 months ago",
  },
  {
    name: "Amy",
    text: "I have an older dog and the groomer is wonderful! She's very good with her and she comes out looking beautiful! The deshedding is incredible — the amount of hair in my house has gone down so much.",
    rating: 5,
    source: "Google",
    timeAgo: "6 months ago",
  },
  {
    name: "Loghan A.",
    text: "Nicole was amazing, patient and understanding of our situation. She took our new puppy and gave him his freedom back. We will definitely be returning! Thank you!",
    rating: 5,
    source: "Google",
    timeAgo: "9 months ago",
  },
  {
    name: "Verified Customer",
    text: "Very thoughtful, very clean! Happy with my mini Schnauzer's grooming and she didn't seem stressed. Play yard is a great bonus!",
    rating: 5,
    source: "Yelp",
    timeAgo: "Recent",
  },
  {
    name: "Verified Customer",
    text: "Best place for dog grooming and day care. Love those guys.",
    rating: 5,
    source: "Facebook",
    timeAgo: "Recent",
  },
];

function GoogleIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function SourceIcon({ source, className = "" }: { source: string; className?: string }) {
  if (source === "Google") return <GoogleIcon className={className} />;
  if (source === "Facebook") {
    return (
      <svg viewBox="0 0 24 24" fill="#1877F2" className={className}>
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="#FF1A1A" className={className}>
      <path d="M20.16 4.61C19.21 3.58 17.66 3 15.76 3c-3.42 0-5.7 2.7-5.7 6.3 0 .5.06.99.17 1.46C6.73 10.56 3.68 8.14 1.64 4.88c-.52.9-.82 1.94-.82 3.06 0 2.12 1.08 3.99 2.72 5.09-.99-.03-1.93-.3-2.75-.76v.08c0 2.96 2.11 5.43 4.91 5.99-.51.14-1.05.22-1.61.22-.39 0-.78-.04-1.15-.11.78 2.42 3.04 4.18 5.72 4.23-2.1 1.64-4.74 2.62-7.61 2.62-.49 0-.98-.03-1.46-.09 2.71 1.74 5.93 2.75 9.39 2.75 11.27 0 17.43-9.34 17.43-17.43 0-.27-.01-.53-.02-.79 1.2-.86 2.24-1.94 3.06-3.17-1.1.49-2.28.82-3.52.97 1.27-.76 2.24-1.96 2.7-3.39-1.19.7-2.5 1.21-3.9 1.49z"/>
    </svg>
  );
}

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[current];

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-[oklch(0.97_0.005_90)] scroll-mt-20">
      <div className="container">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#48D597]/10 text-[#48D597] text-sm font-bold mb-4 tracking-wide uppercase">
            Real Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#345460] tracking-tight">
            What Our Customers{" "}
            <span className="text-[#48D597]">Actually Say</span>
          </h2>
          <p className="mt-4 text-[#345460]/60 text-base">
            Real reviews from real pet parents — straight from Google, Yelp, and Facebook.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-3xl p-8 sm:p-10 lg:p-14 shadow-xl shadow-black/5 relative"
          >
            {/* Quote icon */}
            <Quote className="w-12 h-12 text-[#48D597]/15 absolute top-6 right-8" />

            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-[#FB923C] fill-[#FB923C]" />
              ))}
            </div>

            {/* Quote text */}
            <blockquote className="text-lg sm:text-xl lg:text-2xl text-[#345460] leading-relaxed font-medium mb-8 italic">
              "{t.text}"
            </blockquote>

            {/* Author + Source */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                {/* Avatar initial */}
                <div className="w-11 h-11 rounded-full bg-[#48D597]/15 flex items-center justify-center text-[#48D597] font-bold text-lg">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-[#345460] text-lg">{t.name}</div>
                  <div className="text-[#345460]/50 text-sm">{t.timeAgo}</div>
                </div>
              </div>

              {/* Source badge */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-100">
                <SourceIcon source={t.source} className="w-4 h-4" />
                <span className="text-xs font-semibold text-[#345460]/70">
                  Posted on {t.source}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-11 h-11 rounded-full bg-white shadow-md shadow-black/5 flex items-center justify-center hover:bg-[#48D597]/10 transition-colors border border-black/5"
            >
              <ChevronLeft className="w-5 h-5 text-[#345460]" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-8 bg-[#48D597]"
                      : "w-2.5 bg-[#48D597]/20 hover:bg-[#48D597]/40"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-11 h-11 rounded-full bg-white shadow-md shadow-black/5 flex items-center justify-center hover:bg-[#48D597]/10 transition-colors border border-black/5"
            >
              <ChevronRight className="w-5 h-5 text-[#345460]" />
            </button>
          </div>

          {/* Overall rating bar */}
          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2">
              <GoogleIcon className="w-5 h-5" />
              <span className="text-sm font-semibold text-[#345460]">4.9</span>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-[#FB923C] fill-[#FB923C]" />
                ))}
                <Star className="w-3.5 h-3.5 text-[#FB923C] fill-[#FB923C] opacity-70" />
              </div>
              <a href="https://www.google.com/maps/search/Metro+Mutts+1219+E+13th+St+Tulsa+OK" target="_blank" rel="noopener noreferrer" className="text-xs text-[#345460]/50 hover:text-[#48D597] transition-colors">96 reviews on Google</a>
            </div>
            <span className="hidden sm:block text-[#345460]/20">|</span>
            <a
              href="https://www.google.com/maps/search/Metro+Mutts+1219+E+13th+St+Tulsa+OK"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-[#48D597] hover:underline underline-offset-2"
            >
              Leave us a review on Google →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
