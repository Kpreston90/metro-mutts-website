/**
 * Limited Spots Toast
 * Floating notification that slides in from the bottom-right after a delay.
 * Fetches real-time availability from the Gingr API via tRPC.
 * Falls back to day-aware static messaging if API is unavailable.
 */
import { useState, useEffect, useMemo } from "react";
import { X, Clock, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useBookingModal } from "@/contexts/BookingModalContext";
import { trpc } from "@/lib/trpc";

const STORAGE_KEY = "mm-toast-last-shown";
const SHOW_DELAY_MS = 6000; // Show after 6 seconds on page
const AUTO_DISMISS_MS = 10000; // Auto-dismiss after 10 seconds
const COOLDOWN_HOURS = 4; // Don't show again for 4 hours

interface SpotMessage {
  service: string;
  spots: number;
  timeframe: string;
}

function getFallbackMessage(): SpotMessage {
  const day = new Date().getDay();
  const messages: SpotMessage[] = [
    { service: "daycare", spots: 4, timeframe: "this week" },
    { service: "boarding", spots: 3, timeframe: "this weekend" },
    { service: "daycare", spots: 5, timeframe: "Monday" },
    { service: "boarding", spots: 2, timeframe: "this Saturday" },
  ];

  if (day === 0 || day === 6) return messages[1];
  if (day === 4 || day === 5) return messages[3];
  if (day === 1) return messages[2];
  return messages[0];
}

export default function LimitedSpotsToast() {
  const [visible, setVisible] = useState(false);
  const { openBookingModal } = useBookingModal();

  // Fetch real availability from Gingr API
  const { data: availability } = trpc.availability.todayAndTomorrow.useQuery(
    undefined,
    { staleTime: 5 * 60 * 1000, retry: 1 } // Cache for 5 min, only retry once
  );

  // Derive the most urgent message from real data or fall back to static
  const message: SpotMessage = useMemo(() => {
    if (!availability) return getFallbackMessage();

    const { today, tomorrow } = availability;

    // Find the service with the fewest spots left (most urgent)
    const options: SpotMessage[] = [];

    if (today.daycare.spotsLeft <= 8 && today.daycare.spotsLeft > 0) {
      options.push({ service: "daycare", spots: today.daycare.spotsLeft, timeframe: "today" });
    }
    if (tomorrow.daycare.spotsLeft <= 8 && tomorrow.daycare.spotsLeft > 0) {
      options.push({ service: "daycare", spots: tomorrow.daycare.spotsLeft, timeframe: "tomorrow" });
    }
    if (today.boarding.spotsLeft <= 5 && today.boarding.spotsLeft > 0) {
      options.push({ service: "boarding", spots: today.boarding.spotsLeft, timeframe: "tonight" });
    }
    if (tomorrow.boarding.spotsLeft <= 5 && tomorrow.boarding.spotsLeft > 0) {
      options.push({ service: "boarding", spots: tomorrow.boarding.spotsLeft, timeframe: "tomorrow night" });
    }

    // Pick the most urgent (fewest spots)
    if (options.length > 0) {
      options.sort((a, b) => a.spots - b.spots);
      return options[0];
    }

    // If nothing is low, fall back to static messaging
    return getFallbackMessage();
  }, [availability]);

  useEffect(() => {
    // Check cooldown
    const lastShown = localStorage.getItem(STORAGE_KEY);
    if (lastShown) {
      const hoursSince =
        (Date.now() - parseInt(lastShown, 10)) / (1000 * 60 * 60);
      if (hoursSince < COOLDOWN_HOURS) return;
    }

    // Show after delay
    const showTimer = setTimeout(() => {
      setVisible(true);
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
    }, SHOW_DELAY_MS);

    return () => clearTimeout(showTimer);
  }, []);

  // Auto-dismiss
  useEffect(() => {
    if (!visible) return;
    const dismissTimer = setTimeout(() => setVisible(false), AUTO_DISMISS_MS);
    return () => clearTimeout(dismissTimer);
  }, [visible]);

  const handleBook = () => {
    setVisible(false);
    openBookingModal();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-6 right-6 z-[60] max-w-sm"
        >
          <div className="bg-white rounded-2xl shadow-2xl shadow-black/15 border border-gray-100 overflow-hidden">
            {/* Peach accent top bar */}
            <div className="h-1 bg-gradient-to-r from-[#FB923C] to-[#FB923C]/60" />

            <div className="p-5">
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#FB923C]/10 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-[#FB923C]" />
                  </div>
                  <p className="text-sm font-bold text-[#345460]">
                    Spots filling up
                  </p>
                </div>
                <button
                  onClick={() => setVisible(false)}
                  className="p-1 rounded-full text-[#345460]/30 hover:text-[#345460] hover:bg-gray-100 transition-all shrink-0"
                  aria-label="Dismiss"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Message */}
              <p className="text-sm text-[#345460]/70 mb-4 leading-relaxed">
                Only{" "}
                <span className="font-bold text-[#FB923C]">
                  {message.spots} {message.service} spot
                  {message.spots > 1 ? "s" : ""}
                </span>{" "}
                left {message.timeframe}. Don't miss out!
              </p>

              {/* CTA */}
              <button
                onClick={handleBook}
                className="w-full flex items-center justify-center gap-2 bg-[#48D597] hover:bg-[#3bc085] text-[#345460] font-bold text-sm py-2.5 px-4 rounded-xl transition-all hover:-translate-y-0.5 shadow-lg shadow-[#48D597]/20"
              >
                <Sparkles className="w-4 h-4" />
                Book Now
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
