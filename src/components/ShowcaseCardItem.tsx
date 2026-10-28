"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Eye, ArrowUpRight, Layers, ChevronLeft, ChevronRight } from "lucide-react";
import { ShowcaseItem } from "@/types";

interface ShowcaseCardItemProps {
  item: ShowcaseItem;
  index: number;
  isAutoplayEnabled: boolean;
  onOpenModal: (item: ShowcaseItem, activeImg?: string) => void;
  onInquire: (title: string) => void;
}

export const ShowcaseCardItem = React.memo(function ShowcaseCardItem({
  item,
  index,
  isAutoplayEnabled,
  onOpenModal,
  onInquire,
}: ShowcaseCardItemProps) {
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const intervalDurations = [3200, 4200, 3600, 4800, 3900, 3400];
  const initialOffsets = [300, 1600, 2900, 900, 2200, 1300];
  const cardInterval = intervalDurations[index % intervalDurations.length];
  const cardInitialDelay = initialOffsets[index % initialOffsets.length];

  const gallery = item.gallery;
  const galleryLength = gallery?.length || 0;

  useEffect(() => {
    if (!isAutoplayEnabled || galleryLength <= 1) {
      return;
    }

    let intervalId: NodeJS.Timeout;
    const timeoutId = setTimeout(() => {
      setActiveImgIndex((prev) => (prev + 1) % galleryLength);
      intervalId = setInterval(() => {
        setActiveImgIndex((prev) => (prev + 1) % galleryLength);
      }, cardInterval);
    }, cardInitialDelay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [isAutoplayEnabled, galleryLength, cardInterval, cardInitialDelay]);

  const currentImg =
    isAutoplayEnabled && gallery && gallery.length > 0
      ? gallery[activeImgIndex % gallery.length]
      : item.image;

  // Touch swipe handlers for showcase card
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isSwiping = useRef(false);

  const handleCardTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isSwiping.current = false;
  };

  const handleCardTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.touches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 15) {
      isSwiping.current = true;
    }
  };

  const handleCardTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 30 && galleryLength > 1) {
      if (deltaX < 0) {
        setActiveImgIndex((prev) => (prev + 1) % galleryLength);
      } else {
        setActiveImgIndex((prev) => (prev - 1 + galleryLength) % galleryLength);
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
    setTimeout(() => {
      isSwiping.current = false;
    }, 80);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
      whileHover={{ y: -5 }}
      className="group rounded-xl overflow-hidden shadow-md border border-slate-200/80 hover:border-orange-500/30 hover:shadow-xl flex flex-col h-full relative transition-all bg-white"
    >
      <div
        className="relative w-full h-[220px] sm:h-[260px] cursor-pointer overflow-hidden bg-slate-900 touch-pan-y"
        onTouchStart={handleCardTouchStart}
        onTouchMove={handleCardTouchMove}
        onTouchEnd={handleCardTouchEnd}
        onClick={() => {
          if (!isSwiping.current) {
            onOpenModal(item, currentImg);
          }
        }}
      >
        {isAutoplayEnabled && item.video ? (
          <video
            src={item.video}
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-full h-full pointer-events-none"
          />
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentImg}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.75, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={currentImg}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-all duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </motion.div>
          </AnimatePresence>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent pointer-events-none z-10" />

        {/* CARD ARROWS FOR QUICK BROWSING */}
        {galleryLength > 1 && (
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-20">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveImgIndex((prev) => (prev - 1 + galleryLength) % galleryLength);
              }}
              className="w-7 h-7 rounded-full bg-navy-950/75 hover:bg-orange-500 text-white flex items-center justify-center pointer-events-auto backdrop-blur transition-all shadow-md active:scale-90 cursor-pointer"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveImgIndex((prev) => (prev + 1) % galleryLength);
              }}
              className="w-7 h-7 rounded-full bg-navy-950/75 hover:bg-orange-500 text-white flex items-center justify-center pointer-events-auto backdrop-blur transition-all shadow-md active:scale-90 cursor-pointer"
              aria-label="Next photo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* BADGES OVERLAY */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
          <span className="px-3 py-1 rounded bg-navy-950/80 backdrop-blur text-white text-[10px] font-black uppercase tracking-wider border border-white/10">
            {item.tag}
          </span>
          {item.featured && (
            <span className="px-3 py-1 rounded bg-orange-500 text-white text-[10px] font-black uppercase tracking-wider shadow-md">
              Featured
            </span>
          )}
          {item.video && (
            <span className="px-2.5 py-1 rounded bg-red-600/90 backdrop-blur text-white text-[10px] font-black uppercase tracking-wider shadow-md flex items-center gap-1">
              <Play className="w-2.5 h-2.5 fill-white" /> {isAutoplayEnabled ? "Playing" : "Video"}
            </span>
          )}
        </div>

        {item.video && !isAutoplayEnabled && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="w-12 h-12 rounded-full bg-orange-500/90 text-white flex items-center justify-center shadow-xl backdrop-blur-xs group-hover:scale-110 transition-transform">
              <Play className="w-5 h-5 fill-white translate-x-0.5" />
            </div>
          </div>
        )}

        {item.gallery && item.gallery.length > 1 && (
          <div className="absolute bottom-4 right-4 z-10 bg-navy-950/85 backdrop-blur px-3 py-1.5 rounded-full text-white text-[11px] font-bold flex items-center gap-1.5 border border-white/10">
            <Layers className="w-3.5 h-3.5 text-orange-400" />
            <span>
              {isAutoplayEnabled
                ? `View ${(activeImgIndex % item.gallery.length) + 1}/${item.gallery.length}`
                : `${item.gallery.length} Views`}
            </span>
          </div>
        )}

        {item.dimensions && (
          <div className="absolute bottom-4 left-4 z-10 text-white text-xs font-extrabold drop-shadow">
            <span className="text-orange-400">Scale:</span> {item.dimensions}
          </div>
        )}
      </div>

      <div className="p-5 sm:p-6 bg-white flex-1 flex flex-col justify-between border-t border-slate-100 z-10">
        <div>
          <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest block mb-1 line-clamp-1">
            {item.category}
          </span>
          <h4 className="text-base sm:text-lg font-bold text-navy-950 tracking-tight line-clamp-1 group-hover:text-orange-500 transition-colors">
            {item.title}
          </h4>
          <p className="text-xs text-navy-900/65 mt-2 line-clamp-2 leading-relaxed min-h-[2.5rem]">
            {item.description}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3 pt-4 mt-3 border-t border-slate-100">
          <button
            onClick={() => onOpenModal(item, currentImg)}
            className="text-xs font-bold text-orange-500 hover:text-orange-600 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {item.video ? <Play className="w-3.5 h-3.5 fill-current" /> : <Eye className="w-4 h-4" />}
            {item.video ? "Watch Walkthrough" : "View Specs & Gallery"}
          </button>
          <button
            onClick={() => onInquire(`Inquiry on ${item.title}`)}
            className="px-3.5 py-1.5 bg-navy-50 text-navy-950 hover:bg-orange-500 hover:text-white rounded text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer"
          >
            Inquire <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
});
