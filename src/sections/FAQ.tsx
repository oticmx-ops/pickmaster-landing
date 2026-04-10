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
      className="border border-border rounded-xl overflow-hidden"
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
    { q: "¿Necesito tarjeta de crédito para registrarme?", a: "No. El registro es completamente gratuito. Solo necesitas un email válido." },
    { q: "¿Puedo crear múltiples entradas en la misma quiniela?", a: "Sí. Puedes crear tantas entradas como quieras en una misma quiniela, cada una con picks independientes." },
    { q: "¿Cómo se calculan los puntos?", a: "Cada pick correcto suma 1 punto. El ranking se ordena por puntos totales, luego por picks correctos y finalmente por fecha de creación." },
    { q: "¿Puedo cambiar mis picks después de guardarlos?", a: "Sí, mientras la quiniela esté abierta. Una vez pasada la fecha de cierre, los picks quedan bloqueados." },
    { q: "¿Cómo sé que los resultados son justos?", a: "El administrador registra los resultados en el sistema. Una vez finalizada la quiniela, los datos son de solo lectura para todos." },
  ];

  const displayItems = items.length > 0 ? items : fallbackItems;

  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(37,99,235,0.05), transparent)",
        }}
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
          <Button variant="primary" size="lg" href={appUrls.explore} iconRight={<ArrowRight size={16} />}>
            Explorar quinielas
          </Button>
          <p className="text-xs text-[#6B7280]">Sin tarjeta · Sin compromiso · Empieza en segundos</p>
        </motion.div>
      </div>
    </section>
  );
}
