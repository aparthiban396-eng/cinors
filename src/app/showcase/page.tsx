"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Sparkles,
  Play,
  Pause,
  ArrowRight,
  Phone,
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
    <div className="min-h-screen bg-white text-navy-950 font-sans selection:bg-orange-500 selection:text-white">
      <Navbar onOpenConsultation={() => setIsConsultModalOpen(true)} />

      <main>
        {/* Hero Section */}
        <section className="relative py-16 sm:py-24 bg-gradient-to-b from-navy-50/60 to-white overflow-hidden border-b border-navy-100 text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-600 font-bold text-xs uppercase tracking-widest mb-5">
              <Sparkles className="w-4 h-4 text-orange-500" />
              Engineered Blueprints & 3D Visualization
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-navy-950 tracking-tight leading-tight mb-6">
              Architectural & Structural <br />
              <span className="text-orange-500">Design Portfolio</span>
            </h1>
            <p className="text-base sm:text-lg text-navy-900/70 leading-relaxed mb-8 max-w-2xl mx-auto">
              Explore our completed residential villas, Vastu floor plans, tensile carports, and commercial projects across Tamil Nadu. Swipe through multi-angle views and 3D architectural renders.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => setIsConsultModalOpen(true)}
                className="px-8 py-4 bg-orange-500 text-white rounded-md font-bold text-sm sm:text-base hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/25 flex items-center gap-2 active:scale-95 cursor-pointer"
              >
                Plan Your House With Us
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

        {/* Filter Controls & Showcase Grid */}
        <section className="py-16 sm:py-24 bg-slate-50/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
              <div className="flex flex-wrap items-center gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                        : "bg-white text-navy-900 hover:bg-slate-100 border border-slate-200 shadow-xs"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Autoplay Toggle */}
              <button
                onClick={() => setIsAutoplayEnabled(!isAutoplayEnabled)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-navy-900 hover:bg-slate-50 transition-all shadow-xs cursor-pointer"
                title="Toggle gallery slideshow autoplay"
              >
                {isAutoplayEnabled ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-orange-500" />
                    <span>Autoplay Active</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-navy-400" />
                    <span>Autoplay Paused</span>
                  </>
                )}
              </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
              <div className="text-center py-20 text-navy-900/50">
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
