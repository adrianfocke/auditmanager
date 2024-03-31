import type { PatchableEntity } from '@/types/index';
import audit from './variants/audit';

export default {
  Audit: audit,
} as Record<string, PatchableEntity>;
