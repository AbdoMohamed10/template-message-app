import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import english from './lang/en.json';
import arabic from './lang/ar.json';

const resources = {
    en: {
        translation: english
    },
    ar: {
        translation: arabic
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: localStorage.getItem('language') || "en",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
