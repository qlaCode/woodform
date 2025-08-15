import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { sanityClient } from "../../../common/sanityclient";
import { useLanguage } from "./LanguageContext";
import { translations } from "./translations";
import { Article } from "../../../common/types";
import BlogCard from "./BlogCard";

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

export default function Home() {
  const { selectedLanguage } = useLanguage();
  const [welcomeContent, setWelcomeContent] = useState<TextContent | null>(
    null
  );
  const [featuredProjects, setFeaturedProjects] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [projectsLoading, setProjectsLoading] = useState(true);

  // Fetch welcome content from Sanity
  async function fetchWelcomeContent() {
    try {
      const result = await sanityClient.fetch<TextContent[]>(
        `*[_type == "textContent" && name == "Welcome"] {
          _id,
          name,
          title,
          description
        }`
      );
      if (result.length > 0) {
        setWelcomeContent(result[0]);
      }
    } catch (error) {
      console.error("Failed to fetch welcome content:", error);
    } finally {
      setLoading(false);
    }
  }

  // Fetch featured projects from Sanity
  async function fetchFeaturedProjects() {
    try {
      const result = await sanityClient.fetch<Article[]>(
        `*[_type == "article" && featured == true] {
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
      setFeaturedProjects(result);
    } catch (error) {
      console.error("Failed to fetch featured projects:", error);
    } finally {
      setProjectsLoading(false);
    }
  }

  useEffect(() => {
    fetchWelcomeContent();
    fetchFeaturedProjects();
  }, []);

  return (
    <div className="relative flex flex-col items-center mt-24 w-full text-center overflow-x-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="fixed top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-0 p-6 sm:p-12 max-w-4xl mx-auto w-full"
      >
        {loading ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-white"
          >
            Loading...
          </motion.div>
        ) : welcomeContent ? (
          <>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="flex justify-center mb-8"
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-mono text-white bg-black/30 backdrop-blur-sm px-4 sm:px-6 py-3 rounded-lg max-w-full break-words">
                {welcomeContent.title[selectedLanguage] ||
                  welcomeContent.title.en}
              </h1>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              className="bg-black/20 backdrop-blur-sm px-6 py-4 rounded-lg inline-block"
            >
              <div className="text-lg text-white mb-6 leading-relaxed">
                {(
                  welcomeContent.description[selectedLanguage] ||
                  welcomeContent.description.en
                )
                  .split("\n")
                  .filter((line) => line.trim() !== "")
                  .map((line, i) => (
                    <p key={i} className="mb-4 last:mb-0">
                      {line}
                    </p>
                  ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/gallery"
                  className="bg-[#10A588] hover:bg-[#0e8f75] text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300"
                >
                  {translations.home.buttons.viewWork[selectedLanguage]}
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-lg font-medium transition-colors duration-300"
                >
                  {translations.home.buttons.contact[selectedLanguage]}
                </Link>
              </div>
            </motion.div>
          </>
        ) : (
          <>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="flex justify-center mb-8"
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-mono text-white bg-black/30 backdrop-blur-sm px-4 sm:px-6 py-3 rounded-lg max-w-full break-words">
                Welcome
              </h1>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              className="bg-black/20 backdrop-blur-sm px-6 py-4 rounded-lg inline-block"
            >
              <div className="text-lg text-white mb-6 leading-relaxed">
                <p className="mb-0">No welcome content available</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/gallery"
                  className="bg-[#10A588] hover:bg-[#0e8f75] text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300"
                >
                  {translations.home.buttons.viewWork[selectedLanguage]}
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-lg font-medium transition-colors duration-300"
                >
                  {translations.home.buttons.contact[selectedLanguage]}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </motion.div>

      {/* Featured Projects Section */}
      {featuredProjects.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
          className="relative z-0 w-full max-w-7xl mx-auto px-4 py-8"
        >
          {projectsLoading ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-white"
            >
              Loading featured projects...
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.4, ease: "easeOut" }}
              className="bg-black/20 backdrop-blur-sm p-6 rounded-lg"
            >
              <motion.h2 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.4, ease: "easeOut" }}
                className="text-white text-3xl font-mono font-medium mb-6 text-center"
              >
                {translations.home.featuredProjects[selectedLanguage]}
              </motion.h2>
              
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {featuredProjects.map((article, index) => (
                  <motion.div
                    key={article._id}
                    initial={{ y: 30, opacity: 0, scale: 0.9 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: 1.5 + index * 0.05, 
                      duration: 0.4, 
                      ease: "easeOut" 
                    }}
                    className="[&_*]:!text-white [&_.text-gray-700]:!text-white [&_.text-slate-800]:!text-white"
                  >
                    <BlogCard
                      {...article}
                      selectedLanguage={selectedLanguage}
                      hideMetadata={true}
                      noShadow={true}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}
