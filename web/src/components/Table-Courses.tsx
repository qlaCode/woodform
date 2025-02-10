import React from "react";

const WoodworkingEducation = () => {
  const courses = [
    {
      year: "2015",
      duration: "1 week",
      course: "Guided Independent Project",
      institution: "L'Etablisienne",
      institutionUrl: "https://www.letablisienne.com/en/",
      location: "Paris, France",
    },
    {
      year: "2015",
      duration: "1 week",
      course: "Introduction to Woodworking",
      institution: "Rowden Atelier (David Savage)",
      institutionUrl: "https://rowdenatelier.com/",
      location: "Devon, UK",
    },
    {
      year: "2016",
      duration: "1 week",
      course: "Traditional Woorworking + Tray Fabrication",
      institution: "Robinson Studio (Marc Fish)",
      institutionUrl: "https://www.marcfish.co.uk/",
      location: "East Sussex, UK",
    },
    {
      year: "2016",
      duration: "2 weeks",
      course: "Personal Furniture Project",
      institution: "Capellagården (with Mats Aldén)",
      institutionUrl: "https://www.capellagarden.se/en/",
      location: "Wickleby, Sweden",
    },
    {
      year: "2016",
      duration: "2 days",
      course: "Acanthus Sculpture",
      institution: "Hjerleid Skole",
      institutionUrl: "https://www.hjerleid.no/",
      location: "Dovre, Norway",
    },
    {
      year: "2017",
      duration: "2 days",
      course: "Straw Marquetry",
      institution: "Atelier Lison De Caunes",
      institutionUrl: "https://www.lisondecaunes.com/en/workshops/",
      location: "Paris, France",
    },
    {
      year: "2022",
      duration: "2 days",
      course: "Stationary Machines Usage/Safety",
      institution: "Centre Municipal Buchegg",
      institutionUrl: "https://gz-zh.ch/gz-buchegg/",
      location: "Zürich, Switzerland",
    },
    {
      year: "2022-2023",
      duration: "2 x 1 day",
      course: "Shaper Origin Projects",
      institution: "Tom Schelker",
      institutionUrl: "https://ch.linkedin.com/in/thomas-schelker-72565212a",
      location: "Lenzburg, Switzerland",
    },
  ];

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-6 text-left">
        Woodworking Education
      </h2>

      {/* Table view for medium screens and up */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-center font-semibold">Year</th>
              <th className="p-3 text-center font-semibold">Duration</th>
              <th className="p-3 text-center font-semibold">Course</th>
              <th className="p-3 text-center font-semibold">Institution</th>
              <th className="p-3 text-center font-semibold">Location</th>
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
                    href={course.institutionUrl}
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
                  href={course.institutionUrl}
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
