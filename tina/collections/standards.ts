import type { Collection } from 'tinacms';

export default {
  name: 'standard',
  label: 'Standard',
  path: 'content/entities/standards',
  format: 'json',
  ui: { global: true },
  fields: [
    { name: 'name', label: 'Name', type: 'string', required: true },
    {
      name: 'sections',
      label: 'Sections',
      type: 'string',
      list: true,
    },
  ],
} as Collection;
