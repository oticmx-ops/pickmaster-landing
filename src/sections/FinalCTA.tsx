"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Users, Trophy, Zap, CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { useT } from "@/lib/i18n";
import { appUrls } from "@/lib/app-urls";

const trustIcons = [
  { icon: Users, label: "+2,400 jugadores compitiendo" },
  { icon: Trophy, label: "+180 quinielas en juego" },
  { icon: Zap, label: "Gratis desde el primer día" },
];

export default function FinalCTA() {
  const t = useT();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-32 relative overflow-hidden" ref={ref}>
      {/* Deep glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 50% 50%, rgba(37,99,235,0.10), transparent 65%)",
        }}
      />
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />

      {/* Gradient line top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(37,99,235,0.4))",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8"
        >
          {/* Headline */}
          <div className="space-y-1">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight">
              {t("finalCta.headline")}
            </h2>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t("finalCta.headlineAccent")}
            </h2>
          </div>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-text-secondary max-w-lg mx-auto leading-relaxed">
            {t("finalCta.subheadline")}
          </p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="flex flex-col items-center gap-3"
          >
            <Button
              variant="primary"
              size="lg"
              href={appUrls.explore}
              iconRight={<ArrowRight size={16} />}
              className="min-w-[240px] text-base"
            >
              Explorar quinielas
            </Button>
            <p className="text-xs text-text-secondary">{t("finalCta.ctaNote")}</p>
          </motion.div>

          {/* Trust checklist */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6"
          >
            {(() => {
              let items: string[] = ["Gratis para empezar", "Sin complicaciones", "Juega desde cualquier dispositivo"];
              try { items = JSON.parse(t("finalCta.trustItems")) as string[]; } catch { /* use fallback */ }
              return items.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0" />
                  <span className="text-sm text-[#D1D5DB]">{item}</span>
                </div>
              ));
            })()}
          </motion.div>

          {/* Social stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 pt-2"
          >
            {trustIcons.map(({ icon: Icon, label }, i) => (
              <div key={i} className="flex items-center gap-2">
                <Icon size={14} className="text-primary flex-shrink-0" />
                <span className="text-xs text-text-secondary">{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Gradient line bottom */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24"
        style={{
          background: "linear-gradient(to top, transparent, rgba(37,99,235,0.4))",
        }}
      />
    </section>
  );
}
