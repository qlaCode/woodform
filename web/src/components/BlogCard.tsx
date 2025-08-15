import { PortableText } from "@portabletext/react";
import React from "react";
import { Link } from "react-router-dom";
import { sanityImageBuilder } from "../../../common/sanityclient";
import { Article, Language, SanityImage } from "../../../common/types";
import { getCategoryTranslation } from "../utils/categoryTranslations";

function getLocalizedField<T>(
  englishVersion: T,
  lang: Language,
  translations: {
    fr?: T;
    de?: T;
  }
): T {
  switch (lang) {
    case "fr":
      return translations.fr || englishVersion;
    case "de":
      return translations.de || englishVersion;
    default:
      return englishVersion;
  }
}

// Usage in the component:

interface BlogCardProps extends Article {
  selectedLanguage: Language;
}

export default function BlogCard({
  name,
  nameFr,
  nameDe,
  category,
  year,
  subtitle,
  subtitleFr,
  subtitleDe,
  image,
  _id,
  selectedLanguage,
}: BlogCardProps) {
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

  const localizedName = getLocalizedField(name, selectedLanguage, {
    fr: nameFr,
    de: nameDe,
  });
  const localizedCategory = getCategoryTranslation(category, selectedLanguage);
  const localizedSubtitle = getLocalizedField(subtitle, selectedLanguage, {
    fr: subtitleFr,
    de: subtitleDe,
  });

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
                alt={image.alt || localizedName}
              />
            )}
          </div>
          <div className="p-4">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">
                {localizedName}
              </h2>
              <span className="text-sm font-semibold text-gray-600">
                {year}
              </span>
            </div>
            <p className="text-gray-600">{localizedCategory}</p>
            <div className="text-gray-600">
              <PortableText value={localizedSubtitle} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
