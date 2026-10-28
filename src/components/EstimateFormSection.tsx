"use client";

import React, { useState } from "react";
import { siteConfig } from "@/data/siteData";

interface EstimateFormSectionProps {
  onOpenConsultation?: () => void;
}

export default function EstimateFormSection({ onOpenConsultation }: EstimateFormSectionProps = {}) {
  const [inlineFormData, setInlineFormData] = useState({
    name: "",
    phone: "",
    location: "",
    plotSize: "",
    service: "Complete Package",
    stage: "Bought a Plot & Planning",
  });
  const [inlineFormSubmitted, setInlineFormSubmitted] = useState(false);

  return (
    <section id="get-quote" className="py-16 sm:py-24 bg-gradient-to-br from-navy-950 via-navy-900 to-[#1a1033] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.12),transparent_55%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(249,115,22,0.06),transparent_55%)] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT — CTA copy */}
          <div>
            <span className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              100% Free Consultation
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-5">
              Get Your <span className="text-orange-500">Dream Home</span><br />Plan — Today
            </h2>
            <p className="text-navy-200/65 text-sm sm:text-base leading-relaxed mb-8 max-w-md">
              Fill in your plot details and our qualified civil engineers will reach out within 24 hours with a complete customized plan — absolutely free.
            </p>
            <div className="space-y-4">
              {[
                { icon: "✅", text: "Certified Civil & Structural Engineers" },
                { icon: "✅", text: "Serving All Districts Across Tamil Nadu" },
                { icon: "✅", text: "2D Plans, 3D Elevation & Vastu Layouts" },
                { icon: "✅", text: "Get Drawings Within 3–5 Business Days" },
              ].map(item => (
                <div key={item.text} className="flex items-center gap-3 text-sm text-white/80 font-medium">
                  <span className="text-base">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
            <div className="mt-10 flex items-center gap-4 flex-wrap">
              <a href={`tel:+91${siteConfig.phone}`} className="flex items-center gap-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-5 py-3 rounded-xl transition-all text-sm font-bold">
                <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg>
                {siteConfig.formattedPhone}
              </a>
              {onOpenConsultation && (
                <button
                  type="button"
                  onClick={onOpenConsultation}
                  className="text-xs font-semibold text-orange-400 hover:text-orange-300 underline underline-offset-4 cursor-pointer"
                >
                  Or Open Quick Consultation Dialog
                </button>
              )}
            </div>
          </div>

          {/* RIGHT — Form card */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-br from-orange-500/20 via-orange-600/10 to-transparent rounded-3xl blur-xl" />
            <div className="relative bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
              {inlineFormSubmitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-[#25D366]/10 border border-[#25D366]/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-[#25D366]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                  </div>
                  <h4 className="text-xl font-black text-white mb-2">Message Sent!</h4>
                  <p className="text-navy-200/60 text-sm">Opening WhatsApp to connect you with our engineer...</p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h3 className="text-xl font-black text-white tracking-tight">Request Free Estimate</h3>
                    <p className="text-navy-200/55 text-xs mt-1">We&apos;ll reply within 24 hours. No spam, ever.</p>
                  </div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setInlineFormSubmitted(true);
                      const msg = `Hi CINORS,\nI'd like a Free Estimate for my plot. Here are my details:\n• Name: ${inlineFormData.name}\n• Phone: ${inlineFormData.phone}\n• Plot Location: ${inlineFormData.location}\n• Plot Dimensions: ${inlineFormData.plotSize}\n• Service Required: ${inlineFormData.service}\n• Current Stage: ${inlineFormData.stage}\n\nPlease contact me. Thank you!`;
                      setTimeout(() => {
                        window.open(siteConfig.getWhatsAppUrl(msg), "_blank");
                        setInlineFormSubmitted(false);
                        setInlineFormData({ name: "", phone: "", location: "", plotSize: "", service: "Complete Package", stage: "Bought a Plot & Planning" });
                      }, 1200);
                    }}
                    className="space-y-4"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black text-white/50 uppercase tracking-widest mb-1.5">Your Name *</label>
                        <input required type="text" placeholder="e.g. Rajesh Kumar" value={inlineFormData.name} onChange={e => setInlineFormData({...inlineFormData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/25 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-white/50 uppercase tracking-widest mb-1.5">Phone Number *</label>
                        <input required type="tel" placeholder="e.g. 8248768635" value={inlineFormData.phone} onChange={e => setInlineFormData({...inlineFormData, phone: e.target.value})} className="w-full bg-white/5 border border-white/10 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/25 outline-none transition-all" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black text-white/50 uppercase tracking-widest mb-1.5">Plot Location *</label>
                        <input required type="text" placeholder="e.g. Trichy / Madurai" value={inlineFormData.location} onChange={e => setInlineFormData({...inlineFormData, location: e.target.value})} className="w-full bg-white/5 border border-white/10 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/25 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-white/50 uppercase tracking-widest mb-1.5">Plot Dimensions</label>
                        <input type="text" placeholder="e.g. 30×40 ft / 1200 sq.ft" value={inlineFormData.plotSize} onChange={e => setInlineFormData({...inlineFormData, plotSize: e.target.value})} className="w-full bg-white/5 border border-white/10 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/25 outline-none transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-white/50 uppercase tracking-widest mb-1.5">Service Required</label>
                      <select value={inlineFormData.service} onChange={e => setInlineFormData({...inlineFormData, service: e.target.value})} className="w-full bg-navy-950 border border-white/10 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 rounded-lg px-3.5 py-2.5 text-sm text-white outline-none transition-all">
                        {["2D Floor Plan", "Structural Drawings", "3D Elevation", "Vastu Layout", "Interior Design", "Complete Package"].map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-white/50 uppercase tracking-widest mb-1.5">Current Stage</label>
                      <select value={inlineFormData.stage} onChange={e => setInlineFormData({...inlineFormData, stage: e.target.value})} className="w-full bg-navy-950 border border-white/10 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 rounded-lg px-3.5 py-2.5 text-sm text-white outline-none transition-all">
                        {["Bought a Plot & Planning", "Already Have a Plan (Need Changes)", "Under Construction (Need Guidance)", "Just Exploring Options"].map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <button type="submit" className="w-full flex items-center justify-center gap-2.5 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-black py-3.5 rounded-xl transition-all shadow-lg shadow-orange-500/25 text-sm mt-2 cursor-pointer">
                      <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.248 8.477 3.517 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.59 2.028 14.108.977 11.983.977c-5.437 0-9.863 4.37-9.867 9.8a9.74 9.74 0 0 0 1.502 5.093l-1.015 3.7.83-.217 2.083-1.636z" /><path d="M16.924 13.917c-.27-.135-1.597-.788-1.846-.878-.247-.09-.427-.135-.607.135-.18.27-.697.878-.854 1.058-.158.18-.315.202-.585.067-.27-.135-1.138-.419-2.167-1.338-.802-.715-1.343-1.6-1.5-1.871-.158-.27-.017-.417.118-.552.122-.122.27-.315.405-.472.135-.158.18-.27.27-.45.09-.18.045-.337-.022-.472-.068-.135-.608-1.464-.833-2.005-.22-.527-.44-.457-.607-.465-.158-.007-.338-.007-.518-.007-.18 0-.472.067-.72.337-.247.27-.945.923-.945 2.25s.967 2.61 1.102 2.79c.135.18 1.902 2.904 4.609 4.073.644.278 1.147.444 1.539.569.648.206 1.238.177 1.704.107.52-.078 1.597-.652 1.821-1.282.225-.63.225-1.17.158-1.282-.068-.113-.248-.18-.518-.315z" /></svg>
                      Send via WhatsApp — Free
                    </button>
                    <p className="text-center text-[10px] text-white/25 pt-1">By submitting, you agree to be contacted by our engineering team.</p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
