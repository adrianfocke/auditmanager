import type { ConstantQuery } from '@/tina/__generated__/types';
import type { PickerTypeSettings } from '@/types/index';

export default {
  query: 'constant',
  variables: {
    relativePath: 'Constants.json',
  },
  variant: 'SingleValue',
  display: (data: { data: ConstantQuery }) =>
    data.data.constant.constants
      ?.find((entry) => entry?.name === 'Audit Type Relation')
      ?.values?.map((value) => value),
} as PickerTypeSettings;
