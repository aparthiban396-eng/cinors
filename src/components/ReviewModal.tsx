"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Send, Star } from "lucide-react";
import { Review } from "@/types";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: Review) => void;
}

export default function ReviewModal({ isOpen, onClose, onSubmitReview }: ReviewModalProps) {
  const [reviewForm, setReviewForm] = useState({ name: "", location: "", rating: 5, comment: "" });
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.comment) return;
    const newReview: Review = {
      name: reviewForm.name,
      location: reviewForm.location || "Tamil Nadu",
      rating: reviewForm.rating,
      comment: reviewForm.comment,
      date: new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" }),
    };
    onSubmitReview(newReview);
    setReviewSubmitted(true);
    setTimeout(() => {
      onClose();
      setReviewSubmitted(false);
      setReviewForm({ name: "", location: "", rating: 5, comment: "" });
      setHoverRating(0);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 z-10 p-5 sm:p-8 max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-navy-400 hover:text-navy-950 hover:bg-navy-50 rounded-full transition-all"
              aria-label="Close review dialog"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="mb-6 pr-6">
              <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest block mb-1">
                Share Your Experience
              </span>
              <h4 className="text-xl sm:text-2xl font-black text-navy-950 tracking-tight">
                Leave a Review
              </h4>
              <p className="text-xs text-navy-900/60 mt-1">
                Your feedback helps other homeowners make informed decisions.
              </p>
            </div>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-navy-900 uppercase tracking-wider mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={reviewForm.name}
                  onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                  placeholder="e.g. Anand S."
                  className="w-full px-4 py-3 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 text-navy-950"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-navy-900 uppercase tracking-wider mb-1.5">
                  Location
                </label>
                <input
                  type="text"
                  value={reviewForm.location}
                  onChange={(e) => setReviewForm({ ...reviewForm, location: e.target.value })}
                  placeholder="e.g. Chennai / Madurai"
                  className="w-full px-4 py-3 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 text-navy-950"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-navy-900 uppercase tracking-wider mb-2">
                  Rating *
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                      className="transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          star <= (hoverRating || reviewForm.rating)
                            ? "fill-orange-500 text-orange-500"
                            : "text-slate-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-navy-900 uppercase tracking-wider mb-1.5">
                  Your Review *
                </label>
                <textarea
                  required
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                  placeholder="Share your experience with CINORS..."
                  rows={4}
                  className="w-full px-4 py-3 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 text-navy-950 resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={reviewSubmitted}
                className={`w-full py-4 text-sm font-bold rounded-lg text-white transition-all flex items-center justify-center gap-2 active:scale-98 ${
                  reviewSubmitted
                    ? "bg-emerald-500"
                    : "bg-orange-500 hover:bg-orange-600 shadow-xl shadow-orange-500/10 cursor-pointer"
                }`}
              >
                {reviewSubmitted ? (
                  <>
                    <Check className="w-5 h-5" /> Review Posted!
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Submit Review
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
