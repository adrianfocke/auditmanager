import type { PickerType, PickerTypeSettings } from '@/types/index';
import auditType from './auditType';

export default {
  'Audit Context': auditType,
  'Audit Type Relation': auditType,
  'Audit Type': auditType,
} as Record<PickerType, PickerTypeSettings>;
