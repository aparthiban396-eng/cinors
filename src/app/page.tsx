"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  AlertTriangle,
  X,
  ChevronDown,
  Check,
  ShieldCheck,
  Star,
  PenLine,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ConsultationModal from "@/components/ConsultationModal";
import ReviewModal from "@/components/ReviewModal";
import ShowcaseModal from "@/components/ShowcaseModal";
import { ShowcaseCardItem } from "@/components/ShowcaseCardItem";
import EstimateFormSection from "@/components/EstimateFormSection";

import {
  siteConfig,
  trustCards,
  services,
  processSteps,
  showcaseItems,
  faqs,
  initialReviews,
} from "@/data/siteData";
import { ShowcaseItem, Review } from "@/types";

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const [selectedShowcaseItem, setSelectedShowcaseItem] = useState<ShowcaseItem | null>(null);
  const [activeGalleryImage, setActiveGalleryImage] = useState<string>("");
  const [showVideoPlayer, setShowVideoPlayer] = useState<boolean>(false);
  const [activeShowcaseTag, setActiveShowcaseTag] = useState<string>("All");
  const [isAutoplayEnabled] = useState<boolean>(true);

  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  // History & Back button management: closing modal on back instead of leaving website
  const isPopstateClosingRef = useRef(false);

  const handleOpenShowcaseModal = useCallback((item: ShowcaseItem, activeImg?: string) => {
    setSelectedShowcaseItem(item);
    setShowVideoPlayer(Boolean(item.video));
    setActiveGalleryImage(activeImg || (item.gallery ? item.gallery[0] : item.image));
    if (typeof window !== "undefined") {
      window.history.pushState({ modal: "showcase", id: item.id }, "", `#project-${item.id}`);
    }
  }, []);

  const handleCloseShowcaseModal = useCallback(() => {
    setSelectedShowcaseItem(null);
    if (typeof window !== "undefined" && window.location.hash.startsWith("#project-")) {
      if (!isPopstateClosingRef.current) {
        window.history.back();
      }
    }
  }, []);

  const handleOpenConsultationModal = useCallback(() => {
    setIsModalOpen(true);
    if (typeof window !== "undefined") {
      window.history.pushState({ modal: "consultation" }, "", "#consultation");
    }
  }, []);

  const handleCloseConsultationModal = useCallback(() => {
    setIsModalOpen(false);
    if (typeof window !== "undefined" && window.location.hash === "#consultation") {
      if (!isPopstateClosingRef.current) {
        window.history.back();
      }
    }
  }, []);

  const handleOpenReviewModal = useCallback(() => {
    setIsReviewModalOpen(true);
    if (typeof window !== "undefined") {
      window.history.pushState({ modal: "review" }, "", "#review");
    }
  }, []);

  const handleCloseReviewModal = useCallback(() => {
    setIsReviewModalOpen(false);
    if (typeof window !== "undefined" && window.location.hash === "#review") {
      if (!isPopstateClosingRef.current) {
        window.history.back();
      }
    }
  }, []);

  const handleAddReview = useCallback((newReview: Review) => {
    setReviews((prev) => [newReview, ...prev]);
  }, []);

  // Popstate listener: closes open modal on browser/phone back button without exiting the website
  useEffect(() => {
    const handlePopState = () => {
      isPopstateClosingRef.current = true;
      setSelectedShowcaseItem(null);
      setIsModalOpen(false);
      setIsReviewModalOpen(false);
      setTimeout(() => {
        isPopstateClosingRef.current = false;
      }, 100);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Modal gallery image navigation
  const handleNextShowcaseImage = useCallback(() => {
    if (!selectedShowcaseItem?.gallery || selectedShowcaseItem.gallery.length <= 1) return;
    setShowVideoPlayer(false);
    setActiveGalleryImage((prev) => {
      const gallery = selectedShowcaseItem.gallery!;
      const currentIdx = gallery.indexOf(prev);
      const nextIdx = currentIdx === -1 ? 1 : (currentIdx + 1) % gallery.length;
      return gallery[nextIdx];
    });
  }, [selectedShowcaseItem]);

  const handlePrevShowcaseImage = useCallback(() => {
    if (!selectedShowcaseItem?.gallery || selectedShowcaseItem.gallery.length <= 1) return;
    setShowVideoPlayer(false);
    setActiveGalleryImage((prev) => {
      const gallery = selectedShowcaseItem.gallery!;
      const currentIdx = gallery.indexOf(prev);
      const prevIdx = currentIdx === -1 ? gallery.length - 1 : (currentIdx - 1 + gallery.length) % gallery.length;
      return gallery[prevIdx];
    });
  }, [selectedShowcaseItem]);

  // Autoplay inside modal
  useEffect(() => {
    if (!isAutoplayEnabled || !selectedShowcaseItem || showVideoPlayer) return;
    const gallery = selectedShowcaseItem.gallery;
    if (gallery && gallery.length > 1) {
      const interval = setInterval(() => {
        setActiveGalleryImage((prev) => {
          const currentIdx = gallery.indexOf(prev);
          const nextIdx = currentIdx === -1 ? 1 : (currentIdx + 1) % gallery.length;
          return gallery[nextIdx];
        });
      }, 3500);
      return () => clearInterval(interval);
    }
  }, [isAutoplayEnabled, selectedShowcaseItem, showVideoPlayer]);

  // Before/After Slider Interaction
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isUserActive, setIsUserActive] = useState(false);
  const userIdleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const phaseRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    let lastTime = performance.now();

    const animateSlider = (currentTime: number) => {
      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      if (!isDragging && !isUserActive) {
        phaseRef.current += 0.95 * delta;
        const targetPos = 50 + 28 * Math.sin(phaseRef.current);

        setSliderPosition((prev) => {
          const diff = targetPos - prev;
          if (Math.abs(diff) < 0.05) return targetPos;
          return prev + diff * Math.min(1, delta * 3.2);
        });
      }

      animFrameRef.current = requestAnimationFrame(animateSlider);
    };

    animFrameRef.current = requestAnimationFrame(animateSlider);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isDragging, isUserActive]);

  const handleMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleStartInteraction = () => {
    setIsDragging(true);
    setIsUserActive(true);
    if (userIdleTimerRef.current) clearTimeout(userIdleTimerRef.current);
  };

  const handleEndInteraction = () => {
    setIsDragging(false);
    if (userIdleTimerRef.current) clearTimeout(userIdleTimerRef.current);
    userIdleTimerRef.current = setTimeout(() => {
      setIsUserActive(false);
    }, 2200);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (e.touches.length > 0) handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const onUp = () => handleEndInteraction();
    window.addEventListener("mouseup", onUp);
    return () => window.removeEventListener("mouseup", onUp);
  }, []);

  const triggerQuickWhatsApp = useCallback((context: string) => {
    const message = `Hi CINORS, I am interested in your ${context}. I would like to schedule a free consultation for my house planning.`;
    window.open(siteConfig.getWhatsAppUrl(message), "_blank");
  }, []);

  const filteredShowcaseItems = showcaseItems.filter((item) => {
    if (activeShowcaseTag === "All") return true;
    return item.tag?.toLowerCase() === activeShowcaseTag.toLowerCase();
  });

  return (
    <div className="relative min-h-screen selection:bg-orange-500 selection:text-white overflow-x-hidden font-sans">
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-navy-50/40 to-transparent -z-10 pointer-events-none" />

      {/* GLOBAL NAVBAR */}
      <Navbar onOpenModal={handleOpenConsultationModal} />

      {/* HERO SECTION */}
      <section className="relative min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-80px)] flex items-center py-10 md:py-20 lg:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-50 border border-navy-100 text-navy-950 font-bold text-xs uppercase tracking-widest mb-5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              Serving All Over Tamil Nadu
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black text-navy-950 tracking-tight leading-[1.08] mb-5"
            >
              Bought A Plot & <br className="hidden sm:inline" />
              <span className="text-orange-500">Don&apos;t Know</span> <br />
              Where To Start?
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm sm:text-lg text-navy-900/70 max-w-xl mb-7 leading-relaxed"
            >
              We help transform your empty plot into a well-planned, construction-ready home with professional floor plans, safety-assured structural drawings, and photorealistic 3D designs.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
            >
              <button
                onClick={handleOpenConsultationModal}
                className="px-6 sm:px-8 py-3.5 sm:py-4 bg-orange-500 text-white rounded-md font-bold text-sm sm:text-base hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/25 flex items-center justify-center gap-2 group active:scale-98"
              >
                Get Free Consultation <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <Link
                href="/services/"
                className="px-6 sm:px-8 py-3.5 sm:py-4 border border-navy-200 bg-white/50 backdrop-blur text-navy-950 rounded-md font-bold text-sm sm:text-base hover:bg-navy-50 hover:border-navy-300 transition-all text-center flex items-center justify-center"
              >
                View Services
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 grid grid-cols-3 gap-3 sm:gap-8 pt-6 border-t border-navy-100 w-full max-w-xl"
            >
              <div>
                <span className="block font-black text-base sm:text-2xl text-navy-950">100%</span>
                <span className="block text-[10px] sm:text-xs text-navy-900/60 font-semibold uppercase tracking-wider mt-0.5 leading-tight">
                  Vastu Friendly
                </span>
              </div>
              <div>
                <span className="block font-black text-base sm:text-2xl text-navy-950">Safe</span>
                <span className="block text-[10px] sm:text-xs text-navy-900/60 font-semibold uppercase tracking-wider mt-0.5 leading-tight">
                  Certified Structural
                </span>
              </div>
              <div>
                <span className="block font-black text-base sm:text-2xl text-navy-950">Tamil Nadu</span>
                <span className="block text-[10px] sm:text-xs text-navy-900/60 font-semibold uppercase tracking-wider mt-0.5 leading-tight">
                  Full Coverage
                </span>
              </div>
            </motion.div>
          </div>

          {/* BEFORE/AFTER SLIDER */}
          <div className="lg:col-span-6 flex justify-center relative w-full h-[280px] sm:h-[420px] lg:h-[500px]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:32px_32px] opacity-40 -z-10 rounded-2xl" />
            <div
              ref={sliderRef}
              onMouseMove={handleMouseMove}
              onMouseDown={handleStartInteraction}
              onMouseUp={handleEndInteraction}
              onTouchMove={handleTouchMove}
              onTouchStart={handleStartInteraction}
              onTouchEnd={handleEndInteraction}
              className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white select-none cursor-ew-resize"
              style={{ touchAction: "none" }}
            >
              {/* BOTTOM LAYER: Dream Home */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src="/images/dream-home.png"
                  alt="Transformed Modern Dream Home"
                  fill
                  className="object-cover pointer-events-none"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute bottom-4 right-4 bg-navy-950/90 text-white px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider backdrop-blur-sm border border-white/10">
                  Modern Dream Home
                </div>
              </div>

              {/* TOP LAYER: Empty Plot */}
              <div
                className="absolute inset-0 w-full h-full overflow-hidden"
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
              >
                <Image
                  src="/images/empty-plot.png"
                  alt="Vacant Plot of Land"
                  fill
                  className="object-cover pointer-events-none"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-navy-950/10 pointer-events-none">
                  <div className="absolute top-10 left-10 border-l border-t border-dashed border-orange-500/80 pl-2 pt-1">
                    <span className="text-[10px] sm:text-xs font-bold text-orange-500 bg-white/95 px-1 py-0.5 rounded border border-orange-200">
                      BOUNDARY: 40 FT
                    </span>
                  </div>
                  <div className="absolute bottom-14 left-20 border-b border-r border-dashed border-orange-500/80 pr-2 pb-1">
                    <span className="text-[10px] sm:text-xs font-bold text-orange-500 bg-white/95 px-1 py-0.5 rounded border border-orange-200">
                      WIDTH: 30 FT
                    </span>
                  </div>
                  <div className="absolute top-1/3 left-1/3 p-2 bg-navy-950/80 text-white rounded border border-white/20 backdrop-blur-xs flex flex-col gap-0.5">
                    <span className="text-[9px] font-bold text-orange-400">STAGE 01</span>
                    <span className="text-[11px] font-extrabold">VACANT PLOT</span>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-orange-500 text-white px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider border border-orange-600">
                  Your Vacant Plot
                </div>
              </div>

              {/* SLIDER HANDLE & LASER SCAN LINE */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white z-20 pointer-events-none shadow-[0_0_14px_rgba(249,115,22,0.85)]"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-orange-500 via-white to-orange-500 opacity-90 animate-pulse" />
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-white shadow-2xl border-2 border-orange-500 flex items-center justify-center pointer-events-auto cursor-ew-resize hover:scale-115 active:scale-95 transition-all">
                  {!isDragging && !isUserActive && (
                    <div className="absolute -inset-2 rounded-full bg-orange-500/30 animate-ping pointer-events-none" />
                  )}
                  <div className="flex items-center gap-0.5 text-orange-500 font-black text-xs select-none">
                    <span>&lt;</span>
                    <span className="w-1 h-3 bg-orange-500/30 rounded-full mx-0.5" />
                    <span>&gt;</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY US SECTION */}
      <section id="why-us" className="py-16 sm:py-20 bg-navy-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.1),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-xs font-black uppercase text-orange-500 tracking-widest mb-3">
              Guaranteed Safety & Planning
            </h2>
            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Why Homeowners Choose CINORS
            </h3>
            <div className="w-16 h-1 bg-orange-500 mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {trustCards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 sm:p-8 rounded-xl glass-dark-card hover:border-orange-500/40 hover:bg-navy-900/80 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-5 group-hover:bg-orange-500/10 transition-colors">
                  {card.icon}
                </div>
                <h4 className="text-lg sm:text-xl font-bold mb-3 tracking-tight group-hover:text-orange-400 transition-colors">
                  {card.title}
                </h4>
                <p className="text-sm text-navy-100/70 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/why-us/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm transition-all shadow-lg shadow-orange-500/25"
            >
              Explore Why Us Comparison & Credentials <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES HIGHLIGHT */}
      <section id="services" className="py-16 sm:py-20 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-xs font-black uppercase text-orange-500 tracking-widest mb-3">
              Professional Blueprints
            </h2>
            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-navy-950">
              Our Design & Engineering Services
            </h3>
            <div className="w-16 h-1 bg-orange-500 mx-auto mt-4" />
            <p className="text-navy-900/60 mt-4 text-sm sm:text-base">
              From initial Vastu-compliant layouts to ready-to-execute structural blueprints.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="p-6 sm:p-8 rounded-xl bg-white border border-slate-200/80 hover:border-orange-500/30 hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-orange-500 scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-300" />
                <div className="w-14 h-14 rounded-lg bg-navy-50/50 flex items-center justify-center mb-5 group-hover:bg-orange-500/10 transition-colors">
                  {service.icon}
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-navy-950 mb-3 tracking-tight group-hover:text-orange-500 transition-colors">
                  {service.title}
                </h4>
                <p className="text-sm text-navy-900/60 leading-relaxed mb-5">{service.description}</p>
                <Link
                  href="/services/"
                  className="inline-flex items-center gap-1 text-xs font-bold text-orange-500 hover:text-orange-600 transition-colors uppercase tracking-wider"
                >
                  View Details & Deliverables <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/services/"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-navy-950 hover:bg-navy-900 text-white font-bold text-sm transition-all"
            >
              Explore Full Breakdown of All Services <ArrowRight className="w-4 h-4 text-orange-400" />
            </Link>
          </div>
        </div>
      </section>

      {/* PROBLEM / SOLUTION COMPARISON */}
      <section className="py-16 sm:py-20 bg-white border-y border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-xs font-black uppercase text-orange-500 tracking-widest mb-3">
              Pre-Construction Safety
            </h2>
            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-navy-950">
              Avoid Costly Mistakes Before Construction
            </h3>
            <div className="w-16 h-1 bg-orange-500 mx-auto mt-4" />
            <p className="text-navy-900/60 mt-4 text-sm sm:text-base">
              Correcting architectural or structural errors during building is 10x more expensive.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
            {/* LEFT CARD: CRITICAL RISKS */}
            <div className="p-6 sm:p-8 rounded-2xl bg-red-50/40 border border-red-200/90 relative overflow-hidden flex flex-col justify-between h-full shadow-xs">
              <div>
                <span className="px-3 py-1 rounded bg-red-600 text-white font-bold text-[10px] uppercase tracking-wider inline-flex items-center gap-1.5">
                  <AlertTriangle className="w-3 h-3" /> The Expensive Risks
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-navy-950 mt-4 mb-3 tracking-tight leading-snug">
                  Critical Risks of Unplanned Construction
                </h4>
                <p className="text-xs sm:text-sm text-navy-900/70 mb-6 leading-relaxed">
                  Building without verified engineering drawings leads to unfixable structural defects, wasted living areas, and huge budget overruns.
                </p>
                <div className="space-y-3.5">
                  {[
                    {
                      title: "Weak Foundations & Structural Cracks",
                      desc: "Uncalculated column spans and incorrect reinforcement cause building cracks and slab sagging.",
                    },
                    {
                      title: "Defective Room Layouts & Dark Zones",
                      desc: "Poor spatial zoning compromises cross-ventilation, natural sunlight, and family privacy.",
                    },
                    {
                      title: "Wasted Plot Space & Dead Passages",
                      desc: "Inefficient circulation routes create dark unusable corners while inflating square-foot costs.",
                    },
                    {
                      title: "Unexpected Material & Budget Overruns",
                      desc: "Blind contractor estimations result in 15% to 25% budget overshoots and costly site reworks.",
                    },
                  ].map((risk, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-xl bg-white/90 border border-red-100 shadow-xs"
                    >
                      <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                        <X className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <div>
                        <h5 className="font-bold text-xs sm:text-sm text-navy-950 leading-tight">
                          {risk.title}
                        </h5>
                        <p className="text-[11px] text-navy-900/60 mt-0.5 leading-snug">{risk.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-7 pt-6 border-t border-red-200/70 flex items-center justify-between gap-4 flex-wrap bg-red-100/40 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-4 sm:p-5 rounded-b-2xl">
                <div className="flex items-center gap-2 text-xs font-bold text-red-700">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>Site Modification Penalty:</span>
                </div>
                <span className="text-xs font-black text-red-700 bg-white px-2.5 py-1 rounded border border-red-200 shadow-xs">
                  10x Higher Than Pre-Planning
                </span>
              </div>
            </div>

            {/* RIGHT CARD: THE SOLUTION */}
            <div className="p-6 sm:p-8 rounded-2xl bg-navy-950 text-white relative overflow-hidden flex flex-col justify-between h-full shadow-xl">
              <div>
                <span className="px-3 py-1 rounded bg-orange-500 text-white font-bold text-[10px] uppercase tracking-wider inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-3 h-3" /> The Engineering Solution
                </span>
                <h4 className="text-xl sm:text-2xl font-black mt-4 mb-3 tracking-tight leading-snug">
                  CINORS Helps You Build With Confidence
                </h4>
                <p className="text-xs sm:text-sm text-navy-100/70 mb-6 leading-relaxed">
                  By providing clear 2D layouts, load-calculated structural drawings, and fully documented construction guides, we secure your building process from Day 1.
                </p>
                <div className="space-y-3.5">
                  {[
                    {
                      title: "100% Vastu & Directional Compliance",
                      desc: "Scientific room zoning aligned with natural light, wind circulation, and traditional vastu principles.",
                    },
                    {
                      title: "Certified Column & Foundation Detailing",
                      desc: "Earthquake-resilient structural drawings with steel bar schedules ready for site engineers.",
                    },
                    {
                      title: "Pre-Defined Material & Cost Estimations",
                      desc: "Eliminates surprise site expenditures and helps save 12% to 15% on overall construction costs.",
                    },
                    {
                      title: "Complete Blueprint Package Handover",
                      desc: "Receive working architectural, structural, plumbing, and electrical drawings in 3 to 5 business days.",
                    },
                  ].map((sol, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-xl bg-navy-900/90 border border-navy-800 shadow-xs"
                    >
                      <div className="w-5 h-5 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <div>
                        <h5 className="font-bold text-xs sm:text-sm text-white leading-tight">
                          {sol.title}
                        </h5>
                        <p className="text-[11px] text-navy-200/70 mt-0.5 leading-snug">{sol.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-7 pt-6 border-t border-navy-800 flex items-center justify-between gap-4 flex-wrap bg-navy-900/60 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-4 sm:p-5 rounded-b-2xl">
                <div className="flex items-center gap-2 text-xs font-bold text-orange-400">
                  <ShieldCheck className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>CINORS Guarantee:</span>
                </div>
                <span className="text-xs font-black text-white bg-orange-500 px-2.5 py-1 rounded shadow-xs">
                  Zero Structural Surprises
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS WORKFLOW PREVIEW */}
      <section id="process" className="py-16 sm:py-20 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-xs font-black uppercase text-orange-500 tracking-widest mb-3">
              Simple 4 Steps
            </h2>
            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-navy-950">
              How It Works
            </h3>
            <div className="w-16 h-1 bg-orange-500 mx-auto mt-4" />
            <p className="text-navy-900/60 mt-4 text-sm sm:text-base">
              A streamlined, fast delivery process to get your home ready for construction in 3–5 days.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {processSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-white border border-slate-200 flex flex-col justify-between relative group hover:shadow-lg transition-all"
              >
                <div>
                  <span className="text-3xl font-black text-orange-500/20 group-hover:text-orange-500 transition-colors">
                    {step.step}
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-navy-950 mt-3 mb-2 tracking-tight">
                    {step.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-navy-900/60 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/process/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm transition-all shadow-lg shadow-orange-500/25"
            >
              See Our Detailed Process & Timeline <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SHOWCASE HIGHLIGHTS */}
      <section id="showcase" className="py-16 sm:py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
            <div>
              <h2 className="text-xs font-black uppercase text-orange-500 tracking-widest mb-3">
                Curated Work
              </h2>
              <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-navy-950">
                Design & Architectural Showcase
              </h3>
              <p className="text-navy-900/60 mt-2 text-sm sm:text-base">
                Swipe through multi-angle views and 3D architectural renders.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {["All", "Residential", "Commercial", "Interior"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveShowcaseTag(tag)}
                  className={`px-4 py-2 rounded text-xs font-bold transition-all ${
                    activeShowcaseTag === tag
                      ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                      : "bg-slate-100 text-navy-900/70 hover:bg-slate-200"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredShowcaseItems.slice(0, 6).map((item, index) => (
              <ShowcaseCardItem
                key={item.id}
                item={item}
                index={index}
                isAutoplayEnabled={isAutoplayEnabled}
                onOpenModal={handleOpenShowcaseModal}
                onInquire={(title) => triggerQuickWhatsApp(title)}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/showcase/"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-navy-950 hover:bg-navy-900 text-white font-bold text-sm transition-all"
            >
              Explore All Projects In Full Portfolio <ArrowRight className="w-4 h-4 text-orange-400" />
            </Link>
          </div>
        </div>
      </section>

      {/* ESTIMATE FORM SECTION */}
      <div id="get-quote">
        <EstimateFormSection onOpenConsultation={handleOpenConsultationModal} />
      </div>

      {/* REVIEWS PREVIEW */}
      <section id="reviews" className="py-16 sm:py-20 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-xs font-black uppercase text-orange-500 tracking-widest mb-3">
                Client Trust
              </h2>
              <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-navy-950">
                What Homeowners Say
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleOpenReviewModal}
                className="px-4 py-2 bg-orange-500 text-white rounded text-xs font-bold hover:bg-orange-600 transition-all shadow-md shadow-orange-500/15 flex items-center gap-1.5"
              >
                <PenLine className="w-3.5 h-3.5" /> Write a Review
              </button>
              <Link
                href="/reviews/"
                className="px-4 py-2 border border-navy-200 text-navy-950 rounded text-xs font-bold hover:bg-white transition-all"
              >
                View All Reviews
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((review, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-white border border-slate-200 flex flex-col justify-between shadow-xs hover:border-orange-500/30 transition-all"
              >
                <div>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-orange-500 fill-orange-500" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-navy-900/70 leading-relaxed mb-6 italic">
                    &quot;{review.comment}&quot;
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-xs sm:text-sm text-navy-950">{review.name}</h5>
                    <span className="text-[11px] text-navy-900/50 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-orange-500" /> {review.location}
                    </span>
                  </div>
                  <span className="text-[10px] text-navy-900/40 font-semibold">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ PREVIEW */}
      <section id="faq" className="py-16 sm:py-20 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-xs font-black uppercase text-orange-500 tracking-widest mb-3">
              Have Questions?
            </h2>
            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-navy-950">
              Frequently Asked Questions
            </h3>
            <div className="w-16 h-1 bg-orange-500 mx-auto mt-4" />
          </div>

          <div className="space-y-4">
            {faqs.slice(0, 4).map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-lg overflow-hidden transition-all"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-5 text-left font-bold text-sm sm:text-base text-navy-950 flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  {faq.question}
                  <ChevronDown
                    className={`w-4 h-4 text-orange-500 transition-transform duration-300 ${
                      activeFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-5 pb-5 text-xs sm:text-sm text-navy-900/70 border-t border-slate-100 pt-3 leading-relaxed"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/faq/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-navy-950 font-bold text-xs sm:text-sm transition-all"
            >
              Browse All FAQs & Structural Questions <ArrowRight className="w-4 h-4 text-orange-500" />
            </Link>
          </div>
        </div>
      </section>

      {/* GLOBAL FOOTER */}
      <Footer />

      {/* FLOATING WHATSAPP BUTTON */}
      <FloatingWhatsApp />

      {/* MODALS */}
      <ConsultationModal isOpen={isModalOpen} onClose={handleCloseConsultationModal} />
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={handleCloseReviewModal}
        onSubmitReview={handleAddReview}
      />
      <ShowcaseModal
        item={selectedShowcaseItem}
        activeGalleryImage={activeGalleryImage}
        showVideoPlayer={showVideoPlayer}
        onClose={handleCloseShowcaseModal}
        onSelectImage={setActiveGalleryImage}
        onToggleVideo={setShowVideoPlayer}
        onNextImage={handleNextShowcaseImage}
        onPrevImage={handlePrevShowcaseImage}
      />
    </div>
  );
}
