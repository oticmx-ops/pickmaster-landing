"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Button from "@/components/ui/Button";
import { useT, useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { appUrls } from "@/lib/app-urls";

export default function Navbar() {
  const t = useT();
  const { language, setLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: t("nav.features"), href: "#features" },
    { label: t("nav.howItWorks"), href: "#how-it-works" },
    { label: t("nav.faq"), href: "#faq" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#0B0F1A]/85 backdrop-blur-xl border-b border-[#1F2937]/80"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <a
            href="#"
            className="pm-nav-brand flex items-center flex-shrink-0"
            aria-label="PickMaster"
          >
            <img
              src="/logo-full.svg"
              alt="PickMaster"
              className="pm-logo h-8 w-auto block"
            />
          </a>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-[#9CA3AF] hover:text-white px-3.5 py-2 rounded-lg hover:bg-[#1F2937]/60 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-2">
            {/* Language toggle */}
            <button
              onClick={() => setLanguage(language === "es" ? "en" : "es")}
              className="text-xs font-semibold text-[#6B7280] hover:text-white border border-[#1F2937] hover:border-[#374151] rounded-lg px-3 py-1.5 transition-all duration-200 hover:bg-[#1F2937]/40"
            >
              {language === "es" ? "EN" : "ES"}
            </button>
            <Button variant="ghost" size="sm" href={appUrls.login}>
              {t("nav.login")}
            </Button>
            <Button variant="primary" size="sm" href={appUrls.explore}>
              Explorar quinielas
            </Button>
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setLanguage(language === "es" ? "en" : "es")}
              className="text-xs font-semibold text-[#6B7280] border border-[#1F2937] rounded-lg px-2.5 py-1.5"
            >
              {language === "es" ? "EN" : "ES"}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-[#9CA3AF] hover:text-white transition-colors p-1.5 rounded-lg hover:bg-[#1F2937]/60"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-[#0B0F1A]/95 backdrop-blur-xl border-b border-[#1F2937]"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.25 }}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-[#9CA3AF] hover:text-white py-2.5 px-3 rounded-lg hover:bg-[#1F2937]/60 transition-all duration-200"
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="pt-3 mt-1 border-t border-[#1F2937] flex flex-col gap-2">
                <Button variant="ghost" size="sm" className="w-full justify-center" href={appUrls.login}>
                  {t("nav.login")}
                </Button>
                <Button variant="primary" size="sm" className="w-full justify-center" href={appUrls.explore}>
                  Explorar quinielas
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
