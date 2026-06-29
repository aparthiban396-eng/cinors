"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  X,
  ChevronDown,
  Layers,
  Compass,
  Home,
  Ruler,
  Paintbrush,
  FileText,
  Check,
  Menu,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  Clock,
  ThumbsUp,
  MessageSquare,
  Star,
  Send
} from "lucide-react";

interface ServiceCard { icon: React.ReactNode; title: string; description: string; }
interface TrustCard { title: string; icon: React.ReactNode; desc: string; }
interface ProcessStep { step: string; title: string; description: string; }
interface ShowcaseItem { title: string; category: string; image: string; }
interface Testimonial { quote: string; author: string; role: string; location: string; }
interface FAQItem { question: string; answer: string; }
interface Review { name: string; location: string; rating: number; comment: string; date: string; }

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  const [reviews, setReviews] = useState<Review[]>([
    { name: "Praveen Kumar", location: "Trichy", rating: 5, comment: "I bought a 2400 sq.ft plot and was confused about how to structure it. CINORS gave us a Vastu-friendly 2D layout and a beautiful 3D elevation. Our contractor easily followed their construction-ready structural drawings.", date: "March 2024" },
    { name: "Selvi R.", location: "Madurai", rating: 5, comment: "Choosing CINORS was the best pre-construction decision we made. Their structural drawings saved us from committing column placement errors that would have cost us lakhs to fix later. Fully recommended!", date: "January 2024" },
    { name: "Vigneshwaran K.", location: "Coimbatore", rating: 5, comment: "Highly professional service! Even though our site was in Coimbatore, their remote coordination, prompt drawing delivery, and civil engineering advice were outstanding. The rates are very transparent.", date: "February 2024" },
  ]);

  const [reviewForm, setReviewForm] = useState({ name: "", location: "", rating: 5, comment: "" });

  const [formData, setFormData] = useState({
    name: "", phone: "", location: "", plotSize: "", stage: "Bought a Plot & Planning",
  });

  const sliderRef = useRef<HTMLDivElement>(null);

  // FIX 1: Proper drag logic with mousedown/mouseup tracking
  const handleMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (e.touches.length > 0) handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const onUp = () => setIsDragging(false);
    window.addEventListener("mouseup", onUp);
    return () => window.removeEventListener("mouseup", onUp);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    const message = `Hi CINORS,\nI would like to get a Free Consultation for my plot. Here are my details:\n• Name: ${formData.name}\n• Phone: ${formData.phone}\n• Plot Location: ${formData.location}\n• Plot Size: ${formData.plotSize}\n• Current Stage: ${formData.stage}\n\nPlease guide me on the next steps. Thank you!`;
    const whatsappUrl = `https://wa.me/919445040193?text=${encodeURIComponent(message)}`;
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setIsModalOpen(false);
      setFormSubmitted(false);
      setFormData({ name: "", phone: "", location: "", plotSize: "", stage: "Bought a Plot & Planning" });
    }, 1500);
  };

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
    setReviews(prev => [newReview, ...prev]);
    setReviewSubmitted(true);
    setTimeout(() => {
      setIsReviewModalOpen(false);
      setReviewSubmitted(false);
      setReviewForm({ name: "", location: "", rating: 5, comment: "" });
      setHoverRating(0);
    }, 1800);
  };

  const triggerQuickWhatsApp = (context: string) => {
    const message = `Hi CINORS, I am interested in your ${context}. I would like to schedule a free consultation for my house planning.`;
    window.open(`https://wa.me/919445040193?text=${encodeURIComponent(message)}`, "_blank");
  };

  const trustCards: TrustCard[] = [
    { title: "Professional Planning", icon: <Ruler className="w-6 h-6 text-orange-500" />, desc: "Optimized and standard layouts designed by qualified engineers." },
    { title: "Structural Safety", icon: <ShieldCheck className="w-6 h-6 text-orange-500" />, desc: "Strong, earthquake-resistant designs built to last generations." },
    { title: "Customized Solutions", icon: <Sparkles className="w-6 h-6 text-orange-500" />, desc: "Tailored concepts mapped specifically to your land and life." },
    { title: "On-Time Delivery", icon: <Clock className="w-6 h-6 text-orange-500" />, desc: "Get your complete set of engineering drawings strictly on schedule." },
    { title: "Quality Assured", icon: <ThumbsUp className="w-6 h-6 text-orange-500" />, desc: "Every blueprint is double-checked for regulatory compliance." },
    { title: "Dedicated Support", icon: <MessageSquare className="w-6 h-6 text-orange-500" />, desc: "Constant guidance from design finalization to construction setup." },
  ];

  const services: ServiceCard[] = [
    { icon: <Layers className="w-8 h-8 text-orange-500" />, title: "2D Floor Planning", description: "Functional, space-optimized layouts tailored to modern living requirements." },
    { icon: <FileText className="w-8 h-8 text-orange-500" />, title: "Structural Design Drawings", description: "Safe, construction-ready foundation, column, and beam structural drawings." },
    { icon: <Compass className="w-8 h-8 text-orange-500" />, title: "Vastu-Friendly Layouts", description: "Balanced, compliant spatial planning aligned with your spiritual preferences." },
    { icon: <Home className="w-8 h-8 text-orange-500" />, title: "3D Elevation Design", description: "Photorealistic 3D external models to visualize your dream home before laying a brick." },
    { icon: <Paintbrush className="w-8 h-8 text-orange-500" />, title: "Interior Design Concepts", description: "Stunning, functional interior concepts crafted to fit your lifestyle perfectly." },
    { icon: <ArrowUpRight className="w-8 h-8 text-orange-500" />, title: "Construction Ready Drawings", description: "Detailed working blueprints covering electrical, plumbing, and brick layouts." },
  ];

  const processSteps: ProcessStep[] = [
    { step: "01", title: "Share Your Plot Details", description: "Provide your plot dimensions, location in Tamil Nadu, and your core home requirements." },
    { step: "02", title: "Receive Design Concepts", description: "Review initial customized 2D layout drafts and preliminary spatial blueprints." },
    { step: "03", title: "Finalize Plans & Drawings", description: "Perfect the layout and receive construction-ready structural & elevation engineering drawings." },
    { step: "04", title: "Start Construction with Confidence", description: "Hand over the professional drawings to your builders to avoid site errors and costly reworks." },
  ];

  const showcaseItems: ShowcaseItem[] = [
    { title: "Modern Minimalist Villa", category: "3D Elevation & Planning", image: "/images/dream-home.png" },
    { title: "Contemporary Double-Story Home", category: "Residential Architecture", image: "/images/modern-villa.png" },
    { title: "Luxury Lounge Interior Concept", category: "Interior Design", image: "/images/interior-design.png" },
  ];

  const faqs: FAQItem[] = [
    { question: "How much does house planning cost?", answer: "Our planning packages are extremely affordable and depend on your plot size and scope. Contact us with your dimensions for a custom, transparent quote." },
    { question: "Do you provide structural drawings?", answer: "Yes, we specialize in providing highly detailed, construction-ready structural drawings including foundation plans, column layouts, beam detailing, and slab reinforcement specifications." },
    { question: "Do you work across Tamil Nadu?", answer: "Yes! CINORS serves landowners and builders all over Tamil Nadu through online consultations, site maps, and call-coordination." },
    { question: "Can I get a 3D elevation design?", answer: "Absolutely! We create high-quality, photorealistic 3D external elevation designs so you can select color palettes, window layouts, and materials before construction starts." },
    { question: "What is included in the design package?", answer: "Our complete design package includes: 2D Floor Plan (Vastu-compliant), Detailed Structural Drawings, 3D Elevation Render, and Working Drawings (Electrical, Plumbing, and Brick Masonry layout)." },
    { question: "How do I get started?", answer: "Click 'Get Free Consultation' to fill out our plot inquiry form, or click the WhatsApp button. Send us your plot dimensions and location, and our civil design team will guide you step-by-step." },
  ];

  const avgRating = reviews.length > 0 ? (reviews.reduce((a, b) => a + b.rating, 0) / reviews.length).toFixed(1) : "5.0";

  return (
    <div className="relative min-h-screen selection:bg-orange-500 selection:text-white overflow-x-hidden font-sans">

      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-navy-50/40 to-transparent -z-10 pointer-events-none" />

      {/* STICKY HEADER */}
      <header className="sticky top-0 w-full z-40 transition-all duration-300 glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 relative h-10 sm:h-12 w-36 sm:w-48">
            <Image src="/images/cinors-logo.png" alt="CINORS Logo" fill className="object-contain" priority />
          </a>
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-[14px] lg:text-[15px] font-medium text-navy-900/80">
            <a href="#services" className="hover:text-orange-500 transition-colors">Services</a>
            <a href="#why-us" className="hover:text-orange-500 transition-colors">Why Us</a>
            <a href="#process" className="hover:text-orange-500 transition-colors">Process</a>
            <a href="#showcase" className="hover:text-orange-500 transition-colors">Showcase</a>
            <a href="#reviews" className="hover:text-orange-500 transition-colors">Reviews</a>
            <a href="#faq" className="hover:text-orange-500 transition-colors">FAQ</a>
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <button onClick={() => setIsModalOpen(true)} className="px-5 py-2.5 bg-orange-500 text-white rounded-md font-semibold text-sm hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 active:scale-95">
              Get Free Consultation
            </button>
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-navy-950 hover:bg-navy-50 rounded-md transition-colors" aria-label="Toggle Menu">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="md:hidden border-t border-navy-50 bg-white shadow-xl overflow-hidden">
              <div className="px-4 pt-3 pb-6 flex flex-col gap-2">
                {["services", "why-us", "process", "showcase", "reviews", "faq"].map((id) => (
                  <a key={id} href={`#${id}`} onClick={() => setIsMenuOpen(false)} className="px-3 py-2.5 text-[15px] font-medium text-navy-900 hover:bg-navy-50 rounded-md transition-colors capitalize">
                    {id === "why-us" ? "Why Choose Us" : id.charAt(0).toUpperCase() + id.slice(1)}
                  </a>
                ))}
                <div className="grid grid-cols-1 gap-3 pt-3 border-t border-navy-50 mt-2">
                  <button onClick={() => { setIsMenuOpen(false); setIsModalOpen(true); }} className="w-full py-3 bg-orange-500 text-white text-center rounded-md font-semibold text-sm hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/10">
                    Get Free Consultation
                  </button>
                  <button onClick={() => { setIsMenuOpen(false); triggerQuickWhatsApp("Mobile Menu Contact"); }} className="w-full py-3 border border-navy-200 text-navy-950 text-center rounded-md font-semibold text-sm hover:bg-navy-50 transition-colors flex items-center justify-center gap-2">
                    <MessageSquare className="w-4 h-4 text-orange-500" /> WhatsApp Direct
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION */}
      <section className="relative min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-80px)] flex items-center py-10 md:py-20 lg:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">

          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-50 border border-navy-100 text-navy-950 font-bold text-xs uppercase tracking-widest mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              Serving All Over Tamil Nadu
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-navy-950 tracking-tight leading-[1.08] mb-5">
              Bought A Plot & <br className="hidden sm:inline" />
              <span className="text-orange-500">Don&apos;t Know</span> <br />
              Where To Start?
            </h1>
            <p className="text-sm sm:text-lg text-navy-900/70 max-w-xl mb-7 leading-relaxed">
              We help transform your empty plot into a well-planned, construction-ready home with professional floor plans, safety-assured structural drawings, and photorealistic 3D designs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button onClick={() => setIsModalOpen(true)} className="px-6 sm:px-8 py-3.5 sm:py-4 bg-orange-500 text-white rounded-md font-bold text-sm sm:text-base hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/25 flex items-center justify-center gap-2 group active:scale-98">
                Get Free Consultation <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="#services" className="px-6 sm:px-8 py-3.5 sm:py-4 border border-navy-200 bg-white/50 backdrop-blur text-navy-950 rounded-md font-bold text-sm sm:text-base hover:bg-navy-50 hover:border-navy-300 transition-all text-center flex items-center justify-center">
                View Services
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 pt-6 border-t border-navy-100 w-full max-w-xl">
              <div><span className="block font-black text-xl sm:text-2xl text-navy-950">100%</span><span className="text-xs text-navy-900/60 font-semibold uppercase tracking-wider">Vastu Friendly</span></div>
              <div><span className="block font-black text-xl sm:text-2xl text-navy-950">Safe</span><span className="text-xs text-navy-900/60 font-semibold uppercase tracking-wider">Certified Structural</span></div>
              <div><span className="block font-black text-xl sm:text-2xl text-navy-950">Tamil Nadu</span><span className="text-xs text-navy-900/60 font-semibold uppercase tracking-wider">Full Coverage</span></div>
            </div>
          </div>

          {/* FIX 1: BEFORE/AFTER SLIDER - corrected logic so "Your Vacant Plot" label only shows on left side */}
          <div className="lg:col-span-6 flex justify-center relative w-full h-[280px] sm:h-[420px] lg:h-[500px]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:32px_32px] opacity-40 -z-10 rounded-2xl" />
            <div
              ref={sliderRef}
              onMouseMove={handleMouseMove}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onTouchMove={handleTouchMove}
              onTouchStart={handleMouseDown}
              onTouchEnd={handleMouseUp}
              className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white select-none cursor-ew-resize"
              style={{ touchAction: "none" }}
            >
              {/* BOTTOM LAYER: Dream Home (shown on right side) */}
              <div className="absolute inset-0 w-full h-full">
                <Image src="/images/dream-home.png" alt="Transformed Modern Dream Home" fill className="object-cover pointer-events-none" sizes="(max-width: 1024px) 100vw, 50vw" priority />
                {/* "Modern Dream Home" label always visible on right */}
                <div className="absolute bottom-4 right-4 bg-navy-950/90 text-white px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider backdrop-blur-sm border border-white/10">
                  Modern Dream Home
                </div>
              </div>

              {/* TOP LAYER: Empty Plot (clips from left based on sliderPosition) */}
              <div
                className="absolute inset-0 w-full h-full overflow-hidden"
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
              >
                <Image src="/images/empty-plot.png" alt="Vacant Plot of Land" fill className="object-cover pointer-events-none" sizes="(max-width: 1024px) 100vw, 50vw" priority />
                <div className="absolute inset-0 bg-navy-950/10 pointer-events-none">
                  <div className="absolute top-10 left-10 border-l border-t border-dashed border-orange-500/80 pl-2 pt-1">
                    <span className="text-[10px] sm:text-xs font-bold text-orange-500 bg-white/95 px-1 py-0.5 rounded border border-orange-200">BOUNDARY: 40 FT</span>
                  </div>
                  <div className="absolute bottom-14 left-20 border-b border-r border-dashed border-orange-500/80 pr-2 pb-1">
                    <span className="text-[10px] sm:text-xs font-bold text-orange-500 bg-white/95 px-1 py-0.5 rounded border border-orange-200">WIDTH: 30 FT</span>
                  </div>
                  <div className="absolute top-1/3 left-1/3 p-2 bg-navy-950/80 text-white rounded border border-white/20 backdrop-blur-xs flex flex-col gap-0.5">
                    <span className="text-[9px] font-bold text-orange-400">STAGE 01</span>
                    <span className="text-[11px] font-extrabold">VACANT PLOT</span>
                  </div>
                </div>
                {/* "Your Vacant Plot" label ONLY inside the clipped left layer */}
                <div className="absolute bottom-4 left-4 bg-orange-500 text-white px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider border border-orange-600">
                  Your Vacant Plot
                </div>
              </div>

              {/* SLIDER HANDLE */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white z-20 pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-xl border-2 border-orange-500 flex items-center justify-center pointer-events-auto cursor-ew-resize hover:scale-110 active:scale-95 transition-all">
                  <div className="flex gap-0.5">
                    <span className="text-orange-500 font-black text-xs">&lt;</span>
                    <span className="text-orange-500 font-black text-xs">&gt;</span>
                  </div>
                </div>
              </div>

              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-navy-950/85 text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg backdrop-blur-xs pointer-events-none z-30">
                <span>Drag Slider To Visualize</span>
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* TRUST SECTION */}
      <section id="why-us" className="py-16 sm:py-20 bg-navy-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.1),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-xs font-black uppercase text-orange-500 tracking-widest mb-3">Guaranteed Safety & Planning</h2>
            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight">Why Homeowners Choose CINORS</h3>
            <div className="w-16 h-1 bg-orange-500 mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {trustCards.map((card, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.4, delay: idx * 0.1 }} className="p-6 sm:p-8 rounded-xl glass-dark-card hover:border-orange-500/40 hover:bg-navy-900/80 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-5 group-hover:bg-orange-500/10 transition-colors">{card.icon}</div>
                <h4 className="text-lg sm:text-xl font-bold mb-3 tracking-tight group-hover:text-orange-400 transition-colors">{card.title}</h4>
                <p className="text-sm text-navy-100/70 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-16 sm:py-20 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-xs font-black uppercase text-orange-500 tracking-widest mb-3">Professional Blueprints</h2>
            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-navy-950">Our Design & Engineering Services</h3>
            <div className="w-16 h-1 bg-orange-500 mx-auto mt-4" />
            <p className="text-navy-900/60 mt-4 text-sm sm:text-base">From initial Vastu-compliant layouts to ready-to-execute structural blueprints.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, idx) => (
              <motion.div key={idx} whileHover={{ y: -5 }} className="p-6 sm:p-8 rounded-xl bg-white border border-slate-200/80 hover:border-orange-500/30 hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-orange-500 scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-300" />
                <div className="w-14 h-14 rounded-lg bg-navy-50/50 flex items-center justify-center mb-5 group-hover:bg-orange-500/10 transition-colors">{service.icon}</div>
                <h4 className="text-lg sm:text-xl font-bold text-navy-950 mb-3 tracking-tight group-hover:text-orange-500 transition-colors">{service.title}</h4>
                <p className="text-sm text-navy-900/60 leading-relaxed mb-5">{service.description}</p>
                <button onClick={() => triggerQuickWhatsApp(service.title)} className="inline-flex items-center gap-1 text-xs font-bold text-orange-500 hover:text-orange-600 transition-colors uppercase tracking-wider">
                  Inquire Now <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM / SOLUTION SECTION */}
      <section className="py-16 sm:py-20 bg-white border-y border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-xs font-black uppercase text-orange-500 tracking-widest mb-3">Pre-Construction Safety</h2>
            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-navy-950">Avoid Costly Mistakes Before Construction</h3>
            <div className="w-16 h-1 bg-orange-500 mx-auto mt-4" />
            <p className="text-navy-900/60 mt-4 text-sm sm:text-base">Correcting architectural or structural errors during building is 10x more expensive.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <h4 className="text-lg font-bold text-red-600 flex items-center gap-2 mb-2"><AlertTriangle className="w-5 h-5" /> Critical Risks of Unplanned Construction</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Wrong Room Layouts", desc: "Poor placement affecting ventilation, light, and privacy." },
                  { title: "Wasted Space", desc: "Inefficient zoning leading to unused dark corners and passages." },
                  { title: "Structural Errors", desc: "Weak foundations and misaligned beams cause building cracks." },
                  { title: "Unexpected Costs", desc: "Improper estimations leading to material over-ordering or budget overrun." },
                ].map((r, i) => (
                  <div key={i} className="p-4 rounded-lg bg-red-50/50 border border-red-100 flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                    <div><h5 className="font-bold text-sm text-navy-950">{r.title}</h5><p className="text-[11px] text-navy-900/60">{r.desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-navy-950 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.15),transparent_60%)] pointer-events-none" />
              <span className="px-3 py-1 rounded bg-orange-500 text-white font-bold text-[10px] uppercase tracking-wider">The Engineering Solution</span>
              <h4 className="text-xl sm:text-2xl font-black mt-4 mb-4 tracking-tight leading-snug">CINORS Helps You Build With Confidence</h4>
              <p className="text-sm text-navy-100/70 mb-6 leading-relaxed">By providing clear 2D layouts, load-calculated structural drawings, and fully documented construction guides, we secure your building process from Day 1.</p>
              <ul className="space-y-3">
                {["100% Correct Vastu & Direction Alignment", "Column & Foundation Steel Detailing for Safety", "Pre-defined Material Estimations to save up to 15%", "Approved drawings ready for local municipal submission"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" /><span className="text-sm font-semibold">{item}</span></li>
                ))}
              </ul>
              <div className="mt-7 pt-6 border-t border-white/10 flex items-center justify-between gap-4 flex-wrap">
                <button onClick={() => setIsModalOpen(true)} className="px-6 py-3 bg-orange-500 text-white text-sm font-bold rounded-md hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20 active:scale-95">Consult An Engineer</button>
                <div className="text-right"><span className="text-orange-500 block font-bold text-xs uppercase tracking-wide">Call Support</span><a href="tel:+916369646474" className="font-extrabold text-white text-sm hover:text-orange-400 transition-colors">63696 46474</a></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section id="process" className="py-16 sm:py-20 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-xs font-black uppercase text-orange-500 tracking-widest mb-3">Four Simple Steps</h2>
            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-navy-950">How It Works</h3>
            <div className="w-16 h-1 bg-orange-500 mx-auto mt-4" />
          </div>
          <div className="relative">
            <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-orange-200 via-orange-500 to-orange-200 -z-0" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10">
              {processSteps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center lg:items-start text-center lg:text-left bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs relative">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-navy-950 text-white border-4 border-slate-50 flex items-center justify-center font-black text-lg sm:text-xl mb-5 shadow-md z-10">
                    <span className="text-orange-500">{step.step}</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-navy-950 mb-2 tracking-tight">{step.title}</h4>
                  <p className="text-xs text-navy-900/60 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SHOWCASE SECTION */}
      <section id="showcase" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 gap-4">
            <div>
              <h2 className="text-xs font-black uppercase text-orange-500 tracking-widest mb-3">Our Work Portfolio</h2>
              <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-navy-950">Design Showcase</h3>
              <div className="w-16 h-1 bg-orange-500 mt-4" />
            </div>
            <button onClick={() => triggerQuickWhatsApp("Showcase Inquiry")} className="self-start sm:self-auto px-5 py-2.5 border border-navy-200 text-navy-950 text-xs font-bold rounded-md uppercase tracking-wider hover:bg-navy-50 hover:border-navy-300 transition-colors flex items-center gap-2 group">
              Request Custom Design <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {showcaseItems.map((item, idx) => (
              <motion.div key={idx} whileHover={{ y: -5 }} className="group rounded-xl overflow-hidden shadow-lg border border-slate-100 flex flex-col relative h-[340px] sm:h-[380px]">
                <div className="relative w-full h-[240px] sm:h-[280px]">
                  <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent opacity-80" />
                </div>
                <div className="p-5 sm:p-6 bg-white flex-1 flex flex-col justify-between border-t border-slate-100 z-10">
                  <div>
                    <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest block mb-1">{item.category}</span>
                    <h4 className="text-base sm:text-lg font-bold text-navy-950 tracking-tight line-clamp-1 group-hover:text-orange-500 transition-colors">{item.title}</h4>
                  </div>
                  <button onClick={() => triggerQuickWhatsApp(`Inquiry on ${item.title}`)} className="text-[11px] font-bold text-navy-900/60 uppercase tracking-wider hover:text-orange-500 flex items-center gap-1 transition-colors self-start mt-3">
                    View Layout Spec <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FIX 3: REVIEWS SECTION */}
      <section id="reviews" className="py-16 sm:py-20 bg-navy-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(249,115,22,0.08),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-16 gap-4">
            <div className="text-center sm:text-left">
              <h2 className="text-xs font-black uppercase text-orange-500 tracking-widest mb-3">Happy Clients</h2>
              <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight">Client Reviews</h3>
              <div className="w-16 h-1 bg-orange-500 mt-4 mx-auto sm:mx-0" />
              <div className="flex items-center gap-2 mt-4 justify-center sm:justify-start">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-orange-500 text-orange-500" />)}
                </div>
                <span className="text-orange-500 font-black text-lg">{avgRating}</span>
                <span className="text-white/50 text-sm">({reviews.length} reviews)</span>
              </div>
            </div>
            <button onClick={() => setIsReviewModalOpen(true)} className="self-center sm:self-auto flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white text-sm font-bold rounded-md hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20 active:scale-95">
              <Star className="w-4 h-4" /> Leave a Review
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {reviews.map((review, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: Math.min(idx, 2) * 0.1 }} className="p-6 sm:p-8 rounded-xl glass-dark-card border border-white/5 flex flex-col justify-between">
                <div>
                  <div className="flex gap-0.5 mb-4">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className={`w-4 h-4 ${s <= review.rating ? "fill-orange-500 text-orange-500" : "text-white/20"}`} />
                    ))}
                  </div>
                  <p className="text-sm text-navy-100/80 leading-relaxed italic mb-6">&ldquo;{review.comment}&rdquo;</p>
                </div>
                <div className="flex items-center gap-3 pt-5 border-t border-white/5">
                  <div className="w-9 h-9 rounded-full bg-orange-500/20 text-orange-400 font-extrabold text-sm flex items-center justify-center shrink-0 border border-orange-500/30">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-white">{review.name}</h5>
                    <span className="text-[11px] text-navy-200/60 font-semibold">{review.location} • {review.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-xs font-black uppercase text-orange-500 tracking-widest mb-3">Common Questions</h2>
            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-navy-950">Frequently Asked Questions</h3>
            <div className="w-16 h-1 bg-orange-500 mx-auto mt-4" />
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="bg-white border border-slate-200 rounded-lg overflow-hidden transition-shadow duration-200 hover:shadow-md">
                  <button onClick={() => setActiveFaq(isOpen ? null : idx)} className="w-full px-5 sm:px-6 py-4 sm:py-5 text-left flex justify-between items-center gap-4 text-navy-950 font-bold hover:text-orange-500 transition-colors">
                    <span className="text-sm sm:text-base">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-navy-400 transition-transform shrink-0 ${isOpen ? "rotate-180 text-orange-500" : ""}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                        <div className="px-5 sm:px-6 pb-5 pt-1 border-t border-slate-100 text-xs sm:text-sm text-navy-900/65 leading-relaxed">{faq.answer}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-16 sm:py-20 bg-navy-950 text-white relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.1),transparent_70%)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="px-3 py-1 rounded bg-orange-500/20 border border-orange-500/40 text-orange-400 font-bold text-xs uppercase tracking-widest">Let&apos;s Build Together</span>
          <h2 className="text-2xl sm:text-5xl font-black mt-6 mb-4 tracking-tight leading-tight">Ready To Turn Your Plot <br />Into A Dream Home?</h2>
          <p className="text-sm sm:text-base text-navy-100/70 max-w-xl mx-auto mb-8 leading-relaxed">Get professional, safety-assured planning blueprints before construction starts. Serving landowners all over Tamil Nadu.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button onClick={() => triggerQuickWhatsApp("Final CTA WhatsApp Now")} className="w-full sm:w-auto px-8 py-4 bg-[#25D366] text-white rounded-md font-bold text-base hover:bg-[#20ba56] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 active:scale-95">
              WhatsApp Now
            </button>
            <button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto px-8 py-4 bg-orange-500 text-white rounded-md font-bold text-base hover:bg-orange-600 transition-colors flex items-center justify-center shadow-lg shadow-orange-500/20 active:scale-95">
              Get Free Consultation
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-navy-950 text-white pt-12 sm:pt-16 pb-10 sm:pb-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 pb-10 sm:pb-12 border-b border-white/10">
            <div className="sm:col-span-2 md:col-span-5 space-y-5">
              <a href="#" className="flex items-center gap-3 relative h-14 w-48">
                <Image src="/images/cinors-logo.png" alt="CINORS Logo" fill className="object-contain brightness-0 invert" />
              </a>
              <p className="text-xs text-navy-200/50 font-bold uppercase tracking-wider">DESIGN • PLAN • VISUALIZE • BUILD</p>
              <p className="text-xs text-navy-200/60 leading-relaxed max-w-sm">We bridge the gap between empty plots and beautiful, structurally safe, custom homes in Tamil Nadu.</p>
            </div>
            <div className="md:col-span-3 space-y-4">
              <h5 className="font-extrabold text-sm uppercase tracking-wider text-orange-500">Quick Services</h5>
              <ul className="space-y-2 text-xs text-navy-200/65">
                {["2D Floor Layouts", "Structural Steel Layouts", "Vastu House Planning", "3D Elevations", "Working Construction Drawings"].map(s => (
                  <li key={s}><a href="#services" className="hover:text-orange-400 transition-colors">{s}</a></li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-4 space-y-4">
              <h5 className="font-extrabold text-sm uppercase tracking-wider text-orange-500">Contact Details</h5>
              <ul className="space-y-3 text-xs text-navy-200/65">
                <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-orange-500 shrink-0" /><span>Call Us: <a href="tel:+916369646474" className="hover:text-white transition-colors">+91 63696 46474</a></span></li>
                <li className="flex items-center gap-2"><MessageSquare className="w-4 h-4 text-orange-500 shrink-0" /><span>WhatsApp: <a href="https://wa.me/919445040193" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">+91 94450 40193</a></span></li>
                <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-orange-500 shrink-0" /><span>Email: <a href="mailto:cinorsdesign@gmail.com" className="hover:text-white transition-colors">cinorsdesign@gmail.com</a></span></li>
                <li className="flex items-start gap-2"><MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" /><span>Head Office: Tamil Nadu, Serving All Districts</span></li>
              </ul>
            </div>
          </div>
          <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] text-navy-200/40 font-semibold">
            <p>&copy; {new Date().getFullYear()} CINORS. All Rights Reserved.</p>
            <div className="flex gap-4"><span className="text-orange-500/70">Verified Civil Engineering Firm</span><span>•</span><a href="#faq" className="hover:text-white transition-colors">FAQ</a></div>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-30">
        <a href="https://wa.me/919445040193?text=Hi%20CINORS,%20I%20have%20a%20plot%20and%20would%20like%20to%20get%20a%20free%20consultation." target="_blank" rel="noopener noreferrer" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all group relative animate-bounce">
          <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-white" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.248 8.477 3.517 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.59 2.028 14.108.977 11.983.977c-5.437 0-9.863 4.37-9.867 9.8a9.74 9.74 0 0 0 1.502 5.093l-1.015 3.7.83-.217 2.083-1.636z" />
            <path d="M16.924 13.917c-.27-.135-1.597-.788-1.846-.878-.247-.09-.427-.135-.607.135-.18.27-.697.878-.854 1.058-.158.18-.315.202-.585.067-.27-.135-1.138-.419-2.167-1.338-.802-.715-1.343-1.6-1.5-1.871-.158-.27-.017-.417.118-.552.122-.122.27-.315.405-.472.135-.158.18-.27.27-.45.09-.18.045-.337-.022-.472-.068-.135-.608-1.464-.833-2.005-.22-.527-.44-.457-.607-.465-.158-.007-.338-.007-.518-.007-.18 0-.472.067-.72.337-.247.27-.945.923-.945 2.25s.967 2.61 1.102 2.79c.135.18 1.902 2.904 4.609 4.073.644.278 1.147.444 1.539.569.648.206 1.238.177 1.704.107.52-.078 1.597-.652 1.821-1.282.225-.63.225-1.17.158-1.282-.068-.113-.248-.18-.518-.315z" />
          </svg>
          <span className="absolute right-14 sm:right-16 scale-0 group-hover:scale-100 transition-all origin-right bg-navy-950 text-white font-bold text-xs py-2 px-3 rounded shadow-xl whitespace-nowrap border border-white/10 hidden sm:flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" /> Chat With An Engineer
          </span>
        </a>
      </div>

      {/* CONSULTATION MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 15 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 15 }} transition={{ duration: 0.3, ease: "easeOut" }} className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 z-10 p-5 sm:p-8 max-h-[90vh] overflow-y-auto">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 p-2 text-navy-400 hover:text-navy-950 hover:bg-navy-50 rounded-full transition-all"><X className="w-5 h-5" /></button>
              <div className="mb-5 pr-6">
                <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest block mb-1">100% Free Consultation</span>
                <h4 className="text-xl sm:text-2xl font-black text-navy-950 tracking-tight leading-tight">Design Your Dream Home</h4>
                <p className="text-xs text-navy-900/60 mt-1 leading-relaxed">Enter your plot details below and our engineers will contact you.</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { id: "name", label: "Your Name", type: "text", placeholder: "e.g. Parthiban", field: "name" },
                  { id: "phone", label: "Phone Number", type: "tel", placeholder: "e.g. 9876543210", field: "phone" },
                  { id: "location", label: "Plot District/City", type: "text", placeholder: "e.g. Trichy / Madurai", field: "location" },
                  { id: "plotSize", label: "Plot Dimensions / Size", type: "text", placeholder: "e.g. 30x40 ft (1200 sq.ft)", field: "plotSize" },
                ].map(f => (
                  <div key={f.id}>
                    <label htmlFor={f.id} className="block text-[11px] font-bold text-navy-900 uppercase tracking-wider mb-1.5">{f.label}</label>
                    <input type={f.type} id={f.id} required value={formData[f.field as keyof typeof formData]} onChange={(e) => setFormData({ ...formData, [f.field]: e.target.value })} placeholder={f.placeholder} className="w-full px-4 py-3 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 text-navy-950" />
                  </div>
                ))}
                <div>
                  <label htmlFor="stage" className="block text-[11px] font-bold text-navy-900 uppercase tracking-wider mb-1.5">Current Stage</label>
                  <select id="stage" value={formData.stage} onChange={(e) => setFormData({ ...formData, stage: e.target.value })} className="w-full px-4 py-3 text-xs sm:text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 text-navy-950">
                    <option>Bought a Plot & Planning</option>
                    <option>Need 2D/3D Drawings Only</option>
                    <option>Starting construction soon</option>
                    <option>Already building, need revisions</option>
                  </select>
                </div>
                <button type="submit" disabled={formSubmitted} className={`w-full py-4 text-sm font-bold rounded-lg text-white transition-all flex items-center justify-center gap-2 mt-2 active:scale-98 ${formSubmitted ? "bg-emerald-500" : "bg-orange-500 hover:bg-orange-600 shadow-xl shadow-orange-500/10"}`}>
                  {formSubmitted ? <><Check className="w-5 h-5" /> Connecting to WhatsApp...</> : <>Submit & Get Consulted <ArrowRight className="w-4 h-4" /></>}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* REVIEW MODAL */}
      <AnimatePresence>
        {isReviewModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsReviewModalOpen(false)} className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 15 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 15 }} transition={{ duration: 0.3, ease: "easeOut" }} className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 z-10 p-5 sm:p-8 max-h-[90vh] overflow-y-auto">
              <button onClick={() => setIsReviewModalOpen(false)} className="absolute top-4 right-4 p-2 text-navy-400 hover:text-navy-950 hover:bg-navy-50 rounded-full transition-all"><X className="w-5 h-5" /></button>
              <div className="mb-6 pr-6">
                <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest block mb-1">Share Your Experience</span>
                <h4 className="text-xl sm:text-2xl font-black text-navy-950 tracking-tight">Leave a Review</h4>
                <p className="text-xs text-navy-900/60 mt-1">Your feedback helps other homeowners make informed decisions.</p>
              </div>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-navy-900 uppercase tracking-wider mb-1.5">Your Name *</label>
                  <input type="text" required value={reviewForm.name} onChange={e => setReviewForm({...reviewForm, name: e.target.value})} placeholder="e.g. Karthik R." className="w-full px-4 py-3 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 text-navy-950" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-navy-900 uppercase tracking-wider mb-1.5">Location</label>
                  <input type="text" value={reviewForm.location} onChange={e => setReviewForm({...reviewForm, location: e.target.value})} placeholder="e.g. Chennai / Madurai" className="w-full px-4 py-3 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 text-navy-950" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-navy-900 uppercase tracking-wider mb-2">Rating *</label>
                  <div className="flex gap-2">
                    {[1,2,3,4,5].map(star => (
                      <button key={star} type="button" onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)} onClick={() => setReviewForm({...reviewForm, rating: star})} className="transition-transform hover:scale-110 active:scale-95">
                        <Star className={`w-8 h-8 transition-colors ${star <= (hoverRating || reviewForm.rating) ? "fill-orange-500 text-orange-500" : "text-slate-300"}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-navy-900 uppercase tracking-wider mb-1.5">Your Review *</label>
                  <textarea required value={reviewForm.comment} onChange={e => setReviewForm({...reviewForm, comment: e.target.value})} placeholder="Share your experience with CINORS..." rows={4} className="w-full px-4 py-3 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 text-navy-950 resize-none" />
                </div>
                <button type="submit" disabled={reviewSubmitted} className={`w-full py-4 text-sm font-bold rounded-lg text-white transition-all flex items-center justify-center gap-2 active:scale-98 ${reviewSubmitted ? "bg-emerald-500" : "bg-orange-500 hover:bg-orange-600 shadow-xl shadow-orange-500/10"}`}>
                  {reviewSubmitted ? <><Check className="w-5 h-5" /> Review Posted!</> : <><Send className="w-4 h-4" /> Submit Review</>}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
