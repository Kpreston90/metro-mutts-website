import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";

export default function TermsOfService() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageSEO
        title="Terms of Service | Metro Mutts"
        description="Metro Mutts Terms of Service — the terms and conditions governing your use of our website and dog care services."
        canonical="https://www.metromutts.com/terms"
      />
      <Navbar />
      <main className="flex-1 bg-white">
        <div className="container max-w-3xl py-16 lg:py-24">
          <h1 className="text-3xl lg:text-4xl font-bold text-[#345460] mb-2">
            Terms of Service
          </h1>
          <p className="text-sm text-[#345460]/50 mb-10">
            Last updated: May 29, 2026
          </p>

          <div className="prose prose-slate max-w-none space-y-8 text-[#32302F]/80 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-[#345460] mt-8 mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the Metro Mutts website (metromutts.com) and our dog daycare, boarding, and grooming services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#345460] mt-8 mb-3">2. Services</h2>
              <p>
                Metro Mutts provides dog daycare, overnight boarding, and professional grooming services at our facility in Tulsa, Oklahoma. All services are subject to availability and our acceptance policies, including successful completion of a temperament assessment for daycare and boarding services.
              </p>
              <h3 className="text-lg font-semibold text-[#345460] mt-5 mb-2">Hours of Operation</h3>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>Monday – Friday: 7:00 AM – 6:00 PM</li>
                <li>Saturday – Sunday: 9:00 AM – 5:00 PM</li>
              </ul>
              <p className="mt-3">
                Hours may vary on holidays. We will communicate any schedule changes in advance through our website and email communications.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#345460] mt-8 mb-3">3. Eligibility and Requirements</h2>
              <p>To use our services, your dog must:</p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>Be current on all required vaccinations (Rabies, DHPP, Bordetella, and Canine Influenza)</li>
                <li>Be spayed or neutered (required for dogs over 6 months of age)</li>
                <li>Pass a temperament assessment conducted by our staff</li>
                <li>Be free of contagious illness, parasites, or open wounds</li>
                <li>Be at least 12 weeks old with age-appropriate vaccinations</li>
              </ul>
              <p className="mt-3">
                We reserve the right to refuse service to any dog that poses a safety risk to our staff, other dogs, or themselves. This determination is made at our sole discretion.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#345460] mt-8 mb-3">4. Bookings and Cancellations</h2>
              <h3 className="text-lg font-semibold text-[#345460] mt-5 mb-2">Reservations</h3>
              <p>
                Daycare and boarding reservations can be made through our online booking system (Gingr) or by calling 539-867-3841. Grooming appointments are booked by phone. All reservations are subject to availability.
              </p>
              <h3 className="text-lg font-semibold text-[#345460] mt-5 mb-2">Cancellation Policy</h3>
              <p>
                We require at least 24 hours notice for cancellations. Late cancellations or no-shows may be subject to a cancellation fee. Repeated no-shows may result in loss of booking privileges.
              </p>
              <h3 className="text-lg font-semibold text-[#345460] mt-5 mb-2">Late Pick-Up</h3>
              <p>
                Dogs not picked up by closing time may be subject to an overnight boarding charge. We will attempt to contact you and your emergency contact before the end of business hours.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#345460] mt-8 mb-3">5. Payment Terms</h2>
              <p>
                Payment is due at the time of service unless otherwise arranged. We accept major credit cards, debit cards, and other payment methods as indicated at our facility or through our booking system. Prices are subject to change with reasonable notice.
              </p>
              <p>
                Promotional codes and discounts are subject to their specific terms and conditions, including expiration dates and usage limits. Promotions cannot be combined unless explicitly stated.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#345460] mt-8 mb-3">6. Health and Safety</h2>
              <h3 className="text-lg font-semibold text-[#345460] mt-5 mb-2">Illness and Injury</h3>
              <p>
                While we take every precaution to ensure the safety and well-being of all dogs in our care, interactions between dogs carry inherent risks. By using our services, you acknowledge and accept these risks.
              </p>
              <p>
                If your dog becomes ill or injured while in our care, we will attempt to contact you immediately. In the event of an emergency where you cannot be reached, you authorize Metro Mutts to seek veterinary care at your expense.
              </p>
              <h3 className="text-lg font-semibold text-[#345460] mt-5 mb-2">Contagious Illness</h3>
              <p>
                If your dog shows signs of illness (coughing, lethargy, diarrhea, vomiting, etc.), please do not bring them to our facility. Dogs showing signs of illness upon arrival may be refused service. If symptoms develop while in our care, we will isolate your dog and contact you for immediate pick-up.
              </p>
              <h3 className="text-lg font-semibold text-[#345460] mt-5 mb-2">Behavioral Issues</h3>
              <p>
                If your dog exhibits aggressive behavior, excessive anxiety, or other behavioral concerns that pose a risk to staff or other dogs, we reserve the right to separate your dog from group play, contact you for early pick-up, or discontinue services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#345460] mt-8 mb-3">7. Liability and Indemnification</h2>
              <p>
                Metro Mutts maintains appropriate insurance coverage for our operations. However, by using our services, you agree to indemnify and hold harmless Metro Mutts, its owners, employees, and agents from any claims, damages, or expenses arising from:
              </p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>Your dog's behavior, including bites or injuries caused to other dogs, staff, or property</li>
                <li>Pre-existing health conditions that were not disclosed</li>
                <li>Inaccurate or incomplete information provided during registration</li>
                <li>Normal wear and tear on personal items (collars, leashes, etc.)</li>
              </ul>
              <p className="mt-3">
                Our liability for any claim related to our services shall not exceed the fees paid for the specific service giving rise to the claim.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#345460] mt-8 mb-3">8. Grooming Services</h2>
              <p>
                Grooming results may vary based on your dog's coat condition, temperament during the grooming process, and breed characteristics. Our groomers will use their professional judgment to determine the safest and most appropriate grooming approach for your dog.
              </p>
              <p>
                If your dog's coat is severely matted, our groomer may recommend a shorter cut for the health and comfort of your dog. We will communicate this before proceeding when possible. Pre-existing skin conditions may be discovered during grooming — we will inform you of any concerns.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#345460] mt-8 mb-3">9. Photography and Media</h2>
              <p>
                We may photograph or video your dog during their time at our facility for use on our website, social media, and marketing materials. By using our services, you grant Metro Mutts permission to use images and videos of your dog for promotional purposes. If you do not wish your dog to be photographed, please notify us in writing.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#345460] mt-8 mb-3">10. Website Use</h2>
              <p>You agree not to:</p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>Use our website for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to our systems or data</li>
                <li>Interfere with or disrupt the website's functionality</li>
                <li>Reproduce, distribute, or modify any content without our written permission</li>
                <li>Use automated systems (bots, scrapers) to access our website</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#345460] mt-8 mb-3">11. Intellectual Property</h2>
              <p>
                All content on the Metro Mutts website — including text, graphics, logos, images, and software — is the property of Metro Mutts and is protected by copyright and trademark laws. You may not use, reproduce, or distribute any content from our website without our prior written consent.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#345460] mt-8 mb-3">12. Referral Program</h2>
              <p>
                Our referral program allows existing customers to refer new customers in exchange for service credits or discounts. Referral rewards are subject to the specific terms of the active promotion and may be modified or discontinued at any time. Referral credits have no cash value and cannot be transferred.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#345460] mt-8 mb-3">13. Modifications to Terms</h2>
              <p>
                We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services after any changes constitutes acceptance of the modified terms. We encourage you to review these terms periodically.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#345460] mt-8 mb-3">14. Governing Law</h2>
              <p>
                These Terms of Service are governed by and construed in accordance with the laws of the State of Oklahoma. Any disputes arising from these terms or your use of our services shall be resolved in the courts of Tulsa County, Oklahoma.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#345460] mt-8 mb-3">15. Severability</h2>
              <p>
                If any provision of these Terms of Service is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#345460] mt-8 mb-3">16. Contact Us</h2>
              <p>If you have questions about these Terms of Service, please contact us:</p>
              <ul className="list-none pl-0 space-y-1.5 mt-3">
                <li><strong>Metro Mutts</strong></li>
                <li>Tulsa, Oklahoma</li>
                <li>Phone: <a href="tel:5398673841" className="text-[#48D597] hover:underline">539-867-3841</a></li>
                <li>Email: <a href="mailto:info@metromutts.com" className="text-[#48D597] hover:underline">info@metromutts.com</a></li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
