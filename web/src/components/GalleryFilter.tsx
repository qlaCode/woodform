import { FilterOption, useGallery } from "./GalleryContext";

export const GalleryFilter: React.FC = () => {
  const { selectedFilter, setSelectedFilter } = useGallery();

  const filterOptions: FilterOption[] = [
    "All",
    "Furniture",
    "Object",
    "Workshop",
  ];

  return (
    <div className="flex items-center gap-4 mb-8 flex-col md:flex-row">
      <h3 className="text-lg font-semibold whitespace-nowrap">Projects:</h3>
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
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

// import type React from "react";
// import { useState } from "react";

// type FilterOption = "All" | "Furniture" | "Object" | "Workshop";

// interface GalleryFilterProps {
//   onFilterChange: (filter: FilterOption) => void;
// }

// export const GalleryFilter: React.FC<GalleryFilterProps> = ({
//   onFilterChange,
// }) => {
//   const [selectedFilter, setSelectedFilter] = useState<FilterOption>("All");

//   const handleFilterChange = (filter: FilterOption) => {
//     setSelectedFilter(filter);
//     onFilterChange(filter);
//   };

//   const filterOptions: FilterOption[] = [
//     "All",
//     "Furniture",
//     "Object",
//     "Workshop",
//   ];

//   return (
//     <div className="flex items-center gap-4 mb-8">
//       <h3 className="text-lg font-semibold whitespace-nowrap">Projects:</h3>
//       <div className="flex flex-wrap gap-3">
//         {filterOptions.map((option) => (
//           <button
//             key={option}
//             onClick={() => handleFilterChange(option)}
//             className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
//               selectedFilter === option
//                 ? "bg-[#10A588] text-white shadow-md"
//                 : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//             }`}
//           >
//             {option}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };
