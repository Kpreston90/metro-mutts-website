import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageSEO
        title="Privacy Policy | Metro Mutts"
        description="Metro Mutts Privacy Policy — how we collect, use, and protect your personal information when you use our website and services."
        canonical="https://www.metromutts.com/privacy"
      />
      <Navbar />
      <main className="flex-1 bg-white">
        <div className="container max-w-3xl py-16 lg:py-24">
          <h1 className="text-3xl lg:text-4xl font-bold text-[#345460] mb-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-[#345460]/50 mb-10">
            Last updated: September 16, 2026
          </p>

          <div className="prose prose-slate max-w-none space-y-8 text-[#32302F]/80 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-[#345460] mt-8 mb-3">1. Introduction</h2>
              <p>
                Metro Mutts ("we," "us," or "our") operates the website metromutts.com and provides dog daycare, boarding, and grooming services in Tulsa, Oklahoma. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
              <p>
                By using our website or services, you agree to the collection and use of information in accordance with this policy. If you do not agree with the terms of this policy, please do not access the site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#345460] mt-8 mb-3">2. Information We Collect</h2>
              <h3 className="text-lg font-semibold text-[#345460] mt-5 mb-2">Personal Information</h3>
              <p>We may collect personally identifiable information that you voluntarily provide when you:</p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>Register for an account or book services</li>
                <li>Fill out a contact form or inquiry</li>
                <li>Sign up for our newsletter or promotional communications</li>
                <li>Participate in referral programs or promotions</li>
                <li>Communicate with us via phone, email, or social media</li>
              </ul>
              <p className="mt-3">This information may include:</p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>Name, email address, and phone number</li>
                <li>Mailing address</li>
                <li>Pet information (name, breed, age, medical history, vaccination records)</li>
                <li>Emergency contact details</li>
                <li>Payment information (processed securely through third-party providers)</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#345460] mt-5 mb-2">Automatically Collected Information</h3>
              <p>When you visit our website, we may automatically collect certain information, including:</p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>IP address and browser type</li>
                <li>Device information and operating system</li>
                <li>Pages visited, time spent, and referring URLs</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#345460] mt-8 mb-3">3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>Provide, operate, and maintain our services</li>
                <li>Process bookings, payments, and transactions</li>
                <li>Communicate with you about appointments, services, and updates</li>
                <li>Send promotional materials and newsletters (with your consent)</li>
                <li>Improve our website, services, and customer experience</li>
                <li>Respond to inquiries and provide customer support</li>
                <li>Comply with legal obligations and protect our rights</li>
                <li>Monitor and analyze usage patterns and trends</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#345460] mt-8 mb-3">4. Information Sharing and Disclosure</h2>
              <p>We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:</p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li><strong>Service Providers:</strong> We may share information with third-party vendors who assist us in operating our website and services (e.g., payment processors, booking software, email marketing platforms).</li>
                <li><strong>Legal Requirements:</strong> We may disclose information if required by law, regulation, or legal process.</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
                <li><strong>Safety:</strong> We may share information to protect the safety of our staff, animals in our care, or the public.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#345460] mt-8 mb-3">Optional inquiry attribution</h2>
              <p className="text-[#345460]/70 leading-relaxed mb-4">When you start a new-customer signup on an advertising entry page, we save your email to connect your inquiry to a resulting Gingr account and visit. This does not subscribe you to a mailing list. When you opt in on our inquiry or signup form, we store campaign information and advertising click identifiers with your inquiry to connect it to resulting bookings and measure advertising results. This choice is optional and does not affect your ability to contact or book with us. We retain contact details to respond to your inquiry. Payment cards and booking account credentials remain in Gingr; they are not part of this attribution record. Contact us to request deletion of your inquiry and attribution data.</p>
              <p className="text-[#345460]/70 leading-relaxed mb-4">If you choose optional advertising measurement on the signup form, a successfully saved inquiry can send a Lead event to Meta using the Meta Pixel. The event does not include your email or other form fields. Meta may receive browser and connection information, page information, and advertising cookie identifiers through its tracking technology. A saved inquiry is not a completed Gingr registration or booking. Verified Gingr registrations and payments are not automatically uploaded to advertising platforms by this feature.</p>
              <h2 className="text-xl font-bold text-[#345460] mt-8 mb-3">5. Cookies and Tracking Technologies</h2>
              <p>
                Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors come from. You can control cookie preferences through your browser settings. Disabling cookies may affect certain features of our website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#345460] mt-8 mb-3">6. Data Security</h2>
              <p>
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#345460] mt-8 mb-3">7. Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required or permitted by law. When your information is no longer needed, we will securely delete or anonymize it.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#345460] mt-8 mb-3">8. Your Rights</h2>
              <p>Depending on your location, you may have the following rights regarding your personal information:</p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>Access and receive a copy of your personal data</li>
                <li>Request correction of inaccurate or incomplete data</li>
                <li>Request deletion of your personal data</li>
                <li>Object to or restrict processing of your data</li>
                <li>Withdraw consent at any time (where processing is based on consent)</li>
                <li>Opt out of marketing communications</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, please contact us at info@metromutts.com or call 539-867-3841.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#345460] mt-8 mb-3">9. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites or services (e.g., Gingr booking platform, social media). We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#345460] mt-8 mb-3">10. Children's Privacy</h2>
              <p>
                Our website and services are not directed to individuals under the age of 13. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child under 13, we will take steps to delete that information promptly.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#345460] mt-8 mb-3">11. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last updated" date. We encourage you to review this policy periodically to stay informed about how we protect your information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#345460] mt-8 mb-3">12. Contact Us</h2>
              <p>If you have questions or concerns about this Privacy Policy, please contact us:</p>
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
