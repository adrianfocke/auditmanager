export const CONTEXTS = [
  'Eröffnungsgespräch erster Tag',
  'Eröffnungsgespräch mittlerer Tag',
  'Eröffnungsgespräch letzter Tag',
  'Context and compliance',
  'Strategic planning',
  'Abschlussgespräch erster Tag',
  'Abschlussgespräch mittlerer Tag',
  'Abschlussgespräch letzter Tag',
];

const STANDARDS = [
  [
    'ISO-27001-ABC',
    {
      label: '4.0 – Wichtiger Unterpunkt',
      value: 'ISO-27001-ABC4.0 – Wichtiger Unterpunkt',
    },
    {
      label: '4.1 – Anderer (unwichtiger) Unterpunkt',
      value: 'ISO-27001-ABC4.1 – Anderer (unwichtiger) Unterpunkt',
    },
  ],
  [
    'ISO-1950-200',
    {
      label: '3.0 – Wilder Unterpunkt',
      value: 'ISO-1950-2003.0 – Wilder Unterpunkt',
    },
  ],
];

export const SECTIONS = STANDARDS.flat();

export const AUDIT_TYPES = [
  'Erstzertifizierung',
  '1. Überwachung',
  '2. Überwachung',
  'Re-Zertifizierung',
  'Vor-Audit',
  'Erweiterung',
  'Andere',
  'Eigendefinition',
];

export const AUDIT_TYPE_RELATIONS = [
  'Einzel-Audit',
  'Kombiniertes Audit',
  'Integriertes Audit',
  'Multi-Site-Audit / Matrix-Audit',
  'Andere',
  'Eigendefinition',
];

export const LOCATIONS = [
  '1100 Wien, Am Hauptbahnhof 1',
  '1020 Wien, Lassallestraße 5',
];

export const PARTNERS = ['Gerald Färber', 'Johnny Partnerman'];

export const TIMES = [
  '06:30',
  '06:45',
  '07:00',
  '07:15',
  '07:30',
  '07:45',
  '08:00',
  '08:15',
  '08:30',
  '08:45',
  '09:00',
  '09:15',
  '09:30',
  '09:45',
  '10:00',
  '10:15',
  '10:30',
  '10:45',
  '11:00',
  '11:15',
  '11:30',
  '11:45',
  '12:00',
  '12:15',
  '12:30',
  '12:45',
  '13:00',
  '13:15',
  '13:30',
  '13:45',
  '14:00',
  '14:15',
  '14:30',
  '14:45',
  '15:00',
  '15:15',
  '15:30',
  '15:45',
  '16:00',
  '16:15',
  '16:30',
  '16:45',
  '17:00',
  '17:15',
  '17:30',
  '17:45',
  '18:00',
  '18:15',
  '18:30',
  '18:45',
  '19:00',
  '19:15',
  '19:30',
];

export const DURATIONS = [
  '00:15',
  '00:30',
  '00:45',
  '01:00',
  '01:15',
  '01:30',
  '01:45',
  '02:00',
  '02:15',
  '02:30',
  '02:45',
  '03:00',
  '03:15',
  '03:30',
  '03:45',
  '04:00',
  '04:15',
  '04:30',
  '04:45',
  '05:00',
  '05:15',
  '05:30',
  '05:45',
  '06:00',
];
