import { useEffect, useState } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useBookingModal } from "@/contexts/BookingModalContext";

const SMS_NUMBER = "19183597727";
const SMS_BODY = encodeURIComponent("Hi! I'd like to book a free trial day for my dog.");

export default function StickyBookBar() {
  const [visible, setVisible] = useState(false);
  const { openBookingModal } = useBookingModal();

  useEffect(() => {
    const hero = document.querySelector("[data-hero-section]");
    if (!hero) {
      const handleScroll = () => setVisible(window.scrollY > 750);
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }

    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="border-t border-white/10 bg-[#345460]/95 shadow-lg backdrop-blur-md">
        <div className="container flex items-center justify-between gap-4 py-3">
          <p className="hidden text-sm font-medium text-white/90 sm:block">Ready to plan your dog’s next great day?</p>
          <p className="text-xs font-medium text-white/90 sm:hidden">Ready when you are.</p>
          <div className="flex flex-shrink-0 items-center gap-2">
            <a
              href={`sms:${SMS_NUMBER}?&body=${SMS_BODY}`}
              className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/15 px-3 py-2 text-xs font-medium whitespace-nowrap text-white transition-colors hover:bg-white/25 sm:hidden"
            >
              <MessageCircle className="h-3.5 w-3.5 flex-shrink-0" />
              Text Us
            </a>
            <button
              onClick={openBookingModal}
              className="flex items-center gap-1.5 rounded-full bg-[#48D597] px-4 py-2 text-xs font-semibold whitespace-nowrap text-[#1a2e38] shadow-md transition-colors hover:bg-[#3bc485] sm:px-5 sm:py-2.5 sm:text-sm"
            >
              Book Now
              <ArrowRight className="h-3.5 w-3.5 flex-shrink-0 sm:h-4 sm:w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
