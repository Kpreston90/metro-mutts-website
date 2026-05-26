/**
 * Metro Mutts — Smart Booking Modal (Option C)
 * Routes users by service type, handles new vs existing customers,
 * captures email leads before redirecting to Gingr.
 * Includes promo code validation & redemption flow.
 * Brand: Green #48D597, Dark #345460, Cream #FFFFEC
 */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  X,
  Dog,
  Scissors,
  Moon,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Phone,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Tag,
  Loader2,
  Gift,
} from "lucide-react";

const GINGR_LOGIN =
  "https://metromutts.portal.gingrapp.com/public/login/Ii9zZWN1cmUvaG9tZSI=";
const GINGR_SIGNUP =
  "https://metromutts.portal.gingrapp.com/public/new_customer";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "service" | "customer-type" | "promo-redeem" | "redirect";
type Service = "daycare" | "grooming" | "boarding" | "store";

const services = [
  {
    id: "daycare" as Service,
    icon: Dog,
    title: "Daycare",
    subtitle: "Full day of play & socialization",
    highlight: "First day FREE",
  },
  {
    id: "grooming" as Service,
    icon: Scissors,
    title: "Grooming",
    subtitle: "Bath, haircut, nails & more",
    highlight: "By appointment",
  },
  {
    id: "boarding" as Service,
    icon: Moon,
    title: "Boarding",
    subtitle: "Overnight stays with play included",
    highlight: "Luxury suites",
  },
  {
    id: "store" as Service,
    icon: ShoppingBag,
    title: "Visit the Store",
    subtitle: "Treats, toys, food & gear",
    highlight: "No appointment needed",
  },
];

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState<Step>("service");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [promoValidation, setPromoValidation] = useState<{
    valid: boolean;
    description?: string;
    discountType?: string;
    discountValue?: number;
  } | null>(null);
  const [promoCode, setPromoCode] = useState("");

  const handleClose = () => {
    onClose();
    // Reset state after animation
    setTimeout(() => {
      setStep("service");
      setSelectedService(null);
      setPromoValidation(null);
      setPromoCode("");
    }, 300);
  };

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    if (service === "store") {
      // Store doesn't need booking — just show hours/directions
      setStep("redirect");
    } else {
      setStep("customer-type");
    }
  };

  const handleBack = () => {
    if (step === "customer-type") {
      setStep("service");
      setSelectedService(null);
      setPromoValidation(null);
      setPromoCode("");
    } else if (step === "promo-redeem") {
      setStep("customer-type");
    } else if (step === "redirect") {
      setStep("customer-type");
    }
  };

  const handlePromoValidated = (validation: {
    valid: boolean;
    description?: string;
    discountType?: string;
    discountValue?: number;
  }, code: string) => {
    setPromoValidation(validation);
    setPromoCode(code);
    setStep("promo-redeem");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
          >
            <div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-[#345460] px-6 py-5 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  {step !== "service" && (
                    <button
                      onClick={handleBack}
                      className="text-white/70 hover:text-white transition-colors p-1"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                  )}
                  <div>
                    <h2 className="text-white font-bold text-lg">
                      {step === "service" && "What can we help with?"}
                      {step === "customer-type" && "Have you been here before?"}
                      {step === "promo-redeem" && "Claim Your Offer"}
                      {step === "redirect" && getRedirectTitle(selectedService)}
                    </h2>
                    <p className="text-white/60 text-sm">
                      {step === "service" && "Choose a service to get started"}
                      {step === "customer-type" &&
                        "This helps us send you to the right place"}
                      {step === "promo-redeem" && "Enter your details to redeem"}
                      {step === "redirect" && "You're almost there!"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="text-white/70 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto">
                <AnimatePresence mode="wait">
                  {step === "service" && (
                    <ServiceStep
                      key="service"
                      onSelect={handleServiceSelect}
                    />
                  )}
                  {step === "customer-type" && (
                    <CustomerTypeStep
                      key="customer-type"
                      service={selectedService!}
                      onPromoValidated={handlePromoValidated}
                    />
                  )}
                  {step === "promo-redeem" && (
                    <PromoRedeemStep
                      key="promo-redeem"
                      service={selectedService!}
                      promoCode={promoCode}
                      promoValidation={promoValidation!}
                      onSuccess={handleClose}
                    />
                  )}
                  {step === "redirect" && selectedService === "store" && (
                    <StoreStep key="store" />
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between shrink-0">
                <a
                  href="tel:5398673841"
                  className="text-[#345460]/60 hover:text-[#345460] text-sm flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Prefer to call? 539-867-3841
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─── Step 1: Service Selection ─── */
function ServiceStep({
  onSelect,
}: {
  onSelect: (service: Service) => void;
}) {
  // Fetch real-time availability
  const { data: availability } = trpc.availability.todayAndTomorrow.useQuery(
    undefined,
    { staleTime: 5 * 60 * 1000, retry: 1 }
  );

  // Build availability badges
  const getAvailabilityBadge = (serviceId: Service): string | null => {
    if (!availability) return null;
    const today = availability.today;
    if (serviceId === "daycare" && today.daycare.spotsLeft <= 10) {
      return `${today.daycare.spotsLeft} spots left today`;
    }
    if (serviceId === "grooming" && today.grooming.spotsLeft <= 4) {
      return `${today.grooming.spotsLeft} spots left today`;
    }
    if (serviceId === "boarding" && today.boarding.spotsLeft <= 6) {
      return `${today.boarding.spotsLeft} suites available`;
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.2 }}
      className="grid grid-cols-1 sm:grid-cols-2 gap-3"
    >
      {services.map((service) => {
        const Icon = service.icon;
        const availBadge = getAvailabilityBadge(service.id);
        return (
          <button
            key={service.id}
            onClick={() => onSelect(service.id)}
            className="group relative text-left pt-8 pb-5 px-5 rounded-xl border border-gray-100 hover:border-[#48D597] hover:shadow-lg hover:shadow-[#48D597]/10 transition-all duration-200 hover:-translate-y-0.5"
          >
            {service.highlight && (
              <span className="absolute top-2.5 right-3 text-[10px] font-bold text-[#48D597] bg-[#48D597]/10 px-2 py-0.5 rounded-full">
                {service.highlight}
              </span>
            )}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#48D597]/10 flex items-center justify-center shrink-0 group-hover:bg-[#48D597]/20 transition-colors">
                <Icon className="w-5 h-5 text-[#48D597]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-[#345460] text-sm mb-0.5">
                  {service.title}
                </h3>
                <p className="text-[#345460]/50 text-xs leading-relaxed">
                  {service.subtitle}
                </p>
                {availBadge && (
                  <p className="text-[10px] font-semibold text-[#FB923C] mt-1">
                    {availBadge}
                  </p>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </motion.div>
  );
}

/* ─── Step 2: New vs Existing Customer + Promo Code ─── */
function CustomerTypeStep({
  service,
  onPromoValidated,
}: {
  service: Service;
  onPromoValidated: (validation: {
    valid: boolean;
    description?: string;
    discountType?: string;
    discountValue?: number;
  }, code: string) => void;
}) {
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const validateMutation = trpc.promo.validate.useQuery(
    { code: promoInput.trim(), serviceType: service as "daycare" | "boarding" | "grooming" },
    { enabled: false }
  );

  const handleValidatePromo = async () => {
    if (!promoInput.trim()) return;
    setPromoError(null);
    setIsValidating(true);

    try {
      const result = await validateMutation.refetch();
      if (result.data?.valid) {
        onPromoValidated({
          valid: true,
          description: result.data.description,
          discountType: result.data.discountType,
          discountValue: result.data.discountValue,
        }, promoInput.trim());
      } else {
        setPromoError(result.data?.error || "Invalid promo code");
      }
    } catch {
      setPromoError("Unable to validate code. Please try again.");
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.2 }}
      className="space-y-4"
    >
      {/* Existing Customer */}
      <a
        href={GINGR_LOGIN}
        target="_blank"
        rel="noopener noreferrer"
        className="group block p-5 rounded-xl border border-gray-100 hover:border-[#48D597] hover:shadow-lg hover:shadow-[#48D597]/10 transition-all duration-200 hover:-translate-y-0.5"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#48D597]/10 flex items-center justify-center group-hover:bg-[#48D597]/20 transition-colors">
              <CheckCircle2 className="w-6 h-6 text-[#48D597]" />
            </div>
            <div>
              <h3 className="font-bold text-[#345460] mb-0.5">
                I'm a returning customer
              </h3>
              <p className="text-[#345460]/50 text-sm">
                Log in to book {service}
              </p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-[#345460]/30 group-hover:text-[#48D597] transition-colors" />
        </div>
      </a>

      {/* New Customer */}
      <a
        href="/get-started"
        className="group block p-5 rounded-xl border border-gray-100 hover:border-[#48D597] hover:shadow-lg hover:shadow-[#48D597]/10 transition-all duration-200 hover:-translate-y-0.5"
        onClick={(e) => {
          e.preventDefault();
          window.location.href = "/get-started";
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#FB923C]/10 flex items-center justify-center group-hover:bg-[#FB923C]/20 transition-colors">
              <Sparkles className="w-6 h-6 text-[#FB923C]" />
            </div>
            <div>
              <h3 className="font-bold text-[#345460] mb-0.5">
                I'm new here!
              </h3>
              <p className="text-[#345460]/50 text-sm">
                See how to get started
              </p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-[#345460]/30 group-hover:text-[#FB923C] transition-colors" />
        </div>
      </a>

      {/* Promo Code Section */}
      <div className="border-t border-gray-100 pt-4">
        {!showPromoInput ? (
          <button
            onClick={() => setShowPromoInput(true)}
            className="flex items-center gap-2 text-sm text-[#345460]/60 hover:text-[#48D597] transition-colors"
          >
            <Tag className="w-4 h-4" />
            Have a promo code?
          </button>
        ) : (
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={promoInput}
                onChange={(e) => {
                  setPromoInput(e.target.value.toUpperCase());
                  setPromoError(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleValidatePromo();
                }}
                placeholder="Enter code (e.g., FIRSTNIGHT)"
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-[#345460] placeholder:text-[#345460]/40 focus:outline-none focus:ring-2 focus:ring-[#48D597]/50 focus:border-[#48D597] uppercase"
                autoFocus
              />
              <Button
                onClick={handleValidatePromo}
                disabled={!promoInput.trim() || isValidating}
                className="bg-[#48D597] hover:bg-[#3bc085] text-[#345460] font-semibold px-4"
              >
                {isValidating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Apply"
                )}
              </Button>
            </div>
            {promoError && (
              <p className="text-xs text-red-500 pl-1">{promoError}</p>
            )}
          </div>
        )}
      </div>

      {/* Service-specific callouts */}
      {service === "daycare" && (
        <div className="bg-[#FB923C]/5 border border-[#FB923C]/20 rounded-xl p-4 flex items-center gap-3">
          <Dog className="w-5 h-5 text-[#FB923C] shrink-0" />
          <p className="text-sm text-[#345460]/70">
            <span className="font-bold text-[#FB923C]">First day is FREE</span>{" "}
            for all new daycare pups! Just sign up and schedule a meet & greet.
          </p>
        </div>
      )}

      {service === "grooming" && (
        <div className="bg-[#48D597]/5 border border-[#48D597]/20 rounded-xl p-4 flex items-center gap-3">
          <Scissors className="w-5 h-5 text-[#48D597] shrink-0" />
          <p className="text-sm text-[#345460]/70">
            <span className="font-bold text-[#345460]">Grooming by Jacque</span>{" "}
            — book early, spots fill up fast! Call if you need a specific day.
          </p>
        </div>
      )}

      {service === "boarding" && (
        <div className="bg-[#48D597]/5 border border-[#48D597]/20 rounded-xl p-4 flex items-center gap-3">
          <Moon className="w-5 h-5 text-[#48D597] shrink-0" />
          <p className="text-sm text-[#345460]/70">
            <span className="font-bold text-[#345460]">
              Boarding includes daycare play!
            </span>{" "}
            Your pup won't just sleep here — they'll have a blast.
          </p>
        </div>
      )}
    </motion.div>
  );
}

/* ─── Step 3: Promo Code Redemption Form ─── */
function PromoRedeemStep({
  service,
  promoCode,
  promoValidation,
  onSuccess,
}: {
  service: Service;
  promoCode: string;
  promoValidation: {
    valid: boolean;
    description?: string;
    discountType?: string;
    discountValue?: number;
  };
  onSuccess: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [redeemError, setRedeemError] = useState<string | null>(null);
  const [redeemed, setRedeemed] = useState(false);

  const redeemMutation = trpc.promo.redeem.useMutation();

  const getOfferLabel = () => {
    if (!promoValidation) return "";
    const { discountType, discountValue } = promoValidation;
    if (discountType === "free_night") return `${discountValue} Free Night${(discountValue || 1) > 1 ? "s" : ""}`;
    if (discountType === "percentage") return `${discountValue}% Off`;
    if (discountType === "fixed_amount") return `$${discountValue} Off`;
    return promoValidation.description || "Special Offer";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setIsSubmitting(true);
    setRedeemError(null);

    try {
      const result = await redeemMutation.mutateAsync({
        code: promoCode,
        customerName: name.trim(),
        customerEmail: email.trim().toLowerCase(),
        customerPhone: phone.trim() || undefined,
        serviceType: service as "daycare" | "boarding" | "grooming",
      });

      if (result.success) {
        setRedeemed(true);
      } else {
        setRedeemError(result.error || "Unable to redeem code. Please try again.");
      }
    } catch {
      setRedeemError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (redeemed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center py-6 space-y-4"
      >
        <div className="w-16 h-16 rounded-full bg-[#48D597]/10 flex items-center justify-center mx-auto">
          <Gift className="w-8 h-8 text-[#48D597]" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-[#345460] mb-1">Offer Claimed!</h3>
          <p className="text-[#345460]/60 text-sm">
            Your <span className="font-semibold text-[#48D597]">{getOfferLabel()}</span> has been saved.
          </p>
        </div>
        <div className="bg-[#48D597]/5 border border-[#48D597]/20 rounded-xl p-4 text-sm text-[#345460]/70">
          <p className="font-medium text-[#345460] mb-1">What's next?</p>
          <p>
            Book your {service} through our portal and mention code{" "}
            <span className="font-bold text-[#48D597]">{promoCode}</span> at check-in. Our team will apply your discount!
          </p>
        </div>
        <div className="flex gap-3 pt-2">
          <Button
            className="flex-1 bg-[#48D597] hover:bg-[#3bc085] text-[#345460] font-bold h-11"
            asChild
          >
            <a href={GINGR_SIGNUP} target="_blank" rel="noopener noreferrer">
              Book Now <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-[#345460]/20 text-[#345460] font-semibold h-11"
            onClick={onSuccess}
          >
            Done
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.2 }}
      className="space-y-4"
    >
      {/* Offer preview */}
      <div className="bg-gradient-to-r from-[#48D597]/10 to-[#FB923C]/10 border border-[#48D597]/20 rounded-xl p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-[#48D597]/20 flex items-center justify-center shrink-0">
          <Tag className="w-5 h-5 text-[#48D597]" />
        </div>
        <div>
          <p className="font-bold text-[#345460] text-sm">{getOfferLabel()}</p>
          <p className="text-xs text-[#345460]/60">{promoValidation.description}</p>
          <p className="text-[10px] text-[#48D597] font-semibold mt-0.5">Code: {promoCode}</p>
        </div>
      </div>

      {/* Redemption form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="text-xs font-medium text-[#345460]/70 mb-1 block">
            Your Name *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="First & last name"
            required
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-[#345460] placeholder:text-[#345460]/40 focus:outline-none focus:ring-2 focus:ring-[#48D597]/50 focus:border-[#48D597]"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-[#345460]/70 mb-1 block">
            Email *
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-[#345460] placeholder:text-[#345460]/40 focus:outline-none focus:ring-2 focus:ring-[#48D597]/50 focus:border-[#48D597]"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-[#345460]/70 mb-1 block">
            Phone (optional)
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(555) 123-4567"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-[#345460] placeholder:text-[#345460]/40 focus:outline-none focus:ring-2 focus:ring-[#48D597]/50 focus:border-[#48D597]"
          />
        </div>

        {redeemError && (
          <p className="text-xs text-red-500 pl-1">{redeemError}</p>
        )}

        <Button
          type="submit"
          disabled={!name.trim() || !email.trim() || isSubmitting}
          className="w-full bg-[#48D597] hover:bg-[#3bc085] text-[#345460] font-bold h-11 mt-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Claiming...
            </>
          ) : (
            <>
              <Gift className="w-4 h-4 mr-2" />
              Claim Offer
            </>
          )}
        </Button>
      </form>

      <p className="text-[10px] text-[#345460]/40 text-center">
        We'll save your offer. Book through Gingr and mention the code at check-in.
      </p>
    </motion.div>
  );
}

/* ─── Store Step (no booking needed) ─── */
function StoreStep() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.2 }}
      className="space-y-5"
    >
      <div className="bg-[#48D597]/5 border border-[#48D597]/20 rounded-xl p-5">
        <h3 className="font-bold text-[#345460] mb-3 flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-[#48D597]" />
          No appointment needed!
        </h3>
        <p className="text-[#345460]/70 text-sm mb-4">
          Just walk in during business hours. We carry premium food, treats,
          toys, enrichment puzzles, leashes, and more.
        </p>
        <div className="space-y-2 text-sm text-[#345460]/70">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#48D597]" />
            <span>
              <strong>Mon–Fri:</strong> 7:00 AM – 6:00 PM
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#48D597]" />
            <span>
              <strong>Sat–Sun:</strong> 9:00 AM – 5:00 PM
            </span>
          </div>

        </div>
      </div>

      <Button
        className="w-full bg-[#48D597] hover:bg-[#3bc085] text-[#345460] font-bold h-12"
        asChild
      >
        <a
          href="https://maps.google.com/?q=Metro+Mutts+Tulsa"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get Directions
          <ExternalLink className="w-4 h-4 ml-2" />
        </a>
      </Button>
    </motion.div>
  );
}

/* ─── Helpers ─── */
function getRedirectTitle(service: Service | null) {
  switch (service) {
    case "store":
      return "Visit Our Store";
    default:
      return "Almost there!";
  }
}
