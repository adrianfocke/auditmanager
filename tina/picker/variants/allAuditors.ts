import type { PersonConnectionQuery } from '@/tina/__generated__/types';
import type { PickerTypeSettings } from '@/types/index';

export default {
  query: 'personConnection',
  variables: {},
  variant: 'MultiValue',
  display: (data: { data: PersonConnectionQuery }) =>
    data.data.personConnection.edges
      ?.filter((person) => person?.node?.isAuditor)
      .map((person) => `${person?.node?.firstName} ${person?.node?.lastName}`),
} as PickerTypeSettings;
