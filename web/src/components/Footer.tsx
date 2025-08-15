import type React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";
import { translations } from "./translations";
import { SoMe } from "./SoMe";

export const Footer: React.FC = () => {
  const { selectedLanguage } = useLanguage();

  return (
    <motion.footer 
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      className="bg-white text-slate-800 w-full mt-8 shadow-inner"
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mt-8 text-center text-sm">
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-[#10A588]"
          >
            Woodform by Quentin Lamare 
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {translations.footer.builtWith[selectedLanguage]}{" "}
          </motion.div>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3, ease: "backOut" }}
            viewport={{ once: true }}
          >
            <SoMe className="mt-4" />
          </motion.div>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mt-2"
          >
            &copy; {new Date().getFullYear()}
          </motion.p>
        </div>
      </div>
    </motion.footer>
  );
};
