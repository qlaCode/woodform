import React from "react";
import { Link } from "react-router-dom";
import TableCourses from "./Table-Courses";

export default function About() {
  const name = "Quentin Lamare";
  const profileImage = "/photo.jpg";
  const description = `
   After business school and 15 years working as an IT-consultant, I aim to turn my passion for woodworking and craftsmanship into reality. 
   Over the years, I've gathered knowledge about the craft thanks to many courses across Europe and worked on numerous personal projects, from practical objects to furniture.
I am inspired by nature, fine arts and design in general - and particularly by the Danish Modern movement of the mid-20th century. 
I embrace modern tools like 3D-modeling and CNCs, while exploring different materials, tools and traditional, proven techniques. Endless exciting possibilities!
This website showcases my journey far from the pixels, close to the sawdust. 
Feel free to explore the gallery and contact me.
`;

  return (
    <div>
      <div className="max-w-2xl mx-auto p-6 text-center gap-4 flex flex-col">
        <h2 className="text-[#10A588] text-3xl font-mono font-medium mb-6 ">
          About me
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
          Contact Me
        </Link>
        <div className="w-full p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-6 text-left">My Story</h2>
          <div className="space-y-4 text-left">
            {description
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
