/*
 * Metro Mutts Navbar
 * Brand: Green #48D597 primary, Dark #345460 text
 * Merged utility bar: contact left, promo center, links right
 * Scroll-aware sticky navigation with backdrop blur
 * All links use proper route navigation — hash links navigate to homepage first if needed
 */
import { useState, useEffect } from "react";
import { Menu, X, Phone, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { trackPhoneCall, trackNavClick } from "@/lib/analytics";
import { useBookingModal } from "@/contexts/BookingModalContext";
import SocialProofTicker, { SocialProofTickerMobile } from "@/components/SocialProofTicker";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/mm-logo-dark_455bad7b.png";



const navLinks = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Daycare", href: "/daycare" },
      { label: "All Services", href: "/services" },
      { label: "Boarding", href: "/boarding" },
      { label: "Grooming & Spa", href: "/grooming" },
      { label: "Grooming Gallery", href: "/grooming-gallery" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  { label: "About Us", href: "/#about" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Contact", href: "/#contact" },
];

function PawIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 17.5c-1.5 1.5-4.5 2.5-5 1s1-4 3-5c1.2-.6 2.8-.6 4 0 2 1 3.5 3.5 3 5s-3.5.5-5-1z" />
      <ellipse cx="7" cy="8.5" rx="2" ry="2.5" />
      <ellipse cx="17" cy="8.5" rx="2" ry="2.5" />
      <ellipse cx="10.5" cy="5" rx="1.8" ry="2.2" />
      <ellipse cx="13.5" cy="5" rx="1.8" ry="2.2" />
    </svg>
  );
}

