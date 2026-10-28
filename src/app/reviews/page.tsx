"use client";

import React, { useState } from "react";
import {
  Star,
  CheckCircle2,
  MapPin,
  ArrowRight,
  PenLine,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import ReviewModal from "@/components/ReviewModal";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import EstimateFormSection from "@/components/EstimateFormSection";
import { initialReviews, siteConfig } from "@/data/siteData";
import { Review } from "@/types";

export default function ReviewsPage() {
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewsList, setReviewsList] = useState<Review[]>(initialReviews);

  const handleAddReview = (newReview: Review) => {
    setReviewsList((prev) => [newReview, ...prev]);
  };

  const ratingCategories = [
    { label: "Vastu Compliance & Spatial Planning", rating: "5.0 / 5.0" },
    { label: "Structural Safety & Rebar Drawings", rating: "5.0 / 5.0" },
    { label: "On-Time Delivery (3–5 Days)", rating: "4.9 / 5.0" },
    { label: "Contractor Coordination & Support", rating: "5.0 / 5.0" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      <Navbar onOpenModal={() => setIsConsultModalOpen(true)} />

      <main className="flex-grow pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 lg:py-24 border-b border-slate-800/80 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(249,115,22,0.15),rgba(255,255,255,0))] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-6">
              <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
              Verified Client Satisfaction
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
              What Homeowners Say <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                About CINORS Blueprints
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              Read authentic feedback from families and builders who planned their homes with our architectural and structural engineering team.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setIsReviewModalOpen(true)}
                className="px-8 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold transition-all shadow-lg shadow-orange-500/25 flex items-center gap-2"
              >
                <PenLine className="w-4 h-4" />
                Write a Client Review
              </button>
              <button
                onClick={() => setIsConsultModalOpen(true)}
                className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 transition-all flex items-center gap-2"
              >
                Plan Your Project
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Aggregate Ratings Overview */}
        <section className="py-12 bg-slate-900/40 border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Score Column */}
                <div className="lg:col-span-4 text-center lg:border-r lg:border-slate-800 lg:pr-8">
                  <div className="text-6xl sm:text-7xl font-black text-white mb-2">5.0</div>
                  <div className="flex justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-orange-500 fill-orange-500" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-400 font-medium">Based on 150+ Projects Across Tamil Nadu</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 100% Recommendation Rate
                  </div>
                </div>

                {/* Sub-ratings Breakdown */}
                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {ratingCategories.map((cat, idx) => (
                    <div key={idx} className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
                      <div className="text-xs text-slate-400 mb-1">{cat.label}</div>
                      <div className="text-lg font-bold text-orange-400">{cat.rating}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Grid */}
        <section className="py-20 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <span className="text-orange-500 font-semibold tracking-wider text-sm uppercase">
                  Verified Experiences
                </span>
                <h2 className="text-3xl font-bold text-white mt-1">Recent Client Feedback</h2>
              </div>
              <button
                onClick={() => setIsReviewModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200"
              >
                <PenLine className="w-3.5 h-3.5 text-orange-400" />
                Add Your Feedback
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviewsList.map((review, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-orange-500/30 transition-all hover:-translate-y-1"
                >
                  <div>
                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-orange-500 fill-orange-500" />
                      ))}
                    </div>

                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 italic">
                      &quot;{review.comment}&quot;
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800/70 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white text-sm">{review.name}</div>
                      <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                        <MapPin className="w-3 h-3 text-orange-500" />
                        <span>{review.location}</span>
                      </div>
                    </div>
                    {review.date && (
                      <span className="text-xs text-slate-500 font-medium">{review.date}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Submit CTA Banner */}
            <div className="mt-16 bg-gradient-to-r from-orange-500/10 via-slate-900 to-slate-950 border border-orange-500/30 rounded-3xl p-8 sm:p-10 text-center">
              <h3 className="text-2xl font-bold text-white mb-2">Built Your Home with CINORS?</h3>
              <p className="text-slate-400 text-sm max-w-xl mx-auto mb-6">
                We love seeing our blueprints turn into real homes! Send your construction photos or leave a review to inspire future home builders.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => setIsReviewModalOpen(true)}
                  className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm"
                >
                  Write a Review
                </button>
                <a
                  href={siteConfig.getWhatsAppUrl("Hi CINORS, I wanted to share pictures and feedback from my finished house construction!")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 text-sm"
                >
                  Send Site Photos on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Estimate Form Section */}
        <EstimateFormSection onOpenConsultation={() => setIsConsultModalOpen(true)} />
      </main>

      <Footer />
      <FloatingWhatsApp />
      <ConsultationModal isOpen={isConsultModalOpen} onClose={() => setIsConsultModalOpen(false)} />
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmitReview={handleAddReview}
      />
    </div>
  );
}
