/*
 * Metro Mutts — "Get Started" New Customer Onboarding Page
 * A dedicated landing page that walks new customers through:
 * 1. Creating a Gingr account
 * 2. Understanding the free temperament test day (first daycare day)
 * 3. Service prerequisites (boarding requires 1 day of daycare first, grooming has no prereqs)
 * Brand: Green #48D597, Dark #345460, Accent #FB923C
 */
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import {
  ArrowRight,
  MessageCircle,
  Phone,
  ExternalLink,
  UserPlus,
  PawPrint,
  CalendarCheck,
  CheckCircle2,
  Scissors,
  Moon,
  Sun,
  Shield,
  Syringe,
  Clock,
  Star,
  Sparkles,
  Info,
  AlertCircle,
} from "lucide-react";

const GINGR_NEW_CUSTOMER_URL =
  "https://metromutts.portal.gingrapp.com/public/new_customer";
const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/vet-referred-facility-v3-DCNGQE4pnuuDpVkZkPVYMQ.webp";

/* ─── Animation Variants ─── */
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/* ─── Service Unlock Path Data ─── */
const servicePaths = [
  {
    service: "Daycare",
    icon: Sun,
    color: "bg-amber-50 text-amber-500 border-amber-100",
    iconBg: "bg-amber-100",
    prerequisite: "None — start here!",
    description:
      "Your dog’s free first daycare day is their temperament assessment. During at least five hours of supervised daycare, we observe play style, energy level, and social behavior.",
    steps: [
      "Create your Gingr account",
      "Add your dog's profile + vaccination records",
      "Request your free first daycare day",
      "Our team confirms the visit and evaluates your dog during supervised daycare",
      "Once approved, request future daycare visits",
    ],
    badge: "FREE FIRST DAY",
    badgeColor: "bg-[#48D597] text-[#345460]",
  },
  {
    service: "Boarding",
    icon: Moon,
    color: "bg-sky-50 text-sky-500 border-sky-100",
    iconBg: "bg-sky-100",
    prerequisite: "Free daycare assessment required first",
    description:
      "New boarding dogs must first complete and pass their free daycare assessment day. Once approved, submit your requested boarding dates and our team will confirm availability.",
    steps: [
      "Complete and pass your free first daycare day",
      "Create your account and submit your requested boarding dates",
      "Our team confirms availability",
    ],
    badge: "AFTER DAYCARE APPROVAL",
    badgeColor: "bg-sky-100 text-sky-600",
  },
  {
    service: "Grooming / Spa",
    icon: Scissors,
    color: "bg-purple-50 text-purple-500 border-purple-100",
    iconBg: "bg-purple-100",
    prerequisite: "No daycare assessment required",
    description:
      "Grooming does not require a daycare assessment and may be requested at any time. Create your account, add your dog's information, and submit a requested date.",
    steps: [
      "Create your Gingr account",
      "Add your dog's profile",
      "Submit your requested grooming date",
      "Our team confirms availability",
    ],
    badge: "BOOK ANYTIME",
    badgeColor: "bg-purple-100 text-purple-600",
  },
];

/* ─── Account Setup Steps ─── */
const accountSteps = [
  {
    number: "1",
    icon: UserPlus,
    title: "Create Your Account",
    description:
      "Click the button below to open our booking portal. Enter your name, email, phone number, and create a password.",
    time: "~2 minutes",
  },
  {
    number: "2",
    icon: PawPrint,
    title: "Add Your Dog",
    description:
      "Enter your dog's name, breed, age, weight, and any special needs. You can add multiple dogs if you have more than one.",
    time: "~3 minutes",
  },
  {
    number: "3",
    icon: Syringe,
    title: "Upload Vaccinations",
    description:
      "For dogs 6 months and older, upload current vaccination records. You can take a photo of the records from your vet.",
    time: "~2 minutes",
  },
  {
    number: "4",
    icon: CalendarCheck,
    title: "Request Your Free First Day",
    description:
      "Request your free first daycare day. Metro Mutts confirms the visit and evaluates your dog during supervised daycare.",
    time: "Staff confirmation required",
  },
];

/* ─── Vaccination Requirements ─── */
const vaccinations = [
  { name: "Dogs 6 months and older", note: "Current records required" },
];

