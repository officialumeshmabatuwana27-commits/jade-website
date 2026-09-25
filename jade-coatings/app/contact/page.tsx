import type { Metadata } from "next";
import { MapPin, Phone, MessageSquare, Mail, Clock } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with JADE Coatings via WhatsApp, email, or phone. Request product specifications, quotes, or find our office in Biyagama, Sri Lanka.",
};

const contactDetails = [
  {
    icon: MapPin,
    label: "Office Address",
    lines: ["424/1/B, Kottunna Rd,", "Biyagama, Sri Lanka"],
  },
  {
    icon: Phone,
    label: "Direct Telephone",
    lines: ["077 377 4340", "011 287 2591"],
    links: ["tel:+94773774340", "tel:+94112872591"],
  },
  {
    icon: MessageSquare,
    label: "WhatsApp Direct",
    lines: ["077 377 4340", "Click to text right away"],
    links: ["https://wa.me/94773774340", "https://wa.me/94773774340"],
  },
  {
    icon: Mail,
    label: "Email Address",
    lines: ["info@colourmax.lk"],
    links: ["mailto:info@colourmax.lk"],
  },
  {
    icon: Clock,
    label: "Business Hours",
    lines: ["Mon – Fri: 8:30 AM – 5:30 PM", "Sat: 8:30 AM – 1:00 PM"],
  },
];

export default function ContactPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 bg-jade-gradient overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-jade-400/20 border border-jade-400/30 text-jade-200 text-xs font-semibold uppercase tracking-widest mb-5">
            Get In Touch
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-jade-200 text-base max-w-xl mx-auto">
            Have a project in mind? Need product information or a quote? Our
            team is ready to help.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info (left) */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-charcoal mb-2">
                  We&apos;d Love to Hear from You
                </h2>
                <p className="text-charcoal/60 text-sm leading-relaxed">
                  Whether you&apos;re looking for product samples, bulk quotes,
                  or technical data sheets — our team is just a message away.
                </p>
              </div>

              {/* Details */}
              <div className="space-y-5">
                {contactDetails.map((detail) => {
                  const Icon = detail.icon;
                  return (
                    <div
                      key={detail.label}
                      className="flex gap-4 p-4 bg-jade-pale rounded-2xl"
                    >
                      <div className="w-10 h-10 rounded-xl bg-jade-500 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-charcoal/50 uppercase tracking-wide mb-1">
                          {detail.label}
                        </p>
                        {detail.lines.map((line, i) =>
                          detail.links?.[i] ? (
                            <a
                              key={i}
                              href={detail.links[i]}
                              target={detail.links[i].startsWith("http") ? "_blank" : undefined}
                              rel={detail.links[i].startsWith("http") ? "noopener noreferrer" : undefined}
                              className="block text-sm text-charcoal hover:text-jade-500 transition-colors"
                            >
                              {line}
                            </a>
                          ) : (
                            <p key={i} className="text-sm text-charcoal">
                              {line}
                            </p>
                          )
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Map embed */}
              <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm h-56">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.2!2d79.9!3d6.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zBsKwNTcnMDAuMCJOIDc5wrA1NCcwMC4wIkU!5e0!3m2!1sen!2slk!4v1!5m2!1sen!2slk"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="JADE Coatings Office Location"
                />
              </div>
            </div>

            {/* Contact Form (right) */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                <div className="mb-8">
                  <h2 className="font-display text-2xl font-bold text-charcoal mb-2">
                    Text on WhatsApp or Send Inquiry
                  </h2>
                  <p className="text-charcoal/55 text-sm">
                    Click the button below to message our technical advisory team directly on WhatsApp right away.
                  </p>
                </div>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom feature strips */}
      <section className="py-12 bg-jade-pale border-t border-jade-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              {
                emoji: "⚡",
                title: "Fast Response",
                desc: "We reply to all inquiries within 24 business hours.",
              },
              {
                emoji: "🧪",
                title: "Free Samples",
                desc: "Request product samples for your specific project requirements.",
              },
              {
                emoji: "📋",
                title: "Technical Support",
                desc: "Our experts provide full technical guidance and application advice.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm border border-jade-100">
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="font-semibold text-charcoal mb-2">{item.title}</h3>
                <p className="text-charcoal/55 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
