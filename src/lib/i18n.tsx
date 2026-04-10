"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import esContent from "@/content/es.json";
import enContent from "@/content/en.json";

type Language = "es" | "en";
type ContentMap = Record<string, unknown>;

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

function getNestedValue(obj: ContentMap, path: string): string {
  const result = path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && !Array.isArray(acc)) {
      return (acc as ContentMap)[key];
    }
    return undefined;
  }, obj);

  if (typeof result === "string") return result;
  if (Array.isArray(result)) return JSON.stringify(result);
  return path;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es");

  const t = useCallback(
    (key: string): string => {
      const content = language === "es" ? esContent : enContent;
      return getNestedValue(content as ContentMap, key);
    },
    [language]
  );

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useT(): (key: string) => string {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useT must be used within I18nProvider");
  return ctx.t;
}

export function useLanguage(): {
  language: Language;
  setLanguage: (lang: Language) => void;
} {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useLanguage must be used within I18nProvider");
  return { language: ctx.language, setLanguage: ctx.setLanguage };
}
