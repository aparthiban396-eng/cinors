"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/siteData";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    plotSize: "",
    stage: "Bought a Plot & Planning",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    const message = `Hi CINORS,\nI would like to get a Free Consultation for my plot. Here are my details:\n• Name: ${formData.name}\n• Phone: ${formData.phone}\n• Plot Location: ${formData.location}\n• Plot Size: ${formData.plotSize}\n• Current Stage: ${formData.stage}\n\nPlease guide me on the next steps. Thank you!`;
    const whatsappUrl = siteConfig.getWhatsAppUrl(message);
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      onClose();
      setFormSubmitted(false);
      setFormData({ name: "", phone: "", location: "", plotSize: "", stage: "Bought a Plot & Planning" });
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 z-10 p-5 sm:p-8 max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-navy-400 hover:text-navy-950 hover:bg-navy-50 rounded-full transition-all"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="mb-5 pr-6">
              <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest block mb-1">
                100% Free Consultation
              </span>
              <h4 className="text-xl sm:text-2xl font-black text-navy-950 tracking-tight leading-tight">
                Design Your Dream Home
              </h4>
              <p className="text-xs text-navy-900/60 mt-1 leading-relaxed">
                Enter your plot details below and our qualified engineers will reach out within 24 hours.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { id: "name", label: "Your Name", type: "text", placeholder: "e.g. Rajesh Kumar", field: "name" },
                { id: "phone", label: "Phone Number", type: "tel", placeholder: "e.g. 8248768635", field: "phone" },
                { id: "location", label: "Plot District/City", type: "text", placeholder: "e.g. Trichy / Madurai", field: "location" },
                { id: "plotSize", label: "Plot Dimensions / Size", type: "text", placeholder: "e.g. 30x40 ft (1200 sq.ft)", field: "plotSize" },
              ].map((f) => (
                <div key={f.id}>
                  <label htmlFor={f.id} className="block text-[11px] font-bold text-navy-900 uppercase tracking-wider mb-1.5">
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    id={f.id}
                    required
                    value={formData[f.field as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [f.field]: e.target.value })}
                    placeholder={f.placeholder}
                    className="w-full px-4 py-3 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 text-navy-950"
                  />
                </div>
              ))}
              <div>
                <label htmlFor="stage" className="block text-[11px] font-bold text-navy-900 uppercase tracking-wider mb-1.5">
                  Current Stage
                </label>
                <select
                  id="stage"
                  value={formData.stage}
                  onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                  className="w-full px-4 py-3 text-xs sm:text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 text-navy-950"
                >
                  <option>Bought a Plot & Planning</option>
                  <option>Need 2D/3D Drawings Only</option>
                  <option>Starting construction soon</option>
                  <option>Already building, need revisions</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={formSubmitted}
                className={`w-full py-4 text-sm font-bold rounded-lg text-white transition-all flex items-center justify-center gap-2 mt-2 active:scale-98 ${
                  formSubmitted
                    ? "bg-emerald-500"
                    : "bg-orange-500 hover:bg-orange-600 shadow-xl shadow-orange-500/10 cursor-pointer"
                }`}
              >
                {formSubmitted ? (
                  <>
                    <Check className="w-5 h-5" /> Connecting to WhatsApp...
                  </>
                ) : (
                  <>
                    Submit & Get Consulted <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
