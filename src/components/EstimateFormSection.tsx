"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle, ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/siteData";

const WEB3FORMS_KEY = "a479e76f-57bf-4088-822f-fbf39250b246";

interface EstimateFormSectionProps {
  onOpenConsultation?: () => void;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function EstimateFormSection({ onOpenConsultation: _onOpenConsultation }: EstimateFormSectionProps = {}) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    plotSize: "",
    service: "Complete Package",
    stage: "Bought a Plot & Planning",
  });
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New Estimate Request — ${formData.name} | ${formData.service} | ${formData.location}`,
          from_name: "CINORS Website",
          name: formData.name,
          phone: formData.phone,
          email: formData.email || "Not provided",
          "Plot Location": formData.location,
          "Plot Dimensions": formData.plotSize || "Not specified",
          "Service Required": formData.service,
          "Current Stage": formData.stage,
          botcheck: "",
        }),
      });

      const data = await response.json();
      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const field = (label: string, key: keyof typeof formData, type = "text", placeholder = "") => (
    <div>
      <label className="block text-[10px] font-black text-white/50 uppercase tracking-widest mb-1.5">
        {label}
      </label>
      <input
        type={type}
        required={key !== "email" && key !== "plotSize"}
        placeholder={placeholder}
        value={formData[key]}
        onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
        className="w-full bg-white/5 border border-white/10 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/25 outline-none transition-all"
      />
    </div>
  );

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-navy-950 via-navy-900 to-[#1a1033] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.12),transparent_55%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(249,115,22,0.06),transparent_55%)] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT — CTA Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.55 }}
          >
            <span className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              100% Free Consultation
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-5">
              Get Your <span className="text-orange-500">Dream Home</span><br />Plan — Today
            </h2>
            <p className="text-navy-200/65 text-sm sm:text-base leading-relaxed mb-8 max-w-md">
              Fill in your plot details and our qualified civil engineers will reach out within 24 hours with a complete customised plan — absolutely free.
            </p>
            <div className="space-y-3.5">
              {[
                "Certified Civil & Structural Engineers",
                "Serving All Districts Across Tamil Nadu",
                "2D Plans, 3D Elevation & Vastu Layouts",
                "Get Drawings Within 3–5 Business Days",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-white/80 font-medium">
                  <span className="w-5 h-5 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0 text-xs font-bold">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={`tel:+91${siteConfig.phone}`}
                className="flex items-center gap-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-5 py-3 rounded-xl transition-all text-sm font-bold"
              >
                <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                {siteConfig.formattedPhone}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-5 py-3 rounded-xl transition-all text-sm font-bold"
              >
                <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                {siteConfig.email}
              </a>
            </div>
          </motion.div>

          {/* RIGHT — Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.55 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-br from-orange-500/20 via-orange-600/10 to-transparent rounded-3xl blur-xl" />
            <div className="relative bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">

              {/* SUCCESS STATE */}
              {status === "success" ? (
                <div className="text-center py-10">
                  <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle className="w-10 h-10 text-emerald-400" />
                  </div>
                  <h4 className="text-xl font-black text-white mb-2">Request Submitted!</h4>
                  <p className="text-navy-200/60 text-sm leading-relaxed mb-1">
                    Thank you, <strong className="text-white">{formData.name}</strong>. Our engineering team will contact you at <strong className="text-orange-400">{formData.phone}</strong> within 24 hours.
                  </p>
                  <p className="text-navy-200/40 text-xs mt-3">
                    Your enquiry has been sent to contact@cinors.in
                  </p>
                  <button
                    onClick={() => {
                      setStatus("idle");
                      setFormData({ name: "", phone: "", email: "", location: "", plotSize: "", service: "Complete Package", stage: "Bought a Plot & Planning" });
                    }}
                    className="mt-6 px-5 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-all"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h3 className="text-xl font-black text-white tracking-tight">Request Free Estimate</h3>
                    <p className="text-navy-200/55 text-xs mt-1">We&apos;ll reply within 24 hours. No spam, ever.</p>
                  </div>

                  {/* ERROR BANNER */}
                  {status === "error" && (
                    <div className="mb-4 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-lg text-xs text-red-300">
                      Something went wrong. Email us directly at{" "}
                      <a href="mailto:contact@cinors.in" className="underline font-bold text-red-200">contact@cinors.in</a>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Spam prevention */}
                    <input type="checkbox" name="botcheck" className="hidden" />

                    <div className="grid sm:grid-cols-2 gap-4">
                      {field("Your Name *", "name", "text", "e.g. Rajesh Kumar")}
                      {field("Phone Number *", "phone", "tel", "e.g. 98XXXXXX00")}
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-white/50 uppercase tracking-widest mb-1.5">
                        Email Address <span className="text-white/30 font-normal normal-case">(optional)</span>
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. yourname@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/25 outline-none transition-all"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {field("Plot Location *", "location", "text", "e.g. Trichy / Madurai")}
                      {field("Plot Dimensions", "plotSize", "text", "e.g. 30×40 ft")}
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-white/50 uppercase tracking-widest mb-1.5">Service Required</label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full bg-navy-950 border border-white/10 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 rounded-lg px-3.5 py-2.5 text-sm text-white outline-none transition-all"
                      >
                        {["2D Floor Plan", "Structural Drawings", "3D Elevation", "Vastu Layout", "Interior Design", "Complete Package"].map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-white/50 uppercase tracking-widest mb-1.5">Current Stage</label>
                      <select
                        value={formData.stage}
                        onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                        className="w-full bg-navy-950 border border-white/10 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 rounded-lg px-3.5 py-2.5 text-sm text-white outline-none transition-all"
                      >
                        {["Bought a Plot & Planning", "Already Have a Plan (Need Changes)", "Under Construction (Need Guidance)", "Just Exploring Options"].map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full flex items-center justify-center gap-2.5 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-black py-3.5 rounded-xl transition-all shadow-lg shadow-orange-500/25 text-sm mt-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {status === "submitting" ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Sending Request...</>
                      ) : (
                        <>Send Request to CINORS <ArrowRight className="w-4 h-4" /></>
                      )}
                    </button>

                    <p className="text-center text-[10px] text-white/25 pt-1 leading-relaxed">
                      Your details are sent securely to contact@cinors.in. We never share your information with third parties.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
