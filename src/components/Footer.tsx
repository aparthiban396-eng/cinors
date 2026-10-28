import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, MessageSquare, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/data/siteData";

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white pt-14 sm:pt-16 pb-10 border-t border-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-navy-900">
          {/* BRAND */}
          <div className="md:col-span-4 space-y-4">
            <Link href="/" className="inline-block relative h-10 w-44">
              <Image src="/images/cinors-logo.png" alt="CINORS Logo" fill className="object-contain brightness-0 invert" />
            </Link>
            <p className="text-xs text-navy-200/65 leading-relaxed max-w-sm">
              Certified civil engineering and architectural planning firm. Delivering safe, Vastu-compliant layouts, structural drawings, and photorealistic 3D elevations across all districts of Tamil Nadu.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-orange-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Serving All 38 Districts of Tamil Nadu
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="md:col-span-2 space-y-3">
            <h5 className="font-extrabold text-sm uppercase tracking-wider text-orange-500">Navigation</h5>
            <ul className="space-y-2 text-xs text-navy-200/65">
              <li><Link href="/" className="hover:text-orange-400 transition-colors">Home</Link></li>
              <li><Link href="/services/" className="hover:text-orange-400 transition-colors">Services</Link></li>
              <li><Link href="/why-us/" className="hover:text-orange-400 transition-colors">Why Choose Us</Link></li>
              <li><Link href="/process/" className="hover:text-orange-400 transition-colors">Engineering Process</Link></li>
              <li><Link href="/showcase/" className="hover:text-orange-400 transition-colors">Design Showcase</Link></li>
              <li><Link href="/get-quote/" className="hover:text-orange-400 transition-colors">Get Free Quote</Link></li>
              <li><Link href="/reviews/" className="hover:text-orange-400 transition-colors">Client Reviews</Link></li>
              <li><Link href="/faq/" className="hover:text-orange-400 transition-colors">Frequently Asked</Link></li>
            </ul>
          </div>

          {/* SERVICES */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="font-extrabold text-sm uppercase tracking-wider text-orange-500">Core Services</h5>
            <ul className="space-y-2 text-xs text-navy-200/65">
              <li><Link href="/services/#floor-plans" className="hover:text-orange-400 transition-colors">2D Floor Layouts (Vastu)</Link></li>
              <li><Link href="/services/#structural" className="hover:text-orange-400 transition-colors">Structural Steel & RCC Drawings</Link></li>
              <li><Link href="/services/#elevations" className="hover:text-orange-400 transition-colors">3D Exterior Elevations</Link></li>
              <li><Link href="/services/#working" className="hover:text-orange-400 transition-colors">Working Construction Blueprints</Link></li>
              <li><Link href="/services/#interiors" className="hover:text-orange-400 transition-colors">Interior Concepts & Spatial Plans</Link></li>
              <li><Link href="/showcase/#walkthrough" className="hover:text-orange-400 transition-colors">3D Walkthrough Videos</Link></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="font-extrabold text-sm uppercase tracking-wider text-orange-500">Contact Details</h5>
            <ul className="space-y-3 text-xs text-navy-200/65">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Call Us: <a href={`tel:+91${siteConfig.phone}`} className="hover:text-white transition-colors">{siteConfig.formattedPhone}</a></span>
              </li>
              <li className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-orange-500 shrink-0" />
                <span>WhatsApp: <a href={siteConfig.getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{siteConfig.formattedPhone}</a></span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Email: <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors">{siteConfig.email}</a></span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>{siteConfig.office}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] text-navy-200/40 font-semibold">
          <p>&copy; {new Date().getFullYear()} CINORS. All Rights Reserved.</p>
          <div className="flex gap-4">
            <span className="text-orange-500/70">Verified Civil Engineering Firm</span>
            <span>•</span>
            <Link href="/faq/" className="hover:text-white transition-colors">FAQ</Link>
            <span>•</span>
            <Link href="/get-quote/" className="hover:text-white transition-colors">Free Estimate</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
