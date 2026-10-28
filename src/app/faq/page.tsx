"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  ChevronDown,
  MessageSquare,
  PhoneCall,
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
      answer: "Getting started is simple! Click 'Get Free Consultation' or message us on WhatsApp with your plot dimensions and location in Tamil Nadu. Our civil engineer will review your details, discuss your family's needs, and send preliminary ideas.",
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
      answer: "Our packages are highly transparent, affordable, and based on your plot size and requirement scope. Fill out our free estimate calculator or message us on WhatsApp with your dimensions for an immediate, fixed quotation with zero hidden fees.",
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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />

      <main className="flex-grow pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 lg:py-24 border-b border-slate-800/80 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(249,115,22,0.15),rgba(255,255,255,0))] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-6">
              <HelpCircle className="w-4 h-4" />
              Frequently Answered Questions
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
              Got Questions? <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                We Have Clear Answers.
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              Find instant answers to common questions about structural drawings, 2D Vastu plans, 3-5 day delivery, and contractor coordination.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={siteConfig.getWhatsAppUrl("Hi CINORS, I have a specific question about planning my house.")}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold transition-all shadow-lg shadow-orange-500/25 flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Ask Us on WhatsApp
              </a>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 transition-all flex items-center gap-2"
              >
                Book Free Consultation
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Filter Categories & FAQ Accordion */}
        <section className="py-20 bg-slate-950">
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
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    activeCategory === cat
                      ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25"
                      : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800"
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
                    className="bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden transition-colors hover:border-orange-500/30"
                  >
                    <button
                      onClick={() => setExpandedIndex(isOpen ? null : idx)}
                      className="w-full text-left p-6 flex items-center justify-between gap-4 font-bold text-white focus:outline-none"
                    >
                      <span className="text-base sm:text-lg">{faq.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-orange-400 shrink-0 transition-transform duration-300 ${
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
                          <div className="px-6 pb-6 pt-1 text-slate-300 text-sm sm:text-base leading-relaxed border-t border-slate-800/50">
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
            <div className="mt-16 bg-slate-900/60 border border-slate-800 rounded-3xl p-8 text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Have a Custom Plot Requirement?</h3>
              <p className="text-slate-400 text-sm max-w-lg mx-auto mb-6">
                Every land parcel is unique. Call our senior engineering desk directly to get answers for your specific site conditions.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  Call: {siteConfig.formattedPhone}
                </a>
                <a
                  href={siteConfig.getWhatsAppUrl("Hi CINORS, I want to discuss my land parcel.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 text-sm flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-orange-400" />
                  WhatsApp Us
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