function NavLink({ href, className, children, onClick }: {
  href: string;
  className: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const [location] = useLocation();

  // Homepage anchor links (e.g., "/#about")
  if (href.startsWith("/#")) {
    const sectionId = href.slice(2);
    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      onClick?.();
      if (location === "/") {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = href;
      }
    };
    return (
      <a href={href} onClick={handleClick} className={className}>
        {children}
      </a>
    );
  }

  // Regular route links
  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const [location] = useLocation();
  const { openBookingModal } = useBookingModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);



  // Handle hash scrolling when arriving on homepage from another page
  useEffect(() => {
    if (location === "/" && window.location.hash) {
      const sectionId = window.location.hash.slice(1);
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }, [location]);



  const isActiveLink = (href: string) => {
    if (href.startsWith("/#")) return false;
    return location === href;
  };

  return (
    <>
      {/* ─── Merged Utility + Promo Bar (Desktop) ─── */}
      <div className="hidden lg:block bg-[#345460] text-white/80 text-sm">
        <div className="container flex items-center justify-between py-2">
          {/* Left: Contact info */}
          <div className="flex items-center gap-6">
            <a href="tel:5398673841" className="flex items-center gap-1.5 hover:text-white transition-colors" onClick={() => trackPhoneCall("navbar_desktop")}>
              <Phone className="w-3.5 h-3.5" />
              539-867-3841
            </a>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              Tulsa, Oklahoma
            </span>
          </div>

          {/* Center: Social Proof Ticker */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <SocialProofTicker />
          </div>

          {/* Right: Utility links */}
          <div className="flex items-center gap-4">
            <Link href="/refer" className="hover:text-white transition-colors">Refer a Friend</Link>
            <span className="text-white/30">|</span>
            <Link href="/careers" className="hover:text-white transition-colors">Careers</Link>
          </div>
        </div>
      </div>

      {/* ─── Mobile Social Proof Strip ─── */}
      <SocialProofTickerMobile />

      {/* ─── Main Navigation ─── */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg shadow-black/5"
            : "bg-white"
        }`}
      >
        <div className="container flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <img
              src={LOGO_URL}
              alt="Metro Mutts"
              className="h-12 lg:h-14 w-auto transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <NavLink
                  href={link.href}
                  className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold transition-colors rounded-lg hover:bg-[#48D597]/10 ${
                    isActiveLink(link.href)
                      ? "text-[#48D597]"
                      : "text-[#345460] hover:text-[#48D597]"
                  }`}
                >
                  {link.label}
                  {link.children && <ChevronDown className="w-3.5 h-3.5" />}
                </NavLink>
                {link.children && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 pt-2 w-52">
                    <div className="bg-white rounded-xl shadow-xl shadow-black/10 border border-black/5 py-2 overflow-hidden">
                      {link.children.map((child) => (
                        <NavLink
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm font-medium text-[#345460] hover:text-[#48D597] hover:bg-[#48D597]/10 transition-colors"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {child.label}
                        </NavLink>
                      ))}
                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <Link
                          href="/pricing"
                          className="block px-4 py-2.5 text-sm font-medium text-[#48D597] hover:bg-[#48D597]/10 transition-colors"
                        >
                          View All Pricing →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:5398673841"
              className="flex items-center gap-1.5 text-sm font-medium text-[#345460]/70 hover:text-[#48D597] transition-colors mr-1"
              onClick={() => trackPhoneCall("navbar_header")}
            >
              <Phone className="w-4 h-4" />
              539-867-3841
            </a>
            <Link href="/get-started">
              <Button
                variant="outline"
                className="border-[#FB923C] text-[#FB923C] hover:bg-[#FB923C]/10 font-semibold"
                onClick={() => trackNavClick("get_started_desktop")}
              >
                <PawIcon className="w-4 h-4 mr-1" />
                Get Started
              </Button>
            </Link>
            <Button
              className="bg-[#48D597] hover:bg-[#3bc085] text-[#345460] font-bold shadow-lg shadow-[#48D597]/20"
              onClick={() => openBookingModal()}
            >
              Book a Visit
            </Button>
          </div>

          {/* Mobile actions */}
          <div className="lg:hidden flex items-center gap-1">
            <a
              href="tel:5398673841"
              className="p-2 rounded-lg hover:bg-[#48D597]/10 transition-colors text-[#345460]"
              aria-label="Call Metro Mutts"
              onClick={() => trackPhoneCall("navbar_mobile_header")}
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl">
            <div className="container py-4 space-y-1">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <NavLink
                    href={link.href}
                    className={`block px-4 py-3 text-base font-semibold rounded-lg transition-colors ${
                      isActiveLink(link.href)
                        ? "text-[#48D597] bg-[#48D597]/10"
                        : "text-[#345460] hover:text-[#48D597] hover:bg-[#48D597]/10"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                  {link.children && (
                    <div className="ml-4 space-y-1">
                      {link.children.map((child) => (
                        <NavLink
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2 text-sm font-medium text-[#345460]/70 hover:text-[#48D597] transition-colors"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {/* Mobile utility links */}
              <div className="border-t border-gray-100 pt-3 mt-3 flex gap-4 px-4">
                <Link
                  href="/refer"
                  className="text-sm font-medium text-[#345460]/60 hover:text-[#48D597] transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Refer a Friend
                </Link>
                <Link
                  href="/careers"
                  className="text-sm font-medium text-[#345460]/60 hover:text-[#48D597] transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Careers
                </Link>
              </div>
              <div className="pt-3 flex flex-col gap-2">
                <Link href="/get-started" onClick={() => setMobileOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full border-[#FB923C] text-[#FB923C] hover:bg-[#FB923C]/10 font-bold"
                  >
                    <PawIcon className="w-4 h-4 mr-1" />
                    Get Started — New Customers
                  </Button>
                </Link>
                <Button
                  className="w-full bg-[#48D597] hover:bg-[#3bc085] text-[#345460] font-bold"
                  onClick={() => { openBookingModal(); setTimeout(() => setMobileOpen(false), 50); }}
                >
                  Book a Visit
                </Button>
                <a href="tel:5398673841" className="flex items-center justify-center gap-2 py-2 text-sm font-medium text-[#345460]/70" onClick={() => trackPhoneCall("navbar_mobile")}>
                  <Phone className="w-4 h-4" /> 539-867-3841
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
