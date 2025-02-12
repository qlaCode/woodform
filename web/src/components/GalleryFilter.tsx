import { FilterOption, useGallery } from "./GalleryContext";
import { useLanguage } from "./LanguageContext";
import { translations } from "./translations";

export const GalleryFilter: React.FC = () => {
  const { selectedFilter, setSelectedFilter } = useGallery();
  const { selectedLanguage } = useLanguage();

  const filterOptions: FilterOption[] = [
    "All",
    "Furniture",
    "Object",
    "Workshop",
  ];

  const getFilterTranslation = (filter: FilterOption) => {
    const key =
      filter.toLowerCase() as keyof typeof translations.gallery.filters;
    return translations.gallery.filters[key][selectedLanguage];
  };

  return (
    <div className="flex items-center gap-4 mb-8 flex-col md:flex-row">
      <h3 className="text-lg font-semibold whitespace-nowrap">
        {translations.gallery.projects[selectedLanguage]}
      </h3>
      <div className="flex flex-wrap gap-3">
        {filterOptions.map((option) => (
          <button
            key={option}
            onClick={() => setSelectedFilter(option)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedFilter === option
                ? "bg-[#10A588] text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {getFilterTranslation(option)}
          </button>
        ))}
      </div>
    </div>
  );
};
