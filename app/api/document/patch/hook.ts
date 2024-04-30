import type { PatchBackendParcel } from '@/types/index';
import useSWR from 'swr';

const fetcher = async (...args: any[]) => {
  const req = await fetch('/api/document/patch', {
    method: 'POST',
    body: JSON.stringify(args[0]),
  });
  return await req.json();
};

export const usePatchDocument = (
  file: PatchBackendParcel['file'],
  placeholders?: PatchBackendParcel['placeholders']
) => {
  if (!placeholders) {
    return {
      document: null,
      isLoading: false,
      error: 'No placeholders given',
    };
  }

  // eslint-disable-next-line
  const { data, error, isLoading } = useSWR({ file, placeholders }, fetcher);

  return {
    document: data,
    isLoading,
    error,
  };
};
