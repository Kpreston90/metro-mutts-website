import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import BookingModal from "@/components/BookingModal";

interface BookingModalContextType {
  openBookingModal: () => void;
  closeBookingModal: () => void;
}

const BookingModalContext = createContext<BookingModalContextType | null>(null);

export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when modal is open (important for mobile)
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  return (
    <BookingModalContext.Provider
      value={{
        openBookingModal: () => setIsOpen(true),
        closeBookingModal: () => setIsOpen(false),
      }}
    >
      {children}
      {createPortal(
        <BookingModal isOpen={isOpen} onClose={() => setIsOpen(false)} />,
        document.body
      )}
    </BookingModalContext.Provider>
  );
}

export function useBookingModal() {
  const context = useContext(BookingModalContext);
  if (!context) {
    throw new Error("useBookingModal must be used within BookingModalProvider");
  }
  return context;
}
