"use client";
import React, { createContext, useContext, useState } from 'react';
import { translations } from './translations';

// Define os idiomas permitidos
type Language = 'en' | 'pt' | 'es' | 'fr' | 'zh';

const LanguageContext = createContext({
  lang: 'en',
  setLang: (lang: Language) => {},
  t: translations['en'] // Pega as traduções do seu arquivo translations.ts
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Language>('en');

  // "t" será o dicionário de palavras no idioma atual
  const t = translations[lang] || translations['en'];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);