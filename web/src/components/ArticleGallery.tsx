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

  const ImageWithCaption = ({ image }: { image: SanityImage }) => (
    <div
      className="relative cursor-pointer group"
      onClick={() => onImageClick(image)}
    >
      <img
        src={urlForImage(image)}
        alt={image.alt || ""}
        className={`w-full rounded-lg object-cover shadow-lg ${
          image.isFinalResult ? "ring-4 ring-blue-500" : ""
        }`}
      />
      {image.isFinalResult && (
        <span className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
          Final Result
        </span>
      )}
      {image.caption && (
        <p className="mt-2 text-sm text-gray-600 italic">{image.caption}</p>
      )}
    </div>
  );

  const renderImages = () => {
    switch (gallery.display) {
      case "stacked":
        return (
          <div className="space-y-4">
            {sortedImages.map((image, index) => (
              <div key={index} className="w-full">
                <img
                  src={urlForImage(image)}
                  alt={image.alt || ""}
                  className="w-full rounded-lg object-cover shadow-lg cursor-pointer"
                  onClick={() => onImageClick(image)}
                />
              </div>
            ))}
          </div>
        );

      case "inline":
        return (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {sortedImages.map((image, index) => (
              <div key={index} className="aspect-square">
                <img
                  src={urlForImage(image)}
                  alt={image.alt || ""}
                  className="w-full rounded-lg object-cover shadow-lg cursor-pointer"
                  onClick={() => onImageClick(image)}
                />
              </div>
            ))}
          </div>
        );

      case "carousel":
        return (
          <div className="relative overflow-hidden">
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {sortedImages.map((image, index) => (
                <div key={index} className="flex-none w-72">
                  <img
                    src={urlForImage(image)}
                    alt={image.alt || ""}
                    className="w-full rounded-lg object-cover shadow-lg cursor-pointer"
                    onClick={() => onImageClick(image)}
                  />
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return <div className="my-8">{renderImages()}</div>;
}
