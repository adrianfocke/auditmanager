import client from '../../tina/__generated__/client';

export default async (filename: string) => {
  try {
    const file = await client.queries
      .createFile({
        relativePath: `/${filename
          .trim()
          .replaceAll(' ', '-')
          .toLowerCase()}.mdx`,
        params: {
          file: {
            name: filename,
          },
        },
      })
      .then((data: any) => data);

    console.info('Create file: ', file);

    return `${filename.trim().replaceAll(' ', '-').toLowerCase()}`;
  } catch (error) {
    console.error(error);
  }
};
