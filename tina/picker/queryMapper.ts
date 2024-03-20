import type { PickerQueryType } from '@/types/index';
import client from '../__generated__/client';

const allAuditors = async () =>
  (await client.queries.personConnection()).data.personConnection.edges
    ?.filter((person) => person?.node?.isAuditor)
    .map((person) => `${person?.node?.firstName} ${person?.node?.lastName}`);

export const queryMapper: Record<
  PickerQueryType,
  () => Promise<string[] | undefined>
> = {
  'All Auditors': allAuditors,
};
