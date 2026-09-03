/**
 * Social Proof Ticker
 * Rotates verified review snippets, useful facility updates, and
 * admin-managed announcements. Live capacity counts are deliberately excluded.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { Dog, Heart, Megaphone, Sparkles, TrendingUp } from "lucide-react";
import { useBookingModal } from "@/contexts/BookingModalContext";
import { trpc } from "@/lib/trpc";

interface TickerMessage {
  icon: React.ReactNode;
  text: string;
  highlight?: string;
  bookable?: boolean;
}

const funMessages: TickerMessage[] = [
  {
    icon: <Heart className="h-3.5 w-3.5 text-[#FB923C]" />,
    text: "7,000+ sq ft of pure pup paradise",
  },
  {
    icon: <Sparkles className="h-3.5 w-3.5 text-[#48D597]" />,
    text: "From the family behind OKC’s most waitlisted dog care spot",
  },
  {
    icon: <Dog className="h-3.5 w-3.5 text-[#48D597]" />,
    text: "First day FREE for new pups",
    highlight: "Get started →",
    bookable: true,
  },
  {
    icon: <TrendingUp className="h-3.5 w-3.5 text-[#48D597]" />,
    text: "Weekend daycare now available!",
    highlight: "Sat & Sun 9am–5pm →",
    bookable: true,
  },
];

function buildSeasonalMessages(
  dbMessages: Array<{ message: string; highlight: string | null; bookable: string }> | undefined
): TickerMessage[] {
  if (!dbMessages?.length) return [];
  return dbMessages.map(message => ({
    icon: <Megaphone className="h-3.5 w-3.5 text-[#FB923C]" />,
    text: message.message,
    highlight: message.highlight || undefined,
    bookable: message.bookable === "true",
  }));
}

function useTickerMessages() {
  const { data: seasonalData } = trpc.seasonalMessages.getActive.useQuery(undefined, {
    refetchInterval: 300000,
    staleTime: 120000,
  });

  return useMemo(() => {
    const seasonalMessages = buildSeasonalMessages(seasonalData);
    const messages: TickerMessage[] = [];
    const maxLength = Math.max(funMessages.length, seasonalMessages.length);

    for (let index = 0; index < maxLength; index += 1) {
      if (seasonalMessages[index]) messages.push(seasonalMessages[index]);
      if (funMessages[index]) messages.push(funMessages[index]);
    }

    return messages.length ? messages : [...funMessages];
  }, [seasonalData]);
}

function useRotatingMessage(messages: TickerMessage[]) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIsAnimating(true);
      window.setTimeout(() => {
        setCurrentIndex(previous => (previous + 1) % messages.length);
        setIsAnimating(false);
      }, 400);
    }, 4500);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [messages.length]);

  useEffect(() => setCurrentIndex(0), [messages.length]);

  return { current: messages[currentIndex % messages.length], isAnimating };
}

function TickerContent({ mobile = false }: { mobile?: boolean }) {
  const { openBookingModal } = useBookingModal();
  const messages = useTickerMessages();
  const { current, isAnimating } = useRotatingMessage(messages);

  if (!current) return null;
  const isBookable = current.bookable || current.highlight?.includes("→");
  const content = (
    <>
      {current.icon}
      <span className={mobile ? "text-[11px] leading-tight" : "text-xs tracking-wide"}>
        {current.text}
        {current.highlight ? (
          <>
            {" "}
            <strong className={isBookable ? "text-[#FB923C]" : "text-[#48D597]"}>{current.highlight}</strong>
          </>
        ) : null}
      </span>
    </>
  );

  return (
    <button
      onClick={isBookable ? openBookingModal : undefined}
      className={`flex items-center gap-2 text-center transition-all duration-300 ${
        isBookable ? "cursor-pointer hover:opacity-80" : "cursor-default"
      } ${isAnimating ? "translate-y-1 opacity-0" : "translate-y-0 opacity-100"}`}
      aria-live="polite"
    >
      {content}
    </button>
  );
}

export default function SocialProofTicker() {
  return <TickerContent />;
}

export function SocialProofTickerMobile() {
  return (
    <div className="bg-[#345460] text-white/90 lg:hidden">
      <div className="flex items-center justify-center px-4 py-2">
        <TickerContent mobile />
      </div>
    </div>
  );
}
