import type { FileQuery } from 'tina/__generated__/types';
import { tinaField } from 'tinacms/dist/react';
import type { AuditPlaceholder } from './placeholders';

export default (placeholder: string, data: FileQuery) => {
  const placeholderToTinaField: Record<AuditPlaceholder, string> = {
    field_client_name: tinaField(data.file.entity?.certificant!, 'name'),
    field_client_address: tinaField(
      data.file.entity?.certificant!,
      'locations'
    ),
    field_client_addresses_audited: '',
    field_client_representative_name: '',
    field_client_representative_email: '',
    field_remote: '',
    field_audit_method: tinaField(data.file.entity!, 'method'),
    field_iso_1:
      data.file.entity &&
      data.file.entity.standards &&
      data.file.entity.standards[0] &&
      (tinaField(data.file.entity.standards[0].standard!, 'name') as any),
    field_iso_1_isoType:
      data.file.entity &&
      data.file.entity.standards &&
      data.file.entity.standards[0] &&
      (tinaField(data.file.entity.standards[0], 'isoAuditTypeRelation') as any),
    field_iso_1_regNumber:
      data.file.entity &&
      data.file.entity.standards &&
      data.file.entity.standards[0] &&
      (tinaField(data.file.entity.standards[0], 'registrationNumber') as any),
    field_iso_2:
      data.file.entity &&
      data.file.entity.standards &&
      data.file.entity.standards[1] &&
      (tinaField(data.file.entity.standards[1].standard!, 'name') as any),
    field_iso_2_isoType:
      data.file.entity &&
      data.file.entity.standards &&
      data.file.entity.standards[1] &&
      (tinaField(data.file.entity.standards[1], 'isoAuditTypeRelation') as any),
    field_iso_2_regNumber:
      data.file.entity &&
      data.file.entity.standards &&
      data.file.entity.standards[1] &&
      (tinaField(data.file.entity.standards[1], 'registrationNumber') as any),
    field_iso_3:
      data.file.entity &&
      data.file.entity.standards &&
      data.file.entity.standards[2] &&
      (tinaField(data.file.entity.standards[2].standard!, 'name') as any),
    field_iso_3_isoType:
      data.file.entity &&
      data.file.entity.standards &&
      data.file.entity.standards[2] &&
      (tinaField(data.file.entity.standards[2], 'isoAuditTypeRelation') as any),
    field_iso_3_regNumber:
      data.file.entity &&
      data.file.entity.standards &&
      data.file.entity.standards[2] &&
      (tinaField(data.file.entity.standards[2], 'registrationNumber') as any),
    field_iso_4:
      data.file.entity &&
      data.file.entity.standards &&
      data.file.entity.standards[3] &&
      (tinaField(data.file.entity.standards[3].standard!, 'name') as any),
    field_iso_4_isoType:
      data.file.entity &&
      data.file.entity.standards &&
      data.file.entity.standards[3] &&
      (tinaField(data.file.entity.standards[3], 'isoAuditTypeRelation') as any),
    field_iso_4_regNumber:
      data.file.entity &&
      data.file.entity.standards &&
      data.file.entity.standards[3] &&
      (tinaField(data.file.entity.standards[3], 'registrationNumber') as any),
    field_iso_5:
      data.file.entity &&
      data.file.entity.standards &&
      data.file.entity.standards[4] &&
      (tinaField(data.file.entity.standards[4].standard!, 'name') as any),
    field_iso_5_isoType:
      data.file.entity &&
      data.file.entity.standards &&
      data.file.entity.standards[4] &&
      (tinaField(data.file.entity.standards[4], 'isoAuditTypeRelation') as any),
    field_iso_5_regNumber:
      data.file.entity &&
      data.file.entity.standards &&
      data.file.entity.standards[4] &&
      (tinaField(data.file.entity.standards[4], 'registrationNumber') as any),
    field_auditplan: '',
  };

  return placeholderToTinaField[placeholder as AuditPlaceholder];
};
