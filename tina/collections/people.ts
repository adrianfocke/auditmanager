import type { Collection } from 'tinacms';

export default {
  name: 'person',
  label: 'Person',
  path: 'content/entities/people',
  format: 'json',
  ui: { global: true },
  fields: [
    { name: 'firstName', label: 'First name', type: 'string' },
    { name: 'lastName', label: 'Last name', type: 'string' },
    { name: 'email', label: 'Email address', type: 'string' },
    {
      name: 'company',
      label: 'Company',
      type: 'reference',
      collections: ['company'],
    },
    { name: 'isAuditor', label: 'Auditor', type: 'boolean' },
    { name: 'isPartner', label: 'Partner', type: 'boolean' },
  ],
} as Collection;
