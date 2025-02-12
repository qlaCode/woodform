import type React from "react";
import { useLanguage } from "./LanguageContext";
import { translations } from "./translations";

export const Footer: React.FC = () => {
  const { selectedLanguage } = useLanguage();

  return (
    <footer className="bg-white text-slate-800 w-full mt-8 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mt-8 text-center text-sm">
          <p className="text-[#10A588]">Woodform by Quentin Lamare </p>
          {translations.footer.builtWith[selectedLanguage]}{" "}
          <p className="mt-2">&copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
};
