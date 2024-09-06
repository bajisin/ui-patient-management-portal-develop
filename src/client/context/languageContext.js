// LanguageContext.js
import React, { createContext, useState, useEffect } from "react";
import en from "../../translations/locales/en.json";
import fr from "../../translations/locales/fr.json";
import ar from "../../translations/locales/ar.json";
import hn from "../../translations/locales/hn.json";
import tl from "../../translations/locales/tl.json";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const [translations, setTranslations] = useState(en);

  useEffect(() => {
    const lang = localStorage.getItem("lang");
    if (lang) {
      setLanguage(lang);
    }
  }, []);

  useEffect(() => {
    if (language === "ar") {
      setTranslations(ar);
    } else if (language === "fr") {
      setTranslations(fr);
    } else if (language === "en") {
      setTranslations(en);
    } else if (language === "hn") {
      setTranslations(hn);
    } else if (language === "tl") {
      setTranslations(tl);
    } else {
      setTranslations(en);
    }
    localStorage.setItem("lang", language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>{children}</LanguageContext.Provider>
  );
};
