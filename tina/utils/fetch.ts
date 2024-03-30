import type { GQLQueryType } from '@/types/index';
import { env } from '../../env';
import { TINA_URL } from '../../utils/constants';
import queryMapper from '../queryMapper';

export default async (query: GQLQueryType, variables?: Record<string, any>) => {
  const myHeaders = new Headers();
  myHeaders.append('X-API-KEY', env.NEXT_PUBLIC_TINA_TOKEN);
  myHeaders.append('Content-Type', 'application/json');

  const graphql = JSON.stringify({
    query: queryMapper[query].query,
    // TODO rely on variables from parameters
    variables:
      variables || query.includes('Constants')
        ? queryMapper[query].variables(variables ?? {})
        : null,
  });
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: graphql,
    redirect: 'follow',
  };

  try {
    const result = await fetch(TINA_URL, requestOptions as any);
    const data = await result.json();
    return data;
  } catch (error) {
    console.error('Error fetching data from graphql: ', error, requestOptions);
  }

  return null;
};
