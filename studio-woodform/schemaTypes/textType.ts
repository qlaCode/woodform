import {defineField, defineType} from 'sanity'

export const textType = defineType({
  name: 'textContent',
  title: 'Text Content',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        {
          name: 'en',
          title: 'English',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'de',
          title: 'Deutsch',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'fr',
          title: 'Français',
          type: 'string',
          validation: Rule => Rule.required()
        }
      ],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        {
          name: 'en',
          title: 'English',
          type: 'text',
          validation: Rule => Rule.required()
        },
        {
          name: 'de',
          title: 'Deutsch',
          type: 'text',
          validation: Rule => Rule.required()
        },
        {
          name: 'fr',
          title: 'Français',
          type: 'text',
          validation: Rule => Rule.required()
        }
      ],
      validation: Rule => Rule.required()
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title.en',
      description: 'description.en'
    }
  }
})