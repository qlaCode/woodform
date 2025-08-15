import React, { useEffect, useState } from "react";
import { sanityClient } from "../../../common/sanityclient";
import { useLanguage } from "./LanguageContext";
import { translations } from "./translations";

// Static data as backup (not used, kept for reference)
// const staticCoursesData = translations.education.courses;


interface Experience {
  _id: string;
  type: 'course' | 'education';
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

interface WoodworkingEducationProps {
  type: 'course' | 'education';
  translationKey: 'education' | 'educationTable';
}

const WoodworkingEducation: React.FC<WoodworkingEducationProps> = ({ type, translationKey }) => {
  const { selectedLanguage } = useLanguage();
  const t = translations[translationKey];
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch experiences from Sanity
  async function fetchExperiences() {
    try {
      const result = await sanityClient.fetch<Experience[]>(
        `*[_type == "experience" && type == "${type}"] {
          _id,
          type,
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
    institutionUrl: exp.institution.url,
    location: exp.location,
  }));

  if (loading) {
    return (
      <div className="w-full p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">Loading courses...</div>
      </div>
    );
  }

  const getInstitutionUrl = (institutionUrl: string | undefined) => {
    return institutionUrl || "#";
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
                    href={getInstitutionUrl(course.institutionUrl)}
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
                  href={getInstitutionUrl(course.institutionUrl)}
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
