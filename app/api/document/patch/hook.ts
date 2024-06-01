import type { PatchBackendParcel } from '@/types/index';
import useSWR from 'swr';

const fetcher = async (...args: any[]) => {
  const req = await fetch('/api/document/patch', {
    method: 'POST',
    body: JSON.stringify(args[0]),
  });

  return await req.blob();
};

export const usePatchDocument = (
  file: PatchBackendParcel['file'],
  placeholders?: PatchBackendParcel['placeholders']
) => {
  // eslint-disable-next-line
  const { data, error, isLoading } = useSWR({ file, placeholders }, fetcher);

  return {
    patchedDocument: data,
    isLoading,
    error,
  };
};
