"use client";

import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, ArrowRight } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { useT } from "@/lib/i18n";
import { appUrls } from "@/lib/app-urls";

interface FAQItem {
  q: string;
  a: string;
}

function AccordionItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="rounded-xl overflow-hidden"
      style={{ background: "#0E1322", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-surface/50 transition-colors duration-200 group"
      >
        <span className="text-sm font-medium text-white group-hover:text-white/90">
          {item.q}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="flex-shrink-0"
        >
          <Plus
            size={18}
            className={`transition-colors duration-200 ${
              isOpen ? "text-primary" : "text-text-secondary"
            }`}
          />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4 border-t border-border/50">
              <p className="pt-4 text-sm text-text-secondary leading-relaxed">
                {item.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const t = useT();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const rawItems = t("faq.items");
  let items: FAQItem[] = [];
  try {
    items = JSON.parse(rawItems) as FAQItem[];
  } catch {
    items = [];
  }

  const fallbackItems: FAQItem[] = [
    {
      q: "¿Es legal? ¿Esto es apostar?",
      a: "No. PickMaster es una plataforma de competencia de habilidad — no de apuestas. Tú no juegas contra la casa: juegas contra otros usuarios. La cuota de entrada es opcional y forma el premio que se reparte entre los mejores. Como un torneo de cualquier deporte.",
    },
    {
      q: "¿Cómo gano el premio?",
      a: "Cada quiniela tiene un premio formado por la entrada de los participantes. Los primeros lugares se llevan un porcentaje del bote según las reglas de cada quiniela. Los premios se asignan cuando cierra la jornada.",
    },
    {
      q: "¿Puedo jugar gratis?",
      a: "Sí — hay quinielas con entrada $0. Úsalas para practicar, conocer la app y empezar a aparecer en rankings antes de saltar a las premium.",
    },
    {
      q: "¿Puedo crear quinielas privadas con amigos?",
      a: "Totalmente. Define el deporte, la jornada, la entrada y a quién invitar. Tu liga, tus reglas, tus amigos.",
    },
    {
      q: "¿Cuándo se cierran los picks?",
      a: "Los picks se cierran al inicio del primer partido de cada jornada. Hasta ese momento puedes cambiarlos cuantas veces quieras.",
    },
    {
      q: "¿Puedo crear múltiples entradas en la misma quiniela?",
      a: "Sí. Puedes registrar tantas entradas como quieras en una misma quiniela, cada una con picks independientes. Más estrategia, más chances de ganar.",
    },
  ];

  const displayItems = items.length > 0 ? items : fallbackItems;

  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(79,127,255,0.2), transparent)" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(79,127,255,0.05), transparent)" }}
      />

      <div ref={ref} className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-4"
          >
            <Badge variant="info">{t("faq.badge")}</Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-white"
          >
            {t("faq.headline")}
          </motion.h2>
        </div>

        {/* Accordion */}
        {isInView && (
          <div className="space-y-3">
            {displayItems.map((item, i) => (
              <AccordionItem
                key={i}
                item={item}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col items-center gap-3 mt-12"
        >
          <Button variant="primary" size="lg" href={appUrls.pools} iconRight={<ArrowRight size={16} />}>
            Explorar quinielas
          </Button>
          <p className="text-xs text-[#6B7280]">Sin tarjeta · Sin compromiso · Empieza en segundos</p>
        </motion.div>
      </div>
    </section>
  );
}
