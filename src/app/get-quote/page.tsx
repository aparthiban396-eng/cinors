"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Calculator,
  Phone,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import EstimateFormSection from "@/components/EstimateFormSection";
import { siteConfig } from "@/data/siteData";

export default function GetQuotePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const plotGuide = [
    {
      size: "20ft × 30ft",
      area: "600 sq.ft",
      type: "Compact 1–2 BHK",
      features: "Space-maximized vertical planning, optimized stair placement, high natural lighting.",
    },
    {
      size: "30ft × 40ft",
      area: "1,200 sq.ft",
      type: "Standard 2–3 BHK Duplex",
      features: "Most popular residential plot in Tamil Nadu. Dedicated car porch, master bed, puja room.",
    },
    {
      size: "40ft × 60ft",
      area: "2,400 sq.ft",
      type: "Luxury 3–4 BHK Villa",
      features: "Spacious compound setbacks, double-height living foyer, landscaped garden, multi-car parking.",
    },
    {
      size: "Custom / Odd Plot",
      area: "Any Dimension",
      type: "Specialized Engineering",
      features: "Triangular, trapezoidal, or corner plots engineered with zero dead angles.",
    },
  ];

  const stepsAfterSubmit = [
    {
      step: "1",
      title: "Engineer Scoping Review",
      desc: "Within 2 hours, a senior civil engineer reviews your plot dimensions, facing direction, and requirements.",
    },
    {
      step: "2",
      title: "Free Blueprint Consultation",
      desc: "We connect via phone or email to clarify any specific room layout ideas, Vastu goals, and budget.",
    },
    {
      step: "3",
      title: "Transparent Fixed Quotation",
      desc: "You receive an exact, all-inclusive price quote with zero hidden charges and a 3–5 day delivery schedule.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-navy-950 font-sans selection:bg-orange-500 selection:text-white">
      <Navbar onOpenConsultation={() => setIsModalOpen(true)} />

      <main>
        {/* Hero Section */}
        <section className="relative py-16 sm:py-24 bg-gradient-to-b from-navy-50/60 to-white overflow-hidden border-b border-navy-100 text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-600 font-bold text-xs uppercase tracking-widest mb-5">
              <Calculator className="w-4 h-4 text-orange-500" />
              100% Free & Transparent Quotation
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-navy-950 tracking-tight leading-tight mb-6">
              Get Your Custom Blueprint <br />
              <span className="text-orange-500">Design & Engineering Estimate</span>
            </h1>
            <p className="text-base sm:text-lg text-navy-900/70 leading-relaxed mb-8 max-w-2xl mx-auto">
              Calculate the estimated planning cost for your residential or commercial plot. Fast response with zero obligations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-4 bg-orange-500 text-white rounded-md font-bold text-sm sm:text-base hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/25 flex items-center gap-2 active:scale-95 cursor-pointer"
              >
                Request Free Consultation <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={`tel:+91${siteConfig.phone}`}
                className="px-8 py-4 border border-navy-200 bg-white text-navy-950 rounded-md font-bold text-sm sm:text-base hover:bg-navy-50 transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-orange-500" />
                Call: {siteConfig.formattedPhone}
              </a>
            </div>
          </div>
        </section>

        {/* Interactive Estimator Form */}
        <EstimateFormSection onOpenConsultation={() => setIsModalOpen(true)} />

        {/* What Happens Next Section */}
        <section className="py-16 sm:py-24 bg-slate-50/70 border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-black uppercase text-orange-500 tracking-widest mb-3 block">
                Simple & Transparent
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-navy-950 mb-4">
                What Happens After You Inquire?
              </h2>
              <div className="w-16 h-1 bg-orange-500 mx-auto mt-2 mb-4" />
              <p className="text-navy-900/60 text-sm sm:text-base">
                No pushy sales calls. Just direct technical guidance from qualified civil engineers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {stepsAfterSubmit.map((s, idx) => (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.45, delay: idx * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 hover:border-orange-400 hover:shadow-2xl hover:shadow-orange-500/10 transition-all shadow-xs relative overflow-hidden group"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-orange-400 to-orange-600 scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300 ease-out rounded-l-2xl" />
                  <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-500 font-black text-xl mb-6 group-hover:scale-110 group-hover:rotate-2 transition-transform duration-300">
                    {s.step}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-navy-950 mb-3 group-hover:text-orange-500 transition-colors duration-200">{s.title}</h3>
                  <p className="text-navy-900/60 text-sm leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Standard Plot Sizes Guide */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-black uppercase text-orange-500 tracking-widest mb-3 block">
                Planning Reference
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-navy-950 mb-4">
                Popular Plot Sizes We Engineer
              </h2>
              <div className="w-16 h-1 bg-orange-500 mx-auto mt-2 mb-4" />
              <p className="text-navy-900/60 text-sm sm:text-base">
                Not sure what can fit on your land? Here is how we typically optimize popular plot dimensions across Tamil Nadu.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {plotGuide.map((p, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50/80 border border-slate-200 rounded-2xl p-6 hover:border-orange-500/30 hover:bg-white transition-all shadow-xs"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-bold text-navy-950">{p.size}</span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-orange-50 text-orange-600 border border-orange-200">
                      {p.area}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-orange-600 mb-2">{p.type}</div>
                  <p className="text-sm text-navy-900/60 leading-relaxed">{p.features}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
