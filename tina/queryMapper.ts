import type { GQLQueryInfo, GQLQueryType } from '@/types/index';
import fetchAllAuditors from '../app/actions/graphql/fetchAllAuditors';
import fetchAllPartners from '../app/actions/graphql/fetchAllPartners';
import fetchAllStandards from '../app/actions/graphql/fetchAllStandards';

export default {
  'All Auditors': fetchAllAuditors,
  'All Partners': fetchAllPartners,
  'All Standards': fetchAllStandards,
} as Record<GQLQueryType, GQLQueryInfo>;
