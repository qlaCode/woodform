import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { sanityClient } from "../../../common/sanityclient";
import { Article } from "../../../common/types";
import BlogCard from "./BlogCard";
import { GalleryNavigation } from "./GalleryFilter";
import { useLanguage } from "./LanguageContext";
import { translations } from "./translations";

export default function BlogCardList() {
  const [allContent, setAllContent] = useState<Article[]>([]);
  const { selectedLanguage } = useLanguage();
  const furnitureRef = useRef<HTMLDivElement>(null);
  const objectRef = useRef<HTMLDivElement>(null);
  const storageRef = useRef<HTMLDivElement>(null);
  const workshopRef = useRef<HTMLDivElement>(null);

  async function fetchContent() {
    try {
      const result = await sanityClient.fetch<Article[]>(
        `*[_type == "article"] {
            _id, 
            name,
            nameFr,
            nameDe,
            category,
            year,
            featured,
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

      setAllContent(result);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchContent();
  }, [selectedLanguage]);

  const scrollToSection = (section: string) => {
    const refs = {
      Furniture: furnitureRef,
      Object: objectRef,
      Storage: storageRef,
      Workshop: workshopRef
    };
    const element = refs[section]?.current;
    if (element) {
      const headerOffset = 120; // Account for header height + some padding
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const getContentByCategory = (category: string) => {
    return allContent.filter(article => article.category === category);
  };

  const getSectionBackground = (index: number) => {
    const backgrounds = [
      "bg-gray-50",
      "bg-white", 
      "bg-gray-100"
    ];
    return backgrounds[index % backgrounds.length];
  };

  const sections = ["Furniture", "Object", "Storage", "Workshop"];
  const sectionRefs = [furnitureRef, objectRef, storageRef, workshopRef];

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
        <GalleryNavigation onScrollToSection={scrollToSection} />
      </motion.div>

      {sections.map((category, sectionIndex) => {
        const categoryContent = getContentByCategory(category);
        if (categoryContent.length === 0) return null;

        return (
          <motion.div
            key={category}
            ref={sectionRefs[sectionIndex]}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + sectionIndex * 0.1, duration: 0.4, ease: "easeOut" }}
            className={`py-12 px-6 rounded-lg mb-8 ${getSectionBackground(sectionIndex)}`}
          >
            <motion.h3 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 + sectionIndex * 0.1, duration: 0.4, ease: "easeOut" }}
              className="text-2xl font-mono font-medium mb-8 text-[#10A588]"
            >
              {translations.gallery.filters[category.toLowerCase()][selectedLanguage]}
            </motion.h3>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {categoryContent.map((article, index) => (
                <motion.div
                  key={article._id}
                  initial={{ y: 30, opacity: 0, scale: 0.9 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: 0.4 + sectionIndex * 0.1 + index * 0.05, 
                    duration: 0.4, 
                    ease: "easeOut" 
                  }}
                >
                  <BlogCard
                    {...article}
                    selectedLanguage={selectedLanguage}
                    hideCategory={true}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      })}
    </>
  );
}
