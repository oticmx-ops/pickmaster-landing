"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Flame, Zap } from "lucide-react";
import { useCountdown } from "@/hooks/useCountdown";
import { appUrls } from "@/lib/app-urls";

interface QuinielaCardProps {
  league: string;
  round: string;
  prize: number;
  players: number;
  total: number;
  fee: number;
  hot: boolean;
  offsetHours: number;
  offsetMinutes?: number;
}

function QuinielaCard({
  league, round, prize, players, total, fee, hot, offsetHours, offsetMinutes = 0,
}: QuinielaCardProps) {
  const fillPct = Math.round((players / total) * 100);
  const spotsLeft = total - players;
  const isUrgent = offsetHours < 24;
  const isFull = fillPct >= 80;
  const isFillingUp = !isUrgent && fillPct >= 60 && fillPct < 80;
  const countdown = useCountdown(offsetHours * 3600000 + offsetMinutes * 60000);

  return (
    <a
      href={appUrls.pools}
      className="card-lift relative flex flex-col rounded-2xl border overflow-hidden group"
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0) 100%), #0E1322",
        borderColor: isUrgent ? "rgba(245,158,11,0.25)" : "rgba(26,32,53,1)",
        textDecoration: "none",
      }}
    >
      {/* Badge top-right */}
      {isUrgent ? (
        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
          style={{ background: "rgba(239,68,68,0.12)", color: "#F87171", border: "1px solid rgba(239,68,68,0.3)" }}>
          <Zap size={9} className="fill-current" />
          Últimas horas
        </div>
      ) : isFull ? (
        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
          style={{ background: "rgba(245,158,11,0.12)", color: "#FBBF24", border: "1px solid rgba(245,158,11,0.3)" }}>
          <Flame size={10} />
          Se está llenando
        </div>
      ) : isFillingUp ? (
        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
          style={{ background: "rgba(245,158,11,0.08)", color: "#D97706", border: "1px solid rgba(245,158,11,0.2)" }}>
          <Zap size={9} />
          Llenándose
        </div>
      ) : hot ? (
        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
          style={{ background: "rgba(245,158,11,0.12)", color: "#FBBF24", border: "1px solid rgba(245,158,11,0.3)" }}>
          <Flame size={10} />
          Popular
        </div>
      ) : null}

      <div className="p-6 flex flex-col gap-4 flex-1">
        {/* League label */}
        <div className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">
          {league}
        </div>

        {/* Round + Prize */}
        <div>
          <h3 className="text-lg font-bold text-white mb-3">{round}</h3>
          <div className="flex items-baseline gap-1.5">
            <span className="text-5xl font-black tabular-nums tracking-tight" style={{ color: "#FBBF24", textShadow: "0 0 32px rgba(251,191,36,0.45), 0 0 8px rgba(245,158,11,0.3)" }}>
              ${prize.toLocaleString("es-MX")}
            </span>
            <span className="text-xs text-text-secondary font-medium">en premios</span>
          </div>
        </div>

        {/* Fill bar */}
        <div>
          <div className="flex justify-between text-xs mb-2">
            <span style={{ color: isFull ? "#FBBF24" : "#9AA3B2" }}>
              {players} de {total} jugadores
              {spotsLeft <= 7 && (
                <span className="ml-2 font-bold" style={{ color: "#F87171" }}>
                  · Solo quedan {spotsLeft}
                </span>
              )}
            </span>
            <span className="tabular-nums font-semibold" style={{ color: isFull ? "#FBBF24" : "#9AA3B2" }}>
              {fillPct}%
            </span>
          </div>
          <div className="h-2 sm:h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
            <div
              className={`h-full rounded-full transition-all duration-700${isFull ? " shimmer" : ""}`}
              style={{
                width: `${fillPct}%`,
                background: isFull
                  ? "linear-gradient(90deg, #D97706, #FBBF24, #D97706)"
                  : hot
                  ? "linear-gradient(90deg, #D97706, #FBBF24)"
                  : "linear-gradient(90deg, #3B6FF5, #6E94FF)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 sm:px-6 py-4 border-t border-border">
        {/* Mobile: stacked layout with full-width CTA */}
        <div className="flex sm:hidden items-center justify-between mb-3">
          <div>
            <div className="text-[10px] text-text-secondary font-medium uppercase tracking-wider mb-0.5">Cierra en</div>
            <div className="font-mono text-sm font-semibold tabular-nums" style={{ color: isUrgent ? "#F87171" : "#F59E0B" }}>
              {countdown.formattedLong}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-text-secondary font-medium uppercase tracking-wider mb-0.5">Entrada</div>
            <div className="text-sm font-bold text-white">${fee} MXN</div>
          </div>
        </div>
        <div
          className="sm:hidden flex flex-col items-center justify-center w-full rounded-xl text-white"
          style={{ minHeight: 48, background: "linear-gradient(180deg, #4F7FFF, #3B6FF5)", boxShadow: "0 4px 16px rgba(59,111,245,0.4)" }}
        >
          <span className="text-sm font-semibold">Entrar ahora</span>
        </div>

        {/* Desktop: inline layout */}
        <div className="hidden sm:flex items-center justify-between">
          <div>
            <div className="text-[10px] text-text-secondary font-medium uppercase tracking-wider mb-0.5">Cierra en</div>
            <div className="font-mono text-sm font-semibold tabular-nums" style={{ color: isUrgent ? "#F87171" : "#F59E0B" }}>
              {countdown.formattedLong}
            </div>
          </div>
          <div
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.04] hover:-translate-y-px active:scale-95"
            style={{ background: "linear-gradient(180deg, #4F7FFF, #3B6FF5)", boxShadow: "0 1px 0 rgba(255,255,255,0.2) inset, 0 6px 20px rgba(59,111,245,0.35)" }}
          >
            Entrar · ${fee}
          </div>
        </div>
      </div>
    </a>
  );
}

