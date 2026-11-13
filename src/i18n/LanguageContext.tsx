import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { en, type Dictionary } from "./en";
import { sw } from "./sw";

export type Lang = "en" | "sw";

const dictionaries: Record<Lang, Dictionary> = { en, sw };

type LanguageValue = {
  lang: Lang;
  t: Dictionary;
  setLang: (lang: Lang) => void;
};

const LanguageContext = createContext<LanguageValue | null>(null);
const storageKey = "envision-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = localStorage.getItem(storageKey);
    return stored === "sw" ? "sw" : "en";
  });

  useEffect(() => {
    document.documentElement.lang = dictionaries[lang].htmlLang;
    localStorage.setItem(storageKey, lang);
  }, [lang]);

  const value = useMemo<LanguageValue>(
    () => ({
      lang,
      t: dictionaries[lang],
      setLang: setLangState,
    }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const value = useContext(LanguageContext);
  if (!value) {
    throw new Error("useI18n must be used within LanguageProvider");
  }
  return value;
}
