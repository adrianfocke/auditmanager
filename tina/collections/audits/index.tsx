import { Collection } from 'tinacms';
import {
  AUDIT_TYPES,
  AUDIT_TYPE_RELATIONS,
  CONTEXTS,
  DURATIONS,
  LOCATIONS,
  PARTNERS,
  SECTIONS,
  TIMES,
} from '../../../utils/constants/tina';
import {
  readableDateFromDatetime,
  readableFileNameFromEntity,
} from '../../../utils/readables';
import Picker from '../../picker/Picker';

export default {
  name: 'audit',
  label: 'Audit',
  path: 'content/entities/audits',
  format: 'json',
  ui: { global: true },
  fields: [
    {
      name: 'certifier',
      label: 'Certifier',
      type: 'reference',
      collections: ['company'],
      ui: {
        /* TODO add company with isCertifier */
      },
    },
    {
      name: 'certificant',
      label: 'Certificant',
      type: 'reference',
      collections: ['company'],
      ui: {
        /* TODO add company with isCertifier */
      },
    },
    { name: 'startDate', label: 'Start date', type: 'datetime' },
    { name: 'endDate', label: 'End date', type: 'datetime' },
    {
      name: 'standards',
      label: 'Standards',
      type: 'object',
      list: true,
      ui: {
        itemProps: (values) => {
          if (values.standard) {
            return {
              label:
                readableFileNameFromEntity(values.standard) || 'Showcase Item',
            };
          } else {
            return values;
          }
        },
      },
      fields: [
        {
          name: 'standard',
          label: 'Standard',
          type: 'reference',
          collections: ['standard'],
        },
        {
          name: 'isoAuditTypeRelation',
          label: 'Type of Audit of this ISO',
          type: 'string',
          options: AUDIT_TYPE_RELATIONS,
        },
        {
          name: 'registrationNumber',
          label: 'Registration number',
          type: 'string',
        },
        {
          name: 'hours',
          label: 'Hours',
          type: 'string',
        },
      ],
    },
    {
      name: 'dates',
      label: 'Dates',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: `${readableDateFromDatetime(item?.date)}`,
          };
        },
      },
      fields: [
        { name: 'date', label: 'Date', type: 'datetime' },
        {
          name: 'location',
          label: 'Location',
          type: 'string',
          options: LOCATIONS,
        },
        {
          name: 'startTime',
          label: 'Start time',
          type: 'string' /** TODO validation */,
          options: TIMES,
        },
        { name: 'isRemote', label: 'Remote', type: 'boolean' },
        {
          name: 'sessions',
          label: 'Sessions',
          type: 'object',
          list: true,
          ui: {
            itemProps: (item) => {
              return {
                label: `${item.context ?? item.reusableContext}`,
              };
            },
          },
          fields: [
            {
              name: 'reusableContext',
              label: 'Reusable Context',
              type: 'string',
              options: CONTEXTS,
            },
            {
              name: 'context',
              label: 'Context',
              type: 'string',
              ui: {
                description: 'This overrides the reusable context',
              },
            },
            {
              name: 'sections',
              label: 'Standards sections',
              type: 'string',
              list: true,
              options: SECTIONS,
            },
            {
              name: 'duration',
              label: 'Duration',
              type: 'string',
              options: DURATIONS,
            },
            {
              name: 'partners',
              label: 'Partners',
              type: 'string',
              list: true,
              options: PARTNERS,
            },
            {
              name: 'auditors',
              type: 'string',
              list: true,
              label: ' ' /* will be added later, based on picker type */,
              ui: {
                component: Picker('All Auditors'),
              },
            },
            {
              name: 'room',
              label: 'Room',
              type: 'string',
              options: [
                /* TODO filter only current location rooms */
              ],
            },
            {
              name: 'samples',
              label: 'Samples',
              type: 'object',
              list: true,
              ui: {
                itemProps: (item) => {
                  return {
                    label: `${item.description}`,
                  };
                },
              },
              fields: [
                { name: 'time', label: 'Time', type: 'datetime' },
                {
                  name: 'description',
                  label: 'Sample description',
                  type: 'string',
                },
                {
                  name: 'memo',
                  label: 'Memo',
                  type: 'string',
                  ui: {
                    component: 'textarea',
                  },
                },
                {
                  name: 'comments',
                  label: 'Comments',
                  type: 'object',
                  list: true,
                  ui: {
                    itemProps: (item) => {
                      return {
                        label: `${item.person}`,
                      };
                    },
                  },
                  fields: [
                    {
                      name: 'person',
                      label: 'Person',
                      type: 'reference',
                      collections: ['person'],
                    },
                    {
                      name: 'commment',
                      label: 'Comment',
                      type: 'string',
                      ui: {
                        description: "The partner's memo",
                        component: 'textarea',
                      },
                    },
                  ],
                },
                {
                  name: 'learnings',
                  label: 'Learnings',
                  type: 'object',
                  list: true,
                  ui: {
                    itemProps: (item) => {
                      return {
                        label: `${item.learning ? item.learning : ''} (${
                          item.classification ? item.classification[0] : ''
                        })`,
                      };
                    },
                  },
                  fields: [
                    {
                      name: 'learning',
                      label: 'Learning',
                      type: 'string',
                      ui: {
                        component: 'textarea',
                      },
                    },
                    {
                      name: 'classification',
                      label: 'Classification',
                      type: 'string',
                      options: [
                        '1 – Vollständige Übereinstimmung',
                        '2 – Möglichkeit zur Verbesserung',
                        '3 - Untergeordnete Nichtkonformität: Die Wirksamkeit der Korrekturmaßnahme wird beim nächsten Audit bewertet',
                        '4: Wesentliche Nichtkonformität: Korrektur durch Einreichung von Dokumenten',
                        '5 – Wesentliche Nichtkonformität: Korrektur durch Re-Audit',
                        'NA – Nicht anwendbar oder/und ausgeschlossen',
                      ],
                    },
                  ],
                },
                {
                  name: 'version',
                  label: 'Version',
                  type: 'string',
                },
                {
                  name: 'context',
                  label: 'Context/Ablage',
                  type: 'string',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'auditors',
      label: 'Auditors',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: `${item.person}`,
          };
        },
      },
      fields: [
        {
          name: 'isLead',
          label: 'Lead Auditor',
          type: 'boolean',
        },
        {
          name: 'isExpert',
          label: 'Expert',
          type: 'boolean',
        },
        {
          name: 'person',
          label: 'Person',
          type: 'reference',
          collections: ['person' /* TODO filter only isAuditor */],
        },
      ],
    },
    {
      name: 'partners',
      label: 'Partners',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: `${item.person}`,
          };
        },
      },
      fields: [
        {
          name: 'isRepresentative',
          label: 'Representative',
          type: 'boolean',
        },
        {
          name: 'person',
          label: 'Person',
          type: 'reference',
          collections: ['person' /* TODO filter only isAuditor */],
        },
      ],
    },
    {
      name: 'level',
      label: 'Level',
      type: 'string',
      options: ['1', '2'],
    },
    {
      name: 'duration',
      label: 'Duration',
      type: 'number',
    },
    {
      name: 'method',
      label: 'Method',
      type: 'string',
      options: AUDIT_TYPES,
    },
  ],
} as Collection;
