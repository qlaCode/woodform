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
  const profileImage = "/photo2.jpeg";

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
        className="max-w-7xl mx-auto p-6"
      >
        <motion.h2 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
          className="text-[#10A588] text-3xl font-mono font-medium mb-8 text-center"
        >
          {translations.titles.about[selectedLanguage]}
        </motion.h2>

        {/* Main layout: Photo with overlay left, Content right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left side: Photo and contact info */}
          <div className="space-y-6">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
            >
              <img
                src={profileImage}
                alt={`${name}'s Profile`}
                className="w-full h-auto rounded-lg shadow-lg object-contain"
              />
            </motion.div>

            {/* Contact info */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.4, ease: "easeOut" }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold font-mono mb-3">{name}</h2>
              <div className="flex items-center gap-2 text-gray-700 mb-4">
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span className="text-sm font-mono">Paris, France</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <Link
                  to="/contact"
                  className="bg-[#10A588] hover:bg-[#0D8C73] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300"
                >
                  {translations.contact.button[selectedLanguage]}
                </Link>
                <SoMe />
              </div>
            </motion.div>
          </div>

          {/* Right side: Story text and experiences */}
          <div className="space-y-6">

            {/* Story/About content */}
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4, ease: "easeOut" }}
              className="bg-white rounded-lg shadow-lg p-6"
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

            {/* Education table */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
            >
              <TableCourses type="education" translationKey="educationTable" />
            </motion.div>

            {/* Courses table */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4, ease: "easeOut" }}
            >
              <TableCourses type="course" translationKey="education" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
