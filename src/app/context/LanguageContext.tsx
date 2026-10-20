import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import {
  translations,
  type Language,
  type Translations,
} from "../i18n/translations";

const STORAGE_KEY = "portfolio-language";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
}

const defaultLanguage: Language = "en";

export const LanguageContext = createContext<LanguageContextType>({
  language: defaultLanguage,
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: translations.en,
});

export const useLanguage = () => useContext(LanguageContext);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === "undefined") return defaultLanguage;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "id") {
        return saved;
      }
    } catch {
      // Local storage unavailable
    }
    return defaultLanguage;
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Local storage unavailable
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === "en" ? "id" : "en"));
  }, [setLanguage]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
      document.title =
        language === "id"
          ? "Naufal Dwi Saputro | Portofolio & Full Stack Developer"
          : "Naufal Dwi Saputro | Portfolio & Full Stack Developer";
    }
  }, [language]);

  const t = useMemo(() => translations[language], [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t,
    }),
    [language, setLanguage, toggleLanguage, t],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
