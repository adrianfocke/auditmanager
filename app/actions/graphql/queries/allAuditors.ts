import type { PersonConnectionQuery } from '@/tina/__generated__/types';
import type { GQLQueryInfo } from '@/types/index';

export default {
  query:
    'query personConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PersonFilter) {\n  personConnection(\n    before: $before\n    after: $after\n    first: $first\n    last: $last\n    sort: $sort\n    filter: $filter\n  ) {\n    edges {\n      node {\n        ... on Person {\n          firstName\n          lastName\n        }\n      }\n    }\n  }\n}\n',
  filter(data: { data: PersonConnectionQuery }) {
    if (data.data.personConnection.edges) {
      return data.data.personConnection.edges?.map(
        (person) => `${person?.node?.firstName} ${person?.node?.lastName}`
      );
    } else {
      return null;
    }
  },
} as GQLQueryInfo;
