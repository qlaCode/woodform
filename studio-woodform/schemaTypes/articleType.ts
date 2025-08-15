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
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Furniture", value: "Furniture" },
          { title: "Object", value: "Object" },
          { title: "Storage", value: "Storage" },
          { title: "Workshop", value: "Workshop" }
        ],
        layout: "radio"
      },
      validation: Rule => Rule.required()
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
      name: "featured",
      title: "Featured Project",
      type: "boolean",
      description: "Mark this project as featured",
      initialValue: false,
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
      media: "image",
    },
  },
});
