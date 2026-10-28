"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Sparkles,
  Play,
  Pause,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import EstimateFormSection from "@/components/EstimateFormSection";
import ShowcaseModal from "@/components/ShowcaseModal";
import { ShowcaseCardItem } from "@/components/ShowcaseCardItem";
import { showcaseItems, siteConfig } from "@/data/siteData";
import { ShowcaseItem } from "@/types";

export default function ShowcasePage() {
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isAutoplayEnabled, setIsAutoplayEnabled] = useState(true);

  // Modal State
  const [selectedProject, setSelectedProject] = useState<ShowcaseItem | null>(null);
  const [activeGalleryImage, setActiveGalleryImage] = useState<string>("");
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);

  // Sync browser back button so back gesture/button closes modal instead of exiting site
  useEffect(() => {
    if (selectedProject) {
      window.history.pushState({ modalOpen: true }, "");
      const handlePopState = () => {
        setSelectedProject(null);
        setShowVideoPlayer(false);
      };
      window.addEventListener("popstate", handlePopState);
      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }
  }, [selectedProject]);

  const handleOpenModal = useCallback((item: ShowcaseItem, activeImg?: string) => {
    setSelectedProject(item);
    setActiveGalleryImage(activeImg || item.image);
    setShowVideoPlayer(false);
  }, []);

  const handleCloseModal = useCallback(() => {
    if (typeof window !== "undefined" && window.history.state?.modalOpen) {
      window.history.back();
    } else {
      setSelectedProject(null);
      setShowVideoPlayer(false);
    }
  }, []);

  const handleInquire = useCallback((title: string) => {
    const url = siteConfig.getWhatsAppUrl(
      `Hi CINORS, I am interested in learning more about the design and blueprints for: ${title}.`
    );
    window.open(url, "_blank");
  }, []);

  const handleNextImage = useCallback(() => {
    if (!selectedProject?.gallery || selectedProject.gallery.length <= 1) return;
    const gallery = selectedProject.gallery;
    const currentIndex = gallery.indexOf(activeGalleryImage);
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % gallery.length;
    setActiveGalleryImage(gallery[nextIndex]);
  }, [selectedProject, activeGalleryImage]);

  const handlePrevImage = useCallback(() => {
    if (!selectedProject?.gallery || selectedProject.gallery.length <= 1) return;
    const gallery = selectedProject.gallery;
    const currentIndex = gallery.indexOf(activeGalleryImage);
    const prevIndex = currentIndex <= 0 ? gallery.length - 1 : currentIndex - 1;
    setActiveGalleryImage(gallery[prevIndex]);
  }, [selectedProject, activeGalleryImage]);

  const categories = ["All", "Residential", "Commercial", "Interior"];

  const filteredItems = showcaseItems.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.tag?.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      <Navbar onOpenModal={() => setIsConsultModalOpen(true)} />

      <main className="flex-grow pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 lg:py-24 border-b border-slate-800/80 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(249,115,22,0.15),rgba(255,255,255,0))] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-6">
              <Sparkles className="w-4 h-4" />
              Engineered Blueprints & 3D Visualization
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
              Architectural & Structural <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                Design Portfolio
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              Explore our completed residential villas, Vastu floor plans, tensile carports, and commercial projects across Tamil Nadu. Swipe through multi-angle views and 3D architectural renders.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setIsConsultModalOpen(true)}
                className="px-8 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold transition-all shadow-lg shadow-orange-500/25 flex items-center gap-2 group"
              >
                Plan Your House With Us
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href={siteConfig.getWhatsAppUrl("Hi CINORS, I saw your showcase portfolio and want to discuss blueprints for my plot.")}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 transition-all"
              >
                Inquire on WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Filter Controls & Showcase Grid */}
        <section className="py-16 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
              <div className="flex flex-wrap items-center gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      selectedCategory === cat
                        ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25"
                        : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Autoplay Toggle */}
              <button
                onClick={() => setIsAutoplayEnabled(!isAutoplayEnabled)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-all"
                title="Toggle gallery slideshow autoplay"
              >
                {isAutoplayEnabled ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-orange-400" />
                    <span>Autoplay Active</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-slate-400" />
                    <span>Autoplay Paused</span>
                  </>
                )}
              </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item, index) => (
                <ShowcaseCardItem
                  key={item.id}
                  item={item}
                  index={index}
                  isAutoplayEnabled={isAutoplayEnabled}
                  onOpenModal={handleOpenModal}
                  onInquire={handleInquire}
                />
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-20 text-slate-400">
                <p>No projects found in this category.</p>
              </div>
            )}
          </div>
        </section>

        {/* Estimate Form Section */}
        <EstimateFormSection onOpenConsultation={() => setIsConsultModalOpen(true)} />
      </main>

      {/* Modal View */}
      <ShowcaseModal
        item={selectedProject}
        activeGalleryImage={activeGalleryImage}
        showVideoPlayer={showVideoPlayer}
        onClose={handleCloseModal}
        onSelectImage={setActiveGalleryImage}
        onToggleVideo={setShowVideoPlayer}
        onNextImage={handleNextImage}
        onPrevImage={handlePrevImage}
      />

      <Footer />
      <FloatingWhatsApp />
      <ConsultationModal isOpen={isConsultModalOpen} onClose={() => setIsConsultModalOpen(false)} />
    </div>
  );
}
