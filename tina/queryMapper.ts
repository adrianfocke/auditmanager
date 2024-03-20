import type { GQLQueryInfo, GQLQueryType } from '@/types/index';
import fetchAllAuditors from '../app/actions/graphql/fetchAllAuditors';

export default {
  'All Auditors': fetchAllAuditors,
} as Record<GQLQueryType, GQLQueryInfo>;
