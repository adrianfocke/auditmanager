import client from '@/tina/__generated__/client';
import type { PickerType } from '@/types/index';

export const allAuditors = async () => {
  const tinaClient = client;
  console.log('Tina client: ', tinaClient);

  console.log('Make all auditors query!');
  try {
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
  } catch (error) {
    console.error('All auditors not fetched: ', error);
    return undefined;
  }
};

export const queryMapper: Record<
  PickerType,
  () => Promise<string[] | undefined>
> = {
  'All Auditors': allAuditors,
};
