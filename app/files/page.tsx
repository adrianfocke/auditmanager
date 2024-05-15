import Files from '@/components/Files';
import client from '@/tina/__generated__/client';

export default async function Page() {
  const result = await client.queries.fileConnection();
  const files = result.data.fileConnection.edges?.map((file) => file?.node);

  // TODO
  return <Files files={files as any} />;
}
