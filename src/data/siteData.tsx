import React from "react";
import {
  Layers,
  FileText,
  Compass,
  Home,
  Paintbrush,
  ArrowUpRight,
  Ruler,
  ShieldCheck,
  Sparkles,
  Clock,
  ThumbsUp,
  MessageSquare,
} from "lucide-react";
import {
  ServiceCard,
  TrustCard,
  ProcessStep,
  ShowcaseItem,
  FAQItem,
  Review,
} from "@/types";

export const siteConfig = {
  name: "CINORS",
  phone: "8248768635",
  formattedPhone: "+91 82487 68635",
  email: "contact@cinors.in",
  office: "Tamil Nadu, Serving All Districts",
  getWhatsAppUrl: (msg?: string) => {
    const text = msg || "Hi CINORS, I would like to get a free consultation for my plot planning.";
    return `https://wa.me/918248768635?text=${encodeURIComponent(text)}`;
  },
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services/" },
  { label: "Why Us", href: "/why-us/" },
  { label: "Process", href: "/process/" },
  { label: "Showcase", href: "/showcase/" },
  { label: "Get Quote", href: "/get-quote/" },
  { label: "Reviews", href: "/reviews/" },
  { label: "FAQ", href: "/faq/" },
];

export const trustCards: TrustCard[] = [
  {
    title: "Professional Planning",
    icon: <Ruler className="w-6 h-6 text-orange-500" />,
    desc: "Optimized and standard layouts designed by qualified civil and structural engineers.",
  },
  {
    title: "Structural Safety",
    icon: <ShieldCheck className="w-6 h-6 text-orange-500" />,
    desc: "Strong, earthquake-resistant structural designs built to last generations without foundation cracks.",
  },
  {
    title: "Customized Solutions",
    icon: <Sparkles className="w-6 h-6 text-orange-500" />,
    desc: "Tailored concepts mapped specifically to your land orientation, soil behavior, and lifestyle.",
  },
  {
    title: "On-Time Delivery",
    icon: <Clock className="w-6 h-6 text-orange-500" />,
    desc: "Get your complete set of engineering drawings strictly within 3–5 business days.",
  },
  {
    title: "Quality Assured",
    icon: <ThumbsUp className="w-6 h-6 text-orange-500" />,
    desc: "Every blueprint is double-checked for regulatory compliance and practical construction feasibility.",
  },
  {
    title: "Dedicated Support",
    icon: <MessageSquare className="w-6 h-6 text-orange-500" />,
    desc: "Constant guidance from design finalization to construction setup and contractor site coordination.",
  },
];

export const services: ServiceCard[] = [
  {
    icon: <Layers className="w-8 h-8 text-orange-500" />,
    title: "2D Floor Planning",
    description: "Functional, space-optimized layouts tailored to modern living requirements with 100% Vastu compliance.",
  },
  {
    icon: <FileText className="w-8 h-8 text-orange-500" />,
    title: "Structural Design Drawings",
    description: "Safe, construction-ready foundation, column, and beam structural drawings designed for long-term safety.",
  },
  {
    icon: <Compass className="w-8 h-8 text-orange-500" />,
    title: "Vastu-Friendly Layouts",
    description: "Balanced, compliant spatial planning aligned with traditional Indian orientation principles.",
  },
  {
    icon: <Home className="w-8 h-8 text-orange-500" />,
    title: "3D Elevation Design",
    description: "Photorealistic 3D external models to visualize your dream home before laying a single brick on site.",
  },
  {
    icon: <Paintbrush className="w-8 h-8 text-orange-500" />,
    title: "Interior Design Concepts",
    description: "Stunning, functional interior concepts crafted to fit your spatial needs and modern aesthetic taste.",
  },
  {
    icon: <ArrowUpRight className="w-8 h-8 text-orange-500" />,
    title: "Construction Ready Drawings",
    description: "Detailed working blueprints covering electrical, plumbing, masonry, and beam-slab reinforcement layouts.",
  },
];

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Share Your Plot Details",
    description: "Provide your plot dimensions, location in Tamil Nadu, and your core home requirements.",
  },
  {
    step: "02",
    title: "Receive Design Concepts",
    description: "Review initial customized 2D layout drafts and preliminary spatial blueprints.",
  },
  {
    step: "03",
    title: "Finalize Plans & Drawings",
    description: "Perfect the layout and receive construction-ready structural & elevation engineering drawings.",
  },
  {
    step: "04",
    title: "Start Construction with Confidence",
    description: "Hand over the professional drawings to your builders to avoid site errors and costly reworks.",
  },
];

export const showcaseItems: ShowcaseItem[] = [
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
    gallery: ["/images/enscape-video-thumb.jpg"],
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
];

export const faqs: FAQItem[] = [
  {
    category: "Pricing & Packages",
    question: "How much does house planning cost?",
    answer: "Our planning packages are extremely affordable and depend on your plot size and scope. Contact us with your dimensions for a custom, transparent quote.",
  },
  {
    category: "Engineering & Safety",
    question: "Do you provide structural drawings?",
    answer: "Yes, we specialize in providing highly detailed, construction-ready structural drawings including foundation plans, column layouts, beam detailing, and slab reinforcement specifications.",
  },
  {
    category: "Coverage",
    question: "Do you work across Tamil Nadu?",
    answer: "Yes! CINORS serves landowners and builders all over Tamil Nadu through online consultations, site maps, and call-coordination.",
  },
  {
    category: "3D Visualization",
    question: "Can I get a 3D elevation design?",
    answer: "Absolutely! We create high-quality, photorealistic 3D external elevation designs so you can select color palettes, window layouts, and materials before construction starts.",
  },
  {
    category: "Deliverables",
    question: "What is included in the design package?",
    answer: "Our complete design package includes: 2D Floor Plan (Vastu-compliant), Detailed Structural Drawings, 3D Elevation Render, and Working Drawings (Electrical, Plumbing, and Brick Masonry layout).",
  },
  {
    category: "Getting Started",
    question: "How do I get started?",
    answer: "Click 'Get Free Consultation' to fill out our plot inquiry form, or click the WhatsApp button. Send us your plot dimensions and location, and our civil design team will guide you step-by-step.",
  },
];

export const initialReviews: Review[] = [
  {
    name: "Praveen Kumar",
    location: "Trichy",
    rating: 5,
    comment: "I bought a 2400 sq.ft plot and was confused about how to structure it. CINORS gave us a Vastu-friendly 2D layout and a beautiful 3D elevation. Our contractor easily followed their construction-ready structural drawings.",
    date: "March 2024",
  },
  {
    name: "Selvi R.",
    location: "Madurai",
    rating: 5,
    comment: "Choosing CINORS was the best pre-construction decision we made. Their structural drawings saved us from committing column placement errors that would have cost us lakhs to fix later. Fully recommended!",
    date: "January 2024",
  },
  {
    name: "Vigneshwaran K.",
    location: "Coimbatore",
    rating: 5,
    comment: "Highly professional service! Even though our site was in Coimbatore, their remote coordination, prompt drawing delivery, and civil engineering advice were outstanding. The rates are very transparent.",
    date: "February 2024",
  },
];
