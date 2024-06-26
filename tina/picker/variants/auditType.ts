import type { ConstantQuery } from '@/tina/__generated__/types';
import type { PickerTypeSettings } from '@/types/index';

export default {
  query: 'constant',
  variables: () => {
    return {
      relativePath: 'Constants.json',
    };
  },
  variant: 'SingleValue',
  display: (data: { data: ConstantQuery }) =>
    data.data.constant.constants
      ?.find((entry) => entry?.name === 'Audit Type')
      ?.values?.map((value) => value),
} as PickerTypeSettings;
