import type { CompanyQuery } from '@/tina/__generated__/types';
import type { PickerTypeSettings } from '@/types/index';

export default {
  query: 'company',
  variables: (company?: string) => {
    return {
      relativePath: company ? `${company}.json` : '',
    };
  },
  variant: 'SingleValue',
  display: (data: { data: CompanyQuery }) =>
    data.data.company.locations
      ? data.data.company.locations!.map((location) => location?.location)
      : [],
} as PickerTypeSettings;
