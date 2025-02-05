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
        `${query} {
            _id, 
            name, 
            category, 
            year, 
            details,
            "image": image {
              ...,
              asset->
            },
            subtitle
          } | order(year desc)`,
        params
      );

      // Debug log
      console.log(
        "Fetched content first item:",
        JSON.stringify(result[0]?.image, null, 2)
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
