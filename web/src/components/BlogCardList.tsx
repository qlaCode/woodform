import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
      let query = `*[_type == "article"]`;
      let params = {};

      if (selectedFilter !== "All") {
        query = `*[_type == "article" && category == "${selectedFilter}"]`;
      }

      const result = await sanityClient.fetch<Article[]>(
        `${query} {
            _id, 
            name,
            nameFr,
            nameDe,
            category,
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
          } | order(year desc)`
      );

      console.log(`Filter: ${selectedFilter}, Found: ${result.length} articles`);
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
      <motion.h2 
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="text-[#10A588] text-3xl font-mono font-medium mb-6"
      >
        {translations.titles.gallery[selectedLanguage]}
      </motion.h2>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
      >
        <GalleryFilter />
      </motion.div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {content.map((article, index) => (
          <motion.div
            key={article._id}
            initial={{ y: 30, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ 
              delay: 0.3 + index * 0.05, 
              duration: 0.4, 
              ease: "easeOut" 
            }}
          >
            <BlogCard
              {...article}
              selectedLanguage={selectedLanguage}
            />
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}
