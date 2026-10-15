import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
export type Language = 'th' | 'en';
export const languageStorageKey = 'sisu:language:v1';
const LanguageContext = createContext<{ language: Language; setLanguage: (language: Language) => void }>({ language: 'th', setLanguage: () => {} });
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, update] = useState<Language>(() => {
    try { return localStorage.getItem(languageStorageKey) === 'en' ? 'en' : 'th'; } catch { return 'th'; }
  });
  const [saveError, setSaveError] = useState(false);
  useEffect(() => { document.documentElement.lang = language; }, [language]);
  function setLanguage(next: Language) {
    update(next);
    try { localStorage.setItem(languageStorageKey, next); setSaveError(false); } catch { setSaveError(true); }
  }
  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}{saveError && <p role="alert">Language changed for this visit. Your browser could not save the preference.</p>}</LanguageContext.Provider>;
}
export const useLanguage = () => useContext(LanguageContext);
export function ThaiOnly({ children }: { children: ReactNode }) { return useLanguage().language === 'th' ? children : null; }
