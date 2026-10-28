"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
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
  Send,
  Eye,
  Play,
} from "lucide-react";

interface ServiceCard { icon: React.ReactNode; title: string; description: string; }
interface TrustCard { title: string; icon: React.ReactNode; desc: string; }
interface ProcessStep { step: string; title: string; description: string; }
interface ShowcaseSpec { label: string; value: string; }
interface ShowcaseItem {
  id: string;
  title: string;
  category: string;
  tag: "Commercial" | "Residential" | "Interior";
  image: string;
  gallery?: string[];
  video?: string;
  dimensions?: string;
  description: string;
  specs?: ShowcaseSpec[];
  featured?: boolean;
}
interface FAQItem { question: string; answer: string; }
interface Review { name: string; location: string; rating: number; comment: string; date: string; }

const ShowcaseCardItem = React.memo(function ShowcaseCardItem({
  item,
  index,
  isAutoplayEnabled,
  onOpenModal,
  onInquire,
}: {
  item: ShowcaseItem;
  index: number;
  isAutoplayEnabled: boolean;
  onOpenModal: (item: ShowcaseItem, activeImg?: string) => void;
  onInquire: (title: string) => void;
}) {
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  // Staggered timing per card so every project switches at different times:
  // Each card receives a distinct cycle duration and a different initial delay offset
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

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group rounded-xl overflow-hidden shadow-lg border border-slate-200/80 hover:border-orange-500/30 hover:shadow-xl flex flex-col h-full relative transition-all"
    >
      <div
        className="relative w-full h-[220px] sm:h-[260px] cursor-pointer overflow-hidden bg-slate-900"
        onClick={() => onOpenModal(item, currentImg)}
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
            className="text-xs font-bold text-orange-500 hover:text-orange-600 flex items-center gap-1.5 transition-colors"
          >
            {item.video ? <Play className="w-3.5 h-3.5 fill-current" /> : <Eye className="w-4 h-4" />}
            {item.video ? "Watch Walkthrough" : "View Specs & Gallery"}
          </button>
          <button
            onClick={() => onInquire(`Inquiry on ${item.title}`)}
            className="px-3.5 py-1.5 bg-navy-50 text-navy-950 hover:bg-orange-500 hover:text-white rounded text-[11px] font-bold transition-all flex items-center gap-1"
          >
            Inquire <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
});

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
  const [selectedShowcaseItem, setSelectedShowcaseItem] = useState<ShowcaseItem | null>(null);
  const [activeGalleryImage, setActiveGalleryImage] = useState<string>("");
  const [showVideoPlayer, setShowVideoPlayer] = useState<boolean>(false);
  const [activeShowcaseTag, setActiveShowcaseTag] = useState<string>("All");
  const [isAutoplayEnabled, setIsAutoplayEnabled] = useState<boolean>(true);

  const handleOpenShowcaseModal = useCallback((item: ShowcaseItem, activeImg?: string) => {
    setSelectedShowcaseItem(item);
    setShowVideoPlayer(Boolean(item.video));
    setActiveGalleryImage(activeImg || (item.gallery ? item.gallery[0] : item.image));
  }, []);

  // When modal is open in photo mode with autoplay enabled, advance gallery photos
  useEffect(() => {
    if (!isAutoplayEnabled || !selectedShowcaseItem || showVideoPlayer) return;
    const gallery = selectedShowcaseItem.gallery;
    if (gallery && gallery.length > 1) {
      const interval = setInterval(() => {
        setActiveGalleryImage((prev) => {
          const currentIdx = gallery.indexOf(prev);
          const nextIdx = currentIdx === -1 ? 1 : (currentIdx + 1) % gallery.length;
          return gallery[nextIdx];
        });
      }, 3500);
      return () => clearInterval(interval);
    }
  }, [isAutoplayEnabled, selectedShowcaseItem, showVideoPlayer]);

  const [reviews, setReviews] = useState<Review[]>([
    { name: "Praveen Kumar", location: "Trichy", rating: 5, comment: "I bought a 2400 sq.ft plot and was confused about how to structure it. CINORS gave us a Vastu-friendly 2D layout and a beautiful 3D elevation. Our contractor easily followed their construction-ready structural drawings.", date: "March 2024" },
    { name: "Selvi R.", location: "Madurai", rating: 5, comment: "Choosing CINORS was the best pre-construction decision we made. Their structural drawings saved us from committing column placement errors that would have cost us lakhs to fix later. Fully recommended!", date: "January 2024" },
    { name: "Vigneshwaran K.", location: "Coimbatore", rating: 5, comment: "Highly professional service! Even though our site was in Coimbatore, their remote coordination, prompt drawing delivery, and civil engineering advice were outstanding. The rates are very transparent.", date: "February 2024" },
  ]);

  const [reviewForm, setReviewForm] = useState({ name: "", location: "", rating: 5, comment: "" });

  const [formData, setFormData] = useState({
    name: "", phone: "", location: "", plotSize: "", stage: "Bought a Plot & Planning",
  });

  const [inlineFormData, setInlineFormData] = useState({
    name: "", phone: "", location: "", plotSize: "", service: "Complete Package", stage: "Bought a Plot & Planning",
  });
  const [inlineFormSubmitted, setInlineFormSubmitted] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);

  const [isUserActive, setIsUserActive] = useState(false);
  const userIdleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const phaseRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  // Auto-slide back and forth with creative sinusoidal oscillation
  useEffect(() => {
    let lastTime = performance.now();

    const animateSlider = (currentTime: number) => {
      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      // Only auto-slide when the user is not actively dragging or interacting
      if (!isDragging && !isUserActive) {
        // Complete cycle in ~6.5 seconds (0.95 rad/sec)
        phaseRef.current += 0.95 * delta;
        // Oscillate smoothly between 22% and 78% (amplitude: 28%)
        const targetPos = 50 + 28 * Math.sin(phaseRef.current);

        setSliderPosition((prev) => {
          const diff = targetPos - prev;
          if (Math.abs(diff) < 0.05) return targetPos;
          // Smooth lerp to avoid abrupt jumps when resuming from user drag
          return prev + diff * Math.min(1, delta * 3.2);
        });
      }

      animFrameRef.current = requestAnimationFrame(animateSlider);
    };

    animFrameRef.current = requestAnimationFrame(animateSlider);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isDragging, isUserActive]);

  // Drag interaction logic with mousedown/mouseup tracking
  const handleMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleStartInteraction = () => {
    setIsDragging(true);
    setIsUserActive(true);
    if (userIdleTimerRef.current) clearTimeout(userIdleTimerRef.current);
  };

  const handleEndInteraction = () => {
    setIsDragging(false);
    if (userIdleTimerRef.current) clearTimeout(userIdleTimerRef.current);
    // Pause auto-sweep for 2.2s after interaction, then gently resume
    userIdleTimerRef.current = setTimeout(() => {
      setIsUserActive(false);
    }, 2200);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (e.touches.length > 0) handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const onUp = () => handleEndInteraction();
    window.addEventListener("mouseup", onUp);
    return () => window.removeEventListener("mouseup", onUp);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    const message = `Hi CINORS,\nI would like to get a Free Consultation for my plot. Here are my details:\n• Name: ${formData.name}\n• Phone: ${formData.phone}\n• Plot Location: ${formData.location}\n• Plot Size: ${formData.plotSize}\n• Current Stage: ${formData.stage}\n\nPlease guide me on the next steps. Thank you!`;
    const whatsappUrl = `https://wa.me/918248768635?text=${encodeURIComponent(message)}`;
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

  const triggerQuickWhatsApp = useCallback((context: string) => {
    const message = `Hi CINORS, I am interested in your ${context}. I would like to schedule a free consultation for my house planning.`;
    window.open(`https://wa.me/918248768635?text=${encodeURIComponent(message)}`, "_blank");
  }, []);

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

  const showcaseItems: ShowcaseItem[] = useMemo(() => [
    {
      id: "tensile-canopy",
      title: "Coffee Shop Tensile Canopy",
      category: "Commercial Architecture & Tensile Structures",
      tag: "Commercial",
      image: "/images/tensile-canopy-1.jpg",
      gallery: [
        "/images/tensile-canopy-1.jpg",
        "/images/tensile-canopy-2.jpg",
        "/images/tensile-canopy-3.jpg",
        "/images/tensile-canopy-4.jpg",
      ],
      dimensions: "10.0m x 5.0m (50 m² / ~538 sq.ft)",
      description: "Custom-engineered 10m x 5m cantilevered tensile fabric canopy designed for an outdoor rooftop coffee shop and alfresco seating area, integrated with a modular shipping-container café kiosk.",
      specs: [
        { label: "Span / Footprint", value: "10.0m x 5.0m (50 m² coverage)" },
        { label: "Structural Framing", value: "Heavy-gauge tubular steel columns with cantilevered tension struts" },
        { label: "Roofing Membrane", value: "Architectural PVDF tensile fabric (waterproof, UV & heat resistant)" },
        { label: "Application", value: "Outdoor Coffee Shop, Rooftop Café & Alfresco Dining" },
        { label: "Key Engineering", value: "Tie-back cable tensioners, wind load deflection & integrated rainwater runoff" },
      ],
      featured: true,
    },
    {
      id: "modern-villa",
      title: "Modern Minimalist Villa",
      category: "3D Elevation & Planning",
      tag: "Residential",
      image: "/images/dream-home.png",
      dimensions: "35ft x 50ft Plot",
      description: "Contemporary G+1 independent residential elevation featuring natural stone textures, expansive glass apertures, and vastu-compliant spatial zoning.",
      specs: [
        { label: "Type", value: "G+1 Luxury Residential Villa" },
        { label: "Key Features", value: "Cross-ventilation, open-concept living, private terrace garden" },
      ],
    },
    {
      id: "contemporary-home",
      title: "Contemporary Double-Story Home",
      category: "Residential Architecture",
      tag: "Residential",
      image: "/images/modern-villa.png",
      dimensions: "30ft x 40ft Plot",
      description: "Smart urban duplex engineered to maximize space and natural ventilation on standard residential plots across Tamil Nadu.",
      specs: [
        { label: "Type", value: "Urban Duplex Residence" },
        { label: "Key Features", value: "Efficient structural grid, optimized column sizing, cost-controlled layout" },
      ],
    },
    {
      id: "g1-residential-elevation",
      title: "Contemporary G+1 Residential Elevation",
      category: "Residential Architecture & 3D Elevation",
      tag: "Residential",
      image: "/images/residential-g1-front.jpg",
      gallery: [
        "/images/residential-g1-front.jpg",
        "/images/residential-g1-perspective.jpg",
        "/images/g1-residence-floorplan.jpg",
      ],
      dimensions: "8.0m x 17.0m (195 m² / ~2,100 sq.ft Total Built-Up)",
      description: "A striking G+1 independent residential building designed on a compact 8m x 17m plot, featuring a bold mix of geometric facade elements — vertical wooden-finish cladding, sculpted red and grey accent panels, decorative jali screens, and contrasting warm-neutral tones. The design maximizes street presence with staggered massing, a covered car porch with wooden-finish gates, and a functional open terrace on the first floor ideal for relaxation or future vertical expansion.",
      specs: [
        { label: "Plot Footprint", value: "8.0m x 17.0m (136 m²)" },
        { label: "Building Type", value: "G+1 Independent Residential Dwelling" },
        { label: "Total Built-Up Area", value: "195 m² / ~2,100 sq.ft (Ground + First Floor)" },
        { label: "Floors", value: "Ground Floor + First Floor with open terrace & staircase headroom" },
        { label: "Elevation Style", value: "Contemporary with geometric accent panels, vertical cladding & jali screens" },
        { label: "Key Features", value: "Covered car parking, decorative brick-finish gate pillars, cross-ventilated rooms, first-floor balcony & open terrace" },
        { label: "Facade Materials", value: "Exterior plastered walls, wooden-texture ACP cladding, perforated terracotta jali, natural stone dado at base" },
      ],
      featured: true,
    },
    {
      id: "residential-stilt-canopy",
      title: "Residential Stilt Parking Canopy",
      category: "Tensile Architecture & Parking Canopies",
      tag: "Residential",
      image: "/images/residential-stilt-canopy-front.jpg",
      gallery: [
        "/images/residential-stilt-canopy-front.jpg",
        "/images/residential-stilt-canopy-driveway.jpg",
        "/images/residential-stilt-canopy-angle.jpg",
        "/images/residential-stilt-canopy-aerial.jpg",
      ],
      dimensions: "Modular Cantilever Driveway Span",
      description: "Architectural cantilevered tensile membrane canopy engineered for residential apartment stilt-floor driveways and parking bays. Designed with seamless wall-anchored steel cantilever trusses and high-durability white PVDF fabric, it provides comprehensive sun and rain protection for vehicles while preserving clear driveway circulation without obstructing ground posts.",
      specs: [
        { label: "Canopy Type", value: "Cantilevered Arch Tensile Membrane Canopy" },
        { label: "Application", value: "Apartment Stilt Floor & Driveway Vehicle Parking" },
        { label: "Membrane Material", value: "Architectural PVDF Tensile Fabric (UV-proof, Heat Deflective & Water Repellent)" },
        { label: "Frame & Structure", value: "Precision-curved tubular steel cantilever rafters anchored to RCC stilt columns" },
        { label: "Clearance Design", value: "Post-free outer edge ensuring zero driveway obstruction for smooth turning radii" },
        { label: "Drainage & Safety", value: "Pre-sloped profile for directed storm runoff & engineered wind load dissipation" },
      ],
      featured: true,
    },
    {
      id: "enscape-walkthrough-video",
      title: "Enscape 3D Walkthrough Video",
      category: "3D Animation & Virtual Walkthrough",
      tag: "Residential",
      image: "/images/enscape-video-thumb.jpg",
      video: "/videos/enscape-walkthrough-web.mp4",
      gallery: [
        "/images/enscape-video-thumb.jpg",
      ],
      dimensions: "Full HD Cinematic Walkthrough (01:53)",
      description: "Photorealistic Enscape 3D cinematic walkthrough exploring the residential apartment stilt-floor canopy architecture, cantilevered parking bays, lighting conditions, and vehicular circulation in real-time.",
      specs: [
        { label: "Rendering Engine", value: "Enscape Real-Time Architectural Visualizer" },
        { label: "Walkthrough Scope", value: "Stilt-floor canopy, driveway navigation, lighting & parked vehicles" },
        { label: "Runtime Duration", value: "1 Minute 53 Seconds (Smooth Cinema FPS)" },
        { label: "Project Focus", value: "Pre-construction client spatial walkthrough & structural review" },
        { label: "Engineering Scope", value: "Driveway clearance, cantilever roof behavior & aesthetic coordination" },
      ],
      featured: true,
    },

    {
      id: "catenary-car-parking",
      title: "Catenary Tensile Parking Canopy",
      category: "Modern Tensile Parking Structures",
      tag: "Commercial",
      image: "/images/catenary-car-parking-front.jpg",
      gallery: [
        "/images/catenary-car-parking-front.jpg",
        "/images/catenary-car-parking-aerial.jpg",
        "/images/catenary-car-parking-perspective.jpg",
        "/images/catenary-car-parking-side.jpg",
      ],
      dimensions: "12.0m x 6.0m (72 m² / ~775 sq.ft)",
      description: "An elegant catenary-curve tensile membrane canopy designed for a premium 4-car parking bay. The modern free-form profile is supported by sculptural tree-form steel columns with decorative perforated lattice detailing, creating a striking architectural statement that blends seamlessly into landscaped surroundings.",
      specs: [
        { label: "Span / Footprint", value: "12.0m x 6.0m (72 m² coverage) — 4-Car Capacity" },
        { label: "Roof Profile", value: "Catenary saddle-curve tensile membrane with anticlastic double curvature" },
        { label: "Structural Columns", value: "Sculptural tree-form tubular steel with perforated lattice cladding" },
        { label: "Membrane Material", value: "Architectural PVDF-coated tensile fabric (UV-stabilized, self-cleaning)" },
        { label: "Design Language", value: "Modern, elegant free-form geometry with organic landscape integration" },
        { label: "Foundation", value: "Isolated RCC pad footings with moment-resistant baseplate anchors" },
      ],
      featured: true,
    },
    {
      id: "3car-flat-carport",
      title: "3-Car Flat Roof Carport",
      category: "Residential Parking Canopy",
      tag: "Residential",
      image: "/images/carport-3car-front.jpg",
      gallery: [
        "/images/carport-3car-front.jpg",
        "/images/carport-3car-angle.jpg",
        "/images/carport-3car-side.jpg",
        "/images/carport-3car-aerial.jpg",
      ],
      dimensions: "32' x 21' (672 sq.ft / ~62.4 m²)",
      description: "A premium 3-car residential parking canopy with a sleek flat roof profile, ornamental gold geometric lattice brackets, and a minimalist steel frame — designed to complement modern villa and bungalow facades.",
      specs: [
        { label: "Plot Footprint", value: "32.0ft x 21.0ft (672 sq.ft / ~62.4 m²) — 3-Car Capacity" },
        { label: "Roof Profile", value: "Flat cantilever roof with concealed drain channel" },
        { label: "Structural Columns", value: "Square hollow section (SHS) steel columns with decorative gold geometric lattice corbel brackets" },
        { label: "Roofing Material", value: "Pre-coated metal sheet / ACP panel in matte white finish" },
        { label: "Flooring Shown", value: "Grass-joint interlocking paver blocks (client-supplied)" },
        { label: "Design Style", value: "Contemporary minimalist — suits modern villas & bungalows" },
      ],
      featured: true,
    },
    {
      id: "interior-design",
      title: "Luxury Lounge Interior Concept",
      category: "Interior Design",
      tag: "Interior",
      image: "/images/interior-design.png",
      dimensions: "650 sq.ft Living Space",
      description: "Bespoke modern living and dining space concept combining indirect warm LED lighting, acoustic wall paneling, and minimalist wooden finishes.",
      specs: [
        { label: "Type", value: "Living & Dining Interior" },
        { label: "Key Features", value: "Concealed cabinetry, modular spatial division, ambient cove lighting" },
      ],
    },
  ], []);

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
            <a href="#get-quote" className="hover:text-orange-500 transition-colors">Get Quote</a>
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
                {["services", "why-us", "process", "showcase", "get-quote", "reviews", "faq"].map((id) => (
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
            <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-8 pt-6 border-t border-navy-100 w-full max-w-xl">
              <div>
                <span className="block font-black text-base sm:text-2xl text-navy-950">100%</span>
                <span className="block text-[10px] sm:text-xs text-navy-900/60 font-semibold uppercase tracking-wider mt-0.5 leading-tight">Vastu Friendly</span>
              </div>
              <div>
                <span className="block font-black text-base sm:text-2xl text-navy-950">Safe</span>
                <span className="block text-[10px] sm:text-xs text-navy-900/60 font-semibold uppercase tracking-wider mt-0.5 leading-tight">Certified Structural</span>
              </div>
              <div>
                <span className="block font-black text-base sm:text-2xl text-navy-950">Tamil Nadu</span>
                <span className="block text-[10px] sm:text-xs text-navy-900/60 font-semibold uppercase tracking-wider mt-0.5 leading-tight">Full Coverage</span>
              </div>
            </div>
          </div>

          {/* FIX 1: BEFORE/AFTER SLIDER - corrected logic so "Your Vacant Plot" label only shows on left side */}
          <div className="lg:col-span-6 flex justify-center relative w-full h-[280px] sm:h-[420px] lg:h-[500px]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:32px_32px] opacity-40 -z-10 rounded-2xl" />
            <div
              ref={sliderRef}
              onMouseMove={handleMouseMove}
              onMouseDown={handleStartInteraction}
              onMouseUp={handleEndInteraction}
              onTouchMove={handleTouchMove}
              onTouchStart={handleStartInteraction}
              onTouchEnd={handleEndInteraction}
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

              {/* SLIDER HANDLE & LASER SCAN LINE */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white z-20 pointer-events-none shadow-[0_0_14px_rgba(249,115,22,0.85)]"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Glowing laser scan beam */}
                <div className="absolute inset-0 bg-gradient-to-b from-orange-500 via-white to-orange-500 opacity-90 animate-pulse" />

                {/* Handle Knob */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-white shadow-2xl border-2 border-orange-500 flex items-center justify-center pointer-events-auto cursor-ew-resize hover:scale-115 active:scale-95 transition-all">
                  {/* Outer pulsating radar ring while auto-sliding */}
                  {!isDragging && !isUserActive && (
                    <div className="absolute -inset-2 rounded-full bg-orange-500/30 animate-ping pointer-events-none" />
                  )}
                  <div className="flex items-center gap-0.5 text-orange-500 font-black text-xs select-none">
                    <span>&lt;</span>
                    <span className="w-1 h-3 bg-orange-500/30 rounded-full mx-0.5" />
                    <span>&gt;</span>
                  </div>
                </div>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
            {/* LEFT CARD: CRITICAL RISKS */}
            <div className="p-6 sm:p-8 rounded-2xl bg-red-50/40 border border-red-200/90 relative overflow-hidden flex flex-col justify-between h-full shadow-xs">
              <div className="absolute top-0 right-0 w-36 h-36 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.12),transparent_65%)] pointer-events-none" />
              <div>
                <span className="px-3 py-1 rounded bg-red-600 text-white font-bold text-[10px] uppercase tracking-wider inline-flex items-center gap-1.5">
                  <AlertTriangle className="w-3 h-3" /> The Expensive Risks
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-navy-950 mt-4 mb-3 tracking-tight leading-snug">
                  Critical Risks of Unplanned Construction
                </h4>
                <p className="text-xs sm:text-sm text-navy-900/70 mb-6 leading-relaxed">
                  Building without verified engineering drawings leads to unfixable structural defects, wasted living areas, and huge budget overruns.
                </p>
                <div className="space-y-3.5">
                  {[
                    {
                      title: "Weak Foundations & Structural Cracks",
                      desc: "Uncalculated column spans and incorrect reinforcement cause building cracks and slab sagging.",
                    },
                    {
                      title: "Defective Room Layouts & Dark Zones",
                      desc: "Poor spatial zoning compromises cross-ventilation, natural sunlight, and family privacy.",
                    },
                    {
                      title: "Wasted Plot Space & Dead Passages",
                      desc: "Inefficient circulation routes create dark unusable corners while inflating square-foot costs.",
                    },
                    {
                      title: "Unexpected Material & Budget Overruns",
                      desc: "Blind contractor estimations result in 15% to 25% budget overshoots and costly site reworks.",
                    },
                  ].map((risk, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white/90 border border-red-100 shadow-xs">
                      <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                        <X className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <div>
                        <h5 className="font-bold text-xs sm:text-sm text-navy-950 leading-tight">{risk.title}</h5>
                        <p className="text-[11px] text-navy-900/60 mt-0.5 leading-snug">{risk.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-7 pt-6 border-t border-red-200/70 flex items-center justify-between gap-4 flex-wrap bg-red-100/40 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-4 sm:p-5 rounded-b-2xl">
                <div className="flex items-center gap-2 text-xs font-bold text-red-700">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>Site Modification Penalty:</span>
                </div>
                <span className="text-xs font-black text-red-700 bg-white px-2.5 py-1 rounded border border-red-200 shadow-xs">
                  10x Higher Than Pre-Planning
                </span>
              </div>
            </div>

            {/* RIGHT CARD: THE SOLUTION */}
            <div className="p-6 sm:p-8 rounded-2xl bg-navy-950 text-white relative overflow-hidden flex flex-col justify-between h-full shadow-xl">
              <div className="absolute top-0 right-0 w-36 h-36 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.18),transparent_65%)] pointer-events-none" />
              <div>
                <span className="px-3 py-1 rounded bg-orange-500 text-white font-bold text-[10px] uppercase tracking-wider inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-3 h-3" /> The Engineering Solution
                </span>
                <h4 className="text-xl sm:text-2xl font-black mt-4 mb-3 tracking-tight leading-snug">
                  CINORS Helps You Build With Confidence
                </h4>
                <p className="text-xs sm:text-sm text-navy-100/70 mb-6 leading-relaxed">
                  By providing clear 2D layouts, load-calculated structural drawings, and fully documented construction guides, we secure your building process from Day 1.
                </p>
                <div className="space-y-3.5">
                  {[
                    {
                      title: "100% Vastu & Directional Compliance",
                      desc: "Scientific room zoning aligned with natural light, wind circulation, and traditional vastu principles.",
                    },
                    {
                      title: "Certified Column & Foundation Detailing",
                      desc: "Earthquake-resilient structural drawings with steel bar schedules ready for site engineers.",
                    },
                    {
                      title: "Pre-Defined Material & Cost Estimations",
                      desc: "Eliminates surprise site expenditures and helps save 12% to 15% on overall construction costs.",
                    },
                    {
                      title: "Municipal Approval-Ready Blueprints",
                      desc: "Complete architectural plan set compliant with local Panchayat and Corporation building norms.",
                    },
                  ].map((sol, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 shadow-xs">
                      <div className="w-5 h-5 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h5 className="font-bold text-xs sm:text-sm text-white leading-tight">{sol.title}</h5>
                        <p className="text-[11px] text-navy-100/60 mt-0.5 leading-snug">{sol.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-7 pt-6 border-t border-white/10 flex items-center justify-between gap-4 flex-wrap bg-navy-900/60 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-4 sm:p-5 rounded-b-2xl">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-5 py-2.5 bg-orange-500 text-white text-xs sm:text-sm font-bold rounded-md hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20 active:scale-95"
                >
                  Consult An Engineer
                </button>
                <div className="text-right">
                  <span className="text-orange-400 block font-bold text-[10px] uppercase tracking-wide">Call Support</span>
                  <a href="tel:+918248768635" className="font-extrabold text-white text-xs sm:text-sm hover:text-orange-400 transition-colors">
                    +91 82487 68635
                  </a>
                </div>
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
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
            <div>
              <h2 className="text-xs font-black uppercase text-orange-500 tracking-widest mb-3">Our Work Portfolio</h2>
              <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-navy-950">Design Showcase</h3>
              <div className="w-16 h-1 bg-orange-500 mt-4" />
            </div>
            <button onClick={() => triggerQuickWhatsApp("Showcase Custom Inquiry")} className="self-start sm:self-auto px-5 py-2.5 border border-navy-200 text-navy-950 text-xs font-bold rounded-md uppercase tracking-wider hover:bg-navy-50 hover:border-navy-300 transition-colors flex items-center gap-2 group">
              Request Custom Design <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* CATEGORY FILTER TABS & AUTOPLAY SWITCH */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 sm:mb-10">
            <div className="flex flex-wrap gap-2">
              {["All", "Commercial", "Residential", "Interior"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveShowcaseTag(tag)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    activeShowcaseTag === tag
                      ? "bg-navy-950 text-white shadow-md shadow-navy-950/20"
                      : "bg-slate-100 text-navy-900/70 hover:bg-slate-200"
                  }`}
                >
                  {tag === "All" ? "All Projects" : `${tag} Architecture`}
                </button>
              ))}
            </div>

            {/* AUTOPLAY TOGGLE SWITCH */}
            <div className="flex items-center gap-3 bg-white border border-slate-200 px-4 py-2 rounded-full self-start md:self-auto shadow-xs">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  {isAutoplayEnabled && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                  )}
                  <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isAutoplayEnabled ? "bg-orange-500" : "bg-slate-300"}`} />
                </span>
                <span className="text-xs font-extrabold text-navy-950 tracking-tight">
                  Autoplay Previews
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={isAutoplayEnabled}
                onClick={() => setIsAutoplayEnabled(!isAutoplayEnabled)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isAutoplayEnabled ? "bg-orange-500" : "bg-slate-300"
                }`}
              >
                <span className="sr-only">Toggle autoplay previews</span>
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                    isAutoplayEnabled ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {showcaseItems
              .filter((item) => activeShowcaseTag === "All" || item.tag === activeShowcaseTag)
              .map((item, index) => (
                <ShowcaseCardItem
                  key={item.id}
                  item={item}
                  index={index}
                  isAutoplayEnabled={isAutoplayEnabled}
                  onOpenModal={handleOpenShowcaseModal}
                  onInquire={triggerQuickWhatsApp}
                />
              ))}
          </div>
        </div>
      </section>

      {/* GET A FREE ESTIMATE SECTION */}
      <section id="get-quote" className="py-16 sm:py-24 bg-gradient-to-br from-navy-950 via-navy-900 to-[#1a1033] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(249,115,22,0.06),transparent_55%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* LEFT — CTA copy */}
            <div>
              <span className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                100% Free Consultation
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-5">
                Get Your <span className="text-orange-500">Dream Home</span><br />Plan — Today
              </h2>
              <p className="text-navy-200/65 text-sm sm:text-base leading-relaxed mb-8 max-w-md">
                Fill in your plot details and our qualified engineers will reach out within 24 hours with a complete customized plan — absolutely free.
              </p>
              <div className="space-y-4">
                {[
                  { icon: "✅", text: "Certified Civil & Structural Engineers" },
                  { icon: "✅", text: "Serving All Districts Across Tamil Nadu" },
                  { icon: "✅", text: "2D Plans, 3D Elevation & Vastu Layouts" },
                  { icon: "✅", text: "Get Drawings Within 3–5 Business Days" },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-3 text-sm text-white/80 font-medium">
                    <span className="text-base">{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex items-center gap-4">
                <a href="tel:+918248768635" className="flex items-center gap-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-5 py-3 rounded-xl transition-all text-sm font-bold">
                  <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg>
                  +91 82487 68635
                </a>
                <span className="text-navy-200/40 text-xs">or fill the form →</span>
              </div>
            </div>

            {/* RIGHT — Form card */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-orange-500/20 via-orange-600/10 to-transparent rounded-3xl blur-xl" />
              <div className="relative bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
                {inlineFormSubmitted ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 bg-[#25D366]/10 border border-[#25D366]/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-[#25D366]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                    </div>
                    <h4 className="text-xl font-black text-white mb-2">Message Sent!</h4>
                    <p className="text-navy-200/60 text-sm">Opening WhatsApp to connect you with our engineer...</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-6">
                      <h3 className="text-xl font-black text-white tracking-tight">Request Free Estimate</h3>
                      <p className="text-navy-200/55 text-xs mt-1">We&apos;ll reply within 24 hours. No spam, ever.</p>
                    </div>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setInlineFormSubmitted(true);
                        const msg = `Hi CINORS,\nI'd like a Free Estimate for my plot. Here are my details:\n• Name: ${inlineFormData.name}\n• Phone: ${inlineFormData.phone}\n• Plot Location: ${inlineFormData.location}\n• Plot Dimensions: ${inlineFormData.plotSize}\n• Service Required: ${inlineFormData.service}\n• Current Stage: ${inlineFormData.stage}\n\nPlease contact me. Thank you!`;
                        setTimeout(() => {
                          window.open(`https://wa.me/918248768635?text=${encodeURIComponent(msg)}`, "_blank");
                          setInlineFormSubmitted(false);
                          setInlineFormData({ name: "", phone: "", location: "", plotSize: "", service: "Complete Package", stage: "Bought a Plot & Planning" });
                        }, 1500);
                      }}
                      className="space-y-4"
                    >
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-black text-white/50 uppercase tracking-widest mb-1.5">Your Name *</label>
                          <input required type="text" placeholder="e.g. Rajesh Kumar" value={inlineFormData.name} onChange={e => setInlineFormData({...inlineFormData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/25 outline-none transition-all" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-white/50 uppercase tracking-widest mb-1.5">Phone Number *</label>
                          <input required type="tel" placeholder="e.g. 8248768635" value={inlineFormData.phone} onChange={e => setInlineFormData({...inlineFormData, phone: e.target.value})} className="w-full bg-white/5 border border-white/10 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/25 outline-none transition-all" />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-black text-white/50 uppercase tracking-widest mb-1.5">Plot Location *</label>
                          <input required type="text" placeholder="e.g. Trichy / Madurai" value={inlineFormData.location} onChange={e => setInlineFormData({...inlineFormData, location: e.target.value})} className="w-full bg-white/5 border border-white/10 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/25 outline-none transition-all" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-white/50 uppercase tracking-widest mb-1.5">Plot Dimensions</label>
                          <input type="text" placeholder="e.g. 30×40 ft / 1200 sq.ft" value={inlineFormData.plotSize} onChange={e => setInlineFormData({...inlineFormData, plotSize: e.target.value})} className="w-full bg-white/5 border border-white/10 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/25 outline-none transition-all" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-white/50 uppercase tracking-widest mb-1.5">Service Required</label>
                        <select value={inlineFormData.service} onChange={e => setInlineFormData({...inlineFormData, service: e.target.value})} className="w-full bg-navy-950 border border-white/10 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 rounded-lg px-3.5 py-2.5 text-sm text-white outline-none transition-all">
                          {["2D Floor Plan", "Structural Drawings", "3D Elevation", "Vastu Layout", "Interior Design", "Complete Package"].map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-white/50 uppercase tracking-widest mb-1.5">Current Stage</label>
                        <select value={inlineFormData.stage} onChange={e => setInlineFormData({...inlineFormData, stage: e.target.value})} className="w-full bg-navy-950 border border-white/10 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 rounded-lg px-3.5 py-2.5 text-sm text-white outline-none transition-all">
                          {["Bought a Plot & Planning", "Already Have a Plan (Need Changes)", "Under Construction (Need Guidance)", "Just Exploring Options"].map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                      <button type="submit" className="w-full flex items-center justify-center gap-2.5 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-black py-3.5 rounded-xl transition-all shadow-lg shadow-orange-500/25 text-sm mt-2">
                        <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.248 8.477 3.517 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.59 2.028 14.108.977 11.983.977c-5.437 0-9.863 4.37-9.867 9.8a9.74 9.74 0 0 0 1.502 5.093l-1.015 3.7.83-.217 2.083-1.636z" /><path d="M16.924 13.917c-.27-.135-1.597-.788-1.846-.878-.247-.09-.427-.135-.607.135-.18.27-.697.878-.854 1.058-.158.18-.315.202-.585.067-.27-.135-1.138-.419-2.167-1.338-.802-.715-1.343-1.6-1.5-1.871-.158-.27-.017-.417.118-.552.122-.122.27-.315.405-.472.135-.158.18-.27.27-.45.09-.18.045-.337-.022-.472-.068-.135-.608-1.464-.833-2.005-.22-.527-.44-.457-.607-.465-.158-.007-.338-.007-.518-.007-.18 0-.472.067-.72.337-.247.27-.945.923-.945 2.25s.967 2.61 1.102 2.79c.135.18 1.902 2.904 4.609 4.073.644.278 1.147.444 1.539.569.648.206 1.238.177 1.704.107.52-.078 1.597-.652 1.821-1.282.225-.63.225-1.17.158-1.282-.068-.113-.248-.18-.518-.315z" /></svg>
                        Send via WhatsApp — Free
                      </button>
                      <p className="text-center text-[10px] text-white/25 pt-1">By submitting, you agree to be contacted by our engineering team.</p>
                    </form>
                  </>
                )}
              </div>
            </div>
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
                <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-orange-500 shrink-0" /><span>Call Us: <a href="tel:+918248768635" className="hover:text-white transition-colors">+91 82487 68635</a></span></li>
                <li className="flex items-center gap-2"><MessageSquare className="w-4 h-4 text-orange-500 shrink-0" /><span>WhatsApp: <a href="https://wa.me/918248768635" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">+91 82487 68635</a></span></li>
                <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-orange-500 shrink-0" /><span>Email: <a href="mailto:contact@cinors.com" className="hover:text-white transition-colors">contact@cinors.com</a></span></li>
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
        <a href="https://wa.me/918248768635?text=Hi%20CINORS,%20I%20have%20a%20plot%20and%20would%20like%20to%20get%20a%20free%20consultation." target="_blank" rel="noopener noreferrer" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all group relative animate-bounce">
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
                  { id: "name", label: "Your Name", type: "text", placeholder: "e.g. Rajesh Kumar", field: "name" },
                  { id: "phone", label: "Phone Number", type: "tel", placeholder: "e.g. 8248768635", field: "phone" },
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

      {/* SHOWCASE DETAIL MODAL */}
      <AnimatePresence>
        {selectedShowcaseItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedShowcaseItem(null)}
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
                onClick={() => setSelectedShowcaseItem(null)}
                className="absolute top-4 right-4 p-2 text-navy-400 hover:text-navy-950 hover:bg-navy-50 rounded-full transition-all z-20 bg-white/80 backdrop-blur shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>

              {/* MAIN MEDIA PREVIEW */}
              <div className="relative w-full h-[260px] sm:h-[420px] bg-slate-950 flex items-center justify-center overflow-hidden">
                {showVideoPlayer && selectedShowcaseItem.video ? (
                  <video
                    key={selectedShowcaseItem.video}
                    controls
                    autoPlay
                    playsInline
                    preload="auto"
                    className="w-full h-full object-contain bg-black"
                  >
                    <source src={selectedShowcaseItem.video} type="video/mp4" />
                    Your browser does not support HTML5 video.
                  </video>
                ) : (
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={activeGalleryImage || selectedShowcaseItem.image}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="absolute inset-0 w-full h-full flex items-center justify-center"
                    >
                      <Image
                        src={activeGalleryImage || selectedShowcaseItem.image}
                        alt={selectedShowcaseItem.title}
                        fill
                        className="object-contain"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>

              {/* MEDIA & GALLERY THUMBNAILS */}
              {((selectedShowcaseItem.gallery && selectedShowcaseItem.gallery.length > 1) || selectedShowcaseItem.video) && (
                <div className="p-3 bg-slate-100 border-b border-slate-200 flex items-center gap-2.5 overflow-x-auto">
                  {selectedShowcaseItem.video && (
                    <button
                      onClick={() => setShowVideoPlayer(true)}
                      className={`relative px-3.5 py-2.5 rounded-md shrink-0 transition-all font-bold text-xs flex items-center gap-2 border-2 ${
                        showVideoPlayer
                          ? "bg-orange-500 text-white border-orange-500 shadow-md"
                          : "bg-white text-navy-950 border-slate-200 hover:border-orange-500"
                      }`}
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>Play Walkthrough</span>
                    </button>
                  )}
                  {selectedShowcaseItem.gallery &&
                    selectedShowcaseItem.gallery.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setShowVideoPlayer(false);
                          setActiveGalleryImage(img);
                        }}
                        className={`relative w-20 h-14 sm:w-24 sm:h-16 rounded-md overflow-hidden shrink-0 transition-all border-2 ${
                          !showVideoPlayer && (activeGalleryImage || selectedShowcaseItem.image) === img
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
                      {selectedShowcaseItem.category}
                    </span>
                    {selectedShowcaseItem.dimensions && (
                      <span className="text-xs px-2.5 py-0.5 rounded bg-slate-100 text-navy-900 font-bold">
                        {selectedShowcaseItem.dimensions}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-navy-950 tracking-tight">
                    {selectedShowcaseItem.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-navy-900/70 mt-2 leading-relaxed">
                    {selectedShowcaseItem.description}
                  </p>
                </div>

                {/* SPECS LIST */}
                {selectedShowcaseItem.specs && selectedShowcaseItem.specs.length > 0 && (
                  <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50">
                    <div className="px-4 py-2.5 bg-slate-100/80 border-b border-slate-200 text-xs font-bold text-navy-950 uppercase tracking-wider">
                      Technical & Structural Specifications
                    </div>
                    <div className="divide-y divide-slate-200/80 text-xs">
                      {selectedShowcaseItem.specs.map((spec, sIdx) => (
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
                    Have a similar commercial site, plot or café space to design?
                  </span>
                  <button
                    onClick={() => {
                      triggerQuickWhatsApp(`Inquiry regarding ${selectedShowcaseItem.title}`);
                      setSelectedShowcaseItem(null);
                    }}
                    className="w-full sm:w-auto px-6 py-3 bg-orange-500 text-white rounded-lg text-sm font-bold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 active:scale-95"
                  >
                    Consult Engineer On WhatsApp <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
