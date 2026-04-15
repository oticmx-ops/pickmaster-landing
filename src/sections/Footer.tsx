"use client";

import React from "react";
import { Twitter, Github, Linkedin } from "lucide-react";
import { useT } from "@/lib/i18n";

export default function Footer() {
  const t = useT();

  const productLinks = [
    { label: t("footer.links.features"), href: "#features" },
    { label: t("footer.links.howItWorks"), href: "#how-it-works" },
    { label: t("footer.links.faq"), href: "#faq" },
  ];

  const companyLinks = [
    { label: t("footer.links.about"), href: "#" },
    { label: t("footer.links.blog"), href: "#" },
    { label: t("footer.links.contact"), href: "#" },
  ];

  const legalLinks = [
    { label: t("footer.links.privacy"), href: "#" },
    { label: t("footer.links.terms"), href: "#" },
  ];

  const socialLinks = [
    { Icon: Twitter, href: "#", label: "Twitter" },
    { Icon: Github, href: "#", label: "GitHub" },
    { Icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="border-t border-[#1F2937] bg-[#0B0F1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main content */}
        <div className="py-14 grid grid-cols-2 sm:grid-cols-4 gap-8 lg:gap-12">

          {/* Brand — full row on mobile, single col on sm+ */}
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
                    className="text-sm text-[#6B7280] hover:text-[#D1D5DB] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              {t("footer.company")}
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[#6B7280] hover:text-[#D1D5DB] transition-colors duration-200"
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
                    className="text-sm text-[#6B7280] hover:text-[#D1D5DB] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-5 border-t border-[#1F2937] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#4B5563]">{t("footer.copyright")}</p>
          <div className="flex items-center gap-5">
            {socialLinks.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-[#4B5563] hover:text-[#9CA3AF] transition-colors duration-200"
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
