"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  AnimatePresence,
} from "framer-motion";
import { useT } from "@/lib/i18n";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

function CountUp({ value, suffix, label, description }: StatItem) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration: 2,
        ease: "easeOut",
      });
      return () => controls.stop();
    }
  }, [isInView, count, value]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-1.5 py-8 lg:py-6 px-6">
      <div className="text-3xl sm:text-4xl font-bold text-white tabular-nums tracking-tight">
        <motion.span>{rounded}</motion.span>
        <span className="text-primary">{suffix}</span>
      </div>
      <p className="text-sm font-medium text-white/80">{label}</p>
      <p className="text-xs text-text-secondary text-center max-w-[140px] leading-relaxed hidden sm:block">
        {description}
      </p>
    </div>
  );
}

const activityMessages = [
  "12 jugadores se unieron en la última hora",
  "Nueva quiniela creada hace 5 min",
  "Últimos picks antes del cierre · Jornada 15",
  "3 jugadores acaban de subir al top 10",
  "18 entradas registradas hoy",
];

function ActivityTicker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % activityMessages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center py-3 border-b border-border/40">
      <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 live-dot flex-shrink-0" />
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
          >
            {activityMessages[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function SocialProof() {
  const t = useT();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  const stats: StatItem[] = [
    {
      value: 2400,
      suffix: "+",
      label: t("social.players"),
      description: "Jugadores activos compitiendo en quinielas reales",
    },
    {
      value: 180,
      suffix: "+",
      label: t("social.pools"),
      description: "Quinielas activas con rankings en tiempo real",
    },
    {
      value: 25000,
      suffix: "+",
      label: t("social.picks"),
      description: "Picks enviados solo en la jornada actual",
    },
    {
      value: 68,
      suffix: "%",
      label: t("social.accuracy"),
      description: "Aciertos promedio del top 10 esta temporada",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="border-y border-border/60 bg-surface/20 backdrop-blur-sm"
    >
      <ActivityTicker />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 divide-y-[1px] lg:divide-y-0 lg:divide-x divide-border/60"
        >
          {stats.map((stat, i) => (
            <CountUp key={i} {...stat} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
