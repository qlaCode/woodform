// schemaTypes/galleryType.ts
import {defineField, defineType} from 'sanity'

export const galleryType = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'object',
  fields: [
    defineField({
      name: 'images',
      type: 'array',
      title: 'Images',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            }),
            defineField({
              name: 'caption',
              type: 'string',
              title: 'Caption',
            }),
            defineField({
              name: 'isFinalResult',
              type: 'boolean',
              title: 'Final Result',
              initialValue: false,
            }),
            defineField({
              name: 'order',
              type: 'number',
              title: 'Display Order',
            }),
          ],
        },
      ],
      options: {
        layout: 'grid',
        sortable: true,
      },
    }),
    defineField({
      name: 'display',
      type: 'string',
      title: 'Display as',
      description: 'How should we display these images?',
      options: {
        list: [
          {title: 'Stacked on top of eachother', value: 'stacked'},
          {title: 'In-line', value: 'inline'},
          {title: 'Carousel', value: 'carousel'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'zoom',
      type: 'boolean',
      title: 'Zoom enabled',
      description: 'Should we enable zooming of images?',
    }),
  ],
})
