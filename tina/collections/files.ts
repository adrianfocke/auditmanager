import { Collection } from 'tinacms';

export default {
  name: 'file',
  label: 'File',
  path: 'content/files',
  format: 'mdx',
  ui: {
    router: ({ document }) => {
      return `/files/${document._sys.filename}`;
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
      ui: {
        description: 'The database entity',
      },
    },
    {
      name: 'skeleton',
      label: 'Skeleton',
      type: 'image',
      ui: {
        description: 'The empty .docx file to be filled',
      },
    },
    {
      name: 'language',
      label: 'Language',
      type: 'string',
      options: ['de', 'en'],
    },
  ],
} as Collection;
