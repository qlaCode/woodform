import { PortableText } from "@portabletext/react";
import React from "react";
import { Link } from "react-router-dom";
import { sanityImageBuilder } from "../../../common/sanityclient";
import { Article, SanityImage } from "../../../common/types";

export default function BlogCard({
  name,
  category,
  year,
  subtitle,
  image,
  _id,
}: Article) {
  const getImagePosition = () => {
    if (!image?.hotspot) return "center";
    const x = image.hotspot.x * 100;
    const y = image.hotspot.y * 100;
    return `${x}% ${y}%`;
  };

  const getThumbnailUrl = (image: SanityImage) => {
    let builder = sanityImageBuilder
      .image(image)
      .width(1000)
      .height(750)
      .quality(90);

    // If we have hotspot data, use it
    if (image.hotspot) {
      builder = builder
        .fit("crop")
        .crop("focalpoint")
        .focalPoint(image.hotspot.x, image.hotspot.y);
    } else {
      builder = builder.fit("crop").crop("entropy");
    }

    return builder.url();
  };

  return (
    <Link to={`/article/${_id}`} className="group block">
      <div className="group block">
        <div
          className="overflow-hidden rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl"
          key={_id}
        >
          <div className="relative h-48 w-full">
            {image && (
              <img
                src={getThumbnailUrl(image)}
                className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                style={{ objectPosition: getImagePosition() }}
                alt={image.alt || name}
              />
            )}
          </div>
          <div className="p-4">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">{name}</h2>
              <span className="text-sm font-semibold text-gray-600">
                {year}
              </span>
            </div>
            <p className="text-gray-600">{category}</p>
            <p className="text-gray-600">
              <PortableText value={subtitle} />
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
