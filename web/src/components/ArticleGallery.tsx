import React from "react";
import { urlForImage } from "../../../common/sanityclient";
import { Gallery, SanityImage } from "../../../common/types";

interface ArticleGalleryProps {
  gallery: Gallery;
  onImageClick: (image: SanityImage) => void;
}

export default function ArticleGallery({
  gallery,
  onImageClick,
}: ArticleGalleryProps) {
  const sortedImages = gallery.images.sort(
    (a, b) => (a.order || 0) - (b.order || 0)
  );

  return (
    <div className="my-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedImages.map((image, index) => (
          <div
            key={index}
            className="relative group cursor-pointer"
            onClick={() => onImageClick(image)}
          >
            <img
              src={urlForImage(image)}
              alt={image.alt || ""}
              className={`w-full rounded-lg object-cover shadow-lg aspect-square ${
                image.isFinalResult ? "ring-4 ring-blue-500" : ""
              }`}
            />
            {image.isFinalResult && (
              <span className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
                Final Result
              </span>
            )}
            {image.caption && (
              <p className="mt-2 text-sm text-gray-600 italic">
                {image.caption}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
