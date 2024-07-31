import type { Collection } from 'tinacms';

export default {
  name: 'file',
  label: 'File',
  path: 'content/files',
  format: 'mdx',
  ui: {
    router: ({ document }) => {
      return `/files/${document._sys.filename}`;
    },
    filename: {
      readonly: true,
      slugify: (values) => {
        const title = values?.name || 'untitled';
        // Replace umlauts and other special characters
        const sanitizedTitle = title
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
          .replace(/[^a-zA-Z0-9 ]/g, '') // Remove special characters
          .replace(/ /g, '-')
          .toLowerCase();
        return sanitizedTitle;
      },
    },
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'string',
      required: true,
    },
    {
      name: 'entity',
      label: 'Entity',
      type: 'reference',
      collections: ['audit'],
    },
    {
      name: 'skeleton',
      label: 'Skeleton',
      type: 'image',
    },
  ],
} as Collection;
