import type { StandardConnectionQuery } from '@/tina/__generated__/types';
import type { GQLQueryInfo } from '@/types/index';

export default {
  query: `query standardConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: StandardFilter) { standardConnection(before: $before after: $after first: $first last: $last sort: $sort filter: $filter) { edges { node { name sections }}}}`,
  display: (data: { data: Partial<StandardConnectionQuery> }) => {
    const standardsArray: string[] = [];

    data.data.standardConnection?.edges?.forEach((standard) => {
      standardsArray.push(standard?.node?.name!);

      standard?.node?.sections?.forEach((section) =>
        standardsArray.push(section!)
      );
    });

    return standardsArray;
  },
} as GQLQueryInfo;
