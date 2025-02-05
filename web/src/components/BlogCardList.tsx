import { useEffect, useState } from "react";
import { sanityClient } from "../../../common/sanityclient";
import { Article } from "../../../common/types";
import BlogCard from "./BlogCard";
import { useGallery } from "./GalleryContext";
import { GalleryFilter } from "./GalleryFilter";

export default function BlogCardList() {
  const [content, setContent] = useState<Article[]>([]);
  const { selectedFilter } = useGallery();

  async function fetchContent() {
    try {
      const query =
        selectedFilter === "All"
          ? `*[_type == "article"]`
          : `*[_type == "article" && category == $category]`;

      const params =
        selectedFilter === "All" ? {} : { category: selectedFilter };

      const result = await sanityClient.fetch<Article[]>(
        `${query}{
          _id, 
          name, 
          category, 
          year, 
          details, 
          "image": {
            "_type": "image",
            "asset": image.asset,
            "hotspot": image.hotspot,
            "isFinalResult": true
          }, 
          subtitle
        } | order(year desc)`,
        params
      );
      setContent(result);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchContent();
  }, [selectedFilter]); // Re-fetch when filter changes

  return (
    <>
      <h2 className="text-[#10A588] text-3xl font-mono font-medium mb-6">
        Project Gallery
      </h2>
      <GalleryFilter />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {content.map((article) => (
          <BlogCard {...article} key={article._id} />
        ))}
      </div>
    </>
  );
}

// import React, { useEffect, useState } from "react";
// import { sanityClient } from "../../../common/sanityclient";

// import { Article } from "../../../common/types";
// import BlogCard from "./BlogCard";
// import { GalleryFilter } from "./GalleryFilter";

// export default function BlogCardList() {
//   const [content, setContent] = useState<Article[]>([]);

//   async function fetchContent() {
//     try {
//       const result = await sanityClient.fetch<Article[]>(
//         `*[_type == "article"]{_id, name, category, year, details, "image": {
//           "_type": "image",
//           "asset": image.asset,
//           "hotspot": image.hotspot,
//           "isFinalResult": true
//         }, subtitle} | order(year desc)`
//       );
//       setContent(result);
//       // console.log(result);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   useEffect(() => {
//     fetchContent();
//   }, []);

//   return (
//     <>
//       <h2 className="text-[#10A588] text-3xl font-mono font-medium mb-6">
//         Project Gallery
//       </h2>
//       <GalleryFilter onFilterChange={() => {}} />
//       <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {content.map((article) => (
//           <BlogCard {...article} key={article._id} /> //  pass all article properties with spreading
//         ))}
//       </div>
//     </>
//   );
// }
