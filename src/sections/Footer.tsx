"use client";

import React from "react";
import { useT } from "@/lib/i18n";

function IconFacebook({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function IconInstagram({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  const t = useT();
  const year = new Date().getFullYear();

  const productLinks = [
    { label: "Quinielas activas", href: "#quinielas" },
    { label: t("footer.links.howItWorks"), href: "#how-it-works" },
    { label: t("footer.links.features"), href: "#features" },
    { label: t("footer.links.faq"), href: "#faq" },
  ];

  const legalLinks = [
    { label: t("footer.links.privacy"), href: "#" },
    { label: t("footer.links.terms"), href: "#" },
    { label: t("footer.links.contact"), href: "#" },
  ];

  const socialLinks = [
    { Icon: IconFacebook, href: "#", label: "Facebook" },
    { Icon: IconInstagram, href: "#", label: "Instagram" },
  ];

  return (
    <footer className="border-t bg-background" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main content */}
        <div className="py-14 grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-12">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <a href="#" className="pm-nav-brand inline-flex items-center mb-4" aria-label="PickMaster">
              <img
                src="/logo-full.svg"
                alt="PickMaster"
                className="pm-logo h-7 w-auto block"
              />
            </a>
            <p className="text-sm text-[#6B7280] leading-relaxed max-w-[220px]">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              {t("footer.product")}
            </h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[#5E6678] hover:text-[#E5E9F0] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              {t("footer.legal")}
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[#5E6678] hover:text-[#E5E9F0] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-5 border-t border-[#1A2035] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#3D4458]">© {year} PickMaster. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            {socialLinks.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-[#3D4458] hover:text-[#9CA3AF] hover:scale-110 hover:-translate-y-px transition-all duration-200"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
