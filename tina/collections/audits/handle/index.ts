import type { PatchableEntity, Patches } from '@/types/index';
import type { FileQuery } from 'tina/__generated__/types';
import { retrievePatchInstruction } from './patch';
import type { AuditPlaceholder } from './placeholders';
import tinaFields from './tinaFields';
import values from './values';
import viewTypes from './viewTypes';

export const audit: PatchableEntity = {
  placeholderTinaField: (data: FileQuery, placeholder: string) =>
    tinaFields(placeholder, data),

  placeholderValue: (data: FileQuery, placeholder: string) =>
    values(placeholder as AuditPlaceholder, data.file.entity!),

  placeholderValueType: (placeholder: string) =>
    viewTypes(placeholder as AuditPlaceholder),

  patches(data, placeholders) {
    const patches: Patches = {};
    placeholders.forEach((placeholder) => {
      const value = values(placeholder as AuditPlaceholder, data);
      const viewType = viewTypes(placeholder as AuditPlaceholder);

      const patchInstruction = retrievePatchInstruction(value, viewType!);

      patches[placeholder] = patchInstruction;
    });

    return patches;
  },
};
