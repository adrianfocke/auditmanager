import { Collection } from 'tinacms';
import { DURATIONS, LOCATIONS, TIMES } from '../../utils/constants';
import {
  readableDateFromDatetime,
  readableFileNameFromEntity,
} from '../../utils/readables';
import Picker from '../picker/Picker';

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
          type: 'string',
          label: ' ' /* will be added later, based on picker type */,
          ui: {
            component: Picker('Audit Type Relation'),
          },
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
              type: 'string',
              label: ' ' /* will be added later, based on picker type */,
              ui: {
                component: Picker('Audit Context'),
              },
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
              type: 'string',
              list: true,
              label: ' ' /* will be added later, based on picker type */,
              ui: {
                component: Picker('Audit Type'),
              },
            },
            {
              name: 'duration',
              label: 'Duration',
              type: 'string',
              options: DURATIONS,
            },
            {
              name: 'partners',
              type: 'string',
              list: true,
              label: ' ' /* will be added later, based on picker type */,
              ui: {
                component: Picker('All Partners'),
              },
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
              name: 'questions',
              label: 'Questions',
              type: 'object',
              list: true,
              ui: {
                itemProps: (item) => {
                  return {
                    label: `${item.questionsItem ?? 'New question'}`,
                  };
                },
              },
              fields: [
                // TODO standardize this sub-value picker (Reference-Item) pattern into component
                {
                  name: 'questionsReference',
                  label: 'Linked standard',
                  type: 'reference',
                  collections: ['standard'],
                },
                {
                  name: 'questionsItem',
                  label: ' ' /* will be added later, based on picker type */,
                  type: 'string',
                  ui: {
                    component: Picker('Standard Section'),
                  },
                },
                // standardize ... end
                {
                  name: 'samples',
                  label: 'Samples',
                  type: 'object',
                  list: true,
                  ui: {
                    itemProps: (item) => {
                      return {
                        label: `${item.samplesInfo ?? 'New sample'}`,
                      };
                    },
                  },
                  fields: [
                    {
                      name: 'samplesInfo',
                      label: 'Info (Bezeichnung)',
                      type: 'string',
                    },
                    {
                      name: 'samplesVersion',
                      label: 'Version',
                      type: 'string',
                    },
                    {
                      name: 'samplesDateUntil',
                      label: 'Date until',
                      type: 'datetime',
                    },
                    {
                      name: 'samplesDateFrom',
                      label: 'Date from',
                      type: 'datetime',
                    },
                    {
                      name: 'samplesClassification',
                      label: 'Classification',
                      type: 'string',
                    },
                    {
                      name: 'samplesFiling',
                      label: 'Filing (Ablage)',
                      type: 'string',
                    },
                    {
                      name: 'samplesMemo',
                      label: 'Memo',
                      type: 'string',
                    },
                  ],
                },
                {
                  name: 'findings',
                  label: 'Findings',
                  type: 'object',
                  list: true,
                  ui: {
                    itemProps: (item) => {
                      return {
                        label: `${item.findingsInfo ?? 'New question'}`,
                      };
                    },
                  },
                  fields: [
                    {
                      name: 'findingsInfo',
                      label: 'Finding',
                      type: 'string',
                    },
                  ],
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
      type: 'string',
      label: ' ' /* will be added later, based on picker type */,
      ui: {
        component: Picker('Audit Type'),
      },
    },
  ],
} as Collection;
