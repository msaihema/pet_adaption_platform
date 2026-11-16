import React, { createContext, useContext, useState, useEffect } from 'react';
import { en } from '../locales/en.js';
import { te } from '../locales/te.js';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('petlove_lang') || 'en';
  });

  const translations = { en, te };

  const switchLanguage = (newLang) => {
    setLang(newLang);
    localStorage.setItem('petlove_lang', newLang);
  };

  // Helper to retrieve nested keys like t('nav.home')
  const t = (path, fallback = '') => {
    if (!path) return fallback;
    const keys = path.split('.');
    let current = translations[lang];

    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        // Fallback to English if missing in Telugu
        let engFallback = translations['en'];
        for (const k of keys) {
          if (engFallback && engFallback[k] !== undefined) {
            engFallback = engFallback[k];
          } else {
            engFallback = null;
            break;
          }
        }
        return engFallback !== null ? engFallback : fallback || path;
      }
    }
    return current;
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    if (lang === 'te') {
      document.body.classList.add('font-telugu');
    } else {
      document.body.classList.remove('font-telugu');
    }
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLanguage: switchLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
