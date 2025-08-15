import { useLanguage } from "./LanguageContext";
import { translations } from "./translations";

interface GalleryNavigationProps {
  onScrollToSection: (section: string) => void;
}

export const GalleryNavigation: React.FC<GalleryNavigationProps> = ({ onScrollToSection }) => {
  const { selectedLanguage } = useLanguage();

  const sections = ["Furniture", "Object", "Storage", "Workshop"];

  const getSectionTranslation = (section: string) => {
    const key = section.toLowerCase() as keyof typeof translations.gallery.filters;
    return translations.gallery.filters[key][selectedLanguage];
  };

  return (
    <div className="flex items-center gap-4 mb-8 flex-col md:flex-row">
      <h3 className="text-lg font-semibold whitespace-nowrap">
        {translations.gallery.projects[selectedLanguage]}
      </h3>
      <div className="flex flex-wrap gap-3">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => onScrollToSection(section)}
            className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 bg-gray-200 text-gray-700 hover:bg-[#10A588] hover:text-white"
          >
            {getSectionTranslation(section)}
          </button>
        ))}
      </div>
    </div>
  );
};
