"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, Users, Smartphone, Shield, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { appUrls } from "@/lib/app-urls";

// ── Live ranking demo ─────────────────────────────────────────────────────────
interface Player {
  name: string;
  pts: number;
  you: boolean;
  delta: number;
}

const initialPlayers: Player[] = [
  { name: "rmoya", pts: 124, you: true, delta: 0 },
  { name: "akoral", pts: 122, you: false, delta: 0 },
  { name: "ledgr", pts: 119, you: false, delta: 0 },
  { name: "sofic", pts: 110, you: false, delta: 0 },
  { name: "jpaz_99", pts: 104, you: false, delta: 0 },
  { name: "mlucia", pts: 98, you: false, delta: 0 },
];

function LiveRankingDemo() {
  const [data, setData] = useState<Player[]>(initialPlayers);

  useEffect(() => {
    const id = setInterval(() => {
      setData((prev) => {
        const updated = prev.map((p) => ({
          ...p,
          pts: p.pts + (Math.random() < 0.4 ? Math.floor(Math.random() * 3) : 0),
          delta: 0,
        }));
        const sorted = [...updated].sort((a, b) => b.pts - a.pts);
        return sorted.map((p, i) => ({
          ...p,
          delta: prev.findIndex((x) => x.name === p.name) - i,
        }));
      });
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0))",
        backgroundColor: "#0E1322",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 14,
        padding: 16,
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, padding: "0 4px" }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#9AA3B2", display: "flex", alignItems: "center", gap: 6 }}>
          <span className="pulse-dot" style={{ width: 6, height: 6 }} />
          EN VIVO
        </div>
        <span style={{ fontSize: 11, color: "rgba(94,102,120,0.7)" }}>Liga MX · J15</span>
      </div>

      {/* Rows */}
      {data.map((p, i) => (
        <div
          key={p.name}
          style={{
            display: "grid",
            gridTemplateColumns: "22px 20px 1fr auto auto",
            alignItems: "center",
            gap: 8,
            padding: "8px 6px",
            borderRadius: 7,
            background: p.you ? "linear-gradient(90deg, rgba(79,127,255,0.16), rgba(79,127,255,0.04))" : "transparent",
            border: p.you ? "1px solid rgba(79,127,255,0.3)" : "1px solid transparent",
            transition: "all 0.6s ease",
            marginBottom: 2,
          }}
        >
          <span style={{ fontSize: 11, color: "rgba(94,102,120,0.8)", textAlign: "center", fontWeight: 600 }}>
            {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}
          </span>
          <span style={{ fontSize: 10, fontWeight: 700, textAlign: "center", color: p.delta > 0 ? "#34D399" : p.delta < 0 ? "#FCA5A5" : "rgba(94,102,120,0.5)" }}>
            {p.delta > 0 ? `▲${p.delta}` : p.delta < 0 ? `▼${Math.abs(p.delta)}` : "·"}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 7, minWidth: 0 }}>
            <div
              style={{
                width: 22, height: 22, borderRadius: "50%",
                background: p.you ? "linear-gradient(135deg,#4F7FFF,#2D5BE0)" : "linear-gradient(135deg,#2A3150,#151B2E)",
                fontSize: 10, fontWeight: 700, color: "#fff",
                display: "grid", placeItems: "center", flexShrink: 0,
              }}
            >
              {p.name[0].toUpperCase()}
            </div>
            <span style={{ fontSize: 13, color: p.you ? "#fff" : "#E5E9F0", fontWeight: p.you ? 600 : 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {p.name}
            </span>
          </div>
          {p.you && (
            <span style={{ fontSize: 9, fontWeight: 700, color: "#6E94FF", background: "rgba(79,127,255,0.18)", padding: "2px 6px", borderRadius: 3 }}>
              TÚ
            </span>
          )}
          <span style={{ fontSize: 13, fontWeight: 700, color: p.you ? "#F59E0B" : "#E5E9F0", fontVariantNumeric: "tabular-nums", minWidth: 30, textAlign: "right" }}>
            {p.pts}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Feature block ─────────────────────────────────────────────────────────────
function FeatureBlock({
  icon, title, desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div
      className="card-lift rounded-2xl p-6 border"
      style={{
        background: "#0E1322",
        borderColor: "rgba(255,255,255,0.06)",
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
        style={{
          background: "rgba(79,127,255,0.12)",
          border: "1px solid rgba(79,127,255,0.25)",
          color: "#6E94FF",
        }}
      >
        {icon}
      </div>
      <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: "#9AA3B2" }}>{desc}</p>
    </div>
  );
}

const featureBlocks = [
  {
    icon: <Globe size={18} />,
    title: "Múltiples ligas",
    desc: "Liga MX, Champions, Premier, La Liga y torneos especiales. Todas en un solo lugar.",
  },
  {
    icon: <Users size={18} />,
    title: "Quinielas privadas",
    desc: "Crea ligas con amigos, define el premio y juega solo entre ustedes. Tú pones las reglas.",
  },
  {
    icon: <Smartphone size={18} />,
    title: "Picks en segundos",
    desc: "Interfaz limpia para registrar L, E o V por partido. Sin fricción, sin pasos extras.",
  },
  {
    icon: <Shield size={18} />,
    title: "Cierre automático",
    desc: "Los picks se bloquean al inicio del primer partido. Sin trampas, competencia 100% limpia.",
  },
];

// ── Section ───────────────────────────────────────────────────────────────────
export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="features" className="py-28 relative overflow-hidden">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(79,127,255,0.2), transparent)" }}
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
            POR QUÉ PICKMASTER
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Todo lo que necesitas.{" "}
            <span className="text-primary">Nada que sobre.</span>
          </h2>
        </motion.div>

        {/* Live ranking demo split */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-16"
        >
          {/* Text */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] mb-3" style={{ color: "#34D399" }}>
              RANKING EN VIVO
            </p>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-snug">
              Mira tu posición moverse en tiempo real.
            </h3>
            <p className="text-base leading-relaxed mb-6" style={{ color: "#9AA3B2" }}>
              Cada gol, cada acierto y cada cambio de marcador actualiza el ranking al instante.
              Sin esperar hasta el lunes.
            </p>
            <ul className="flex flex-col gap-2.5">
              {[
                "Posiciones que cambian con cada partido",
                "Flecha de movimiento para ver si subes o bajas",
                "Histórico de rendimiento por jornada",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: "#9AA3B2" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: 2, flexShrink: 0 }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Demo */}
          <LiveRankingDemo />
        </motion.div>

        {/* Feature blocks */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {featureBlocks.map((fb, i) => (
            <FeatureBlock key={i} {...fb} />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex justify-center mt-12"
        >
          <Button variant="primary" size="lg" href={appUrls.pools} iconRight={<ArrowRight size={16} />}>
            Explorar quinielas ahora
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
