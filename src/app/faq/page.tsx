"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  ChevronDown,
  Mail,
  Phone,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import EstimateFormSection from "@/components/EstimateFormSection";
import { siteConfig } from "@/data/siteData";

interface ExtendedFAQ {
  question: string;
  answer: string;
  category: "General" | "Structural" | "Vastu" | "Pricing";
}

export default function FAQPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const allFaqs: ExtendedFAQ[] = [
    {
      category: "General",
      question: "How do I get started with CINORS?",
      answer: "Getting started is simple! Click 'Get Free Consultation' or submit our online estimate form with your plot dimensions and location in Tamil Nadu. Our civil engineer will review your details, discuss your family's needs, and send preliminary ideas.",
    },
    {
      category: "General",
      question: "Do you provide services across all districts in Tamil Nadu?",
      answer: "Yes! CINORS serves clients across all districts of Tamil Nadu (Trichy, Madurai, Chennai, Coimbatore, Salem, Tirunelveli, Thanjavur, and more). We coordinate through digital drawings, video calls, and technical contractor phone briefings.",
    },
    {
      category: "General",
      question: "What is the turnaround time for a complete blueprint set?",
      answer: "Our standard turnaround time is strictly 3 to 5 business days. Once you approve the preliminary 2D layout draft, we deliver structural drawings, 3D elevation renders, and working blueprints immediately.",
    },
    {
      category: "General",
      question: "In what format do you provide the drawings?",
      answer: "Drawings are provided in high-resolution, print-ready digital PDF format (A3 / A4 size) suitable for color or black-and-white printing. AutoCAD DWG source files are also available upon request for local municipality approvals.",
    },
    {
      category: "Structural",
      question: "Why do I need structural drawings if my mason already has experience?",
      answer: "Masons rely on rule-of-thumb guesses, often resulting in either under-reinforcement (leading to wall cracks, slab deflection, and foundation settlement) or over-reinforcement (wasting ₹50,000+ in unnecessary steel). Our licensed structural engineers calculate exact column, beam, and footing rebar sizes based on structural load equations.",
    },
    {
      category: "Structural",
      question: "Do you design for future vertical floor expansion (e.g. G+1 to G+2)?",
      answer: "Yes! Simply notify us if you plan to add future floors later. We design the foundation footing size, column dimensions, and rebar reinforcement specifically to support the future dead and live loads safely.",
    },
    {
      category: "Structural",
      question: "Will you coordinate directly with my building contractor?",
      answer: "Absolutely. We provide a direct engineering briefing call with your contractor or site supervisor to explain the column grid, footing depths, rebar schedules, and concrete mix proportions, ensuring zero misinterpretations.",
    },
    {
      category: "Vastu",
      question: "Are your house floor plans 100% Vastu compliant?",
      answer: "Yes. Every plan we create adheres strictly to traditional Indian Vastu principles: Master Bedroom in South-West (Niruthi), Kitchen in South-East (Agni), Puja Room in North-East (Eshanya), and water tanks / sumps appropriately positioned according to plot road facing.",
    },
    {
      category: "Vastu",
      question: "Can you design Vastu plans for South-facing or West-facing plots?",
      answer: "Yes! While many believe North or East plots are easier, South-facing and West-facing plots can be designed to be completely auspicious and prosperous with correct entrance placement (pada calculation) and proper room zoning.",
    },
    {
      category: "Pricing",
      question: "How much does a house planning package cost?",
      answer: "Our packages are highly transparent, affordable, and based on your plot size and requirement scope. Fill out our free estimate calculator or message us with your dimensions for an immediate, fixed quotation with zero hidden fees.",
    },
    {
      category: "Pricing",
      question: "Are plan revisions included in the price?",
      answer: "Yes! We include layout revision rounds during the 2D draft phase to ensure the room sizes, circulation, and window placements are exactly how you and your family envision them.",
    },
  ];

  const categories = ["All", "General", "Structural", "Vastu", "Pricing"];

  const filteredFaqs = allFaqs.filter((item) => {
    if (activeCategory === "All") return true;
    return item.category === activeCategory;
  });

  return (
    <div className="min-h-screen bg-white text-navy-950 font-sans selection:bg-orange-500 selection:text-white">
      <Navbar onOpenConsultation={() => setIsModalOpen(true)} />

      <main>
        {/* Hero Section */}
        <section className="relative py-16 sm:py-24 bg-gradient-to-b from-navy-50/60 to-white overflow-hidden border-b border-navy-100 text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-600 font-bold text-xs uppercase tracking-widest mb-5">
              <HelpCircle className="w-4 h-4 text-orange-500" />
              Frequently Answered Questions
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-navy-950 tracking-tight leading-tight mb-6">
              Got Questions? <br />
              <span className="text-orange-500">We Have Clear Answers.</span>
            </h1>
            <p className="text-base sm:text-lg text-navy-900/70 leading-relaxed mb-8 max-w-2xl mx-auto">
              Find instant answers to common questions about structural drawings, 2D Vastu plans, 3–5 day delivery, and contractor coordination.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-4 bg-orange-500 text-white rounded-md font-bold text-sm sm:text-base hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/25 flex items-center gap-2 active:scale-95 cursor-pointer"
              >
                Book Free Consultation <ArrowRight className="w-4 h-4" />
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

        {/* Filter Categories & FAQ Accordion */}
        <section className="py-16 sm:py-24 bg-slate-50/70">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setExpandedIndex(null);
                  }}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    activeCategory === cat
                      ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                      : "bg-white text-navy-900 hover:bg-slate-100 border border-slate-200 shadow-xs"
                  }`}
                >
                  {cat === "All" ? "All Questions" : cat}
                </button>
              ))}
            </div>

            {/* Accordion List */}
            <div className="space-y-4">
              {filteredFaqs.map((faq, idx) => {
                const isOpen = expandedIndex === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs hover:border-orange-500/40 transition-colors"
                  >
                    <button
                      onClick={() => setExpandedIndex(isOpen ? null : idx)}
                      className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-navy-950 focus:outline-none cursor-pointer"
                    >
                      <span className="text-sm sm:text-base">{faq.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-orange-500 shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="px-5 sm:px-6 pb-6 pt-1 text-navy-900/70 text-xs sm:text-sm leading-relaxed border-t border-slate-100">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Support Callout Box */}
            <div className="mt-16 bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 text-center shadow-lg">
              <h3 className="text-xl sm:text-2xl font-black text-navy-950 mb-2">Have a Custom Plot Requirement?</h3>
              <p className="text-navy-900/60 text-sm max-w-lg mx-auto mb-6">
                Every land parcel is unique. Call our senior engineering desk directly or email us to get answers for your specific site conditions.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href={`tel:+91${siteConfig.phone}`}
                  className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-orange-500/20"
                >
                  <Phone className="w-4 h-4" />
                  Call: {siteConfig.formattedPhone}
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-navy-950 font-bold border border-slate-200 text-sm flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-orange-500" />
                  {siteConfig.email}
                </a>
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
