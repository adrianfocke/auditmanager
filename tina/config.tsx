import React from 'react';
import { defineConfig } from 'tinacms';
import { BRANCH } from '../utils/constants';
import audits from './collections/audits';
import companies from './collections/companies';
import files from './collections/files';
import people from './collections/people';
import standards from './collections/standards';

export default defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID ?? '',
  token: process.env.NEXT_PUBLIC_TINA_TOKEN ?? '',
  branch: BRANCH,
  media: {
    tina: {
      publicFolder: 'public',
      mediaRoot: 'skeletons',
    },
  },
  build: {
    publicFolder: 'public',
    outputFolder: 'admin',
  },
  schema: {
    collections: [audits, companies, files, people, standards],
  },
});
