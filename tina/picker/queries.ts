import type { PickerType } from '@/types/index';
import client from '../../tina/__generated__/client';

export const allAuditors = async () => {
  console.log('Make all auditors query!');
  const result = await client.queries.personConnection();

  if (!result.data.personConnection.edges) {
    console.log('No auditors found!');
    return undefined;
  }

  console.log('All auditors found!');

  return result.data.personConnection.edges
    ?.map((person) => {
      if (person?.node?.isAuditor) {
        return `${person?.node?.firstName} ${person?.node?.lastName}`;
      }
    })
    .filter((person) => person) as string[];
};

export const queryMapper: Record<
  PickerType,
  () => Promise<string[] | undefined>
> = {
  'All Auditors': allAuditors,
};
