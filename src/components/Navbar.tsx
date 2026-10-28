"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, siteConfig } from "@/data/siteData";

interface NavbarProps {
  onOpenConsultation?: () => void;
  onOpenModal?: () => void;
}

export default function Navbar({ onOpenConsultation, onOpenModal }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleOpenConsultation = onOpenConsultation || onOpenModal || (() => {});

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" || pathname === "";
    }
    const cleanHref = href.replace(/\/$/, "");
    const cleanPath = (pathname || "").replace(/\/$/, "");
    return cleanPath === cleanHref;
  };

  return (
    <header className="sticky top-0 w-full z-40 transition-all duration-300 glass-nav shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 relative h-10 sm:h-12 w-36 sm:w-48">
          <Image src="/images/cinors-logo.png" alt="CINORS Logo" fill className="object-contain" priority />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-[14px] lg:text-[15px] font-semibold text-navy-900/80">
          {navLinks.filter(l => l.href !== "/").map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 transition-colors hover:text-orange-500 ${
                  active ? "text-orange-500 font-bold" : "text-navy-900/80"
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA BUTTON */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={handleOpenConsultation}
            className="px-5 py-2.5 bg-orange-500 text-white rounded-md font-bold text-sm hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 active:scale-95 cursor-pointer"
          >
            Get Free Consultation
          </button>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-navy-950 hover:bg-navy-50 rounded-md transition-colors"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILE DROPDOWN DRAWER */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-navy-100 bg-white shadow-xl overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-3.5 py-2.5 text-[15px] font-semibold rounded-md transition-colors flex items-center justify-between ${
                      active
                        ? "bg-orange-50 text-orange-600 font-bold"
                        : "text-navy-900 hover:bg-navy-50"
                    }`}
                  >
                    <span>{link.label}</span>
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />}
                  </Link>
                );
              })}

              <div className="grid grid-cols-1 gap-2.5 pt-3 border-t border-navy-100 mt-2">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleOpenConsultation();
                  }}
                  className="w-full py-3 bg-orange-500 text-white text-center rounded-md font-bold text-sm hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/15"
                >
                  Get Free Consultation
                </button>
                <a
                  href={siteConfig.getWhatsAppUrl("Mobile menu connect")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 border border-navy-200 text-navy-950 text-center rounded-md font-bold text-sm hover:bg-navy-50 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-orange-500" /> WhatsApp Direct
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
