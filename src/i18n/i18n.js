import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import de from "../locales/de/de.json";
import en from "../locales/en/en.json";
import fr from "../locales/fr/fr.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
    de: { translation: de },
  },
  lng: "de",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
