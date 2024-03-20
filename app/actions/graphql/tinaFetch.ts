'use server';
import type { GQLQueryInfo, GQLQueryType } from '@/types/index';
import allAuditors from './queries/allAuditors';

const queryMapper: Record<GQLQueryType, GQLQueryInfo> = {
  'All Auditors': allAuditors,
};

export default async (query: GQLQueryType) => {
  const myHeaders = new Headers();
  myHeaders.append('X-API-KEY', process.env.NEXT_PUBLIC_TINA_TOKEN!);
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

  const result = await fetch(
    'https://content.tinajs.io/1.4/content/c8d9963a-a8ff-4bee-98b6-3342d7cc52e6/github/picker',
    requestOptions as any
  );

  const data = await result.json();

  return queryMapper[query].filter(data);
};
