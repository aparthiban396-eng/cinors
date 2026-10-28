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
  Phone,
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
    <div className="min-h-screen bg-white text-navy-950 font-sans selection:bg-orange-500 selection:text-white">
      <Navbar onOpenConsultation={() => setIsModalOpen(true)} />

      <main>
        {/* Hero Section */}
        <section className="relative py-16 sm:py-24 bg-gradient-to-b from-navy-50/60 to-white overflow-hidden border-b border-navy-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-600 font-bold text-xs uppercase tracking-widest mb-5">
              <Clock className="w-4 h-4 text-orange-500" />
              Guaranteed 3–5 Business Day Turnaround
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-navy-950 tracking-tight leading-tight mb-6">
              Our 4-Step Engineering <br />
              <span className="text-orange-500">Blueprint Delivery Workflow</span>
            </h1>
            <p className="text-base sm:text-lg text-navy-900/70 leading-relaxed mb-8 max-w-2xl mx-auto">
              From raw plot measurements to certified, construction-ready engineering drawings — structured, transparent, and hassle-free.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-4 bg-orange-500 text-white rounded-md font-bold text-sm sm:text-base hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/25 flex items-center gap-2 active:scale-95 cursor-pointer"
              >
                Start Your Project Today
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
        </section>

        {/* The 4 Detailed Steps Timeline */}
        <section className="py-16 sm:py-24 bg-slate-50/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-10">
              {detailedSteps.map((item) => (
                <div
                  key={item.step}
                  className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-6 sm:p-10 hover:border-orange-500/40 hover:shadow-xl transition-all shadow-xs relative overflow-hidden"
                >
                  <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Step badge & icon */}
                    <div className="flex items-center gap-4 lg:flex-col lg:items-start shrink-0">
                      <div className="w-16 h-16 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-500">
                        {item.icon}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-3xl sm:text-4xl font-black text-orange-500">
                          {item.step}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider text-navy-900/60 bg-slate-100 px-2.5 py-1 rounded-md mt-1 w-fit">
                          {item.timeline}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h2 className="text-2xl sm:text-3xl font-black text-navy-950 mb-3 tracking-tight">
                        {item.title}
                      </h2>
                      <p className="text-navy-900/70 text-sm sm:text-base mb-6 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                        {item.activities.map((act, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-navy-900/70">
                            <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                            <span>{act}</span>
                          </div>
                        ))}
                      </div>

                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="text-xs uppercase tracking-wider font-bold text-navy-900/50">
                          Stage Deliverable:
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-orange-600">
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
        <section className="py-16 sm:py-24 bg-white border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-black uppercase text-orange-500 tracking-widest mb-3 block">
                Complete Deliverables
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-navy-950 mb-4">
                What&apos;s Inside Your Blueprint Package
              </h2>
              <div className="w-16 h-1 bg-orange-500 mx-auto mt-2 mb-4" />
              <p className="text-navy-900/60 text-sm sm:text-base">
                You receive high-resolution, print-ready A3/A4 digital drawings formatted for clear understanding by masons, civil engineers, and local authorities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {packageDeliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 flex items-start gap-3.5 hover:border-orange-500/40 hover:bg-white transition-all shadow-xs"
                >
                  <div className="p-1 rounded-full bg-orange-50 text-orange-600 shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm text-navy-950 font-bold">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Need From You Section */}
        <section className="py-16 sm:py-24 bg-slate-50/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-navy-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="text-orange-400 font-bold tracking-widest text-xs uppercase mb-2 block">
                  Preparation Guide
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-1 mb-3">
                  What Information Do We Need From You?
                </h3>
                <p className="text-navy-200/60 text-sm">
                  To prepare your blueprint swiftly, have these details ready when contacting us:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-center">
                  <div className="text-orange-400 font-black text-2xl mb-2">1</div>
                  <h4 className="font-bold text-white mb-1">Plot Dimensions</h4>
                  <p className="text-xs text-navy-200/60">Length & breadth in feet or meters (e.g. 30x40, 25x50).</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-center">
                  <div className="text-orange-400 font-black text-2xl mb-2">2</div>
                  <h4 className="font-bold text-white mb-1">Facing Direction</h4>
                  <p className="text-xs text-navy-200/60">Direction the road faces (North, East, South, or West).</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-center">
                  <div className="text-orange-400 font-black text-2xl mb-2">3</div>
                  <h4 className="font-bold text-white mb-1">BHK & Floors</h4>
                  <p className="text-xs text-navy-200/60">Ground floor, G+1, number of bedrooms and attached baths.</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-center">
                  <div className="text-orange-400 font-black text-2xl mb-2">4</div>
                  <h4 className="font-bold text-white mb-1">Special Needs</h4>
                  <p className="text-xs text-navy-200/60">Puja room, car porch, open terrace, or rental portion.</p>
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
