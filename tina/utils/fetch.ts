import type { GQLQueryType } from '@/types/index';
import { env } from '../../env';
import queryMapper from '../queryMapper';

export default async (query: GQLQueryType) => {
  const myHeaders = new Headers();
  myHeaders.append('X-API-KEY', env.NEXT_PUBLIC_TINA_TOKEN);
  myHeaders.append('Content-Type', 'application/json');

  const graphql = JSON.stringify({
    query: queryMapper[query].query,
  });
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: graphql,
    redirect: 'follow',
  };

  const branch =
    process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || 'picker';

  try {
    const result = await fetch(
      `https://content.tinajs.io/1.4/content/c8d9963a-a8ff-4bee-98b6-3342d7cc52e6/github/${branch}`,
      requestOptions as any
    );
    const data = await result.json();
    return data;
  } catch (error) {
    console.error('Error fetching data from graphql: ', error, requestOptions);
  }

  return null;
};
