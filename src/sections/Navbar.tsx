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
        "fixed top-0 left-0 right-0 z-50 border-b transition-[background-color,backdrop-filter,border-color] duration-300",
        scrolled
          ? "bg-[#06080F]/90 backdrop-blur-xl border-[#1A2035]/80"
          : "bg-transparent border-transparent"
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
              src="/logo-icon.png"
              alt="PickMaster"
              className="pm-logo h-8 w-auto block rounded-lg"
            />
            <span className="ml-2.5 text-base font-extrabold tracking-tight leading-none">
              <span className="text-white">Pick</span>
              <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">Master</span>
            </span>
          </a>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-[#9AA3B2] hover:text-white px-3.5 py-2 rounded-lg hover:bg-[#151B2E]/80 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-2">
            {/* Language toggle — hidden for now */}
            <button
              onClick={() => setLanguage(language === "es" ? "en" : "es")}
              className="hidden text-xs font-semibold text-[#5E6678] hover:text-white border border-[#1A2035] hover:border-[#2A3150] rounded-lg px-3 py-1.5 transition-all duration-200 hover:bg-[#151B2E]/60"
            >
              {language === "es" ? "EN" : "ES"}
            </button>
            <Button variant="ghost" size="sm" href={appUrls.login}>
              {t("nav.login")}
            </Button>
            <Button variant="primary" size="sm" href={appUrls.pools}>
              Explorar quinielas
            </Button>
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-2">
            {/* Language toggle — hidden for now */}
            <button
              onClick={() => setLanguage(language === "es" ? "en" : "es")}
              className="hidden text-xs font-semibold text-[#5E6678] border border-[#1A2035] rounded-lg px-2.5 py-1.5"
            >
              {language === "es" ? "EN" : "ES"}
            </button>
            <a
              href={appUrls.pools}
              className="inline-flex items-center justify-center h-8 px-3 rounded-lg text-xs font-semibold text-white active:scale-[0.97] transition-transform"
              style={{
                background: "linear-gradient(180deg, #4F7FFF, #3B6FF5)",
                boxShadow: "0 2px 8px rgba(59,111,245,0.4)",
              }}
            >
              Entrar
            </a>
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
            className="md:hidden overflow-hidden bg-[#06080F]/95 backdrop-blur-xl border-b border-[#1A2035]"
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
                  className="text-sm text-[#9AA3B2] hover:text-white py-2.5 px-3 rounded-lg hover:bg-[#151B2E]/80 transition-all duration-200"
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="pt-3 mt-1 border-t border-[#1A2035] flex flex-col gap-2">
                <Button variant="ghost" size="sm" className="w-full justify-center" href={appUrls.login}>
                  {t("nav.login")}
                </Button>
                <Button variant="primary" size="sm" className="w-full justify-center" href={appUrls.pools}>
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
