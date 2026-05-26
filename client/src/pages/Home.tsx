/*
 * Metro Mutts Home Page
 * Design: Vibrant Contemporary — "Pawsitive Energy"
 * Teal (#0891B2) primary, Amber (#F59E0B) accent, Navy text
 * Plus Jakarta Sans typography, wave dividers, animated sections
 */
import Navbar from "@/components/Navbar";
import PageSEO from "@/components/PageSEO";
import HeroSection from "@/components/HeroSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import ServicesSection from "@/components/ServicesSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import AboutSection from "@/components/AboutSection";
import FounderSpotlight from "@/components/FounderSpotlight";
import InstagramFeed from "@/components/InstagramFeed";
import FirstVisitSection from "@/components/FirstVisitSection";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageSEO
        title="Metro Mutts | Dog Boarding, Grooming & Daycare in Tulsa, OK"
        description="Metro Mutts offers luxury dog boarding, professional grooming, and supervised daycare in Tulsa, Oklahoma. 7,000+ sq ft facility with 4K of turfed play space. First day free! Call 539-867-3841."
        canonical="https://www.metromutts.com"
      />
      <Navbar />
      <main>
        <HeroSection />
        <WhyChooseSection />
        <FirstVisitSection />
        <ServicesSection />
        <StatsSection />
        <TestimonialsSection />
        <AboutSection />
        <InstagramFeed />
        <FounderSpotlight />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
