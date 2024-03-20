import type { PersonConnectionQuery } from '@/tina/__generated__/types';
import type { GQLQueryInfo } from '@/types/index';

export default {
  query: `query personConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String) { personConnection(before: $before after: $after first: $first last: $last sort: $sort filter: {isAuditor: {eq: true}}) { edges { node { firstName lastName }}}}`,
  display: (data: { data: Partial<PersonConnectionQuery> }) =>
    data.data.personConnection?.edges?.map(
      (person) => `${person?.node?.firstName} ${person?.node?.lastName}`
    ),
} as GQLQueryInfo;
