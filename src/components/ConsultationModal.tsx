"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, ArrowRight, Loader2 } from "lucide-react";

const WEB3FORMS_KEY = "a479e76f-57bf-4088-822f-fbf39250b246";

// Indian mobile: 10 digits, starts with 6–9, rejects dummy patterns like 9999999999
const INDIAN_PHONE_RE = /^[6-9]\d{9}$/;

function isValidIndianPhone(raw: string): boolean {
  const digits = raw.replace(/\D/g, "");
  if (!INDIAN_PHONE_RE.test(digits)) return false;
  // Reject identical 10 digits (e.g. 9999999999, 8888888888)
  if (/^(\d)\1{9}$/.test(digits)) return false;
  // Reject common dummy fake numbers
  if (digits === "9876543210" || digits === "9898989898" || digits === "9000000000") return false;
  return true;
}

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    plotSize: "",
    stage: "Bought a Plot & Planning",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [phoneError, setPhoneError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidIndianPhone(formData.phone)) {
      setPhoneError("Enter a valid 10-digit Indian mobile number (starts with 6–9)");
      return;
    }
    setPhoneError("");
    setStatus("submitting");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New Free Consultation Request — ${formData.name} (${formData.location})`,
          from_name: "CINORS Website",
          name: formData.name,
          phone: formData.phone,
          email: formData.email || "Not provided",
          "Plot Location": formData.location,
          "Plot Dimensions": formData.plotSize || "Not specified",
          "Current Stage": formData.stage,
          botcheck: "",
        }),
      });

      const data = await response.json();
      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStatus("idle");
      setPhoneError("");
      setFormData({ name: "", phone: "", email: "", location: "", plotSize: "", stage: "Bought a Plot & Planning" });
    }, 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-navy-950/70 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 z-10 max-h-[92vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-all z-10"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Success State */}
            {status === "success" ? (
              <div className="p-8 sm:p-10 text-center">
                <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle className="w-10 h-10 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-black text-navy-950 mb-2">Request Received!</h3>
                <p className="text-sm text-navy-900/60 leading-relaxed mb-2">
                  Thank you, <strong>{formData.name}</strong>. Our engineering team will review your plot details and contact you at <strong>{formData.phone}</strong> within 24 hours.
                </p>
                <p className="text-xs text-navy-900/40 mb-6">
                  A confirmation has been sent to our team at contact@cinors.in
                </p>
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-lg transition-all"
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="p-5 sm:p-8">
                {/* Header */}
                <div className="mb-6 pr-6">
                  <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest block mb-1">
                    Free Consultation
                  </span>
                  <h4 className="text-xl sm:text-2xl font-black text-navy-950 tracking-tight leading-tight">
                    Get Your House Planned
                  </h4>
                  <p className="text-xs text-navy-900/55 mt-1.5 leading-relaxed">
                    Fill in your details — our qualified civil engineers will contact you within 24 hours.
                  </p>
                </div>

                {/* Error Banner */}
                {status === "error" && (
                  <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 font-medium">
                    Something went wrong. Please email us directly at{" "}
                    <a href="mailto:contact@cinors.in" className="underline font-bold">contact@cinors.in</a>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Hidden honeypot for spam prevention */}
                  <input type="checkbox" name="botcheck" className="hidden" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-navy-900 uppercase tracking-wider mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rajesh Kumar"
                        className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 text-navy-950"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-navy-900 uppercase tracking-wider mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={formData.phone}
                        onChange={(e) => {
                          const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                          setFormData({ ...formData, phone: digits });
                          if (digits.length === 10) {
                            if (!isValidIndianPhone(digits)) {
                              if (/^(\d)\1{9}$/.test(digits) || digits === "9876543210" || digits === "9898989898") {
                                setPhoneError("Please enter a valid personal mobile number");
                              } else {
                                setPhoneError("Must start with 6, 7, 8, or 9");
                              }
                            } else {
                              setPhoneError("");
                            }
                          } else {
                            setPhoneError("");
                          }
                        }}
                        placeholder="e.g. 9876543210"
                        className={`w-full px-3.5 py-2.5 text-sm border rounded-lg focus:outline-none transition-all text-navy-950 ${
                          phoneError
                            ? "border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-400/20"
                            : formData.phone.length === 10 && isValidIndianPhone(formData.phone)
                            ? "border-emerald-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
                            : "border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20"
                        }`}
                      />
                      {phoneError ? (
                        <p className="mt-1 text-[10px] text-red-500 font-semibold">⚠ {phoneError}</p>
                      ) : formData.phone.length === 10 && isValidIndianPhone(formData.phone) ? (
                        <p className="mt-1 text-[10px] text-emerald-600 font-semibold">✓ Valid mobile number</p>
                      ) : formData.phone.length > 0 ? (
                        <p className="mt-1 text-[10px] text-navy-900/40">{formData.phone.length}/10 digits</p>
                      ) : null}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-navy-900 uppercase tracking-wider mb-1.5">
                      Email Address <span className="text-navy-400 font-normal normal-case">(optional)</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. yourname@gmail.com"
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 text-navy-950"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-navy-900 uppercase tracking-wider mb-1.5">
                        Plot Location *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g. Trichy / Madurai"
                        className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 text-navy-950"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-navy-900 uppercase tracking-wider mb-1.5">
                        Plot Dimensions
                      </label>
                      <input
                        type="text"
                        value={formData.plotSize}
                        onChange={(e) => setFormData({ ...formData, plotSize: e.target.value })}
                        placeholder="e.g. 30×40 ft"
                        className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 text-navy-950"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-navy-900 uppercase tracking-wider mb-1.5">
                      Current Stage
                    </label>
                    <select
                      value={formData.stage}
                      onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 text-navy-950"
                    >
                      <option>Bought a Plot & Planning</option>
                      <option>Need 2D / 3D Drawings Only</option>
                      <option>Starting Construction Soon</option>
                      <option>Already Building — Need Guidance</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting" || !isValidIndianPhone(formData.phone)}
                    className="w-full py-3.5 text-sm font-bold rounded-xl text-white bg-orange-500 hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Sending Request...
                      </>
                    ) : (
                      <>
                        Submit Consultation Request <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-[10px] text-navy-900/40 leading-relaxed">
                    Your details are sent securely to contact@cinors.in. We never share your information.
                  </p>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
