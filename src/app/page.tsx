"use client";

import React, { useState, useRef } from "react";
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
  MessageSquare
} from "lucide-react";

// Types
interface ServiceCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface TrustCard {
  title: string;
  icon: React.ReactNode;
  desc: string;
}

interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

interface ShowcaseItem {
  title: string;
  category: string;
  image: string;
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  location: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

export default function HomePage() {
  // States
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    plotSize: "",
    stage: "Bought a Plot & Planning",
  });

  const sliderRef = useRef<HTMLDivElement>(null);

  // Handle Before/After slider drag/move
  const handleMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1 || isDragging) {
      handleMove(e.clientX);
    }
  };

  // Form submission: Saves data locally (mock) and redirects to WhatsApp
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);

    const message = `Hi CINORS,
I would like to get a Free Consultation for my plot. Here are my details:
• Name: ${formData.name}
• Phone: ${formData.phone}
• Plot Location: ${formData.location}
• Plot Size: ${formData.plotSize}
• Current Stage: ${formData.stage}

Please guide me on the next steps. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/916369646474?text=${encodedMessage}`;

    // Small delay to allow user to see the success state
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setIsModalOpen(false);
      setFormSubmitted(false);
      setFormData({
        name: "",
        phone: "",
        location: "",
        plotSize: "",
        stage: "Bought a Plot & Planning",
      });
    }, 1500);
  };

  // Quick WhatsApp link trigger
  const triggerQuickWhatsApp = (context: string) => {
    const message = `Hi CINORS, I am interested in your ${context}. I would like to schedule a free consultation for my house planning.`;
    const whatsappUrl = `https://wa.me/916369646474?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  // Custom data arrays
  const trustCards: TrustCard[] = [
    {
      title: "Professional Planning",
      icon: <Ruler className="w-6 h-6 text-orange-500" />,
      desc: "Optimized and standard layouts designed by qualified engineers."
    },
    {
      title: "Structural Safety",
      icon: <ShieldCheck className="w-6 h-6 text-orange-500" />,
      desc: "Strong, earthquake-resistant designs built to last generations."
    },
    {
      title: "Customized Solutions",
      icon: <Sparkles className="w-6 h-6 text-orange-500" />,
      desc: "Tailored concepts mapped specifically to your land and life."
    },
    {
      title: "On-Time Delivery",
      icon: <Clock className="w-6 h-6 text-orange-500" />,
      desc: "Get your complete set of engineering drawings strictly on schedule."
    },
    {
      title: "Quality Assured",
      icon: <ThumbsUp className="w-6 h-6 text-orange-500" />,
      desc: "Every blueprint is double-checked for regulatory compliance."
    },
    {
      title: "Dedicated Support",
      icon: <MessageSquare className="w-6 h-6 text-orange-500" />,
      desc: "Constant guidance from design finalization to construction setup."
    }
  ];

  const services: ServiceCard[] = [
    {
      icon: <Layers className="w-8 h-8 text-orange-500" />,
      title: "2D Floor Planning",
      description: "Functional, space-optimized layouts tailored to modern living requirements."
    },
    {
      icon: <FileText className="w-8 h-8 text-orange-500" />,
      title: "Structural Design Drawings",
      description: "Safe, construction-ready foundation, column, and beam structural drawings."
    },
    {
      icon: <Compass className="w-8 h-8 text-orange-500" />,
      title: "Vastu-Friendly Layouts",
      description: "Balanced, compliant spatial planning aligned with your spiritual preferences."
    },
    {
      icon: <Home className="w-8 h-8 text-orange-500" />,
      title: "3D Elevation Design",
      description: "Photorealistic 3D external models to visualize your dream home before laying a brick."
    },
    {
      icon: <Paintbrush className="w-8 h-8 text-orange-500" />,
      title: "Interior Design Concepts",
      description: "Stunning, functional interior concepts crafted to fit your lifestyle perfectly."
    },
    {
      icon: <ArrowUpRight className="w-8 h-8 text-orange-500" />,
      title: "Construction Ready Drawings",
      description: "Detailed working blueprints covering electrical, plumbing, and brick layouts."
    }
  ];

  const processSteps: ProcessStep[] = [
    {
      step: "01",
      title: "Share Your Plot Details",
      description: "Provide your plot dimensions, location in Tamil Nadu, and your core home requirements."
    },
    {
      step: "02",
      title: "Receive Design Concepts",
      description: "Review initial customized 2D layout drafts and preliminary spatial blueprints."
    },
    {
      step: "03",
      title: "Finalize Plans & Drawings",
      description: "Perfect the layout and receive construction-ready structural & elevation engineering drawings."
    },
    {
      step: "04",
      title: "Start Construction with Confidence",
      description: "Hand over the professional drawings to your builders to avoid site errors and costly reworks."
    }
  ];

  const showcaseItems: ShowcaseItem[] = [
    {
      title: "Modern Minimalist Villa",
      category: "3D Elevation & Planning",
      image: "/images/dream-home.png"
    },
    {
      title: "Contemporary Double-Story Home",
      category: "Residential Architecture",
      image: "/images/modern-villa.png"
    },
    {
      title: "Luxury Lounge Interior Concept",
      category: "Interior Design",
      image: "/images/interior-design.png"
    }
  ];

  const testimonials: Testimonial[] = [
    {
      quote: "I bought a 2400 sq.ft plot in Trichy and was confused about how to structure it. CINORS gave us a Vastu-friendly 2D layout and a beautiful 3D elevation. Our contractor easily followed their construction-ready structural drawings.",
      author: "Praveen Kumar",
      role: "Plot Owner",
      location: "Trichy"
    },
    {
      quote: "Choosing CINORS was the best pre-construction decision we made. Their structural drawings saved us from committing column placement errors that would have cost us lakhs to fix later. Fully recommended!",
      author: "Selvi R.",
      role: "Homeowner",
      location: "Madurai"
    },
    {
      quote: "Highly professional service! Even though our site was in Coimbatore, their remote coordination, prompt drawing delivery, and civil engineering advice were outstanding. The rates are very transparent.",
      author: "Vigneshwaran K.",
      role: "Residential Client",
      location: "Coimbatore"
    }
  ];

  const faqs: FAQItem[] = [
    {
      question: "How much does house planning cost?",
      answer: "Our planning packages are extremely affordable and depend on your plot size and scope (e.g., whether you need only 2D floor plans, or full structural + 3D elevation drawings). Contact us with your dimensions for a custom, transparent quote."
    },
    {
      question: "Do you provide structural drawings?",
      answer: "Yes, we specialize in providing highly detailed, construction-ready structural drawings. This includes foundation plans, column layouts, beam detailing, and slab reinforcement specifications to guarantee safety and compliance."
    },
    {
      question: "Do you work across Tamil Nadu?",
      answer: "Yes! CINORS serves landowners and builders all over Tamil Nadu. Through online consultations, site maps, and call-coordination, we deliver high-quality, precise digital drawing sets ready for local municipal approvals and execution."
    },
    {
      question: "Can I get a 3D elevation design?",
      answer: "Absolutely! We create high-quality, photorealistic 3D external elevation designs. This allows you to select color palettes, window layouts, compound wall designs, and cladding materials before construction starts."
    },
    {
      question: "What is included in the design package?",
      answer: "Our complete design package includes: 2D Floor Plan (Vastu-compliant), Detailed Structural Drawings (Safety layout), 3D Elevation Render, and Working Drawings (Electrical, Plumbing, and Brick Masonry layout)."
    },
    {
      question: "How do I get started?",
      answer: "It's simple: click 'Get Free Consultation' to fill out our plot inquiry form, or click the WhatsApp button. Send us your plot dimensions and location, and our civil design team will guide you step-by-step."
    }
  ];

  return (
    <div className="relative min-h-screen selection:bg-orange-500 selection:text-white overflow-x-hidden font-sans">
      
      {/* BACKGROUND DECORATION */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-navy-50/40 to-transparent -z-10 pointer-events-none" />
      
      {/* STICKY HEADER */}
      <header className="sticky top-0 w-full z-40 transition-all duration-300 glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Container */}
          <a href="#" className="flex items-center gap-3 relative h-12 w-48 sm:w-56">
            <Image
              src="/images/cinors-logo.png"
              alt="CINORS Logo"
              fill
              className="object-contain"
              priority
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-navy-900/80">
            <a href="#services" className="hover:text-orange-500 transition-colors">Services</a>
            <a href="#why-us" className="hover:text-orange-500 transition-colors">Why Choose Us</a>
            <a href="#process" className="hover:text-orange-500 transition-colors">Our Process</a>
            <a href="#showcase" className="hover:text-orange-500 transition-colors">Showcase</a>
            <a href="#faq" className="hover:text-orange-500 transition-colors">FAQ</a>
          </nav>

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 bg-orange-500 text-white rounded-md font-semibold text-sm hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 active:scale-95"
            >
              Get Free Consultation
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-navy-950 hover:bg-navy-50 rounded-md transition-colors"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-navy-50 bg-white shadow-xl overflow-hidden"
            >
              <div className="px-4 pt-3 pb-6 flex flex-col gap-4">
                <a
                  href="#services"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-3 py-2 text-[15px] font-medium text-navy-900 hover:bg-navy-50 rounded-md transition-colors"
                >
                  Services
                </a>
                <a
                  href="#why-us"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-3 py-2 text-[15px] font-medium text-navy-900 hover:bg-navy-50 rounded-md transition-colors"
                >
                  Why Choose Us
                </a>
                <a
                  href="#process"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-3 py-2 text-[15px] font-medium text-navy-900 hover:bg-navy-50 rounded-md transition-colors"
                >
                  Our Process
                </a>
                <a
                  href="#showcase"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-3 py-2 text-[15px] font-medium text-navy-900 hover:bg-navy-50 rounded-md transition-colors"
                >
                  Showcase
                </a>
                <a
                  href="#faq"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-3 py-2 text-[15px] font-medium text-navy-900 hover:bg-navy-50 rounded-md transition-colors"
                >
                  FAQ
                </a>
                <div className="grid grid-cols-1 gap-3 pt-3 border-t border-navy-50">
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsModalOpen(true);
                    }}
                    className="w-full py-3 bg-orange-500 text-white text-center rounded-md font-semibold text-sm hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/10"
                  >
                    Get Free Consultation
                  </button>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      triggerQuickWhatsApp("Mobile Menu Contact");
                    }}
                    className="w-full py-3 border border-navy-200 text-navy-950 text-center rounded-md font-semibold text-sm hover:bg-navy-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-orange-500" /> WhatsApp Direct
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center py-12 md:py-20 lg:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-50 border border-navy-100 text-navy-950 font-bold text-xs uppercase tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              Serving All Over Tamil Nadu
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-navy-950 tracking-tight leading-[1.08] mb-6">
              Bought A Plot & <br className="hidden sm:inline" />
              <span className="text-orange-500">Don&apos;t Know</span> <br />
              Where To Start?
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-navy-900/70 max-w-xl mb-8 leading-relaxed">
              We help transform your empty plot into a well-planned, construction-ready home with professional floor plans, safety-assured structural drawings, and photorealistic 3D designs.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-4 bg-orange-500 text-white rounded-md font-bold text-base hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/25 flex items-center justify-center gap-2 group active:scale-98"
              >
                Get Free Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="#services"
                className="px-8 py-4 border border-navy-200 bg-white/50 backdrop-blur text-navy-950 rounded-md font-bold text-base hover:bg-navy-50 hover:border-navy-300 transition-all text-center flex items-center justify-center"
              >
                View Services
              </a>
            </div>

            {/* Interactive Badge Info */}
            <div className="mt-10 sm:mt-12 flex flex-wrap gap-x-8 gap-y-3 pt-8 border-t border-navy-100 w-full max-w-xl">
              <div>
                <span className="block font-black text-2xl text-navy-950">100%</span>
                <span className="text-xs text-navy-900/60 font-semibold uppercase tracking-wider">Vastu Friendly Layouts</span>
              </div>
              <div>
                <span className="block font-black text-2xl text-navy-950">Safe & Approved</span>
                <span className="text-xs text-navy-900/60 font-semibold uppercase tracking-wider">Certified Structural Quality</span>
              </div>
              <div>
                <span className="block font-black text-2xl text-navy-950">Tamil Nadu</span>
                <span className="text-xs text-navy-900/60 font-semibold uppercase tracking-wider">Comprehensive State Coverage</span>
              </div>
            </div>

          </div>

          {/* Right Visual Interactive Slider Column */}
          <div className="lg:col-span-6 flex justify-center relative w-full h-[350px] sm:h-[480px] lg:h-[500px]">
            
            {/* Grid Line Visual Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:32px_32px] opacity-40 -z-10 rounded-2xl" />

            <div 
              ref={sliderRef}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white select-none cursor-ew-resize group"
            >
              
              {/* IMAGE 1: Underneath (DREAM HOME) */}
              <div className="absolute inset-0 w-full h-full bg-slate-900">
                <Image
                  src="/images/dream-home.png"
                  alt="Transformed Modern Dream Home"
                  fill
                  className="object-cover pointer-events-none"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                
                {/* Dream Home Info Box */}
                <div className="absolute bottom-4 right-4 bg-navy-950/90 text-white px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider backdrop-blur-sm z-10 border border-white/10">
                  Modern Dream Home
                </div>
              </div>

              {/* IMAGE 2: Clipped Cover (EMPTY PLOT) */}
              <div 
                className="absolute inset-0 w-full h-full overflow-hidden bg-slate-800"
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
                
                {/* Architectural Coordinate Overlays over Empty Plot */}
                <div className="absolute inset-0 bg-navy-950/10 pointer-events-none">
                  {/* Faint Plot measurements */}
                  <div className="absolute top-12 left-12 border-l border-t border-dashed border-orange-500/80 pl-2 pt-1">
                    <span className="text-[10px] sm:text-xs font-bold text-orange-500 bg-white/95 px-1 py-0.5 rounded border border-orange-200">BOUNDARY: 40 FT</span>
                  </div>
                  <div className="absolute bottom-16 left-24 border-b border-r border-dashed border-orange-500/80 pr-2 pb-1">
                    <span className="text-[10px] sm:text-xs font-bold text-orange-500 bg-white/95 px-1 py-0.5 rounded border border-orange-200">WIDTH: 30 FT</span>
                  </div>
                  <div className="absolute top-1/3 left-1/3 p-2 bg-navy-950/80 text-white rounded border border-white/20 backdrop-blur-xs flex flex-col gap-0.5">
                    <span className="text-[9px] font-bold text-orange-400">STAGE 01</span>
                    <span className="text-[11px] font-extrabold">VACANT PLOT</span>
                  </div>
                </div>

                {/* Empty Plot Info Box */}
                <div className="absolute bottom-4 left-4 bg-orange-500 text-white px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider z-10 border border-orange-600">
                  Your Vacant Plot
                </div>
              </div>

              {/* SLIDER HANDLE BAR */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20"
                style={{ left: `${sliderPosition}%` }}
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
              >
                {/* Drag Handle Indicator */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-xl border-2 border-orange-500 flex items-center justify-center cursor-ew-resize hover:scale-110 active:scale-95 transition-all">
                  <div className="flex gap-1">
                    <span className="text-orange-500 font-black text-xs">&lt;</span>
                    <span className="text-orange-500 font-black text-xs">&gt;</span>
                  </div>
                </div>
              </div>

              {/* Top Slider Helper Message */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-navy-950/85 text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg backdrop-blur-xs pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity">
                <span>Drag Slider To Visualize</span>
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* TRUST SECTION */}
      <section id="why-us" className="py-20 bg-navy-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.1),transparent_50%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-black uppercase text-orange-500 tracking-widest mb-3">Guaranteed Safety & Planning</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Why Homeowners Choose CINORS</h3>
            <div className="w-16 h-1 bg-orange-500 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trustCards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-8 rounded-xl glass-dark-card hover:border-orange-500/40 hover:bg-navy-900/80 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6 group-hover:bg-orange-500/10 transition-colors">
                  {card.icon}
                </div>
                <h4 className="text-xl font-bold mb-3 tracking-tight group-hover:text-orange-400 transition-colors">{card.title}</h4>
                <p className="text-sm text-navy-100/70 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-20 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-black uppercase text-orange-500 tracking-widest mb-3">Professional Blueprints</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-navy-950">Our Design & Engineering Services</h3>
            <div className="w-16 h-1 bg-orange-500 mx-auto mt-4" />
            <p className="text-navy-900/60 mt-4 text-sm sm:text-base">
              From initial Vastu-compliant layouts to ready-to-execute structural blueprints, we provide end-to-end design packages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="p-8 rounded-xl bg-white border border-slate-200/80 hover:border-orange-500/30 hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
              >
                {/* Subtle side stripe */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-orange-500 scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-300" />
                
                <div className="w-16 h-16 rounded-lg bg-navy-50/50 flex items-center justify-center mb-6 group-hover:bg-orange-500/10 transition-colors">
                  {service.icon}
                </div>
                <h4 className="text-xl font-bold text-navy-950 mb-3 tracking-tight group-hover:text-orange-500 transition-colors">
                  {service.title}
                </h4>
                <p className="text-sm text-navy-900/60 leading-relaxed mb-6">
                  {service.description}
                </p>
                <button
                  onClick={() => triggerQuickWhatsApp(service.title)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-orange-500 hover:text-orange-600 transition-colors uppercase tracking-wider"
                >
                  Inquire Now <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* PROBLEM / SOLUTION SECTION */}
      <section className="py-20 bg-white border-y border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-black uppercase text-orange-500 tracking-widest mb-3">Pre-Construction Safety</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-navy-950">Avoid Costly Mistakes Before Construction</h3>
            <div className="w-16 h-1 bg-orange-500 mx-auto mt-4" />
            <p className="text-navy-900/60 mt-4 text-sm sm:text-base">
              Correcting architectural or structural errors during building is 10x more expensive. Proper engineering design prevents these issues.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side: The Mistakes */}
            <div className="lg:col-span-6 space-y-6">
              <h4 className="text-lg font-bold text-red-600 flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5" /> Critical Risks of Unplanned Construction
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-red-50/50 border border-red-100 flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                  <div>
                    <h5 className="font-bold text-sm text-navy-950">Wrong Room Layouts</h5>
                    <p className="text-[11px] text-navy-900/60">Poor placement affecting ventilation, light, and privacy.</p>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg bg-red-50/50 border border-red-100 flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                  <div>
                    <h5 className="font-bold text-sm text-navy-950">Wasted Space</h5>
                    <p className="text-[11px] text-navy-900/60">Inefficient zoning leading to unused dark corners and passages.</p>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-red-50/50 border border-red-100 flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                  <div>
                    <h5 className="font-bold text-sm text-navy-950">Structural Errors</h5>
                    <p className="text-[11px] text-navy-900/60">Weak foundations and misaligned beams cause building cracks.</p>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-red-50/50 border border-red-100 flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                  <div>
                    <h5 className="font-bold text-sm text-navy-950">Unexpected Costs</h5>
                    <p className="text-[11px] text-navy-900/60">Improper estimations leading to material over-ordering or budget overrun.</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-red-50/50 border border-red-100 flex items-start gap-3 w-full">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                <div>
                  <h5 className="font-bold text-sm text-navy-950">Construction Rework</h5>
                  <p className="text-[11px] text-navy-900/60">Demolishing walls or columns at the building site due to lack of standard reference drawings.</p>
                </div>
              </div>
            </div>

            {/* Right side: The CINORS Solution */}
            <div className="lg:col-span-6 p-8 rounded-2xl bg-navy-950 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.15),transparent_60%)] pointer-events-none" />
              
              <span className="px-3 py-1 rounded bg-orange-500 text-white font-bold text-[10px] uppercase tracking-wider">The Engineering Solution</span>
              
              <h4 className="text-2xl font-black mt-4 mb-4 tracking-tight leading-snug">
                CINORS Helps You Build With Confidence
              </h4>
              
              <p className="text-sm text-navy-100/70 mb-8 leading-relaxed">
                By providing clear 2D layouts, load-calculated structural drawings, and fully documented construction guides, we secure your building process from Day 1.
              </p>

              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" />
                  <span className="text-sm font-semibold">100% Correct Vastu & Direction Alignment</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" />
                  <span className="text-sm font-semibold">Column & Foundation Steel Detailing for Safety</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" />
                  <span className="text-sm font-semibold">Pre-defined Material Estimations to save up to 15%</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" />
                  <span className="text-sm font-semibold">Approved drawings ready for local municipal submission</span>
                </li>
              </ul>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-6 py-3 bg-orange-500 text-white text-sm font-bold rounded-md hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20 active:scale-95"
                >
                  Consult An Engineer
                </button>
                <div className="text-right">
                  <span className="text-orange-500 block font-bold text-xs uppercase tracking-wide">Contact Desk</span>
                  <span className="font-extrabold text-white text-sm">63696 46474</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* PROCESS SECTION */}
      <section id="process" className="py-20 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-black uppercase text-orange-500 tracking-widest mb-3">Four Simple Steps</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-navy-950">How It Works</h3>
            <div className="w-16 h-1 bg-orange-500 mx-auto mt-4" />
          </div>

          <div className="relative">
            {/* Timeline connection line (desktop only) */}
            <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-orange-200 via-orange-500 to-orange-200 -z-0" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {processSteps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center lg:items-start text-center lg:text-left bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs relative">
                  
                  {/* Step Bubble */}
                  <div className="w-16 h-16 rounded-full bg-navy-950 text-white border-4 border-slate-50 flex items-center justify-center font-black text-xl mb-6 shadow-md transition-all group-hover:bg-orange-500 z-10">
                    <span className="text-orange-500">{step.step}</span>
                  </div>

                  <h4 className="text-lg font-black text-navy-950 mb-3 tracking-tight">{step.title}</h4>
                  <p className="text-xs text-navy-900/60 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* PROJECT SHOWCASE SECTION */}
      <section id="showcase" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-xs font-black uppercase text-orange-500 tracking-widest mb-3">Our Work Portfolio</h2>
              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-navy-950">Design Showcase</h3>
              <div className="w-16 h-1 bg-orange-500 mt-4" />
            </div>
            <button
              onClick={() => triggerQuickWhatsApp("Showcase Inquiry")}
              className="mt-6 md:mt-0 px-6 py-3 border border-navy-200 text-navy-950 text-xs font-bold rounded-md uppercase tracking-wider hover:bg-navy-50 hover:border-navy-300 transition-colors flex items-center gap-2 group"
            >
              Request Custom Design <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {showcaseItems.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="group rounded-xl overflow-hidden shadow-lg border border-slate-100 flex flex-col relative h-[380px]"
              >
                <div className="relative w-full h-[280px]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent opacity-80" />
                </div>
                
                <div className="p-6 bg-white flex-1 flex flex-col justify-between border-t border-slate-100 z-10">
                  <div>
                    <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest block mb-1">
                      {item.category}
                    </span>
                    <h4 className="text-lg font-bold text-navy-950 tracking-tight line-clamp-1 group-hover:text-orange-500 transition-colors">
                      {item.title}
                    </h4>
                  </div>
                  <button
                    onClick={() => triggerQuickWhatsApp(`Inquiry on ${item.title}`)}
                    className="text-[11px] font-bold text-navy-900/60 uppercase tracking-wider hover:text-orange-500 flex items-center gap-1 transition-colors self-start mt-4"
                  >
                    View Layout Spec <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-20 bg-navy-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(249,115,22,0.08),transparent_50%)]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-black uppercase text-orange-500 tracking-widest mb-3">Happy Clients</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Homeowner Experiences</h3>
            <div className="w-16 h-1 bg-orange-500 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((test, idx) => (
              <div
                key={idx}
                className="p-8 rounded-xl glass-dark-card border border-white/5 flex flex-col justify-between"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-6 text-orange-500">
                    {"★★★★★".split("").map((star, i) => (
                      <span key={i} className="text-lg">{star}</span>
                    ))}
                  </div>
                  <p className="text-sm text-navy-100/80 leading-relaxed italic mb-8">
                    &ldquo;{test.quote}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                  <div className="w-10 h-10 rounded-full bg-orange-500/20 text-orange-400 font-extrabold text-sm flex items-center justify-center shrink-0 border border-orange-500/30">
                    {test.author.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-white">{test.author}</h5>
                    <span className="text-[11px] text-navy-200/60 font-semibold block">
                      {test.role} • {test.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-black uppercase text-orange-500 tracking-widest mb-3">Answers to Common Questions</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-navy-950">Frequently Asked Questions</h3>
            <div className="w-16 h-1 bg-orange-500 mx-auto mt-4" />
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-lg overflow-hidden transition-shadow duration-200 hover:shadow-md"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center gap-4 text-navy-950 font-bold hover:text-orange-500 transition-colors"
                  >
                    <span className="text-sm sm:text-base">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-navy-400 transition-transform shrink-0 ${isOpen ? "rotate-180 text-orange-500" : ""}`} />
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-6 pb-6 pt-1 border-t border-slate-100 text-xs sm:text-sm text-navy-900/65 leading-relaxed">
                          {faq.answer}
                        </div>
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
      <section className="py-20 bg-navy-950 text-white relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.1),transparent_70%)]" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          <span className="px-3 py-1 rounded bg-orange-500/20 border border-orange-500/40 text-orange-400 font-bold text-xs uppercase tracking-widest">
            Let&apos;s Build Together
          </span>

          <h2 className="text-3xl sm:text-5xl font-black mt-6 mb-4 tracking-tight leading-tight">
            Ready To Turn Your Plot <br />
            Into A Dream Home?
          </h2>

          <p className="text-sm sm:text-base text-navy-100/70 max-w-xl mx-auto mb-10 leading-relaxed">
            Get professional, safety-assured planning blueprints before construction starts. Serving landowners all over Tamil Nadu.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => triggerQuickWhatsApp("Final CTA WhatsApp Now")}
              className="w-full sm:w-auto px-8 py-4 bg-[#25D366] text-white rounded-md font-bold text-base hover:bg-[#20ba56] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 active:scale-95"
            >
              WhatsApp Now
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-8 py-4 bg-orange-500 text-white rounded-md font-bold text-base hover:bg-orange-600 transition-colors flex items-center justify-center shadow-lg shadow-orange-500/20 active:scale-95"
            >
              Get Free Consultation
            </button>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-navy-950 text-white pt-16 pb-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-white/10">
            
            {/* Column 1: Info & Logo */}
            <div className="md:col-span-5 space-y-6">
              <a href="#" className="flex items-center gap-3 relative h-16 w-56">
                <Image
                  src="/images/cinors-logo.png"
                  alt="CINORS Logo"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </a>
              <p className="text-xs text-navy-200/50 font-bold uppercase tracking-wider">
                DESIGN • PLAN • VISUALIZE • BUILD
              </p>
              <p className="text-xs text-navy-200/60 leading-relaxed max-w-sm">
                We bridge the gap between empty plots and beautiful, structurally safe, custom homes in Tamil Nadu with expert engineering drawing sets.
              </p>
              <div className="flex gap-4">
                <span className="text-[11px] font-bold text-orange-500 bg-orange-500/10 px-2.5 py-1 rounded border border-orange-500/20">
                  Registered Civil & Structural Designers
                </span>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="md:col-span-3 space-y-4">
              <h5 className="font-extrabold text-sm uppercase tracking-wider text-orange-500">Quick Services</h5>
              <ul className="space-y-2 text-xs text-navy-200/65">
                <li><a href="#services" className="hover:text-orange-400 transition-colors">2D Floor Layouts</a></li>
                <li><a href="#services" className="hover:text-orange-400 transition-colors">Structural Steel Layouts</a></li>
                <li><a href="#services" className="hover:text-orange-400 transition-colors">Vastu House Planning</a></li>
                <li><a href="#services" className="hover:text-orange-400 transition-colors">3D Elevations</a></li>
                <li><a href="#services" className="hover:text-orange-400 transition-colors">Working Construction Drawings</a></li>
              </ul>
            </div>

            {/* Column 3: Contact */}
            <div className="md:col-span-4 space-y-4">
              <h5 className="font-extrabold text-sm uppercase tracking-wider text-orange-500">Contact Details</h5>
              <ul className="space-y-3 text-xs text-navy-200/65">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>Call/WhatsApp: +91 63696 46474</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>Email: cinorsdesign@gmail.com</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                  <span>Head Office: Tamil Nadu, Serving All Districts</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-navy-200/40 font-semibold">
            <p>&copy; {new Date().getFullYear()} CINORS. All Rights Reserved.</p>
            <div className="flex gap-4">
              <span className="text-orange-500/70">Verified Civil Engineering Firm</span>
              <span>•</span>
              <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            </div>
          </div>

        </div>
      </footer>

      {/* FLOATING WHATSAPP LEAD BUTTON */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-2">
        <a
          href="https://wa.me/916369646474?text=Hi%20CINORS,%20I%20have%20a%20plot%20and%20would%20like%20to%20get%20a%20free%20consultation."
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all group relative animate-bounce"
        >
          {/* WhatsApp SVG */}
          <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.248 8.477 3.517 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.59 2.028 14.108.977 11.983.977c-5.437 0-9.863 4.37-9.867 9.8a9.74 9.74 0 0 0 1.502 5.093l-1.015 3.7.83-.217 2.083-1.636z" />
            <path d="M16.924 13.917c-.27-.135-1.597-.788-1.846-.878-.247-.09-.427-.135-.607.135-.18.27-.697.878-.854 1.058-.158.18-.315.202-.585.067-.27-.135-1.138-.419-2.167-1.338-.802-.715-1.343-1.6-1.5-1.871-.158-.27-.017-.417.118-.552.122-.122.27-.315.405-.472.135-.158.18-.27.27-.45.09-.18.045-.337-.022-.472-.068-.135-.608-1.464-.833-2.005-.22-.527-.44-.457-.607-.465-.158-.007-.338-.007-.518-.007-.18 0-.472.067-.72.337-.247.27-.945.923-.945 2.25s.967 2.61 1.102 2.79c.135.18 1.902 2.904 4.609 4.073.644.278 1.147.444 1.539.569.648.206 1.238.177 1.704.107.52-.078 1.597-.652 1.821-1.282.225-.63.225-1.17.158-1.282-.068-.113-.248-.18-.518-.315z" />
          </svg>
          
          {/* Desktop Hover tooltip */}
          <span className="absolute right-16 scale-0 group-hover:scale-100 transition-all origin-right bg-navy-950 text-white font-bold text-xs py-2 px-3 rounded shadow-xl whitespace-nowrap border border-white/10 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
            Chat With An Engineer
          </span>
        </a>
      </div>

      {/* LEAD CONSULTATION MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Modal Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm"
            />

            {/* Modal Dialog Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 z-10 p-6 sm:p-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-navy-400 hover:text-navy-950 hover:bg-navy-50 rounded-full transition-all"
                aria-label="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Form Heading */}
              <div className="mb-6 pr-6">
                <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest block mb-1">
                  100% Free Consultation
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-navy-950 tracking-tight leading-tight">
                  Design Your Dream Home
                </h4>
                <p className="text-xs text-navy-900/60 mt-1 leading-relaxed">
                  Enter your plot details below. Our civil design engineers will compile design choices and contact you.
                </p>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-[11px] font-bold text-navy-900 uppercase tracking-wider mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Parthiban"
                    className="w-full px-4 py-3 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 text-navy-950"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-[11px] font-bold text-navy-900 uppercase tracking-wider mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 9876543210"
                    className="w-full px-4 py-3 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 text-navy-950"
                  />
                </div>

                {/* Location */}
                <div>
                  <label htmlFor="location" className="block text-[11px] font-bold text-navy-900 uppercase tracking-wider mb-1.5">
                    Plot District/City in Tamil Nadu
                  </label>
                  <input
                    type="text"
                    id="location"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Trichy / Madurai"
                    className="w-full px-4 py-3 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 text-navy-950"
                  />
                </div>

                {/* Plot Size */}
                <div>
                  <label htmlFor="plotSize" className="block text-[11px] font-bold text-navy-900 uppercase tracking-wider mb-1.5">
                    Plot Dimensions / Size (sq.ft)
                  </label>
                  <input
                    type="text"
                    id="plotSize"
                    required
                    value={formData.plotSize}
                    onChange={(e) => setFormData({ ...formData, plotSize: e.target.value })}
                    placeholder="e.g. 30x40 ft (1200 sq.ft)"
                    className="w-full px-4 py-3 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 text-navy-950"
                  />
                </div>

                {/* Current Stage */}
                <div>
                  <label htmlFor="stage" className="block text-[11px] font-bold text-navy-900 uppercase tracking-wider mb-1.5">
                    Current stage
                  </label>
                  <select
                    id="stage"
                    value={formData.stage}
                    onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                    className="w-full px-4 py-3 text-xs sm:text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 text-navy-950"
                  >
                    <option value="Bought a Plot & Planning">Bought a Plot & Planning</option>
                    <option value="Need 2D/3D Drawings Only">Need 2D/3D Drawings Only</option>
                    <option value="Starting construction soon">Starting construction soon</option>
                    <option value="Already building, need revisions">Already building, need revisions</option>
                  </select>
                </div>

                {/* Submit button / Success state */}
                <button
                  type="submit"
                  disabled={formSubmitted}
                  className={`w-full py-4 text-sm font-bold rounded-lg text-white transition-all flex items-center justify-center gap-2 mt-6 active:scale-98 ${
                    formSubmitted ? "bg-emerald-500" : "bg-orange-500 hover:bg-orange-600 shadow-xl shadow-orange-500/10"
                  }`}
                >
                  {formSubmitted ? (
                    <>
                      <Check className="w-5 h-5" /> Connecting to WhatsApp...
                    </>
                  ) : (
                    <>
                      Submit & Get Consulted <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>



    </div>
  );
}
