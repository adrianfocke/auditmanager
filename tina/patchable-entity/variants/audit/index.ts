import type { FileQuery } from '@/tina/__generated__/types';
import type { PatchableEntity, Patches } from '@/types/index';
import { retrievePatchInstruction } from './handle/patch';
import type { AuditPlaceholder } from './handle/placeholders';
import tinaFields from './handle/tinaFields';
import values from './handle/values';
import viewTypes from './handle/viewTypes';

export default {
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

      const patchInstruction = retrievePatchInstruction({
        placeholder,
        value,
        viewType,
      });

      patches[placeholder] = patchInstruction;
    });

    return patches;
  },
} as PatchableEntity;
