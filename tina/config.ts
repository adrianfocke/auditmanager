import { defineConfig } from 'tinacms';
import audits from './collections/audits';
import companies from './collections/companies';
import files from './collections/files';
import people from './collections/people';
import standards from './collections/standards';

export default defineConfig({
  branch: process.env.VERCEL_GIT_COMMIT_REF ?? '',
  clientId: process.env.TINA_CLIENT_ID ?? '',
  token: process.env.TINA_TOKEN ?? '',
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
