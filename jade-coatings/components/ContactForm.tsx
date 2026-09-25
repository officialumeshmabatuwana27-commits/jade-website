"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle, MessageCircle, ExternalLink } from "lucide-react";

interface FormState {
  name: string;
  contact: string;
  subject: string;
  message: string;
}

type Status = "idle" | "success" | "error";

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
    </svg>
  );
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    contact: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [responseMsg, setResponseMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.message.trim()) {
      setStatus("error");
      setResponseMsg("Please enter your name and message.");
      return;
    }

    // Build formatted message for WhatsApp
    const waText = 
      `*New Inquiry - JADE Coatings*\n` +
      `━━━━━━━━━━━━━━━━━━\n` +
      `👤 *Name:* ${form.name.trim()}\n` +
      `📞 *Contact:* ${form.contact.trim() || "Not specified"}\n` +
      `📋 *Subject:* ${form.subject.trim() || "General Inquiry"}\n` +
      `💬 *Message:*\n${form.message.trim()}\n` +
      `━━━━━━━━━━━━━━━━━━\n` +
      `_Sent from jadecoatings.lk_`;

    const waUrl = `https://wa.me/94773774340?text=${encodeURIComponent(waText)}`;

    // Open WhatsApp right away
    window.open(waUrl, "_blank", "noopener,noreferrer");

    // Also persist inquiry in background
    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.contact.includes("@") ? form.contact : "info@colourmax.lk",
        subject: form.subject || "WhatsApp Inquiry",
        message: `${form.message}\n(Provided Contact: ${form.contact})`,
      }),
    }).catch(() => {});

    setStatus("success");
    setResponseMsg("WhatsApp opened! You can now text our technical team directly.");
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20 outline-none transition-all text-charcoal text-sm bg-white placeholder:text-charcoal/30";
  const labelClass = "block text-sm font-medium text-charcoal/70 mb-2";

  return (
    <div className="space-y-6">
      {/* Instant 1-Click WhatsApp Direct Chat Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#EBF8F2] border border-[#25D366]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#25D366] text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-[#25D366]/30">
            <WhatsAppIcon className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-sm sm:text-base text-charcoal">
              Need Fast Answers? Text Us on WhatsApp
            </h4>
            <p className="text-xs text-charcoal/60">
              Direct hotline: <span className="font-semibold text-charcoal">077 377 4340</span> · Available Mon–Sat
            </p>
          </div>
        </div>
        <a
          href="https://wa.me/94773774340?text=Hello%20JADE%20Coatings%2C%20I%20would%20like%20to%20inquire%20about%20your%20products."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#25D366]/25 hover:scale-[1.02] transition-all shrink-0"
        >
          <WhatsAppIcon className="w-4 h-4" />
          <span>Chat Right Away</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="relative flex py-1 items-center">
        <div className="flex-grow border-t border-gray-200"></div>
        <span className="flex-shrink mx-4 text-xs uppercase font-bold tracking-wider text-charcoal/40">
          Or Send Structured Inquiry via WhatsApp
        </span>
        <div className="flex-grow border-t border-gray-200"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name & Contact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className={labelClass}>
              Full Name <span className="text-red-400">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="e.g. Kasun Perera"
              value={form.name}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="contact" className={labelClass}>
              Contact Number or Email <span className="text-red-400">*</span>
            </label>
            <input
              id="contact"
              name="contact"
              type="text"
              required
              placeholder="077 123 4567 or email"
              value={form.contact}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className={labelClass}>
            Subject / Project Type <span className="text-red-400">*</span>
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            placeholder="e.g. Quotation for Woodshield Wood Stain / Resort Project"
            value={form.subject}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className={labelClass}>
            Message / Requirements <span className="text-red-400">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            placeholder="Detail your wooden/masonry surface, approximate square footage, or specific requirement..."
            value={form.message}
            onChange={handleChange}
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Status message */}
        {status === "success" && (
          <div className="flex items-start gap-3 p-4 rounded-xl bg-[#EBF8F2] border border-[#25D366]/40 text-[#074626]">
            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#25D366]" />
            <div className="text-sm">
              <p className="font-semibold">{responseMsg}</p>
              <p className="text-xs text-charcoal/70 mt-0.5">
                If the chat window didn't open automatically,{" "}
                <a
                  href={`https://wa.me/94773774340?text=${encodeURIComponent(
                    `Hello JADE Coatings, I would like to inquire:\nName: ${form.name}\nContact: ${form.contact}\nSubject: ${form.subject}\nMessage: ${form.message}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-bold text-[#074626] hover:text-[#25D366]"
                >
                  click here to launch WhatsApp
                </a>.
              </p>
            </div>
          </div>
        )}
        {status === "error" && (
          <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm">{responseMsg}</p>
          </div>
        )}

        {/* Submit to WhatsApp */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2.5 px-6 py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl font-bold transition-all duration-200 shadow-lg shadow-[#25D366]/25 hover:shadow-[#25D366]/35 hover:scale-[1.01]"
        >
          <WhatsAppIcon className="w-5 h-5" />
          <span>Text on WhatsApp Right Away</span>
        </button>
      </form>
    </div>
  );
}
