import type { PickerType, PickerTypeSettings } from '@/types/index';
import allAuditors from './variants/allAuditors';
import allPartners from './variants/allPartners';
import auditContext from './variants/auditContext';
import auditType from './variants/auditType';
import auditTypeRelation from './variants/auditTypeRelation';
import standardSection from './variants/standardSection';

export default {
  'All Auditors': allAuditors,
  'All Partners': allPartners,
  'Audit Context': auditContext,
  'Audit Type Relation': auditTypeRelation,
  'Audit Type': auditType,
  'Standard Section': standardSection,
} as Record<PickerType, PickerTypeSettings>;
