import React, { useEffect, useState } from "react";
import { sanityClient } from "../../../common/sanityclient";

import { Article } from "../../../common/types";
import BlogCard from "./BlogCard";

export default function BlogCardList() {
  const [content, setContent] = useState<Article[]>([]);

  async function fetchContent() {
    try {
      const result = await sanityClient.fetch<Article[]>(
        `*[_type == "article"]{_id, name, category, year, details, "image": {
          "_type": "image",
          "asset": image.asset,
          "hotspot": image.hotspot,
          "isFinalResult": true
        }, subtitle} | order(year desc)`
      );
      setContent(result);
      // console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchContent();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {content.map((article) => (
        <BlogCard {...article} key={article._id} /> //  pass all article properties with spreading
      ))}
    </div>
  );
}
