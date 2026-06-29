/*
 * Metro Mutts Contact Section
 * Brand: Green #48D597, Dark #345460
 * Two-column layout with contact form, location info, and interactive Google Map
 */
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, ArrowRight, Navigation, MessageCircle } from "lucide-react";
import { useState } from "react";
import { trackFormSubmit, trackPhoneCall } from "@/lib/analytics";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const body = new URLSearchParams({
        "form-name": "contact",
        ...formData,
      });
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      setFormSubmitted(true);
      trackFormSubmit("contact", true);
    } catch {
      setFormSubmitted(true);
      trackFormSubmit("contact", false);
    }
  };

  const handleGetDirections = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=1219+E+13th+St+Tulsa+OK+74120`,
      "_blank"
    );
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[oklch(0.97_0.005_90)] scroll-mt-20">
      <div className="container">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#48D597]/10 text-[#48D597] text-sm font-bold mb-4 tracking-wide uppercase">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#345460] tracking-tight mb-5">
            Visit Us in{" "}
            <span className="text-[#48D597]">Tulsa</span>
          </h2>
          <p className="text-[#345460]/70 text-lg leading-relaxed">
            Come see our facility and schedule a free meet and greet for your pup.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact form */}
          <motion.div
            className="lg:col-span-3 bg-white rounded-3xl p-8 lg:p-10 shadow-xl shadow-black/5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {formSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#48D597]/10 flex items-center justify-center mx-auto mb-4">
                  <ArrowRight className="w-8 h-8 text-[#48D597]" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#345460] mb-2">Thank You!</h3>
                <p className="text-[#345460]/60">We received your message and will be in touch soon.</p>
              </div>
            ) : (<>
            <h3 className="text-2xl font-extrabold text-[#345460] mb-6">
              Schedule a Free Meet & Greet
            </h3>
            <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit} className="space-y-5">
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden"><label>Don't fill this out: <input name="bot-field" /></label></p>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-[#345460] mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-[#345460] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#48D597]/30 focus:border-[#48D597] transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#345460] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-[#345460] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#48D597]/30 focus:border-[#48D597] transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-[#345460] mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-[#345460] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#48D597]/30 focus:border-[#48D597] transition-all"
                    placeholder="(555) 000-0000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#345460] mb-2">
                    Service Interested In
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-[#345460] focus:outline-none focus:ring-2 focus:ring-[#48D597]/30 focus:border-[#48D597] transition-all"
                  >
                    <option value="">Select a service</option>
                    <option value="daycare">Dog Daycare</option>
                    <option value="boarding">Overnight Boarding</option>
                    <option value="grooming">Grooming & Spa</option>
                    <option value="multiple">Multiple Services</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#345460] mb-2">
                  Tell Us About Your Dog
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-[#345460] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#48D597]/30 focus:border-[#48D597] transition-all resize-none"
                  placeholder="Breed, age, any special needs..."
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full bg-[#48D597] hover:bg-[#3bc085] text-[#345460] font-bold text-base h-13 shadow-lg shadow-[#48D597]/20 transition-all hover:-translate-y-0.5"
              >
                Book My Free Visit
                <ArrowRight className="w-5 h-5 ml-1" />
              </Button>
            </form>
            </>)}
          </motion.div>

          {/* Location sidebar */}
          <motion.div
            className="lg:col-span-2 space-y-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {/* Location card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg shadow-black/5 border border-black/5">
              <h4 className="font-extrabold text-lg text-[#345460] mb-4">
                Metro Mutts Tulsa
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-2.5 text-sm text-[#345460]/70">
                  <MapPin className="w-4 h-4 text-[#48D597] mt-0.5 flex-shrink-0" />
                  1219 E 13th St, Tulsa, OK 74120
                </div>
                <div className="flex items-center gap-2.5 text-sm text-[#345460]/70">
                  <Phone className="w-4 h-4 text-[#48D597] flex-shrink-0" />
                  <a href="tel:5398673841" className="hover:text-[#48D597] transition-colors">
                    539-867-3841
                  </a>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-[#345460]/70">
                  <Mail className="w-4 h-4 text-[#48D597] flex-shrink-0" />
                  <a href="mailto:info@metromutts.com" className="hover:text-[#48D597] transition-colors">
                    info@metromutts.com
                  </a>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-[#345460]/70">
                  <Clock className="w-4 h-4 text-[#48D597] mt-0.5 flex-shrink-0" />
                  <div>
                    <div>Mon–Fri: 7:00 AM – 6:00 PM</div>
                    <div>Sat–Sun: 9:00 AM – 5:00 PM</div>
                  </div>
                </div>
              </div>
              {/* Action buttons */}
              <div className="mt-4 space-y-2.5">
                <button
                  onClick={handleGetDirections}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#345460] text-white text-sm font-semibold hover:bg-[#2a4550] transition-colors"
                >
                  <Navigation className="w-4 h-4" />
                  Get Directions
                </button>
                <a
                  href={`sms:5398673841?&body=${encodeURIComponent("Hi! I'd like to book a free trial day for my dog.")}`}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#48D597]/10 text-[#345460] text-sm font-semibold hover:bg-[#48D597]/20 transition-colors border border-[#48D597]/30"
                >
                  <MessageCircle className="w-4 h-4 text-[#48D597]" />
                  Text Us to Book
                </a>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-black/5 border border-black/5">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1611.2!2d-95.9759825!3d36.1445471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87b6ed906adb6ad7%3A0xb3d1639b3985760f!2sMetro%20Mutts!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                className="w-full h-[250px]"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Metro Mutts Location - 1219 E 13th St, Tulsa, OK 74120"
              />
            </div>

            {/* General contact */}
            <div className="bg-[#48D597] rounded-2xl p-6 text-[#345460]">
              <h4 className="font-extrabold text-lg mb-3">Questions?</h4>
              <p className="text-[#345460]/80 text-sm mb-4">
                Give us a call or send an email — we'd love to hear from you!
              </p>
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5 text-sm font-medium">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <a href="tel:5398673841">539-867-3841</a>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-medium">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <a href="mailto:info@metromutts.com">info@metromutts.com</a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
