"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { useCountdown } from "@/hooks/useCountdown";
import { appUrls } from "@/lib/app-urls";

const trustItems = [
  "Sin tarjeta para empezar",
  "Quinielas gratis disponibles",
  "Cancela cuando quieras",
];

export default function FinalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const countdown = useCountdown(23 * 3600000 + 41 * 60000);

  return (
    <section className="py-32 relative overflow-hidden" ref={ref}>
      {/* Aurora glow */}
      <div
        className="aurora"
        style={{
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 900, height: 900,
          background: "radial-gradient(circle, rgba(79,127,255,0.35), transparent 65%)",
        }}
      />

      {/* Top gradient line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(79,127,255,0.4))" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center rounded-3xl border px-6 py-16 sm:px-12"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
            borderColor: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Urgency pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-8 mx-auto"
            style={{
              background: "rgba(245,158,11,0.1)",
              border: "1px solid rgba(245,158,11,0.25)",
            }}
          >
            <span
              style={{
                width: 6, height: 6, borderRadius: "50%",
                background: "#F59E0B",
                display: "inline-block",
              }}
            />
            <span className="text-xs font-semibold font-mono" style={{ color: "#FBBF24" }}>
              Premio J15 cierra en {countdown.formattedLong}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mb-6"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.05] tracking-tight mb-2">
              ¿Crees que sabes más<br className="hidden sm:block" /> de fútbol que tus amigos?
            </h2>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight text-primary">
              Demuéstralo.
            </h2>
          </motion.div>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.22, duration: 0.6 }}
            className="text-lg text-text-secondary max-w-md mx-auto mb-10 leading-relaxed"
          >
            Crea tu cuenta gratis y aparece en el ranking antes de la próxima jornada.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8"
          >
            <Button variant="primary" size="lg" href={appUrls.pools} iconRight={<ArrowRight size={16} />} className="min-w-[220px]">
              Entrar a competir ahora
            </Button>
            <Button variant="ghost" size="lg" href={appUrls.pools}>
              Ver quinielas activas
            </Button>
          </motion.div>

          {/* Trust checklist */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-7"
          >
            {trustItems.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 size={14} style={{ color: "#34D399", flexShrink: 0 }} />
                <span className="text-sm" style={{ color: "#E5E9F0" }}>{item}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient line */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24"
        style={{ background: "linear-gradient(to top, transparent, rgba(79,127,255,0.4))" }}
      />
    </section>
  );
}
