/**
 * Sticky service booking prompt. Exact capacity is intentionally shown only
 * in the dedicated Boarding availability calendar, not in conversion banners.
 */
import { CheckCircle } from "lucide-react";
import { useBookingModal } from "@/contexts/BookingModalContext";

type ServiceType = "daycare" | "grooming" | "boarding";

interface ServiceAvailabilityBarProps {
  service: ServiceType;
}

const bookingPrompts: Record<ServiceType, string> = {
  daycare: "Give your dog a day made for play.",
  grooming: "A fresh, feel-good groom starts here.",
  boarding: "Planning a trip? We’ll make their stay feel like home.",
};

export default function ServiceAvailabilityBar({ service }: ServiceAvailabilityBarProps) {
  const { openBookingModal } = useBookingModal();

  return (
    <div className="sticky top-[72px] z-30 border-b border-[#48D597]/20 bg-white/95 shadow-sm backdrop-blur-sm">
      <div className="container flex flex-wrap items-center justify-between gap-2 py-2.5">
        <div className="flex items-center gap-2 text-sm font-medium text-[#345460]">
          <CheckCircle className="h-4 w-4 flex-shrink-0 text-[#48D597]" />
          <span>{bookingPrompts[service]}</span>
        </div>
        <button
          onClick={openBookingModal}
          className="text-sm font-semibold whitespace-nowrap text-[#48D597] transition-colors hover:text-[#3bc085]"
        >
          Book Now →
        </button>
      </div>
    </div>
  );
}
