import type { Collection } from 'tinacms';

export default {
  name: 'company',
  label: 'Company',
  path: 'content/entities/companies',
  format: 'json',
  ui: { global: true },
  fields: [
    {
      name: 'scope',
      label: 'Scope',
      type: 'string',
    },
    {
      name: 'locations',
      label: 'Locations',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: `${item?.location}` };
        },
      },
      fields: [
        { name: 'location', label: 'Location', type: 'string' },
        { name: 'rooms', label: 'Rooms', type: 'string', list: true },
        {
          name: 'isPrimaryLocation',
          label: 'Primary location',
          type: 'boolean',
          ui: {
            description:
              'If chosen, this location will be chosen as default in files',
          },
        },
      ],
    },
    {
      name: 'subdivisions',
      label: 'Subdivisions',
      type: 'string',
      list: true,
      ui: {
        description: 'Suborganisations or Organisational units',
      },
    },
    {
      name: 'size',
      label: 'Size',
      type: 'number',
    },
    {
      name: 'fteScope',
      label: 'FTE Scope',
      type: 'number',
    },
    {
      name: 'name',
      label: 'Name',
      type: 'string',
      ui: {
        description: 'This will be chosen as default company name in files',
      },
    },
  ],
} as Collection;
