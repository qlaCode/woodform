import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { sanityClient } from "../../../common/sanityclient";
import { useLanguage } from "./LanguageContext";

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
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchWelcomeContent();
  }, []);

  return (
    <div className="relative flex flex-col items-center mt-24 w-full text-center">
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
        className="relative z-0 p-12 max-w-4xl mx-auto"
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
              <h1 className="text-4xl md:text-6xl font-mono text-white bg-black/30 backdrop-blur-sm px-6 py-3 rounded-lg whitespace-nowrap">
                {welcomeContent.title[selectedLanguage] ||
                  welcomeContent.title.en}
              </h1>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              className="text-lg text-white mb-8 leading-relaxed bg-black/20 backdrop-blur-sm px-6 py-4 rounded-lg"
            >
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
              <h1 className="text-4xl md:text-6xl font-mono text-white bg-black/30 backdrop-blur-sm px-6 py-3 rounded-lg whitespace-nowrap">
                Welcome
              </h1>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              className="text-lg text-white mb-8 leading-relaxed bg-black/20 backdrop-blur-sm px-6 py-4 rounded-lg"
            >
              <p className="mb-0">No welcome content available</p>
            </motion.div>
          </>
        )}

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
          className="bg-black/20 backdrop-blur-sm px-6 py-4 rounded-lg inline-block"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/gallery"
              className="bg-[#10A588] hover:bg-[#0e8f75] text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300"
            >
              View my work
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-lg font-medium transition-colors duration-300"
            >
              Contact me
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
