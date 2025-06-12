import {defineField, defineType} from 'sanity'

export const experienceType = defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
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
      name: 'course',
      title: 'Course',
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
      name: 'institution',
      title: 'Institution',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Institution Name',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'url',
          title: 'Institution URL',
          type: 'url',
          validation: Rule => Rule.uri({
            scheme: ['http', 'https']
          })
        }
      ],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: Rule => Rule.required()
    })
  ],
  preview: {
    select: {
      title: 'course.en',
      subtitle: 'year',
      description: 'location'
    }
  }
})