import { PortableTextBlock } from "@sanity/types";
import React from "react";

export type Language = "en" | "fr" | "de";

export type SanityImage = {
  asset: {
    _ref: string;
    _type: "reference";
  };
  _type: "image";
  alt?: string;
  caption?: string;
  isFinalResult: boolean;
  order?: number;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
};

export type Gallery = {
  _type: "gallery";
  images: SanityImage[];
  zoom: boolean;
};

export type Article = {
  _id: string;
  name: string;
  nameFr?: string;
  nameDe?: string;
  category: string;
  categoryFr?: string;
  categoryDe?: string;
  subtitle: PortableTextBlock[];
  subtitleFr?: PortableTextBlock[];
  subtitleDe?: PortableTextBlock[];
  details: PortableTextBlock[];
  detailsFr?: PortableTextBlock[];
  detailsDe?: PortableTextBlock[];
  year: number;
  image?: SanityImage;
  gallery?: Gallery;
};