export default function GetStarted() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageSEO
        title="Get Started | New Customer Sign-Up | Metro Mutts Tulsa"
        description="Book your dog’s first free daycare visit at Metro Mutts in Tulsa. Create an account, upload vaccination records, and submit your requested date for team confirmation."
        canonical="https://metromutts.com/get-started"
      />
      <Navbar />

      {/* ─── Hero ─── */}
      <section className="relative h-[440px] sm:h-[400px] lg:h-[480px] overflow-hidden">
        <img
          src={HERO_IMG}
          alt="Dogs playing at Metro Mutts facility"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#345460]/90 via-[#345460]/80 to-[#345460]/50" />
        <div className="relative container h-full flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#48D597]/20 text-[#48D597] text-sm font-bold mb-5 backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              New Customers
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 leading-tight">
              Book Your Dog&apos;s{" "}
              <span className="text-[#48D597]">First Visit</span>
            </h1>
            <p className="text-white/75 text-lg lg:text-xl leading-relaxed mb-8 max-w-xl">
              Create an account, add your dog, upload vaccination records when applicable,
              and request a free first daycare day. Our team confirms the visit
              and evaluates your dog during supervised daycare.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-[#48D597] hover:bg-[#3bc085] text-[#345460] font-bold text-base px-8 h-13 shadow-xl shadow-black/15 transition-all hover:-translate-y-0.5"
                asChild
              >
                <a
                  href={GINGR_NEW_CUSTOMER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Create Your Account
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <a
                href="tel:5398673841"
                className="inline-flex h-13 items-center rounded-md border border-white/30 bg-transparent px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call 539-867-3841
              </a>
              <a
                href="sms:19183597727?&body=Hi!%20I%27d%20like%20to%20request%20my%20dog%27s%20first%20visit."
                className="inline-flex h-13 items-center rounded-md border border-white/30 bg-transparent px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Text 918-359-7727
              </a>
            </div>
            <a
              href="/customer-login"
              className="mt-4 inline-block text-sm font-semibold text-white/75 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white"
            >
              Already a customer? Log in
            </a>
          </motion.div>
        </div>
      </section>

      <main className="flex-1">
        {/* ─── How the Process Works ─── */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container">
            <motion.div
              className="text-center mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block text-sm font-bold text-[#48D597] tracking-widest uppercase mb-3">
                Step by Step
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#345460] tracking-tight mb-4">
                Your First Visit, Step by Step
              </h2>
              <p className="text-[#345460]/60 text-lg max-w-2xl mx-auto">
                Four clear steps for your dog&apos;s first day with Metro Mutts.
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {accountSteps.map((step) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.number}
                    variants={fadeUp}
                    className="relative group"
                  >
                    <div className="bg-white rounded-2xl border border-gray-100 p-7 h-full shadow-sm hover:shadow-xl hover:shadow-black/5 transition-all duration-300 hover:-translate-y-1">
                      <span className="absolute top-4 right-5 text-6xl font-extrabold text-gray-50 select-none group-hover:text-[#48D597]/10 transition-colors">
                        {step.number}
                      </span>
                      <div className="w-12 h-12 rounded-xl bg-[#48D597]/10 text-[#48D597] flex items-center justify-center mb-5">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-[#345460] mb-2">
                        {step.title}
                      </h3>
                      <p className="text-[#345460]/60 text-sm leading-relaxed mb-4">
                        {step.description}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#48D597]">
                        <Clock className="w-3.5 h-3.5" />
                        {step.time}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* CTA after steps */}
            <motion.div
              className="text-center mt-10"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button
                size="lg"
                className="bg-[#48D597] hover:bg-[#3bc085] text-[#345460] font-bold text-base px-10 h-13 shadow-lg shadow-[#48D597]/20"
                asChild
              >
                <a
                  href={GINGR_NEW_CUSTOMER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Create Your Account
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* ─── Service Paths: What's Required for Each Service ─── */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="container">
            <motion.div
              className="text-center mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block text-sm font-bold text-[#FB923C] tracking-widest uppercase mb-3">
                Important
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#345460] tracking-tight mb-4">
                How to Unlock Each Service
              </h2>
              <p className="text-[#345460]/60 text-lg max-w-2xl mx-auto">
                Different services have different requirements. Here's the path
                for each one so you know exactly what to expect.
              </p>
            </motion.div>

            <motion.div
              className="grid lg:grid-cols-3 gap-8"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {servicePaths.map((path) => {
                const Icon = path.icon;
                return (
                  <motion.div
                    key={path.service}
                    variants={fadeUp}
                    className={`rounded-2xl border p-8 ${path.color} relative overflow-hidden`}
                  >
                    {/* Badge */}
                    <span
                      className={`absolute top-4 right-4 text-[10px] font-extrabold tracking-wider px-3 py-1 rounded-full ${path.badgeColor}`}
                    >
                      {path.badge}
                    </span>

                    <div
                      className={`w-14 h-14 rounded-2xl ${path.iconBg} flex items-center justify-center mb-5`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>

                    <h3 className="text-xl font-extrabold text-[#345460] mb-2">
                      {path.service}
                    </h3>
                    <p className="text-sm font-semibold text-[#345460]/50 mb-4 flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5" />
                      {path.prerequisite}
                    </p>
                    <p className="text-[#345460]/65 text-sm leading-relaxed mb-5">
                      {path.description}
                    </p>

                    {/* Steps checklist */}
                    <div className="space-y-2.5">
                      {path.steps.map((step, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 text-sm text-[#345460]/70"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#48D597] mt-0.5 shrink-0" />
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ─── The Temperament Test Explained ─── */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block text-sm font-bold text-[#48D597] tracking-widest uppercase mb-3">
                  Your Free First Day
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#345460] tracking-tight mb-4">
                  Your Free First Day Is the Assessment
                </h2>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-[#48D597]/5 to-[#48D597]/10 rounded-3xl border border-[#48D597]/20 p-8 lg:p-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-[#345460] mb-4">
                      One day, one purpose
                    </h3>
                    <p className="text-[#345460]/65 text-sm leading-relaxed mb-4">
                      Your dog comes in for a complimentary full day of daycare,
                      and our trained staff evaluates
                      behavior, play style, and interactions during at least five
                      hours of supervised care.
                    </p>
                    <p className="text-[#345460]/65 text-sm leading-relaxed mb-4">
                      We're looking at things like: Are they comfortable in a
                      group? Do they play well with others? What energy level
                      group are they best suited for? This helps us give your dog
                      the best possible experience every time they visit.
                    </p>
                    <p className="text-[#345460]/65 text-sm leading-relaxed">
                      Submit a requested date and our team will confirm the visit.
                      If we have any concerns after the assessment, we&apos;ll talk
                      through the next steps together.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white rounded-xl p-5 shadow-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <Star className="w-5 h-5 text-[#FB923C]" />
                        <span className="font-bold text-[#345460]">
                          100% Free
                        </span>
                      </div>
                      <p className="text-sm text-[#345460]/60">
                        Your first daycare day and temperament assessment are
                        completely on us.
                      </p>
                    </div>
                    <div className="bg-white rounded-xl p-5 shadow-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <Clock className="w-5 h-5 text-sky-500" />
                        <span className="font-bold text-[#345460]">
                          5-Hour Minimum
                        </span>
                      </div>
                      <p className="text-sm text-[#345460]/60">
                        The assessment takes place during at least five hours of
                        supervised daycare, with play, rest, and socialization.
                      </p>
                    </div>
                    <div className="bg-white rounded-xl p-5 shadow-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <Shield className="w-5 h-5 text-[#48D597]" />
                        <span className="font-bold text-[#345460]">
                          Unlocks All Services
                        </span>
                      </div>
                      <p className="text-sm text-[#345460]/60">
                        Once your dog passes, you can book daycare and boarding
                        going forward. Grooming is available anytime.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── Vaccination Requirements ─── */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="container">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block text-sm font-bold text-[#48D597] tracking-widest uppercase mb-3">
                Before You Visit
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#345460] tracking-tight mb-4">
                Vaccination Requirements
              </h2>
              <p className="text-[#345460]/60 text-lg max-w-2xl mx-auto">
                Dogs 6 months and older need current vaccination records. You can
                upload photos of your vet paperwork directly in the portal.
              </p>
            </motion.div>

            <motion.div
              className="max-w-2xl mx-auto"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {vaccinations.map((vax, i) => (
                  <motion.div
                    key={vax.name}
                    variants={fadeUp}
                    className={`flex items-center justify-between px-7 py-5 ${
                      i < vaccinations.length - 1
                        ? "border-b border-gray-50"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#48D597] shrink-0" />
                      <span className="font-semibold text-[#345460]">
                        {vax.name}
                      </span>
                    </div>
                    <span className="text-sm text-[#345460]/50 font-medium">
                      {vax.note}
                    </span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                variants={fadeUp}
                className="mt-6 flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl p-5"
              >
                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-[#345460] mb-1">
                    Don't have records handy?
                  </p>
                  <p className="text-sm text-[#345460]/60">
                    No problem — you can create your account now and upload
                    vaccination records later. For dogs 6 months and older, make
                    sure they’re uploaded before the first visit. Your vet can
                    usually email or fax them to you quickly.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ─── Final CTA ─── */}
        <section className="py-16 lg:py-20 bg-[#345460]">
          <div className="container text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-white/60 text-lg mb-8 max-w-lg mx-auto">
                Create your account, upload vaccination records, and request your
                dog&apos;s free first daycare day. Our team will confirm the visit.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-[#48D597] hover:bg-[#3bc085] text-[#345460] font-bold text-base px-10 h-14 shadow-xl shadow-black/15 transition-all hover:-translate-y-0.5"
                  asChild
                >
                  <a
                    href={GINGR_NEW_CUSTOMER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Create Your Account
                    <ExternalLink className="w-5 h-5 ml-2" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 font-semibold text-base px-8 h-14 bg-transparent"
                  asChild
                >
                  <a href="tel:5398673841">
                    <Phone className="w-5 h-5 mr-2" />
                    Call 539-867-3841
                  </a>
                </Button>
              </div>
              <a
                href="/customer-login"
                className="mt-5 inline-block text-sm font-semibold text-white/75 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white"
              >
                Already a customer? Log in
              </a>
              <p className="text-white/40 text-sm mt-6">
                Questions? Call us anytime — we're happy to walk you through it
                over the phone.
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
