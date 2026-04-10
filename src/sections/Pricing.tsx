"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import Button from "@/components/ui/Button";
import { useT } from "@/lib/i18n";
import { appUrls } from "@/lib/app-urls";

export default function Pricing() {
  const t = useT();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="start-free" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(37,99,235,0.08), transparent)",
        }}
      />

      <div
        ref={ref}
        className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-4 py-1.5">
            <Zap size={11} />
            {t("startFree.badge")}
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mb-6"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight">
            <span className="text-white">{t("startFree.headline")} </span>
            <span className="bg-gradient-to-r from-[#2563EB] to-[#60A5FA] bg-clip-text text-transparent">
              {t("startFree.headlineAccent")}
            </span>
          </h2>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="text-lg text-[#9CA3AF] leading-relaxed mb-10 max-w-xl mx-auto"
        >
          {t("startFree.subheadline")}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.24 }}
          className="flex flex-col items-center gap-3"
        >
          <Button
            variant="primary"
            size="lg"
            href={appUrls.register}
            iconRight={<ArrowRight size={16} />}
            className="min-w-[240px] text-base"
          >
            Crear cuenta gratis
          </Button>
          <p className="text-xs text-[#6B7280]">{t("startFree.ctaNote")}</p>
        </motion.div>
      </div>
    </section>
  );
}
