import { Endpoints, type TinaBackendParcel } from '@/types/index';
import useSWR from 'swr';

const tinaFetcher = async (...args: any[]) => {
  const req = await fetch(Endpoints.TINA, {
    method: 'POST',
    body: JSON.stringify(args[0]),
  });
  return await req.json();
};

export const useTinaQuery = (
  query: TinaBackendParcel['query'],
  variables?: TinaBackendParcel['variables']
) => {
  const { data, error, isLoading } = useSWR({ query, variables }, tinaFetcher);

  return {
    data,
    isLoading,
    error,
  };
};
