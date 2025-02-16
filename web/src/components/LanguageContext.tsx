import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type Language = "en" | "fr" | "de";

interface LanguageContextType {
  selectedLanguage: Language;
  setSelectedLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const LANGUAGE_STORAGE_KEY = "preferred-language";

function getDefaultLanguage(): Language {
  // First check if there's a saved preference in localStorage
  const savedLanguage = localStorage.getItem(
    LANGUAGE_STORAGE_KEY
  ) as Language | null;
  if (savedLanguage && ["en", "fr", "de"].includes(savedLanguage)) {
    return savedLanguage;
  }

  // If no saved preference, check browser language
  const browserLang = navigator.language.toLowerCase();

  // Check if it starts with 'fr' (fr, fr-FR, fr-CA, etc.)
  if (browserLang.startsWith("fr")) {
    return "fr";
  }

  if (browserLang.startsWith("de")) {
    return "de";
  }

  // Default to English for all other cases
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [selectedLanguage, setSelectedLanguage] =
    useState<Language>(getDefaultLanguage());

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, selectedLanguage);
  }, [selectedLanguage]);

  return (
    <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
