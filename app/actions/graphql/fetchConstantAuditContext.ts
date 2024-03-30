import type { ConstantQuery } from '@/tina/__generated__/types';
import type { GQLQueryInfo } from '@/types/index';

export default {
  query: `query constant($relativePath: String!) { constant(relativePath: $relativePath) { ... on Document { _values } } }`,
  variables: () => ({
    relativePath: 'Constants.json',
  }),
  display: (data: { data: ConstantQuery }) => {
    const values = (data.data.constant as any)._values.constants
      .find((constant: any) => constant.name === 'Audit Context')
      .values.map((value: string) => value);

    return values ?? [];
  },
} as GQLQueryInfo;
