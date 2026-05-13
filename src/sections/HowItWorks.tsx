"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Step {
  n: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  accent: "blue" | "amber" | "green";
}

const steps: Step[] = [
  {
    n: "01",
    title: "Crea tu cuenta",
    desc: "Regístrate gratis y accede a las quinielas disponibles. Verifica tu email y ya estás listo para competir.",
    accent: "blue",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M19 8v6M22 11h-6" />
      </svg>
    ),
  },
  {
    n: "02",
    title: "Envía tus picks",
    desc: "Selecciona Local, Empate o Visitante para cada partido antes del cierre. Sin marcadores exactos, sin complicaciones.",
    accent: "amber",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ),
  },
  {
    n: "03",
    title: "Sube en el ranking",
    desc: "Cada acierto suma puntos y te acerca al premio. La clasificación se actualiza en vivo con cada resultado.",
    accent: "green",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 11-10 0V4z" />
      </svg>
    ),
  },
];

const accentColors = {
  blue:  { bg: "rgba(79,127,255,0.14)",  border: "rgba(79,127,255,0.3)",  text: "#6E94FF"  },
  amber: { bg: "rgba(245,158,11,0.14)",  border: "rgba(245,158,11,0.3)",  text: "#FBBF24"  },
  green: { bg: "rgba(16,185,129,0.14)",  border: "rgba(16,185,129,0.3)",  text: "#34D399"  },
};

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="how-it-works" className="py-28 relative overflow-hidden">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(79,127,255,0.2), transparent)" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(79,127,255,0.05), transparent)" }}
      />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
            CÓMO FUNCIONA
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Tres pasos. Cero complicaciones.
          </h2>
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
            Una experiencia simple — pero pensada para que el que sepa de fútbol gane.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((step, i) => {
            const c = accentColors[step.accent];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
                className="card-lift relative rounded-2xl p-7 overflow-hidden border"
                style={{
                  background: "#0E1322",
                  borderColor: "rgba(255,255,255,0.06)",
                }}
              >
                {/* Step number watermark */}
                <div
                  style={{
                    position: "absolute",
                    top: -16,
                    right: -12,
                    fontSize: 120,
                    fontWeight: 800,
                    color: "rgba(255,255,255,0.018)",
                    lineHeight: 1,
                    fontVariantNumeric: "tabular-nums",
                    pointerEvents: "none",
                    userSelect: "none",
                  }}
                >
                  {step.n}
                </div>

                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    background: c.bg,
                    border: `1px solid ${c.border}`,
                    color: c.text,
                  }}
                >
                  {step.icon}
                </div>

                {/* Step label */}
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] mb-2" style={{ color: c.text }}>
                  Paso {step.n}
                </p>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>

                {/* Desc */}
                <p className="text-sm leading-relaxed" style={{ color: "#9AA3B2" }}>
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
