import React, { useEffect, useState } from "react";
import { urlForImage } from "../../../common/sanityclient";
import { SanityImage } from "../../../common/types";

interface LightboxProps {
  images: SanityImage[];
  initialIndex: number;
  onClose: () => void;
}

export default function Lightbox({
  images,
  initialIndex,
  onClose,
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handleKeyPress = (event: KeyboardEvent) => {
    switch (event.key) {
      case "Escape":
        onClose();
        break;
      case "ArrowLeft":
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
        break;
      case "ArrowRight":
        setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const currentImage = images[currentIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Previous Arrow */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setCurrentIndex((prev) =>
              prev > 0 ? prev - 1 : images.length - 1
            );
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/75"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Next Arrow */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setCurrentIndex((prev) =>
              prev < images.length - 1 ? prev + 1 : 0
            );
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/75"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        <img
          src={urlForImage(currentImage)}
          alt={currentImage.alt || ""}
          className="max-h-[80vh] max-w-[90vw] object-contain rounded-lg"
        />

        {(currentImage.caption || currentImage.alt) && (
          <div className="absolute bottom-0 left-0 right-0 translate-y-full mt-4 text-center">
            <p className="text-lg text-white">
              {currentImage.caption || currentImage.alt}
            </p>
          </div>
        )}

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
