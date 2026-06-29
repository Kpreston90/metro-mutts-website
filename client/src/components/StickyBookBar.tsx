import { useState, useEffect } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useBookingModal } from "@/contexts/BookingModalContext";

const SMS_NUMBER = "19183597727";
const SMS_BODY = encodeURIComponent("Hi! I'd like to book a free trial day for my dog.");

export default function StickyBookBar() {
  const [visible, setVisible] = useState(false);
  const { openBookingModal } = useBookingModal();

  const { data: availability } = trpc.availability.todayAndTomorrow.useQuery(
    undefined,
    { staleTime: 5 * 60 * 1000, retry: 1 }
  );

  useEffect(() => {
    const heroEl = document.querySelector("[data-hero-section]");
    if (!heroEl) {
      // Fallback: show after scrolling 750px
      const handleScroll = () => setVisible(window.scrollY > 750);
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show bar when hero is NOT intersecting (scrolled past)
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  const getSummary = () => {
    if (!availability) return null;
    const { today } = availability;
    const parts: string[] = [];
    if (today.daycare.spotsLeft > 0) parts.push(`${today.daycare.spotsLeft} daycare`);
    if (today.grooming.spotsLeft > 0) parts.push(`${today.grooming.spotsLeft} grooming`);
    if (today.boarding.spotsLeft > 0) parts.push(`${today.boarding.spotsLeft} boarding`);
    if (parts.length === 0) return null;
    return parts.join(" · ") + " spots open today";
  };

  const summary = getSummary();
  const displayText = summary || "Spots available today";

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-[#345460]/95 backdrop-blur-md border-t border-white/10 shadow-lg">
        <div className="container py-3 flex items-center justify-between gap-4">
          {/* Availability info */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#48D597] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#48D597]"></span>
            </span>
            <span className="text-white/90 text-sm font-medium hidden sm:inline">
              {displayText}
            </span>
            <span className="text-white/90 text-xs font-medium sm:hidden">
              Spots open today
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {/* SMS button — mobile only */}
            <a
              href={`sms:${SMS_NUMBER}?&body=${SMS_BODY}`}
              className="flex sm:hidden items-center gap-1.5 px-4 py-2.5 bg-white/15 hover:bg-white/25 text-white font-medium text-sm rounded-full transition-colors border border-white/20"
            >
              <MessageCircle className="w-4 h-4" />
              Text Us
            </a>

            {/* Book button */}
            <button
              onClick={openBookingModal}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#48D597] hover:bg-[#3bc485] text-[#1a2e38] font-semibold text-sm rounded-full transition-colors shadow-md"
            >
              Book Now
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
