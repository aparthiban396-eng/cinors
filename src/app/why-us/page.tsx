"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Award,
  TrendingDown,
  Check,
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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />

      <main className="flex-grow pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 lg:py-24 border-b border-slate-800/80 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(249,115,22,0.15),rgba(255,255,255,0))] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-6">
                <ShieldCheck className="w-4 h-4" />
                Civil Engineering Excellence
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
                Engineered for Generations, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                  Not Just Built by Guesswork
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed">
                Building a home is your life&apos;s biggest financial investment. Discover why over 150+ plot owners in Tamil Nadu trust CINORS to design crack-free, space-optimized, and structurally safe dream homes.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-8 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold transition-all shadow-lg shadow-orange-500/25 flex items-center gap-2 group"
                >
                  Book Free Engineering Consultation
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href={siteConfig.getWhatsAppUrl("Hi CINORS, I want to learn more about why your engineering designs prevent construction risks.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 transition-all"
                >
                  Chat with Structural Engineer
                </a>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto">
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 text-center backdrop-blur-sm">
                <div className="text-3xl sm:text-4xl font-extrabold text-orange-400 mb-1">150+</div>
                <div className="text-xs sm:text-sm text-slate-400 font-medium">Plots Successfully Engineered</div>
              </div>
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 text-center backdrop-blur-sm">
                <div className="text-3xl sm:text-4xl font-extrabold text-orange-400 mb-1">100%</div>
                <div className="text-xs sm:text-sm text-slate-400 font-medium">Vastu Shastra Compliance</div>
              </div>
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 text-center backdrop-blur-sm">
                <div className="text-3xl sm:text-4xl font-extrabold text-orange-400 mb-1">3–5 Days</div>
                <div className="text-xs sm:text-sm text-slate-400 font-medium">Fast-Track Delivery Guarantee</div>
              </div>
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 text-center backdrop-blur-sm">
                <div className="text-3xl sm:text-4xl font-extrabold text-orange-400 mb-1">0%</div>
                <div className="text-xs sm:text-sm text-slate-400 font-medium">Foundation Settlement Issues</div>
              </div>
            </div>
          </div>
        </section>

        {/* 6 Core Pillars Section */}
        <section className="py-20 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-orange-500 font-semibold tracking-wider text-sm uppercase">
                Our Foundation
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
                The 6 Pillars of CINORS Quality
              </h2>
              <p className="text-slate-400">
                Every drawing that leaves our studio passes rigorous engineering and architectural checks to guarantee practical construction on your plot.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trustCards.map((card, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-8 hover:border-orange-500/40 transition-all hover:-translate-y-1 group"
                >
                  <div className="p-3 bg-orange-500/10 rounded-xl w-fit mb-6 text-orange-500 group-hover:scale-110 transition-transform">
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Real Risk Comparison Table */}
        <section className="py-20 bg-slate-900/50 border-y border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-orange-500 font-semibold tracking-wider text-sm uppercase">
                Critical Comparison
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
                Local Mason Thumb-Rules vs. CINORS Structural Engineering
              </h2>
              <p className="text-slate-400">
                A single structural mistake during foundation or lintel casting can cost lakhs to repair later. See how professional engineering protects your money.
              </p>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[680px] bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                <div className="grid grid-cols-12 bg-slate-900 p-4 border-b border-slate-800 text-xs sm:text-sm font-bold tracking-wider uppercase text-slate-300">
                  <div className="col-span-4 text-slate-400">Construction Factor</div>
                  <div className="col-span-4 text-red-400 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-red-500" />
                    Unplanned Local Approach
                  </div>
                  <div className="col-span-4 text-orange-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-orange-500" />
                    CINORS Engineering Standard
                  </div>
                </div>

                <div className="divide-y divide-slate-800/70">
                  {comparisonData.map((row, idx) => (
                    <div
                      key={idx}
                      className={`grid grid-cols-12 p-4 text-sm items-center transition-colors ${
                        idx % 2 === 0 ? "bg-slate-950" : "bg-slate-900/30"
                      }`}
                    >
                      <div className="col-span-4 font-semibold text-slate-200 pr-4">
                        {row.feature}
                      </div>
                      <div className="col-span-4 text-slate-400 pr-4 flex items-start gap-2">
                        <span className="text-red-500 mt-0.5">✕</span>
                        <span>{row.contractor}</span>
                      </div>
                      <div className="col-span-4 text-slate-200 font-medium flex items-start gap-2">
                        <span className="text-orange-400 mt-0.5">✓</span>
                        <span className="text-orange-200">{row.cinors}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-xs sm:text-sm text-slate-400">
                Investing just 0.5% – 1% of your total construction budget in proper civil engineering blueprints prevents irreversible structural defects.
              </p>
            </div>
          </div>
        </section>

        {/* Why Engineering Blueprints Save Real Money */}
        <section className="py-20 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-orange-500/10 via-slate-900/80 to-slate-950 border border-orange-500/30 rounded-3xl p-8 sm:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-semibold mb-4">
                    <TrendingDown className="w-4 h-4" /> Cost Efficiency
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                    How CINORS Saves You ₹50,000 to ₹1,50,000 on Construction Materials
                  </h3>
                  <p className="text-slate-300 leading-relaxed mb-6">
                    Without a Bar Bending Schedule (BBS) and structural drawings, masons order excess steel bars and cut them inefficiently, leading to 12% to 18% scrap steel. With our precision drawings:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="p-1 rounded-full bg-orange-500/20 text-orange-400 mt-0.5">
                        <Check className="w-4 h-4" />
                      </div>
                      <span className="text-slate-300 text-sm">
                        Exact rebar lengths specified down to millimeters to eliminate scrap waste.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="p-1 rounded-full bg-orange-500/20 text-orange-400 mt-0.5">
                        <Check className="w-4 h-4" />
                      </div>
                      <span className="text-slate-300 text-sm">
                        Optimized concrete mix ratios tailored to spans, preventing cement overuse.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="p-1 rounded-full bg-orange-500/20 text-orange-400 mt-0.5">
                        <Check className="w-4 h-4" />
                      </div>
                      <span className="text-slate-300 text-sm">
                        Zero rework or post-casting wall demolitions for door or window mistakes.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 text-center flex flex-col justify-center items-center">
                  <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 mb-4">
                    <Award className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Speak Directly With Our Senior Engineer</h4>
                  <p className="text-slate-400 text-sm mb-6 max-w-sm">
                    Have your plot survey sketch or dimensions handy? Let us examine it and point out key Vastu & structural points for free.
                  </p>
                  <div className="w-full flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="flex-1 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold transition-all text-sm"
                    >
                      Request Free Plan Review
                    </button>
                    <a
                      href={`tel:${siteConfig.phone}`}
                      className="flex-1 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 transition-all text-sm"
                    >
                      Call: {siteConfig.formattedPhone}
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
