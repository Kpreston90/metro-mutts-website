import { useEffect, useState } from "react";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { useBookingModal } from "@/contexts/BookingModalContext";

const SMS_NUMBER = "19183597727";
const SMS_BODY = encodeURIComponent("Hi! I'd like to request my dog’s first visit.");

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
      className={`fixed bottom-0 left-0 right-0 z-50 translate-y-0 transition-transform duration-300 ease-in-out sm:translate-y-full ${
        visible ? "sm:translate-y-0" : "sm:translate-y-full"
      }`}
    >
      <div className="border-t border-white/10 bg-[#345460]/95 shadow-lg backdrop-blur-md">
        <div className="container flex items-center justify-between gap-4 py-3">
          <p className="hidden text-sm font-medium text-white/90 sm:block">Ready to request your dog&apos;s first visit?</p>
          <div className="flex w-full flex-shrink-0 items-center justify-between gap-2 sm:w-auto sm:justify-start">
            <a
              href="tel:5398673841"
              className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/15 px-3 py-2 text-xs font-medium whitespace-nowrap text-white transition-colors hover:bg-white/25 sm:hidden"
            >
              <Phone className="h-3.5 w-3.5 flex-shrink-0" />
              Call 539
            </a>
            <a
              href={`sms:${SMS_NUMBER}?&body=${SMS_BODY}`}
              className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/15 px-3 py-2 text-xs font-medium whitespace-nowrap text-white transition-colors hover:bg-white/25 sm:hidden"
            >
              <MessageCircle className="h-3.5 w-3.5 flex-shrink-0" />
              Text 918
            </a>
            <button
              onClick={openBookingModal}
              className="flex items-center gap-1.5 rounded-full bg-[#48D597] px-4 py-2 text-xs font-semibold whitespace-nowrap text-[#1a2e38] shadow-md transition-colors hover:bg-[#3bc485] sm:px-5 sm:py-2.5 sm:text-sm"
            >
              <span className="sm:hidden">First Visit</span>
              <span className="hidden sm:inline">Request Your Dog&apos;s First Visit</span>
              <ArrowRight className="h-3.5 w-3.5 flex-shrink-0 sm:h-4 sm:w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
