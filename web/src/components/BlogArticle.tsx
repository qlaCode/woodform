import { PortableText } from "@portabletext/react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { sanityClient, urlForImage } from "../../../common/sanityclient";
import { Article } from "../../../common/types";
import ArticleGallery from "./ArticleGallery";
import { Language, useLanguage } from "./LanguageContext";
import Lightbox from "./Lightbox";
import { translations } from "./translations";

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

export default function BlogArticle() {
  const { id } = useParams();
  const { selectedLanguage } = useLanguage();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const [article, setArticle] = useState<Article | null>(null);

  const allImages = article
    ? [
        ...(article.image ? [article.image] : []),
        ...(article.gallery?.images || []),
      ]
    : [];

  useEffect(() => {
    async function fetchArticle() {
      try {
        const result = await sanityClient.fetch<Article>(
          `*[_type == "article" && _id == $id][0]{
            _id,
            name,
            nameFr,
            nameDe,
            category,
            categoryFr,
            categoryDe,
            year,
            details,
            detailsFr,
            detailsDe,
            subtitle,
            subtitleFr,
            subtitleDe,
            image,
            gallery
          }`,
          { id }
        );
        setArticle(result);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    }

    if (id) {
      fetchArticle();
    }
  }, []);

  if (!article) return <div>Loading...</div>;

  const localizedName = getLocalizedField(article.name, selectedLanguage, {
    fr: article.nameFr,
    de: article.nameDe,
  });
  const localizedCategory = getLocalizedField(
    article.category,
    selectedLanguage,
    {
      fr: article.categoryFr,
      de: article.categoryDe,
    }
  );
  const localizedSubtitle = getLocalizedField(
    article.subtitle,
    selectedLanguage,
    {
      fr: article.subtitleFr,
      de: article.subtitleDe,
    }
  );
  const localizedDetails = getLocalizedField(
    article.details,
    selectedLanguage,
    {
      fr: article.detailsFr,
      de: article.detailsDe,
    }
  );

  return (
    <>
      <div className="mx-auto max-w-3xl p-6">
        <div className="mb-8">
          <div className="mb-4 flex items-center">
            <Link
              to="/"
              className="mb-4 flex items-center text-gray-600 hover:text-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              {translations.nav.backToGallery[selectedLanguage]}
            </Link>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-gray-800">
            {localizedName}
          </h1>
          <div className="flex items-center justify-between">
            <span className="text-xl text-gray-600">{localizedCategory}</span>
            <span className="text-lg font-semibold text-gray-600">
              {article.year}
            </span>
          </div>
        </div>

        {article.image && (
          <div
            className="mb-8 cursor-pointer relative w-full h-auto"
            onClick={() => setSelectedImageIndex(0)}
          >
            <img
              src={urlForImage(article.image)}
              alt="Main article image"
              className="h-auto w-full rounded-lg object-contain shadow-lg"
            />
          </div>
        )}

        <div className="text-gray-600">
          <PortableText value={localizedSubtitle} />
        </div>

        <PortableText value={localizedDetails} />

        {article.gallery && (
          <ArticleGallery
            gallery={article.gallery}
            onImageClick={(image) => {
              const index = allImages.findIndex((img) => img === image);
              setSelectedImageIndex(index);
            }}
          />
        )}
      </div>

      {selectedImageIndex !== null && (
        <Lightbox
          images={allImages}
          initialIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
        />
      )}
    </>
  );
}
