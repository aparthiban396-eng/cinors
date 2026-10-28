"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Award,
  TrendingDown,
  Check,
  Phone,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import EstimateFormSection from "@/components/EstimateFormSection";
import { trustCards, siteConfig } from "@/data/siteData";

export default function WhyUsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const comparisonData = [
    {
      feature: "Structural Safety & Calculation",
      contractor: "Thumb-rules & arbitrary column spacing without load calculations",
      cinors: "Engineered RCC beam-column framing with structural stability certification",
    },
    {
      feature: "Foundation Design",
      contractor: "Same generic depth used on every site regardless of soil behavior",
      cinors: "Soil-bearing-capacity matched footing sizes preventing foundation cracks",
    },
    {
      feature: "Steel & Concrete Efficiency",
      contractor: "Guesswork leading to either dangerous under-reinforcement or heavy steel waste",
      cinors: "Precise Bar Bending Schedule (BBS) saving ₹40,000–₹1,00,000 in material waste",
    },
    {
      feature: "Vastu Shastra Compliance",
      contractor: "Partial or contradictory layout adjustments made randomly during brickwork",
      cinors: "100% Vastu zoning (Puja, Master Bed, Agni Kitchen, Water Tanks) aligned scientifically",
    },
    {
      feature: "Space Optimization",
      contractor: "Narrow dark corridors, poor cross-ventilation, and unusable dead corners",
      cinors: "Maximized living areas, natural airflow channels, and zero wasted square footage",
    },
    {
      feature: "Construction Readiness",
      contractor: "Hand-drawn sketches requiring constant on-site demolition and changes",
      cinors: "Complete architectural, structural, electrical, and plumbing working blueprints",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-navy-950 font-sans selection:bg-orange-500 selection:text-white">
      <Navbar onOpenConsultation={() => setIsModalOpen(true)} />

      <main>
        {/* Hero Section */}
        <section className="relative py-16 sm:py-24 bg-gradient-to-b from-navy-50/60 to-white overflow-hidden border-b border-navy-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-600 font-bold text-xs uppercase tracking-widest mb-5">
                <ShieldCheck className="w-4 h-4 text-orange-500" />
                Civil Engineering Excellence
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-navy-950 tracking-tight leading-tight mb-6">
                Engineered for Generations, <br />
                <span className="text-orange-500">Not Just Built by Guesswork</span>
              </h1>
              <p className="text-base sm:text-lg text-navy-900/70 leading-relaxed mb-8 max-w-2xl mx-auto">
                Building a home is your life&apos;s biggest financial investment. Discover why over 150+ plot owners in Tamil Nadu trust CINORS to design crack-free, space-optimized, and structurally safe dream homes.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-8 py-4 bg-orange-500 text-white rounded-md font-bold text-sm sm:text-base hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/25 flex items-center gap-2 active:scale-95 cursor-pointer"
                >
                  Book Free Engineering Consultation
                  <ArrowRight className="w-4 h-4" />
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

            {/* Quick Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-16 max-w-4xl mx-auto"
            >
              <div className="bg-white border border-slate-200 rounded-2xl p-5 text-center shadow-xs hover:border-orange-500/30 transition-all">
                <div className="text-3xl sm:text-4xl font-black text-orange-500 mb-1">150+</div>
                <div className="text-xs sm:text-sm text-navy-900/60 font-semibold">Plots Successfully Engineered</div>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 text-center shadow-xs hover:border-orange-500/30 transition-all">
                <div className="text-3xl sm:text-4xl font-black text-orange-500 mb-1">100%</div>
                <div className="text-xs sm:text-sm text-navy-900/60 font-semibold">Vastu Shastra Compliance</div>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 text-center shadow-xs hover:border-orange-500/30 transition-all">
                <div className="text-3xl sm:text-4xl font-black text-orange-500 mb-1">3–5 Days</div>
                <div className="text-xs sm:text-sm text-navy-900/60 font-semibold">Fast-Track Delivery Guarantee</div>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 text-center shadow-xs hover:border-orange-500/30 transition-all">
                <div className="text-3xl sm:text-4xl font-black text-orange-500 mb-1">100%</div>
                <div className="text-xs sm:text-sm text-navy-900/60 font-semibold">Structural Safety & Stability</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 6 Core Pillars Section */}
        <section className="py-16 sm:py-24 bg-slate-50/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-black uppercase text-orange-500 tracking-widest mb-3 block">
                Our Foundation
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-navy-950 mb-4">
                The 6 Pillars of CINORS Quality
              </h2>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 64 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="h-1 bg-orange-500 mx-auto mt-2 mb-4 rounded-full"
              />
              <p className="text-navy-900/60 text-sm sm:text-base">
                Every drawing that leaves our studio passes rigorous engineering and architectural checks to guarantee practical construction on your plot.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {trustCards.map((card, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                  whileHover={{ y: -7, transition: { duration: 0.25 } }}
                  className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 hover:border-orange-400 hover:shadow-2xl hover:shadow-orange-500/15 transition-all duration-300 group shadow-xs relative overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-orange-400 to-orange-600 scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300 ease-out rounded-l-2xl" />
                  <div className="p-3 bg-orange-50 rounded-xl w-fit mb-5 text-orange-500 group-hover:scale-110 group-hover:rotate-2 transition-transform duration-300">
                    {card.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-navy-950 mb-3 group-hover:text-orange-500 transition-colors duration-200">{card.title}</h3>
                  <p className="text-sm text-navy-900/60 leading-relaxed">
                    {card.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* The Real Risk Comparison Table */}
        <section className="py-16 sm:py-24 bg-white border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-black uppercase text-orange-500 tracking-widest mb-3 block">
                Critical Comparison
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-navy-950 mb-4">
                Local Mason Thumb-Rules vs. CINORS Structural Engineering
              </h2>
              <div className="w-16 h-1 bg-orange-500 mx-auto mt-2 mb-4" />
              <p className="text-navy-900/60 text-sm sm:text-base">
                A single structural mistake during foundation or lintel casting can cost lakhs to repair later. See how professional engineering protects your money.
              </p>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[680px] bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-lg">
                <div className="grid grid-cols-12 bg-navy-950 p-4 text-xs sm:text-sm font-bold tracking-wider uppercase text-white">
                  <div className="col-span-4 text-navy-200">Construction Factor</div>
                  <div className="col-span-4 text-red-400 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-red-400" />
                    Unplanned Local Approach
                  </div>
                  <div className="col-span-4 text-orange-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-orange-400" />
                    CINORS Engineering Standard
                  </div>
                </div>

                <div className="divide-y divide-slate-100">
                  {comparisonData.map((row, idx) => (
                    <div
                      key={idx}
                      className={`grid grid-cols-12 p-4 text-sm items-center transition-colors ${
                        idx % 2 === 0 ? "bg-white" : "bg-slate-50/70"
                      }`}
                    >
                      <div className="col-span-4 font-bold text-navy-950 pr-4">
                        {row.feature}
                      </div>
                      <div className="col-span-4 text-navy-900/70 pr-4 flex items-start gap-2">
                        <span className="text-red-500 font-bold mt-0.5">✕</span>
                        <span>{row.contractor}</span>
                      </div>
                      <div className="col-span-4 text-navy-950 font-semibold flex items-start gap-2">
                        <span className="text-orange-500 font-bold mt-0.5">✓</span>
                        <span className="text-orange-600">{row.cinors}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-xs sm:text-sm text-navy-900/60 font-medium">
                Investing just 0.5% – 1% of your total construction budget in proper civil engineering blueprints prevents irreversible structural defects.
              </p>
            </div>
          </div>
        </section>

        {/* Why Engineering Blueprints Save Real Money */}
        <section className="py-16 sm:py-24 bg-slate-50/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-navy-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.15),transparent_70%)] pointer-events-none" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-semibold mb-4">
                    <TrendingDown className="w-4 h-4" /> Cost Efficiency
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-4">
                    How CINORS Saves You ₹50,000 to ₹1,50,000 on Construction Materials
                  </h3>
                  <p className="text-navy-100/70 leading-relaxed mb-6 text-sm sm:text-base">
                    Without a Bar Bending Schedule (BBS) and structural drawings, masons order excess steel bars and cut them inefficiently, leading to 12% to 18% scrap steel. With our precision drawings:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="p-1 rounded-full bg-orange-500/20 text-orange-400 mt-0.5">
                        <Check className="w-4 h-4" />
                      </div>
                      <span className="text-navy-100/80 text-sm">
                        Exact rebar lengths specified down to millimeters to eliminate scrap waste.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="p-1 rounded-full bg-orange-500/20 text-orange-400 mt-0.5">
                        <Check className="w-4 h-4" />
                      </div>
                      <span className="text-navy-100/80 text-sm">
                        Optimized concrete mix ratios tailored to spans, preventing cement overuse.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="p-1 rounded-full bg-orange-500/20 text-orange-400 mt-0.5">
                        <Check className="w-4 h-4" />
                      </div>
                      <span className="text-navy-100/80 text-sm">
                        Zero rework or post-casting wall demolitions for door or window mistakes.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 text-center flex flex-col justify-center items-center">
                  <div className="w-16 h-16 rounded-2xl bg-orange-500/20 flex items-center justify-center text-orange-400 mb-4">
                    <Award className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Speak Directly With Our Senior Engineer</h4>
                  <p className="text-navy-200/60 text-sm mb-6 max-w-sm">
                    Have your plot survey sketch or dimensions handy? Let us examine it and point out key Vastu & structural points for free.
                  </p>
                  <div className="w-full flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="flex-1 px-6 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold transition-all text-sm shadow-lg shadow-orange-500/20"
                    >
                      Request Free Plan Review
                    </button>
                    <a
                      href={`tel:+91${siteConfig.phone}`}
                      className="flex-1 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold border border-white/15 transition-all text-sm flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4 text-orange-400" />
                      {siteConfig.formattedPhone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Estimate Form Section */}
        <EstimateFormSection onOpenConsultation={() => setIsModalOpen(true)} />
      </main>

      <Footer />
      <FloatingWhatsApp />
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
