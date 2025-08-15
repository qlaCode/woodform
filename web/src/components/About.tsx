import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { sanityClient } from "../../../common/sanityclient";
import { useLanguage } from "./LanguageContext";
import TableCourses from "./Table-Courses";
import { translations } from "./translations";
import { SoMe } from "./SoMe";

interface TextContent {
  _id: string;
  name: string;
  title: {
    en: string;
    fr: string;
    de: string;
  };
  description: {
    en: string;
    fr: string;
    de: string;
  };
}

export default function About() {
  const { selectedLanguage } = useLanguage();
  const [aboutContent, setAboutContent] = useState<TextContent | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch about content from Sanity
  async function fetchAboutContent() {
    try {
      const result = await sanityClient.fetch<TextContent[]>(
        `*[_type == "textContent" && name == "About"] {
          _id,
          name,
          title,
          description
        }`
      );
      if (result.length > 0) {
        setAboutContent(result[0]);
      }
    } catch (error) {
      console.error("Failed to fetch about content:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAboutContent();
  }, []);

  const name = "Quentin Lamare";
  const profileImage = "/photo.jpg";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
        className="max-w-2xl mx-auto p-6 text-center gap-4 flex flex-col"
      >
        <motion.h2 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
          className="text-[#10A588] text-3xl font-mono font-medium mb-6 "
        >
          {translations.titles.about[selectedLanguage]}
        </motion.h2>
        <motion.img
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
          src={profileImage}
          alt={`${name}'s Profile`}
          className="w-40 h-40 rounded-full mx-auto mb-4 object-cover"
        />
        <motion.h2 
          initial={{ y: -15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.4, ease: "easeOut" }}
          className="text-2xl font-bold font-mono mb-2"
        >
          {name}
        </motion.h2>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4, ease: "easeOut" }}
        >
          <Link
            to="/contact"
            className="bg-[#10A588] hover:bg-[#0D8C73] text-white font-bold py-2 px-4 w-1/3 self-center rounded focus:outline-none focus:shadow-outline transition-all duration-300"
          >
            {translations.contact.button[selectedLanguage]}
          </Link>
        </motion.div>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
        >
          <SoMe className="mt-4 mb-4" />
        </motion.div>
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4, ease: "easeOut" }}
          className="w-full p-6 bg-white rounded-lg shadow-lg"
        >
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : aboutContent ? (
            <>
              <h2 className="text-xl font-bold mb-6 text-left">
                {aboutContent.title[selectedLanguage] || aboutContent.title.en}
              </h2>
              <div className="space-y-4 text-left">
                {(
                  aboutContent.description[selectedLanguage] ||
                  aboutContent.description.en
                )
                  .split("\n")
                  .filter((line) => line.trim() !== "")
                  .map((line, i) => (
                    <p key={i} className="text-gray-700">
                      {line}
                    </p>
                  ))}
              </div>
            </>
          ) : (
            <div className="text-center">No content available</div>
          )}
        </motion.div>
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.4, ease: "easeOut" }}
        >
          <TableCourses />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
