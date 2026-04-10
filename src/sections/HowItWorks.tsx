"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { UserPlus, Target, CheckSquare, Trophy } from "lucide-react";
import Button from "@/components/ui/Button";
import { useT } from "@/lib/i18n";

const stepIcons = [UserPlus, Target, CheckSquare, Trophy];

interface Step {
  number: string;
  title: string;
  body: string;
}

const fallbackSteps: Step[] = [
  {
    number: "01",
    title: "Crea tu cuenta",
    body: "Regístrate en segundos. Verifica tu email y ya estás listo para jugar.",
  },
  {
    number: "02",
    title: "Únete a una quiniela",
    body: "Elige entre las quinielas activas. Crea una entrada (o varias) antes del cierre.",
  },
  {
    number: "03",
    title: "Haz tus picks",
    body: "Selecciona Local, Empate o Visitante para cada partido. Guarda antes de que cierre.",
  },
  {
    number: "04",
    title: "Compite y sube en el ranking",
    body: "Sigue los resultados en tiempo real. El ranking se mueve con cada partido. Un error te baja del top.",
  },
];

export default function HowItWorks() {
  const t = useT();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  let steps: Step[] = fallbackSteps;
  try {
    const raw = t("howItWorks.steps");
    const parsed = JSON.parse(raw) as Step[];
    if (Array.isArray(parsed) && parsed.length > 0) steps = parsed;
  } catch {
    // use fallback
  }

  return (
    <section id="how-it-works" className="py-28 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(37,99,235,0.05), transparent)",
        }}
      />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B7280] mb-3"
          >
            {t("howItWorks.badge")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-3xl sm:text-4xl font-bold text-white tracking-tight"
          >
            {t("howItWorks.headline")}
          </motion.h2>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 lg:grid-cols-4 gap-0">

          {/* Full connector line: from right edge of circle 1 to left edge of circle 4 */}
          <div
            className="hidden lg:block absolute top-[22px] h-px border-t border-dashed border-[#1F2937]"
            style={{ left: "calc(12.5% + 22px)", right: "calc(12.5% + 22px)" }}
            aria-hidden="true"
          />

          {steps.map((step, i) => {
            const Icon = stepIcons[i] ?? CheckSquare;
            const isLast = i === steps.length - 1;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.15 + i * 0.14,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative flex flex-col lg:items-center lg:text-center"
              >

                {/* Mobile vertical connector */}
                {!isLast && (
                  <div
                    className="lg:hidden absolute left-[21px] top-[44px] bottom-0 w-px border-l border-dashed border-[#1F2937] z-0"
                    aria-hidden="true"
                  />
                )}

                <div className="relative z-10 flex lg:flex-col lg:items-center gap-5 lg:gap-0 pb-10 lg:pb-0 pl-0 lg:pl-0">
                  {/* Step icon circle */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="w-11 h-11 rounded-xl bg-[#111827] border border-[#1F2937] flex items-center justify-center">
                        <Icon size={19} className="text-[#2563EB]" />
                      </div>
                      {/* Step number badge */}
                      <div className="absolute -top-2.5 -right-2.5 w-5 h-5 rounded-full bg-[#2563EB] flex items-center justify-center ring-2 ring-background">
                        <span className="text-[9px] font-bold text-white leading-none">
                          {i + 1}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:mt-7 lg:px-4 max-w-[300px]">
                    {/* Step label */}
                    <span className="text-[10px] font-bold text-[#2563EB] tracking-[0.15em] uppercase mb-2 block">
                      Paso {step.number}
                    </span>
                    <h3 className="text-base font-semibold text-white mb-2 leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[#6B7280] leading-relaxed">
                      {step.body}
                    </p>

                    {/* CTA on last step */}
                    {isLast && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.7, duration: 0.5 }}
                        className="mt-6"
                      >
                        <Button variant="primary" size="md">
                          {t("hero.cta")}
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
