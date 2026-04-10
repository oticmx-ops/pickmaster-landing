"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { X, Check, ArrowRight } from "lucide-react";
import { useT } from "@/lib/i18n";

const pains = [
  "Grupos de WhatsApp desorganizados",
  "Picks en Excel que nadie actualiza",
  "Resultados confusos y disputados",
  "Sin ranking, sin historial, sin control",
];

const gains = [
  "Todo claro en un solo lugar",
  "Ranking en tiempo real, jornada a jornada",
  "Historial transparente para todos",
  "Competencia real, sin disputas",
];

export default function ProblemSolution() {
  const t = useT();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="problem" className="py-28 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(37,99,235,0.04), transparent)",
        }}
      />

      <div
        ref={ref}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-secondary mb-3">
            Por qué PickMaster
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
            Olvídate del Excel.{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Esto es otra liga.
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_56px_1fr] gap-4 lg:gap-0 items-stretch">
          {/* Problem card */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-red-500/15 bg-red-500/[0.03] p-8"
          >
            {/* Card label */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-red-400 bg-red-400/10 border border-red-400/15 rounded-full px-3 py-1 mb-6">
              <X size={11} strokeWidth={2.5} />
              Sin PickMaster
            </div>

            <h3 className="text-xl font-bold text-white mb-2">
              {t("problem.headline")}
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-8">
              {t("problem.body")}
            </p>

            <ul className="space-y-3.5">
              {pains.map((pain, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.25 + i * 0.07, duration: 0.4 }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-0.5 w-4 h-4 rounded-full bg-red-500/15 border border-red-500/25 flex items-center justify-center flex-shrink-0">
                    <X size={9} className="text-red-400" strokeWidth={2.5} />
                  </div>
                  <span className="text-sm text-[#C9D1D9]">{pain}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Arrow separator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="flex items-center justify-center"
          >
            <div className="w-9 h-9 rounded-full bg-[#111827] border border-[#1F2937] flex items-center justify-center rotate-90 lg:rotate-0 shadow-[0_0_20px_rgba(37,99,235,0.15)]">
              <ArrowRight size={15} className="text-primary" />
            </div>
          </motion.div>

          {/* Solution card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-primary/15 bg-primary/[0.03] p-8"
          >
            {/* Card label */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/15 rounded-full px-3 py-1 mb-6">
              <Check size={11} strokeWidth={2.5} />
              Con PickMaster
            </div>

            <h3 className="text-xl font-bold text-white mb-2">
              {t("problem.solutionHeadline")}
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-8">
              {t("problem.solutionBody")}
            </p>

            <ul className="space-y-3.5">
              {gains.map((gain, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 8 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.35 + i * 0.07, duration: 0.4 }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-0.5 w-4 h-4 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center flex-shrink-0">
                    <Check size={9} className="text-emerald-400" strokeWidth={2.5} />
                  </div>
                  <span className="text-sm text-[#C9D1D9]">{gain}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
