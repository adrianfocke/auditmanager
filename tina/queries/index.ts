import { sanitizeFilenameForURL } from '@/utils/sanitize';
import client from '../__generated__/client';

export const createFile = async (filename: string) => {
  try {
    const newFile = await client.queries.createFile({
      relativePath: `/${sanitizeFilenameForURL(filename)}.mdx`,
      params: {
        file: {
          name: filename,
        },
      },
    });
    console.info('New file: ', newFile);
  } catch (error) {
    console.error('New file error: ', error, client);
  }
};
