import { tailwindStyles } from '@/styles';
import client from '@/tina/__generated__/client';
import type { File } from '@/tina/__generated__/types';
import * as ContextMenu from '@radix-ui/react-context-menu';
import { FileIcon } from '@radix-ui/react-icons';
import { AccessibleIcon, Card, Flex, Text } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';

type ContextCardProps = {
  file: File;
};

/** Card component with context menu wrapped around which displays file actions */
export default ({ file }: ContextCardProps) => {
  const router = useRouter();

  console.log('File: ', file);

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger
        className={'w-full max-w-full rounded-lg cursor-pointer'}
      >
        <Card className={'h-48 w-full max-w-full rounded-lg'}>
          <Flex gap={'1'} className='mb-4'>
            <AccessibleIcon label='File link icon'>
              <FileIcon className='text-tina-blue' width={24} height={24} />
            </AccessibleIcon>
            <Text className={`${tailwindStyles.text}`}>File</Text>
          </Flex>
          <Text className={`${tailwindStyles.text}`}>{file.name}</Text>
        </Card>
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content className='w-48 px-2 py-2 text-sm border bg-white rounded-md overflow-hidden shadow-xl'>
          <ContextMenu.Label>
            <Text className={`${tailwindStyles.text}`}>File Actions (WIP)</Text>
          </ContextMenu.Label>
          <ContextMenu.Item className='text-gray-500 w-full hover:bg-blue-500 px-1 py-1 rounded-md hover:text-white hover:cursor-pointer'>
            Open
          </ContextMenu.Item>
          <ContextMenu.Item
            onClick={async () =>
              await client.queries
                .deleteFile({
                  relativePath: file._sys.basename,
                })
                .then(() => router.refresh())
            }
            className='text-gray-500 w-full hover:bg-blue-500 px-1 py-1 rounded-md hover:text-white hover:cursor-pointer'
          >
            Delete
          </ContextMenu.Item>
          <ContextMenu.Item
            onClick={async () =>
              await client.queries
                .duplicateFile({
                  relativePath: '/aaa1.mdx',
                  params: {
                    file: {
                      name: `${file.name}`,
                      entity:
                        'content/entities/audits/ÖBB_PV 27001 z 2024.json',
                      skeleton: file.skeleton,
                    },
                  },
                })
                .then(() => router.refresh())
            }
            className='text-gray-500 w-full hover:bg-blue-500 px-1 py-1 rounded-md hover:text-white hover:cursor-pointer'
          >
            Duplicate
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
};
