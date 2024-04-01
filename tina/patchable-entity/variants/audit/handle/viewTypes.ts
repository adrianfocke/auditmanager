import type { ViewType } from '@/types/index';
import type { AuditPlaceholder } from './placeholders';

export default (placeholder: AuditPlaceholder): ViewType => {
  const placeholderToValueType: Record<AuditPlaceholder, ViewType> = {
    field_client_name: 'TEXT',
    field_client_address: 'TEXT',
    field_client_addresses_audited: 'LIST',
    field_client_representative_name: 'TEXT',
    field_client_representative_email: 'TEXT',
    field_remote: 'TEXT',
    field_audit_method: 'TEXT',
    field_iso_1: 'TEXT',
    field_iso_1_isoType: 'TEXT',
    field_iso_1_regNumber: 'TEXT',
    field_iso_2: 'TEXT',
    field_iso_2_isoType: 'TEXT',
    field_iso_2_regNumber: 'TEXT',
    field_iso_3: 'TEXT',
    field_iso_3_isoType: 'TEXT',
    field_iso_3_regNumber: 'TEXT',
    field_iso_4: 'TEXT',
    field_iso_4_isoType: 'TEXT',
    field_iso_4_regNumber: 'TEXT',
    field_iso_5: 'TEXT',
    field_iso_5_isoType: 'TEXT',
    field_iso_5_regNumber: 'TEXT',
    field_auditplan: 'TABLE',
  };

  return placeholderToValueType[placeholder];
};
