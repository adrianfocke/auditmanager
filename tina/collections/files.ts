import type { Collection } from 'tinacms';
import { CHARACTERS_REGEX, CHARACTERS_REGEX_HINT } from '../../utils/constants';
import { sanitizeFilenameForURL } from '../../utils/sanitize';

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
        const filename = values?.name || 'untitled';
        return sanitizeFilenameForURL(filename);
      },
    },
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'string',
      required: true,
      ui: {
        validate: (value) => {
          if (!value) {
            return 'Value must be defined';
          }

          if (!CHARACTERS_REGEX.test(value)) {
            return CHARACTERS_REGEX_HINT;
          }
        },
      },
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
