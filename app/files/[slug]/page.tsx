import type { Skeleton } from '@/types/index';
import { Text } from '@radix-ui/themes';
import { Suspense } from 'react';
import File from '../../../components/File';
import client from '../../../tina/__generated__/client';
import extractPlaceholders from '../../../utils/extractPlaceholders';

export type Params = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Params) {
  return { title: params.slug };
}

export default async function Page({ params }: Params) {
  const result = await client.queries.file({
    relativePath: `${params.slug}.mdx`,
  });
  const { skeleton } = result.data.file;
  const placeholders = await extractPlaceholders(skeleton as Skeleton);

  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <File placeholders={placeholders} result={result} />
    </Suspense>
  );
}
