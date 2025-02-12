import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "./LanguageContext";
import TableCourses from "./Table-Courses";
import { translations } from "./translations";

export default function About() {
  const { selectedLanguage } = useLanguage();
  const t = translations.about;

  const name = "Quentin Lamare";
  const profileImage = "/photo.jpg";

  return (
    <div>
      <div className="max-w-2xl mx-auto p-6 text-center gap-4 flex flex-col">
        <h2 className="text-[#10A588] text-3xl font-mono font-medium mb-6 ">
          {t.title[selectedLanguage]}
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
          {t.contactButton[selectedLanguage]}
        </Link>
        <div className="w-full p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-6 text-left">
            {t.myStory[selectedLanguage]}
          </h2>
          <div className="space-y-4 text-left">
            {t.description[selectedLanguage]
              .split("\n")
              .filter((line) => line.trim() !== "")
              .map((line, i) => (
                <p key={i} className="text-gray-700">
                  {line}
                </p>
              ))}
          </div>
        </div>
        <TableCourses />
      </div>
    </div>
  );
}
