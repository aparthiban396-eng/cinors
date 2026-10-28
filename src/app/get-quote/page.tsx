"use client";

import React, { useState } from "react";
import {
  Calculator,
  PhoneCall,
  MessageSquare,
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
      title: "Free WhatsApp Consultation",
      desc: "We connect via WhatsApp or phone to clarify any specific room layout ideas, Vastu goals, and budget.",
    },
    {
      step: "3",
      title: "Transparent Fixed Quotation",
      desc: "You receive an exact, all-inclusive price quote with zero hidden charges and a 3–5 day delivery schedule.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />

      <main className="flex-grow pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 lg:py-24 border-b border-slate-800/80 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(249,115,22,0.15),rgba(255,255,255,0))] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-6">
              <Calculator className="w-4 h-4" />
              100% Free & Transparent Quotation
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
              Get Your Custom Blueprint <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                Design & Engineering Estimate
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              Calculate the estimated planning cost for your residential or commercial plot. Instant response with zero obligations.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={siteConfig.getWhatsAppUrl("Hi CINORS, I would like to get a quote for my plot planning.")}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold transition-all shadow-lg shadow-orange-500/25 flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Chat on WhatsApp Directly
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 transition-all flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-orange-400" />
                Call: {siteConfig.formattedPhone}
              </a>
            </div>
          </div>
        </section>

        {/* Interactive Estimator Form */}
        <EstimateFormSection onOpenConsultation={() => setIsModalOpen(true)} />

        {/* What Happens Next Section */}
        <section className="py-20 bg-slate-900/40 border-y border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-orange-500 font-semibold tracking-wider text-sm uppercase">
                Simple & Transparent
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
                What Happens After You Inquire?
              </h2>
              <p className="text-slate-400">
                No endless sales calls. Just direct technical guidance from qualified civil engineers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stepsAfterSubmit.map((s) => (
                <div
                  key={s.step}
                  className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 relative hover:border-orange-500/40 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 font-black text-xl mb-6">
                    {s.step}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Standard Plot Sizes Guide */}
        <section className="py-20 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-orange-500 font-semibold tracking-wider text-sm uppercase">
                Planning Reference
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
                Popular Plot Sizes We Engineer
              </h2>
              <p className="text-slate-400">
                Not sure what can fit on your land? Here is how we typically optimize popular plot dimensions across Tamil Nadu.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {plotGuide.map((p, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-orange-500/30 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-bold text-white">{p.size}</span>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                      {p.area}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-orange-300 mb-2">{p.type}</div>
                  <p className="text-sm text-slate-400 leading-relaxed">{p.features}</p>
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
