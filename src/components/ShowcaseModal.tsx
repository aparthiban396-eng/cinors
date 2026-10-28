"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, ChevronLeft, ChevronRight, Layers, ArrowUpRight } from "lucide-react";
import { ShowcaseItem } from "@/types";
import { siteConfig } from "@/data/siteData";

interface ShowcaseModalProps {
  item: ShowcaseItem | null;
  activeGalleryImage: string;
  showVideoPlayer: boolean;
  onClose: () => void;
  onSelectImage: (img: string) => void;
  onToggleVideo: (show: boolean) => void;
  onNextImage: () => void;
  onPrevImage: () => void;
}

export default function ShowcaseModal({
  item,
  activeGalleryImage,
  showVideoPlayer,
  onClose,
  onSelectImage,
  onToggleVideo,
  onNextImage,
  onPrevImage,
}: ShowcaseModalProps) {
  const modalTouchStartX = useRef<number | null>(null);
  const modalTouchStartY = useRef<number | null>(null);

  const handleModalTouchStart = (e: React.TouchEvent) => {
    modalTouchStartX.current = e.touches[0].clientX;
    modalTouchStartY.current = e.touches[0].clientY;
  };

  const handleModalTouchEnd = (e: React.TouchEvent) => {
    if (modalTouchStartX.current === null || modalTouchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - modalTouchStartX.current;
    const deltaY = e.changedTouches[0].clientY - modalTouchStartY.current;
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 35) {
      if (deltaX < 0) {
        onNextImage();
      } else {
        onPrevImage();
      }
    }
    modalTouchStartX.current = null;
    modalTouchStartY.current = null;
  };

  if (!item) return null;

  const currentDisplayImage = activeGalleryImage || item.image;
  const gallery = item.gallery || [item.image];
  const currentIndex = Math.max(1, gallery.indexOf(currentDisplayImage) + 1);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-navy-950/70 backdrop-blur-sm"
        />
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-100 z-10 max-h-[92vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-navy-400 hover:text-navy-950 hover:bg-navy-50 rounded-full transition-all z-30 bg-white/80 backdrop-blur shadow-sm cursor-pointer"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* MAIN MEDIA PREVIEW WITH SWIPE & DRAG SUPPORT */}
          <div
            className="relative w-full h-[260px] sm:h-[420px] bg-slate-950 flex items-center justify-center overflow-hidden touch-pan-y select-none"
            onTouchStart={handleModalTouchStart}
            onTouchEnd={handleModalTouchEnd}
          >
            {showVideoPlayer && item.video ? (
              <video
                key={item.video}
                controls
                autoPlay
                playsInline
                preload="metadata"
                className="w-full h-full object-contain bg-black"
              >
                <source src={item.video} type="video/mp4" />
                Your browser does not support HTML5 video.
              </video>
            ) : (
              <>
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={currentDisplayImage}
                    drag={gallery.length > 1 ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.25}
                    onDragEnd={(_e, { offset, velocity }) => {
                      if (offset.x < -35 || velocity.x < -250) {
                        onNextImage();
                      } else if (offset.x > 35 || velocity.x > 250) {
                        onPrevImage();
                      }
                    }}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
                  >
                    <Image
                      src={currentDisplayImage}
                      alt={item.title}
                      fill
                      className="object-contain pointer-events-none select-none"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* SWIPE NAVIGATION BUTTONS */}
                {!showVideoPlayer && gallery.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onPrevImage();
                      }}
                      className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-navy-950/75 hover:bg-orange-500 text-white flex items-center justify-center transition-all z-20 backdrop-blur shadow-xl active:scale-90 border border-white/10 cursor-pointer"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onNextImage();
                      }}
                      className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-navy-950/75 hover:bg-orange-500 text-white flex items-center justify-center transition-all z-20 backdrop-blur shadow-xl active:scale-90 border border-white/10 cursor-pointer"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>

                    {/* Swipe Indicator Pill */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 bg-navy-950/80 backdrop-blur px-3 py-1 rounded-full text-white text-[11px] font-bold border border-white/10 flex items-center gap-1.5 shadow-lg pointer-events-none">
                      <Layers className="w-3 h-3 text-orange-400" />
                      <span>
                        {currentIndex} / {gallery.length}
                      </span>
                      <span className="text-white/40 text-[10px] hidden sm:inline">• Swipe to view</span>
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          {/* MEDIA & GALLERY THUMBNAILS */}
          {((item.gallery && item.gallery.length > 1) || item.video) && (
            <div className="p-3 bg-slate-100 border-b border-slate-200 flex items-center gap-2.5 overflow-x-auto">
              {item.video && (
                <button
                  onClick={() => onToggleVideo(true)}
                  className={`relative px-3.5 py-2.5 rounded-md shrink-0 transition-all font-bold text-xs flex items-center gap-2 border-2 cursor-pointer ${
                    showVideoPlayer
                      ? "bg-orange-500 text-white border-orange-500 shadow-md"
                      : "bg-white text-navy-950 border-slate-200 hover:border-orange-500"
                  }`}
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Play Walkthrough</span>
                </button>
              )}
              {item.gallery &&
                item.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      onToggleVideo(false);
                      onSelectImage(img);
                    }}
                    className={`relative w-20 h-14 sm:w-24 sm:h-16 rounded-md overflow-hidden shrink-0 transition-all border-2 cursor-pointer ${
                      !showVideoPlayer && currentDisplayImage === img
                        ? "border-orange-500 scale-105 shadow-md"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt={`Angle View ${idx + 1}`} fill className="object-cover" />
                    <span className="absolute bottom-1 right-1 text-[9px] font-black bg-navy-950/80 text-white px-1 rounded">
                      0{idx + 1}
                    </span>
                  </button>
                ))}
            </div>
          )}

          {/* MODAL CONTENT */}
          <div className="p-5 sm:p-7 space-y-5">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">
                  {item.category}
                </span>
                {item.dimensions && (
                  <span className="text-xs px-2.5 py-0.5 rounded bg-slate-100 text-navy-900 font-bold">
                    {item.dimensions}
                  </span>
                )}
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-navy-950 tracking-tight">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-navy-900/70 mt-2 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* SPECS LIST */}
            {item.specs && item.specs.length > 0 && (
              <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50">
                <div className="px-4 py-2.5 bg-slate-100/80 border-b border-slate-200 text-xs font-bold text-navy-950 uppercase tracking-wider">
                  Technical & Structural Specifications
                </div>
                <div className="divide-y divide-slate-200/80 text-xs">
                  {item.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="grid grid-cols-1 sm:grid-cols-3 p-3 gap-1">
                      <span className="font-bold text-navy-900/70">{spec.label}</span>
                      <span className="sm:col-span-2 text-navy-950 font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-navy-900/60 font-medium">
                Have a similar commercial site, plot or villa to design?
              </span>
              <a
                href={siteConfig.getWhatsAppUrl(`Inquiry regarding ${item.title}`)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 bg-orange-500 text-white rounded-lg text-sm font-bold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 active:scale-95 text-center"
              >
                Consult Engineer On WhatsApp <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
