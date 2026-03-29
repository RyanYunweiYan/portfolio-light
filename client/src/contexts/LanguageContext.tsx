import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

type Lang = 'en' | 'zh';

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  t: <T>(field: { en: T; zh: T } | T) => T;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem('lang') as Lang) || 'en');

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const newLang = prev === 'en' ? 'zh' : 'en';
      localStorage.setItem('lang', newLang);
      return newLang;
    });
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useCallback(
    <T,>(field: { en: T; zh: T } | T): T => {
      if (field !== null && typeof field === 'object' && 'en' in (field as object) && 'zh' in (field as object)) {
        return (field as { en: T; zh: T })[lang];
      }
      return field as T;
    },
    [lang],
  );

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
