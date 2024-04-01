import Files from '@/components/Files';
import client from '@/tina/__generated__/client';
import type { FileLinkInfo } from '@/types/index';

export default async function Page() {
  const result = await client.queries.fileConnection();
  const files = result.data.fileConnection.edges?.map((file) => {
    return {
      link: file?.node?._sys.filename,
      name: file?.node?.name,
    };
  }) as FileLinkInfo[];

  return <Files files={files} />;
}
