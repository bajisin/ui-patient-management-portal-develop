import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// import LanguageDetector from "i18next-browser-languagedetector";

import { TRANSLATIONS_EN } from "./en/translations";
import { TRANSLATIONS_MAR } from "./mar/translations";
import { TRANSLATIONS_HIND } from "./hind/translations";
import { TRANSLATIONS_RUS } from "./rus/translations";
import { TRANSLATIONS_PORTU } from "./portu/translations";
i18n
  // .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: TRANSLATIONS_EN
      },
      hind: {
        translation: TRANSLATIONS_HIND
      },
      mar: {
        translation: TRANSLATIONS_MAR
      },
      portu: {
        translation: TRANSLATIONS_PORTU
      },
      rus: {
        translation: TRANSLATIONS_RUS
      }
    }
  });

i18n.changeLanguage("en");
