import useSWR from 'swr';
import type { PatchBackendParcel } from './route';

const fetcher = async (...args: any[]) => {
  const req = await fetch('/api/document/patch', {
    method: 'POST',
    body: JSON.stringify(args[0]),
  });
  return await req.json();
};

export const usePatchDocument = (
  file: PatchBackendParcel['file'],
  placeholders: PatchBackendParcel['placeholders']
) => {
  const { data, error, isLoading } = useSWR({ file, placeholders }, fetcher);

  return {
    document: data,
    isLoading,
    error,
  };
};
