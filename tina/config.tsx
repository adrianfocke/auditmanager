import { defineConfig } from 'tinacms';
import audits from './collections/audits';
import companies from './collections/companies';
import files from './collections/files';
import people from './collections/people';
import standards from './collections/standards';

export default defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID ?? '',
  token: process.env.TINA_TOKEN ?? '',
  branch: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ?? '',
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
