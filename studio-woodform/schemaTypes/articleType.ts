import { defineField, defineType } from "sanity";

export const articleType = defineType({
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
    }),
    defineField({
      name: "nameFr",
      type: "string",
      title: "Name (French)",
    }),
    defineField({
      name: "nameDe",
      type: "string",
      title: "Name (German)",
    }),
    defineField({
      name: "category",
      type: "string",
    }),
    defineField({
      name: "categoryFr",
      type: "string",
      title: "Category (French)",
    }),
    defineField({
      name: "categoryDe",
      type: "string",
      title: "Category (German)",
    }),
    defineField({
      name: "subtitle",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "subtitleFr",
      title: "Subtitle (French)",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "subtitleDe",
      title: "Subtitle (German)",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "details",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "detailsFr",
      title: "Details (French)",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "detailsDe",
      title: "Details (German)",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "year",
      type: "number",
    }),
    defineField({
      name: "image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "gallery",
      type: "gallery",
      title: "Image Gallery",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
    },
  },
});
