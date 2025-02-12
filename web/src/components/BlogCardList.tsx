import { useEffect, useState } from "react";
import { sanityClient } from "../../../common/sanityclient";
import { Article } from "../../../common/types";
import BlogCard from "./BlogCard";
import { useGallery } from "./GalleryContext";
import { GalleryFilter } from "./GalleryFilter";
import { useLanguage } from "./LanguageContext";
import { translations } from "./translations";

export default function BlogCardList() {
  const [content, setContent] = useState<Article[]>([]);
  const { selectedFilter } = useGallery();
  const { selectedLanguage } = useLanguage();

  async function fetchContent() {
    try {
      const query =
        selectedFilter === "All"
          ? `*[_type == "article"]`
          : `*[_type == "article" && category == $category]`; // Using base category (English) for filtering

      const params =
        selectedFilter === "All" ? {} : { category: selectedFilter };

      const result = await sanityClient.fetch<Article[]>(
        `${query} {
            _id, 
            name,
            nameFr,
            nameDe,
            category,
            categoryFr,
            categoryDe,
            year,
            details,
            detailsFr,
            detailsDe,
            "image": image {
              ...,
              asset->
            },
            subtitle,
            subtitleFr,
            subtitleDe
          } | order(year desc)`,
        params
      );

      setContent(result);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchContent();
  }, [selectedFilter, selectedLanguage]); // Re-fetch when filter or language changes

  return (
    <>
      <h2 className="text-[#10A588] text-3xl font-mono font-medium mb-6">
        {translations.titles.gallery[selectedLanguage]}
      </h2>
      <GalleryFilter />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {content.map((article) => (
          <BlogCard
            {...article}
            key={article._id}
            selectedLanguage={selectedLanguage}
          />
        ))}
      </div>
    </>
  );
}
