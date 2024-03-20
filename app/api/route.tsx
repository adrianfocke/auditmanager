export async function POST() {
  const myHeaders = new Headers();
  myHeaders.append('X-API-KEY', process.env.TINA_TOKEN!);
  myHeaders.append('Content-Type', 'application/json');

  const graphql = JSON.stringify({
    query:
      'query personConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PersonFilter) {\n  personConnection(\n    before: $before\n    after: $after\n    first: $first\n    last: $last\n    sort: $sort\n    filter: $filter\n  ) {\n    edges {\n      node {\n        ... on Person {\n          firstName\n          lastName\n        }\n      }\n    }\n  }\n}\n',
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

  return Response.json(data);
}
