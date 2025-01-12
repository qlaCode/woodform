import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImage } from "./types";

export const sanityClient = createClient({
  projectId: "lsuyzq46",
  dataset: "production",
  apiVersion: "2022-03-07",
  useCdn: true, // set to `false` to bypass the edge cache
});

export const sanityImageBuilder = imageUrlBuilder(sanityClient);

export function urlForImage(source: SanityImage): string {
  return sanityImageBuilder.image(source).url();
}
