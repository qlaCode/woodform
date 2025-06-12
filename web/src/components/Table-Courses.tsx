import React, { useEffect, useState } from "react";
import { sanityClient } from "../../../common/sanityclient";
import { useLanguage } from "./LanguageContext";
import { translations } from "./translations";

// Static data as backup (not used, kept for reference)
// const staticCoursesData = translations.education.courses;

const institutionUrls = {
  "L'Etablisienne": "https://www.letablisienne.com/en/",
  "Rowden Atelier (David Savage)": "https://rowdenatelier.com/",
  "Robinson Studio (Marc Fish)": "https://www.marcfish.co.uk/",
  "Capellagården (with Mats Aldén)": "https://www.capellagarden.se/en/",
  "Hjerleid Skole": "https://www.hjerleid.no/",
  "Atelier Lison De Caunes": "https://www.lisondecaunes.com/en/workshops/",
  "Centre Municipal Buchegg": "https://gz-zh.ch/gz-buchegg/",
  "Tom Schelker": "https://ch.linkedin.com/in/thomas-schelker-72565212a",
};

interface Experience {
  _id: string;
  year: string;
  duration: {
    en: string;
    fr: string;
    de: string;
  };
  course: {
    en: string;
    fr: string;
    de: string;
  };
  institution: {
    text: string;
    url?: string;
  };
  location: string;
}

const WoodworkingEducation = () => {
  const { selectedLanguage } = useLanguage();
  const t = translations.education;
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch experiences from Sanity
  async function fetchExperiences() {
    try {
      const result = await sanityClient.fetch<Experience[]>(
        `*[_type == "experience"] {
          _id,
          year,
          duration,
          course,
          institution,
          location
        } | order(year desc)`
      );
      setExperiences(result);
    } catch (error) {
      console.error("Failed to fetch experiences:", error);
      setExperiences([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchExperiences();
  }, []);

  // Convert experiences to the format expected by the UI
  const courses = experiences.map(exp => ({
    year: exp.year,
    duration: exp.duration[selectedLanguage] || exp.duration.en,
    course: exp.course[selectedLanguage] || exp.course.en,
    institution: exp.institution.text,
    location: exp.location,
  }));

  if (loading) {
    return (
      <div className="w-full p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">Loading courses...</div>
      </div>
    );
  }

  const getInstitutionUrl = (institutionName: string) => {
    // Remove language-specific parts of the institution name to match with URLs
    const baseInstitutionName = Object.keys(institutionUrls).find((key) =>
      institutionName.startsWith(key.split(" (")[0])
    );
    return baseInstitutionName ? institutionUrls[baseInstitutionName] : "#";
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-6 text-left">
        {t.title[selectedLanguage]}
      </h2>

      {/* Table view for medium screens and up */}
      <div className="hidden md:block">
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-center font-semibold w-16">
                {t.tableHeaders.year[selectedLanguage]}
              </th>
              <th className="p-3 text-center font-semibold w-20">
                {t.tableHeaders.duration[selectedLanguage]}
              </th>
              <th className="p-3 text-center font-semibold w-1/3">
                {t.tableHeaders.course[selectedLanguage]}
              </th>
              <th className="p-3 text-center font-semibold w-1/3">
                {t.tableHeaders.institution[selectedLanguage]}
              </th>
              <th className="p-3 text-center font-semibold w-24">
                {t.tableHeaders.location[selectedLanguage]}
              </th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr
                key={index}
                className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
              >
                <td className="p-3">{course.year}</td>
                <td className="p-3">{course.duration}</td>
                <td className="p-3">{course.course}</td>
                <td className="p-3">
                  <a
                    href={getInstitutionUrl(course.institution)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#10A588] hover:text-blue-800 hover:underline underline"
                  >
                    {course.institution}
                  </a>
                </td>
                <td className="p-3">{course.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card view for small screens */}
      <div className="md:hidden space-y-4">
        {courses.map((course, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow p-4 border border-gray-200"
          >
            <div className="flex justify-between items-center mb-2 ">
              <span className="text-sm font-semibold bg-gray-100 px-2 py-1 rounded">
                {course.year}
              </span>
              <span className="text-sm text-gray-600">{course.duration}</span>
            </div>
            <h3 className="font-medium mb-2 text-left">{course.course}</h3>
            <div className="text-sm space-y-1 text-left">
              <div>
                <a
                  href={getInstitutionUrl(course.institution)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#10A588] hover:text-blue-800 hover:underline underline"
                >
                  {course.institution}
                </a>
              </div>
              <div className="text-gray-600">{course.location}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WoodworkingEducation;
