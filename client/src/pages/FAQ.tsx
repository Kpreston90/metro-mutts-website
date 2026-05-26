/*
 * Metro Mutts FAQ Page
 * Brand: Green #48D597, Dark #345460
 * Accordion-style FAQ covering vaccination, hours, first visit, policies
 * Designed to reduce phone volume and boost SEO
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import {
  ChevronDown,
  Phone,
  ArrowRight,
  Shield,
  Clock,
  Dog,
  Syringe,
  CalendarCheck,
  HelpCircle,
  Scissors,
  Moon,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trackPhoneCall } from "@/lib/analytics";
import { useBookingModal } from "@/contexts/BookingModalContext";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  icon: React.ElementType;
  color: string;
  items: FAQItem[];
}

const faqCategories: FAQCategory[] = [
  {
    title: "First Visit & Getting Started",
    icon: Dog,
    color: "#48D597",
    items: [
      {
        question: "What do I need to bring for my dog's first visit?",
        answer:
          "For the first visit, please bring proof of up-to-date vaccinations (Rabies, DHPP/Distemper, and Bordetella), your dog's food if they have a special diet, and any medications they may need. We'll handle the rest — including a temperament assessment to find the perfect play group for your pup.",
      },
      {
        question: "Is there a temperament assessment?",
        answer:
          "Yes! Every new dog goes through a complimentary temperament assessment on their first visit. This helps us understand your dog's play style, energy level, and social preferences so we can match them with the right group. The assessment typically takes about 30 minutes and is included with your free trial day.",
      },
      {
        question: "Is the first day really free?",
        answer:
          "Absolutely! Your dog's first day of daycare is completely free — no strings attached. It's our way of letting you and your pup try us out with zero risk. Just call us at 539-867-3841 or book online to schedule your free trial day.",
      },
      {
        question: "What age does my dog need to be?",
        answer:
          "Dogs must be at least 12 weeks old and have started their vaccination series. Puppies are welcome as long as they meet the vaccination requirements. We have separate play areas for different sizes and energy levels, so even young pups get appropriate socialization.",
      },
      {
        question: "Do you accept all breeds?",
        answer:
          "Yes! We welcome all breeds, shapes, and sizes at Metro Mutts. We don't discriminate based on breed. Every dog is evaluated individually during their temperament assessment, and we group dogs by size, play style, and energy level to ensure everyone has a safe, fun experience.",
      },
    ],
  },
  {
    title: "Vaccination Requirements",
    icon: Syringe,
    color: "#3b82f6",
    items: [
      {
        question: "What vaccinations are required?",
        answer:
          "All dogs must be current on three core vaccinations: Rabies, DHPP (Distemper, Hepatitis, Parainfluenza, Parvovirus), and Bordetella (kennel cough). We also strongly recommend the Canine Influenza vaccine. Proof of vaccination from your vet must be provided before your dog's first visit.",
      },
      {
        question: "Does my dog need the Canine Influenza vaccine?",
        answer:
          "While not currently required, we strongly recommend the Canine Influenza (CIV H3N2) vaccine for all dogs attending daycare or boarding. Dogs in group settings have higher exposure risk. Talk to your vet about adding this to your dog's vaccination schedule.",
      },
      {
        question: "Can I send vaccination records digitally?",
        answer:
          "Yes! You can email vaccination records directly from your vet's office, or snap a photo and text them to us at 539-867-3841. We'll verify everything before your dog's first visit so check-in is smooth and quick.",
      },
      {
        question: "Does my dog need to be spayed or neutered?",
        answer:
          "Dogs over 7 months of age must be spayed or neutered to attend daycare and boarding. This helps maintain a safe, calm environment for all dogs in our care. Puppies under 7 months are welcome while they're still waiting for their procedure.",
      },
    ],
  },
  {
    title: "Daycare",
    icon: Clock,
    color: "#f59e0b",
    items: [
      {
        question: "What are your daycare hours?",
        answer:
          "Our daycare operates Monday through Friday, 7:00 AM to 6:00 PM, and Saturday & Sunday 9:00 AM to 5:00 PM. Drop-off is available anytime during operating hours, and we ask that all pups be picked up by closing time. Late pick-ups may incur an additional fee.",
      },
      {
        question: "What does a typical day look like?",
        answer:
          "Your dog's day includes structured play sessions with dogs matched by size and temperament, supervised rest periods (because even the most energetic pups need a nap!), fresh water available at all times, and outdoor potty breaks throughout the day. We rotate between active play, enrichment activities, and rest to keep every dog happy and balanced.",
      },
      {
        question: "How are dogs grouped for play?",
        answer:
          "Dogs are grouped by size, energy level, and play style — not just breed. Our staff continuously monitors play groups and adjusts as needed. We have separate areas for small dogs, large dogs, and puppies to ensure everyone plays safely and has fun.",
      },
      {
        question: "What if my dog doesn't do well in group play?",
        answer:
          "Not every dog is a social butterfly, and that's okay! If your dog is shy or needs a slower introduction, our team will work with them at their own pace. We offer one-on-one attention and gradual introductions. If group daycare truly isn't the right fit, we'll be honest with you and discuss alternatives.",
      },
    ],
  },
  {
    title: "Boarding",
    icon: Moon,
    color: "#8b5cf6",
    items: [
      {
        question: "What's included in overnight boarding?",
        answer:
          "Boarding at Metro Mutts includes a private suite, full days of daycare play, feeding (bring your dog's food or we can provide premium kibble), bedtime potty breaks, and nighttime check-ins by our staff. We also send photo updates so you can see your pup having a great time while you're away.",
      },
      {
        question: "How much does boarding cost?",
        answer:
          "Boarding is $50 per night, which includes everything — private suite, full daycare play during the day, feeding, and overnight supervision. Multi-night stays and frequent boarders may qualify for package discounts. Call us at 539-867-3841 for current specials.",
      },
      {
        question: "Can I bring my dog's own bed, toys, or food?",
        answer:
          "Absolutely! We encourage you to bring your dog's regular food to maintain their diet routine. You're welcome to bring a favorite toy or blanket for comfort, though please label everything with your dog's name. We provide cozy bedding in every suite as well.",
      },
      {
        question: "What if my dog needs medication during their stay?",
        answer:
          "We're happy to administer medications during your dog's boarding stay at no extra charge. Just bring the medication in its original packaging with clear dosing instructions from your vet. Our staff is experienced in administering pills, liquids, and topical medications.",
      },
    ],
  },
  {
    title: "Grooming",
    icon: Scissors,
    color: "#ec4899",
    items: [
      {
        question: "What grooming services do you offer?",
        answer:
          "Our groomer Jacque offers full-service grooming including baths, haircuts, nail trims, ear cleaning, teeth brushing, de-shedding treatments, and breed-specific styling. We also offer à la carte services if your pup just needs a quick nail trim or bath. Check out our Grooming Gallery to see Jacque's work!",
      },
      {
        question: "How much does grooming cost?",
        answer:
          "Grooming starts at $30 for basic services like bath and nail trim. Full grooming packages vary based on your dog's size, coat type, and the services requested. We'll give you an exact quote when you book. Call 539-867-3841 or book online for pricing specific to your pup.",
      },
      {
        question: "How often should my dog be groomed?",
        answer:
          "It depends on the breed and coat type. Most dogs benefit from professional grooming every 4-6 weeks. Dogs with longer or thicker coats may need more frequent visits, while short-haired breeds can go a bit longer. Jacque can recommend the ideal schedule for your dog during their first appointment.",
      },
      {
        question: "Can my dog do daycare and grooming on the same day?",
        answer:
          "Yes! Many of our clients combine daycare and grooming in a single visit. Drop your dog off for daycare in the morning, and we'll work in their grooming appointment during the day. They'll be fresh, clean, and tired when you pick them up — the best combo!",
      },
    ],
  },
  {
    title: "Pricing & Policies",
    icon: CreditCard,
    color: "#06b6d4",
    items: [
      {
        question: "What are your pricing options?",
        answer:
          "We offer flexible pricing: single-day daycare passes, multi-day packages (5, 10, and 20-day packs at discounted rates), and monthly unlimited plans. Boarding is $50/night. Grooming starts at $30. Visit our Pricing page for full details, or call us for current package specials.",
      },
      {
        question: "What is your cancellation policy?",
        answer:
          "We ask for at least 24 hours' notice for daycare and grooming cancellations. Boarding reservations require 48 hours' notice for cancellation. Late cancellations or no-shows may be charged a fee. We understand life happens — just give us a call as soon as you know your plans have changed.",
      },
      {
        question: "Do you offer multi-dog discounts?",
        answer:
          "Yes! Families with multiple dogs receive a discount on daycare packages. The second dog from the same household gets a reduced rate. Contact us for specific multi-dog pricing — we love seeing siblings play together!",
      },
      {
        question: "What forms of payment do you accept?",
        answer:
          "We accept all major credit and debit cards, as well as cash. Daycare packages and monthly plans can be set up with automatic recurring payments for convenience.",
      },
    ],
  },
];

function FAQAccordion({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 px-1 text-left group transition-colors hover:text-[#48D597]"
      >
        <span className="text-base font-semibold text-[#345460] group-hover:text-[#48D597] transition-colors pr-4">
          {item.question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-[#345460]/40 shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-[#48D597]" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 px-1 text-[#345460]/70 leading-relaxed text-[15px]">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const { openBookingModal } = useBookingModal();
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafbf9]">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative bg-[#345460] overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-[#48D597] blur-3xl" />
            <div className="absolute bottom-10 right-20 w-60 h-60 rounded-full bg-[#48D597] blur-3xl" />
          </div>
          <div className="relative container py-20 lg:py-28 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#48D597]/15 text-[#48D597] text-sm font-semibold mb-6 border border-[#48D597]/25">
                <HelpCircle className="w-4 h-4" />
                We're Here to Help
              </span>
            </motion.div>
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Frequently Asked{" "}
              <span className="text-[#48D597]">Questions</span>
            </motion.h1>
            <motion.p
              className="text-lg text-white/75 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Everything you need to know about Metro Mutts. Can't find your answer?
              Give us a call — we love talking dogs.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <a
                href="tel:5398673841"
                className="inline-flex items-center gap-2 text-[#48D597] font-semibold hover:text-white transition-colors"
                onClick={() => trackPhoneCall("faq_hero")}
              >
                <Phone className="w-5 h-5" />
                539-867-3841
              </a>
            </motion.div>
          </div>
          {/* Wave divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" preserveAspectRatio="none">
              <path d="M0 30L60 25C120 20 240 10 360 8C480 6 600 12 720 20C840 28 960 38 1080 40C1200 42 1320 36 1380 33L1440 30V60H0V30Z" fill="#fafbf9" />
            </svg>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-4xl">
            {/* Quick jump nav */}
            <motion.div
              className="flex flex-wrap justify-center gap-2 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {faqCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.title}
                    onClick={() => {
                      document
                        .getElementById(cat.title.toLowerCase().replace(/[^a-z]+/g, "-"))
                        ?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-[#345460]/70 bg-white border border-gray-200 hover:border-[#48D597] hover:text-[#48D597] hover:shadow-md transition-all"
                  >
                    <Icon className="w-4 h-4" style={{ color: cat.color }} />
                    {cat.title}
                  </button>
                );
              })}
            </motion.div>

            {/* Category sections */}
            <div className="space-y-12">
              {faqCategories.map((cat, catIdx) => {
                const Icon = cat.icon;
                return (
                  <motion.div
                    key={cat.title}
                    id={cat.title.toLowerCase().replace(/[^a-z]+/g, "-")}
                    className="scroll-mt-28"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: catIdx * 0.05 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${cat.color}15` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: cat.color }} />
                      </div>
                      <h2 className="text-2xl font-bold text-[#345460]">{cat.title}</h2>
                    </div>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 lg:px-8">
                      {cat.items.map((item, itemIdx) => {
                        const key = `${catIdx}-${itemIdx}`;
                        return (
                          <FAQAccordion
                            key={key}
                            item={item}
                            isOpen={!!openItems[key]}
                            onToggle={() => toggleItem(key)}
                          />
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Still have questions CTA */}
        <section className="py-16 lg:py-20 bg-[#345460]">
          <div className="container text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">
                Still Have Questions?
              </h2>
              <p className="text-white/70 text-lg max-w-xl mx-auto mb-8">
                We're happy to help! Give us a call or book a free trial day to see Metro Mutts in person.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-[#48D597] hover:bg-[#3bc085] text-[#345460] font-bold text-base px-8 h-13 shadow-xl shadow-[#48D597]/25"
                  onClick={openBookingModal}
                >
                  Book a Free Visit
                  <ArrowRight className="w-5 h-5 ml-1" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 font-semibold text-base px-8 h-13 bg-transparent"
                  asChild
                >
                  <a href="tel:5398673841" onClick={() => trackPhoneCall("faq_bottom_cta")}>
                    <Phone className="w-5 h-5 mr-2" />
                    Call 539-867-3841
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
