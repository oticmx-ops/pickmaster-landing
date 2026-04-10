"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Zap,
  Trophy,
  Layers,
  LayoutDashboard,
  Lock,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { useT } from "@/lib/i18n";
import { appUrls } from "@/lib/app-urls";

const icons = [Zap, Trophy, Layers, LayoutDashboard, Lock, BarChart3];

interface FeatureItem {
  title: string;
  body: string;
}

const fallbackItems: FeatureItem[] = [
  {
    title: "Pools en tiempo real",
    body: "Crea y gestiona quinielas con actualizaciones instantáneas. Los participantes ven cambios en segundos.",
  },
  {
    title: "Rankings en vivo",
    body: "Leaderboard automático con puntos y posición. Actualizado con cada resultado del admin.",
  },
  {
    title: "Multi-entry por pool",
    body: "Participa con múltiples entradas en la misma quiniela. Más estrategia, más posibilidades.",
  },
  {
    title: "Panel de administración",
    body: "Gestiona partidos, resultados y participantes desde un dashboard unificado y potente.",
  },
  {
    title: "Picks con cierre automático",
    body: "Una vez cerrada la quiniela, los picks quedan bloqueados. Sin trampas, sin disputas.",
  },
  {
    title: "Historial y estadísticas",
    body: "Revisa tu rendimiento a lo largo del tiempo. Aprende de tus picks y mejora tu estrategia.",
  },
];

export default function Features() {
  const t = useT();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  let items: FeatureItem[] = fallbackItems;
  try {
    const raw = t("features.items");
    const parsed = JSON.parse(raw) as FeatureItem[];
    if (Array.isArray(parsed) && parsed.length > 0) items = parsed;
  } catch {
    // use fallback
  }

  return (
    <section id="features" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-[0.18] pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B7280] mb-3"
          >
            {t("features.badge")}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-3xl sm:text-4xl font-bold text-white tracking-tight"
          >
            {t("features.headline")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="mt-4 text-[#9CA3AF] leading-relaxed"
          >
            {t("features.subheadline")}
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/60 rounded-2xl overflow-hidden border border-border/60">
          {items.map((item, i) => {
            const Icon = icons[i] ?? Zap;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.05 + i * 0.07 }}
                className="group bg-[#111827] p-7 hover:bg-[#131c2e] hover:-translate-y-0.5 transition-all duration-300 cursor-default"
              >
                {/* Icon */}
                <div className="w-10 h-10 rounded-xl bg-[#1F2937] border border-[#374151] flex items-center justify-center mb-5 group-hover:border-[#2563EB]/40 group-hover:bg-[#2563EB]/10 transition-all duration-300">
                  <Icon
                    size={18}
                    className="text-[#6B7280] group-hover:text-[#3B82F6] transition-colors duration-300"
                  />
                </div>

                <h3 className="font-semibold text-white mb-2 text-[0.9375rem]">
                  {item.title}
                </h3>
                <p className="text-sm text-[#6B7280] leading-relaxed group-hover:text-[#9CA3AF] transition-colors duration-300">
                  {item.body}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Mid-section CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center mt-12"
        >
          <Button variant="primary" size="lg" href={appUrls.explore} iconRight={<ArrowRight size={16} />}>
            Explorar quinielas ahora
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
