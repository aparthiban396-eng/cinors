"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Layers,
  FileText,
  Compass,
  Home,
  Paintbrush,
  ArrowUpRight,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import EstimateFormSection from "@/components/EstimateFormSection";
import { siteConfig } from "@/data/siteData";

export default function ServicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const detailedServices = [
    {
      id: "floor-plans",
      icon: <Layers className="w-10 h-10 text-orange-500" />,
      title: "2D Floor Planning & Layout Optimization",
      badge: "Vastu 100% Compliant",
      subtitle: "Maximizing every square foot of your plot dimensions",
      description: "We analyze your plot's orientation, setbacks, road frontage, and family requirements to create space-optimized, functional 2D floor plans. Every room is carefully proportioned for optimal ventilation, furniture circulation, and day-lighting.",
      deliverables: [
        "Vastu-compliant room zoning (Puja, Master Bed, Kitchen in Agni corner)",
        "Detailed room dimensions & wall thicknesses",
        "Window & door opening schedules for natural cross-ventilation",
        "Circulation corridors with zero dead-space",
        "Furniture & appliance indicative layouts",
        "Multiple revision drafts until you are 100% satisfied",
      ],
      idealFor: "Plots from 600 sq.ft to 10,000+ sq.ft across urban and suburban Tamil Nadu.",
    },
    {
      id: "structural",
      icon: <FileText className="w-10 h-10 text-orange-500" />,
      title: "Structural Design & Reinforcement Drawings",
      badge: "Safety Assured",
      subtitle: "Engineered to withstand seismic loads & soil variations",
      description: "The backbone of your home. Our licensed structural engineers calculate exact column, beam, footing, and slab reinforcement to prevent foundation settlement, wall cracks, and roof deflections.",
      deliverables: [
        "Isolated / Raft foundation pad layout based on local soil bearing capacity",
        "Column grid coordinates, cross-sections, and vertical rebar schedules",
        "Plinth, lintel, and roof beam reinforcement details",
        "One-way and two-way RCC slab reinforcement layouts",
        "Staircase structural reinforcement & landing beam details",
        "Detailed Bar Bending Schedule (BBS) to control steel wastage on site",
      ],
      idealFor: "G+1, G+2, G+3 villas, independent duplexes, and commercial stilt frames.",
    },
    {
      id: "elevations",
      icon: <Home className="w-10 h-10 text-orange-500" />,
      title: "3D Elevation & Architectural Visualization",
      badge: "Photorealistic HD",
      subtitle: "See your dream home before laying a single brick on site",
      description: "Transform 2D blueprints into breathtaking photorealistic 3D external models. Experiment with exterior finishes, cladding, pergolas, ambient lighting, and jali screens before construction begins.",
      deliverables: [
        "Multiple perspective angles (Front, Eye-Level, Corner Angle, Aerial)",
        "Daytime and dramatic night-lighting illumination renders",
        "Exterior color code suggestions & material palette specifications",
        "Gate, compound wall, and parapet detail concepts",
        "Terrace garden & pergola architectural styling",
        "High-resolution presentation images ready for print and client review",
      ],
      idealFor: "Modern, Contemporary, Traditional Chettinad, and Minimalist facade styles.",
    },
    {
      id: "working",
      icon: <ArrowUpRight className="w-10 h-10 text-orange-500" />,
      title: "Working Construction Drawings",
      badge: "Contractor-Ready",
      subtitle: "Zero confusion on site for your civil contractors",
      description: "Detailed construction working drawings provide exact measurements for masonry contractors, plumbers, and electricians so that every conduit, switch, and pipeline is accurately positioned.",
      deliverables: [
        "Brick masonry center-line drawings with clear offsets",
        "Electrical conduit routing, switchboard heights & lighting point layouts",
        "Plumbing sanitary lines, septic tank / soak pit drainage gradients",
        "Door & window fabrication schedules with material specifications",
        "Compound wall & gate pillar construction details",
        "Site coordinate layout for surveyor boundary pegging",
      ],
      idealFor: "Homeowners looking to prevent on-site contractor mistakes and costly reworks.",
    },
    {
      id: "interiors",
      icon: <Paintbrush className="w-10 h-10 text-orange-500" />,
      title: "Interior Design Concepts & Spatial Planning",
      badge: "Modern Luxury",
      subtitle: "Seamless harmony between exterior architecture and living comfort",
      description: "Bespoke interior planning that considers false ceiling patterns, ambient lighting cove details, modular kitchen ergonomics, TV entertainment units, and custom wardrobe storage.",
      deliverables: [
        "False ceiling gypsum & wooden rafter design layout",
        "Modular kitchen counter heights, hob-chimney ergonomics & pantry layouts",
        "Living & dining partition concepts (louvers, glass, fluted panels)",
        "Master bedroom wardrobe and headboard accent wall concepts",
        "Bathroom wet/dry zoning, vanity details & tile combination guides",
        "Ambient warm-white LED cove & accent spotlight planning",
      ],
      idealFor: "New constructions and complete residential renovation projects.",
    },
    {
      id: "vastu",
      icon: <Compass className="w-10 h-10 text-orange-500" />,
      title: "Vastu-Friendly Layout Consultations",
      badge: "100% Harmonious",
      subtitle: "Ancient spatial science harmonized with modern architecture",
      description: "We balance the 5 elements (Pancha Bhoota) to ensure positive energy flow, natural morning sunlight, and auspicious room placement without compromising modern luxury or practical ventilation.",
      deliverables: [
        "Exact North-South compass orientation analysis",
        "Main entrance doorway placement in auspicious Vastu padas",
        "Kitchen positioning in Southeast (Agni) with East-facing cooking",
        "Master bedroom orientation in Southwest (Kubera corner) for stability",
        "Puja room positioning in Northeast (Ishanya corner) for serenity",
        "Water sump (NE) & septic tank (NW) underground positioning advice",
      ],
      idealFor: "All residential plots regardless of irregular shape or street orientation.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-navy-950 font-sans">
      <Navbar onOpenConsultation={() => setIsModalOpen(true)} />

      {/* HERO BANNER */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-b from-navy-50/60 to-white overflow-hidden border-b border-navy-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-600 font-bold text-xs uppercase tracking-widest mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            Complete Pre-Construction Engineering
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black text-navy-950 tracking-tight leading-tight mb-6"
          >
            Our Architectural & <br />
            <span className="text-orange-500">Structural Engineering</span> Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-navy-900/70 leading-relaxed mb-8 max-w-2xl mx-auto"
          >
            From preliminary Vastu 2D layouts to earthquake-resistant structural blueprints and photorealistic 3D elevations — everything you need before laying a brick on site.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 bg-orange-500 text-white rounded-md font-bold text-sm sm:text-base hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/25 flex items-center gap-2 active:scale-95 cursor-pointer"
            >
              Get Free Consultation <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href={siteConfig.getWhatsAppUrl("Hi CINORS, I want to inquire about your engineering services.")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-navy-200 bg-white text-navy-950 rounded-md font-bold text-sm sm:text-base hover:bg-navy-50 transition-all"
            >
              Direct WhatsApp Inquiry
            </a>
          </motion.div>
        </div>
      </section>

      {/* DETAILED SERVICES LIST */}
      <section className="py-16 sm:py-24 bg-slate-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {detailedServices.map((service, idx) => (
            <motion.div
              key={service.id}
              id={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden hover:border-orange-500/40 transition-all"
            >
              <div className="grid lg:grid-cols-12 gap-8 p-6 sm:p-10 items-start">
                {/* LEFT INFO */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-black uppercase tracking-wider border border-orange-200">
                      {service.badge}
                    </span>
                    <span className="text-xs text-navy-900/50 font-bold uppercase tracking-wider">
                      Service 0{idx + 1}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-navy-50 rounded-xl shrink-0">
                      {service.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-black text-navy-950 tracking-tight">
                        {service.title}
                      </h2>
                      <p className="text-xs sm:text-sm font-semibold text-orange-500 mt-0.5">
                        {service.subtitle}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-navy-900/70 leading-relaxed pt-2">
                    {service.description}
                  </p>
                  <div className="pt-2">
                    <span className="text-xs font-bold text-navy-950 block mb-1 uppercase tracking-wider">
                      Recommended Plot Scope:
                    </span>
                    <p className="text-xs text-navy-900/60 font-medium">
                      {service.idealFor}
                    </p>
                  </div>
                  <div className="pt-4 flex items-center gap-4">
                    <a
                      href={siteConfig.getWhatsAppUrl(`Inquiry regarding ${service.title}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white rounded-md font-bold text-xs hover:bg-orange-600 transition-all shadow-md shadow-orange-500/20 active:scale-95"
                    >
                      Inquire This Service <ArrowUpRight className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="text-xs font-bold text-navy-900 hover:text-orange-500 transition-colors"
                    >
                      Request Free Estimate →
                    </button>
                  </div>
                </div>

                {/* RIGHT DELIVERABLES CHECKLIST */}
                <div className="lg:col-span-5 bg-navy-50/60 rounded-xl p-6 border border-navy-100">
                  <h3 className="text-xs font-black uppercase tracking-widest text-navy-950 mb-4 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-orange-500" /> Key Deliverables
                  </h3>
                  <ul className="space-y-3">
                    {service.deliverables.map((item, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2.5 text-xs text-navy-900/80 leading-snug">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHY OUR ENGINEERING DRAWINGS MATTER */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-black uppercase text-orange-500 tracking-widest mb-3">Civil Engineering Standards</h2>
            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-navy-950">
              Why Building With Proper Drawings Saves You Lakhs
            </h3>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "4rem" }}
              viewport={{ once: false }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="h-1 bg-orange-500 mx-auto mt-4"
            />
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                step: "01. Eliminate Steel & Cement Wastage",
                desc: "Contractors without structural drawings often over-order steel bars or guess beam depths, wasting up to ₹1.5 - ₹3 Lakhs in raw materials.",
              },
              {
                step: "02. Prevent Settlement & Slab Cracks",
                desc: "Soil conditions across Tamil Nadu differ greatly between clay, red soil, and hard rock. Our engineered footings prevent uneven foundation sinking.",
              },
              {
                step: "03. Smooth Panchayat & Municipal Approvals",
                desc: "Accurate setbacks, plot boundary verification, and structural stability certifications make your building permit approval process headache-free.",
              },
            ].map((c, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.45, delay: idx * 0.12 }}
                whileHover={{ y: -6 }}
                className="p-6 rounded-xl bg-slate-50 border border-slate-200 hover:border-orange-500/30 transition-all"
              >
                <h4 className="text-base font-bold text-navy-950 mb-2">{c.step}</h4>
                <p className="text-xs text-navy-900/70 leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* INLINE ESTIMATE FORM */}
      <EstimateFormSection />

      <Footer />
      <FloatingWhatsApp />
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
