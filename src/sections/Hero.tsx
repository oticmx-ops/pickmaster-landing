"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Users } from "lucide-react";
import Button from "@/components/ui/Button";
import { appUrls } from "@/lib/app-urls";
import { useCountdown } from "@/hooks/useCountdown";

// ── Animated number ───────────────────────────────────────────────────────────
function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const duration = 1400;
            const start = performance.now();
            const tick = (t: number) => {
              const p = Math.min(1, (t - start) / duration);
              const eased = 1 - Math.pow(1 - p, 3);
              setDisplay(Math.round(value * eased));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display.toLocaleString("es-MX")}
    </span>
  );
}

// ── Match pick row ────────────────────────────────────────────────────────────
type Pick = "L" | "E" | "V";

function MatchPickRow({
  home, away, homeColor, awayColor, homeInitial, awayInitial, pick,
}: {
  home: string; away: string;
  homeColor: string; awayColor: string;
  homeInitial: string; awayInitial: string;
  pick: Pick;
}) {
  const pillStyle = (k: Pick) => {
    const active = pick === k;
    const styles: Record<Pick, { bg: string; border: string; color: string }> = {
      L: { bg: "rgba(16,185,129,0.22)", border: "rgba(16,185,129,0.55)", color: "#34D399" },
      E: { bg: "rgba(255,255,255,0.08)", border: "rgba(255,255,255,0.18)", color: "#9AA3B2" },
      V: { bg: "rgba(239,68,68,0.2)", border: "rgba(239,68,68,0.55)", color: "#FCA5A5" },
    };
    const s = styles[k];
    return active
      ? { background: s.bg, border: `1px solid ${s.border}`, color: s.color }
      : { background: "transparent", border: "1px solid transparent", color: "rgba(94,102,120,0.5)" };
  };

  return (
    <div style={{
      padding: "8px 10px",
      background: "rgba(255,255,255,0.025)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: 8,
      display: "grid",
      gridTemplateColumns: "1fr 78px 1fr",
      alignItems: "center",
      gap: 8,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0 }}>
        <div style={{
          width: 20, height: 20, borderRadius: "50%", background: homeColor, color: "#fff",
          display: "grid", placeItems: "center", fontSize: 8, fontWeight: 800, flexShrink: 0,
          border: "1px solid rgba(255,255,255,0.12)",
        }}>{homeInitial}</div>
        <span style={{ fontSize: 11, color: "#E5E9F0", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {home}
        </span>
      </div>
      <div style={{ display: "flex", gap: 2 }}>
        {(["L", "E", "V"] as Pick[]).map((k) => (
          <div key={k} style={{ flex: 1, padding: "4px 0", textAlign: "center", fontSize: 9, fontWeight: 700, borderRadius: 4, ...pillStyle(k) }}>
            {k}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "flex-end", minWidth: 0 }}>
        <span style={{ fontSize: 11, color: "#E5E9F0", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {away}
        </span>
        <div style={{
          width: 20, height: 20, borderRadius: "50%", background: awayColor, color: "#fff",
          display: "grid", placeItems: "center", fontSize: 8, fontWeight: 800, flexShrink: 0,
          border: "1px solid rgba(255,255,255,0.12)",
        }}>{awayInitial}</div>
      </div>
    </div>
  );
}

// ── Live indicators ───────────────────────────────────────────────────────────
function LiveIndicators() {
  const [seconds, setSeconds] = useState(8);
  const [playersToday, setPlayersToday] = useState(27);

  useEffect(() => {
    setPlayersToday(23 + Math.floor(Math.random() * 8));
    const id = setInterval(() => {
      setSeconds((s) => (s >= 15 ? Math.floor(Math.random() * 5) + 2 : s + 1));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#9AA3B2" }}>
        <Users size={12} style={{ color: "#34D399", flexShrink: 0 }} />
        <span>+{playersToday} jugadores se unieron hoy</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#9AA3B2" }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#34D399", display: "inline-block", flexShrink: 0 }} />
        <span>
          Ranking actualizado hace{" "}
          <span className="font-mono tabular-nums font-semibold" style={{ color: "#34D399" }}>
            {seconds}s
          </span>
        </span>
      </div>
    </div>
  );
}

// ── Rank row ──────────────────────────────────────────────────────────────────
function RankRow({
  pos, name, pts, you, flash,
}: {
  pos: number; name: string; pts: number; you?: boolean; flash?: boolean;
}) {
  const medal = pos === 1 ? "🥇" : pos === 2 ? "🥈" : pos === 3 ? "🥉" : null;
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "22px 1fr auto",
        alignItems: "center",
        gap: 7,
        padding: "6px 7px",
        borderRadius: 6,
        background: you
          ? "linear-gradient(90deg, rgba(79,127,255,0.18), rgba(79,127,255,0.05))"
          : flash
          ? "rgba(16,185,129,0.06)"
          : hovered
          ? "rgba(255,255,255,0.04)"
          : "transparent",
        border: you
          ? "1px solid rgba(79,127,255,0.35)"
          : flash
          ? "1px solid rgba(16,185,129,0.2)"
          : hovered
          ? "1px solid rgba(255,255,255,0.07)"
          : "1px solid transparent",
        transition: "all 0.25s ease",
        cursor: "default",
      }}>
      <span style={{ fontSize: 10, color: "rgba(94,102,120,0.8)", textAlign: "center", fontWeight: 600 }}>
        {medal ?? `#${pos}`}
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0 }}>
        <div style={{
          width: 16, height: 16, borderRadius: "50%",
          background: you ? "linear-gradient(135deg,#4F7FFF,#2D5BE0)" : "linear-gradient(135deg,#2A3150,#151B2E)",
          flexShrink: 0, fontSize: 8, fontWeight: 700, color: "#fff",
          display: "grid", placeItems: "center",
        }}>{name[0].toUpperCase()}</div>
        <span style={{ fontSize: 11, color: you ? "#fff" : "#E5E9F0", fontWeight: you ? 600 : 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {name}
        </span>
        {you && (
          <span style={{ fontSize: 8, fontWeight: 700, color: "#6E94FF", background: "rgba(79,127,255,0.2)", padding: "1px 6px", borderRadius: 3, letterSpacing: "0.04em" }}>
            TÚ
          </span>
        )}
      </div>
      <span style={{
        fontSize: 11, fontWeight: 700,
        color: you ? "#F59E0B" : flash ? "#34D399" : "#E5E9F0",
        fontVariantNumeric: "tabular-nums",
        transition: "color 0.4s",
      }}>
        {pts}
      </span>
    </div>
  );
}

// ── Product mock ──────────────────────────────────────────────────────────────
function ProductMock() {
  const countdown = useCountdown(23 * 3600000 + 41 * 60000);
  const [tick, setTick] = useState(0);
  const [flashIdx, setFlashIdx] = useState<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      const idx = Math.floor(Math.random() * 3) + 1; // flash rows 1-3 (not "you")
      setFlashIdx(idx);
      setTick((t) => t + 1);
      setTimeout(() => setFlashIdx(null), 700);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  const basePoints = 124;
  const pts = basePoints + (tick % 4);

  return (
    <div style={{
      borderRadius: 18,
      background: "linear-gradient(180deg, #0E1322, #06080F)",
      border: "1px solid rgba(255,255,255,0.08)",
      boxShadow: "0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(79,127,255,0.1), 0 30px 80px rgba(59,111,245,0.18)",
      overflow: "hidden",
      position: "relative",
    }}>
      {/* Browser chrome */}
      <div style={{
        display: "flex", alignItems: "center", gap: 5,
        padding: "9px 12px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.02)",
      }}>
        {["#3D4458", "#3D4458", "#3D4458"].map((c, i) => (
          <span key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c, display: "block" }} />
        ))}
        <div style={{ flex: 1, textAlign: "center", fontSize: 10, color: "rgba(94,102,120,0.8)", fontFamily: "monospace" }}>
          pickmaster.app · Liga MX J15
        </div>
      </div>

      {/* Body */}
      <div style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 10, padding: 12 }}>
        {/* Left: picks */}
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {/* Pool header */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 4 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>Liga MX · J15</span>
                <span className="tag-active">ACTIVA</span>
              </div>
              <div className="font-mono" style={{ fontSize: 10, color: "#F59E0B", fontWeight: 600 }}>
                ⏱ {countdown.formatted}
              </div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontSize: 9, color: "rgba(94,102,120,0.8)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>Premio</div>
              <div style={{ fontSize: 17, fontWeight: 800, color: "#F59E0B", fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>$2,450</div>
            </div>
          </div>

          {/* Matches */}
          <MatchPickRow
            home="América" away="Monterrey"
            homeColor="linear-gradient(135deg,#FFCC00,#A88600)"
            awayColor="linear-gradient(135deg,#1E3A8A,#0F1424)"
            homeInitial="A" awayInitial="M" pick="L"
          />
          <MatchPickRow
            home="Tigres" away="Chivas"
            homeColor="linear-gradient(135deg,#F59E0B,#92400E)"
            awayColor="linear-gradient(135deg,#C8102E,#7F1D1D)"
            homeInitial="T" awayInitial="C" pick="V"
          />
          <MatchPickRow
            home="Cruz Azul" away="Pumas"
            homeColor="linear-gradient(135deg,#1D4ED8,#1E3A8A)"
            awayColor="linear-gradient(135deg,#1B365D,#3A2A00)"
            homeInitial="CA" awayInitial="P" pick="E"
          />

          {/* Progress */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "rgba(94,102,120,0.8)", marginBottom: 4, fontWeight: 500 }}>
              <span>Picks completados</span>
              <span className="tabular-nums">3 / 7</span>
            </div>
            <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}>
              <div style={{ width: "42%", height: "100%", background: "linear-gradient(90deg, #3B6FF5, #6E94FF)", boxShadow: "0 0 6px rgba(79,127,255,0.6)" }} />
            </div>
          </div>
        </div>

        {/* Right: ranking */}
        <div style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 10,
          padding: 9,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 5, padding: "0 3px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: 5 }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round">
                <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 11-10 0V4z" />
              </svg>
              Clasificación
            </div>
            {/* EN VIVO badge */}
            <div style={{
              display: "flex", alignItems: "center", gap: 3,
              fontSize: 8, fontWeight: 800, letterSpacing: "0.06em",
              color: "#34D399", background: "rgba(16,185,129,0.12)",
              border: "1px solid rgba(16,185,129,0.3)",
              padding: "2px 6px", borderRadius: 4,
            }}>
              <span className="pulse-dot" style={{ width: 5, height: 5, background: "#10B981" }} />
              EN VIVO
            </div>
          </div>
          <RankRow pos={1} name="rmoya" pts={pts} you />
          <RankRow pos={2} name="akoral" pts={118} flash={flashIdx === 1} />
          <RankRow pos={3} name="ledgr" pts={112} flash={flashIdx === 2} />
          <RankRow pos={4} name="sofic" pts={104} flash={flashIdx === 3} />
          <RankRow pos={5} name="jpaz_99" pts={96} />
        </div>
      </div>

      {/* Toast */}
      <div className="animate-fade-float" style={{
        position: "absolute", bottom: 12, right: 12,
        background: "rgba(16,185,129,0.14)",
        border: "1px solid rgba(16,185,129,0.4)",
        borderRadius: 8, padding: "5px 10px",
        fontSize: 11, color: "#34D399",
        display: "flex", alignItems: "center", gap: 5,
        backdropFilter: "blur(10px)", fontWeight: 600,
      }}>
        ✓ Pick guardado
      </div>
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] as number[] },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-[auto] sm:min-h-screen flex items-start sm:items-center pt-20 pb-10 sm:pb-16 overflow-hidden">
      {/* Grain */}
      <div className="grain" />

      {/* Aurora blobs */}
      <div className="aurora" style={{ top: -120, left: "-10%", width: 700, height: 700, background: "radial-gradient(circle, rgba(79,127,255,0.5), transparent 70%)" }} />
      <div className="aurora" style={{ top: 80, right: "-15%", width: 550, height: 550, background: "radial-gradient(circle, rgba(245,158,11,0.14), transparent 70%)" }} />

      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        maskImage: "radial-gradient(ellipse at center, black 35%, transparent 75%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 35%, transparent 75%)",
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6 sm:py-12 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">

          {/* ─── Left column ─── */}
          <div className="flex flex-col items-start gap-4 sm:gap-6">

            {/* Urgency badge — amber */}
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full" style={{
                background: "rgba(245,158,11,0.1)",
                border: "1px solid rgba(245,158,11,0.3)",
              }}>
                <span className="live-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#F59E0B", display: "inline-block", flexShrink: 0 }} />
                <span className="text-xs font-semibold" style={{ color: "#FBBF24" }}>
                  3 quinielas activas · 2 cierran hoy
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <div className="space-y-0.5">
              <motion.h1
                custom={1} variants={fadeUp} initial="hidden" animate="visible"
                className="text-[2.75rem] sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-extrabold leading-[1.05] tracking-[-0.035em] text-white"
              >
                Hoy se define
              </motion.h1>
              <motion.h1
                custom={2} variants={fadeUp} initial="hidden" animate="visible"
                className="text-[2.75rem] sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-extrabold leading-[1.05] tracking-[-0.035em] animate-gradient-shift bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg, #6E94FF, #4F7FFF, #6E94FF)" }}
              >
                quién sabe más.
              </motion.h1>
              <motion.h2
                custom={2.5} variants={fadeUp} initial="hidden" animate="visible"
                className="text-xl sm:text-2xl lg:text-3xl font-semibold leading-snug tracking-[-0.02em] pt-1"
                style={{ color: "#9AA3B2" }}
              >
                Entra antes de que cierre.
              </motion.h2>
            </div>

            {/* Subheadline — hidden on mobile to keep hero tight */}
            <motion.p
              custom={3} variants={fadeUp} initial="hidden" animate="visible"
              className="hidden sm:block text-base sm:text-lg leading-relaxed max-w-[480px]"
              style={{ color: "#9AA3B2" }}
            >
              Las quinielas ya están activas.{" "}
              <span className="text-white font-semibold">Elige una, registra tus picks</span>{" "}
              y compite en el ranking en vivo — entra a competir en minutos, sin apuestas.
            </motion.p>

            {/* Live indicators — hidden on mobile */}
            <motion.div custom={3.5} variants={fadeUp} initial="hidden" animate="visible" className="hidden sm:block">
              <LiveIndicators />
            </motion.div>

            {/* CTAs */}
            <motion.div
              custom={4} variants={fadeUp} initial="hidden" animate="visible"
              className="flex flex-col items-start gap-2.5"
            >
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Button variant="primary" size="lg" href="#quinielas" iconRight={<ChevronRight size={18} />} className="btn-cta-glow w-full sm:w-auto justify-center">
                  Ver quinielas activas
                </Button>
                <Button variant="ghost" size="lg" href={appUrls.pools} className="w-full sm:w-auto justify-center">
                  Entrar a competir
                </Button>
              </div>
              {/* Urgency line below CTA */}
              <p className="text-xs font-medium" style={{ color: "#FBBF24" }}>
                🔥 3 quinielas activas · 2 cierran hoy
              </p>
            </motion.div>

            {/* Trust micro */}
            <motion.div
              custom={4} variants={fadeUp} initial="hidden" animate="visible"
              className="flex flex-wrap items-center gap-x-4 gap-y-1.5"
            >
              {["Entra en minutos", "Sin complicaciones", "Ranking en vivo"].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-xs" style={{ color: "rgba(154,163,178,0.85)" }}>{item}</span>
                </div>
              ))}
            </motion.div>

            {/* Stats bar — hidden on mobile */}
            <motion.div
              custom={5} variants={fadeUp} initial="hidden" animate="visible"
              className="hidden sm:flex gap-8 flex-wrap pt-6 border-t w-full"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              <div>
                <div className="text-2xl font-extrabold tabular-nums leading-none mb-1" style={{ color: "#F59E0B" }}>
                  $<AnimatedNumber value={12400} />
                </div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.08em] mt-1" style={{ color: "rgba(94,102,120,0.8)" }}>
                  En premios repartidos
                </div>
              </div>
              <div>
                <div className="text-2xl font-extrabold tabular-nums leading-none mb-1 text-white">
                  <AnimatedNumber value={847} />
                </div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.08em] mt-1" style={{ color: "rgba(94,102,120,0.8)" }}>
                  Jugadores activos
                </div>
              </div>
              <div>
                <div className="text-2xl font-extrabold tabular-nums leading-none mb-1 text-white">
                  <AnimatedNumber value={94} />%
                </div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.08em] mt-1" style={{ color: "rgba(94,102,120,0.8)" }}>
                  Repiten cada jornada
                </div>
              </div>
            </motion.div>
          </div>

          {/* ─── Right column — Product Mock (hidden on mobile) ─── */}
          <motion.div
            initial={{ opacity: 0, x: 32, rotate: -1.5 }}
            animate={{ opacity: 1, x: 0, rotate: -2 }}
            transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex justify-end"
          >
            <div className="w-full max-w-[480px]">
              <ProductMock />
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
        >
          <div className="w-px h-10" style={{ background: "linear-gradient(to bottom, transparent, rgba(26,32,53,0.8))" }} />
          <span className="text-[10px] uppercase tracking-[0.15em]" style={{ color: "rgba(94,102,120,0.6)" }}>Scroll</span>
        </motion.div>
      </div>
    </section>
  );
}