const pools: QuinielaCardProps[] = [
  {
    league: "Liga MX",
    round: "Jornada 15",
    prize: 2450,
    players: 23,
    total: 30,
    fee: 100,
    hot: true,
    offsetHours: 23,
    offsetMinutes: 41,
  },
  {
    league: "Champions League",
    round: "Octavos de Final · Ida",
    prize: 5800,
    players: 47,
    total: 50,
    fee: 150,
    hot: true,
    offsetHours: 52,
    offsetMinutes: 10,
  },
  {
    league: "Premier League",
    round: "Matchday 24",
    prize: 1200,
    players: 12,
    total: 25,
    fee: 50,
    hot: false,
    offsetHours: 104,
    offsetMinutes: 0,
  },
];

export default function ActiveQuinielas() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="quinielas" className="py-10 sm:py-28 relative overflow-hidden">
      {/* Subtle divider glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(79,127,255,0.25), transparent)" }}
      />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
            QUINIELAS ABIERTAS
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Hay partido. Hay premio.{" "}
            <span className="text-primary">Hay tiempo.</span>
          </h2>
          <p className="hidden sm:block text-text-secondary text-base sm:text-lg leading-relaxed">
            Elige una quiniela activa, registra tus picks y compite contra el resto en tiempo real.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pools.map((pool, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <QuinielaCard {...pool} />
            </motion.div>
          ))}
        </div>

        {/* Mid-page CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mt-14 flex flex-col items-center gap-4 text-center"
        >
          <div>
            <p className="text-xl font-bold text-white mb-1">¿Listo para entrar?</p>
            <p className="text-sm" style={{ color: "#9AA3B2" }}>
              Hay <span className="text-white font-semibold">3 quinielas abiertas ahora</span> — elige la tuya y entra a competir en minutos.
            </p>
          </div>
          <a
            href={appUrls.pools}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.03] hover:-translate-y-px"
            style={{
              background: "linear-gradient(180deg, #4F7FFF, #3B6FF5)",
              boxShadow: "0 1px 0 rgba(255,255,255,0.2) inset, 0 8px 24px rgba(59,111,245,0.4)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 1px 0 rgba(255,255,255,0.25) inset, 0 12px 32px rgba(59,111,245,0.6)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 1px 0 rgba(255,255,255,0.2) inset, 0 8px 24px rgba(59,111,245,0.4)";
            }}
          >
            Ver quinielas activas
            <ArrowRight size={15} />
          </a>
          <p className="text-[11px]" style={{ color: "rgba(94,102,120,0.7)" }}>
            Gratis para empezar · Sin tarjeta
          </p>
        </motion.div>
      </div>
    </section>
  );
}
