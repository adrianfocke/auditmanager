import type { GQLQueryInfo, GQLQueryType } from '@/types/index';
import fetchAllAuditors from '../app/actions/graphql/fetchAllAuditors';
import fetchAllPartners from '../app/actions/graphql/fetchAllPartners';
import fetchAllStandards from '../app/actions/graphql/fetchAllStandards';
import fetchConstantAuditContext from '../app/actions/graphql/fetchConstantAuditContext';
import fetchConstantAuditType from '../app/actions/graphql/fetchConstantAuditType';

export default {
  'All Auditors': fetchAllAuditors,
  'All Partners': fetchAllPartners,
  'All Standards': fetchAllStandards,
  'Constants Audit Context': fetchConstantAuditContext,
  'Constants Audit Type': fetchConstantAuditType,
} as Record<GQLQueryType, GQLQueryInfo>;
