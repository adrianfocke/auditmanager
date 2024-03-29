import type { GQLQueryInfo, GQLQueryType } from '@/types/index';
import fetchAllAuditors from '../app/actions/graphql/fetchAllAuditors';
import fetchAllPartners from '../app/actions/graphql/fetchAllPartners';

export default {
  'All Auditors': fetchAllAuditors,
  'All Partners': fetchAllPartners,
} as Record<GQLQueryType, GQLQueryInfo>;
