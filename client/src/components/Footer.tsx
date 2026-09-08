/*
 * Metro Mutts Footer
 * Brand: Green #48D597, Dark #345460
 * Dark background, multi-column links, real logo
 * All links use proper route navigation (no broken hash-only links)
 */
import { Facebook, Instagram } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useBookingModal } from "@/contexts/BookingModalContext";

const LOGO_WHITE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/mm-logo-white_a0eef0bd.png";

const footerLinks = {
  Services: [
    { label: "Dog Daycare", href: "/daycare" },
    { label: "Overnight Boarding", href: "/boarding" },
    { label: "Grooming & Spa", href: "/grooming" },
    { label: "All Services", href: "/services" },
    { label: "Pricing", href: "/pricing" },
  ],
  Company: [
    { label: "About Us", href: "/#about" },
    { label: "Testimonials", href: "/#testimonials" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Facility Tour", href: "/tour" },
  ],
  Support: [
    { label: "Book a Visit", href: "/book" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact Us", href: "/#contact" },
    { label: "Refer a Friend", href: "/refer" },
  ],
};

function FooterLink({ label, href, onClick }: { label: string; href: string; onClick?: () => void }) {
  const [location] = useLocation();

  // Handle custom onClick (e.g., booking modal)
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="text-sm text-white/60 hover:text-[#48D597] transition-colors"
      >
        {label}
      </button>
    );
  }

  // Handle homepage anchor links (e.g., "/#about")
  if (href.startsWith("/#")) {
    const sectionId = href.slice(2); // remove "/#"
    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      if (location === "/") {
        // Already on homepage — just scroll
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      } else {
        // Navigate to homepage with hash
        window.location.href = href;
      }
    };
    return (
      <a
        href={href}
        onClick={handleClick}
        className="text-sm text-white/60 hover:text-[#48D597] transition-colors"
      >
        {label}
      </a>
    );
  }

  // Regular route links
  return (
    <Link
      href={href}
      className="text-sm text-white/60 hover:text-[#48D597] transition-colors"
    >
      {label}
    </Link>
  );
}

export default function Footer() {
  const { openBookingModal } = useBookingModal();
  return (
    <footer className="bg-[#345460] text-white">
      <div className="container py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <Link href="/" className="inline-block mb-5">
              <img
                src={LOGO_WHITE}
                alt="Metro Mutts"
                className="h-14 w-auto"
              />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm mb-6">
              Tulsa's most trusted dog care provider. Award-winning daycare, luxury boarding, and professional grooming — all under one roof.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/metromuttstulsa/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-[#48D597] hover:text-[#345460] transition-colors"
              >
                <Instagram className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://www.facebook.com/p/Metro-Mutts-61559392709790"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-[#48D597] hover:text-[#345460] transition-colors"
              >
                <Facebook className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bold text-sm uppercase tracking-wider text-white/40 mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <FooterLink
                      label={link.label}
                      href={link.href}
                      onClick={link.href === "/book" ? openBookingModal : undefined}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} Metro Mutts. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/40">
            <Link
              href="/privacy"
              className="hover:text-white/60 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-white/60 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
