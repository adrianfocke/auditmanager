import type { PatchableEntity } from '@/types/index';
import { audit } from './collections/audits/handle';

const patchableEntities: Record<string, PatchableEntity> = {
  Audit: audit,
};

// TODO type with generated type
export default (entityType: 'Audit') => patchableEntities[entityType];
