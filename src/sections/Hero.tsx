"use client";

import React from "react";
import { motion } from "framer-motion";
import { Play, Clock, Trophy, CheckCircle2, Users, Timer } from "lucide-react";
import Button from "@/components/ui/Button";
import { useT } from "@/lib/i18n";
import { appUrls } from "@/lib/app-urls";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  }),
};

function HeroMockup() {
  return (
    <div className="relative w-full max-w-[400px] mx-auto lg:mx-0 lg:ml-auto">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 rounded-3xl -z-10"
        style={{
          background: "radial-gradient(ellipse 100% 80% at 50% 50%, rgba(37,99,235,0.18), transparent 70%)",
          transform: "scale(1.3)",
          filter: "blur(40px)",
        }}
      />

      <div
        className="rounded-2xl border border-[#1F2937] bg-[#111827] overflow-hidden"
        style={{
          boxShadow:
            "0 0 0 1px rgba(37,99,235,0.08), 0 24px 60px rgba(0,0,0,0.6), 0 0 80px rgba(37,99,235,0.08)",
          animation: "float 7s ease-in-out infinite",
        }}
      >
        {/* App top bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#1F2937]">
          <div className="flex items-center gap-2">
            <img src="/logo-full.svg" alt="PickMaster" className="h-5 w-auto" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-emerald-400/20" />
            <div className="w-7 h-7 rounded-full bg-[#1F2937] border border-[#374151] flex items-center justify-center">
              <span className="text-[10px] text-[#9CA3AF] font-semibold">CG</span>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-3">
          {/* Pool card */}
          <div className="rounded-xl bg-[#0D1117] border border-[#1F2937] p-3.5 space-y-3">
            {/* Pool header */}
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-semibold text-white leading-none">
                    Liga MX · Jornada 15
                  </span>
                  <span className="text-[9px] font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-2 py-0.5 leading-none flex-shrink-0">
                    ACTIVO
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-1.5">
                  <Clock size={9} className="text-amber-400 flex-shrink-0" />
                  <span className="text-[10px] text-amber-400">Cierra en 2h 34min</span>
                </div>
              </div>
              <span className="text-[10px] text-[#6B7280] flex-shrink-0">Entrada #1</span>
            </div>

            {/* Divider */}
            <div className="h-px bg-[#1F2937]" />

            {/* Match rows */}
            <div className="space-y-2">
              {[
                { home: "América", away: "Chivas", pick: 2 },
                { home: "Cruz Azul", away: "Pumas", pick: 1 },
                { home: "Tigres", away: "Monterrey", pick: 0 },
              ].map((match, i) => (
                <div key={i} className="flex items-center justify-between gap-2">
                  <span className="text-[10px] text-[#9CA3AF] truncate flex-1 min-w-0">
                    {match.home}{" "}
                    <span className="text-[#6B7280]">vs</span>{" "}
                    {match.away}
                  </span>
                  <div className="flex gap-1 flex-shrink-0">
                    {["L", "X", "V"].map((label, j) => (
                      <button
                        key={j}
                        className={`w-7 h-6 rounded-md text-[10px] font-bold transition-colors ${
                          match.pick === j
                            ? "bg-[#2563EB] text-white shadow-[0_0_10px_rgba(37,99,235,0.5)]"
                            : "bg-[#1F2937] text-[#6B7280]"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div className="rounded-xl bg-[#0D1117] border border-[#1F2937] p-3.5 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Trophy size={11} className="text-amber-400" />
                <span className="text-[11px] font-semibold text-white">Ranking</span>
              </div>
              <div className="flex items-center gap-1.5 text-[9px] font-bold text-red-400 bg-red-400/10 border border-red-400/20 rounded-full px-2 py-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 live-dot inline-block" />
                EN VIVO
              </div>
            </div>

            <div className="space-y-1">
              {[
                { pos: 1, name: "Carlos M.", pts: 8, isMe: false },
                { pos: 2, name: "Ana P.", pts: 6, isMe: false },
                { pos: 3, name: "Tú", pts: 5, isMe: true },
                { pos: 4, name: "Miguel R.", pts: 4, isMe: false },
              ].map((entry) => (
                <div
                  key={entry.pos}
                  className={`flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 transition-colors ${
                    entry.isMe
                      ? "bg-[#2563EB]/10 border border-[#2563EB]/20"
                      : ""
                  }`}
                >
                  <span
                    className={`text-[10px] font-bold w-4 text-center flex-shrink-0 ${
                      entry.pos === 1
                        ? "text-amber-400"
                        : entry.isMe
                        ? "text-[#3B82F6]"
                        : "text-[#6B7280]"
                    }`}
                  >
                    #{entry.pos}
                  </span>
                  <span
                    className={`text-[11px] flex-1 font-medium ${
                      entry.isMe ? "text-white" : "text-[#D1D5DB]"
                    }`}
                  >
                    {entry.name}
                    {entry.isMe && (
                      <span className="ml-1 text-[9px] text-[#3B82F6]">(tú)</span>
                    )}
                  </span>

                  {/* Mini progress bar */}
                  <div className="w-12 h-1 rounded-full bg-[#1F2937] overflow-hidden flex-shrink-0">
                    <div
                      className={`h-full rounded-full ${
                        entry.pos === 1
                          ? "bg-amber-400"
                          : entry.isMe
                          ? "bg-[#2563EB]"
                          : "bg-[#374151]"
                      }`}
                      style={{ width: `${(entry.pts / 10) * 100}%` }}
                    />
                  </div>

                  <span
                    className={`text-[10px] font-bold flex-shrink-0 w-8 text-right ${
                      entry.pos === 1
                        ? "text-amber-400"
                        : entry.isMe
                        ? "text-[#3B82F6]"
                        : "text-[#9CA3AF]"
                    }`}
                  >
                    {entry.pts} pts
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const t = useT();

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      {/* Base background */}
      <div className="absolute inset-0 bg-background" />

      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-[0.35]" />

      {/* Top radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 55% at 50% -5%, rgba(37,99,235,0.14), transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* ─── LEFT COLUMN ─── */}
          <div className="flex flex-col items-start gap-7">

            {/* Badge pill */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#3B82F6] bg-[#2563EB]/10 border border-[#2563EB]/20 rounded-full px-4 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 live-dot" />
                {t("hero.badge")}
              </div>
            </motion.div>

            {/* Headline */}
            <div className="space-y-0.5">
              <motion.h1
                custom={1}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="text-[2.75rem] sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold leading-[1.08] tracking-[-0.02em] text-white"
              >
                {t("hero.headline")}
              </motion.h1>
              <motion.h1
                custom={2}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="text-[2.75rem] sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold leading-[1.08] tracking-[-0.02em] bg-gradient-to-r from-[#2563EB] to-[#60A5FA] bg-clip-text text-transparent"
              >
                {t("hero.headlineAccent")}
              </motion.h1>
            </div>

            {/* Subheadline */}
            <motion.p
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-base sm:text-lg text-[#9CA3AF] leading-relaxed max-w-[420px]"
            >
              {t("hero.subheadline")}
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row gap-3"
            >
              <Button variant="primary" size="lg" href={appUrls.explore}>
                Explorar quinielas
              </Button>
              <Button
                variant="ghost"
                size="lg"
                href={appUrls.register}
                iconLeft={
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Play size={9} className="text-white ml-0.5" fill="currentColor" />
                  </div>
                }
              >
                Crear cuenta gratis
              </Button>
            </motion.div>

            {/* Social proof micro-lines */}
            <motion.div
              custom={5}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-2"
            >
              <div className="flex items-center gap-2">
                <Users size={13} className="text-[#3B82F6] flex-shrink-0" />
                <span className="text-xs text-[#9CA3AF]">{t("hero.joinLine")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Timer size={13} className="text-emerald-400 flex-shrink-0" />
                <span className="text-xs text-[#9CA3AF]">{t("hero.timeLine")}</span>
              </div>
            </motion.div>
          </div>

          {/* ─── RIGHT COLUMN — Mockup ─── */}
          <motion.div
            initial={{ opacity: 0, x: 32, rotate: -1.5 }}
            animate={{ opacity: 1, x: 0, rotate: -2 }}
            transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center lg:justify-end"
          >
            <HeroMockup />
          </motion.div>
        </div>

        {/* Bottom scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
        >
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-[#1F2937]" />
          <span className="text-[10px] text-[#6B7280] uppercase tracking-[0.15em]">Scroll</span>
        </motion.div>
      </div>
    </section>
  );
}
