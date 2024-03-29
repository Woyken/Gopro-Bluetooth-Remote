import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translation from './en/translation.json';

export const resources = {
    en: {
        translation,
    },
} as const;

i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
    },
    resources,
});
