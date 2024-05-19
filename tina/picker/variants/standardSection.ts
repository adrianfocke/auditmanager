import type { StandardQuery } from '@/tina/__generated__/types';
import type { PickerTypeSettings } from '@/types/index';
import { readableFileNameFromEntity } from '../../../utils/readables';

export default {
  query: 'standard',
  variables: (standard?: string) => {
    return {
      relativePath: standard
        ? readableFileNameFromEntity(standard) + '.json'
        : '',
    };
  },
  variant: 'SingleValue',
  display: (data: { data: StandardQuery }) => data.data.standard.sections,
} as PickerTypeSettings;
