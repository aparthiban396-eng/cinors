"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
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
    <div className="min-h-screen bg-white text-navy-950 font-sans selection:bg-orange-500 selection:text-white">
      <Navbar onOpenConsultation={() => setIsConsultModalOpen(true)} />

      <main>
        {/* Hero Section */}
        <section className="relative py-16 sm:py-24 bg-gradient-to-b from-navy-50/60 to-white overflow-hidden border-b border-navy-100 text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-600 font-bold text-xs uppercase tracking-widest mb-5">
              <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
              Verified Client Satisfaction
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-navy-950 tracking-tight leading-tight mb-6">
              What Homeowners Say <br />
              <span className="text-orange-500">About CINORS Blueprints</span>
            </h1>
            <p className="text-base sm:text-lg text-navy-900/70 leading-relaxed mb-8 max-w-2xl mx-auto">
              Read authentic feedback from families and builders who planned their homes with our architectural and structural engineering team.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => setIsReviewModalOpen(true)}
                className="px-8 py-4 bg-orange-500 text-white rounded-md font-bold text-sm sm:text-base hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/25 flex items-center gap-2 active:scale-95 cursor-pointer"
              >
                <PenLine className="w-4 h-4" />
                Write a Client Review
              </button>
              <button
                onClick={() => setIsConsultModalOpen(true)}
                className="px-8 py-4 border border-navy-200 bg-white text-navy-950 rounded-md font-bold text-sm sm:text-base hover:bg-navy-50 transition-all flex items-center gap-2"
              >
                Plan Your Project <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Aggregate Ratings Overview */}
        <section className="py-12 bg-slate-50/70 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Score Column */}
                <div className="lg:col-span-4 text-center lg:border-r lg:border-slate-200 lg:pr-8">
                  <div className="text-6xl sm:text-7xl font-black text-navy-950 mb-2">5.0</div>
                  <div className="flex justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-orange-500 fill-orange-500" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-navy-900/60 font-semibold">Based on 150+ Projects Across Tamil Nadu</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% Recommendation Rate
                  </div>
                </div>

                {/* Sub-ratings Breakdown */}
                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {ratingCategories.map((cat, idx) => (
                    <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <div className="text-xs text-navy-900/60 font-medium mb-1">{cat.label}</div>
                      <div className="text-lg font-bold text-orange-500">{cat.rating}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Grid */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <span className="text-xs font-black uppercase text-orange-500 tracking-widest mb-1 block">
                  Verified Experiences
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950">Recent Client Feedback</h2>
              </div>
              <button
                onClick={() => setIsReviewModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-50 text-orange-600 border border-orange-200 text-xs font-bold hover:bg-orange-100 transition-all cursor-pointer"
              >
                <PenLine className="w-3.5 h-3.5" />
                Add Your Feedback
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviewsList.map((review, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.45, delay: (idx % 3) * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-orange-400 hover:shadow-2xl hover:shadow-orange-500/10 transition-all shadow-xs relative overflow-hidden group"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-orange-400 to-orange-600 scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300 ease-out rounded-l-2xl" />
                  <div>
                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-orange-500 fill-orange-500" />
                      ))}
                    </div>

                    <p className="text-navy-900/70 text-sm leading-relaxed mb-6 italic">
                      &quot;{review.comment}&quot;
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-navy-950 text-sm">{review.name}</div>
                      <div className="flex items-center gap-1 text-xs text-navy-900/50 mt-0.5">
                        <MapPin className="w-3 h-3 text-orange-500" />
                        <span>{review.location}</span>
                      </div>
                    </div>
                    {review.date && (
                      <span className="text-xs text-navy-900/40 font-medium">{review.date}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Submit CTA Banner */}
            <div className="mt-16 bg-navy-950 text-white rounded-3xl p-8 sm:p-12 text-center shadow-2xl">
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">Built Your Home with CINORS?</h3>
              <p className="text-navy-200/65 text-sm max-w-xl mx-auto mb-6">
                We love seeing our blueprints turn into real homes! Send your construction photos or leave a review to inspire future home builders.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => setIsReviewModalOpen(true)}
                  className="px-6 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-500/20"
                >
                  Write a Review
                </button>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold border border-white/15 text-sm"
                >
                  Email Us Photos: {siteConfig.email}
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
