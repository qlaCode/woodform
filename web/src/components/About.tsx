import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    <div>
      <div className="max-w-2xl mx-auto p-6 text-center gap-4 flex flex-col">
        <h2 className="text-[#10A588] text-3xl font-mono font-medium mb-6 ">
          {translations.titles.about[selectedLanguage]}
        </h2>
        <img
          src={profileImage}
          alt={`${name}'s Profile`}
          className="w-40 h-40 rounded-full mx-auto mb-4 object-cover"
        />
        <h2 className="text-2xl font-bold font-mono mb-2">{name}</h2>
        <Link
          to="/contact"
          className="bg-[#10A588] hover:bg-[#0D8C73] text-white font-bold py-2 px-4 w-1/3 self-center rounded focus:outline-none focus:shadow-outline transition-all duration-300"
        >
          {translations.contact.button[selectedLanguage]}
        </Link>
        <SoMe className="mt-4 mb-4" />
        <div className="w-full p-6 bg-white rounded-lg shadow-lg">
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
        </div>
        <TableCourses />
      </div>
    </div>
  );
}
