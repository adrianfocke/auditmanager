import { Collection } from 'tinacms';

export default {
  name: 'constant',
  label: 'Constants',
  path: 'content/constants',
  format: 'json',
  ui: { allowedActions: { create: false, delete: false }, global: true },
  fields: [
    {
      name: 'constants',
      label: 'Constants',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: `${item.name ?? ''}`,
          };
        },
      },
      fields: [
        { name: 'name', label: 'Name', type: 'string' },
        { name: 'values', label: 'Values', type: 'string', list: true },
      ],
    },
  ],
} as Collection;
