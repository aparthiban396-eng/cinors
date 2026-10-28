"use client";

import React, { useState } from "react";
import {
  FileText,
  Compass,
  Layers,
  Home,
  CheckCircle2,
  Clock,
  ArrowRight,
  Check,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import EstimateFormSection from "@/components/EstimateFormSection";
import { siteConfig } from "@/data/siteData";

export default function ProcessPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const detailedSteps = [
    {
      step: "01",
      title: "Share Your Plot Details & Requirements",
      timeline: "Day 1",
      icon: <Compass className="w-8 h-8 text-orange-500" />,
      description: "Send us your plot dimensions, survey sketch or boundaries, road-facing direction, and your family's lifestyle requirements. We study your plot's geometry, municipal setbacks, and natural sun/wind path.",
      activities: [
        "Plot dimension verification (feet or meters)",
        "Road facing orientation & Vastu compass mapping",
        "Zoning requirement analysis (BHK count, parking, rental units)",
        "Budget considerations & future vertical expansion planning",
      ],
      output: "Comprehensive Project Brief & Site Analysis",
    },
    {
      step: "02",
      title: "2D Layout Draft & Vastu Alignment",
      timeline: "Day 2",
      icon: <Layers className="w-8 h-8 text-orange-500" />,
      description: "Our architectural planning team develops customized 2D floor layouts. We align every room to traditional Vastu principles while maximizing day-lighting, natural cross-ventilation, and circulation efficiency.",
      activities: [
        "100% Vastu zoning (Puja room, Master bedroom in SW, Kitchen in SE/Agni)",
        "Living, dining, and kitchen circulation optimization",
        "Clear room dimensions, door/window schedules",
        "Iterative client review and adjustments until 100% satisfied",
      ],
      output: "Approved 2D Floor Plan Blueprints",
    },
    {
      step: "03",
      title: "Structural Engineering & 3D Elevation",
      timeline: "Day 3–4",
      icon: <Home className="w-8 h-8 text-orange-500" />,
      description: "Our licensed structural civil engineers calculate column locations, foundation pad sizing, beam depths, and rebar reinforcement. Concurrently, our 3D visualizers craft photorealistic exterior elevations.",
      activities: [
        "Foundation, column grid, and footing reinforcement calculation",
        "Plinth, lintel, and roof RCC slab rebar detailing",
        "Photorealistic 3D external elevation modeling & texturing",
        "Bar Bending Schedule (BBS) to minimize steel wastage",
      ],
      output: "Certified Structural Design & HD 3D Renderings",
    },
    {
      step: "04",
      title: "Final Blueprint Handover & Site Guidance",
      timeline: "Day 5",
      icon: <FileText className="w-8 h-8 text-orange-500" />,
      description: "You receive the complete, construction-ready blueprint package in high-resolution digital format (PDF + DWG on request). We also offer a direct phone consultation with your contractor to clarify all drawing specifications.",
      activities: [
        "Delivery of complete high-resolution PDF drawing sets",
        "Contractor technical briefing call to walk through rebar specifications",
        "Clarification on foundation depths and concrete grades (M20/M25)",
        "Ongoing remote support during site marking and foundation casting",
      ],
      output: "Complete Construction Blueprint Package + Contractor Briefing",
    },
  ];

  const packageDeliverables = [
    "Vastu-compliant 2D Floor Plans with exact dimensions",
    "Foundation Layout & Footing Reinforcement Drawings",
    "Column Grid Coordinates, Sizes & Vertical Rebar Schedules",
    "Plinth, Lintel, and Roof RCC Beam Reinforcement Details",
    "One-way / Two-way Roof Slab Rebar Layouts",
    "Staircase Structural Details & Landing Beam Design",
    "Photorealistic HD 3D Front Elevation Renders",
    "Bar Bending Schedule (BBS) to reduce rebar waste",
    "Plumbing & Electrical conduit rough-in guidance drawings",
    "Direct engineer consultation with your contractor",
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
                <Clock className="w-4 h-4" />
                Guaranteed 3–5 Business Day Turnaround
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
                Our 4-Step Engineering <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                  Blueprint Delivery Workflow
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed">
                From raw plot measurements to certified, construction-ready engineering drawings — structured, transparent, and hassle-free.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-8 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold transition-all shadow-lg shadow-orange-500/25 flex items-center gap-2 group"
                >
                  Start Your Project Today
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href={siteConfig.getWhatsAppUrl("Hi CINORS, I want to start my house plan. What information should I provide?")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 transition-all"
                >
                  Quick WhatsApp Inquiry
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* The 4 Detailed Steps Timeline */}
        <section className="py-20 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {detailedSteps.map((item) => (
                <div
                  key={item.step}
                  className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 sm:p-10 hover:border-orange-500/40 transition-all relative overflow-hidden"
                >
                  <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Step badge & icon */}
                    <div className="flex items-center gap-4 lg:flex-col lg:items-start shrink-0">
                      <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                        {item.icon}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-3xl sm:text-4xl font-extrabold text-orange-500">
                          {item.step}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-md mt-1 w-fit">
                          {item.timeline}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                        {item.title}
                      </h2>
                      <p className="text-slate-300 text-base sm:text-lg mb-6 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                        {item.activities.map((act, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-sm text-slate-400">
                            <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                            <span>{act}</span>
                          </div>
                        ))}
                      </div>

                      <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between">
                        <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                          Stage Deliverable:
                        </span>
                        <span className="text-sm font-bold text-orange-400">
                          {item.output}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What You Receive - Package Deliverables */}
        <section className="py-20 bg-slate-900/50 border-y border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-orange-500 font-semibold tracking-wider text-sm uppercase">
                Complete Deliverables
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
                What&apos;s Inside Your Blueprint Package
              </h2>
              <p className="text-slate-400">
                You receive high-resolution, print-ready A3/A4 digital drawings formatted for clear understanding by masons, civil engineers, and local authorities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {packageDeliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950 border border-slate-800/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 hover:border-orange-500/30 transition-colors"
                >
                  <div className="p-1 rounded-full bg-orange-500/10 text-orange-400 shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-sm sm:text-base text-slate-300 font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Need From You Section */}
        <section className="py-20 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-12">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="text-orange-400 font-semibold tracking-wider text-xs uppercase">
                  Preparation Guide
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 mb-3">
                  What Information Do We Need From You?
                </h3>
                <p className="text-slate-400 text-sm">
                  To prepare your blueprint swiftly, have these details ready when contacting us:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-slate-950/70 border border-slate-800 p-5 rounded-2xl text-center">
                  <div className="text-orange-400 font-black text-2xl mb-2">1</div>
                  <h4 className="font-bold text-white mb-1">Plot Dimensions</h4>
                  <p className="text-xs text-slate-400">Length & breadth in feet or meters (e.g. 30x40, 25x50).</p>
                </div>
                <div className="bg-slate-950/70 border border-slate-800 p-5 rounded-2xl text-center">
                  <div className="text-orange-400 font-black text-2xl mb-2">2</div>
                  <h4 className="font-bold text-white mb-1">Facing Direction</h4>
                  <p className="text-xs text-slate-400">Direction the road faces (North, East, South, or West).</p>
                </div>
                <div className="bg-slate-950/70 border border-slate-800 p-5 rounded-2xl text-center">
                  <div className="text-orange-400 font-black text-2xl mb-2">3</div>
                  <h4 className="font-bold text-white mb-1">BHK & Floors</h4>
                  <p className="text-xs text-slate-400">Ground floor, G+1, number of bedrooms and attached baths.</p>
                </div>
                <div className="bg-slate-950/70 border border-slate-800 p-5 rounded-2xl text-center">
                  <div className="text-orange-400 font-black text-2xl mb-2">4</div>
                  <h4 className="font-bold text-white mb-1">Special Needs</h4>
                  <p className="text-xs text-slate-400">Puja room, car porch, open terrace, or rental portion.</p>
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
