import { Language } from "../components/LanguageContext";

export const categoryTranslations = {
  Furniture: {
    en: "Furniture",
    fr: "Meuble", 
    de: "Möbel"
  },
  Object: {
    en: "Object",
    fr: "Objet",
    de: "Objekt"
  },
  Storage: {
    en: "Storage",
    fr: "Rangement",
    de: "Aufbewahrung"
  },
  Workshop: {
    en: "Workshop",
    fr: "Atelier",
    de: "Werkstatt"
  }
} as const;

export type CategoryKey = keyof typeof categoryTranslations;

export function getCategoryTranslation(category: string, language: Language): string {
  const categoryKey = category as CategoryKey;
  return categoryTranslations[categoryKey]?.[language] || category;
}