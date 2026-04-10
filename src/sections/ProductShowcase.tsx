"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Trophy, CheckCircle2, Clock, Star } from "lucide-react";
import Badge from "@/components/ui/Badge";
import GradientText from "@/components/ui/GradientText";
import { useT } from "@/lib/i18n";

function PoolTab() {
  return (
    <div className="rounded-2xl bg-[#111827] border border-[#1F2937] overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#1F2937]">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-white">Liga MX · Jornada 15</h3>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-2 py-0.5">
              ACTIVO
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <Clock size={11} className="text-amber-400" />
            <span className="text-xs text-amber-400">Cierra en 2h 34min</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-text-secondary">Entrada</p>
          <p className="text-xs font-bold text-white">#2</p>
        </div>
      </div>

      <div className="p-5 space-y-3">
        {[
          { home: "América", away: "Chivas", pick: 2 },
          { home: "Cruz Azul", away: "Pumas", pick: 1 },
          { home: "Tigres", away: "Monterrey", pick: 0 },
          { home: "León", away: "Atlas", pick: -1 },
          { home: "Necaxa", away: "Toluca", pick: -1 },
        ].map((match, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm text-[#D1D5DB] truncate">
                {match.home} <span className="text-text-secondary text-xs">vs</span> {match.away}
              </p>
            </div>
            <div className="flex gap-1.5 flex-shrink-0">
              {["L", "X", "V"].map((label, j) => (
                <button
                  key={j}
                  className={`w-9 h-8 rounded-lg text-xs font-bold transition-colors ${
                    match.pick === j
                      ? "bg-primary text-white shadow-[0_0_12px_rgba(37,99,235,0.4)]"
                      : "bg-[#1F2937] text-[#6B7280] border border-[#374151]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="pt-2">
          <button className="w-full h-9 bg-primary hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-colors">
            Guardar picks
          </button>
        </div>
      </div>
    </div>
  );
}

function LeaderboardTab() {
  const entries = [
    { pos: 1, name: "Carlos M.", pts: 8, correct: 8, total: 10, trend: "up" },
    { pos: 2, name: "Ana P.", pts: 6, correct: 6, total: 10, trend: "up" },
    { pos: 3, name: "Tú", pts: 5, correct: 5, total: 10, isMe: true, trend: "neutral" },
    { pos: 4, name: "Miguel R.", pts: 4, correct: 4, total: 10, trend: "down" },
    { pos: 5, name: "Laura V.", pts: 3, correct: 3, total: 10, trend: "down" },
    { pos: 6, name: "Roberto K.", pts: 3, correct: 3, total: 10, trend: "neutral" },
  ];

  return (
    <div className="rounded-2xl bg-[#111827] border border-[#1F2937] overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#1F2937]">
        <div className="flex items-center gap-2">
          <Trophy size={16} className="text-amber-400" />
          <h3 className="text-sm font-semibold text-white">Leaderboard</h3>
          <span className="text-[10px] font-semibold text-[#6B7280] bg-[#1F2937] rounded-full px-2 py-0.5">
            Jornada 8
          </span>
        </div>
        <span className="flex items-center gap-1.5 text-[10px] font-bold text-red-400 bg-red-400/10 border border-red-400/20 rounded-full px-2.5 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 live-dot inline-block" />
          EN VIVO
        </span>
      </div>

      <div className="divide-y divide-[#1F2937]">
        {entries.map((entry) => (
          <div
            key={entry.pos}
            className={`flex items-center gap-3 px-5 py-3 ${
              entry.isMe ? "bg-primary/8 border-l-2 border-primary" : "hover:bg-[#1F2937]/50"
            }`}
          >
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                entry.pos === 1
                  ? "bg-amber-400/20 text-amber-400"
                  : entry.pos === 2
                  ? "bg-slate-400/20 text-slate-400"
                  : entry.pos === 3
                  ? "bg-orange-400/20 text-orange-400"
                  : "bg-[#1F2937] text-text-secondary"
              }`}
            >
              {entry.pos}
            </div>
            <span className={`text-sm flex-1 font-medium ${entry.isMe ? "text-white" : "text-[#D1D5DB]"}`}>
              {entry.name}
              {entry.isMe && (
                <>
                  <span className="ml-1.5 text-[10px] text-primary">(tú)</span>
                  <span className="ml-1.5 text-[9px] font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-1.5 py-0.5">
                    ↑ +5 pos
                  </span>
                </>
              )}
            </span>
            <div className="text-right">
              <p className={`text-sm font-bold ${entry.pos === 1 ? "text-amber-400" : entry.isMe ? "text-primary" : "text-white"}`}>
                {entry.pts} pts
              </p>
              <p className="text-[10px] text-text-secondary">
                {entry.correct}/{entry.total}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MyPicksTab() {
  const picks = [
    { match: "América vs Chivas", pick: "Visitante", result: "Visitante", correct: true, pts: 1 },
    { match: "Cruz Azul vs Pumas", pick: "Empate", result: "Empate", correct: true, pts: 1 },
    { match: "Tigres vs Monterrey", pick: "Local", result: "Local", correct: true, pts: 1 },
    { match: "León vs Atlas", pick: "Local", result: "Visitante", correct: false, pts: 0 },
    { match: "Necaxa vs Toluca", pick: "Empate", result: null, correct: null, pts: null },
  ];

  return (
    <div className="rounded-2xl bg-[#111827] border border-[#1F2937] overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#1F2937]">
        <div className="flex items-center gap-2">
          <Star size={15} className="text-primary" />
          <h3 className="text-sm font-semibold text-white">Mis Picks · Entrada #2</h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 border border-primary/20 rounded-full px-2.5 py-1">
          3 / 5 pts
        </div>
      </div>

      <div className="divide-y divide-[#1F2937]">
        {picks.map((pick, i) => (
          <div key={i} className="flex items-center gap-3 px-5 py-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm text-[#D1D5DB] truncate">{pick.match}</p>
              <p className="text-xs text-text-secondary mt-0.5">
                Mi pick:{" "}
                <span className="text-white font-medium">{pick.pick}</span>
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              {pick.correct === null ? (
                <span className="text-xs text-text-secondary">Pendiente</span>
              ) : pick.correct ? (
                <div className="flex items-center gap-1">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  <span className="text-xs font-bold text-emerald-400">+1 pt</span>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <span className="w-3.5 h-3.5 rounded-full bg-red-400/20 border border-red-400/30 flex items-center justify-center">
                    <span className="text-[8px] text-red-400 font-bold">✕</span>
                  </span>
                  <span className="text-xs text-text-secondary">0 pts</span>
                </div>
              )}
              {pick.result && (
                <p className="text-[10px] text-text-secondary mt-0.5">
                  Res: {pick.result}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="px-5 py-3 bg-[#0D1117] border-t border-[#1F2937] flex items-center justify-between">
        <span className="text-xs text-text-secondary">Total acumulado</span>
        <span className="text-sm font-bold text-primary">3 puntos</span>
      </div>
    </div>
  );
}

const tabComponents = [PoolTab, LeaderboardTab, MyPicksTab];

export default function ProductShowcase() {
  const t = useT();
  const [activeTab, setActiveTab] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const rawTabs = t("showcase.tabs");
  let tabs: string[] = [];
  try {
    tabs = JSON.parse(rawTabs) as string[];
  } catch {
    tabs = ["Quiniela", "Leaderboard", "Mis picks"];
  }

  const ActiveComponent = tabComponents[activeTab] ?? PoolTab;

  return (
    <section id="showcase" className="py-24 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(37,99,235,0.05), transparent)",
        }}
      />

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-4"
          >
            <Badge variant="info">{t("showcase.badge")}</Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-white"
          >
            <GradientText>{t("showcase.headline")}</GradientText>
          </motion.h2>
        </div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="flex bg-surface border border-border rounded-xl p-1 gap-1">
            {tabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === i
                    ? "bg-primary text-white shadow-glow-blue"
                    : "text-text-secondary hover:text-white hover:bg-surface-elevated"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative"
          style={{
            perspective: "1000px",
          }}
        >
          {/* Outer glow wrapper */}
          <div
            className="rounded-3xl p-1"
            style={{
              background: "linear-gradient(135deg, rgba(37,99,235,0.2), rgba(37,99,235,0.05), rgba(37,99,235,0.2))",
            }}
          >
            <div
              className="rounded-2xl bg-[#0B0F1A] p-6 sm:p-8"
              style={{
                boxShadow: "0 0 60px rgba(37,99,235,0.12), 0 40px 80px rgba(0,0,0,0.5)",
                transform: "rotateX(2deg)",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <ActiveComponent />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
