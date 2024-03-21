import React from 'react';
import { defineConfig } from 'tinacms';
import audits from './collections/audits';
import companies from './collections/companies';
import files from './collections/files';
import people from './collections/people';
import standards from './collections/standards';

const branch =
  process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || 'picker';

export default defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID ?? '',
  token: process.env.NEXT_PUBLIC_TINA_TOKEN ?? '',
  branch,
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
