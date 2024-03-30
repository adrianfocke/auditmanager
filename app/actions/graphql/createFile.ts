import type { ConstantQuery } from '@/tina/__generated__/types';
import type { GQLQueryInfo } from '@/types/index';

export default {
  query: `mutation createFile($relativePath: String!, $params: DocumentMutation!) { createDocument(collection: "file", relativePath: $relativePath, params: $params) { __typename } }`,
  variables: (variables) => ({
    relativePath: `/${(variables as any).name
      .trim()
      .replaceAll(' ', '-')
      .toLowerCase()}.mdx`,
    params: {
      file: {
        name: `${(variables as any).name}`,
      },
    },
  }),
  display: (data: { data: ConstantQuery }) => null,
} as GQLQueryInfo;
