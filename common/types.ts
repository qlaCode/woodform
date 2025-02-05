import { PortableTextBlock } from "@sanity/types";
import React from "react";

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
  category: string;
  subtitle: PortableTextBlock[];
  details: PortableTextBlock[];
  year: number;
  image?: SanityImage;
  gallery?: Gallery;
};
