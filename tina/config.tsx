import React from 'react'; /* do not remove */
import { defineConfig } from 'tinacms';
import audits from './collections/audits';
import companies from './collections/companies';
import constants from './collections/constants';
import files from './collections/files';
import people from './collections/people';
import standards from './collections/standards';

const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || 'main';

export default defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID ?? '',
  token: process.env.TINA_TOKEN ?? '',
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
    collections: [audits, companies, constants, files, people, standards],
  },
});
